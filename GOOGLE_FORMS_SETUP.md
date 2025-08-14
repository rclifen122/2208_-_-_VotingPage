# 🗳️ Google Forms & Sheets Setup Guide
## 22/08 歓迎会＋送別会 Restaurant Voting

This guide will help you set up Google Forms and Google Sheets to collect and manage voting data for your restaurant selection.

## 📋 Overview

We'll create:
1. **One Google Sheet** - Master data collection spreadsheet
2. **Three Google Forms** - One for each restaurant option
3. **Form Integration** - Connect forms to the main spreadsheet
4. **Data Analysis** - Set up automatic vote counting

---

## 🚀 Step 1: Create Master Google Sheet

### 1.1 Create New Spreadsheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Click **"+ Blank"** to create new spreadsheet
3. **Rename** to: `22-08歓迎会送別会_Restaurant_Voting`

### 1.2 Set Up Sheet Structure
Create these sheets (tabs at bottom):
- **`Vote_Data`** - All form responses
- **`Vote_Summary`** - Automatic vote counting
- **`Participant_List`** - Optional: Track who voted

#### Vote_Data Sheet Headers (Row 1):
```
A1: Timestamp
B1: Name (名前)
C1: Email
D1: Restaurant_Choice (レストラン選択)
E1: Comments (コメント)
F1: Form_Source
```

#### Vote_Summary Sheet:
```
A1: Restaurant_Name
B1: Vote_Count
C1: Percentage
D1: Last_Updated

A2: Pink Pong Buffet
A3: Yaki Yaki Yo - Buffet băng chuyền Nướng
A4: PANDA BBQ
A5: Hải sản Xóm Chài
A6: Tiệm Bia Leng Keng - 351 Tây Thạnh
A7: Bia Hơi Hà Nội Một Không Hai
A8: Buffet Bếp Nhà 168k - Lẩu Nướng Bò Hải Sản
```

Add this formula in B2 (and copy to B3, B4, B5, B6, B7, B8):
```
=COUNTIF(Vote_Data!D:D,A2)
```

Add this formula in C2 (and copy to C3, C4, C5, C6, C7, C8):
```
=IF(SUM($B$2:$B$8)=0,0,B2/SUM($B$2:$B$8)*100)
```

---

## 📝 Step 2: Create Google Forms (One for Each Restaurant)

### 2.1 Form 1: Buffet Poseidon Celadon Tân Phú

1. Go to [Google Forms](https://forms.google.com)
2. Click **"+ Blank form"**
3. **Form Title**: `22/08歓迎会＋送別会 - Buffet Poseidon投票`
4. **Description**: 
   ```
   Buffet Poseidon Celadon Tân Phú
   ブッフェ ポセイドン セラドン タンフー
   
   Seafood buffet restaurant in Celadon City
   Price: 350,000đ - 450,000đ
   Rating: ⭐4.4 (367 reviews)
   ```

#### Form Questions:
1. **Name (お名前)** 
   - Type: Short answer
   - Required: Yes

2. **Email**
   - Type: Short answer  
   - Required: Yes
   - Validation: Email address

3. **Restaurant Choice (確認)**
   - Type: Multiple choice
   - Options: `Buffet Poseidon Celadon Tân Phú`
   - Pre-selected: `Buffet Poseidon Celadon Tân Phú`
   - Required: Yes

4. **Comments/Reason (コメント・理由)**
   - Type: Paragraph
   - Required: No
   - Placeholder: "Why do you choose this restaurant? この店を選ぶ理由は？"

#### Form Settings:
- **Responses Tab** → **Link to Sheets** → Select your master spreadsheet
- **Settings** → **Presentation**:
  - Show progress bar: ✅
  - Confirmation message: "投票ありがとうございます！Thank you for voting!"

### 2.2 Form 2: Nhà Hàng Món Huế
Repeat the same process with:
- **Title**: `22/08歓迎会＋送別会 - Nhà Hàng Món Huế投票`
- **Description**: Include Hue restaurant details
- **Restaurant Choice**: Pre-select `Nhà Hàng Món Huế`

### 2.3 Form 3: Saigon Skydeck Restaurant  
Repeat with:
- **Title**: `22/08歓迎会＋送別会 - Saigon Skydeck投票`
- **Description**: Include fine dining details
- **Restaurant Choice**: Pre-select `Saigon Skydeck Restaurant`

---

## 🔗 Step 3: Get Form URLs and Update Website

### 3.1 Get Shareable Form URLs
For each form:
1. Click **Send** button (top-right)
2. Click **Link** tab 
3. **Copy** the URL (e.g., `https://forms.gle/abcd1234`)
4. **Optional**: Click "Shorten URL" for cleaner links

### 3.2 Update Restaurant Data
Update the `votingUrl` in your `src/data/restaurants.js`:

```javascript
// Replace these URLs with your actual Google Form URLs
{
  id: 1,
  name: "Buffet Poseidon Celadon Tân Phú",
  // ... other data ...
  votingUrl: "https://forms.gle/YOUR_FORM_1_ID_HERE"
},
{
  id: 2, 
  name: "Nhà Hàng Món Huế",
  // ... other data ...
  votingUrl: "https://forms.gle/YOUR_FORM_2_ID_HERE"
},
{
  id: 3,
  name: "Saigon Skydeck Restaurant", 
  // ... other data ...
  votingUrl: "https://forms.gle/YOUR_FORM_3_ID_HERE"
}
```

---

## 📊 Step 4: Set Up Real-Time Data Sync (Optional Advanced)

### 4.1 Google Sheets API Setup
If you want live vote counts on your website:

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create new project: `Restaurant-Voting-22-08`
3. Enable **Google Sheets API**
4. Create **Service Account** credentials
5. Share your spreadsheet with the service account email

### 4.2 Basic Web Integration
For simpler setup, manually update vote counts or use Google Sheets' **"Publish to web"** feature:

1. **File** → **Share** → **Publish to web**
2. Select **Vote_Summary** sheet
3. Format: **CSV**
4. Copy the public URL
5. Use this URL to fetch vote data in your app

---

## 🎯 Step 5: Testing Your Setup

### 5.1 Test Form Submissions
1. Submit test votes through each form
2. Check if data appears in your Google Sheet
3. Verify vote counts update in Vote_Summary

### 5.2 Test Website Integration
1. Click "Vote Now" buttons on your website
2. Ensure forms open correctly
3. Submit test votes and verify user experience

---

## 📈 Step 6: Monitor and Manage Votes

### 6.1 Real-Time Monitoring
- **Google Sheets**: Check Vote_Summary for live counts
- **Form Responses**: View individual submissions
- **Charts**: Create charts in Google Sheets for visualization

### 6.2 Data Export Options
- **CSV Export**: Download for analysis
- **Google Data Studio**: Create dashboards
- **Manual Updates**: Update website vote counts periodically

---

## 🔧 Quick Setup Checklist

- [ ] ✅ Create master Google Sheet with proper structure
- [ ] ✅ Create 3 Google Forms (one per restaurant)
- [ ] ✅ Link all forms to the same spreadsheet
- [ ] ✅ Set up automatic vote counting formulas
- [ ] ✅ Get shareable form URLs
- [ ] ✅ Update `src/data/restaurants.js` with real URLs
- [ ] ✅ Test form submissions and data collection
- [ ] ✅ Deploy website with updated form links

---

## 🆘 Troubleshooting

**Q: Forms not collecting data?**
A: Check that forms are linked to spreadsheet in Responses tab

**Q: Vote counts not updating?**
A: Verify formulas in Vote_Summary sheet reference correct ranges

**Q: Website forms not opening?**
A: Ensure form URLs are publicly accessible and not restricted

**Q: Want to prevent duplicate voting?**
A: Enable "Limit to 1 response" in form settings

---

## 📞 Need Help?

If you encounter issues:
1. Check Google Forms Help Center
2. Verify spreadsheet sharing permissions
3. Test forms in incognito mode
4. Ensure form URLs are correct in website code

**Ready to start collecting votes for your 22/08 歓迎会＋送別会! 🎉**
