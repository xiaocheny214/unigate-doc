# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

UniGate-Doc is the static documentation portal and landing site for [UniGate](https://unigate.top) AI API Gateway. It is hosted on Cloudflare Pages and built as a purely static site with Astro 4, React 18, Tailwind CSS, and MDX content collections.

- **Production URL**: `https://doc.unigate.top`
- **Output Mode**: Static (`output: 'static'` in `astro.config.mjs`)
- **Deployment**: Cloudflare Pages (`npm run build` -> output dir `dist`)

## Common Commands

```bash
# Install dependencies
npm install

# Start local development server (default: http://localhost:4321)
npm run dev
# or
npm start

# Build static output to dist/
npm run build

# Preview production build locally
npm run preview

# Astro CLI shortcuts (e.g. sync content collections types)
npx astro sync
npx astro check
```

*Note: There is currently no separate test or linter script configured in `package.json`.*

## Architecture & Code Structure

### 1. Routing & Pages (`src/pages/`)
- `src/pages/index.astro`: Marketing landing page featuring pricing tiers, quickstart code examples, and Workbuddy/OpenAI SDK integrations.
- `src/pages/docs/[...slug].astro`: Dynamic catch-all route for documentation entries. Uses `getCollection('docs')` and `getStaticPaths()` to statically generate pages from MDX collections and injects MDX components (`Callout`, `CodeGroup`, `Steps`).

### 2. Content Collections (`src/content/`)
- `src/content/config.ts`: Defines the `docs` content collection schema via `zod`:
  - `title`: string
  - `description`: string
  - `category`: string (default: `'Guide'`)
  - `order`: number (default: `99`, used for sidebar sorting)
  - `updatedAt`: date (optional)
- `src/content/docs/*.mdx`: Documentation files written in MDX.

### 3. Layouts (`src/layouts/`)
- `BaseLayout.astro`: Base HTML shell with `<head>`, meta tags, SEO configs, site header (`Header.astro`), and footer (`Footer.astro`).
- `DocLayout.astro`: Wraps `BaseLayout` for documentation pages. Renders a responsive sidebar reading and sorting all entries from the `docs` collection by `order`.

### 4. Interactive MDX Components (`src/components/mdx/`)
- Written in React with Lucide icons and Tailwind CSS:
  - `Callout.tsx`: Notice/alert boxes (`info`, `warning`, `success`, `danger`).
  - `CodeGroup.tsx`: Multi-tab code snippet switcher with copy button.
  - `Steps.tsx`: Numbered step indicator wrapper for onboarding workflows.
- Registered and passed to MDX rendering in `src/pages/docs/[...slug].astro`.

### 5. Styling & Assets
- Tailwind CSS v3 with typography plugin support via custom prose styling.
- Base style imported in `src/styles/global.css`.
- Path aliases: `@/*` maps to `src/*` (defined in `tsconfig.json`).
