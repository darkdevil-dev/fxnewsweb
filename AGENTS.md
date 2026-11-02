# AGENTS.md

## Project Context

This is the **Forex News** landing site — a static React/Vite app with no backend.

## Key Files

- `src/` — frontend source (React + Tailwind)
- `vite.config.js` — Vite config with `@` path alias
- `vercel.json` — Vercel deployment config (SPA rewrites, cache headers)
- `public/` — static assets (sitemap, robots.txt, llms.txt)

## Local Development

```bash
npm install
npm run dev      # start dev server at localhost:5173
npm run build    # production build → dist/
npm run lint     # ESLint check
```

## Deploy

Push to `main` on GitHub — Vercel auto-deploys via the connected repo.
