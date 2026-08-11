# 🌊 Coral Cloud Resorts — Website

A world-class luxury resort website built with React + Vite. Featuring a cinematic homepage, filterable accommodations listing, and individual villa detail pages.

**Live Demo:** `https://YOUR_USERNAME.github.io/coral-cloud-resorts/`

---

## 🏗 Project Structure

```
coral-cloud-resorts/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx / .module.css
│   │   ├── Footer.jsx / .module.css
│   │   └── RoomCard.jsx / .module.css
│   ├── pages/
│   │   ├── Home.jsx / .module.css        ← Full-page cinematic homepage
│   │   ├── Rooms.jsx / .module.css       ← Filterable rooms listing
│   │   ├── RoomDetail.jsx / .module.css  ← Individual villa page
│   │   └── Placeholder.jsx / .module.css ← Dining / Spa / Experiences stubs
│   ├── data/
│   │   └── rooms.js                      ← All 15 villa data records
│   ├── App.jsx                           ← Router setup
│   ├── index.css                         ← Global design tokens + base styles
│   └── main.jsx
├── public/
│   └── logo.webp                         ← Resort logo (add your own)
├── .github/workflows/deploy.yml          ← Auto-deploy to GitHub Pages
├── vite.config.js
└── package.json
```

---

## 🚀 Deploy to GitHub Pages (Automatic)

### Step 1 — Create a GitHub repository

1. Go to [github.com](https://github.com) → **New repository**
2. Name it `coral-cloud-resorts` (must match the `base` in `vite.config.js`)
3. Set to **Public**
4. Click **Create repository**

### Step 2 — Push your code

```bash
cd coral-cloud-resorts

git init
git add .
git commit -m "Initial commit — Coral Cloud Resorts website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/coral-cloud-resorts.git
git push -u origin main
```

### Step 3 — Enable GitHub Pages

1. Go to your repo on GitHub
2. Click **Settings** → **Pages** (left sidebar)
3. Under **Source**, select **GitHub Actions**
4. Save

### Step 4 — Your site is live!

GitHub Actions will automatically build and deploy your site every time you push to `main`. 

Your URL: `https://YOUR_USERNAME.github.io/coral-cloud-resorts/`

The first deployment takes ~2 minutes. Check progress under **Actions** tab.

---

## 🖼 Add Your Logo

Place the resort logo file at:
```
public/logo.webp
```

The Navbar loads `/coral-cloud-resorts/logo.webp` and falls back gracefully to text if the image is missing.

---

## 💻 Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:5173/coral-cloud-resorts/`

---

## 📦 Build for Production

```bash
npm run build
npm run preview
```

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| `--teal-deep` | `#0B4F5E` — primary brand |
| `--gold` | `#C9A96E` — accent / CTAs |
| `--sand` | `#F5EDD6` — warm background |
| `--midnight` | `#081C24` — dark sections |
| `--font-display` | Cormorant Garamond (serif) |
| `--font-body` | Jost (sans-serif) |

---

## ➕ Adding More Pages

1. Create `src/pages/YourPage.jsx` and `YourPage.module.css`
2. Add a route in `src/App.jsx`:
   ```jsx
   <Route path="/your-path" element={<YourPage />} />
   ```
3. Add a link in `src/components/Navbar.jsx`

---

## 📋 Pages Included

| Page | Route | Status |
|------|-------|--------|
| Homepage | `/` | ✅ Complete |
| Accommodations | `/rooms` | ✅ Complete |
| Villa Detail | `/rooms/:slug` | ✅ Complete |
| Dining | `/dining` | 🚧 Placeholder |
| Spa & Wellness | `/spa` | 🚧 Placeholder |
| Experiences | `/experiences` | 🚧 Placeholder |
| Contact | `/contact` | 🚧 Placeholder |

---

## 🔧 Customisation

**Change the repo name:** Update `base` in `vite.config.js`:
```js
base: '/your-repo-name/',
```

**Add a room:** Edit `src/data/rooms.js` and add a new object following the existing schema.

**Change fonts:** Update the Google Fonts link in `index.html` and the `--font-display`/`--font-body` variables in `src/index.css`.
