'use server';
import { google, sheets_v4 } from 'googleapis';
import { cache } from 'react';

// Constants
const target = ['https://www.googleapis.com/auth/spreadsheets'];

// Initialize Google Sheets API
const jwt = new google.auth.JWT(
  process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
  undefined,
  (process.env.GOOGLE_SHEETS_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
  target
);

const googleSheet = google.sheets({ version: 'v4', auth: jwt });

// Utility function to convert spreadsheet data to JSON
const convertToJSON = (data: any[]) => {
  const keys = data[0];
  const values = [...data].splice(1);

  const jsonData = values.reduce((result, current) => {
    const obj: any = {};
    current.forEach((value: any, index: string | number) => {
      obj[keys[index]] = value;
    });
    result.push(obj);
    return result;
  }, []);
  return jsonData;
};

const convertJsonToSheet = (data: any[]) => {
  const result = [
    Object.keys(data[0]),
    ...data.map((o: any) => Object.keys(o).map((k) => o[k])),
  ];
  return result;
};

// Fetch a list of sheets from the spreadsheet
export const getSheets = cache(async () => {
  try {
    const response = await googleSheet.spreadsheets.get({
      spreadsheetId: process.env.SPREADSHEET_ID!,
    });

    return response.data.sheets;
  } catch (error) {
    console.error('Error fetching sheets:', error);
    return undefined;
  }
});

// Fetch data from a specific sheet
export const getSheetData = cache(async (sheetName: string, range?: string) => {
  try {
    const response = await googleSheet.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: range ? `${sheetName}!${range}` : sheetName,
    });

    return convertToJSON(response.data.values!);
  } catch (error) {
    console.error('Error fetching sheet data:', error);
    return [];
  }
});

// Find a row by slug in a specific sheet
export const findRowBySlug = cache(async (slug: string, sheetName: string) => {
  try {
    const data = await getSheetData(sheetName);
    return data.find((item: { slug: string }) => item.slug === slug);
  } catch (error) {
    console.error('Error finding row by slug:', error);
    return undefined;
  }
});

// Fetch all data from all sheets
export const getAllData = cache(async () => {
  try {
    const response = await googleSheet.spreadsheets.get({
      spreadsheetId: process.env.SPREADSHEET_ID!,
    });

    const sheets = response.data.sheets;
    const data = [];

    if (sheets) {
      for (const sheet of sheets) {
        const sheetData = await googleSheet.spreadsheets.values.get({
          spreadsheetId: process.env.SPREADSHEET_ID!,
          range: sheet.properties?.title!,
        });

        data.push(sheetData.data?.values);
      }
    }

    return data;
  } catch (error) {
    console.error('Error fetching all data:', error);
    return [];
  }
});

// write in a sheet
export const appendSheetData = async (
  sheetName: string,
  data: any[],
  range?: string
) => {
  return await googleSheet.spreadsheets.values.append({
    auth: jwt,
    spreadsheetId: process.env.SPREADSHEET_ID,
    range: range ? `${sheetName}!${range}` : sheetName,
    valueInputOption: 'RAW',
    requestBody: { values: data },
  });
};

export const appendDataToMergedCells = async (
  sheetName: string,
  data: any[]
) => {
  try {
    // Step 1: Append the data to the unmerged cells
    const response = await appendSheetData(sheetName, data);

    if (data.length < 2) return;

    const updatedRange = response.data.updates?.updatedRange;
    const lastIndex = parseInt(
      updatedRange?.split(':')[0]?.replace(/\D/g, '') ?? '0'
    );
    console.log(lastIndex);
    const startPosition = lastIndex - 1;
    const endPosition = data.length + lastIndex - 1;

    console.log(
      ` ${updatedRange} writing ${data.length} product :`,
      startPosition,
      endPosition
    );
    // Step 2: Merge cells for each row in the data
    for (let i = startPosition; i < endPosition; i++) {
      await googleSheet.spreadsheets.batchUpdate({
        auth: jwt,
        spreadsheetId: process.env.SPREADSHEET_ID,
        requestBody: {
          requests: [
            {
              mergeCells: {
                range: {
                  sheetId: 1928321420,
                  startRowIndex: i,
                  endRowIndex: endPosition,
                  startColumnIndex: 0,
                  endColumnIndex: 8,
                },
                mergeType: 'MERGE_COLUMNS',
              },
            },
          ],
        },
      });
    }

    return response;
  } catch (error) {
    // console.error('Error appending data to merged cells:', error);
    return [];
  }
};
