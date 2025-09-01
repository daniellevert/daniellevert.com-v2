# DANIELLEVERT.COM — Written in React + TypeScript

Version 2 of Daniel LeVert's portfolio site. A conversion of the static portfolio (HTML/CSS/JS) into a modern React + TypeScript single-page app using Vite.
Now includes video and design work in addition to photo and code.

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

- `src/pages/Landing.tsx` — landing page.
- `src/pages/Photo.tsx` — auto-imports any images placed in `public/photo`.
- `src/pages/Video.tsx` — auto-imports any videos placed in `public/video`.
- `src/pages/Design.tsx` — auto-imports any images placed in `public/design`.
- `src/pages/Code.tsx` — shows curated projects (`src/data/projects.ts`). If empty, it fetches recent public repos from GitHub (`daniellevert`).
- `src/pages/About.tsx` — about/me content.

- `src/components/Lightbox.tsx` — simple lightbox used on the photo grid.
- `src/components/DesignPopover.tsx` — simple popover used on the design grid.

- `src/data/` - contains data for the design, about, and video pages.
- `src/styles/` — minimal reset + global SCSS to match the original aesthetic.
- `public/` - contains static assets for the photo page, favicon, and robots.txt.

## Deployment tips

- The app uses **HashRouter** so it works on static hosts (e.g., GoDaddy) with no special rewrites.
- A `404.html` is included that redirects deep links back to the app entry.

## Future-ready notes

- For dynamic content and infinite scroll, create an API endpoint or JSON feed and swap the `import.meta.glob` with a paginated fetch.
- If you prefer BrowserRouter, configure your host to route all paths to `index.html`.
