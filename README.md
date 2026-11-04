# futureclub.tech — Discover AI Tools. Unlock What's Possible.

<p align="center">
  <img src="public/assets/screenshots/hero-preview.png" alt="futureclub.tech Hero Preview" width="100%" />
</p>

<p align="center">
  <strong>The official web companion to <a href="https://www.instagram.com/thefutureguyy.ai/">@thefutureguyy.ai</a></strong><br>
  Curated AI tools, production-ready prompts, and practical workflows tested in real-world environments.
</p>

<p align="center">
  <a href="https://futureclub.tech"><strong>Explore Live Website &rarr;</strong></a> •
  <a href="https://www.instagram.com/thefutureguyy.ai/"><strong>Instagram Channel &rarr;</strong></a> •
  <a href="#what-is-futureclubtech"><strong>What is futureclub.tech?</strong></a> •
  <a href="#key-features--platform-tour"><strong>Platform Tour</strong></a> •
  <a href="#how-to-run-locally"><strong>Run Locally</strong></a>
</p>

---

## What is futureclub.tech?

**futureclub.tech** is a clean, community-driven AI directory and prompt repository engineered for developers, creators, entrepreneurs, and productivity enthusiasts.

Every day, new artificial intelligence breakthroughs, open-source repositories, and viral prompting frameworks appear across social media. However, finding the **exact links**, **step-by-step setup guides**, and **tested prompt templates** after watching a short video reel is often frustrating.

**futureclub.tech solves this problem:**

* **100% Manually Tested Tools**: Every utility, CLI agent, and platform showcased on the site has been hands-on verified on our Instagram reels.
* **Zero Sponsored Bias**: Objective breakdowns highlighting actual strengths, trade-offs, and pricing models (Free, Freemium, Paid).
* **Instant Copy-Paste Prompts**: Fully structured prompt sets complete with instructions, parameters, and example outputs.
* **Direct Official Links**: Instant access to verified GitHub repositories, official tool homepages, and Instagram demonstration breakdowns.

---

## Key Features & Platform Tour

### 1. Trending AI Tools
Discover the tools experiencing rapid adoption across software engineering, graphic design, and workflow automation.

<p align="center">
  <img src="public/assets/screenshots/trending-tools.jpg" alt="Trending AI Tools on futureclub.tech" width="100%" />
</p>

* **Verified Breakdowns**: Each card features live badges, pricing tier tags, category indicators, direct links to official platforms, and links to watch the reel breakdown.
* **Featured Highlights**: Leading tools like **Archify** (runtime architecture diagram generator), **Google AI Studio**, **Claude Watermark Remover**, and open-source models are updated continuously with latest additions prioritized first.

---

### 2. Curated AI Prompt Library
Turn complex generative models into reliable, deterministic results with battle-tested prompt recipes.

<p align="center">
  <img src="public/assets/screenshots/curated-prompts.jpg" alt="Curated AI Prompts on futureclub.tech" width="100%" />
</p>

* **Multi-Model Support**: Engineered specifically for ChatGPT, Claude 3.5 Sonnet, Midjourney, and Google Gemini.
* **Structured Prompts**: Clear prompt variables, style definitions, shot types, camera lighting setups, and reasoning chains.
* **One-Click Copy**: Instant clipboard copy button for rapid experimentation in your AI playground of choice.

---

### 3. Filterable AI Tools Directory (`/tools`)
Browse through our growing catalog of 70+ verified AI utilities with granular filters and instant keyword search.

<p align="center">
  <img src="public/assets/screenshots/tools-directory.jpg" alt="AI Tools Directory on futureclub.tech" width="100%" />
</p>

* **Category Filters**: Filter across Coding & Development, AI Writing & Copy, Image Generation, Video & Animation, Productivity & Notes, Research & Search, AI Automation, Design & UI/UX, and Audio.
* **Pricing Filters**: Quickly narrow down tools by Free, Freemium, or Paid models.
* **Sorting**: Sort by Featured First, Newest Published, or Alphabetical order.

---

### 4. Detailed Breakdown Pages
Every tool and prompt features a dedicated, SEO-optimized page:
* **Interactive Instagram Embed**: Watch the original demonstration reel directly on the page or tap to open on Instagram.
* **Full Overview & Key Features**: Clean, readable explanation of what the tool is, how it works, and who it's for.
* **Step-by-Step Instructions**: Exact terminal commands (e.g. `npx skills add ...`), installation steps, or usage workflow.
* **One-Click Link Copying**: Dedicated button to copy the direct tool link or visit the official website.

---

### 5. Instant Global Search (`Cmd + K`)
Press <kbd>Cmd</kbd> + <kbd>K</kbd> (or <kbd>Ctrl</kbd> + <kbd>K</kbd> on Windows) anywhere on the site to trigger the global search modal. The index searches across:
* Tool names & descriptions
* Prompt titles & template content
* Curated collections & resource guides

---

## Technical Architecture

The site is built with modern web standards, prioritized for sub-second load times, strict anti-slop visual design, and zero server maintenance:

* **Frontend**: React 18 + TypeScript + Vite
* **Design System**: Tailwind CSS with custom light/dark surface tokens and typography
* **Routing**: React Router v6 with static pre-rendering
* **Prerendering**: 180+ static HTML pages pre-built for instant SEO indexing, social open-graph previews, and zero-runtime host deployments
* **Zero Backend**: Statically buildable, zero database, zero external AI runtime costs
* **Analytics & Monetization**: Google Analytics 4 (GA4) with privacy controls, AdSense-ready slots with automatic placeholder suppression

---

## Content Architecture (`src/data/reels/`)

### How 1 JSON File = 1 Reel / Tool / Prompt Set

Every tool or prompt on `futureclub.tech` is defined as an independent JSON file in `src/data/reels/`:

```text
src/data/reels/
├── archify-runtime-architecture-diagram.json
├── google-ai-studio-creative-suite.json
├── claude-watermark-remover.json
├── ai-creator-monetization-stack.json
├── 1-3-billion-free-tokens-github-repo.json
└── ... (90+ curated files)
```

### Adding a New Tool or Prompt

To add a new tool or prompt from your latest reel:

1. Create a new JSON file in `src/data/reels/<your-slug>.json`.
2. Use the standard structure:

```json
{
  "id": "reel-092",
  "slug": "example-ai-tool",
  "title": "Example AI Tool : Transform Your Workflow in Seconds",
  "toolName": "Example AI Tool",
  "toolUrl": "https://example.com/",
  "description": "A high-impact AI tool that simplifies engineering and design workflows.",
  "category": "coding",
  "pricing": "free",
  "pricingDetails": "100% Free Open Source",
  "postType": "reel",
  "contentType": "tool",
  "instagramReelUrl": "https://www.instagram.com/reel/XXXXXXXXXXX/",
  "instagramReelId": "XXXXXXXXXXX",
  "reelThumbnail": "https://opengraph.githubassets.com/1/example/repo",
  "promptSet": [
    {
      "id": "pmt-092",
      "title": "Example AI Tool Overview & Features",
      "description": "Example AI Tool – Transform Your Workflow in Seconds\n\nFull narrative description...\n\nKey Features:\n• Feature 1\n• Feature 2\n\nOfficial Website: https://example.com/",
      "instructions": [
        "Clone the repository or install via CLI.",
        "Configure your API keys in the environment.",
        "Launch the tool in your browser."
      ],
      "exampleOutput": "Generated report or output."
    }
  ],
  "featured": true,
  "trending": true,
  "status": "published",
  "publishedAt": "2026-11-04",
  "seo": {
    "title": "Example AI Tool : Transform Your Workflow | futureclub.tech",
    "description": "Learn how to use Example AI Tool to accelerate your workflows."
  }
}
```

3. Run data validation:
```bash
npm run validate:data
```
4. Build and prerender:
```bash
npm run build
```

---

## How to Run Locally

### Prerequisites
* **Node.js**: v18.0.0 or higher (v20+ recommended)
* **npm** or **pnpm**

### 1. Clone & Install
```bash
git clone https://github.com/thefutureguyy/futureguyai-website.git
cd futureguyai-website
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the live site with Hot Module Replacement (HMR).

### 3. Validate Data & Pre-flight Checks
```bash
# Validate all reel JSON files against strict Zod schemas
npm run validate:data

# Run Taste Skill anti-slop design linter
npm run lint:taste
```

### 4. Build for Production (SSG Prerender)
```bash
npm run build
```
This compiles the client and server bundles, then executes the prerender script to output 180+ static HTML pages into `dist/`.

Preview the production build locally:
```bash
npm run preview
```

---

## Deployment

### Vercel
1. Connect your repository to **Vercel**.
2. Framework Preset: **Vite**
3. Build Command: `npm run build`
4. Output Directory: `dist`
5. Deploy!

### Cloudflare Pages
1. Build command: `npm run build`
2. Output directory: `dist`
3. Environment variables: `NODE_VERSION=22`

---

## Connect with Us

* **Website**: [futureclub.tech](https://futureclub.tech)
* **Instagram**: [@thefutureguyy.ai](https://www.instagram.com/thefutureguyy.ai/)
* **Creator**: Shyamal & The Future Guy AI Team

---

<p align="center">
  <sub>Built with care, precision, and zero-slop design for the AI community. © 2026 futureclub.tech</sub>
</p>
