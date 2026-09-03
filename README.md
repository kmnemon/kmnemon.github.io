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
- `styles.css` — responsive layout and light/dark themes
- `script.js` — manual theme preference
- `assets/hero-illustration.svg` — replaceable hero artwork
- `assets/gorun-icon.png` — replaceable GoRun icon
- `assets/tocky-icon.png` — replaceable Tocky icon

## Customizing

Replace the placeholder images while keeping the same filenames, or update their paths in `index.html`. Product, article, Substack, X, and About URLs are placeholders and should be replaced with their final destinations.

The site works directly on GitHub Pages with no generated output.
