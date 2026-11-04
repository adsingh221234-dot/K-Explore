# K Explore — Event Management Website

K Explore is a modern, responsive event discovery and registration platform built with **HTML5, CSS3 and Vanilla JavaScript** (ES6 modules). Registration data is saved in the browser's **Local Storage**.

## Features

- **Premium dark navy + purple gradient theme** with smooth animations and micro-interactions
- **Dark / light mode toggle** (remembers your choice across visits)
- **Hero section** with the headline "Discover Experiences. Explore Events." and an Explore Events button
- **Working search bar** — filter events by name, venue, category or description
- **Category filter pills** — Technology, Music, Sports, Workshops, Cultural Events
- **10 sample events** across all five categories, each with image, date, time, venue, price and description
- **Event details page** with full info, a live **countdown timer**, and a Register Now button
- **Registration form** with JavaScript validation for name, email, phone and event selection
- **Registration confirmation** displayed on submit; data persisted to Local Storage
- **Popular categories showcase** on the homepage
- **About section** with stats
- **Contact section** with a working front-end contact form
- **Smooth scrolling**, hover animations, and a fully **mobile navigation menu**
- **Responsive layout** for mobile, tablet and desktop

## Project Structure

```
k-explore/
├── index.html            # Homepage (hero, events, categories, about, contact, footer)
├── event-details.html    # Single event detail view + countdown timer
├── register.html         # Registration form with validation
├── css/
│   └── style.css         # All styles, theme tokens, responsive breakpoints
├── js/
│   ├── events.js         # Sample event + category data (ES module)
│   └── script.js         # All app logic (search, filter, theme, countdown, registration)
├── vite.config.js        # Multi-page Vite build config
├── README.md
└── package.json
```

## How to Run Locally

This project uses ES6 module imports (`type="module"`), so the JavaScript files must be served over HTTP — opening `index.html` directly via `file://` will not work because browsers block module loading from the local filesystem.

### Run with the Vite dev server (recommended)

```bash
npm install
npm run dev
```

Then open the URL shown in your terminal (usually `http://localhost:5173`).

### Create a production build

```bash
npm run build
```

The optimized output is placed in `dist/`. Preview it locally with:

```bash
npm run preview
```

## Deployment

### Netlify

1. Push this repository to GitHub.
2. Go to [netlify.com](https://www.netlify.com/) → "Add new site" → "Import an existing project".
3. Connect your GitHub repo.
4. Build command: `npm run build` · Publish directory: `dist`.
5. Deploy.

### Vercel

1. Push this repository to GitHub.
2. Go to [vercel.com](https://vercel.com/) → "Add New" → "Project".
3. Import the repo. Framework preset: **Vite**.
4. Build command: `npm run build` · Output directory: `dist`.
5. Deploy.

### GitHub Pages

1. Run `npm run build` to generate the `dist/` folder.
2. Publish the contents of `dist/` to GitHub Pages (e.g. via the `gh-pages` branch or the Actions deploy).
3. A `.nojekyll` file is included in the build output so asset folders starting with `_` are not skipped.

## Built With

- HTML5
- CSS3 (custom properties, grid, flexbox, gradients, animations)
- Vanilla JavaScript (ES6 modules)
- Vite (dev server + production bundler)
- Local Storage for registration persistence
- Event images from [Pexels](https://www.pexels.com/)

## License

Free to use for educational and personal projects.
