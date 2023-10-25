import { google } from 'googleapis';

const target = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const jwt = new google.auth.JWT(
  process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
  undefined,
  (process.env.GOOGLE_SHEETS_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
  target
);

const googleSheet = google.sheets({ version: 'v4', auth: jwt });

export async function getProducts() {
  try {
    const response = await googleSheet.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: 'A2:A9',
    });

    console.log(response.data.values);
  } catch (err) {
    console.log(err);
  }
  return [];
}

export async function getSheets() {
  const response = await googleSheet.spreadsheets.get({
    spreadsheetId: process.env.SPREADSHEET_ID!,
  });

  const sheets = response.data.sheets;
  return sheets;
}

export async function getSheetData(sheetName: string) {
  const response = await googleSheet.spreadsheets.values.get({
    spreadsheetId: process.env.SPREADSHEET_ID!,
    range: sheetName,
  });
  const final = convertToJSON(response.data.values!);
  return final;
}

export async function getAllData() {
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
    console.log(sheets);
    return data;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export const convertToJSON = (data: any[]) => {
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
