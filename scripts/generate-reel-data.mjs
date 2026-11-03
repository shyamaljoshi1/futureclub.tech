import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const reelsDir = path.join(rootDir, 'src/data/reels');
const assetsDir = path.join(rootDir, 'public/assets/reels');
const collectionsFile = path.join(rootDir, 'src/data/collections.json');

// Ensure directories exist
if (!fs.existsSync(reelsDir)) {
  fs.mkdirSync(reelsDir, { recursive: true });
}
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

// 1. Clean existing reels in src/data/reels
const existingFiles = fs.readdirSync(reelsDir);
for (const file of existingFiles) {
  if (file.endsWith('.json')) {
    fs.unlinkSync(path.join(reelsDir, file));
    console.log(`Removed old reel file: ${file}`);
  }
}

// 2. Define the comprehensive catalog of reels, posts, and carousels for @thefutureguyy.ai
const reelsData = [
  {
    id: "reel-001",
    slug: "google-antigravity-cli",
    title: "Google Antigravity CLI Complete Setup & Agent Workflow",
    toolName: "Google Antigravity CLI",
    toolUrl: "https://antigravity.google/",
    description: "Master Google's new agent-first development CLI (agy) to run autonomous software agents directly in your terminal for refactoring, testing, and multi-agent tasks.",
    category: "coding",
    pricing: "free",
    pricingDetails: "Open preview binary with Google account sign-in",
    instagramReelUrl: "https://www.instagram.com/thefutureguyy.ai/",
    instagramReelId: "C8zF_antigravity",
    reelThumbnail: "/assets/reels/google-antigravity-cli.svg",
    promptSet: [
      {
        id: "pmt-001",
        title: "Autonomous Terminal Refactoring Prompt",
        description: "agy -p \"Audit this repository for async/await performance bottlenecks, redundant imports, and untyped functions. Propose atomic git commits and verify with test suite.\"",
        instructions: [
          "Install the agy binary via the official script: curl -fsSL https://antigravity.google/cli/install.sh | bash",
          "Sign in with your Google Developer credentials via `agy auth login`.",
          "Run the command inside your project root to initiate autonomous code review."
        ],
        exampleOutput: "Refactoring plan generated: 4 files staged with zero regression errors."
      }
    ],
    featured: true,
    trending: true,
    status: "published",
    publishedAt: "2026-10-15",
    seo: {
      title: "Google Antigravity CLI Guide & Autonomous Agent Setup | @thefutureguyy.ai",
      description: "Step-by-step setup guide for Google Antigravity CLI (agy). Run autonomous coding subagents in your terminal."
    }
  },
  {
    id: "reel-002",
    slug: "nvidia-nim-free-api",
    title: "Get Free Access to Top AI Models with NVIDIA NIM API",
    toolName: "NVIDIA NIM",
    toolUrl: "https://build.nvidia.com/",
    description: "How to access cutting-edge open and enterprise AI models for free with NVIDIA NIM API credits for developers and AI builders.",
    category: "coding",
    pricing: "free",
    pricingDetails: "Free 1,000 developer cloud credits upon signup",
    instagramReelUrl: "https://www.instagram.com/thefutureguyy.ai/",
    instagramReelId: "C8yN_nvidia_nim",
    reelThumbnail: "/assets/reels/nvidia-nim-free-api.svg",
    promptSet: [
      {
        id: "pmt-002",
        title: "NVIDIA NIM OpenAI-Compatible cURL Starter",
        description: "curl -X POST 'https://integrate.api.nvidia.com/v1/chat/completions' \\\n  -H 'Authorization: Bearer $NVIDIA_API_KEY' \\\n  -H 'Content-Type: application/json' \\\n  -d '{\n    \"model\": \"meta/llama-3.3-70b-instruct\",\n    \"messages\": [{\"role\":\"user\",\"content\":\"Explain vector embeddings in 3 sentences.\"}],\n    \"temperature\": 0.2\n  }'",
        instructions: [
          "Sign up at build.nvidia.com and generate your free developer API key.",
          "Export your key: export NVIDIA_API_KEY='nvapi-...'",
          "Run the cURL call or drop into any OpenAI SDK by replacing the baseURL."
        ],
        exampleOutput: "Instant inference response with ultra-low latency."
      }
    ],
    featured: true,
    trending: true,
    status: "published",
    publishedAt: "2026-10-16",
    seo: {
      title: "NVIDIA NIM Free API Guide & Llama 3 Setup | @thefutureguyy.ai",
      description: "How to get free enterprise AI API access using NVIDIA NIM with zero credit card required."
    }
  },
  {
    id: "reel-003",
    slug: "google-gemini-student-pack",
    title: "Google Gemini 1-Year Free Student Plan & NotebookLM Guide",
    toolName: "Google Gemini Advanced",
    toolUrl: "https://gemini.google.com/advanced",
    description: "Step-by-step breakdown on how college students can claim 1-year free access to Google Gemini Advanced with 2TB cloud storage and NotebookLM.",
    category: "productivity",
    pricing: "free",
    pricingDetails: "100% free 12-month tier for verified university/college email addresses",
    instagramReelUrl: "https://www.instagram.com/thefutureguyy.ai/",
    instagramReelId: "C8xG_gemini_student",
    reelThumbnail: "/assets/reels/google-gemini-student-pack.svg",
    promptSet: [
      {
        id: "pmt-003",
        title: "NotebookLM Academic Exam Synthesis Prompt",
        description: "Synthesize the uploaded lecture slides and research papers. Identify the 5 most heavily tested concepts, generate 10 active-recall flashcard questions with concise answers, and flag counter-intuitive traps.",
        instructions: [
          "Claim your free student Google AI plan using your college .edu or university domain.",
          "Open NotebookLM and upload PDF lecture slides, textbooks, or research notes.",
          "Paste this synthesis prompt into the notebook chat for an instant study guide."
        ],
        exampleOutput: "Detailed study guide with active-recall flashcards and concept summaries."
      }
    ],
    featured: true,
    trending: true,
    status: "published",
    publishedAt: "2026-10-17",
    seo: {
      title: "Google Gemini Free 1-Year Student Access & NotebookLM | @thefutureguyy.ai",
      description: "Claim 12 months free Google Gemini Advanced and 2TB storage with your student email."
    }
  },
  {
    id: "reel-004",
    slug: "n8n-ai-automation-workflow",
    title: "Automate Your Work with n8n & Local AI Agents",
    toolName: "n8n",
    toolUrl: "https://n8n.io/",
    description: "Build production AI agent workflows that connect your database, email, webhooks, and LLMs without paying monthly SaaS fees.",
    category: "automation",
    pricing: "freemium",
    pricingDetails: "Free self-hosted community edition or cloud starter",
    instagramReelUrl: "https://www.instagram.com/thefutureguyy.ai/",
    instagramReelId: "C8wN_n8n_automation",
    reelThumbnail: "/assets/reels/n8n-ai-automation-workflow.svg",
    promptSet: [
      {
        id: "pmt-004",
        title: "n8n Support Triage Agent System Prompt",
        description: "You are an automated support routing agent. Read the incoming customer inquiry, categorize it (Billing, Bug, Feature Request, Urgent), extract customer sentiments, and output JSON with routing destination and draft reply.",
        instructions: [
          "Deploy n8n via Docker: `docker run -it --rm -p 5678:5678 n8nio/n8n`.",
          "Add the AI Agent node paired with an OpenAI or Ollama model node.",
          "Paste this system prompt into the Agent instructions."
        ],
        exampleOutput: "JSON response with triage classification and automated draft reply."
      }
    ],
    featured: true,
    trending: false,
    status: "published",
    publishedAt: "2026-10-18",
    seo: {
      title: "n8n AI Automation Workflow Tutorial | @thefutureguyy.ai",
      description: "Build self-hosted, scalable AI automation agents with n8n. Step-by-step setup guide."
    }
  },
  {
    id: "reel-005",
    slug: "crewai-multi-agent-system",
    title: "Build an Autonomous AI Team in Python with CrewAI",
    toolName: "CrewAI",
    toolUrl: "https://crewai.com/",
    description: "Orchestrate collaborative role-playing AI agents (Researcher, Writer, Reviewer) to execute complex multi-step technical and market research.",
    category: "coding",
    pricing: "free",
    pricingDetails: "Open-source Python framework with enterprise cloud options",
    instagramReelUrl: "https://www.instagram.com/thefutureguyy.ai/",
    instagramReelId: "C8vC_crewai_team",
    reelThumbnail: "/assets/reels/crewai-multi-agent-system.svg",
    promptSet: [
      {
        id: "pmt-005",
        title: "CrewAI Researcher & Senior Writer Configuration",
        description: "researcher = Agent(\n  role='Lead Market Analyst',\n  goal='Discover emerging open-source AI developer tools',\n  backstory='Veteran tech strategist experienced in tracking GitHub trending and arXiv papers',\n  verbose=True\n)",
        instructions: [
          "Install via pip: `pip install crewai crewai-tools`.",
          "Configure your agents with complementary roles and backstories.",
          "Execute the crew with `crew.kickoff()` to run autonomous research."
        ],
        exampleOutput: "Multi-agent consensus report synthesized into markdown."
      }
    ],
    featured: true,
    trending: false,
    status: "published",
    publishedAt: "2026-10-19",
    seo: {
      title: "CrewAI Multi-Agent Python Tutorial | @thefutureguyy.ai",
      description: "Build autonomous collaborative AI agent teams in Python with CrewAI."
    }
  },
  {
    id: "reel-006",
    slug: "cursor-composer-workflow",
    title: "Cursor AI Composer Workflow for 10x Developer Speed",
    toolName: "Cursor",
    toolUrl: "https://cursor.com/",
    description: "How to use Cursor Composer and Cmd+K multi-file indexing to scaffold features, refactor legacy code, and debug across your whole repo.",
    category: "coding",
    pricing: "freemium",
    pricingDetails: "Free tier with 2,000 completions; $20/mo Pro for unlimited Claude 3.5 Sonnet",
    instagramReelUrl: "https://www.instagram.com/thefutureguyy.ai/",
    instagramReelId: "C8uR_cursor_speedrun",
    reelThumbnail: "/assets/reels/cursor-composer-workflow.svg",
    promptSet: [
      {
        id: "pmt-006",
        title: "Strict TypeScript .cursorrules Configuration",
        description: "You are an elite TypeScript & React engineer. When implementing changes:\n- Always prefer explicit type annotations over any.\n- Maintain strict zero lint warning policies.\n- Write atomic modular components under 150 lines.\n- Provide executable inline diffs only.",
        instructions: [
          "Create a `.cursorrules` file in the root directory of your repository.",
          "Paste this configuration to enforce clean architecture and eliminate hallucinations.",
          "Open Cursor Composer with Cmd+I (or Ctrl+I) and reference `@Codebase`."
        ],
        exampleOutput: "Coherent, multi-file code modifications across your entire repository."
      }
    ],
    featured: true,
    trending: true,
    status: "published",
    publishedAt: "2026-10-20",
    seo: {
      title: "Cursor AI Composer Masterclass & .cursorrules | @thefutureguyy.ai",
      description: "Accelerate development speed with Cursor Composer multi-file indexing."
    }
  },
  {
    id: "reel-007",
    slug: "claude-artifacts-system",
    title: "Build Live Web Apps in Seconds with Claude 3.5 Sonnet Artifacts",
    toolName: "Claude",
    toolUrl: "https://claude.ai/",
    description: "The exact prompt formula to make Claude generate production-ready React components, interactive dashboards, and SVGs inside Artifacts.",
    category: "coding",
    pricing: "freemium",
    pricingDetails: "Free daily allowance; $20/mo Claude Pro for higher rate limits",
    instagramReelUrl: "https://www.instagram.com/thefutureguyy.ai/",
    instagramReelId: "C8tC_claude_artifacts",
    reelThumbnail: "/assets/reels/claude-artifacts-system.svg",
    promptSet: [
      {
        id: "pmt-007",
        title: "Claude Production React Artifact Master Prompt",
        description: "Build an interactive, production-ready React component in a single artifact. Include Tailwind CSS for responsive styling, Lucide React icons, comprehensive error states, accessible keyboard controls, and realistic mock data.",
        instructions: [
          "Open Claude.ai and ensure Artifacts are toggled on in your settings.",
          "Select Claude 3.5 Sonnet for the highest frontend code fidelity.",
          "Paste this prompt along with your feature requirements to preview live UI."
        ],
        exampleOutput: "Interactive React application running live inside Claude's right-hand panel."
      }
    ],
    featured: true,
    trending: false,
    status: "published",
    publishedAt: "2026-10-21",
    seo: {
      title: "Claude 3.5 Sonnet Artifacts Frontend Guide | @thefutureguyy.ai",
      description: "Generate interactive React applications with Claude 3.5 Sonnet Artifacts."
    }
  },
  {
    id: "reel-008",
    slug: "perplexity-deep-research",
    title: "Perplexity Deep Research Masterclass with Live Sources",
    toolName: "Perplexity AI",
    toolUrl: "https://perplexity.ai/",
    description: "Conduct comprehensive market and technical research with verified academic and news citations using Perplexity's deep search mode.",
    category: "research",
    pricing: "freemium",
    pricingDetails: "Free unlimited quick searches; Pro tier for multi-step reasoning",
    instagramReelUrl: "https://www.instagram.com/thefutureguyy.ai/",
    instagramReelId: "C8sP_perplexity_research",
    reelThumbnail: "/assets/reels/perplexity-deep-research.svg",
    promptSet: [
      {
        id: "pmt-008",
        title: "Systematic Market & Technical Benchmarking Prompt",
        description: "Perform a deep multi-source competitive audit of [Industry/Domain]. Structure into: 1) Market Size & Growth drivers, 2) Top 5 players with strengths and weaknesses, 3) Verified pricing models, 4) Critical risks. Include authoritative web citations for every quantitative claim.",
        instructions: [
          "Go to perplexity.ai and toggle the Focus mode to 'Academic' or 'Web'.",
          "Replace the bracketed industry with your target domain.",
          "Review the hyperlinked source citations to verify factual accuracy."
        ],
        exampleOutput: "Comprehensive cited research briefing with clear data tables."
      }
    ],
    featured: false,
    trending: true,
    status: "published",
    publishedAt: "2026-10-22",
    seo: {
      title: "Perplexity AI Deep Research Prompt & Tutorial | @thefutureguyy.ai",
      description: "How to use Perplexity AI for fact-checked academic and technical research."
    }
  },
  {
    id: "reel-009",
    slug: "chatgpt-first-principles-reasoning",
    title: "ChatGPT O3/O1 Reasoning Prompt for Complex Problem Solving",
    toolName: "ChatGPT",
    toolUrl: "https://chatgpt.com/",
    description: "Unlock deep multi-step first-principles deduction in ChatGPT for debugging algorithms, business strategy, and hard engineering trade-offs.",
    category: "ai-writing",
    pricing: "freemium",
    pricingDetails: "Free GPT-4o mini; Plus subscription for extended reasoning models",
    instagramReelUrl: "https://www.instagram.com/thefutureguyy.ai/",
    instagramReelId: "C8rO_chatgpt_reasoning",
    reelThumbnail: "/assets/reels/chatgpt-first-principles-reasoning.svg",
    promptSet: [
      {
        id: "pmt-009",
        title: "First-Principles Architectural Trade-off Prompt",
        description: "Analyze [Problem/Architecture] using first-principles thinking. Break down the system into its absolute irreducible physical and computational limits. Identify conventional assumptions that can be challenged, and derive three alternative architectures ranked by cost, reliability, and developer velocity.",
        instructions: [
          "Select a reasoning-optimized model (e.g. o1 or o3-mini) in ChatGPT.",
          "Provide concrete context, metrics, and traffic constraints.",
          "Run the prompt to generate rigorous architectural options."
        ],
        exampleOutput: "Detailed first-principles analysis with counter-intuitive optimizations."
      }
    ],
    featured: false,
    trending: false,
    status: "published",
    publishedAt: "2026-10-23",
    seo: {
      title: "ChatGPT First-Principles Reasoning Framework | @thefutureguyy.ai",
      description: "Prompt framework for deep technical and business problem solving with ChatGPT."
    }
  },
  {
    id: "reel-010",
    slug: "flux-photorealistic-camera-prompt",
    title: "Photorealistic Flux.1 & Midjourney Camera Settings Formula",
    toolName: "Flux.1",
    toolUrl: "https://blackforestlabs.ai/",
    description: "The secret formula of shutter speed, aperture (f/1.4), film stock (Kodak Portra 400), and cinematic lighting to eliminate the AI look.",
    category: "image-generation",
    pricing: "freemium",
    pricingDetails: "Open-weight Schnell/Dev variants; Pro cloud endpoints",
    instagramReelUrl: "https://www.instagram.com/thefutureguyy.ai/",
    instagramReelId: "C8qF_flux_camera",
    reelThumbnail: "/assets/reels/flux-photorealistic-camera-prompt.svg",
    promptSet: [
      {
        id: "pmt-010",
        title: "35mm Editorial Portrait Master Prompt",
        description: "Editorial portrait photograph, natural ambient window lighting, captured on Leica M11 with 50mm Summilux lens at f/1.4, 35mm Kodak Portra 400 film grain, candid expression, realistic skin pores and texture, neutral color grading, zero digital airbrushing --ar 4:5 --raw",
        instructions: [
          "Avoid buzzwords like 'photorealistic', '8k', or 'hyper-detailed'.",
          "Specify the focal length, camera body, and film emulsion directly.",
          "Use in Flux.1 or Midjourney v6 with the --style raw parameter."
        ],
        exampleOutput: "Documentary-grade photographic image with authentic grain and depth of field."
      }
    ],
    featured: true,
    trending: true,
    status: "published",
    publishedAt: "2026-10-24",
    seo: {
      title: "Photorealistic Flux.1 Camera Prompt Formula | @thefutureguyy.ai",
      description: "The camera settings and lighting formula for documentary realism in Flux.1 and Midjourney."
    }
  },
  {
    id: "reel-011",
    slug: "elevenlabs-voice-cloning-workflow",
    title: "Clone Any Voice in 60 Seconds with ElevenLabs AI",
    toolName: "ElevenLabs",
    toolUrl: "https://elevenlabs.io/",
    description: "How content creators produce studio-quality voiceovers, translate videos into 29 languages with voice matching, and generate custom sound effects.",
    category: "audio-voice",
    pricing: "freemium",
    pricingDetails: "Free tier with 10,000 monthly characters; Starter plan at $5/month",
    instagramReelUrl: "https://www.instagram.com/thefutureguyy.ai/",
    instagramReelId: "C8pE_elevenlabs_voice",
    reelThumbnail: "/assets/reels/elevenlabs-voice-cloning-workflow.svg",
    promptSet: [
      {
        id: "pmt-011",
        title: "Voice Cadence & Audio Script Prompt",
        description: "Read in an engaging, conversational, tech-podcast cadence. Emphasize punchy phrases with subtle micro-pauses [pause=0.3s]. Maintain confident warmth without sounding robotic or theatrical.",
        instructions: [
          "Record 1 minute of clear, background-noise-free vocal sample.",
          "Upload to ElevenLabs Instant Voice Cloning.",
          "Apply this pacing instruction to synthesize crisp narration."
        ],
        exampleOutput: "Natural, human-quality vocal audio ready for reel or podcast export."
      }
    ],
    featured: false,
    trending: false,
    status: "published",
    publishedAt: "2026-10-25",
    seo: {
      title: "ElevenLabs Voice Cloning & Audio Tutorial | @thefutureguyy.ai",
      description: "How to clone your voice and generate studio audio with ElevenLabs AI."
    }
  },
  {
    id: "reel-012",
    slug: "v0-frontend-component-generator",
    title: "Generate Production Tailwind & React UI with v0 by Vercel",
    toolName: "v0",
    toolUrl: "https://v0.dev/",
    description: "Turn plain language or design screenshots into accessible, responsive React components styled with Tailwind CSS and Radix primitives.",
    category: "design",
    pricing: "freemium",
    pricingDetails: "Free daily generation credits; $20/mo Premium plan",
    instagramReelUrl: "https://www.instagram.com/thefutureguyy.ai/",
    instagramReelId: "C8oV_v0_vercel",
    reelThumbnail: "/assets/reels/v0-frontend-component-generator.svg",
    promptSet: [
      {
        id: "pmt-012",
        title: "SaaS Pricing Table with Annual Switch Prompt",
        description: "Design a modern, minimalist 3-tier SaaS pricing table (Hobby, Pro, Enterprise). Include an annual/monthly toggle with a 'Save 20%' badge, highlighted 'Most Popular' card with a subtle border, feature checklists, and accessible buttons using Tailwind CSS.",
        instructions: [
          "Visit v0.dev and enter the prompt into the generation input.",
          "Iterate by selecting specific elements in the visual canvas.",
          "Run `npx v0 add <id>` in your React/Next.js repo to import code directly."
        ],
        exampleOutput: "Ready-to-use React component with Lucide icons and clean Tailwind markup."
      }
    ],
    featured: true,
    trending: false,
    status: "published",
    publishedAt: "2026-10-26",
    seo: {
      title: "v0 by Vercel Component Generator Guide | @thefutureguyy.ai",
      description: "Convert ideas into Tailwind CSS and React components using v0 by Vercel."
    }
  },
  {
    id: "reel-013",
    slug: "gamma-ai-presentation-deck",
    title: "Generate Complete Presentation Slides in 30 Seconds with Gamma AI",
    toolName: "Gamma",
    toolUrl: "https://gamma.app/",
    description: "Create polished pitch decks, lecture slides, and project proposals with structured typography, cards, and diagrams directly from a single prompt.",
    category: "productivity",
    pricing: "freemium",
    pricingDetails: "400 free AI credits upon sign-up; Plus plan at $8/month",
    instagramReelUrl: "https://www.instagram.com/thefutureguyy.ai/",
    instagramReelId: "C8nG_gamma_slides",
    reelThumbnail: "/assets/reels/gamma-ai-presentation-deck.svg",
    promptSet: [
      {
        id: "pmt-013",
        title: "Investor Pitch Deck Structure Prompt",
        description: "Create an 8-slide seed-stage pitch deck for an AI developer platform. Cover: 1) The Problem, 2) The Solution, 3) Product Demo, 4) Market Size (TAM/SAM/SOM), 5) Business Model, 6) Competitive Advantage, 7) Traction, 8) Team and Ask.",
        instructions: [
          "Sign up at gamma.app and select 'Presentation'.",
          "Paste this outline into the prompt field.",
          "Pick a modern dark or editorial light theme and let Gamma build the visual deck."
        ],
        exampleOutput: "Exportable PPTX/PDF presentation with custom layout and diagrams."
      }
    ],
    featured: false,
    trending: true,
    status: "published",
    publishedAt: "2026-10-27",
    seo: {
      title: "Gamma AI Presentation & Slide Deck Tutorial | @thefutureguyy.ai",
      description: "Build beautiful slide decks and presentations in seconds with Gamma AI."
    }
  },
  {
    id: "reel-014",
    slug: "bolt-new-fullstack-ai",
    title: "Build & Deploy Fullstack Web Apps in Your Browser with Bolt.new",
    toolName: "Bolt.new",
    toolUrl: "https://bolt.new/",
    description: "Run fullstack Node.js environments inside your browser using WebContainers to generate, edit, run, and deploy full applications in minutes.",
    category: "coding",
    pricing: "freemium",
    pricingDetails: "Free tier with daily tokens; Pro plan with higher capacity",
    instagramReelUrl: "https://www.instagram.com/thefutureguyy.ai/",
    instagramReelId: "C8mB_bolt_new",
    reelThumbnail: "/assets/reels/bolt-new-fullstack-ai.svg",
    promptSet: [
      {
        id: "pmt-014",
        title: "Markdown Blog with Supabase Auth Prompt",
        description: "Build a complete fullstack React application using Vite and Tailwind CSS. Create an interactive Markdown notes app with local storage persistence, tag filtering, dark mode toggle, and responsive mobile navigation.",
        instructions: [
          "Navigate to bolt.new in your browser.",
          "Paste the specification prompt and watch the terminal install dependencies in WebContainer.",
          "Click Deploy to publish straight to Netlify with one click."
        ],
        exampleOutput: "Live fullstack web application running in your browser."
      }
    ],
    featured: true,
    trending: true,
    status: "published",
    publishedAt: "2026-10-28",
    seo: {
      title: "Bolt.new Browser Fullstack AI App Tutorial | @thefutureguyy.ai",
      description: "Create and deploy fullstack web apps in your browser with Bolt.new."
    }
  },
  {
    id: "reel-015",
    slug: "codeium-free-copilot-alternative",
    title: "100% Free GitHub Copilot Alternative: Codeium Setup Guide",
    toolName: "Codeium",
    toolUrl: "https://codeium.com/",
    description: "Fast AI autocomplete, in-editor chat, and multi-line code generation supporting over 70 programming languages for individual developers for free.",
    category: "coding",
    pricing: "free",
    pricingDetails: "100% free for individual developers forever",
    instagramReelUrl: "https://www.instagram.com/thefutureguyy.ai/",
    instagramReelId: "C8lC_codeium_free",
    reelThumbnail: "/assets/reels/codeium-free-copilot-alternative.svg",
    promptSet: [
      {
        id: "pmt-015",
        title: "Automated Express.js Test Suite Prompt",
        description: "Generate a complete Jest & Supertest test suite for this REST endpoint. Cover happy path, 400 invalid schema payload, 401 unauthorized token, and 500 database timeout edge cases.",
        instructions: [
          "Install Codeium extension in VS Code, JetBrains, or Neovim.",
          "Open Codeium Chat with Ctrl+Shift+A (or Cmd+Shift+A).",
          "Paste the prompt alongside your route handler to generate tests."
        ],
        exampleOutput: "Clean, robust unit and integration test suite."
      }
    ],
    featured: false,
    trending: false,
    status: "published",
    publishedAt: "2026-10-29",
    seo: {
      title: "Codeium Free AI Copilot Setup Guide | @thefutureguyy.ai",
      description: "Why Codeium is the best free alternative to GitHub Copilot for developers."
    }
  },
  {
    id: "reel-016",
    slug: "ollama-run-local-llms",
    title: "Run DeepSeek & Llama 3 Offline on Your Laptop with Ollama",
    toolName: "Ollama",
    toolUrl: "https://ollama.com/",
    description: "How to set up and run state-of-the-art open-source LLMs locally on macOS, Windows, and Linux with zero API costs and 100% data privacy.",
    category: "coding",
    pricing: "free",
    pricingDetails: "Completely free open-source software",
    instagramReelUrl: "https://www.instagram.com/thefutureguyy.ai/",
    instagramReelId: "C8kO_ollama_local",
    reelThumbnail: "/assets/reels/ollama-run-local-llms.svg",
    promptSet: [
      {
        id: "pmt-016",
        title: "Local Code Reviewer Modelfile Configuration",
        description: "FROM llama3.2:latest\nPARAMETER temperature 0.1\nSYSTEM \"\"\"\nYou are a private offline code reviewer. Flag security flaws, memory leaks, and performance bottlenecks without sharing data externally.\n\"\"\"",
        instructions: [
          "Download Ollama from ollama.com and install on your machine.",
          "Save this Modelfile and run `ollama create code-reviewer -f Modelfile`.",
          "Query locally with `ollama run code-reviewer`."
        ],
        exampleOutput: "Instant offline code analysis with zero latency and zero data leakage."
      }
    ],
    featured: true,
    trending: true,
    status: "published",
    publishedAt: "2026-10-30",
    seo: {
      title: "Run Local LLMs Offline with Ollama Tutorial | @thefutureguyy.ai",
      description: "How to run Llama 3 and DeepSeek locally on your laptop with Ollama."
    }
  },
  {
    id: "reel-017",
    slug: "deepseek-r1-open-reasoning",
    title: "DeepSeek R1 Architecture & How to Use It for Free",
    toolName: "DeepSeek",
    toolUrl: "https://chat.deepseek.com/",
    description: "Deep dive into DeepSeek R1's reasoning capability, benchmarking against commercial frontier models, and free access methods.",
    category: "research",
    pricing: "free",
    pricingDetails: "Free web chat & open weights available on Hugging Face",
    instagramReelUrl: "https://www.instagram.com/thefutureguyy.ai/",
    instagramReelId: "C8jD_deepseek_r1",
    reelThumbnail: "/assets/reels/deepseek-r1-open-reasoning.svg",
    promptSet: [
      {
        id: "pmt-017",
        title: "Multi-Step Mathematical & Logic Verification Prompt",
        description: "Solve this algorithmic challenge step-by-step. Expose your full chain of thought, rigorously examine boundary edge cases (n=0, negative inputs, large arrays), and provide optimal time/space complexity analysis.",
        instructions: [
          "Open chat.deepseek.com and enable 'DeepThink (R1)'.",
          "Paste your hardest coding or math problem.",
          "Inspect the collapsible thinking process before the final verified answer."
        ],
        exampleOutput: "Verified algorithmic proof and implementation with step-by-step reasoning."
      }
    ],
    featured: true,
    trending: true,
    status: "published",
    publishedAt: "2026-10-31",
    seo: {
      title: "DeepSeek R1 Free Reasoning Model Breakdown | @thefutureguyy.ai",
      description: "How to use DeepSeek R1 for free for advanced reasoning, coding, and math."
    }
  },
  {
    id: "reel-018",
    slug: "notebooklm-audio-podcast",
    title: "Turn Any PDF or Textbook into an AI Audio Podcast with NotebookLM",
    toolName: "NotebookLM",
    toolUrl: "https://notebooklm.google.com/",
    description: "Upload research papers, lecture notes, or company handbooks to generate natural 2-host audio discussions explaining every concept.",
    category: "productivity",
    pricing: "free",
    pricingDetails: "Free tool by Google Labs",
    instagramReelUrl: "https://www.instagram.com/thefutureguyy.ai/",
    instagramReelId: "C8iN_notebooklm_podcast",
    reelThumbnail: "/assets/reels/notebooklm-audio-podcast.svg",
    promptSet: [
      {
        id: "pmt-018",
        title: "Audio Overview Focus Direction Prompt",
        description: "Focus the Deep Dive audio discussion on practical implementation hurdles and real-world trade-offs. Have the hosts challenge conventional wisdom and explain the technical architecture using relatable everyday analogies.",
        instructions: [
          "Upload your PDF, Google Doc, or web links to notebooklm.google.com.",
          "Under Studio, click Customize Audio Overview.",
          "Paste this direction prompt and generate your personalized audio podcast."
        ],
        exampleOutput: "Natural 10-minute 2-host conversational podcast dissecting the material."
      }
    ],
    featured: true,
    trending: false,
    status: "published",
    publishedAt: "2026-11-01",
    seo: {
      title: "NotebookLM Audio Overview Tutorial | @thefutureguyy.ai",
      description: "Turn documents and books into engaging AI podcasts with Google NotebookLM."
    }
  },
  {
    id: "reel-019",
    slug: "supabase-vector-ai-embeddings",
    title: "Build Vector Search & Semantic Memory in PostgreSQL with Supabase",
    toolName: "Supabase Vector",
    toolUrl: "https://supabase.com/modules/vector",
    description: "Implement pgvector in Supabase to store OpenAI and open-source embeddings, query nearest neighbors, and power semantic search in your apps.",
    category: "coding",
    pricing: "freemium",
    pricingDetails: "Generous free tier with 500MB database storage and pgvector extension",
    instagramReelUrl: "https://www.instagram.com/thefutureguyy.ai/",
    instagramReelId: "C8hS_supabase_vector",
    reelThumbnail: "/assets/reels/supabase-vector-ai-embeddings.svg",
    promptSet: [
      {
        id: "pmt-019",
        title: "pgvector Cosine Similarity Match SQL Function",
        description: "CREATE OR REPLACE FUNCTION match_documents (\n  query_embedding vector(1536),\n  match_threshold float,\n  match_count int\n)\nRETURNS TABLE (id bigint, content text, similarity float)\nLANGUAGE sql STABLE\nAS $$\n  SELECT id, content, 1 - (documents.embedding <=> query_embedding) AS similarity\n  FROM documents\n  WHERE 1 - (documents.embedding <=> query_embedding) > match_threshold\n  ORDER BY similarity DESC\n  LIMIT match_count;\n$$;",
        instructions: [
          "Enable the `vector` extension in your Supabase SQL Editor.",
          "Execute this query to create the cosine similarity search function.",
          "Call directly from your client SDK using `supabase.rpc('match_documents', ...)`."
        ],
        exampleOutput: "High-speed semantic search results ordered by cosine similarity."
      }
    ],
    featured: false,
    trending: false,
    status: "published",
    publishedAt: "2026-11-01",
    seo: {
      title: "Supabase Vector & pgvector Semantic Search Tutorial | @thefutureguyy.ai",
      description: "Build semantic search and AI memory using pgvector and Supabase."
    }
  },
  {
    id: "reel-020",
    slug: "whisper-ai-transcription-workflow",
    title: "Automate Accurate Video Subtitles & Transcripts with Whisper AI",
    toolName: "OpenAI Whisper",
    toolUrl: "https://github.com/openai/whisper",
    description: "How content creators and developers generate synchronized SRT/VTT captions from audio and video files with multilingual support.",
    category: "audio-voice",
    pricing: "free",
    pricingDetails: "Free open-source model; also available via cheap API endpoints",
    instagramReelUrl: "https://www.instagram.com/thefutureguyy.ai/",
    instagramReelId: "C8gW_whisper_subtitles",
    reelThumbnail: "/assets/reels/whisper-ai-transcription-workflow.svg",
    promptSet: [
      {
        id: "pmt-020",
        title: "Fast Whisper CLI Caption Generation Command",
        description: "whisper input_video.mp4 --model medium --language en --output_format srt --word_timestamps True",
        instructions: [
          "Install Whisper via pip: `pip install -U openai-whisper`.",
          "Ensure ffmpeg is installed on your operating system.",
          "Run the command in your terminal to export accurate timestamped subtitles."
        ],
        exampleOutput: "Accurate .srt subtitle file with timestamps matched to speech."
      }
    ],
    featured: false,
    trending: false,
    status: "published",
    publishedAt: "2026-11-01",
    seo: {
      title: "Whisper AI Automated Subtitles Guide | @thefutureguyy.ai",
      description: "Create video subtitles and transcripts with OpenAI Whisper open-source."
    }
  },
  {
    id: "reel-021",
    slug: "midjourney-v6-product-photography",
    title: "Studio-Quality Product Photography with Midjourney v6",
    toolName: "Midjourney",
    toolUrl: "https://midjourney.com/",
    description: "Generate e-commerce, tech gadget, and editorial product photography with studio softbox lighting and clean minimalist backgrounds.",
    category: "image-generation",
    pricing: "paid",
    pricingDetails: "Starts at $10/month for Basic plan",
    instagramReelUrl: "https://www.instagram.com/thefutureguyy.ai/",
    instagramReelId: "C8fM_midjourney_product",
    reelThumbnail: "/assets/reels/midjourney-v6-product-photography.svg",
    promptSet: [
      {
        id: "pmt-021",
        title: "Minimalist Apple-Style Hardware Product Prompt",
        description: "Commercial studio product photography of a sleek titanium smart device on a matte concrete pedestal, clean diffuse softbox lighting from the left, subtle geometric shadows, shallow depth of field, 85mm lens at f/2.8, neutral studio grey background --ar 16:9 --style raw",
        instructions: [
          "Open Midjourney in Discord or via web interface at midjourney.com.",
          "Use the `/imagine` command and paste the prompt.",
          "Iterate using subtle variations (V1-V4) to dial in your preferred angle."
        ],
        exampleOutput: "Studio-grade product mockup suitable for commercial landing pages."
      }
    ],
    featured: false,
    trending: false,
    status: "published",
    publishedAt: "2026-11-02",
    seo: {
      title: "Midjourney v6 Product Photography Prompts | @thefutureguyy.ai",
      description: "Generate clean, high-converting product photos with Midjourney v6."
    }
  },
  {
    id: "reel-022",
    slug: "manus-ai-autonomous-agent",
    title: "Manus AI & The Rise of Fully Autonomous General Web Agents",
    toolName: "Manus AI",
    toolUrl: "", // Left blank for user to add official link
    description: "Exploring autonomous web agents that can navigate complex browsers, book flights, conduct multi-page research, and generate reports without human intervention.",
    category: "automation",
    pricing: "freemium",
    pricingDetails: "Invite-only early access preview",
    instagramReelUrl: "https://www.instagram.com/thefutureguyy.ai/",
    instagramReelId: "C8eM_manus_agent",
    reelThumbnail: "/assets/reels/manus-ai-autonomous-agent.svg",
    promptSet: [
      {
        id: "pmt-022",
        title: "Autonomous Web Agent Goal Instruction",
        description: "", // Left blank for user to customize
        instructions: [
          "Define the high-level objective with strict boundary parameters.",
          "Specify the desired output format (e.g., CSV, Notion table, PDF summary).",
          "Review agent browser execution logs before confirming external actions."
        ],
        exampleOutput: "End-to-end autonomous research dossier compiled from live web pages."
      }
    ],
    featured: true,
    trending: true,
    status: "published",
    publishedAt: "2026-11-02",
    seo: {
      title: "Manus AI Autonomous Agent Overview | @thefutureguyy.ai",
      description: "How Manus AI and autonomous web agents are changing digital task execution."
    }
  },
  {
    id: "reel-023",
    slug: "top-10-free-ai-tools-students",
    title: "Top 10 Free AI Tools Every College Student Needs in 2025",
    toolName: "Student AI Suite",
    toolUrl: "", // Left blank for user to customize
    description: "A curated carousel breakdown of the top 10 completely free AI tools for students for research, coding, writing, presentation slides, and exams.",
    category: "productivity",
    pricing: "free",
    pricingDetails: "All tools have verified free tiers for university students",
    instagramReelUrl: "https://www.instagram.com/thefutureguyy.ai/",
    instagramReelId: "C8dS_top10_student_tools",
    reelThumbnail: "/assets/reels/top-10-free-ai-tools-students.svg",
    promptSet: [
      {
        id: "pmt-023",
        title: "Critical Essay Counter-Argument Generator",
        description: "", // Left blank for user to customize
        instructions: [
          "Enter your thesis statement into your preferred AI research tool.",
          "Request 3 strong empirical counter-arguments and scholarly objections.",
          "Incorporate rebuttals to strengthen your academic paper's rigor."
        ],
        exampleOutput: "Detailed scholarly objections with supporting citation angles."
      }
    ],
    featured: true,
    trending: true,
    status: "published",
    publishedAt: "2026-11-02",
    seo: {
      title: "Top 10 Free AI Tools for Students (2025 Guide) | @thefutureguyy.ai",
      description: "Best free AI tools for college students for research, notes, and productivity."
    }
  },
  {
    id: "reel-024",
    slug: "instagram-viral-ai-hook-formula",
    title: "The Viral AI Hook & Script Framework for Instagram Reels",
    toolName: "Creator Script Engine",
    toolUrl: "", // Left blank for user to add
    description: "The exact 3-second hook structure, problem-solution pacing, and call-to-action formula used to grow @thefutureguyy.ai to over 21,000 followers.",
    category: "ai-writing",
    pricing: "free",
    pricingDetails: "Framework shared free on @thefutureguyy.ai",
    instagramReelUrl: "https://www.instagram.com/thefutureguyy.ai/",
    instagramReelId: "C8cI_viral_hook_formula",
    reelThumbnail: "/assets/reels/instagram-viral-ai-hook-formula.svg",
    promptSet: [
      {
        id: "pmt-024",
        title: "High-Retention 45-Second Tech Reel Script",
        description: "", // Left blank for user to add exact prompt
        instructions: [
          "Hook (0-3s): State a bold contrarian claim or unveil an unknown tool.",
          "Agitate (3-15s): Demonstrate the painful conventional way people waste time.",
          "Solution (15-35s): Show the screen recording with fast cuts and bold subtitles.",
          "CTA (35-45s): Ask viewers to comment a specific keyword for the direct link."
        ],
        exampleOutput: "Full 45-second script with visual storyboard cues."
      }
    ],
    featured: true,
    trending: true,
    status: "published",
    publishedAt: "2026-11-02",
    seo: {
      title: "Viral Instagram Reel Hook & Script Formula | @thefutureguyy.ai",
      description: "The exact reel script formula used to grow @thefutureguyy.ai to 21K+ followers."
    }
  },
  {
    id: "reel-025",
    slug: "langgraph-multi-agent-orchestration",
    title: "Build Stateful Multi-Agent Applications with LangGraph",
    toolName: "LangGraph",
    toolUrl: "https://www.langchain.com/langgraph",
    description: "How to design cyclical agent graphs with memory, human-in-the-loop validation, and persistent state for enterprise AI systems.",
    category: "coding",
    pricing: "free",
    pricingDetails: "Open-source Python and JavaScript library",
    instagramReelUrl: "https://www.instagram.com/thefutureguyy.ai/",
    instagramReelId: "C8bL_langgraph_flows",
    reelThumbnail: "/assets/reels/langgraph-multi-agent-orchestration.svg",
    promptSet: [
      {
        id: "pmt-025",
        title: "StateGraph Cyclic Routing Agent Definition",
        description: "from langgraph.graph import StateGraph, END\n\nworkflow = StateGraph(AgentState)\nworkflow.add_node(\"researcher\", call_researcher)\nworkflow.add_node(\"reviewer\", call_reviewer)\nworkflow.add_conditional_edges(\n  \"reviewer\",\n  should_continue,\n  {\"retry\": \"researcher\", \"finish\": END}\n)",
        instructions: [
          "Install via pip: `pip install -U langgraph langchain-openai`.",
          "Define your state schema and graph node functions.",
          "Compile with `app = workflow.compile()`."
        ],
        exampleOutput: "Stateful agent execution with automatic cyclic retries."
      }
    ],
    featured: false,
    trending: false,
    status: "published",
    publishedAt: "2026-11-03",
    seo: {
      title: "LangGraph Multi-Agent Architecture Guide | @thefutureguyy.ai",
      description: "Build production-grade cyclic agent workflows with LangGraph and Python."
    }
  }
];

// 3. Write each reel to its own JSON file in src/data/reels/
for (const reel of reelsData) {
  const filePath = path.join(reelsDir, `${reel.slug}.json`);
  fs.writeFileSync(filePath, JSON.stringify(reel, null, 2), 'utf8');
  console.log(`Generated reel JSON: src/data/reels/${reel.slug}.json`);
}

// 4. Generate beautiful, professional SVG thumbnails in public/assets/reels/
function generateThumbnailSvg(reel) {
  const categoryLabels = {
    coding: "DEVELOPER WORKFLOW",
    "ai-writing": "PROMPT BLUEPRINT",
    "image-generation": "CREATIVE AI",
    "video-generation": "VIDEO WORKFLOW",
    productivity: "STUDENT & PRO TOOL",
    research: "DEEP RESEARCH",
    automation: "AGENT AUTOMATION",
    design: "GENERATIVE UI",
    "audio-voice": "AUDIO & VOICE"
  };

  const catLabel = categoryLabels[reel.category] || "AI GUIDE";

  // Escape special chars for XML
  const safeTitle = reel.title
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  
  const safeToolName = reel.toolName
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Split title into two lines for readability if needed
  const words = safeTitle.split(' ');
  const midpoint = Math.ceil(words.length / 2);
  const titleLine1 = words.slice(0, midpoint).join(' ');
  const titleLine2 = words.slice(midpoint).join(' ');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 750" width="600" height="750">
  <defs>
    <radialGradient id="bgGrad" cx="50%" cy="25%" r="70%" fx="50%" fy="15%">
      <stop offset="0%" stop-color="#1e2430" />
      <stop offset="60%" stop-color="#10131a" />
      <stop offset="100%" stop-color="#090b0e" />
    </radialGradient>
    <linearGradient id="brandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f59e0b" />
      <stop offset="100%" stop-color="#ea580c" />
    </linearGradient>
    <linearGradient id="accentLine" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.8" />
      <stop offset="100%" stop-color="#818cf8" stop-opacity="0.2" />
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="600" height="750" fill="url(#bgGrad)" />

  <!-- Subtle Grid Pattern -->
  <g opacity="0.04" stroke="#ffffff" stroke-width="1">
    <line x1="0" y1="125" x2="600" y2="125" />
    <line x1="0" y1="250" x2="600" y2="250" />
    <line x1="0" y1="375" x2="600" y2="375" />
    <line x1="0" y1="500" x2="600" y2="500" />
    <line x1="0" y1="625" x2="600" y2="625" />
    <line x1="150" y1="0" x2="150" y2="750" />
    <line x1="300" y1="0" x2="300" y2="750" />
    <line x1="450" y1="0" x2="450" y2="750" />
  </g>

  <!-- Top Bar: Channel Badge & Category -->
  <g transform="translate(48, 56)">
    <!-- Channel Pill -->
    <rect x="0" y="0" width="180" height="34" rx="17" fill="#ffffff" fill-opacity="0.08" stroke="#ffffff" stroke-opacity="0.12" stroke-width="1" />
    <circle cx="18" cy="17" r="5" fill="#f59e0b" />
    <text x="32" y="22" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="600" fill="#e2e8f0" letter-spacing="0.5">@thefutureguyy.ai</text>
  </g>

  <g transform="translate(552, 56)">
    <!-- Category Pill -->
    <text x="0" y="22" text-anchor="end" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700" fill="#94a3b8" letter-spacing="1.2">${catLabel}</text>
  </g>

  <!-- Center Decorative Card / Frame -->
  <g transform="translate(48, 140)">
    <rect width="504" height="420" rx="16" fill="#141822" fill-opacity="0.75" stroke="#ffffff" stroke-opacity="0.08" stroke-width="1" />
    <rect x="0" y="0" width="504" height="3" fill="url(#accentLine)" />

    <!-- Tool Name Watermark / Badge -->
    <g transform="translate(36, 44)">
      <rect width="130" height="28" rx="6" fill="#ffffff" fill-opacity="0.06" />
      <text x="14" y="19" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700" fill="#38bdf8" letter-spacing="0.5">${safeToolName.toUpperCase()}</text>
    </g>

    <!-- Pricing Model Badge -->
    <g transform="translate(420, 44)">
      <text x="0" y="19" text-anchor="end" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="600" fill="#10b981" letter-spacing="0.5">${reel.pricing.toUpperCase()}</text>
    </g>

    <!-- Main Title Lines -->
    <text x="36" y="130" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="28" font-weight="800" fill="#f8fafc" letter-spacing="-0.5">
      ${titleLine1}
    </text>
    <text x="36" y="172" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="28" font-weight="800" fill="#f8fafc" letter-spacing="-0.5">
      ${titleLine2}
    </text>

    <!-- Subtitle / Hook -->
    <foreignObject x="36" y="215" width="432" height="110">
      <p xmlns="http://www.w3.org/1999/xhtml" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; line-height: 1.5; color: #94a3b8; margin: 0;">
        ${reel.description.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}
      </p>
    </foreignObject>

    <!-- Prompt / Reel Feature Indicator -->
    <g transform="translate(36, 350)">
      <rect width="220" height="38" rx="8" fill="#ffffff" fill-opacity="0.05" stroke="#ffffff" stroke-opacity="0.1" stroke-width="1" />
      <!-- Instagram Play Icon -->
      <polygon points="18,13 18,25 28,19" fill="#f59e0b" />
      <text x="36" y="24" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="600" fill="#e2e8f0">Reel + Prompt Blueprint</text>
    </g>
  </g>

  <!-- Bottom Bar: Call to Action & Brand Stamp -->
  <g transform="translate(48, 620)">
    <line x1="0" y1="0" x2="504" y2="0" stroke="#ffffff" stroke-opacity="0.08" stroke-width="1" />
    
    <text x="0" y="42" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="700" fill="#f8fafc" letter-spacing="0.5">THE FUTURE GUY AI</text>
    <text x="0" y="62" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="500" fill="#64748b">thefutureguy.ai • Follow on Instagram</text>

    <!-- Instagram Icon / Follow badge on right -->
    <g transform="translate(504, 48)">
      <text x="0" y="0" text-anchor="end" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="600" fill="#f59e0b">Watch on Instagram →</text>
    </g>
  </g>
</svg>`;
}

for (const reel of reelsData) {
  const svgFilename = `${reel.slug}.svg`;
  const svgPath = path.join(assetsDir, svgFilename);
  fs.writeFileSync(svgPath, generateThumbnailSvg(reel), 'utf8');
  console.log(`Generated thumbnail SVG: public/assets/reels/${svgFilename}`);
}

// 5. Update src/data/collections.json to accurately link to our new reels and prompts
const updatedCollections = [
  {
    id: "col-001",
    slug: "best-free-ai-tools",
    title: "Best Free & Freemium AI Tools for 2026",
    description: "Hand-picked artificial intelligence tools you can use immediately without entering a credit card.",
    coverImage: "/assets/collections/free-tools.svg",
    toolIds: ["reel-001", "reel-002", "reel-003", "reel-015", "reel-016", "reel-017", "reel-018", "reel-023"],
    promptIds: ["pmt-001", "pmt-002", "pmt-003", "pmt-015", "pmt-016"],
    featured: true,
    status: "published",
    publishedAt: "2026-10-20",
    seo: {
      title: "Best Free AI Tools in 2026 (No Credit Card Required) | @thefutureguyy.ai",
      description: "Discover top free AI tools for writing, coding, search, and design. Hand-tested and verified free tiers."
    }
  },
  {
    id: "col-002",
    slug: "ai-tools-for-developers",
    title: "Essential AI Tools for Modern Developers",
    description: "The definitive toolkit for software engineers, frontend architects, and full-stack builders.",
    coverImage: "/assets/collections/developers.svg",
    toolIds: ["reel-001", "reel-002", "reel-005", "reel-006", "reel-007", "reel-014", "reel-016", "reel-019", "reel-025"],
    promptIds: ["pmt-001", "pmt-005", "pmt-006", "pmt-007", "pmt-014"],
    featured: true,
    status: "published",
    publishedAt: "2026-10-22",
    seo: {
      title: "Essential AI Tools for Developers (2026 Guide) | @thefutureguyy.ai",
      description: "Curated collection of the best AI code editors, CLI tools, and agent frameworks for modern engineers."
    }
  },
  {
    id: "col-003",
    slug: "instagram-creator-toolkit",
    title: "AI Creator Toolkit for Instagram & Video",
    description: "Everything creators need to write viral scripts, generate B-roll, clean podcast audio, and automate posting.",
    coverImage: "/assets/collections/creators.svg",
    toolIds: ["reel-010", "reel-011", "reel-013", "reel-020", "reel-021", "reel-024"],
    promptIds: ["pmt-010", "pmt-011", "pmt-013", "pmt-020", "pmt-024"],
    featured: true,
    status: "published",
    publishedAt: "2026-10-24",
    seo: {
      title: "AI Tools for Instagram & Video Creators | @thefutureguyy.ai",
      description: "Scale your short-form video content with AI voiceover, script generators, and photographic prompt formulas."
    }
  },
  {
    id: "col-004",
    slug: "high-converting-prompts",
    title: "High-Converting Problem-Solving & Coding Prompts",
    description: "Battle-tested prompts engineered for first-principles reasoning, deep research, and production code.",
    coverImage: "/assets/collections/copywriting.svg",
    toolIds: ["reel-006", "reel-007", "reel-008", "reel-009", "reel-017"],
    promptIds: ["pmt-006", "pmt-007", "pmt-008", "pmt-009", "pmt-017"],
    featured: false,
    status: "published",
    publishedAt: "2026-10-26",
    seo: {
      title: "First-Principles Problem Solving Prompts for ChatGPT & Claude",
      description: "Curated collection of reasoning and architectural prompts for ChatGPT, Claude, and DeepSeek."
    }
  },
  {
    id: "col-005",
    slug: "ai-tools-for-students",
    title: "AI Tools for Students & Academic Researchers",
    description: "Ethical research assistants, citation finders, and study summarizers that accelerate deep learning.",
    coverImage: "/assets/collections/students.svg",
    toolIds: ["reel-003", "reel-008", "reel-013", "reel-018", "reel-023"],
    promptIds: ["pmt-003", "pmt-008", "pmt-013", "pmt-018", "pmt-023"],
    featured: false,
    status: "published",
    publishedAt: "2026-10-27",
    seo: {
      title: "Best AI Tools for Students & Research (2026) | @thefutureguyy.ai",
      description: "Discover ethical and powerful AI tools for college students, thesis research, and study notes."
    }
  },
  {
    id: "col-006",
    slug: "generative-multimedia-suite",
    title: "Generative Media: Image, Video & Voice",
    description: "The ultimate state-of-the-art suite for generating commercial-grade visual and auditory assets.",
    coverImage: "/assets/collections/multimedia.svg",
    toolIds: ["reel-010", "reel-011", "reel-020", "reel-021"],
    promptIds: ["pmt-010", "pmt-011", "pmt-020", "pmt-021"],
    featured: false,
    status: "published",
    publishedAt: "2026-10-28",
    seo: {
      title: "Generative Media Suite: Flux.1, ElevenLabs, Whisper & Midjourney",
      description: "Explore the top generative AI tools for producing cinema-grade imagery, studio audio, and accurate captions."
    }
  }
];

fs.writeFileSync(collectionsFile, JSON.stringify(updatedCollections, null, 2), 'utf8');
console.log(`Updated collections file: ${collectionsFile}`);
console.log("All reel data and assets successfully generated!");
