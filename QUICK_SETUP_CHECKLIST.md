# ✅ Quick Setup Checklist
## 22/08 歓迎会＋送別会 Google Forms Integration

**Time needed: ~30 minutes**

---

## 📋 Step-by-Step Setup

### 1. Create Google Sheet (5 minutes)
- [ ] Go to [sheets.google.com](https://sheets.google.com)
- [ ] Create new sheet: `22-08歓迎会送別会_Restaurant_Voting`
- [ ] Create 2 tabs: `Vote_Data` and `Vote_Summary`
- [ ] Add headers to Vote_Data: `Timestamp | Name | Email | Restaurant_Choice | Comments`
- [ ] Set up Vote_Summary with restaurant names and COUNTIF formulas

### 2. Create 3 Google Forms (15 minutes)
- [ ] **Form 1**: Buffet Poseidon (use template from GOOGLE_FORMS_TEMPLATES.md)
- [ ] **Form 2**: Nhà Hàng Món Huế (use template)
- [ ] **Form 3**: Saigon Skydeck (use template)
- [ ] Link all forms to the same Google Sheet
- [ ] Set "Limit to 1 response" for each form

### 3. Get Form URLs (2 minutes)
- [ ] Click "Send" → "Link" for each form
- [ ] Copy the 3 URLs (they look like `https://forms.gle/abc123`)
- [ ] Keep them handy for next step

### 4. Update Website Code (3 minutes)
- [ ] Open `src/data/restaurants.js`
- [ ] Replace these 3 placeholder URLs with your real form URLs:
  ```javascript
  votingUrl: "https://forms.gle/YOUR_BUFFET_POSEIDON_FORM_ID"    // ← Replace this
  votingUrl: "https://forms.gle/YOUR_NHA_HANG_MON_HUE_FORM_ID"  // ← Replace this  
  votingUrl: "https://forms.gle/YOUR_SAIGON_SKYDECK_FORM_ID"    // ← Replace this
  ```

### 5. Test Everything (5 minutes)
- [ ] Restart your development server: `npm run dev`
- [ ] Open website: [http://localhost:5174/Voting_Res/](http://localhost:5174/Voting_Res/)
- [ ] Click each "Vote Now" button to test forms
- [ ] Submit test votes and verify they appear in Google Sheet
- [ ] Check that vote counts update in Vote_Summary sheet

---

## 🔧 Expected File Updates

**Files you need to modify:**
```
src/data/restaurants.js  ← Update the 3 votingUrl values
```

**Files you don't need to touch:**
```
✅ src/App.jsx
✅ src/components/RestaurantCard.jsx  
✅ src/components/VoteResults.jsx
✅ src/context/LanguageContext.jsx
✅ All other files are ready!
```

---

## 📊 Google Sheet Formula Reference

**Quick copy-paste for Vote_Summary sheet:**

```
A1: Restaurant_Name                                   B1: Vote_Count                      C1: Percentage
A2: Pink Pong Buffet                                  B2: =COUNTIF(Vote_Data!D:D,A2)     C2: =IF(SUM($B$2:$B$8)=0,0,B2/SUM($B$2:$B$8)*100)
A3: Yaki Yaki Yo - Buffet băng chuyền Nướng         B3: =COUNTIF(Vote_Data!D:D,A3)     C3: =IF(SUM($B$2:$B$8)=0,0,B3/SUM($B$2:$B$8)*100)
A4: PANDA BBQ                                         B4: =COUNTIF(Vote_Data!D:D,A4)     C4: =IF(SUM($B$2:$B$8)=0,0,B4/SUM($B$2:$B$8)*100)
A5: Hải sản Xóm Chài                                 B5: =COUNTIF(Vote_Data!D:D,A5)     C5: =IF(SUM($B$2:$B$8)=0,0,B5/SUM($B$2:$B$8)*100)
A6: Tiệm Bia Leng Keng - 351 Tây Thạnh               B6: =COUNTIF(Vote_Data!D:D,A6)     C6: =IF(SUM($B$2:$B$8)=0,0,B6/SUM($B$2:$B$8)*100)
A7: Bia Hơi Hà Nội Một Không Hai                     B7: =COUNTIF(Vote_Data!D:D,A7)     C7: =IF(SUM($B$2:$B$8)=0,0,B7/SUM($B$2:$B$8)*100)
A8: Buffet Bếp Nhà 168k - Lẩu Nướng Bò Hải Sản      B8: =COUNTIF(Vote_Data!D:D,A8)     C8: =IF(SUM($B$2:$B$8)=0,0,B8/SUM($B$2:$B$8)*100)
```

---

## 🚨 Common Issues & Solutions

**❌ "Form doesn't open when clicking Vote Now"**
✅ Check that you copied the full form URL including `https://`

**❌ "Votes not appearing in Google Sheet"**  
✅ Verify forms are linked to sheet (Responses tab → Link to Sheets)

**❌ "Vote counts showing 0 in Vote_Summary"**
✅ Check COUNTIF formulas reference the correct sheet name and column

**❌ "Website shows old restaurant names"**
✅ Make sure restaurant names in Google Sheet exactly match names in code

---

## 🎯 Success Criteria

When setup is complete, you should see:
- ✅ 3 working Google Forms with proper branding
- ✅ All form submissions appear in one Google Sheet
- ✅ Vote counts automatically update in Vote_Summary  
- ✅ "Vote Now" buttons open correct forms from website
- ✅ Forms can only be submitted once per person
- ✅ Real-time vote tracking in Google Sheets

---

## 📱 What Your Team Will See

**On the website:**
- Beautiful restaurant cards with Vietnamese info
- Bilingual Japanese-Vietnamese interface  
- One-click voting via "Vote Now" buttons
- Real-time vote results display (updated manually)

**In Google Forms:**
- Professional-looking forms with restaurant details
- Bilingual descriptions
- Simple name/email + vote confirmation
- Thank you message after voting

**In Google Sheets:**
- All vote data in one place
- Automatic vote counting
- Easy export to CSV
- Real-time monitoring

---

## 🏆 You're Ready!

Once you complete this checklist, your **22/08 歓迎会＋送別会** restaurant voting system will be fully operational!

Your team can start voting immediately, and you'll have professional data collection and real-time results tracking.

**Good luck with your welcome + farewell party! 🎉👋**
