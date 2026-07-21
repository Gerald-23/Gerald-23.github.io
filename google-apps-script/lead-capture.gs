const SHEET_NAME = 'Leads';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = getOrCreateSheet_();

    sheet.appendRow([
      new Date(),
      data.fullName || '',
      data.businessName || '',
      data.phone || '',
      data.email || '',
      data.businessType || '',
      data.websiteGoal || '',
      data.message || '',
      data.consent || '',
      data.source || '',
      data.submittedAt || '',
      data.pageUrl || '',
      data.utmSource || '',
      data.utmMedium || '',
      data.utmCampaign || '',
      data.utmContent || '',
      data.utmTerm || '',
    ]);

    return jsonResponse_({
      status: 'success',
      message: 'Lead captured',
    });
  } catch (error) {
    return jsonResponse_({
      status: 'error',
      message: error.message,
    });
  }
}

function getOrCreateSheet_() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

  if (sheet) {
    return sheet;
  }

  const newSheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet(SHEET_NAME);
  newSheet.appendRow([
    'Timestamp',
    'Full Name',
    'Business Name',
    'Phone Number',
    'Email Address',
    'Business Type',
    'Website Goal',
    'Business Summary',
    'Consent',
    'Source',
    'Submitted At',
    'Page URL',
    'UTM Source',
    'UTM Medium',
    'UTM Campaign',
    'UTM Content',
    'UTM Term',
  ]);

  return newSheet;
}

function jsonResponse_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
