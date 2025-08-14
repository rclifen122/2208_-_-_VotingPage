# 📝 Google Forms Templates
## 22/08 歓迎会＋送別会 Restaurant Voting Forms

Here are the exact templates for each of the 3 Google Forms you need to create.

---

## 🍤 Form 1: Buffet Poseidon Celadon Tân Phú

### Form Header
**Title:** `22/08歓迎会＋送別会 - Buffet Poseidon投票`

**Description:**
```
🍤 Buffet Poseidon Celadon Tân Phú
ブッフェ ポセイドン セラドン タンフー

🌟 Rating: 4.4/5 ⭐ (367 reviews)
💰 Price: 350,000đ - 450,000đ  
📍 Celadon City, Tân Phú, TP.HCM
📞 +84 328 775 768
👥 Capacity: 80+ guests

🦐 Specialties:
• Tôm nướng (焼きエビ) - Grilled Shrimp
• Cua rang me (タマリンド炒めカニ) - Tamarind Crab  
• Lẩu hải sản (海鮮鍋) - Seafood Hotpot
• Sashimi tươi (新鮮刺身) - Fresh Sashimi

Perfect for large groups with wide variety of fresh seafood!
大人数グループに最適な新鮮シーフードビュッフェ！
```

### Questions:
1. **Name (お名前) *** 
   - Type: Short answer
   - Required: Yes

2. **Email *** 
   - Type: Short answer
   - Required: Yes
   - Response validation: Email address

3. **I vote for this restaurant (このレストランに投票します) ***
   - Type: Multiple choice
   - Options: 
     - ✅ `Yes, I vote for Buffet Poseidon! (はい、ブッフェポセイドンに投票します！)`
   - Required: Yes

4. **Why do you choose this restaurant? (なぜこのレストランを選びますか？)**
   - Type: Paragraph
   - Required: No
   - Help text: `Share your reasons: price, food quality, location, etc. / 理由をお聞かせください：価格、料理の質、立地など`

---

## 🍜 Form 2: Nhà Hàng Món Huế

### Form Header  
**Title:** `22/08歓迎会＋送別会 - Nhà Hàng Món Huế投票`

**Description:**
```
🍜 Nhà Hàng Món Huế  
フエ料理レストラン

🌟 Rating: 4.6/5 ⭐ (892 reviews)
💰 Price: 280,000đ - 380,000đ
📍 23 Nguyễn Thị Minh Khai, Q.1, TP.HCM  
📞 +84 28 3829 1234
👥 Capacity: 60+ guests

🏛️ Specialties:
• Bún bò Huế (フエ牛肉麺) - Hue Beef Noodle Soup
• Bánh khoái (バインコアイ) - Hue Pancake
• Chả cá Lăng (ランチャーカー) - Grilled Fish with Turmeric
• Chè Huế (フエデザート) - Hue Traditional Dessert

Traditional royal Hue cuisine in elegant setting!
エレガントな雰囲気で楽しむ伝統的なフエ宮廷料理！
```

### Questions: (Same structure as Form 1, but replace option with)
3. **I vote for this restaurant (このレストランに投票します) ***
   - Options: 
     - ✅ `Yes, I vote for Nhà Hàng Món Huế! (はい、フエ料理レストランに投票します！)`

---

## 🏙️ Form 3: Saigon Skydeck Restaurant

### Form Header
**Title:** `22/08歓迎会＋送別会 - Saigon Skydeck投票`

**Description:**
```
🏙️ Saigon Skydeck Restaurant
サイゴンスカイデッキレストラン

🌟 Rating: 4.7/5 ⭐ (1,247 reviews)  
💰 Price: 800,000đ - 1,200,000đ
📍 Lầu 49-52, Bitexco Financial Tower, Q.1, TP.HCM
📞 +84 28 3915 6156
👥 Capacity: 50+ guests

🥩 Specialties:
• Wagyu steak - Premium Japanese Beef
• Tôm hùm nướng (焼きロブスター) - Grilled Lobster  
• Foie gras - French Delicacy
• Wine cao cấp (高級ワイン) - Premium Wine Selection

Luxury fine dining with stunning Saigon city view!
サイゴンの絶景を楽しめる高級ファインダイニング！
```

### Questions: (Same structure, but replace option with)
3. **I vote for this restaurant (このレストランに投票します) ***
   - Options:
     - ✅ `Yes, I vote for Saigon Skydeck! (はい、サイゴンスカイデッキに投票します！)`

---

## ⚙️ Form Settings for All Forms

### Presentation Settings:
- ✅ Show progress bar
- ✅ Shuffle question order: OFF
- **Confirmation message:** 
  ```
  🎉 投票ありがとうございます！
  Thank you for voting!
  
  Your vote has been recorded for the 22/08 歓迎会＋送別会.
  22/08歓迎会＋送別会の投票が記録されました。
  
  Results will be announced soon!
  結果は近日発表します！
  ```

### Response Settings:
- ✅ Collect email addresses
- ✅ Limit to 1 response (prevents duplicate voting)
- ✅ Edit after submit: OFF
- ✅ See summary charts and text responses

### Quiz Settings:
- Make this a quiz: OFF

---

## 🔗 After Creating Forms

### Get Your Form URLs:
1. Click **Send** button (top-right of form)
2. Click **Link** icon 📎
3. Copy the URL (e.g., `https://forms.gle/abc123xyz`)
4. Optional: Check "Shorten URL" for cleaner links

### Update Your Website:
Replace the URLs in `src/data/restaurants.js`:

```javascript
// BEFORE (placeholder)
votingUrl: "https://forms.gle/YOUR_BUFFET_POSEIDON_FORM_ID"

// AFTER (your actual form URL)  
votingUrl: "https://forms.gle/1a2b3c4d5e6f7g8h9i"
```

### Test Your Forms:
1. Submit a test vote through each form
2. Check that data appears in your Google Sheet
3. Verify the "Vote Now" buttons work on your website

---

## 📊 Google Sheets Setup Quick Reference

### Sheet 1: "Vote_Data" (Raw responses)
```
A1: Timestamp    B1: Name    C1: Email    D1: Restaurant_Choice    E1: Comments
```

### Sheet 2: "Vote_Summary" (Vote counts)
```
A1: Restaurant_Name                        B1: Vote_Count    C1: Percentage
A2: Buffet Poseidon Celadon Tân Phú       B2: =COUNTIF(Vote_Data!D:D,A2)    C2: =B2/SUM($B$2:$B$4)*100
A3: Nhà Hàng Món Huế                      B3: =COUNTIF(Vote_Data!D:D,A3)    C3: =B3/SUM($B$2:$B$4)*100  
A4: Saigon Skydeck Restaurant              B4: =COUNTIF(Vote_Data!D:D,A4)    C4: =B4/SUM($B$2:$B$4)*100
```

**You're all set! 🚀 Ready to collect votes for your 22/08 歓迎会＋送別会!**
