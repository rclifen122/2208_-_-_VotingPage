// ==================================
//  CORS DEBUGGING SCRIPT
// ==================================

// This function handles the browser's security check (preflight request)
function doOptions(e) {
  return ContentService
    .createTextOutput()
    .setHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
}

// For this test, doGet will just confirm it's working
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ success: true, message: 'Debug GET request was successful!' }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeaders({ 'Access-Control-Allow-Origin': '*' });
}

// For this test, doPost will just confirm it's working
function doPost(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ success: true, message: 'Debug POST request was successful!' }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
}