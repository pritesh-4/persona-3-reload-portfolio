# PRODUCTION DEPLOYMENT & HOSTING GUIDE
## Persona 3 Reload Developer Portfolio — Multi-Platform Operations Manual

This guide provides end-to-end instructions for deploying, updating, and rolling back the **Persona 3 Reload Developer Portfolio** across **GitHub Pages**, **Vercel**, **Netlify**, and **Custom Domains**.

---

## 1. Quick Start: Local Production Build

Ensure Node.js `20.19+` or `22.12+` is active:

```bash
# 1. Install dependencies reproducibly
npm ci

# 2. Run static analysis & type validation
npm run lint
npm run type-check

# 3. Compile optimized production distribution
npm run build

# 4. Preview the compiled production build locally
npm run preview -- --port 4173
```

The compiled output resides in the `dist/` directory.

---

## 2. Option A: GitHub Pages Deployment (Recommended Default)

The repository is configured for automated continuous deployment to GitHub Pages via GitHub Actions.

### Step 1: Enable GitHub Pages in Repository Settings
1. Navigate to your repository on GitHub: `https://github.com/pritesh-4/Person-3-Reload-Portfolio`.
2. Click **Settings** &rarr; **Pages** (under Code and automation).
3. Under **Build and deployment** &rarr; **Source**, select **GitHub Actions**.

### Step 2: Push to Main Branch
The workflow at `.github/workflows/deploy.yml` runs automatically on every push to `main`:
1. It validates linting with `npm run lint`.
2. It validates TypeScript types with `npm run type-check`.
3. It builds the production distribution with `VITE_BASE_PATH='./'`.
4. It uploads the `dist/` artifact and deploys it to GitHub Pages.

```bash
git add .
git commit -m "chore: release production build with GitHub Actions CI/CD"
git push origin main
```

### Step 3: Verify Live Deployment
Your site will be live at:
`https://pritesh-4.github.io/Person-3-Reload-Portfolio/`

> [!NOTE]
> **Single Page App Routing on GitHub Pages**:  
> The included `public/404.html` and `index.html` redirection handler automatically preserves deep links (`/about`, `/skills`, `/projects`, etc.). When a user refreshes or pastes a deep link, GitHub Pages serves `404.html`, which immediately redirects back to the proper internal route with zero loss of state.

---

## 3. Option B: Vercel Deployment

Vercel provides edge network caching and instant preview URLs. The repository includes a pre-configured `vercel.json`.

### Method 1: Git Integration (Zero-Config)
1. Log in to [Vercel](https://vercel.com).
2. Click **Add New** &rarr; **Project**.
3. Import `pritesh-4/Person-3-Reload-Portfolio`.
4. Framework Preset: **Vite** (auto-detected).
5. Build Command: `npm run build` (auto-detected).
6. Output Directory: `dist` (auto-detected).
7. Under **Environment Variables**, set:
   - `VITE_BASE_PATH`: `/`
8. Click **Deploy**.

### Method 2: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy preview
vercel

# Deploy directly to production
vercel --prod
```

---

## 4. Option C: Netlify Deployment

The repository includes `public/_redirects` which handles client-side SPA routing automatically on Netlify.

### Method 1: Git Integration
1. Log in to [Netlify](https://app.netlify.com).
2. Click **Add new site** &rarr; **Import an existing project**.
3. Connect your GitHub repository.
4. Build command: `npm run build`.
5. Publish directory: `dist`.
6. Environment variable: `VITE_BASE_PATH` = `/`.
7. Click **Deploy Site**.

### Method 2: Netlify CLI
```bash
npm i -g netlify-cli
netlify deploy --prod --dir=dist
```

---

## 5. Custom Domain & DNS Configuration

To bind a custom domain (e.g. `priteshjena.dev` or `portfolio.priteshjena.com`):

### DNS Records Table

| Record Type | Host / Name | Value / Target | Notes |
|---|---|---|---|
| **A** (Apex) | `@` | `185.199.108.153` | GitHub Pages IP 1 |
| **A** (Apex) | `@` | `185.199.109.153` | GitHub Pages IP 2 |
| **A** (Apex) | `@` | `185.199.110.153` | GitHub Pages IP 3 |
| **A** (Apex) | `@` | `185.199.111.153` | GitHub Pages IP 4 |
| **CNAME** (Subdomain) | `www` | `pritesh-4.github.io` | Directs www to GitHub Pages |
| **CNAME** (Alternative: Vercel) | `@` or `www` | `cname.vercel-dns.com` | If deploying on Vercel |

### Enforce HTTPS
1. In GitHub Repository **Settings** &rarr; **Pages** &rarr; **Custom domain**, enter your domain name.
2. Check the box for **Enforce HTTPS** (TLS certificate will be provisioned automatically via Let's Encrypt within 15–30 minutes).

---

## 6. Environment Variables Reference

| Variable | Description | Default | Allowed Values |
|---|---|---|---|
| `VITE_BASE_PATH` | Base path for static assets and client routing | `./` | `./` (for GitHub Pages subpaths), `/` (for root domains) |
| `VITE_GITHUB_TOKEN` | Optional GitHub Personal Access Token | *(None)* | Read-only fine-grained token to boost API rate limit to 5,000 req/hr |

---

## 7. Rollback Procedures

If an unexpected regression is detected on production, execute one of the following rollback methods:

### On GitHub Pages (Git-Based Rollback)
```bash
# Revert the latest commit on main
git revert HEAD --no-edit

# Push to trigger the deployment workflow with the known-good build
git push origin main
```

### On Vercel (Instant Rollback)
1. Go to the [Vercel Dashboard](https://vercel.com).
2. Select the project &rarr; **Deployments**.
3. Locate the previous successful deployment.
4. Click the three dots icon &rarr; **Instant Rollback**.
5. The edge network will switch traffic to the previous deployment within seconds.

### On Netlify (Instant Rollback)
1. Go to the Netlify Dashboard &rarr; **Deploys**.
2. Select the previous stable deploy.
3. Click **Publish deploy**.

---

## 8. Post-Deployment Verification Checklist

After deploying to your live URL, run this quick smoke verification:

- [ ] Open the root URL: Verify boot sequence and title screen render without missing fonts.
- [ ] Audio gesture check: Click or press <kbd>Enter</kbd> to ensure UI sounds initialize without browser autoplay blocks.
- [ ] Curved menu navigation: Cycle through all 8 menu options using arrow keys and mouse hover.
- [ ] Internal route refresh: Navigate to `/projects`, press <kbd>F5</kbd> / Refresh, and confirm the page does not return a 404 error.
- [ ] Mobile check: Open on a mobile device or responsive emulation (390&times;844); confirm the curved arc remains visible and there is zero horizontal scroll.
- [ ] Static files: Verify `https://your-domain/favicon.svg` and `https://your-domain/robots.txt` return HTTP 200.

