# UniGate-Doc

Official static documentation and developer landing portal for [UniGate](https://unigate.top) AI API Gateway.

## Tech Stack
- **Framework**: Astro 4 (Static Output)
- **UI & Components**: React 18 + Tailwind CSS
- **Content**: MDX (Astro Content Collections)
- **Deployment**: Cloudflare Pages

## Getting Started

```bash
# Install dependencies
npm install

# Start local dev server
npm run dev

# Compile static output
npm run build
```

## Cloudflare Pages Deployment
1. Connect this GitHub repository (`xiaocheny214/unigate-doc`) to Cloudflare Pages.
2. Build settings:
   - **Framework preset**: `Astro`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
