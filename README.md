# NGD — Nicholas Griggs-Drane Portfolio Site

Personal portfolio site for Nicholas Griggs-Drane, Impact Strategist. Includes the main
portfolio page and six individual case study pages.

**Stack:** HTML · CSS · Vanilla JS — no build step, no dependencies, no framework.

---

## Local Preview

Open `index.html` directly in a browser, or run any static file server:

```bash
npx serve .
# or
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

---

## Deploy to Vercel (existing account)

### Option A — Vercel Dashboard (recommended, ~2 minutes)

1. Push this repository to GitHub (any branch).
2. Log into [vercel.com](https://vercel.com) → click **Add New → Project**.
3. Select **Import Git Repository** → pick this repo.
4. On the configure screen:
   - **Framework Preset:** `Other`
   - **Root Directory:** leave as `.` (repo root)
   - **Build Command:** leave blank
   - **Output Directory:** leave blank (or set to `.`)
5. Click **Deploy**. Done. Vercel will serve the static files at your domain.

### Option B — Vercel CLI

```bash
npm i -g vercel
vercel login          # follow browser auth
vercel --prod         # deploy from repo root
```

The `vercel.json` is pre-configured for zero-config static deployment.

---

## File Structure

```
/
├── index.html              — Main portfolio page
├── style.css               — Main site styles
├── main.js                 — Panel system, filters, animations, card navigation
├── vercel.json             — Vercel static deployment config
├── Mediga.otf              — Campaign display font (Lupita page only) — ADD THIS FILE
│
├── cases/
│   ├── shared.css          — Structural CSS shared by all case pages
│   ├── case.js             — IntersectionObserver, count-up stats (shared)
│   ├── lupita.html         — Make Fibroids Count (Lupita Nyong'o)
│   ├── taylor-rooks.html   — Taylor Rooks Foundation
│   ├── incubator.html      — WME Fashion Incubator
│   ├── kids-outdoors.html  — Kids Outdoors Foundation (Tommy Paul & Paige Lorenze)
│   ├── candace-parker.html — Candace Parker Foundation Glass Ceiling Grants
│   └── venus-williams.html — Venus Williams × Saving Mothers
│
└── images/
    └── lupita/             — Drop Lupita campaign images here (see list below)
```

---

## Adding Images

### Lupita / Make Fibroids Count

Drop these files into `/images/lupita/`:

| Filename | Description |
|---|---|
| `Fruit1.png` | Campaign still-life, dark painterly fruit — used as visual break left panel |
| `Fruit2.png` | Campaign still-life — used as hero background and visual break right panel |
| `ABC-News-Linsey-Davis-Lupita-Nyongo-2-032326-7e78c931493e49aa98522a63659124e0.jpg` | ABC News Live Prime with Linsey Davis |
| `8-1024x683.jpg` | Capitol Hill roundtable — Lupita, Senator Alsobrooks, Mandy Moore |
| `aq9bFJ3m-1280.jpg` | Intimate interview setting, ABC News |
| `sddefault.jpg` | TODAY Show YouTube thumbnail |
| `b68c9ce40e18d75e0699acb927ef6d8a.webp` | Mandy Moore, host, and Lupita — press appearance |
| `images-1.jpeg` | Lupita and Mandy Moore, People Magazine exclusive |
| `5-scaled.jpg` | Lupita hugging someone at Capitol Hill, candid |
| `images-2.jpeg` | TODAY Show screenshot |

Once files are in place, the `<img>` tags and CSS `background-image` references in
`cases/lupita.html` will resolve automatically. Each image also has an
`onerror="this.style.display='none'"` attribute so placeholder text shows cleanly
while images are missing.

### Mediga Font

Drop `Mediga.otf` into the **repo root** (`/Mediga.otf`). The `@font-face` rule in
`cases/lupita.html` references `../Mediga.otf`.

### Other Case Studies

Create folders under `/images/` for each case study as needed:
- `/images/taylor-rooks/`
- `/images/incubator/`
- `/images/kids-outdoors/`
- `/images/candace-parker/`
- `/images/venus-williams/`

Each case HTML file has `<!-- REPLACE: ... -->` comments marking exactly where images go.

---

## Color Skins Per Case Study

| Page | Background | Accent | Font Note |
|---|---|---|---|
| `lupita.html` | `#181818` | `#6e32f6` | Mediga for display + pull quote |
| `taylor-rooks.html` | `#0a0a0a` | `#C4341A` | DM Sans only |
| `incubator.html` | `#0d0d0d` | `#C8B99A` | DM Sans only |
| `kids-outdoors.html` | `#0a0a0a` | `#2D6A4F` | DM Sans only |
| `candace-parker.html` | `#0a0a0a` | `#C4341A` | DM Sans only |
| `venus-williams.html` | `#0d0d0d` | `#8B1A1A` | DM Sans only |

---

## Internal Links

All case study pages link back to `../index.html` in the nav logo and footer.
The "Next Case Study" chain at the bottom of each page:

`lupita` → `taylor-rooks` → `incubator` → `kids-outdoors` → `candace-parker` → `venus-williams` → `lupita`

The transition card at the bottom of each page previews the **next campaign's accent color**
via a `--cs-next-accent` CSS variable on the `.cs-next` element.

---

## Contact

ngriggsdrane@gmail.com
