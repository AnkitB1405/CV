# Neon CV Website (React + Vite + Tailwind)

A premium dark-themed personal CV website with neon accents, smooth scrolling, reusable components, and production-ready setup.

## Folder Structure

```text
CV/
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
├── public/
│   └── resume.pdf
└── src/
    ├── App.jsx
    ├── index.css
    ├── main.jsx
    ├── components/
    │   ├── About.jsx
    │   ├── Contact.jsx
    │   ├── Experience.jsx
    │   ├── Footer.jsx
    │   ├── Hero.jsx
    │   ├── Navbar.jsx
    │   ├── Projects.jsx
    │   ├── SectionTitle.jsx
    │   └── Skills.jsx
    └── data/
        └── siteData.js
```

## Run Locally

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
npm run preview
```

## GitHub Pages Deployment

1. Update `base` in `vite.config.js` to `'/<your-repo-name>/'`.
2. Commit and push project to GitHub.
3. Run:

```bash
npm run deploy
```

## Vercel Deployment

1. Import this folder as a project in Vercel.
2. Framework preset: `Vite`.
3. Build command: `npm run build`
4. Output directory: `dist`

## Customize Content

Edit [`src/data/siteData.js`](./src/data/siteData.js) to update personal info, skills, projects, and experience.
