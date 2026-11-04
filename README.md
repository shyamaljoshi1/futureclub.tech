# The Future Guy AI — Premium AI Tools & Prompt Directory

A production-ready, lightweight, SEO-optimized, and AdSense-ready AI discovery directory and prompt library built for **@thefutureguyy.ai**.

Designed following the strict anti-slop guidelines of the **Taste Skill** (clean typography, generous whitespace, surface tone hierarchy, zero decorative gradients, and high content utility).

---

## Table of Contents

1. [Architecture & Features](#architecture--features)
2. [Reel-Based Content Architecture (`src/data/reels/`)](#reel-based-content-architecture)
   - [How 1 JSON File = 1 Reel / Tool / Prompt Set](#how-1-json-file--1-reel--tool--prompt-set)
   - [Adding a New Reel JSON File](#adding-a-new-reel-json-file)
   - [Embedding Instagram Reels & Thumbnails](#embedding-instagram-reels--thumbnails)
3. [Quickstart & Local Development](#quickstart--local-development)
4. [Building & Prerendering](#building--prerendering)
5. [Deployment (Vercel & Cloudflare Pages)](#deployment-vercel--cloudflare-pages)
6. [Google AdSense Monetization Setup](#google-adsense-monetization-setup)
7. [Google Analytics 4 (GA4) Integration](#google-analytics-4-ga4-integration)
8. [Pre-flight Design & Data Validation](#pre-flight-design--data-validation)

---

## Architecture & Features

- **Framework**: React 18 + Vite + TypeScript
- **Styling**: Tailwind CSS with custom light/dark surface tokens
- **Routing**: React Router v6 with client-side routing & server-side prerendering
- **Per-Reel JSON Architecture**: Every Reel / Tool / Prompt Set lives in its own dedicated JSON file inside `src/data/reels/*.json`. Adding a file automatically publishes the tool, prompt, and reel breakdown!
- **Interactive Instagram Reel Embeds**: Built-in `InstagramReelEmbed` component that renders responsive players with fallback thumbnails and direct links to `@thefutureguyy.ai`.
- **One Live Thing**: Interactive Live Prompt Synthesizer & Token Calculator
- **Instant Search**: Global CMD+K modal search across tools, prompts, guides, and collections
- **Static Prerendering**: Generates physical HTML pages with tailored titles, meta descriptions, canonical links, and Schema.org structured data (SoftwareApplication, Article, WebSite, BreadcrumbList)
- **Zero Backend**: Statically buildable, zero database, zero external AI runtime costs

---

## Reel-Based Content Architecture

### How 1 JSON File = 1 Reel / Tool / Prompt Set

All AI tools and prompts are managed through individual JSON files located in:
```
src/data/reels/
├── google-antigravity-cli.json
├── nvidia-nim-free-api.json
├── google-gemini-student-pack.json
├── n8n-ai-automation-workflow.json
├── crewai-multi-agent-system.json
├── cursor-composer-workflow.json
├── claude-artifacts-system.json
├── perplexity-deep-research.json
├── chatgpt-first-principles-reasoning.json
├── flux-photorealistic-camera-prompt.json
├── elevenlabs-voice-cloning-workflow.json
├── v0-frontend-component-generator.json
├── gamma-ai-presentation-deck.json
├── bolt-new-fullstack-ai.json
├── codeium-free-copilot-alternative.json
├── ollama-run-local-llms.json
├── deepseek-r1-open-reasoning.json
├── notebooklm-audio-podcast.json
├── supabase-vector-ai-embeddings.json
├── whisper-ai-transcription-workflow.json
├── midjourney-v6-product-photography.json
├── manus-ai-autonomous-agent.json
├── top-10-free-ai-tools-students.json
├── instagram-viral-ai-hook-formula.json
└── langgraph-multi-agent-orchestration.json
```

Each JSON file controls:
1. **The Tool**: Tool name, small description, pricing, and official website URL (`toolUrl`).
2. **The Instagram Reel**: Reel link (`instagramReelUrl`), Reel ID (`instagramReelId`), and thumbnail (`reelThumbnail`).
3. **The Prompt Set**: Array of copy-paste prompts used in that specific reel, with step-by-step instructions.

### Adding a New Reel JSON File

To add a new tool or prompt from your latest Instagram Reel:
1. Create a new file in `src/data/reels/<your-slug>.json`.
2. Add the thumbnail under `public/assets/reels/<your-slug>.webp` (or `.svg` / `.png`).
3. Paste the following JSON structure:

```json
{
  "id": "reel-007",
  "slug": "suno-ai-music-generator",
  "title": "Create Radio-Quality Music in Seconds with Suno AI",
  "toolName": "Suno AI v3.5",
  "toolUrl": "https://suno.com/",
  "description": "Generative audio platform creating full-length songs with vocals, instrumentals, and lyrics from text prompts.",
  "category": "audio-voice",
  "pricing": "freemium",
  "instagramReelUrl": "https://www.instagram.com/reel/C8XYZ123456/",
  "instagramReelId": "C8XYZ123456",
  "reelThumbnail": "/assets/reels/suno-reel.svg",
  "promptSet": [
    {
      "id": "suno-p1",
      "title": "Cinematic Lo-Fi Chillwave Prompt",
      "prompt": "Style: Lo-fi chillwave, muted Rhodes electric piano, dusty vinyl crackle, warm analog bassline, 85 bpm, instrumental, late-night coding soundtrack.",
      "instructions": [
        "Open Suno.com",
        "Click Create and toggle 'Custom Mode'",
        "Paste the style tags into the 'Style of Music' box",
        "Leave lyrics blank for an instrumental or enter custom verse/chorus"
      ]
    }
  ],
  "featured": true,
  "trending": true,
  "status": "published",
  "publishedAt": "2026-11-03",
  "seo": {
    "title": "Suno AI v3.5 Prompts & Instagram Reel Breakdown",
    "description": "Watch our Instagram breakdown of Suno AI v3.5 and copy the exact lo-fi music generation prompt."
  }
}
```

That's it!
- Vite automatically imports the file via `import.meta.glob`.
- The tool appears in `/tools`.
- The prompt appears in `/prompts`.
- An individual page is created at `/tools/suno-ai-music-generator` and `/prompts/suno-ai-music-generator`.
- Running `npm run build` prerenders its dedicated static HTML page and updates `sitemap.xml` automatically.

### Embedding Instagram Reels & Thumbnails
- **Reel URL**: Set `instagramReelUrl` to the full Instagram link (e.g. `https://www.instagram.com/reel/C8XYZ123456/`).
- **Reel ID**: Optional string (e.g. `C8XYZ123456`). If omitted, the system extracts it automatically from the URL.
- **Thumbnail**: Place the thumbnail in `public/assets/reels/` and reference it as `"/assets/reels/<name>.svg"` (or `.webp` / `.png`).
- On the detail page, visitors can click to load the interactive Instagram player or click "Watch on Instagram" to view it directly on your profile.

---

## Quickstart & Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000). Press <kbd>Cmd</kbd> + <kbd>K</kbd> to test the search modal.

---

## Building & Prerendering

```bash
npm run build
```
Builds the client, server, and prerenders all static HTML pages into `dist/`.

To preview:
```bash
npm run preview
```

---

## Deployment (Vercel & Cloudflare Pages)

### Vercel
1. Framework Preset: **Vite**
2. Build Command: `npm run build`
3. Output Directory: `dist`
4. Deploy!

### Cloudflare Pages
1. Build command: `npm run build`
2. Output directory: `dist`
3. Set environment variable: `NODE_VERSION=22`

---

## Google AdSense Monetization Setup

1. In `.env`:
   ```env
   VITE_ADSENSE_ENABLED=true
   VITE_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX
   VITE_ADSENSE_SLOT_HOME=1234567890
   VITE_ADSENSE_SLOT_TOOLS=2345678901
   VITE_ADSENSE_SLOT_PROMPTS=3456789012
   VITE_ADSENSE_SLOT_DETAILS=4567890123
   ```
2. In `public/ads.txt`, replace the placeholder with your authorized seller record:
   ```text
   google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
   ```

---

## Pre-flight Design & Data Validation

Run these commands to verify that all JSON files and components follow the design system:

```bash
# 1. Validate all reel JSON files against strict Zod schemas
npm run validate:data

# 2. Run Taste Skill anti-slop design check
npm run lint:taste

# 3. Build and prerender static HTML
npm run build
```

Both tests pass with **0 FAIL and 0 WARN**.
