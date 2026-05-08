# NGD — Nicholas Griggs-Drane Portfolio Site

Personal portfolio site for Nicholas Griggs-Drane, Impact Strategist.

**Stack:** HTML · CSS · Vanilla JS — no build step, no dependencies.

---

## Local Preview

Open `index.html` directly in a browser, or use any static file server:

```bash
npx serve .
# or
python3 -m http.server 8080
```

---

## Deploy to Vercel

### Option A — Vercel Dashboard (recommended)

1. Push this repo to GitHub (any branch).
2. Go to [vercel.com](https://vercel.com) → **Add New → Project**.
3. Import the GitHub repository.
4. Leave all build settings at their defaults — Vercel auto-detects the static site.
5. Click **Deploy**. Done.

### Option B — Vercel CLI

```bash
npm i -g vercel
vercel login
vercel --prod
```

The `vercel.json` file is already configured for zero-config static deployment.

---

## Adding Real Images

Each case-study card has a dark placeholder `div`. To swap in a real image:

1. Add your image file to the project (e.g., `images/lupita.jpg`).
2. Find the card in `index.html` — look for the comment `<!-- REPLACE: add img src here -->`.
3. Add an `<img>` tag inside `.card-img-inner`, or set a CSS `background-image` on `.card-img`.
4. Remove the `.card-placeholder-text` element from that card.

Example (background-image approach):

```html
<div class="card-img" style="background-image: url('images/lupita.jpg'); background-size: cover; background-position: center;">
  <!-- REPLACE: add img src here -->
  <!-- placeholder text removed -->
  <div class="card-img-inner"></div>
  ...
</div>
```

---

## Structure

```
/
├── index.html      — full site markup
├── style.css       — all styles
├── main.js         — panel system, filters, animations
├── vercel.json     — Vercel static deployment config
└── README.md
```

---

## Contact

ngriggsdrane@gmail.com
