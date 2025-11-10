## Deployment & Integration Guide

This project is meant to be edited locally, pushed to GitHub, then deployed on Vercel with optional Supabase storage. Follow the checklist below each time you update the site.

---

### 1. Local development workflow
1. Install dependencies: `npm install`
2. Run the dev server: `npm run dev`
3. Update `restaurant_infor.txt` and add menu images under `imagemenu/<slug>/`
4. Verify the UI locally and commit your work.

---

### 2. Publish to GitHub
```bash
git checkout main
git pull origin main
git add .
git commit -m "Describe the change"
git push origin main
```
> ⚠️ Run `npm run build` before pushing if you want to ensure production builds pass locally (Vercel will run the same command).

---

### 3. Deploy on Vercel
1. Log in to [vercel.com](https://vercel.com/) and click **New Project**.
2. Import the GitHub repository that contains this codebase.
3. Use the default build settings:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. (Optional) Add environment variables (see Supabase section below).
5. Click **Deploy**. Vercel will watch your GitHub repo—every push to the selected branch triggers a new deployment automatically.

---

### 4. Supabase setup (optional backend for votes)
1. Create a new Supabase project.
2. Open the **SQL Editor** and paste the contents of `supabase/schema.sql`, then run it.
3. In **Project Settings → API**, copy the `Project URL` and `anon` key.
4. Back in Vercel, add these environment variables (Project → Settings → Environment Variables):
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Re-deploy the project so the UI can consume the new env vars once you wire up Supabase calls in `src/App.jsx`.

> The current UI stores votes locally. When you are ready to back it with Supabase, use the `increment_vote` RPC and `restaurants` table created by the SQL script to persist votes across devices.

---

### 5. Manual verification before handoff
- `npm run lint` (if you add a linter) and `npm run build` locally.
- `git status` should be clean before pushing.
- Confirm that new menu images load by running the dev server or previewing the Vercel deployment.
