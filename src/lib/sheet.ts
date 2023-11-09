'use server';
import { google, sheets_v4 } from 'googleapis';
import { cache } from 'react';
import crypto from 'crypto';
import { CartItem } from '@/hooks/use-cart';
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

    return convertToJSON(response.data.values || []);
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

const SHEET_ID = 445944671;

export const addOrder = async (
  userInfo: Record<string, any>,
  orderItems: CartItem[]
): Promise<any> => {
  try {
    const orderId = `#${(crypto.randomBytes(4).readUInt32BE(0) % 100000000)
      .toString()
      .padStart(8, '0')}`;

    userInfo['id'] = orderId;
    const [userFields, userData] = convertJsonToSheet([userInfo]);
    const [orderItemFields, ...orderItemData] = convertJsonToSheet(orderItems);
    const data = orderItemData.map((i) => userData.concat(i));
    // Step 2: Write data into sheet
    await appendSheetData('order', data).then((response) => {
      if (data.length < 2) return;

      const updatedRange = response.data.updates?.updatedRange;
      console.log(updatedRange);
      const [start, end] =
        updatedRange?.split(':').map((i) => parseInt(i.replace(/\D/g, ''))) ||
        [];

      console.log(start, end);

      // Step 2: Merge cells for each row in the data
      // googleSheet.spreadsheets.batchUpdate({
      //   auth: jwt,
      //   spreadsheetId: process.env.SPREADSHEET_ID,
      //   requestBody: {
      //     requests: [
      //       {
      //         mergeCells: {
      //           range: {
      //             sheetId: SHEET_ID,
      //             startRowIndex: start - 1,
      //             endRowIndex: end,
      //             startColumnIndex: 0,
      //             endColumnIndex: userFields.length,
      //           },
      //           mergeType: 'MERGE_COLUMNS',
      //         },
      //       },
      //     ],
      //   },
      // });
    });
  } catch (error) {
    // Handle errors here
    // console.error('Error adding order:', error);
    // throw error; // Rethrow the error to signify that the operation failed
  }
};
