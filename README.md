# DANIELLEVERT — React + TypeScript

A conversion of the static portfolio (HTML/CSS/JS) into a modern React + TypeScript single-page app using Vite.

## Quick start

```bash
npm install
npm run dev
```

Then open http://localhost:5173

## Build

```bash
npm run build
npm run preview
```

## Structure

- `src/pages/Photos.tsx` — auto-imports any images placed in `public/photos`.
- `src/pages/Code.tsx` — shows curated projects (`src/data/projects.ts`). If empty, it fetches recent public repos from GitHub (`daniellevert`).
- `src/pages/About.tsx` — about/me content.
- `src/components/Lightbox.tsx` — simple lightbox used on the photo grid.
- `src/styles/` — minimal reset + global SCSS to match the original aesthetic.

## Deployment tips

- The app uses **HashRouter** so it works on static hosts (e.g., GoDaddy) with no special rewrites.
- A `404.html` is included that redirects deep links back to the app entry.

## Future-ready notes

- Add a **Video** page by duplicating `Photos.tsx` and pointing at `public/videos`.
- For dynamic content and infinite scroll, create an API endpoint or JSON feed and swap the `import.meta.glob` with a paginated fetch.
- If you prefer BrowserRouter, configure your host to route all paths to `index.html`.

---

Generated on 2025-08-25.
