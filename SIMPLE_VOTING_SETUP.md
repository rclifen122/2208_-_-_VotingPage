# 🗳️ Simple One-Click Voting Setup
## 22/08 歓迎会＋送別会 - Direct Google Sheets Integration

**No forms, no email collection - just click and vote!**

---

## 📊 Step 1: Create Google Sheet Database (5 minutes)

### 1.1 Create Spreadsheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create new sheet: `22-08歓迎会送別会_Voting_Database`

### 1.2 Set Up Sheet Structure

#### Sheet 1: "Vote_Counts"
```
A1: Restaurant_ID    B1: Restaurant_Name                                   C1: Vote_Count    D1: Last_Updated
A2: 1               B2: Pink Pong Buffet                                   C2: 0            D2: 
A3: 2               B3: Yaki Yaki Yo - Buffet băng chuyền Nướng           C3: 0            D3: 
A4: 3               B4: PANDA BBQ                                          C4: 0            D4: 
A5: 4               B5: Hải sản Xóm Chài                                   C5: 0            D5: 
A6: 5               B6: Tiệm Bia Leng Keng - 351 Tây Thạnh                C6: 0            D6: 
A7: 6               B7: Bia Hơi Hà Nội Một Không Hai                      C7: 0            D7: 
A8: 7               B8: Buffet Bếp Nhà 168k - Lẩu Nướng Bò Hải Sản        C8: 0            D8: 
```

#### Sheet 2: "Vote_Log" (Optional - tracks each vote)
```
A1: Timestamp    B1: Restaurant_ID    C1: Restaurant_Name    D1: IP_Address
```

---

## ⚙️ Step 2: Create Google Apps Script API (10 minutes)

### 2.1 Open Apps Script
1. In your Google Sheet, click **Extensions** → **Apps Script**
2. Delete the default code
3. Paste this code:

```javascript
// 22/08 歓迎会＋送別会 Voting API
function doPost(e) {
  try {
    // Parse the request
    const data = JSON.parse(e.postData.contents);
    const restaurantId = parseInt(data.restaurantId);
    
    // Get the spreadsheet
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const voteSheet = ss.getSheetByName('Vote_Counts');
    const logSheet = ss.getSheetByName('Vote_Log');
    
    // Find and update vote count
    const range = voteSheet.getRange('A:D');
    const values = range.getValues();
    
    for (let i = 1; i < values.length; i++) {
      if (values[i][0] === restaurantId) {
        // Increment vote count
        const currentVotes = values[i][2] || 0;
        voteSheet.getRange(i + 1, 3).setValue(currentVotes + 1);
        voteSheet.getRange(i + 1, 4).setValue(new Date());
        
        // Log the vote (optional)
        if (logSheet) {
          logSheet.appendRow([
            new Date(),
            restaurantId,
            values[i][1], // Restaurant name
            e.parameter.userIP || 'Unknown'
          ]);
        }
        
        // Return success response
        return ContentService
          .createTextOutput(JSON.stringify({
            success: true,
            restaurantId: restaurantId,
            newVoteCount: currentVotes + 1,
            message: 'Vote recorded successfully!'
          }))
          .setMimeType(ContentService.MimeType.JSON)
          .setHeaders({
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
          });
      }
    }
    
    // Restaurant not found
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: 'Restaurant not found'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Error handling
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: 'Error: ' + error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle GET requests to fetch current vote counts
function doGet(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('Vote_Counts');
    const range = sheet.getRange('A2:D8'); // Updated for 7 restaurants
    const values = range.getValues();
    
    const results = values.map(row => ({
      id: row[0],
      name: row[1],
      votes: row[2] || 0,
      lastUpdated: row[3]
    }));
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        data: results
      }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      });
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: 'Error: ' + error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle OPTIONS requests for CORS
function doOptions(e) {
  return ContentService
    .createTextOutput('')
    .setHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
}
```

### 2.2 Deploy the API
1. Click **Save** (💾)
2. Click **Deploy** → **New deployment**
3. **Type**: Web app
4. **Execute as**: Me
5. **Who has access**: Anyone
6. Click **Deploy**
7. **Copy the Web app URL** (looks like: `https://script.google.com/macros/s/ABC123.../exec`)

---

## 💻 Step 3: Update Website Code (5 minutes)

### 3.1 Create API Service
Create `src/services/votingApi.js`:

```javascript
// Voting API service for Google Sheets integration
const API_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE'; // Replace with your actual URL

export const submitVote = async (restaurantId) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        restaurantId: restaurantId
      })
    });
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Vote submission error:', error);
    return {
      success: false,
      message: 'Network error. Please try again.'
    };
  }
};

export const fetchVoteCounts = async () => {
  try {
    const response = await fetch(API_URL, {
      method: 'GET'
    });
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Vote fetch error:', error);
    return {
      success: false,
      message: 'Could not fetch vote counts.'
    };
  }
};
```

### 3.2 Update Restaurant Data
Replace `src/data/restaurants.js` votingUrl with your API:

```javascript
// Remove votingUrl completely - we'll use direct API calls instead
// No more Google Forms needed!
```

---

## 🔄 Step 4: Update Vote Logic (10 minutes)

The website code needs to be updated to use the new API instead of Google Forms.

**Files to modify:**
- `src/components/RestaurantCard.jsx` - Change vote button behavior
- `src/App.jsx` - Add real-time vote fetching
- `src/services/votingApi.js` - New file (API service)

---

## ⚡ Step 5: Test the System (5 minutes)

### 5.1 Test API Directly
1. Open your Google Apps Script URL in browser
2. Should return current vote counts in JSON format

### 5.2 Test Website Integration
1. Click "Vote Now" buttons
2. Check Google Sheet - vote counts should increment immediately
3. Refresh page - vote counts should persist

---

## 📊 Benefits of This Approach

✅ **One-click voting** - No forms to fill out  
✅ **Real-time updates** - Instant vote counting  
✅ **No email collection** - Completely anonymous  
✅ **Automatic tracking** - All data in Google Sheets  
✅ **Fraud prevention** - Can add IP tracking if needed  
✅ **Scalable** - Handles many simultaneous votes  
✅ **Free** - Uses only Google's free services  

---

## 🔧 Optional Enhancements

### Prevent Duplicate Voting (Optional):
- Track IP addresses in Vote_Log sheet
- Add browser localStorage to prevent multiple votes
- Time-based restrictions (e.g., 1 vote per hour)

### Real-time Updates:
- Fetch vote counts every 30 seconds
- Show live vote changes without page refresh
- Add loading animations

### Advanced Analytics:
- Track voting patterns over time
- Export data for detailed analysis
- Create charts and dashboards

---

## 🚨 Important Notes

1. **Replace API URL**: Update `YOUR_GOOGLE_APPS_SCRIPT_URL_HERE` with your actual deployment URL
2. **Test thoroughly**: Make sure CORS is working properly
3. **Monitor usage**: Check Google Apps Script quotas if you expect high traffic
4. **Backup data**: Google Sheets auto-saves, but consider periodic backups

---

## 🎯 Final Result

When complete, users will:
1. **See restaurant options** on your website
2. **Click "Vote Now"** - no forms, no questions
3. **Get instant confirmation** - "Vote recorded!"
4. **See updated counts** - real-time vote tracking

**Simple, fast, and effective! 🚀**
