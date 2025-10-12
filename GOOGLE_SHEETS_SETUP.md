# Google Apps Script Setup Instructions

## Step 1: Create a Google Spreadsheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Mumbaikar Travels - Bookings" (or any name you prefer)
4. Add these column headers in row 1:
   - A1: Timestamp
   - B1: Name
   - C1: Phone
   - D1: From
   - E1: To
   - F1: Travel Date
   - G1: Passengers
   - H1: Service Type

## Step 2: Create Google Apps Script

1. Go to [Google Apps Script](https://script.google.com)
2. Click "New Project"
3. Replace the default code with this script:

```javascript
function doPost(e) {
  try {
    // Replace this with your actual spreadsheet ID
    const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE';
    const SHEET_NAME = 'Sheet1'; // Change if your sheet has a different name
    
    // Log the incoming request for debugging
    console.log('Incoming request:', e);
    console.log('Post data:', e.postData);
    
    // Parse the incoming data with better error handling
    let data;
    try {
      if (e.postData && e.postData.contents) {
        data = JSON.parse(e.postData.contents);
      } else {
        throw new Error('No post data received');
      }
    } catch (parseError) {
      console.error('JSON parsing error:', parseError);
      throw new Error('Invalid JSON data received: ' + parseError.toString());
    }
    
    console.log('Parsed data:', data);
    
    // Get the spreadsheet - try different methods for compatibility
    let spreadsheet;
    try {
      // First try to get by ID
      spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
      console.log('Spreadsheet opened successfully by ID');
    } catch (error) {
      console.log('OpenById failed, trying URL method:', error);
      // Fallback: try opening by URL if ID doesn't work
      const url = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/edit`;
      spreadsheet = SpreadsheetApp.openByUrl(url);
      console.log('Spreadsheet opened successfully by URL');
    }
    
    const sheet = spreadsheet.getSheetByName(SHEET_NAME);
    
    if (!sheet) {
      throw new Error(`Sheet "${SHEET_NAME}" not found in the spreadsheet`);
    }
    
    console.log('Sheet found:', SHEET_NAME);
    
    // Prepare row data in the order of your columns
    const rowData = [
      data.timestamp || new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      data.name || '',
      data.phone || '',
      data.pickupLocation || '',
      data.dropLocation || '',
      data.travelDate || '',
      data.passengers || '',
      data.serviceType || 'General Booking'
    ];
    
    console.log('Row data to be added:', rowData);
    
    // Append the data to the sheet
    sheet.appendRow(rowData);
    console.log('Row added successfully');
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Data added successfully',
        timestamp: data.timestamp,
        rowsAdded: 1,
        dataReceived: data
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Log the error for debugging
    console.error('Apps Script Error:', error);
    
    // Return detailed error response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString(),
        message: 'Failed to add data to spreadsheet',
        stack: error.stack
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function to verify the script works
function testFunction() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        name: 'Test User',
        phone: '+91 9999999999',
        pickupLocation: 'Mumbai',
        dropLocation: 'Pune',
        travelDate: '2025-10-03',
        passengers: '2-3',
        serviceType: 'Test Booking'
      })
    }
  };
  
  const result = doPost(testData);
  console.log(result.getContent());
}

// Debug function to test with different data formats
function debugFunction() {
  // Test what the actual request looks like
  console.log('Testing Apps Script...');
  
  // Simulate the exact format that comes from your website
  const websiteData = {
    postData: {
      contents: '{"name":"Debug Test","phone":"+91 1234567890","pickupLocation":"Test From","dropLocation":"Test To","travelDate":"2025-10-03","passengers":"1-2","serviceType":"Debug Service","timestamp":"10/2/2025, 3:30:00 PM"}'
    }
  };
  
  const result = doPost(websiteData);
  console.log('Debug result:', result.getContent());
}
```

4. Replace `YOUR_SPREADSHEET_ID_HERE` with your actual spreadsheet ID
5. Save the project (Ctrl+S) and name it "Mumbaikar Travels Form Handler"

## Step 3: Get Spreadsheet ID

1. Open your Google Spreadsheet
2. Look at the URL: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit#gid=0`
3. Copy the SPREADSHEET_ID part and replace it in your Apps Script

## Step 4: Deploy the Apps Script

1. In Apps Script, click "Deploy" > "New Deployment"
2. Click the gear icon next to "Type" and select "Web app"
3. Set these options:
   - Description: "Mumbaikar Travels Form Handler"
   - Execute as: "Me"
   - Who has access: "Anyone"
4. Click "Deploy"
5. Review permissions and click "Authorize access"
6. Copy the "Web app URL" - this is your `GOOGLE_APPS_SCRIPT_URL`

## Step 5: Set Environment Variable

1. Create a `.env.local` file in your project root
2. Add this variable:
```
GOOGLE_APPS_SCRIPT_URL=your_web_app_url_from_step_4
```

## Step 6: Test the Integration

1. **Test the Apps Script first:**
   - In Apps Script editor, click the "Run" button next to `testFunction`
   - Check the execution log for any errors
   - If successful, you should see a test row added to your spreadsheet

2. **Test from your website:**
   - Fill out a booking form on your website
   - Check your Google Spreadsheet - new rows should appear automatically
   - The form will still work even if the script fails (failsafe design)

## Troubleshooting

**If test function works but website submissions fail:**

1. **Update your Apps Script** with the new code above (includes better logging)
2. **Redeploy the web app** after making changes:
   - Go to Deploy > Manage Deployments
   - Click the edit icon (pencil)
   - Change version to "New Version"
   - Click "Deploy"
3. **Update your .env.local** with the new deployment URL
4. **Check Apps Script logs** when submitting from website:
   - Go to Apps Script > Executions
   - Look for recent executions and click to see logs
5. **Run the `debugFunction`** in Apps Script to test with website-like data

**If you get "openById" errors:**
1. Make sure your `SPREADSHEET_ID` is correct (from the URL)
2. Ensure the Google account running the script has access to the spreadsheet
3. Try sharing the spreadsheet with the same email used for Apps Script
4. The updated script includes a fallback method using `openByUrl`

**If you get "Sheet not found" errors:**
1. Check your `SHEET_NAME` in the script (default is 'Sheet1')
2. Make sure the sheet name matches exactly (case-sensitive)

**If the script times out:**
1. The spreadsheet might be too large
2. Try creating a new, smaller spreadsheet for testing

**To debug step by step:**
1. First run `testFunction` - this should work
2. Then run `debugFunction` - this simulates website data
3. Check the Apps Script execution logs (View > Executions)
4. Look at your browser's Network tab when submitting forms
5. Compare the console logs between test and real submissions

## Notes

- No API keys required - simpler than Sheets API
- The integration is non-blocking - WhatsApp functionality works even if script fails
- All form submissions are logged to console for debugging
- Timestamps are in Indian Standard Time (IST)
- You can customize column order by modifying the `rowData` array in the script
- Make sure your spreadsheet is accessible to the Apps Script (same Google account)