import { google, sheets_v4 } from 'googleapis';
import { cache } from 'react';

// Constants
const target = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

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
export const findRowBySlug = async (slug: string, sheetName: string) => {
  try {
    const data = await getSheetData(sheetName);
    return data.find((item: { slug: string }) => item.slug === slug);
  } catch (error) {
    console.error('Error finding row by slug:', error);
    return undefined;
  }
};

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
