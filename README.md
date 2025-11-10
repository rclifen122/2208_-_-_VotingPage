# Voting Res - Restaurant Voting Page

A single-page React + Vite experience for curating company dinner spots. Editors keep restaurant facts in `restaurant_infor.txt`, drop menu photos into `imagemenu/`, and the page instantly exposes a modern cover hero, restaurant showcase, and interactive menu gallery. Deploy-ready for Vercel/GitHub Pages with zero server dependencies.

## Features
- **Cover hero** with configurable copy to set the tone for the event.
- **Restaurant cards** show rating, review counts, addresses, and contextual blurbs.
- **Local voting** keeps track of per-browser votes with graceful reset.
- **Menu gallery** pulls every image from `imagemenu/<restaurant>` automatically (with lazy loading & "show all" control).
- **Data-driven**: Editing `restaurant_infor.txt` (JSON) instantly updates the UI - no touching JSX required.

## Project Structure
```
.
|-- restaurant_infor.txt      # JSON array with restaurant metadata
|-- imagemenu/                # Subfolders named after each restaurant slug; drop PNG/JPG pages here
|-- src/
|   |-- App.jsx               # Page composition and voting logic
|   |-- components/           # Cover, restaurant cards, menu gallery
|   `-- data/restaurants.js   # Parses restaurant_infor + menu folders
`-- public/ (optional)        # Extra static assets if needed
```

### Updating restaurant info
1. Open `restaurant_infor.txt` and add/edit entries (JSON).
2. Make sure each entry uses a unique `id`/`menuFolder` slug.
3. Drop menu images (PNG/JPG) into `imagemenu/<slug>/` - filenames are flexible.
4. Run `npm run dev` to verify rendering.

### Voting
Votes are stored in `localStorage` per browser. A reset link is available in the UI for preview/testing. Hooking this up to an API later only requires swapping out the in-memory logic in `App.jsx`.

## Getting Started
```bash
npm install
npm run dev   # open http://localhost:5173
npm run build # generates dist/ for Vercel or static hosting
```

## Deploying to Vercel
1. Push the repo to GitHub.
2. Create a new Vercel project from that repo.
3. Build command: `npm run build` - Output: `dist`
4. Every new push to `main` (or your chosen branch) redeploys automatically.

## Customizing the Cover Section
`heroContent` inside `src/App.jsx` holds the cover text & CTA labels. Tweak it to match each event - no component changes required.

---
Need help extending this (backend votes, RSVP flows, analytics)? Open an issue or drop a note in your next request.
