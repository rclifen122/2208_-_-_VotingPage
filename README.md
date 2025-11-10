# Voting Res - Restaurant Voting Page

A modern React + Vite experience for showcasing shortlisted restaurants, collecting votes backed by Supabase, and managing menu/cover assets without touching the codebase. Built for GitHub → Vercel deployments with a lightweight admin console.

## Highlights
- **Live Supabase votes**: Frontend records ballots via the `increment_vote` RPC, so totals persist across browsers/devices (one ballot per visitor).
- **Vote dashboard**: A real-time panel shows restaurant counts, total ballots, top two leaders, and the visitor's locked choice.
- **Image-first cards**: Each venue shows rating, review counts, address, and expandable menu galleries with full-screen previews.
- **Admin console** (`/admin`): Secure login (email + `VITE_ADMIN_PASSCODE`) to update cover images and reorder menu pages stored in Supabase.
- **Offline fallback**: When Supabase env vars are missing, the app reads from `restaurant_infor.txt` + `imagemenu/` so you can demo locally without a backend.

## Project Structure
```
.
|-- restaurant_infor.txt      # JSON seed for local/offline preview
|-- imagemenu/                # Local menu images mapped by restaurant slug
|-- supabase/schema.sql       # Tables, RPC, policies for Supabase
|-- src/
|   |-- App.jsx               # Router shell (public + admin)
|   |-- pages/                # MainPage + AdminPage
|   |-- components/           # Cover, cards, gallery, etc.
|   |-- services/             # Supabase client + data helpers
|   `-- data/restaurants.js   # Local fallback loader
|-- DEPLOYMENT.md             # GitHub → Vercel workflow
`-- SETUP_GUIDE.md            # End-to-end environment checklist
```

## Environment Variables
| Name | Purpose |
| --- | --- |
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon/public API key |
| `VITE_ADMIN_PASSCODE` | Shared secret for `/admin` login (email is locked to `zzblackstar67@gmail.com`) |

Without the Supabase variables the site still renders using bundled data, but votes remain local only and the admin console is disabled.

## Local Development
```bash
npm install
npm run dev   # http://localhost:5173
npm run build # production bundle in dist/
```

### Updating restaurants (Supabase)
1. Run the SQL in `supabase/schema.sql` to create `restaurants`, `menu_images`, and the `increment_vote` RPC.
2. Insert or edit restaurant rows via Supabase Dashboard.
3. Add menu pages into `menu_images` with `restaurant_id` references and preferred `sort_order`.
4. Visit `/admin`, log in with your email + `VITE_ADMIN_PASSCODE`, and tweak cover URLs or ordering as needed.

### Updating restaurants (offline preview)
1. Edit `restaurant_infor.txt` (JSON array).
2. Drop PNG/JPG files into `imagemenu/<restaurant-id>/`.
3. Run `npm run dev` — the UI will hydrate from these files automatically.

## Deploying to Vercel
1. Push to GitHub (`main`).
2. In Vercel, import the repo (Framework: Vite, Build Command: `npm run build`, Output: `dist`).
3. Set the environment variables listed above.
4. Re-deploy; `/` serves the public voting page, `/admin` is the configuration console.

For detailed step-by-step instructions, see `DEPLOYMENT.md` and `SETUP_GUIDE.md`.

---
Need enhancements (RSVP flows, analytics, additional auth)? Open an issue or drop another request.
