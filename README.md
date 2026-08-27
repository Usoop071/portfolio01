# Utsab Shah — Personal Portfolio

A premium, animated personal portfolio website built with React, Vite, Tailwind CSS, and Framer Motion.

---

## Stack

| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| Vite 7 | Build tool + dev server |
| Tailwind CSS 3 | Utility-first styling |
| Framer Motion 11 | Animations & transitions |
| Lenis | Smooth scrolling |
| react-type-animation | Typing text effect |
| react-intersection-observer | Scroll-triggered reveals |

---

## Project Structure

```
portfolio/
├── public/
│   ├── favicon.svg
│   ├── _headers          # Cloudflare Pages security headers
│   └── _redirects        # Cloudflare Pages / Netlify SPA redirects
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx
│   │   │   └── Footer.jsx
│   │   ├── sections/
│   │   │   ├── Hero.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Skills.jsx
│   │   │   ├── Journey.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── Exploring.jsx
│   │   │   ├── Education.jsx
│   │   │   ├── GitHub.jsx
│   │   │   └── Contact.jsx
│   │   └── ui/
│   │       ├── CustomCursor.jsx
│   │       └── SectionHeader.jsx
│   ├── hooks/
│   │   ├── useSmoothScroll.js
│   │   └── useScrollReveal.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .github/
│   └── workflows/
│       └── deploy.yml    # GitHub Pages auto-deploy
├── netlify.toml
├── vercel.json
├── vite.config.js
├── tailwind.config.js
└── package.json
```

---

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm 9 or later

### Run locally

```bash
# Clone the repo
git clone https://github.com/YOUR_GITHUB_USERNAME/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for production

```bash
npm run build
```

The output goes to `dist/`. Preview it locally:

```bash
npm run preview
```

---

## Personalisation Checklist

Before deploying, update these placeholders throughout the codebase:

- [ ] `YOUR_GITHUB_USERNAME` — your GitHub username (appears in Navbar, Hero, Projects, GitHub, Contact, Footer)
- [ ] `YOUR_EMAIL_HERE` — your actual email address (Contact, Footer)
- [ ] `YOUR_LINKEDIN_HERE` — your LinkedIn profile handle (Contact)
- [ ] `index.html` — update the `og:url` meta tag to your real domain

Use find & replace in VS Code (`Ctrl+Shift+H`) to replace all at once.

---

## Deployment

### Vercel (Recommended — Zero config)

1. Push to GitHub
2. Go to [vercel.com](https://vercel.com) → Import project
3. Select the repo — Vercel auto-detects Vite
4. Deploy. Done.

Custom domain: Add in Vercel dashboard → Project Settings → Domains.

---

### Cloudflare Pages

1. Push to GitHub
2. Go to [Cloudflare Dashboard](https://dash.cloudflare.com) → Workers & Pages → Create application → Pages → Connect to Git
3. Select repo
4. Build settings:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
5. Deploy.

For a `.np` domain: Add your domain in Cloudflare → DNS → add CNAME pointing to `YOUR_PROJECT.pages.dev`.

---

### Netlify

1. Push to GitHub
2. Go to [netlify.com](https://netlify.com) → Add new site → Import from Git
3. Build settings are auto-read from `netlify.toml`
4. Deploy.

---

### GitHub Pages

The included GitHub Actions workflow (`.github/workflows/deploy.yml`) auto-deploys on push to `main`.

Setup steps:
1. Push to GitHub
2. Go to repo Settings → Pages → Source → GitHub Actions
3. Push a commit to `main` — the action builds and deploys automatically

For a custom domain: add a `CNAME` file to `public/` containing your domain name.

---

## Features

- Dark professional theme with subtle gradients and glow effects
- Animated hero with typing text (cycling through Developer, Linux Explorer, etc.)
- Floating particle background
- Smooth scrolling via Lenis
- Scroll-triggered section reveals with Framer Motion
- 3D tilt effect on project cards
- Custom cursor with trailing ring (desktop only)
- Animated learning journey timeline
- Honest skill badges (Learning / Exploring / Familiar / Building With)
- GitHub contribution grid visualisation
- Mobile-responsive animated hamburger menu
- Semantic HTML + ARIA labels + keyboard navigation
- Respects `prefers-reduced-motion`
- SEO: title, meta description, Open Graph tags, JSON-LD structured data

---

## License

MIT — do whatever you want with it.

---

*Built by Utsab Shah — Kathmandu, Nepal*
