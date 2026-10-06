# UniGate-Doc Architecture & Implementation Spec

## 1. Context and Goals
The goal is to build a high-performance, purely static documentation and landing website for "UniGate", an AI API Gateway. 
The site must cost zero dollars to host (deployable on Cloudflare Pages) and serve a dual purpose:
1. Provide professional, developer-friendly documentation for integrating the API, specifically targeting users of tools like Workbuddy.
2. Effectively market a highly competitive $5/month Pro tier featuring Gemini-3.8-Flash and Claude 4.6.

## 2. Architecture Choice
**Stack**: Astro + React + MDX + TailwindCSS.
**Why**: 
- **Astro**: Builds zero-JS static HTML by default, maximizing performance and compatibility with Cloudflare Pages.
- **MDX**: Allows writing documentation in standard Markdown while embedding complex, interactive React components.
- **React**: Used for interactive islands (e.g., tabbed code blocks) within the static content.
- **TailwindCSS**: Ensures rapid, responsive, and highly customizable styling matching a "tech-focused" aesthetic.

## 3. Directory Structure
```text
/
├── src/
│   ├── components/       # React/Astro UI Components
│   │   ├── common/       # Header, Footer, Hero, FeatureCards
│   │   └── mdx/          # CodeGroup, Callout, Step, Endpoint
│   ├── content/          # Content Collections
│   │   ├── docs/         # .mdx documentation files
│   │   └── config.ts     # Schema validation for docs
│   ├── layouts/          # Layout wrappers (LandingLayout, DocLayout)
│   ├── pages/            # Routing
│   │   ├── index.astro   # The Hybrid Landing Page
│   │   └── docs/
│   │       └── [...slug].astro # Dynamic doc routing
│   └── styles/           # Global styles
├── public/               # Static assets
├── astro.config.mjs      # Astro configuration
└── tailwind.config.cjs   # Tailwind configuration
```

## 4. Hybrid Landing Page Strategy (`src/pages/index.astro`)
The homepage will adopt a professional, developer-centric look but embed high-conversion marketing elements:
1.  **Hero Section**: Clear value prop ("开发者友好的极速 AI API Gateway"), highlighting Workbuddy compatibility, with two CTAs ("立即查阅接入文档" and "💥 查看 Pro 专属特惠 ($5/月)").
2.  **Integration Snippet**: A visual code block showing how easy it is to change the `baseUrl` to `https://api.unigate.top`.
3.  **Feature/Pricing Cards**: Highlighting the specific copy provided:
    - **极致性价比**: $5/月, 阶梯限额日供 $40.
    - **量大管饱 (Gemini)**: Gemini-3.8-Flash, 日跑 7000万 Token.
    - **旗舰双星 (Claude)**: Sonnet 4.6 / Opus 4.6 节点保障.

## 5. MDX Component System
To elevate the documentation experience, the following React components will be built for use inside `.mdx` files:
- `<Callout type="info|warning|danger">`: For alerts and notices.
- `<CodeGroup>`: Tabbed interface for different languages (cURL, Python, JS).
- `<Steps>`: Visual step-by-step guide wrapper.

## 6. SEO & GEO Strategy
- **Framework Native**: Utilize `@astrojs/sitemap` for auto-generating sitemaps.
- **Content Strategy**: Create specific tutorial pages in the docs (e.g., "如何将 UniGate 接入 Workbuddy") acting as SEO bait for the target audience.
- **Metadata**: Enforce strict Title and Meta Description rules via Astro layouts.
