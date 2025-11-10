## Deployment & Integration Guide

This doc mirrors the workflow you described: develop locally, push to GitHub, let Vercel deploy, and keep Supabase in sync.

---

### 1. Local development checklist
1. `npm install`
2. `npm run dev`
3. Update restaurants either through Supabase (preferred) or via `restaurant_infor.txt` + `imagemenu/` for offline preview.
4. Test `/` and `/admin` (admin requires env vars + passcode).
5. Optionally `npm run build` to make sure production bundling passes.

---

### 2. GitHub push routine
```bash
git checkout main
git pull origin main
git status      # confirm only intentional changes
git add .
git commit -m "Describe the update"
git push origin main
```
Every push to `main` triggers the Vercel build that is linked to this repo.

---

### 3. Vercel project settings
1. Import `HKSilverlord/Vote_REs` as a Vercel project.
2. Build settings:
   - Framework: **Vite**
   - Build command: `npm run build`
   - Output directory: `dist`
3. Environment variables (Project → Settings → Environment Variables):
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_ADMIN_PASSCODE`
4. Redeploy (or wait for the automatic deploy) after any env change.

`/admin` uses `BrowserRouter`, so Vercel automatically rewrites sub-paths back to `index.html`.

---

### 4. Supabase bootstrap
1. Create a Supabase project.
2. In SQL Editor, run `supabase/schema.sql`. This creates:
   - `public.restaurants`
   - `public.menu_images`
   - `increment_vote` RPC
   - Basic RLS policies for read access
3. Populate `restaurants` + `menu_images` using the Table editor or SQL inserts.
4. Copy the project URL + anon key → paste into Vercel env vars above.
5. (Optional) Add stricter RLS policies if you plan to expose write APIs beyond your admin console.

---

### 5. Admin console
1. Navigate to `/admin`.
2. Log in with `zzblackstar67@gmail.com` and the passcode stored in `VITE_ADMIN_PASSCODE`.
3. Use the dashboard to update cover image URLs or reorder menu pages (drag via the Up/Down buttons).
4. Changes write directly to Supabase, so the public page reflects them immediately.

---

### 6. Final QA before sharing the link
- `npm run build`
- `git status` → clean
- Vercel preview URL renders `/` and `/admin`
- Voting increments are visible from two different browsers (confirms Supabase writes)
- Menu images open full-screen when clicked

Once those checks pass, promote the Vercel deployment to production.***
