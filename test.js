let google = require('googleapis');
let secretKey = require('./secrets.json');
let jwtClient = new google.auth.JWT(
  secretKey.client_email,
  null,
  secretKey.private_key,
  ['https://www.googleapis.com/auth/spreadsheets']
);
//authenticate request
jwtClient.authorize(function (err, tokens) {
  if (err) {
    console.log(err);
    return;
  } else {
    console.log('Successfully connected!');
  }
});

//Google Sheets API
let spreadsheetId = process.env.PRODUCTS_SHEET_ID;
let sheetRange = 'A1:B1';
let sheets = google.sheets('v4');
sheets.spreadsheets.values.get(
  {
    auth: jwtClient,
    spreadsheetId: spreadsheetId,
    range: sheetRange,
  },
  function (err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
    } else {
      console.log(response);
    }
  }
);
