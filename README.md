# Kemnemon

A small, static personal homepage for an independent software developer.

## Run locally

No build step or dependencies are required. From the project directory, run:

```sh
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## Structure

- `index.html` — page content and semantic structure
- `styles.css` — responsive, light-only layout
- `script.js` — reserved for future progressive enhancements
- `assets/portrait.jpg` — replaceable portrait placeholder
- `assets/hero-illustration.svg` — unused alternate hero artwork
- `assets/gorun-icon.png` — replaceable GoRun icon
- `assets/tocky-icon.png` — replaceable Tocky icon

## Customizing

Replace the portrait and app icon placeholders while keeping the same filenames, or update their paths in `index.html`. Product, individual article, and About URLs are placeholders and should be replaced with their final destinations. The X profile and Substack publication links use their final URLs.

The presentation is intentionally light-only; no theme preference or JavaScript is required.

The site works directly on GitHub Pages with no generated output.
