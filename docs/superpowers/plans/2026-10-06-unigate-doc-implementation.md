# UniGate-Doc Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a zero-cost, static developer documentation and product landing website for UniGate (AI API Gateway) optimized for Cloudflare Pages, featuring MDX interactive components, SEO/GEO optimization, and Pro plan promotional integration.

**Architecture:** Pure static site generated via Astro with React islands for interactive documentation UI components (`CodeGroup`, `Callout`, `Steps`), Tailwind CSS for modern dark-mode-first developer aesthetic, and Astro Content Collections with Zod schemas for structured doc management.

**Tech Stack:** Astro, React 18/19, Tailwind CSS, MDX, TypeScript, `@astrojs/sitemap`.

**Spec:** `docs/superpowers/specs/2026-10-06-unigate-doc-design.md`

## Global Constraints

- Must build to purely static output (`dist/`) suitable for direct Cloudflare Pages deployment without server-side compute.
- All commit messages must follow the project's Angular specification in `.agents/skills/git-commit/SKILL.md` (English only, type(scope): subject, 3-paragraph body, no mixed concerns).
- Design and content must explicitly emphasize the $5/mo Pro tier with Gemini-3.8-Flash (70M tokens/day) and Claude 4.6 (Sonnet/Opus), plus Workbuddy compatibility.
- License compliance: PolyForm Noncommercial License 1.0.0.

## Review Focus

- Static build failure due to unhandled Astro Content Collection schema violations.
- MDX component hydration mismatch or broken client hydration in `CodeGroup` tabs.
- Broken internal doc navigation links across dynamic `[...slug].astro` routes.
- Mobile responsiveness collapse on code comparison blocks and feature pricing cards.
- Missing meta tags / Open Graph tags affecting SEO/GEO indexability.

---

### Task 1: Scaffold Astro Project with Tailwind, React, and MDX Integrations

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Create: `tailwind.config.mjs`
- Create: `src/styles/global.css`

**Interfaces:**
- Produces: Astro build configuration supporting React components, Tailwind styling, and MDX processing.

- [ ] **Step 1: Create package.json with necessary dependencies**

Create `package.json` with dependencies: `astro`, `@astrojs/react`, `@astrojs/mdx`, `@astrojs/tailwind`, `@astrojs/sitemap`, `react`, `react-dom`, `tailwindcss`.

```json
{
  "name": "unigate-doc",
  "type": "module",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "astro dev",
    "start": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "astro": "astro"
  },
  "dependencies": {
    "@astrojs/mdx": "^3.1.9",
    "@astrojs/react": "^3.6.3",
    "@astrojs/sitemap": "^3.2.1",
    "@astrojs/tailwind": "^5.1.5",
    "astro": "^4.16.18",
    "clsx": "^2.1.1",
    "lucide-react": "^0.475.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "tailwind-merge": "^3.0.1",
    "tailwindcss": "^3.4.17"
  },
  "devDependencies": {
    "@types/react": "^18.3.18",
    "@types/react-dom": "^18.3.5",
    "typescript": "^5.7.3"
  }
}
```

- [ ] **Step 2: Install dependencies**

Run: `npm install`
Expected: Dependencies installed and `package-lock.json` generated.

- [ ] **Step 3: Create configuration files**

Create `astro.config.mjs`:
```javascript
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://doc.unigate.top',
  integrations: [
    react(),
    tailwind({ applyBaseStyles: false }),
    mdx(),
    sitemap()
  ],
  output: 'static'
});
```

Create `tsconfig.json`:
```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "react",
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

Create `tailwind.config.mjs`:
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef2ff',
          100: '#e0e7ff',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          900: '#312e81'
        }
      }
    }
  },
  plugins: []
};
```

Create `src/styles/global.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  color-scheme: dark;
}

body {
  @apply bg-slate-950 text-slate-100 font-sans antialiased min-h-screen selection:bg-brand-500 selection:text-white;
}
```

- [ ] **Step 4: Verify build scaffolding**

Run: `npx astro check || npx astro sync`
Expected: Passes without configuration error.

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json astro.config.mjs tsconfig.json tailwind.config.mjs src/styles/global.css
git commit -m "build(scaffold): initialize astro with react tailwind and mdx" -m "Set up project baseline dependencies and configuration." -m "Configured Astro static output with React islands, Tailwind styling, and MDX processing." -m "Enables reproducible static compilation for Cloudflare Pages."
```

---

### Task 2: Configure Content Collections and Document Schemas

**Files:**
- Create: `src/content/config.ts`
- Create: `src/content/docs/quickstart.mdx`
- Create: `src/content/docs/workbuddy-integration.mdx`
- Create: `src/content/docs/pricing-models.mdx`

**Interfaces:**
- Produces: `docs` collection schema with `title`, `description`, `order`, `category`.
- Consumes: Astro Content Collections API.

- [ ] **Step 1: Define content schema in src/content/config.ts**

```typescript
import { defineCollection, z } from 'astro:content';

const docs = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string().default('Guide'),
    order: z.number().default(99),
    updatedAt: z.date().optional()
  })
});

export const collections = { docs };
```

- [ ] **Step 2: Add initial MDX doc pages**

Create `src/content/docs/quickstart.mdx`:
```mdx
---
title: "快速开始"
description: "5 分钟接入 UniGate AI 网关，无缝切换 OpenAI 兼容接口"
category: "入门指南"
order: 1
---

# 快速开始

欢迎使用 UniGate AI API Gateway。UniGate 兼容标准 OpenAI 接口规范，只需替换 `base_url` 与 `api_key` 即可直接使用。

## 核心接口地址

- **API Base URL**: `https://api.unigate.top/v1`
```

Create `src/content/docs/workbuddy-integration.mdx`:
```mdx
---
title: "Workbuddy 接入指南"
description: "如何在 Workbuddy 工具中配置 UniGate 自定义端点，享受超大 Token 吞吐"
category: "生态集成"
order: 2
---

# Workbuddy 接入指南

针对使用 Workbuddy 的开发者，UniGate 提供高性价比的第三方端点支持。相比官方每期有限的点数，UniGate Pro 套餐提供每天高达 7000 万 Token 的吞吐能力。

## 配置步骤

1. 打开 Workbuddy 设置面板。
2. 找到 **自定义模型提供商 (Custom Provider)**。
3. 填入 API 地址：`https://api.unigate.top/v1`。
4. 填入您的 UniGate API Key。
5. 模型选择推荐使用 `gemini-3.8-flash` 或 `claude-3-5-sonnet`。
```

Create `src/content/docs/pricing-models.mdx`:
```mdx
---
title: "模型与定价说明"
description: "UniGate 支持的模型清单、Pro 套餐限额与计费规则"
category: "定价与模型"
order: 3
---

# 模型与定价说明

## Pro 特惠套餐

- **价格**: 原价 $8，限时特惠 **$5/月**（折合单日仅约 1 元）
- **日限额**: $40
- **周限额**: $300
- **月限额**: $1299

## 主力推荐模型

| 模型标识 | 说明 | 优势 |
| :--- | :--- | :--- |
| `gemini-3.8-flash` | 高性能吞吐主力 | LMSYS 前 16 位，单日吞吐实测最高 7000 万 Token |
| `gemini-3.1-pro` | 深度推理模型 | 适合复杂代码与多步逻辑分析 |
| `claude-3-7-sonnet` | 顶尖代码模型 | 优质稀缺节点，极致编程辅助 |
```

- [ ] **Step 3: Run astro sync to validate collections**

Run: `npx astro sync`
Expected: Collection types generated without schema errors.

- [ ] **Step 4: Commit**

```bash
git add src/content/config.ts src/content/docs/
git commit -m "docs(content): define content schema and initial mdx guides" -m "Structured documentation collections using Astro Content Collections." -m "Defined Zod schema with title, description, category, and order fields, alongside seed docs for Quickstart, Workbuddy, and Pricing." -m "Establishes validated data sources for automatic sidebar and route generation."
```

---

### Task 3: Build Interactive MDX React Components

**Files:**
- Create: `src/components/mdx/Callout.tsx`
- Create: `src/components/mdx/CodeGroup.tsx`
- Create: `src/components/mdx/Steps.tsx`
- Create: `src/components/mdx/index.ts`

**Interfaces:**
- Produces:
  - `Callout`: Props `{ type?: 'info' | 'warning' | 'tip' | 'danger', title?: string, children: React.ReactNode }`
  - `CodeGroup`: Props `{ items: Array<{ label: string, code: string, lang?: string }> }`
  - `Steps`: Props `{ children: React.ReactNode }`

- [ ] **Step 1: Implement Callout component**

Create `src/components/mdx/Callout.tsx`:
```tsx
import React from 'react';
import { AlertCircle, AlertTriangle, CheckCircle2, Info } from 'lucide-react';

interface CalloutProps {
  type?: 'info' | 'warning' | 'tip' | 'danger';
  title?: string;
  children: React.ReactNode;
}

const styles = {
  info: { bg: 'bg-blue-950/40 border-blue-800 text-blue-200', icon: Info, iconColor: 'text-blue-400' },
  warning: { bg: 'bg-amber-950/40 border-amber-800 text-amber-200', icon: AlertTriangle, iconColor: 'text-amber-400' },
  tip: { bg: 'bg-emerald-950/40 border-emerald-800 text-emerald-200', icon: CheckCircle2, iconColor: 'text-emerald-400' },
  danger: { bg: 'bg-rose-950/40 border-rose-800 text-rose-200', icon: AlertCircle, iconColor: 'text-rose-400' }
};

export const Callout: React.FC<CalloutProps> = ({ type = 'info', title, children }) => {
  const current = styles[type] || styles.info;
  const Icon = current.icon;

  return (
    <div className={`my-4 p-4 rounded-xl border ${current.bg} flex gap-3 text-sm leading-relaxed`}>
      <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${current.iconColor}`} />
      <div className="flex-1">
        {title && <div className="font-semibold mb-1 text-slate-100">{title}</div>}
        <div className="text-slate-300">{children}</div>
      </div>
    </div>
  );
};
```

- [ ] **Step 2: Implement CodeGroup component with copy and tab switching**

Create `src/components/mdx/CodeGroup.tsx`:
```tsx
import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface CodeItem {
  label: string;
  code: string;
  lang?: string;
}

interface CodeGroupProps {
  items: CodeItem[];
}

export const CodeGroup: React.FC<CodeGroupProps> = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const active = items[activeIndex] || items[0];

  const handleCopy = async () => {
    if (!active) return;
    await navigator.clipboard.writeText(active.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-5 rounded-xl border border-slate-800 bg-slate-900/90 overflow-hidden shadow-lg">
      <div className="flex items-center justify-between px-3 py-2 bg-slate-950/80 border-b border-slate-800">
        <div className="flex gap-1.5 overflow-x-auto">
          {items.map((item, idx) => (
            <button
              key={item.label}
              onClick={() => setActiveIndex(idx)}
              className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors ${
                idx === activeIndex
                  ? 'bg-brand-600/30 text-brand-300 border border-brand-500/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <button
          onClick={handleCopy}
          aria-label="复制代码"
          className="p-1.5 rounded-md text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
      <pre className="p-4 text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed">
        <code>{active?.code}</code>
      </pre>
    </div>
  );
};
```

- [ ] **Step 3: Implement Steps component**

Create `src/components/mdx/Steps.tsx`:
```tsx
import React from 'react';

export const Steps: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="my-6 pl-4 border-l-2 border-brand-500/30 space-y-6">
      {children}
    </div>
  );
};
```

Create `src/components/mdx/index.ts`:
```typescript
export * from './Callout';
export * from './CodeGroup';
export * from './Steps';
```

- [ ] **Step 4: Verify component compilation**

Run: `npx tsc --noEmit`
Expected: Zero TypeScript errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/mdx/
git commit -m "feat(components): add interactive mdx doc components" -m "Implemented Callout, CodeGroup, and Steps React components for documentation enhancement." -m "Provides tabbed multi-language code snippets with clipboard copy, styled contextual callouts, and step-by-step containers." -m "Allows rich interactive walkthroughs inside markdown documents."
```

---

### Task 4: Layouts and Navigation Architecture

**Files:**
- Create: `src/components/common/Header.astro`
- Create: `src/components/common/Footer.astro`
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/layouts/DocLayout.astro`

**Interfaces:**
- Produces:
  - `BaseLayout.astro`: global `<head>`, SEO metadata, header and footer.
  - `DocLayout.astro`: two-column/three-column layout with sidebar and table of contents.
- Consumes: `src/content/docs` collections for sidebar links.

- [ ] **Step 1: Create Header and Footer components**

Create `src/components/common/Header.astro`:
```astro
---
interface Props {
  showDocsNav?: boolean;
}
const { showDocsNav = true } = Astro.props;
---

<header class="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
    <div class="flex items-center gap-6">
      <a href="/" class="flex items-center gap-2 font-bold text-lg text-white tracking-tight hover:opacity-90">
        <span class="w-7 h-7 rounded-lg bg-gradient-to-tr from-indigo-500 to-brand-500 flex items-center justify-center text-xs font-mono">UG</span>
        <span>UniGate <span class="text-xs px-1.5 py-0.5 rounded bg-brand-500/20 text-brand-300 font-normal">Docs</span></span>
      </a>
      <nav class="hidden md:flex items-center gap-5 text-sm text-slate-300">
        <a href="/docs/quickstart" class="hover:text-white transition">接入文档</a>
        <a href="/docs/workbuddy-integration" class="hover:text-white transition">Workbuddy 指南</a>
        <a href="/docs/pricing-models" class="hover:text-white transition">模型与定价</a>
      </nav>
    </div>
    <div class="flex items-center gap-3">
      <a
        href="https://unigate.top"
        target="_blank"
        rel="noopener noreferrer"
        class="text-xs px-3 py-1.5 rounded-lg border border-slate-700 text-slate-300 hover:text-white hover:border-slate-500 transition"
      >
        控制台
      </a>
      <a
        href="/#pricing"
        class="text-xs px-3 py-1.5 rounded-lg bg-gradient-to-r from-brand-600 to-indigo-600 text-white font-medium hover:brightness-110 shadow-sm transition"
      >
        💥 Pro $5/月特惠
      </a>
    </div>
  </div>
</header>
```

Create `src/components/common/Footer.astro`:
```astro
---
const currentYear = new Date().getFullYear();
---

<footer class="border-t border-slate-800/60 bg-slate-950 py-10 mt-20">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
    <p>© {currentYear} UniGate. AI API Gateway. All rights reserved.</p>
    <div class="flex items-center gap-4">
      <a href="https://unigate.top" class="hover:text-slate-300 transition">官网入口</a>
      <a href="/docs/quickstart" class="hover:text-slate-300 transition">快速接入</a>
      <a href="/docs/pricing-models" class="hover:text-slate-300 transition">服务定价</a>
    </div>
  </div>
</footer>
```

- [ ] **Step 2: Create BaseLayout.astro with SEO metadata**

Create `src/layouts/BaseLayout.astro`:
```astro
---
import Header from '../components/common/Header.astro';
import Footer from '../components/common/Footer.astro';
import '../styles/global.css';

interface Props {
  title: string;
  description?: string;
}

const {
  title,
  description = 'UniGate AI API Gateway 官方文档 - 极致性价比，日供7000万Token，无缝集成Workbuddy'
} = Astro.props;

const canonicalURL = new URL(Astro.url.pathname, Astro.site || 'https://doc.unigate.top');
---

<!doctype html>
<html lang="zh-CN" class="dark">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <title>{title} | UniGate Docs</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={canonicalURL} />
    <!-- Open Graph -->
    <meta property="og:title" content={`${title} | UniGate Docs`} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={canonicalURL} />
    <meta property="og:type" content="website" />
  </head>
  <body class="bg-slate-950 text-slate-100 flex flex-col min-h-screen">
    <Header />
    <main class="flex-1">
      <slot />
    </main>
    <Footer />
  </body>
</html>
```

- [ ] **Step 3: Create DocLayout.astro with dynamic sidebar**

Create `src/layouts/DocLayout.astro`:
```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from './BaseLayout.astro';

interface Props {
  title: string;
  description?: string;
  currentSlug?: string;
}

const { title, description, currentSlug } = Astro.props;
const docs = await getCollection('docs');
const sortedDocs = docs.sort((a, b) => a.data.order - b.data.order);
---

<BaseLayout title={title} description={description}>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <!-- Sidebar -->
      <aside class="hidden lg:block lg:col-span-1 border-r border-slate-800/80 pr-6">
        <div class="sticky top-24 space-y-4">
          <h3 class="text-xs font-semibold uppercase tracking-wider text-slate-400">文档列表</h3>
          <nav class="space-y-1">
            {sortedDocs.map((doc) => {
              const isActive = currentSlug === doc.slug;
              return (
                <a
                  href={`/docs/${doc.slug}`}
                  class={`block px-3 py-2 text-sm rounded-lg transition ${
                    isActive
                      ? 'bg-brand-600/20 text-brand-300 font-medium border border-brand-500/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  {doc.data.title}
                </a>
              );
            })}
          </nav>
        </div>
      </aside>

      <!-- Main Doc Content -->
      <article class="lg:col-span-3 prose prose-invert prose-indigo max-w-none">
        <slot />
      </article>
    </div>
  </div>
</BaseLayout>
```

- [ ] **Step 4: Commit**

```bash
git add src/components/common/ src/layouts/
git commit -m "feat(layout): implement base layout header footer and doc layout" -m "Built responsive layout shell with full SEO and Open Graph metadata support." -m "Implemented dynamic sidebar navigation reading from sorted docs collection." -m "Supports responsive multi-column layout for developer reading experience."
```

---

### Task 5: Hybrid Landing Page Implementation (`src/pages/index.astro`)

**Files:**
- Create: `src/pages/index.astro`
- Modify: `public/favicon.svg`

**Interfaces:**
- Produces: High-converting landing page adhering to the hybrid strategy, showcasing value propositions, code integration demo, and $5 Pro plan copy.

- [ ] **Step 1: Create favicon.svg in public/**

Create `public/favicon.svg`:
```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="8" fill="#4f46e5"/>
  <text x="16" y="21" font-size="14" font-weight="bold" fill="#ffffff" text-anchor="middle" font-family="sans-serif">UG</text>
</svg>
```

- [ ] **Step 2: Build the hybrid landing page in src/pages/index.astro**

Create `src/pages/index.astro`:
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import { CodeGroup } from '../components/mdx/CodeGroup';

const curlSnippet = `curl https://api.unigate.top/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_UNIGATE_KEY" \\
  -d '{
    "model": "gemini-3.8-flash",
    "messages": [{"role": "user", "content": "Hello UniGate!"}]
  }'`;

const pythonSnippet = `from openai import OpenAI

client = OpenAI(
    base_url="https://api.unigate.top/v1",
    api_key="YOUR_UNIGATE_KEY"
)

response = client.chat.completions.create(
    model="gemini-3.8-flash",
    messages=[{"role": "user", "content": "Hello UniGate!"}]
)
print(response.choices[0].message.content)`;
---

<BaseLayout title="开发者友好的极速 AI API Gateway">
  <!-- Hero Section -->
  <section class="relative pt-20 pb-16 overflow-hidden">
    <div class="max-w-5xl mx-auto px-4 text-center space-y-6">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-500/30 bg-brand-500/10 text-xs text-brand-300">
        <span>⚡ UniGate 中转站正式开业</span>
        <span class="w-1 h-1 rounded-full bg-brand-400"></span>
        <span>Pro 套餐特惠 $5/月</span>
      </div>

      <h1 class="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
        开发者友好的极速 <br/>
        <span class="bg-gradient-to-r from-brand-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
          AI API Gateway
        </span>
      </h1>

      <p class="max-w-2xl mx-auto text-base sm:text-lg text-slate-400 leading-relaxed">
        无缝对接 Workbuddy 等生产力工具，单日吞吐最高实测 7000 万 Token。以极低门槛享受世界顶级模型的高并发服务。
      </p>

      <div class="flex flex-wrap items-center justify-center gap-4 pt-4">
        <a
          href="/docs/quickstart"
          class="px-6 py-3 rounded-xl bg-slate-100 text-slate-900 font-semibold hover:bg-white transition shadow-lg shadow-white/5"
        >
          立即查阅接入文档
        </a>
        <a
          href="#pricing"
          class="px-6 py-3 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 text-white font-semibold hover:brightness-110 transition shadow-lg shadow-brand-500/20"
        >
          💥 查看 Pro 特惠 ($5/月)
        </a>
      </div>
    </div>
  </section>

  <!-- Interactive Code Demo -->
  <section class="max-w-4xl mx-auto px-4 py-8">
    <div class="text-center mb-6">
      <h2 class="text-xl font-bold text-slate-200">仅需修改一行 Base URL，极简迁移</h2>
      <p class="text-xs text-slate-400 mt-1">完全兼容 OpenAI 协议标准，零代码学习成本</p>
    </div>
    <CodeGroup
      client:load
      items={[
        { label: 'Python (OpenAI SDK)', code: pythonSnippet, lang: 'python' },
        { label: 'cURL', code: curlSnippet, lang: 'bash' }
      ]}
    />
  </section>

  <!-- Pricing & Promotional Copy Section -->
  <section id="pricing" class="max-w-6xl mx-auto px-4 py-16">
    <div class="text-center mb-12">
      <h2 class="text-2xl sm:text-3xl font-bold text-white">价格亲民，量大管饱</h2>
      <p class="text-sm text-slate-400 mt-2">专为高频调用与大模型工具用户量身打造的高配额矩阵</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Card 1: Pricing -->
      <div class="p-6 rounded-2xl border border-brand-500/30 bg-slate-900/60 relative flex flex-col justify-between">
        <div class="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full bg-brand-500 text-white text-[10px] font-bold uppercase tracking-wider">
          开业特惠
        </div>
        <div>
          <h3 class="text-lg font-bold text-white">Pro 极速套餐</h3>
          <div class="mt-4 flex items-baseline gap-2">
            <span class="text-4xl font-extrabold text-white">$5</span>
            <span class="text-sm text-slate-400">/ 月</span>
            <span class="text-xs line-through text-slate-500">原价 $8</span>
          </div>
          <p class="text-xs text-slate-400 mt-2">折合每天只需一块钱多一点，即可摆脱官方限额束缚！</p>
          <ul class="mt-6 space-y-2.5 text-xs text-slate-300">
            <li class="flex items-center gap-2">✅ 日额度：<strong>$40</strong></li>
            <li class="flex items-center gap-2">✅ 周额度：<strong>$300</strong></li>
            <li class="flex items-center gap-2">✅ 月额度：<strong>$1299</strong></li>
            <li class="flex items-center gap-2">✅ 全面兼容各大主流开源及商用客户端</li>
          </ul>
        </div>
        <a
          href="https://unigate.top"
          target="_blank"
          rel="noopener noreferrer"
          class="mt-8 block text-center py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-medium text-sm transition"
        >
          前往官网选购
        </a>
      </div>

      <!-- Card 2: Gemini Flash -->
      <div class="p-6 rounded-2xl border border-slate-800 bg-slate-900/40 flex flex-col justify-between">
        <div>
          <div class="text-xs font-semibold text-brand-400 uppercase tracking-wider">性价比之王</div>
          <h3 class="text-lg font-bold text-white mt-1">Gemini-3.8-Flash</h3>
          <p class="text-xs text-slate-400 mt-2">兼具顶级推理性能与闪电般的响应延迟，长文本及高频调用的首选。</p>
          <ul class="mt-6 space-y-2.5 text-xs text-slate-300">
            <li class="flex items-start gap-2">⚡ <strong>超大吞吐</strong>：实测日均最高跑出 7000 万 Token。</li>
            <li class="flex items-start gap-2">🏆 <strong>实力碾压</strong>：LMSYS 综合榜单稳居前 16 位，超越多数旗舰开源模型。</li>
            <li class="flex items-start gap-2">💼 <strong>生态适配</strong>：完美充当 Workbuddy、Cursor 等的高性能后台引擎。</li>
          </ul>
        </div>
        <a href="/docs/workbuddy-integration" class="mt-8 text-xs text-brand-400 hover:text-brand-300 font-medium">
          查看 Workbuddy 接入配置 →
        </a>
      </div>

      <!-- Card 3: Claude 4.6 -->
      <div class="p-6 rounded-2xl border border-slate-800 bg-slate-900/40 flex flex-col justify-between">
        <div>
          <div class="text-xs font-semibold text-indigo-400 uppercase tracking-wider">旗舰双星</div>
          <h3 class="text-lg font-bold text-white mt-1">Claude 4.6 阵营</h3>
          <p class="text-xs text-slate-400 mt-2">专为深度长文本、高难度编程架构及精细创作准备的稀缺算力节点。</p>
          <ul class="mt-6 space-y-2.5 text-xs text-slate-300">
            <li class="flex items-start gap-2">✨ <strong>Sonnet 4.6 / Opus 4.6</strong>：全能推理与逻辑分析天花板。</li>
            <li class="flex items-start gap-2">🛡️ <strong>专线稳定</strong>：高可用保障，告别官方账号被封困扰。</li>
            <li class="flex items-start gap-2">🧩 <strong>全模型支持</strong>：同时覆盖 Gemini-3.1-Pro 等硬核担当。</li>
          </ul>
        </div>
        <a href="/docs/pricing-models" class="mt-8 text-xs text-indigo-400 hover:text-indigo-300 font-medium">
          查看全部可用模型清单 →
        </a>
      </div>
    </div>
  </section>
</BaseLayout>
```

- [ ] **Step 3: Test local compilation of landing page**

Run: `npx astro check`
Expected: Passes without errors.

- [ ] **Step 4: Commit**

```bash
git add src/pages/index.astro public/favicon.svg
git commit -m "feat(landing): build hybrid landing page with pricing and code demo" -m "Designed high-converting landing page merging developer documentation with promotional copy." -m "Integrated interactive multi-language code demo and three-column feature pricing cards for Pro $5 tier." -m "Enables direct conversion of Workbuddy and AI developer traffic."
```

---

### Task 6: Dynamic Doc Routes with Custom MDX Component Injection

**Files:**
- Create: `src/pages/docs/[...slug].astro`
- Modify: `src/content/docs/quickstart.mdx`

**Interfaces:**
- Produces: Dynamic route rendering all `.mdx` files in `src/content/docs/` with auto-injected React components (`Callout`, `CodeGroup`, `Steps`).

- [ ] **Step 1: Create dynamic route in src/pages/docs/[...slug].astro**

Create `src/pages/docs/[...slug].astro`:
```astro
---
import { getCollection } from 'astro:content';
import DocLayout from '../../layouts/DocLayout.astro';
import { Callout } from '../../components/mdx/Callout';
import { CodeGroup } from '../../components/mdx/CodeGroup';
import { Steps } from '../../components/mdx/Steps';

export async function getStaticPaths() {
  const docs = await getCollection('docs');
  return docs.map((entry) => ({
    params: { slug: entry.slug },
    props: { entry }
  }));
}

const { entry } = Astro.props;
const { Content } = await entry.render();
---

<DocLayout
  title={entry.data.title}
  description={entry.data.description}
  currentSlug={entry.slug}
>
  <div class="mb-8 border-b border-slate-800 pb-4">
    <span class="text-xs font-semibold text-brand-400 uppercase tracking-wider">{entry.data.category}</span>
    <h1 class="text-3xl font-extrabold text-white mt-1 mb-2">{entry.data.title}</h1>
    <p class="text-slate-400 text-sm">{entry.data.description}</p>
  </div>

  <Content components={{ Callout, CodeGroup, Steps }} />
</DocLayout>
```

- [ ] **Step 2: Update quickstart.mdx to utilize rich MDX components**

Modify `src/content/docs/quickstart.mdx`:
```mdx
---
title: "快速开始"
description: "5 分钟接入 UniGate AI 网关，无缝切换 OpenAI 兼容接口"
category: "入门指南"
order: 1
---

欢迎使用 UniGate AI API Gateway！本文档将指导您在 5 分钟内完成环境配置并发出第一次请求。

<Callout type="tip" title="关于 API 协议">
  UniGate 完全兼容 OpenAI 官方接口格式。您不需要更改既有的 SDK，只需要将 `base_url` 修改为我们的服务地址即可。
</Callout>

## 接入三步法

<Steps>
  ### 第一步：获取 API 密钥
  登录 [UniGate 控制台](https://unigate.top)，在凭证管理中创建您的专属令牌。

  ### 第二步：配置 Base URL
  将客户端的端点地址设定为：
  `https://api.unigate.top/v1`

  ### 第三步：发送请求
  使用您熟悉的语言发起调用。
</Steps>

## 调用代码示例

<CodeGroup
  items={[
    {
      label: "cURL",
      code: "curl https://api.unigate.top/v1/chat/completions \\\n  -H \"Content-Type: application/json\" \\\n  -H \"Authorization: Bearer YOUR_API_KEY\" \\\n  -d '{\n    \"model\": \"gemini-3.8-flash\",\n    \"messages\": [{\"role\": \"user\", \"content\": \"你好！\"}]\n  }'"
    },
    {
      label: "Python",
      code: "from openai import OpenAI\n\nclient = OpenAI(\n    base_url=\"https://api.unigate.top/v1\",\n    api_key=\"YOUR_API_KEY\"\n)\n\ncompletion = client.chat.completions.create(\n    model=\"gemini-3.8-flash\",\n    messages=[{\"role\": \"user\", \"content\": \"你好！\"}]\n)\nprint(completion.choices[0].message.content)"
    }
  ]}
/>

<Callout type="warning" title="安全提示">
  请勿将 API Key 提交至任何公开代码仓库（如 GitHub）。请使用环境变量（如 `.env`）进行注入管理。
</Callout>
```

- [ ] **Step 3: Run static build to verify route and MDX rendering**

Run: `npm run build`
Expected: Static build completes successfully generating HTML files into `dist/`.

- [ ] **Step 4: Commit**

```bash
git add src/pages/docs/ src/content/docs/quickstart.mdx
git commit -m "feat(docs): implement dynamic doc routing with custom mdx component injection" -m "Built dynamic [...slug].astro route with static path generation." -m "Injected Callout, CodeGroup, and Steps components into MDX rendering context." -m "Enables rich, interactive documentation pages with zero client bundle overhead for static parts."
```

---

### Task 7: Final Verification and Cloudflare Pages Readiness Check

**Files:**
- Create: `README.md`
- Test: Build output audit in `dist/`

**Interfaces:**
- Produces: Production build artifacts ready for zero-config Cloudflare Pages push.

- [ ] **Step 1: Add project README with deployment instructions**

Create `README.md`:
```markdown
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
```

- [ ] **Step 2: Run end-to-end production build**

Run: `npm run build`
Expected: `dist/` created with `index.html`, `docs/quickstart/index.html`, `sitemap-index.xml`, etc.

- [ ] **Step 3: Push changes to remote repository**

```bash
git add README.md
git commit -m "docs(repo): add project readme and cloudflare pages deployment guide" -m "Documented project overview, technology stack, and local development scripts." -m "Added step-by-step instructions for automated Cloudflare Pages continuous deployment." -m "Finalizes repository readiness for public documentation hosting."
git push origin master
```
