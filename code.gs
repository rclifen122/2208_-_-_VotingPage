// FINAL BARE-MINIMUM CORS TEST SCRIPT

function doOptions(e) {
  return HtmlService.createHtmlOutput("CORS check successful")
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
    .setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function doGet(e) {
  // This function is not important for the test, but must exist.
  return ContentService.createTextOutput("GET request received. If you see this, the script is working.");
}
