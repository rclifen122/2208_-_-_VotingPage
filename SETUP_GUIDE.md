## End-to-End Setup Guide

Use this when you spin up the project on a new machine or redeploy from scratch.

---

### 1. Clone & install
```bash
git clone https://github.com/HKSilverlord/Vote_REs.git
cd Vote_REs
npm install
```

---

### 2. Configure environment variables
Create a `.env` or set project variables with:
```
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
VITE_ADMIN_PASSCODE=some-strong-code
```
If you skip these, the site still works with the bundled fallback data, but the admin console and shared votes stay disabled.

---

### 3. Supabase bootstrap
1. Sign in to Supabase and create a project.
2. SQL Editor → paste `supabase/schema.sql` → **Run**.
3. Insert restaurants (matching the IDs you plan to use) and upload menu entries into `menu_images`.
4. Copy the project URL + anon key → update the env vars above.

---

### 4. Local verification
1. `npm run dev`
2. Visit `http://localhost:5173/` to confirm the public view (with live Supabase votes if env vars are present).
3. Visit `http://localhost:5173/admin`, log in with `zzblackstar67@gmail.com` + your `VITE_ADMIN_PASSCODE`, and test:
   - Updating a cover image URL
   - Reordering menu pages (Up/Down buttons) and saving
4. Optional fallback test: remove/env vars, ensure the page falls back to `restaurant_infor.txt` + `imagemenu/`.

---

### 5. GitHub + Vercel
```bash
git checkout main
git pull origin main
git add .
git commit -m "Describe the update"
git push origin main
```
Vercel (already connected to this repo) runs `npm run build` and publishes the result. Update the Vercel env vars whenever you change Supabase credentials or the admin passcode.

---

### 6. Launch checklist
- `npm run build` locally
- `git status` is clean
- Vercel preview renders `/` and `/admin`
- Supabase table shows the latest votes after casting one from a different browser and the dashboard reflects the totals
- Voting from the same browser only allows a single choice and highlights the selection in the dashboard
- Clicking a menu image opens the full-screen preview + "Open original" works

Once those pass, promote the Vercel deployment to production.***
