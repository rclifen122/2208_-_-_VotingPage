# 🚀 API Setup Instructions
## Simple One-Click Voting for 22/08 歓迎会＋送別会

**Replace Google Forms with direct API integration for instant voting**

---

## 📋 Current Status

✅ **Website Ready**: Your voting website is fully prepared for API integration  
🟡 **Demo Mode**: Currently running in demo mode with simulated voting  
⚙️ **API Needed**: Follow the steps below to connect to Google Sheets  

---

## 🎯 What You Need To Do (15 minutes)

### Step 1: Set Up Google Sheets Database (5 minutes)

1. **Create Google Sheet**: [sheets.google.com](https://sheets.google.com)
   - Name: `22-08歓迎会送別会_Voting_Database`

2. **Create "Vote_Counts" sheet** with this exact structure:
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

### Step 2: Create Google Apps Script API (8 minutes)

1. **In your Google Sheet**: Extensions → Apps Script
2. **Delete default code** and paste the API code from `SIMPLE_VOTING_SETUP.md`
3. **Save** the script
4. **Deploy**: Deploy → New deployment → Web app
   - Execute as: Me
   - Who has access: Anyone
5. **Copy the Web App URL** (starts with `https://script.google.com/...`)

### Step 3: Update Website Code (2 minutes)

1. **Open**: `src/services/votingApi.js`
2. **Replace** this line:
```javascript
const API_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
```
**With your actual URL**:
```javascript
const API_URL = 'https://script.google.com/macros/s/YOUR_ACTUAL_SCRIPT_ID/exec';
```

3. **Save the file**

---

## ✅ Testing Your Setup

### Test the API Directly:
1. Open your Google Apps Script URL in browser
2. Should return JSON with current vote counts

### Test the Website:
1. Refresh your website: [http://localhost:5174/Voting_Res/](http://localhost:5174/Voting_Res/)
2. You should see: 🟢 **API đã kết nối** (API接続済み)
3. Click "Vote Now" buttons - votes should increment immediately
4. Check Google Sheet - vote counts should update in real-time

---

## 🔍 What Will Change

**Before (Demo Mode):**
- 🟡 **Chế độ demo** (デモモード)
- Votes are simulated and reset on page refresh
- Data stored only in browser localStorage

**After (API Connected):**
- 🟢 **API đã kết nối** (API接続済み)  
- Real votes saved to Google Sheets
- Persistent data across all devices
- Real-time vote counting
- Auto-refresh every 30 seconds

---

## 🛠️ Troubleshooting

**❌ Still shows "Demo Mode"?**
- Check that you updated the API_URL in `src/services/votingApi.js`
- Make sure the URL starts with `https://script.google.com/macros/s/`

**❌ Votes not working?**
- Test your Google Apps Script URL directly in browser
- Check browser console for error messages
- Verify Google Sheet has correct column headers

**❌ CORS errors?**
- Make sure your Google Apps Script includes the CORS headers
- Try accessing from incognito/private browser window

---

## 📊 Expected Results

Once connected, you'll have:

### Real-Time Features:
- ⚡ **Instant voting** - Click and vote is recorded immediately
- 📊 **Live updates** - Vote counts refresh every 30 seconds
- 🔄 **Cross-device sync** - Votes visible on all devices
- 📈 **Persistent data** - Votes saved permanently in Google Sheets

### Data Management:
- 📋 **Vote tracking** - Complete audit trail with timestamps
- 📊 **Easy analysis** - Export data from Google Sheets
- 🔒 **Secure storage** - Data stored in your Google account
- 📱 **Mobile ready** - Works on all devices

---

## 📁 Files Modified

**You only need to edit 1 file:**
```
✏️ src/services/votingApi.js  ← Update API_URL here
```

**Everything else is ready:**
```
✅ src/App.jsx                    ← Real-time updates ready
✅ src/components/RestaurantCard.jsx  ← API voting ready  
✅ src/data/restaurants.js       ← Google Forms URLs removed
✅ All other files               ← No changes needed
```

---

## 🎉 You're Almost There!

Your **22/08 歓迎会＋送別会** voting system is 99% complete!

Just follow the 3 steps above (15 minutes) and you'll have:
- 🗳️ **Professional one-click voting**
- 📊 **Real-time Google Sheets integration** 
- 🌐 **Bilingual Vietnamese-Japanese interface**
- 📱 **Mobile-responsive design**
- 🔄 **Live vote updates**

**Perfect for your welcome + farewell party! 🎊**
