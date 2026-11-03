import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const reelsDir = path.join(rootDir, 'src/data/reels');
const collectionsFile = path.join(rootDir, 'src/data/collections.json');

// Path to uploaded original dataset
const uploadedPath = 'C:/Users/Shyamal/.gemini/antigravity/brain/909f2b05-f45c-4431-bead-d76be13a88b0/.user_uploaded/media_1793690073301_5e99929d.json';

let rawData = [];
if (fs.existsSync(uploadedPath)) {
  rawData = JSON.parse(fs.readFileSync(uploadedPath, 'utf8'));
} else {
  const p1 = JSON.parse(fs.readFileSync(path.join(rootDir, 'scripts/raw-posts-part1.json')));
  const p2 = JSON.parse(fs.readFileSync(path.join(rootDir, 'scripts/raw-posts-part2.json')));
  const p3 = JSON.parse(fs.readFileSync(path.join(rootDir, 'scripts/raw-posts-part3.json')));
  rawData = [...p1, ...p2, ...p3];
}

console.log(`Loaded ${rawData.length} posts from dataset.`);

// Ensure directory exists and clean old files
if (!fs.existsSync(reelsDir)) {
  fs.mkdirSync(reelsDir, { recursive: true });
}
const oldFiles = fs.readdirSync(reelsDir);
for (const file of oldFiles) {
  if (file.endsWith('.json')) {
    fs.unlinkSync(path.join(reelsDir, file));
  }
}
console.log(`Cleaned ${oldFiles.length} old files from src/data/reels/`);

// Full 90 curated entries mapping exactly to each Instagram post shortcode
const postMetaCatalog = [
  {
    shortcode: 'DfMTJ59GaT1',
    slug: 'chatgpt-ai-studio-photoshoot',
    toolName: 'ChatGPT AI Studio Photoshoot',
    title: 'Editorial Portrait & Studio Photoshoot Prompts for ChatGPT',
    category: 'image-generation',
    pricing: 'freemium',
    pricingDetails: 'Free tier with daily GPT-4o image generation',
    toolUrl: 'https://chatgpt.com/',
    description: 'Transform everyday mobile photos into studio-grade editorial portraits using ChatGPT image generation. Master realistic lighting formulas, film textures, and natural poses without high-end camera gear.',
    promptTitle: 'Editorial Studio Portrait Generator',
    promptText: 'Hyperrealistic editorial fashion portrait of a subject, shot on Hasselblad H6D-100c with 85mm f/1.4 lens. Soft diffused Profoto studio lighting from a 45-degree angle, subtle rim lighting, natural skin texture with visible pores, elegant neutral studio backdrop, cinematic depth of field, 8k resolution, raw photo aesthetic.',
    instructions: [
      'Open ChatGPT and select the latest GPT-4o / Images model.',
      'Upload a clear reference photo of your subject or describe the subject in detail.',
      'Paste this prompt, adjust the lighting preference or wardrobe, and generate your high-res portrait.'
    ],
    exampleOutput: 'A clean, high-fashion portrait with soft Rembrandt lighting, natural catchlights in the eyes, and lifelike skin tones.'
  },
  {
    shortcode: 'DandSxNmatl',
    slug: 'openai-gpt-5-6-sol-terra-luna',
    toolName: 'OpenAI GPT-5.6 (Sol, Terra, Luna)',
    title: 'OpenAI GPT-5.6 Architecture: Sol, Terra & Luna Multi-Tier Models',
    category: 'coding',
    pricing: 'freemium',
    pricingDetails: 'Free access via ChatGPT, tiered usage for high compute',
    toolUrl: 'https://openai.com/',
    description: 'OpenAI introduces the GPT-5.6 three-tier model family: Sol for frontier coding and reasoning (scoring 91.9% on TerminalBench), Terra as the balanced daily driver, and Luna for ultra-fast, cost-effective high-volume tasks.',
    promptTitle: 'TerminalBench Frontier Code Architect',
    promptText: 'Act as a principal software engineer. Analyze the following full-stack architecture for performance bottlenecks, concurrency race conditions, and memory leaks. Provide refactored code with strict TypeScript types, unit tests, and asymptotic complexity analysis.',
    instructions: [
      'Select GPT-5.6 Sol or o3-mini in your OpenAI workspace.',
      'Provide your full repository directory structure and target code file.',
      'Execute the reasoning pass and review the architectural breakdown.'
    ],
    exampleOutput: 'Step-by-step diagnostic breakdown with fixed race condition and production-ready async mutex implementation.'
  },
  {
    shortcode: 'DfQv_b6lEa3',
    slug: 'google-ai-studio-creative-suite',
    toolName: 'Google AI Studio & 9 Creative Tools',
    title: '9 Groundbreaking Google AI Tools for Creators and Developers',
    category: 'productivity',
    pricing: 'free',
    pricingDetails: 'Free developer tier on Google AI Studio with high rate limits',
    toolUrl: 'https://aistudio.google.com/',
    description: 'A comprehensive breakdown of Google\'s 9 newest AI utilities: Gemini Notebook for deep PDF analysis, Google AI Studio for instant app prototyping, Stitch UI generator, Flow video studio, Flow Music, and Pomelli branded design tools.',
    promptTitle: 'Google AI Studio Full-Stack Scaffolder',
    promptText: 'Build a production-ready React 18 dashboard using Tailwind CSS and Lucide icons. Implement a responsive sidebar, searchable data table with client-side sorting, and real-time metric cards. Return the complete code in a single standalone file.',
    instructions: [
      'Navigate to Google AI Studio at aistudio.google.com.',
      'Select Gemini 2.5 Flash or Pro with system prompt capabilities.',
      'Enter the prompt to generate functional, production-ready frontend components.'
    ],
    exampleOutput: 'Fully structured React component code ready to copy-paste into your project.'
  },
  {
    shortcode: 'DcGoQE4h2H-',
    slug: 'claude-watermark-remover',
    toolName: 'Claude Watermark Remover',
    title: 'How to Remove the Claude Artifact Watermark for Clean Exports',
    category: 'design',
    pricing: 'free',
    pricingDetails: '100% free browser tweak',
    toolUrl: 'https://claude.ai/',
    description: 'A simple, non-destructive browser inspector trick to remove the default Claude artifact badge and watermark for clean client presentations, portfolio screenshots, and UI mockups.',
    promptTitle: 'Clean Artifact UI Injector',
    promptText: 'Generate a polished single-page landing page mockup for a modern SaaS product. Omit all external branding badges, default footers, and decorative framework watermarks.',
    instructions: [
      'Open your Claude artifact view in your browser.',
      'Right click the artifact canvas and inspect the watermark container element.',
      'Apply custom CSS or display:none for clean full-bleed exports.'
    ],
    exampleOutput: 'Watermark-free, pristine vector canvas ready for high-resolution client presentation.'
  },
  {
    shortcode: 'DceBGfGuG6A',
    slug: 'ai-creator-monetization-stack',
    toolName: 'AI Creator Monetization Stack',
    title: 'How to Monetize AI Skills and Automated Digital Products in 2026',
    category: 'productivity',
    pricing: 'free',
    pricingDetails: 'Free setup guide with zero upfront software costs',
    toolUrl: 'https://superprofile.bio/',
    description: 'You don\'t need a huge team or complex infrastructure to earn online with AI. Learn the high-converting toolkit to package prompts, workflow templates, and micro-SaaS automations for digital customers.',
    promptTitle: 'Digital Product Idea Validator & Offer Pitch',
    promptText: 'Analyze my target audience of freelance designers. Formulate 3 high-perceived-value digital templates I can build with AI tools (e.g. prompt sets, workflow blueprints). For each, write a compelling value proposition and landing page headline.',
    instructions: [
      'Define your specific professional niche and skillset.',
      'Run this prompt in ChatGPT or Claude to extract high-demand product offers.',
      'Host the digital download on a lightweight bio link storefront.'
    ],
    exampleOutput: 'Three structured digital product proposals complete with pricing tiers and marketing hooks.'
  },
  {
    shortcode: 'DfPYncppZ_p',
    slug: 'anthropic-replacing-git',
    toolName: 'Anthropic Agentic Version Control',
    title: 'Why Anthropic Replaced Git to Handle 30,000 Daily AI Pull Requests',
    category: 'coding',
    pricing: 'free',
    pricingDetails: 'Open technical architecture breakdown',
    toolUrl: 'https://anthropic.com/',
    description: 'When Anthropic scaled their autonomous coding agents from 2,500 to 30,000 PRs per day, traditional Git choked under network spikes and storage limits. Discover the 7-engineer custom distributed storage system that replaced it.',
    promptTitle: 'Autonomous Multi-Agent PR Reviewer',
    promptText: 'Act as an autonomous Git reviewer agent. Parse the following git diff, identify breaking changes, test coverage deficits, and security vulnerabilities. Format the response as a GitHub PR review markdown with clear pass/fail status.',
    instructions: [
      'Provide your Git diff or pull request changes.',
      'Run the prompt through Claude Code or your agent terminal.',
      'Review automated line-by-line recommendations and test coverage gaps.'
    ],
    exampleOutput: 'Markdown formatted PR review identifying 2 potential null pointer exceptions with proposed patch code.'
  },
  {
    shortcode: 'DfHipA4PH0S',
    slug: 'open-source-ai-tools-directory',
    toolName: 'Free Open Source AI Alternatives',
    title: 'Zero-Budget AI: Free Open Source Replacements for Paid Subscriptions',
    category: 'productivity',
    pricing: 'free',
    pricingDetails: '100% Free & Open Source',
    toolUrl: '',
    description: 'Cut monthly AI subscription bills without sacrificing quality. Discover vetted, self-hostable and free cloud open-source tools for AI image generation, vector search, code completion, and voice synthesis.',
    promptTitle: 'Subscription Cost Audit & Open-Source Finder',
    promptText: 'I currently spend money on Midjourney, Grammarly, and GitHub Copilot. List the top open-source, locally runnable or free hosted alternatives for each, including hardware requirements and setup links.',
    instructions: [
      'List the paid AI services you currently use.',
      'Input the prompt to get vetted FOSS alternatives with zero license fees.',
      'Install the recommended open-source models using Ollama or HuggingFace.'
    ],
    exampleOutput: 'Comprehensive table comparing FLUX.1 Schell, Llama 3.3, and Continue.dev against paid equivalents.'
  },
  {
    shortcode: 'DcTn5SIwlid',
    slug: 'taste-skill-anti-slop-frontend',
    toolName: 'Taste Skill: Anti-Slop Frontend Engine',
    title: 'Stop Generic AI Websites: The Taste Skill Anti-Slop Design Guide',
    category: 'design',
    pricing: 'free',
    pricingDetails: 'Open Source Skill for AI Coding Agents',
    toolUrl: 'https://github.com/Leonxlnx/taste-skill',
    description: 'Tired of identical purple gradients, floating cards, and AI slop? The Taste Skill frontend art direction system installs in one command and enforces award-level typography, strict contrast, and authentic editorial composition.',
    promptTitle: 'Anti-Slop Modern Landing Page Prompt',
    promptText: 'Design a high-craft landing page for a developer tool. Follow strict anti-slop rules: warm neutral off-white canvas, near-black charcoal type, zero saturated primary buttons, mono typography for technical labels, and zero generic 3-column feature cards.',
    instructions: [
      'Install the taste skill via npx skills add https://github.com/Leonxlnx/taste-skill --skill "design-taste-frontend".',
      'Invoke the skill before generating any React or Tailwind components.',
      'Run npm run lint:taste to guarantee 0 FAIL and 0 WARN compliance.'
    ],
    exampleOutput: 'A gorgeous, bespoke editorial webpage with 75:1 contrast ratio and custom typography.'
  },
  {
    shortcode: 'DfMrhW-ovaz',
    slug: 'google-antigravity-free-student-access',
    toolName: 'Google Antigravity Student Suite',
    title: 'Students Get Free Google Antigravity & Gemini 4 Argon Access',
    category: 'coding',
    pricing: 'free',
    pricingDetails: 'Free for verified students & educational emails',
    toolUrl: 'https://antigravity.google/',
    description: 'Google is opening the doors to its state-of-the-art Antigravity AI agent platform with free access for students. Unlock Gemini 4 Argon, multi-agent workflows, browser automation, and terminal dev tools without paying a cent.',
    promptTitle: 'Google Antigravity CLI Autonomous Task Runner',
    promptText: 'Configure an Antigravity agent workflow to clone a GitHub repo, inspect the project structure, locate all outdated dependencies in package.json, run security audits, and generate an update checklist.',
    instructions: [
      'Verify your student email address on the Google educational portal.',
      'Install the Antigravity CLI on your machine.',
      'Connect Gemini 4 Argon and run automated workflows directly in your terminal.'
    ],
    exampleOutput: 'Terminal execution log showing automated dependency audit and generated upgrade report.'
  },
  {
    shortcode: 'DfKJ8jZBTwk',
    slug: 'tech-oa-interview-questions-repo',
    toolName: 'Tech OA & Interview Questions Master Repo',
    title: '483+ Companies Tech OA and Coding Interview Questions (GitHub)',
    category: 'coding',
    pricing: 'free',
    pricingDetails: '100% Free Open Source GitHub Repo',
    toolUrl: 'https://github.com/',
    description: 'Ace your campus placement and lateral hiring rounds. This viral open-source GitHub repository aggregates real, verified 2026-2027 Online Assessment (OA) coding problems, SQL queries, and system design questions from 483+ top tech firms.',
    promptTitle: 'OA Technical Problem Solver & Edge-Case Analyzer',
    promptText: 'Here is a recent online assessment coding question from a top tech company. Provide the optimal solution in C++/Python, analyze time and space complexity, and list 5 edge cases that standard test suites use to fail submissions.',
    instructions: [
      'Find the company-specific question from the master GitHub repository.',
      'Paste the problem statement and constraints into your AI model with this prompt.',
      'Review the optimal dynamic programming or graph algorithm with edge cases.'
    ],
    exampleOutput: 'Optimal O(N log N) solution with memory-efficient sliding window and detailed corner case coverage.'
  },
  {
    shortcode: 'DcJKpvfzUQX',
    slug: 'anydoc-pdf-to-markdown-converter',
    toolName: 'AnyDoc: PDF to Clean Markdown Parser',
    title: 'Stop Feeding Raw PDFs to AI: AnyDoc Markdown Converter',
    category: 'productivity',
    pricing: 'free',
    pricingDetails: 'Free open source utility',
    toolUrl: 'https://github.com/',
    description: 'Raw PDFs result in messy OCR errors, broken tables, and lost formatting when fed to LLMs. AnyDoc converts 14+ document formats into pristine Markdown, preserving tables, charts, financial sheets, and nested hierarchies.',
    promptTitle: 'Financial Table & PDF Markdown Extractor',
    promptText: 'Parse this financial PDF extract into clean GitHub Flavored Markdown. Ensure all multi-column balance sheets and footnotes are preserved in readable markdown tables with exact decimal precision.',
    instructions: [
      'Run AnyDoc on your target PDF file: anydoc convert input.pdf --format markdown.',
      'Open the generated .md file and inspect the table formatting.',
      'Feed the clean markdown context into Claude or ChatGPT for hallucination-free analysis.'
    ],
    exampleOutput: 'Perfect GFM Markdown table with exact column alignment and parsed financial indicators.'
  },
  {
    shortcode: 'DanDYlKupXL',
    slug: 'doom-scrolling-to-upskilling-roadmap',
    toolName: 'From Doom Scrolling to Up-Skilling AI Roadmap',
    title: 'The 30-Day Transition from Doom Scrolling to AI Upskilling',
    category: 'productivity',
    pricing: 'free',
    pricingDetails: 'Free educational roadmap & broadcast resources',
    toolUrl: '',
    description: 'Stop letting algorithmic feeds drain your daily focus. Replace 1 hour of mindless doom scrolling with high-leverage AI workflows, prompt architecture, and practical coding skills to build real career momentum.',
    promptTitle: 'Daily 45-Minute AI Skill Accelerator Plan',
    promptText: 'Design a personalized 30-day learning curriculum to master AI tools for a non-technical professional. Limit each day to 45 minutes of hands-on project work. Focus on practical tools: ChatGPT, Claude, and automation.',
    instructions: [
      'Set your target career goal (e.g. freelance copywriter, product manager, coder).',
      'Generate your daily 45-minute structured sprint using this prompt.',
      'Track your daily project outputs and build a public portfolio.'
    ],
    exampleOutput: 'Day-by-day 4-week roadmap with clear 45-minute daily deliverables.'
  },
  {
    shortcode: 'DaAfo00mQtq',
    slug: 'linkedin-profile-picture-prompts-part-2',
    toolName: 'LinkedIn Profile Picture Prompts Part 2',
    title: 'Studio Headshot AI Prompts for LinkedIn & Professional Profiles',
    category: 'image-generation',
    pricing: 'free',
    pricingDetails: 'Free prompt templates for Gemini & Nano Banana',
    toolUrl: 'https://gemini.google.com/',
    description: 'Generate hyperrealistic, executive-tier LinkedIn headshots without a studio photographer. Detailed prompt formulas featuring balanced corporate lighting, soft depth of field, and natural skin textures.',
    promptTitle: 'Corporate Executive LinkedIn Headshot',
    promptText: 'Ultra-realistic corporate headshot of a professional, smiling warmly at camera, dressed in smart casual blazer. Shot on Sony A7R V with 85mm f/1.8 lens in a bright modern tech office with blurred architectural glass background. Soft natural window light, subtle warm highlights, true skin tones, high dynamic range, 4k photo.',
    instructions: [
      'Open Google Gemini or Nano Banana image generator.',
      'Paste this prompt and specify your desired attire or office vibe.',
      'Export the generated 1:1 image and set it as your LinkedIn profile photo.'
    ],
    exampleOutput: 'Crisp corporate headshot with flattering natural lighting and realistic office bokeh.'
  },
  {
    shortcode: 'DaVLRAwu1MR',
    slug: 'claude-fable-5-reasoning-model',
    toolName: 'Claude Fable 5 Reasoning Model',
    title: 'Anthropic Claude Fable 5: Frontier Reasoning and Massive Context',
    category: 'coding',
    pricing: 'freemium',
    pricingDetails: 'Free tier available on Claude.ai',
    toolUrl: 'https://claude.ai/',
    description: 'Claude Fable 5 sets a new standard for analytical reasoning, code architecture, and multi-file debugging. Experience near-zero hallucinations across massive context windows and complex mathematical proofs.',
    promptTitle: 'Deep Codebase Refactoring & Architecture Review',
    promptText: 'Analyze this React TypeScript codebase for state management inefficiencies, redundant re-renders, and structural anti-patterns. Recommend an optimal folder hierarchy and generate clean custom hooks to encapsulate business logic.',
    instructions: [
      'Select Claude Fable 5 in your Anthropic project dashboard.',
      'Upload your project files or paste your core components.',
      'Review the structured architectural audit and refactored code blocks.'
    ],
    exampleOutput: 'Complete breakdown of component re-render bottlenecks and refactored lightweight state hooks.'
  },
  {
    shortcode: 'DaSphZagb2F',
    slug: 'notebooklm-short-video-overviews',
    toolName: 'NotebookLM Short Video Overviews',
    title: 'Turn Any PDF or Notes into 60-Second Animated Explainer Videos',
    category: 'productivity',
    pricing: 'free',
    pricingDetails: '100% Free on Google NotebookLM',
    toolUrl: 'https://notebooklm.google.com/',
    description: 'Google NotebookLM introduces short vertical video overviews. Upload any PDF, research article, or class lecture, and NotebookLM automatically scripts, animates, and narrates a 60-second Reels-style explainer video.',
    promptTitle: 'PDF to High-Retention Video Script Blueprint',
    promptText: 'Extract the core 3 takeaways from this 20-page research document. Format as a 60-second viral educational video script with a 3-second visual hook, fast-paced bullet points, and an actionable conclusion.',
    instructions: [
      'Go to notebooklm.google.com and create a new notebook.',
      'Upload your source PDF or lecture slides.',
      'Click Generate Short Video Overview and download your vertical MP4.'
    ],
    exampleOutput: 'Ready-to-post 60-second narrated video summarizing complex academic material.'
  },
  {
    shortcode: 'DaR4MTmmbT0',
    slug: 'gemini-nano-banana-viral-visuals',
    toolName: 'Gemini × Nano Banana Viral Visuals',
    title: 'Create High-Aesthetic Viral Instagram Visuals with Gemini & Nano Banana',
    category: 'image-generation',
    pricing: 'free',
    pricingDetails: 'Free generative pipeline',
    toolUrl: 'https://gemini.google.com/',
    description: 'Generate jaw-dropping lifestyle, travel, and editorial visuals that look straight out of Vogue or National Geographic. Master the exact prompt recipes that give your Instagram feed a premium, cohesive aesthetic.',
    promptTitle: 'Cinematic Lifestyle Aesthetic Generator',
    promptText: 'Cinematic wide-angle photo of a young creator working on a sleek laptop on a sunlit balcony overlooking Amalfi coast at golden hour. 35mm film photography, Kodak Portra 400 aesthetic, soft warm glow, natural shadows, effortless elegance, 8k resolution.',
    instructions: [
      'Open Gemini with Nano Banana image processing.',
      'Copy the prompt and substitute the location or subject to match your niche.',
      'Download and publish high-engagement carousel posts.'
    ],
    exampleOutput: 'Stunning Amalfi golden hour image with authentic 35mm film grain and luminous tones.'
  },
  {
    shortcode: 'DaxxGViyw2y',
    slug: 'ghatak-extension-veo-3-watermark-remover',
    toolName: 'Ghatak Extension: Veo 3 Watermark Cleaner',
    title: 'Remove Gemini & Veo 3 Video Watermarks Instantly for Free',
    category: 'design',
    pricing: 'free',
    pricingDetails: 'Free browser extension',
    toolUrl: '',
    description: 'Remove annoying corner watermarks from Google Gemini and Veo 3 generated video clips with 0% editing skills. Essential for video editors, social media managers, and digital creators producing clean content.',
    promptTitle: 'Clean Video Frame Processing Guidelines',
    promptText: 'Provide the optimal aspect ratio, bitrate, and frame interpolation settings for exporting AI generated video clips without compression artifacts or blurred borders.',
    instructions: [
      'Install the lightweight Ghatak browser extension.',
      'Open your generated Veo 3 or Gemini media preview.',
      'Click the Ghatak icon to download the pristine, watermark-free MP4 file directly.'
    ],
    exampleOutput: 'Clean full-resolution video file without corner branding ready for final edit.'
  },
  {
    shortcode: 'Dau8poVNduj',
    slug: 'free-cybersecurity-certification-paths',
    toolName: 'Free Cybersecurity Certification Roadmap',
    title: 'The Best Free Cybersecurity Courses to Land Six-Figure Tech Roles',
    category: 'productivity',
    pricing: 'free',
    pricingDetails: '100% Free Certifications & Labs',
    toolUrl: '',
    description: 'You don\'t need a $50k college degree to break into cybersecurity in 2026. A hand-curated compilation of the highest-rated free certifications, hands-on penetration testing labs, and practical networking modules.',
    promptTitle: 'Cybersecurity Entry-Level Roadmap & Lab Guide',
    promptText: 'Create a 90-day self-study plan to earn entry-level cybersecurity credentials. Include links to free hands-on practice labs (TryHackMe, OverTheWire), Linux command essentials, and sample interview questions.',
    instructions: [
      'Review the recommended free certifications in the guide.',
      'Dedicate 1 hour daily to interactive lab environments.',
      'Document your CTF challenge write-ups on GitHub to build proof of work.'
    ],
    exampleOutput: 'Structured 12-week study schedule with specific free lab exercises and Linux commands.'
  },
  {
    shortcode: 'DaW9ie0PvNY',
    slug: 'claude-fable-5-developer-setup',
    toolName: 'Claude Fable 5 Dev Workflow',
    title: 'Mastering Claude Fable 5 for Complex Software Engineering',
    category: 'coding',
    pricing: 'freemium',
    pricingDetails: 'Free tier with pro limits',
    toolUrl: 'https://claude.ai/',
    description: 'If you\'re a developer still using basic chat windows, you\'re working too hard. Harness Claude Fable 5\'s massive context window to ingest entire multi-repo codebases, conduct root-cause debugging, and generate regression tests.',
    promptTitle: 'Full Codebase Ingestion & Regression Suite',
    promptText: 'Review the attached 5 source files. Identify edge cases not covered by existing test suites, generate comprehensive Vitest test cases with mock handlers, and identify any unhandled promise rejections.',
    instructions: [
      'Upload your project files into Claude Fable 5 project knowledge.',
      'Run the prompt to generate exhaustive unit and integration tests.',
      'Verify the test suite passes locally in your terminal.'
    ],
    exampleOutput: 'Complete Vitest test suite covering edge cases with 95%+ branch coverage.'
  },
  {
    shortcode: 'DaK3V4dhhnn',
    slug: 'ai-development-automation-workflows',
    toolName: 'Behind-the-Scenes AI Automation Workflows',
    title: 'The Real Tooling Stack Behind High-Output AI Creators and Developers',
    category: 'automation',
    pricing: 'free',
    pricingDetails: 'Free workflow architecture',
    toolUrl: '',
    description: 'Most people only see the finished viral video or polished software release. Look behind the curtain at the exact terminal scripts, webhook triggers, and automated prompt pipelines powering modern AI content creation.',
    promptTitle: 'End-to-End Content & Automation Pipeline',
    promptText: 'Map out an automated content pipeline using n8n and AI APIs. Detail the webhook triggers from YouTube/Instagram, the LLM summarization step, and the automated drafting into Notion and Slack.',
    instructions: [
      'Identify the manual data entry tasks in your weekly routine.',
      'Use this prompt to generate an n8n or Make.com orchestration diagram.',
      'Deploy the webhook endpoints to automate data flows.'
    ],
    exampleOutput: 'Complete JSON export for an n8n automated workflow connecting social inputs to a Notion database.'
  },
  // 21
  {
    shortcode: 'Dbdbo9msH3v',
    slug: 'superprofile-ai-digital-monetization',
    toolName: 'SuperProfile Creator Storefront',
    title: 'How to Monetize AI Prompts & Digital Templates with SuperProfile',
    category: 'productivity',
    pricing: 'freemium',
    pricingDetails: 'Free plan available, pay-as-you-sell transaction model',
    toolUrl: 'https://superprofile.bio/',
    description: 'Earning online with AI is simpler than most people think. Package your curated prompts, code snippets, or video templates into an instant digital storefront with SuperProfile and automate sales 24/7.',
    promptTitle: 'Digital Product Launch & Funnel Blueprint',
    promptText: 'Develop a high-converting 7-day email launch sequence for a digital AI prompt toolkit. Include subject line variations, benefit-focused bullet points, and urgency triggers.',
    instructions: [
      'Create your free storefront profile on SuperProfile.',
      'Upload your digital template or prompt PDF guide.',
      'Connect payment gateway and share link in your Instagram bio.'
    ],
    exampleOutput: 'Complete 7-day launch email sequence with subject lines and call-to-action buttons.'
  },
  // 22
  {
    shortcode: 'DarivNiOBTI',
    slug: 'photo-editing-2020-vs-2026',
    toolName: '2026 AI Photo Inpainting & Relighting',
    title: 'Editing Photos in 2020 vs 2026: AI Generative Fill & Relighting',
    category: 'image-generation',
    pricing: 'free',
    pricingDetails: 'Free generative editing tools available',
    toolUrl: '',
    description: 'Remember spending hours cutting out subjects and manually brushing layer masks in 2020? In 2026, AI understands semantic depth, geometry, and raytracing to relight and inpaint photos in seconds.',
    promptTitle: 'Generative Subject Relighting & Background Swap',
    promptText: 'Keep the foreground subject perfectly intact with natural hair edge blending. Replace the mundane office background with a sun-drenched Scandinavian minimalist apartment with warm wooden textures and soft ambient light.',
    instructions: [
      'Load your raw photo into your AI editing platform.',
      'Select the background mask and enter the prompt.',
      'Refine the ambient light color temperature to match the subject.'
    ],
    exampleOutput: 'Seamlessly relit subject with photorealistic Scandinavian background and natural hair edge bleed.'
  },
  // 23
  {
    shortcode: 'DZpgDT6N7GB',
    slug: 'udemy-ai-career-upskilling-guide',
    toolName: 'Udemy AI & Tech Upskilling',
    title: 'Stop Fearing AI: Master Generative Tech on Udemy in 2026',
    category: 'productivity',
    pricing: 'paid',
    pricingDetails: 'Courses start under ₹499 during seasonal sales',
    toolUrl: 'https://www.udemy.com/',
    description: 'The future doesn\'t belong to those who fear technological change—it belongs to those who adapt. Discover the highest-rated Udemy courses covering prompt engineering, agentic development, and deep learning.',
    promptTitle: 'Personalized Tech Career Upskilling Roadmap',
    promptText: 'I am a junior web developer wanting to pivot into full-stack AI engineering. Create a structured 6-month study syllabus, highlighting key libraries (LangChain, LlamaIndex, MCP) and recommended hands-on portfolio projects.',
    instructions: [
      'Browse curated AI engineering tracks on Udemy.',
      'Dedicate 30 minutes every morning to video lectures and code-alongs.',
      'Publish your working code to GitHub after each course module.'
    ],
    exampleOutput: '6-month curriculum covering Python fundamentals, embeddings, vector databases, and multi-agent systems.'
  },
  // 24
  {
    shortcode: 'DZScO7TtRkC',
    slug: 'olmsted-deep-research-agent',
    toolName: 'Olmsted Deep Research Agent Skill',
    title: 'Stop Wasting Hours on Google: Olmsted Autonomous Deep Research',
    category: 'research',
    pricing: 'free',
    pricingDetails: 'Open-source research skill for coding agents',
    toolUrl: 'https://github.com/',
    description: 'Instead of opening 40 browser tabs and manually sifting through sponsored search results, Olmsted\'s Deep Research Skill autonomously queries scientific papers, cross-references sources, and writes executive briefs.',
    promptTitle: 'Autonomous Scientific Hypothesis Synthesizer',
    promptText: 'Conduct deep literature research on solid-state battery manufacturing breakthroughs in 2025-2026. Extract verified data on energy density (Wh/kg), cycle life, and primary commercial bottlenecks with full academic citations.',
    instructions: [
      'Install the Olmsted research skill into your agent workspace.',
      'Issue the research topic prompt in your terminal.',
      'Review the structured analytical dossier complete with direct DOI citations.'
    ],
    exampleOutput: 'Comprehensive 8-section research brief summarizing 14 peer-reviewed battery chemistry papers.'
  },
  // 25
  {
    shortcode: 'DZVDkEZjfHm',
    slug: 'gemini-executive-portrait-prompts',
    toolName: 'Gemini Executive Portrait Framework',
    title: 'Google Gemini Studio Portrait Prompts for High-Impact Profiles',
    category: 'image-generation',
    pricing: 'free',
    pricingDetails: 'Free access via Gemini Advanced student plan or web',
    toolUrl: 'https://gemini.google.com/',
    description: 'Your profile photo shapes initial credibility in seconds. Leverage Google Gemini\'s neural photo engine to generate crisp, approachable executive portraits with lifelike skin micro-textures and subtle rim lighting.',
    promptTitle: 'Approachable Tech Founder Profile Picture',
    promptText: 'High-resolution headshot portrait of a confident technology founder with a warm smile, wearing a minimalist black turtleneck. Shot on Canon EOS R5 with 85mm f/1.2 lens. Soft directional morning light, gentle natural shadows, sharp focus on iris, clean matte studio backdrop.',
    instructions: [
      'Open Google Gemini and ensure image generation is enabled.',
      'Paste this portrait prompt template and personalize eye color or hair style.',
      'Crop to square aspect ratio and update your founder profile.'
    ],
    exampleOutput: 'Studio-caliber portrait with lifelike eye catchlights and crisp optical focus.'
  },
  // 26
  {
    shortcode: 'DZgyJNXiFwO',
    slug: 'times-square-billboard-ai-prompt',
    toolName: 'Times Square Billboard AI Visualizer',
    title: 'Put Yourself on a Times Square NYC Billboard with AI Prompts',
    category: 'image-generation',
    pricing: 'freemium',
    pricingDetails: 'Runs on Midjourney, FLUX, or ChatGPT',
    toolUrl: 'https://chatgpt.com/',
    description: 'Seeing your face or company on an iconic NYC Times Square billboard used to require a massive ad budget. Today, you can render hyperrealistic night photography of illuminated Broadway billboards featuring your branding.',
    promptTitle: 'Neon Times Square Night Billboard Photograph',
    promptText: 'Cinematic night street photography of New York City Times Square in light rain. Massive glowing LED billboard high on a skyscraper displaying a striking portrait of the subject with neon text overlay. Wet asphalt reflecting vibrant yellow taxi lights and magenta neon signs, 35mm street photography.',
    instructions: [
      'Enter this prompt into Midjourney v6 or ChatGPT Images.',
      'Upload your reference subject image or branding logo.',
      'Render with high aesthetic weight for ultra-realistic wet-street reflections.'
    ],
    exampleOutput: 'Atmospheric rainy night photograph with glowing Times Square billboards reflecting in puddles.'
  },
  // 27
  {
    shortcode: 'DZaL3gGt5PP',
    slug: 'claude-terminal-coding-skills',
    toolName: 'Claude Terminal Coding Skills Suite',
    title: 'Supercharge Your CLI: Essential Developer Skills for Claude Code',
    category: 'coding',
    pricing: 'free',
    pricingDetails: 'Free open source CLI configurations',
    toolUrl: 'https://claude.ai/',
    description: 'Move beyond basic web browser chat windows. Integrate custom slash commands, git hooks, and automatic linter verification into Claude Code so the agent can autonomously diagnose failing tests and file PRs.',
    promptTitle: 'Automated Git Commit & Changelog Generator',
    promptText: 'Analyze git diff HEAD~1. Categorize all modifications according to Conventional Commits (feat, fix, refactor, chore). Generate a concise semantic commit message and an updated release notes entry.',
    instructions: [
      'Install the Claude Code CLI utility in your local terminal.',
      'Add this prompt to your custom skills directory.',
      'Trigger automated commit analysis before pushing branch updates.'
    ],
    exampleOutput: 'feat(auth): implement PKCE authorization flow with refresh token rotation'
  },
  // 28
  {
    shortcode: 'DZPFVK0NxQ4',
    slug: 'vedic-kundali-astrology-ai-prompt',
    toolName: 'Vedic Kundali AI Astrology Engine',
    title: 'Generate In-Depth Vedic Kundali & Horoscope Analyses with AI',
    category: 'ai-writing',
    pricing: 'free',
    pricingDetails: 'Free prompt works on any frontier LLM',
    toolUrl: 'https://claude.ai/',
    description: 'Explore the fascinating intersection of traditional Vedic astrology and LLMs. This structured prompt takes birth date, time, and coordinates to calculate Ascendant houses, planetary positions, and Mahadasha timelines.',
    promptTitle: 'Vedic Natal Chart & Dasha Period Interpreter',
    promptText: 'Act as an expert Vedic astrologer. Based on the provided birth details (Date: [DD/MM/YYYY], Time: [HH:MM], Place: [City, Country]), analyze the Lagna chart, key planetary aspects on the 10th house of career, and the current Mahadasha/Antardasha influence with constructive guidance.',
    instructions: [
      'Replace bracketed variables with your birth details.',
      'Paste into Claude 3.7 or ChatGPT with extended thinking enabled.',
      'Review the comprehensive multi-house breakdown and planetary strengths.'
    ],
    exampleOutput: 'Detailed breakdown of 1st and 10th houses with constructive timing advice for career moves.'
  },
  // 29
  {
    shortcode: 'DZcoSPltyzE',
    slug: 'google-antigravity-cli-overview',
    toolName: 'Google Antigravity CLI Agent',
    title: 'Google Drops Free Antigravity AI Coding Agent for Developers',
    category: 'coding',
    pricing: 'free',
    pricingDetails: 'Free developer preview with high daily limits',
    toolUrl: 'https://antigravity.google/',
    description: 'Google Antigravity is a completely free AI coding agent offering local terminal integration, multi-agent orchestrations, and full Gemini 4 Argon model access. Discover why developers are switching from paid tools.',
    promptTitle: 'Antigravity Full-Stack Microservice Generator',
    promptText: 'Generate a production-ready Express TypeScript backend microservice with JWT authentication, rate limiting middleware, and SQLite Prisma ORM. Include Dockerfile, docker-compose.yml, and Vitest endpoint tests.',
    instructions: [
      'Download and install Google Antigravity CLI.',
      'Authenticate with your Google account via agy auth.',
      'Run agy build to scaffold full-stack applications with built-in agent review.'
    ],
    exampleOutput: 'Scaffolded TypeScript repository with passing test suite and automated Docker build.'
  },
  // 30
  {
    shortcode: 'Daku5yuJgDA',
    slug: '10-second-recruiter-portfolio-website',
    toolName: '10-Second Recruiter Portfolio Template',
    title: 'Build a Developer Portfolio That Impresses Recruiters in 10 Seconds',
    category: 'coding',
    pricing: 'free',
    pricingDetails: 'Free open source GitHub template',
    toolUrl: 'https://github.com/',
    description: 'Recruiters spend an average of 10 seconds glancing at your portfolio before deciding to interview you. This ultra-clean, fast-loading template highlights your top 3 live projects, GitHub metrics, and tech stack.',
    promptTitle: 'Recruiter-Optimized Project Case Study Writer',
    promptText: 'Write a concise, high-impact case study summary for my full-stack web project. Highlight: Problem Statement, Tech Stack Chosen (and why), Engineering Challenges Overcome, and Measurable Outcome (e.g. latency reduced, users served).',
    instructions: [
      'Clone the minimal portfolio repository from GitHub.',
      'Edit the single projects.json data file with your projects.',
      'Deploy to Vercel or GitHub Pages in under 2 minutes.'
    ],
    exampleOutput: 'Punchy 3-bullet project case study with metrics that catch engineering managers\' attention.'
  },
  // 31
  {
    shortcode: 'DZP3vb_N7x1',
    slug: 'ghatak-extension-prompt-rewriter',
    toolName: 'Ghatak Extension: Prompt Optimizer',
    title: 'Stop Getting Bad AI Outputs: Auto-Upgrade Your Prompts with Ghatak',
    category: 'productivity',
    pricing: 'free',
    pricingDetails: 'Free Chrome browser extension',
    toolUrl: '',
    description: 'Most people blame AI when they get mediocre results, but the root problem is vague prompting. The Ghatak browser extension automatically intercepts vague prompts and expands them with role, context, and output constraints.',
    promptTitle: 'Vague Prompt Auto-Expansion Engine',
    promptText: 'Transform this basic prompt into an elite, few-shot prompt: "[INSERT VAGUE PROMPT]". Include Persona, Analytical Goal, Specific Constraints, Step-by-Step Reasoning Instructions, and Output Formatting Rules.',
    instructions: [
      'Install Ghatak in Google Chrome or Brave.',
      'Type your draft thought in any AI chat box and press Alt + G.',
      'Watch your 5-word sentence transform into an engineered system prompt.'
    ],
    exampleOutput: 'A structured 200-word prompt with explicit negative constraints and schema guidelines.'
  },
  // 32
  {
    shortcode: 'DZKeQZcNZIf',
    slug: 'ai-detector-bypass-humanizer-skill',
    toolName: 'Undetectable AI Humanizer Skill',
    title: 'Stop Getting Caught by AI Detectors: The Humanizer Skill Guide',
    category: 'ai-writing',
    pricing: 'free',
    pricingDetails: 'Free prompt-based skill for Claude and ChatGPT',
    toolUrl: '',
    description: 'AI detectors look for uniform sentence lengths, predictable vocabulary tokens, and lack of conversational rhythm. Learn the prompt constraints that introduce natural perplexity and burstiness into your drafts.',
    promptTitle: 'Natural Cadence & Perplexity Injector',
    promptText: 'Rewrite the following text so that it reads like natural, experienced human prose. Vary sentence lengths drastically (mix 4-word punchy sentences with complex clauses). Remove corporate filler words like "delve", "testament", "crucial", and "landscape".',
    instructions: [
      'Paste your draft article or essay into Claude.',
      'Apply this cadence and burstiness prompt modifier.',
      'Verify with ZeroGPT or Turnitin to see the human score rise.'
    ],
    exampleOutput: 'Lively, authentic human text with natural pacing that passes AI detection filters effortlessly.'
  },
  // 33
  {
    shortcode: 'DZngeBbNC3h',
    slug: 'amd-rocm-local-ai-breakthrough',
    toolName: 'AMD ROCm AI Hardware Acceleration',
    title: 'AMD\'s Huge Breakthrough: Open Source Local AI Without Nvidia Tax',
    category: 'coding',
    pricing: 'free',
    pricingDetails: 'Open-source drivers and hardware architecture',
    toolUrl: 'https://www.amd.com/',
    description: 'Nvidia dominated the AI hardware conversation for years, forcing developers to pay heavy GPU premiums. AMD\'s latest ROCm release brings native PyTorch, Ollama, and vLLM support to consumer Radeon cards at a fraction of the cost.',
    promptTitle: 'ROCm Local LLM Inference Benchmarking Script',
    promptText: 'Write a Python benchmarking script using PyTorch with ROCm HIP backend to measure tokens-per-second throughput and VRAM allocation across batch sizes 1, 4, 8, and 16 for a 14B parameter quantized model.',
    instructions: [
      'Install AMD ROCm drivers on your Linux/Windows WSL system.',
      'Pull quantized models using Ollama or vLLM with HIP acceleration.',
      'Benchmark inference speed and run local models completely private.'
    ],
    exampleOutput: 'Benchmarking script reporting 42 tokens/sec on Radeon 7900 XTX with 24GB VRAM.'
  },
  // 34
  {
    shortcode: 'DZfJx0HNpW8',
    slug: 'claude-fable-5-frontier-reasoning',
    toolName: 'Claude Fable 5 Frontier Reasoning',
    title: 'Claude Fable 5 Deep Dive: Breakthrough SWE-bench Performance',
    category: 'coding',
    pricing: 'freemium',
    pricingDetails: 'Free tier on Claude.ai, pro tier for unlimited daily turns',
    toolUrl: 'https://claude.ai/',
    description: 'Explore the full capabilities of Claude Fable 5: handling 100,000+ line codebases, reasoning through distributed systems bugs, and writing rigorous unit tests without getting sidetracked by complex requirements.',
    promptTitle: 'Complex Distributed Concurrency Bug Fixer',
    promptText: 'Analyze this distributed microservices trace log. Locate the root cause of the intermittent HTTP 504 gateway timeout, determine if connection pooling or database locks are responsible, and provide the exact patch.',
    instructions: [
      'Upload the relevant microservice log trace to Claude Fable 5.',
      'Ask the model to isolate race conditions and connection exhaustion.',
      'Apply the recommended database connection pool configuration patch.'
    ],
    exampleOutput: 'Detailed diagnostic tracing identifying connection starvation in Prisma connection pool with fix.'
  },
  // 35
  {
    shortcode: 'DcUOC8rk7qP',
    slug: 'google-gemini-student-free-access',
    toolName: 'Google Gemini Student 1-Year Free',
    title: 'Students: Claim 1 Year of Google Gemini Advanced Free (₹3,588 Value)',
    category: 'productivity',
    pricing: 'free',
    pricingDetails: '₹0 for 1 full year with valid student verification',
    toolUrl: 'https://gemini.google.com/',
    description: 'If you have an active university or college email ID, Google is offering 12 months of Gemini Advanced with Gemini 2.5 Pro and 2TB cloud storage completely free. Follow this step-by-step claiming guide.',
    promptTitle: 'Academic Thesis Literature Review Assistant',
    promptText: 'I am researching the social impact of autonomous vehicles. Synthesize the attached 3 academic papers into a 1,000-word literature review. Compare methodologies, sample sizes, conclusions, and note gaps in current scholarship.',
    instructions: [
      'Navigate to the Google One student promotional page.',
      'Verify your college email with SheerID or institutional SSO.',
      'Activate Gemini Advanced on your account and start using 2M token context.'
    ],
    exampleOutput: 'Structured academic literature review comparing research methodologies with APA citations.'
  },
  // 36
  {
    shortcode: 'DYpAF1GtY2F',
    slug: 'safe-instagram-autodm-automation',
    toolName: 'Safe Instagram Auto-DM Workflow',
    title: 'Avoid Account Bans: Safe Instagram Auto-DM Workflows for Creators',
    category: 'automation',
    pricing: 'freemium',
    pricingDetails: 'Free starter tier with ManyChat or official Meta API',
    toolUrl: 'https://manychat.com/',
    description: 'Sending identical repetitive direct messages to thousands of followers triggers Instagram\'s anti-bot algorithms, risking shadowbans. Discover how to randomize reply variants, add human delays, and maintain account safety.',
    promptTitle: 'Varied Auto-DM Response Matrix Generator',
    promptText: 'Generate 12 distinct, natural conversational DM reply templates delivering a resource link to an Instagram user who commented "TOOL". Vary greetings, emojis, and phrasing to ensure 0% repetition across automated replies.',
    instructions: [
      'Open your automation tool (ManyChat or Meta Graph API).',
      'Paste the 12 dynamic message variants into a randomized rotation block.',
      'Set an artificial 15-45 second jitter delay before each message dispatch.'
    ],
    exampleOutput: 'A 12-variant reply dictionary with natural phrasing and randomized emoji placements.'
  },
  // 37
  {
    shortcode: 'DY7HayetDG4',
    slug: 'topmate-runtheloop-ai-networking',
    toolName: 'Topmate RunTheLoop AI Agent',
    title: 'Topmate RunTheLoop: Automate Networking and Mentorship 24/7',
    category: 'productivity',
    pricing: 'freemium',
    pricingDetails: 'Free setup, revenue share on paid consultations',
    toolUrl: 'https://topmate.io/',
    description: 'Turn your professional profile into an interactive, 24/7 opportunity engine. RunTheLoop by Topmate answers client questions, screens consultation requests, and books paid calls without manual back-and-forth.',
    promptTitle: 'Consulting Service Pitch & Intake Questionnaire',
    promptText: 'Draft a 4-question intake form for prospective clients wanting a 1-on-1 AI strategy session. Ensure questions filter for budget, timeline, current tech stack, and clear project goals.',
    instructions: [
      'Create or log into your Topmate profile.',
      'Enable the RunTheLoop AI agent assistant.',
      'Train the assistant on your bio, past client testimonials, and booking calendar.'
    ],
    exampleOutput: 'Interactive intake flow that qualifies prospective leads before scheduling.'
  },
  // 38
  {
    shortcode: 'DYwx1_KtrNy',
    slug: 'claude-token-optimization-guide',
    toolName: 'Claude Token & Context Optimization',
    title: 'How Power Users Avoid Claude Rate Limits & Reduce Chat Bloat',
    category: 'coding',
    pricing: 'free',
    pricingDetails: 'Practical optimization guidelines for all tiers',
    toolUrl: 'https://claude.ai/',
    description: 'You don\'t hit Claude limits because you send too many questions—you hit them because every message re-sends the entire preceding conversation history. Learn prompt caching, sub-threading, and context reset tactics.',
    promptTitle: 'Context Session State Compressor',
    promptText: 'Summarize our entire ongoing technical session into a concise 150-word state summary. List: Current Goal, Confirmed Architecture Decisions, Unresolved Bugs, and Next Immediate Action. Drop all intermediate logs.',
    instructions: [
      'Run this context compressor prompt when a Claude chat approaches 30+ turns.',
      'Copy the output state summary and paste it into a fresh, clean chat thread.',
      'Enjoy 10x faster response latencies and zero sudden rate limit lockouts.'
    ],
    exampleOutput: 'A concise technical session snapshot ready to bootstrap a lightweight new chat.'
  },
  // 39
  {
    shortcode: 'DYpVfgKNGzh',
    slug: 'gemini-omni-talking-avatar-workflow',
    toolName: 'Google Omni AI Talking Avatar',
    title: 'How to Build Realistic AI Video Avatars with Google Omni & Gemini',
    category: 'video-generation',
    pricing: 'free',
    pricingDetails: 'Free workflow using public preview tools',
    toolUrl: 'https://gemini.google.com/',
    description: 'Create lifelike talking video presenters with natural facial micro-expressions, synchronized lip movements, and multi-lingual voiceover without ever getting in front of a camera.',
    promptTitle: 'Viral Short-Form Educational Script with Stage Directions',
    promptText: 'Write a 45-second educational video script explaining quantum computing basics. Include bracketed visual stage cues, camera zooms, and facial expression directions for an AI avatar presenter.',
    instructions: [
      'Generate your video script with Gemini.',
      'Synthesize natural voiceover with realistic breath marks.',
      'Feed the audio and reference avatar photo into Omni for lip sync.'
    ],
    exampleOutput: 'Complete 45-second script with timecodes and emotive facial expression markers.'
  },
  // 40
  {
    shortcode: 'DY14MkbNknQ',
    slug: 'engineers-claude-companion-ecc',
    toolName: 'Engineers Claude Companion (ECC)',
    title: 'Supercharge Claude Code with Engineers Claude Companion (ECC)',
    category: 'coding',
    pricing: 'free',
    pricingDetails: '100% Free Open Source Tool',
    toolUrl: 'https://github.com/',
    description: 'ECC is a game-changing developer companion for Claude Code CLI. It automatically runs background test watchers, enforces strict type checking, and flags dangerous terminal commands before execution.',
    promptTitle: 'ECC Automated Test-Driven Development Loop',
    promptText: 'Configure an autonomous test-driven development workflow: write failing unit tests for an authentication service, execute tests via ECC watcher, implement minimal passing code, and refactor cleanly.',
    instructions: [
      'Install ECC alongside Claude Code via npm install -g ecc-companion.',
      'Run ecc init in your project root directory.',
      'Watch Claude Code autonomously verify every code change against live tests.'
    ],
    exampleOutput: 'Terminal output demonstrating automated test verification pass with 0 failures.'
  },
  // 41
  {
    shortcode: 'DYzVcViNbnW',
    slug: 'google-ai-pro-cancellation-renewal-alert',
    toolName: 'Google AI Pro Subscription Guide',
    title: 'Cancel or Renew? What to Do When Your Free Google AI Pro Year Ends',
    category: 'productivity',
    pricing: 'free',
    pricingDetails: 'Billing management guide',
    toolUrl: 'https://one.google.com/',
    description: 'If you signed up for the free 1-year Google AI Pro plan last year, your promo period is expiring. Learn how to safely downgrade without losing cloud storage or migrate your files to free alternatives.',
    promptTitle: 'Cloud Storage & AI Subscription Audit Checklist',
    promptText: 'List the exact steps to audit Google One cloud storage, export large files to local backup using Google Takeout, and cleanly cancel premium recurring subscriptions without losing access to Gmail.',
    instructions: [
      'Visit one.google.com/settings to verify your promotion end date.',
      'Download your primary archives using Google Takeout.',
      'Downgrade to the free 15GB tier or switch to an educational account.'
    ],
    exampleOutput: 'Step-by-step checklist to avoid unintended recurring credit card debits.'
  },
  // 42
  {
    shortcode: 'DZ99p69tP-y',
    slug: '3-developer-portfolio-websites-source-code',
    toolName: '3 Production Developer Portfolios',
    title: '3 Stunning Developer Portfolio Websites with Complete Source Code',
    category: 'coding',
    pricing: 'free',
    pricingDetails: 'Open-source GitHub repositories',
    toolUrl: 'https://github.com/',
    description: 'Your portfolio makes the crucial first impression before an interview is scheduled. Get the complete source code for 3 distinct, modern developer websites: minimal editorial, bento-grid dynamic, and terminal-style.',
    promptTitle: 'Developer Bio & Technical Skills Summary',
    promptText: 'Write a compelling 80-word developer bio for a frontend engineer. Mention React, TypeScript, Next.js, and performance optimization. Include a catchy tagline and links to GitHub and LinkedIn.',
    instructions: [
      'Choose one of the three open-source portfolio repositories.',
      'Customize the colors, typography, and personal projects in data.json.',
      'Publish live to Vercel or Netlify with one click.'
    ],
    exampleOutput: 'Ready-to-use developer bio and formatted project showcase metadata.'
  },
  // 43
  {
    shortcode: 'DZAMMZpjVnJ',
    slug: 'gemini-editorial-profile-picture-prompts',
    toolName: 'Gemini Editorial Profile Prompts',
    title: 'Generate Professional Executive Headshots with Google Gemini',
    category: 'image-generation',
    pricing: 'free',
    pricingDetails: 'Free prompt templates',
    toolUrl: 'https://gemini.google.com/',
    description: 'Your profile picture does more than fill a circle—it establishes authority and approachability. Master these refined prompt templates for Google Gemini to render natural, studio-lit headshots.',
    promptTitle: 'Natural Outdoor Bokeh Professional Portrait',
    promptText: 'Editorial portrait of a young professional in a navy blue casual sweater, standing outdoors in front of modern architecture with lush green foliage. Golden hour backlight, beautiful round optical bokeh, 85mm f/1.4 lens, natural skin tones, relaxed smile.',
    instructions: [
      'Open Gemini in your browser.',
      'Paste the prompt and specify your desired background ambiance.',
      'Download and set as your official profile picture.'
    ],
    exampleOutput: 'Warm, golden-hour outdoor portrait with gorgeous circular bokeh and natural highlights.'
  },
  // 44
  {
    shortcode: 'DZNGEiHtwGQ',
    slug: 'json-configured-developer-portfolio',
    toolName: 'JSON-Configured Portfolio Template',
    title: 'Developer Portfolio Giveaway: Change One JSON File to Update Everything',
    category: 'coding',
    pricing: 'free',
    pricingDetails: 'Free GitHub template giveaway',
    toolUrl: 'https://github.com/',
    description: 'Stop wasting weeks building your portfolio from scratch. This high-performance React template is 100% data-driven: simply update one JSON file with your projects, social links, and skills to deploy immediately.',
    promptTitle: 'JSON Data Schema Generator for Developer Resume',
    promptText: 'Convert this bulleted resume into a structured JSON file matching this schema: { name, title, bio, skills: [], projects: [{ title, description, tags: [], liveUrl, repoUrl }] }.',
    instructions: [
      'Clone the repository from GitHub.',
      'Replace the data in src/data/portfolio.json with your own.',
      'Deploy to GitHub Pages or Cloudflare Pages for free.'
    ],
    exampleOutput: 'Clean, formatted JSON document representing your complete portfolio profile.'
  },
  // 45
  {
    shortcode: 'DZkEb-RCod-',
    slug: 'nano-banana-cinematic-photoshoot-part-1',
    toolName: 'Nano Banana Photoshoot Part 1',
    title: 'Nano Banana AI Photoshoot: Studio Lighting Prompts That Look 100% Real',
    category: 'image-generation',
    pricing: 'free',
    pricingDetails: 'Free generative photoshoot prompt',
    toolUrl: '',
    description: 'None of these carousel photos were taken with a real camera. Learn how to use Nano Banana with precise focal lengths, ISO film noise, and Rembrandt lighting prompts to create indistinguishable studio images.',
    promptTitle: 'Rembrandt Studio Portrait with Film Texture',
    promptText: 'Moody studio portrait of a subject, dramatic single light source from the side creating classic Rembrandt triangle on cheek, deep matte shadows, 50mm vintage Leica lens, subtle 35mm film grain, 8k resolution.',
    instructions: [
      'Open your AI image generator running Nano Banana.',
      'Paste the prompt and adjust the lighting mood or subject attire.',
      'Generate high-resolution variations and pick the best portrait.'
    ],
    exampleOutput: 'A moody, fine-art portrait featuring authentic Leica lens depth and natural grain.'
  },
  // 46
  {
    shortcode: 'DYUsCZdy6YA',
    slug: 'ghatak-chrome-extension-productivity-suite',
    toolName: 'Ghatak Chrome Productivity Suite',
    title: 'Ghatak Chrome Extension: Speed Up Your Daily AI Workflows',
    category: 'productivity',
    pricing: 'free',
    pricingDetails: 'Free Chrome Web Store extension',
    toolUrl: '',
    description: 'A powerful, lightweight browser extension designed for developers, students, and digital creators. Instant keyboard shortcuts to summon AI prompts, summarize lengthy web articles, and extract code blocks.',
    promptTitle: 'Instant Web Article Executive Brief',
    promptText: 'Extract the core thesis, top 3 counter-arguments, and actionable takeaways from the current web page. Format as an executive briefing note with zero fluff.',
    instructions: [
      'Add Ghatak to your Chrome browser.',
      'Press the shortcut key on any long article or documentation page.',
      'Read the instant executive briefing without leaving the tab.'
    ],
    exampleOutput: 'Bulleted executive brief highlighting the 3 primary points of a 5,000-word essay.'
  },
  // 47
  {
    shortcode: 'DX3KBX3Nc5h',
    slug: 'vedic-astrology-career-report-generator',
    toolName: 'Vedic Astrology Career Engine',
    title: 'Generate Personalized Career Guidance from Vedic Astrology with AI',
    category: 'ai-writing',
    pricing: 'free',
    pricingDetails: 'Prompt works on Claude, ChatGPT & Gemini',
    toolUrl: 'https://claude.ai/',
    description: 'Synthesize ancient astrological principles with advanced AI language capabilities. Input birth coordinates and receive an analytical breakdown of vocational house rulers (10th and 2nd houses) and upcoming planetary transits.',
    promptTitle: 'Vocational Astrology Chart Analysis',
    promptText: 'Analyze the 10th house of career and 6th house of daily work based on the following planetary placements: [INPUT PLACEMENTS]. Provide grounded, constructive advice on suitable industries, work styles, and timing for career shifts.',
    instructions: [
      'Input your planetary chart details into the bracketed fields.',
      'Run the prompt in Claude 3.7 or ChatGPT.',
      'Review the thoughtful vocational guidance and timing insights.'
    ],
    exampleOutput: 'Constructive vocational analysis highlighting analytical and technology-focused career strengths.'
  },
  // 48
  {
    shortcode: 'DYTdTgjhOrq',
    slug: 'system-prompt-optimizer-extension',
    toolName: 'System Prompt Optimizer Extension',
    title: 'The Secret to God-Tier AI Results: The Prompt Optimizer Extension',
    category: 'productivity',
    pricing: 'free',
    pricingDetails: 'Free productivity tool',
    toolUrl: '',
    description: 'The secret to god-tier AI results isn\'t typing longer essays—it\'s structuring instructions with system constraints. This extension injects few-shot examples, chain-of-thought instructions, and schema rules automatically.',
    promptTitle: 'Meta-Prompt Architect: Turn Any Idea into an Elite Prompt',
    promptText: 'Act as an expert prompt engineer. Take the following objective: "[INSERT GOAL]". Write an optimized prompt containing Role, Task, Input Data Schema, Operational Constraints, and Output Format specification.',
    instructions: [
      'Enter your raw idea or task into the extension.',
      'Click Optimize to generate a structured system prompt.',
      'Paste into your model for dramatically higher reasoning accuracy.'
    ],
    exampleOutput: 'A multi-section prompt framework guaranteeing strict JSON output and step-by-step reasoning.'
  },
  // 49
  {
    shortcode: 'DYUrTn0g-k8',
    slug: 'ghatak-browser-assistant-chatgpt-claude',
    toolName: 'Ghatak Browser Assistant for LLMs',
    title: 'Ghatak Extension for ChatGPT & Claude: Prompt Faster Directly in Browser',
    category: 'productivity',
    pricing: 'free',
    pricingDetails: 'Free browser extension',
    toolUrl: '',
    description: 'Streamline your interaction with ChatGPT, Claude, and Gemini. Quick-insert custom prompt templates, manage conversational history snippets, and export chats as clean Markdown with one click.',
    promptTitle: 'Markdown Chat Exporter & Documentation Builder',
    promptText: 'Format the following conversation into clean technical documentation: summarize key decisions in a table, provide copyable code blocks with file names, and list open action items.',
    instructions: [
      'Install Ghatak in your browser.',
      'Use the sidebar to search and inject your saved prompt presets.',
      'Export important chat sessions directly into your Notion or Obsidian notes.'
    ],
    exampleOutput: 'Clean GFM Markdown document ready to commit to your project docs folder.'
  },
  // 50
  {
    shortcode: 'DXjd4PtjiRQ',
    slug: '80-free-hosted-ai-models-api-gateway',
    toolName: '80+ Free Hosted AI Models Gateway',
    title: 'Access 80+ AI Models for Free: MiniMax, GLM, DeepSeek & Sarvam',
    category: 'coding',
    pricing: 'free',
    pricingDetails: 'Free API access with high community tiers',
    toolUrl: 'https://openrouter.ai/',
    description: 'Why pay separate subscription fees when you can access over 80 state-of-the-art models for free? Connect to MiniMax M2.7, GLM 5.1, Kimi 2.5, DeepSeek 3.2, and Sarvam-M via a single unified OpenAI-compatible API endpoint.',
    promptTitle: 'OpenAI-Compatible Multi-Model Node.js Client',
    promptText: 'Write a TypeScript function using the openai npm package that routes prompts dynamically across free models (DeepSeek, GLM, MiniMax) with automatic retry and fallback handling.',
    instructions: [
      'Register for a free API gateway key on OpenRouter or free providers.',
      'Configure the base URL in your .env file.',
      'Switch between 80+ cutting-edge models without changing a single line of client code.'
    ],
    exampleOutput: 'Production-ready TypeScript API routing function with automatic fallback across 3 free endpoints.'
  },
  // 51
  {
    shortcode: 'DY93u5DNLNa',
    slug: '1-3-billion-free-tokens-github-repo',
    toolName: '1.3B Free Tokens GitHub Repo',
    title: 'Get 1.3 Billion Free AI Tokens Using This Viral GitHub Repository',
    category: 'coding',
    pricing: 'free',
    pricingDetails: '100% Free Developer Credits & Open Endpoints',
    toolUrl: 'https://github.com/',
    description: 'Running out of API tokens halts development fast. This curated GitHub repository indexes verified developer free tiers, student grants, and sponsor endpoints totaling over 1.3 billion combined free LLM tokens.',
    promptTitle: 'Token Usage Tracking & Budget Optimizer',
    promptText: 'Create a Python script that tracks token consumption across different model endpoints, calculates projected monthly costs, and alerts when usage approaches free-tier thresholds.',
    instructions: [
      'Star and clone the free tokens repository from GitHub.',
      'Follow the setup instructions to claim credits from eligible providers.',
      'Integrate the endpoints into your local dev environment for cost-free testing.'
    ],
    exampleOutput: 'Terminal dashboard tracking tokens consumed across Groq, OpenRouter, and Google AI Studio.'
  },
  // 52
  {
    shortcode: 'DYuad_AqQ-7',
    slug: 'modern-motion-cinematic-web-design',
    toolName: 'Next-Gen Motion & Web Design',
    title: 'Websites Are Evolving: Cinematic Motion, Smooth Scroll & 3D Physics',
    category: 'design',
    pricing: 'free',
    pricingDetails: 'Design inspiration & frontend code resources',
    toolUrl: 'https://godly.website/',
    description: 'Static landing pages with plain 3-column cards are obsolete. Explore the newest wave of award-winning websites featuring kinetic typography, smooth inertial scroll physics, and interactive SVG shaders.',
    promptTitle: 'Framer Motion Smooth Scroll Section Scaffold',
    promptText: 'Write a React component using Tailwind CSS and Framer Motion that implements a sticky horizontal scroll gallery with smooth parallax card transitions and subtle opacity reveals.',
    instructions: [
      'Study the curated website showcase for interaction inspiration.',
      'Implement custom scroll physics using Framer Motion or GSAP.',
      'Keep interactions subtle and responsive across both mobile and desktop.'
    ],
    exampleOutput: 'Complete React component with fluid parallax card scrolling and responsive breakpoints.'
  },
  // 53
  {
    shortcode: 'DYJaxfaSoIQ',
    slug: 'nostalgic-family-portrait-ai-prompt',
    toolName: 'Nostalgic Family Portrait Generator',
    title: 'Generate Heartwarming Film-Grain Family Portraits with AI Prompts',
    category: 'image-generation',
    pricing: 'free',
    pricingDetails: 'Free prompt works on Midjourney & ChatGPT',
    toolUrl: 'https://chatgpt.com/',
    description: 'Celebrate special memories and family bonds with emotional, analog film-inspired portrait prompts. Recreate the nostalgic warmth of 1990s 35mm film photography with authentic color saturation and soft grain.',
    promptTitle: 'Vintage 1990s Analog Film Family Portrait',
    promptText: 'Heartwarming candid photograph of a mother and child smiling joyfully, shot on vintage 35mm film camera in 1995. Warm golden sunlight streaming through window, soft film grain, authentic Kodak Gold color tones, gentle motion blur, timeless nostalgic mood.',
    instructions: [
      'Paste the prompt into your preferred generative image model.',
      'Upload reference family photos if your tool supports image-to-image.',
      'Print or frame the resulting high-resolution nostalgic portrait.'
    ],
    exampleOutput: 'A warm, touching portrait with authentic 90s film textures and golden sunlight.'
  },
  // 54
  {
    shortcode: 'DYHgjaNpApc',
    slug: 'master-ai-skills-github-repo',
    toolName: 'Master AI Skills GitHub Repository',
    title: 'The Hidden GitHub Repo for AI Engineers: Practical Skills & Roadmaps',
    category: 'coding',
    pricing: 'free',
    pricingDetails: '100% Free Open Source Repository',
    toolUrl: 'https://github.com/',
    description: 'A treasure trove for developers and AI practitioners. This comprehensive open-source GitHub repository features curated learning paths, production MCP server configs, RAG blueprints, and system prompt architectures.',
    promptTitle: 'Enterprise RAG Architecture Review & Pipeline',
    promptText: 'Design an enterprise-grade Retrieval Augmented Generation (RAG) architecture. Specify chunking strategy, hybrid dense/sparse vector search, re-ranking with cross-encoders, and hallucination guardrails.',
    instructions: [
      'Clone the master AI repository to your local computer.',
      'Explore the organized topic folders (RAG, Agents, Finetuning).',
      'Run the included starter code notebooks to build hands-on skills.'
    ],
    exampleOutput: 'Comprehensive RAG architectural diagram and Python code for hybrid retrieval with cross-encoder re-ranking.'
  },
  // 55
  {
    shortcode: 'DXGNqhXGYYD',
    slug: 'ai-week-in-review-cyber-models',
    toolName: 'AI Intelligence Briefing',
    title: 'The AI Week That Broke the Internet: Cyber Zero-Days & $122B Warchests',
    category: 'research',
    pricing: 'free',
    pricingDetails: 'Weekly research briefing',
    toolUrl: '',
    description: 'Autonomous cyber agents discovering decade-old zero-day exploits, frontier labs amassing $122B compute funds, and governments considering robot taxes. Stay informed with concise, fact-checked AI industry analysis.',
    promptTitle: 'Executive AI Market Analysis & Strategic Implications',
    promptText: 'Analyze the strategic implications of autonomous cyber security models identifying critical zero-day software vulnerabilities. Outline potential risks for enterprise software vendors and the defense industry.',
    instructions: [
      'Read the executive briefing highlights.',
      'Use this prompt to run scenario planning for your company\'s tech stack.',
      'Strengthen vulnerability patch cycles and automated code reviews.'
    ],
    exampleOutput: 'Executive report assessing enterprise cyber risks and recommending proactive automated patching.'
  },
  // 56
  {
    shortcode: 'DXRFOG6GUK5',
    slug: 'claude-design-opus-4-7-multimodal',
    toolName: 'Claude Design & Opus 4.7',
    title: 'Anthropic Drops Claude Design & Opus 4.7: 3x Sharper Vision & UI Studio',
    category: 'design',
    pricing: 'freemium',
    pricingDetails: 'Available via Claude.ai and Anthropic API',
    toolUrl: 'https://claude.ai/',
    description: 'Opus 4.7 processes imagery at 3.75 megapixels (3x sharper resolution), scores 87.6% on SWE-bench, and powers Claude Design to convert simple text requirements into fully interactive, deployable UI prototypes.',
    promptTitle: 'Claude Design Interactive Prototype Generator',
    promptText: 'Generate a high-fidelity interactive SaaS pricing calculator component using React and Tailwind CSS. Include a monthly/annual toggle, dynamic seat count slider, feature comparison accordion, and clear checkout CTA.',
    instructions: [
      'Select Claude Opus 4.7 in your workspace.',
      'Paste the component prompt and describe your design aesthetic.',
      'Preview the live interactive artifact and export the clean code.'
    ],
    exampleOutput: 'Functional interactive pricing calculator with responsive slider and animated price calculations.'
  },
  // 57
  {
    shortcode: 'DWihgsNmfDc',
    slug: 'openclaw-mcp-autonomous-agent',
    toolName: 'OpenClaw Autonomous MCP Agent',
    title: 'OpenClaw Now Speaks MCP: Universal Protocol for Autonomous AI Agents',
    category: 'coding',
    pricing: 'free',
    pricingDetails: 'Open Source agent framework',
    toolUrl: 'https://github.com/',
    description: 'OpenClaw integrates Anthropic\'s universal Model Context Protocol (MCP). Now, Claude and other frontier models can directly inspect your filesystem, run terminal commands, and control browser sessions with secure permissions.',
    promptTitle: 'MCP Server Configuration & Tool Definition',
    promptText: 'Write a Model Context Protocol (MCP) server in TypeScript that exposes two tools: list_git_branches and run_typecheck. Include proper JSON schema parameter definitions and error handling.',
    instructions: [
      'Install OpenClaw from the official GitHub repository.',
      'Configure your local MCP servers in your claude_desktop_config.json.',
      'Instruct your agent to perform complex multi-step developer operations.'
    ],
    exampleOutput: 'Complete MCP server implementation in TypeScript with schemas and IPC transport.'
  },
  // 58
  {
    shortcode: 'DWdD6RFmWzd',
    slug: 'claude-mythos-frontier-architecture',
    toolName: 'Claude Mythos Model Investigation',
    title: 'Inside Claude Mythos: Anthropic\'s Unreleased Flagship AI Architecture',
    category: 'research',
    pricing: 'free',
    pricingDetails: 'Technical architectural analysis',
    toolUrl: 'https://anthropic.com/',
    description: 'An investigative analysis into leaked benchmarks and architecture notes for Claude Mythos. Explore its revolutionary multi-head attention optimizations, ultra-low hallucination rate, and unprecedented reasoning depth.',
    promptTitle: 'Model Architecture & Benchmark Comparison',
    promptText: 'Compare the architectural evolution from Claude 3.5 Sonnet to next-generation frontier reasoning models. Focus on token efficiency, test-time compute scaling, and memory retention across multi-turn reasoning.',
    instructions: [
      'Read the technical architecture breakdown.',
      'Run the prompt to understand test-time compute tradeoffs.',
      'Optimize your own application prompts for next-generation reasoning models.'
    ],
    exampleOutput: 'Detailed comparison table showing parameter efficiency and test-time compute curves.'
  },
  // 59
  {
    shortcode: 'DXyftW5uiB_',
    slug: 'ai-builder-mindset-playbook',
    toolName: 'The AI Builder Playbook',
    title: 'Stop Being Just a User: The Playbook to Become a High-Leverage AI Builder',
    category: 'productivity',
    pricing: 'free',
    pricingDetails: 'Strategic mindset and execution guide',
    toolUrl: '',
    description: 'Every prompt you write and link you click is training data for someone else\'s platform. Shift from passive consumption to building your own defensible software tools, custom agent systems, and automated digital assets.',
    promptTitle: 'Micro-SaaS Product Discovery Matrix',
    promptText: 'Identify 3 unserved workflow pain points in legal or accounting administration that can be solved with a simple single-page AI tool. For each, describe the input format, the processing logic, and the perceived user value.',
    instructions: [
      'Audit the manual digital chores you perform repeatedly every week.',
      'Use this prompt to turn those chores into a standalone tool concept.',
      'Build and launch the tool with low-code or AI coding agents in days.'
    ],
    exampleOutput: 'Three validated micro-SaaS concepts targeting specific corporate operational bottlenecks.'
  },
  // 60
  {
    shortcode: 'DXD6Nlgj35N',
    slug: 'google-notebooklm-second-brain-audio',
    toolName: 'Google NotebookLM Second Brain',
    title: 'Google NotebookLM: Turn Notes, PDFs & Books into an Interactive Brain',
    category: 'productivity',
    pricing: 'free',
    pricingDetails: '100% Free with Google Account',
    toolUrl: 'https://notebooklm.google.com/',
    description: 'Google NotebookLM changes how research is organized. Upload dense books, academic papers, and lecture slides to create a personalized AI assistant that answers questions grounded strictly in your source documents.',
    promptTitle: 'Grounded Source Synthesis & Comparative Analysis',
    promptText: 'Based exclusively on the uploaded 4 research documents, compare the competing theories on economic inflation. Cite exact page numbers and quotes for each argument, without introducing outside knowledge.',
    instructions: [
      'Visit notebooklm.google.com and upload your study materials.',
      'Ask specific questions to get fully cited answers with inline click-to-source links.',
      'Generate an Audio Overview to listen to a 2-host podcast deep dive.'
    ],
    exampleOutput: 'Comprehensive comparative synthesis with exact page citations from your source files.'
  },
  // 61
  {
    shortcode: 'DXWwnRWDrjU',
    slug: 'ai-memory-migration-blueprint',
    toolName: 'Cross-Platform AI Memory Migration',
    title: 'How to Migrate Your AI Memory from ChatGPT & Google to Claude',
    category: 'productivity',
    pricing: 'free',
    pricingDetails: 'Free setup guide & memory prompt template',
    toolUrl: 'https://claude.ai/',
    description: 'Switching AI assistants shouldn\'t mean starting from scratch. Learn how to export your personalized preferences, project contexts, and biographical memories from ChatGPT and import them into Anthropic Claude Projects.',
    promptTitle: 'Master Personal Context & Preference Dossier',
    promptText: 'Review everything you know about my profession, communication style, tech stack, and goals. Synthesize this into a structured markdown document titled "System Context: User Profile" that I can import into another AI tool.',
    instructions: [
      'Run this extraction prompt in your existing AI assistant.',
      'Copy the generated Markdown profile document.',
      'Upload the file to Claude\'s Project Knowledge to retain full context.'
    ],
    exampleOutput: 'A structured markdown document containing your full professional persona and coding style preferences.'
  },
  // 62
  {
    shortcode: 'DXJuILjjyMk',
    slug: 'mentos-life-developer-shortcuts-repo',
    toolName: 'Mentos Life Developer Shortcuts',
    title: 'Mentos Zindagi: The GitHub Shortcuts Repo That Saves 2 Hours Daily',
    category: 'productivity',
    pricing: 'free',
    pricingDetails: 'Free open source repository',
    toolUrl: 'https://github.com/',
    description: 'Stop living the complicated developer life. This open-source repository collects shell aliases, keyboard shortcuts, automated git branch helpers, and terminal dotfiles that shave hours of friction off your daily work.',
    promptTitle: 'Terminal Workflow Audit & Custom Aliases',
    promptText: 'Audit this list of frequent bash commands and create 10 powerful zsh/bash aliases and function helpers with auto-completion to streamline everyday git commits, docker containers, and project switches.',
    instructions: [
      'Clone the Mentos shortcuts repository from GitHub.',
      'Source the alias config file in your ~/.zshrc or ~/.bashrc.',
      'Start using one-word shortcuts to execute complex multi-step terminal tasks.'
    ],
    exampleOutput: 'Set of 10 clean terminal aliases that reduce command typing by 70%.'
  },
  // 63
  {
    shortcode: 'DXeVPncj7s6',
    slug: 'chatgpt-images-2-0-reasoning-prompts',
    toolName: 'ChatGPT Images 2.0 Reasoning',
    title: 'ChatGPT Images 2.0: Multi-Step Reasoning Before Pixels are Rendered',
    category: 'image-generation',
    pricing: 'freemium',
    pricingDetails: 'Available on ChatGPT Plus and Team accounts',
    toolUrl: 'https://chatgpt.com/',
    description: 'OpenAI\'s ChatGPT Images 2.0 doesn\'t just map text to pixels—it thinks first. It plans lighting, perspective, and typography before rendering, enabling perfect text rendering on signs and intricate spatial compositions.',
    promptTitle: 'Flawless Typography & Composition Visual Prompt',
    promptText: 'High-end coffee shop storefront in Tokyo at dusk. Beautiful wooden signage with the exact text "THE FUTURE GUY" carved in gold leaf letters. Warm glowing interior lights, barista visible through clear window, rainy pavement reflection, 8k photo.',
    instructions: [
      'Open ChatGPT and choose the newest image generation pipeline.',
      'Specify exact text strings within quotes for accurate sign rendering.',
      'Enjoy crisp, legible typography on packaging, signs, and apparel.'
    ],
    exampleOutput: 'Photorealistic Tokyo coffee shop with perfectly rendered, sharp gold lettering on the sign.'
  },
  // 64
  {
    shortcode: 'DWqGwQZFTFN',
    slug: 'biological-vs-machine-intelligence',
    toolName: 'Neuromorphic Intelligence Analysis',
    title: 'Your Brain Runs on 12 Watts: Biological vs Machine Compute Efficiency',
    category: 'research',
    pricing: 'free',
    pricingDetails: 'Scientific analysis & essay',
    toolUrl: '',
    description: 'The human brain performs trillion-parameter contextual leaps and generates creative epiphanies on just 12 watts of energy. Compare this biological miracle to the megawatt datacenter clusters required to run modern AI models.',
    promptTitle: 'Energy Efficiency in Neural Computing Essay',
    promptText: 'Write a compelling, thought-provoking essay comparing the biological energy efficiency of the human brain with modern GPU datacenters. Explore neuromorphic computing, synaptic pruning, and the future of sustainable AI.',
    instructions: [
      'Read the scientific reflection on compute vs biology.',
      'Run the prompt to explore neuromorphic hardware architectures.',
      'Incorporate energy-aware thinking into your own software architectures.'
    ],
    exampleOutput: 'An inspiring, scientifically sound essay on biological energy efficiency and neuromorphic hardware.'
  },
  // 65
  {
    shortcode: 'DW6mkILDn15',
    slug: 'anthropic-enterprise-safety-framework',
    toolName: 'Anthropic Enterprise Safety Architecture',
    title: 'Anthropic\'s Restricted Frontier Security: Why It Wasn\'t Publicly Released',
    category: 'research',
    pricing: 'free',
    pricingDetails: 'Security whitepaper breakdown',
    toolUrl: 'https://anthropic.com/',
    description: 'An analysis of Anthropic\'s restricted enterprise safety evaluations. Discover why frontier models undergo rigorous cyber defense testing and biological threat screening with global institutions before general release.',
    promptTitle: 'AI Red-Teaming & Threat Model Framework',
    promptText: 'Develop a red-teaming checklist for an enterprise LLM deployment. Outline prompt injection vectors, indirect data poisoning methods, data exfiltration risks, and recommended guardrail mitigation layers.',
    instructions: [
      'Study the security whitepaper summary.',
      'Deploy defense-in-depth safety layers in your LLM application architecture.',
      'Conduct regular automated red-teaming runs on prompt endpoints.'
    ],
    exampleOutput: 'Comprehensive enterprise red-teaming checklist with 5 vulnerability vectors and guardrail configs.'
  },
  // 66
  {
    shortcode: 'DXMWG09DaXm',
    slug: 'ai-viva-technical-exam-simulator',
    toolName: 'AI Viva & Technical Exam Coach',
    title: 'Ace Your College Viva & Technical Interviews with This AI Simulator',
    category: 'coding',
    pricing: 'free',
    pricingDetails: 'Free prompt setup on Google AI Studio or Claude',
    toolUrl: 'https://aistudio.google.com/',
    description: 'Nervous about your college viva or technical hiring interview? This prompt configures an AI examiner that grills you with probing follow-up questions, tests edge cases, and grades your answers objectively.',
    promptTitle: 'Strict Engineering Professor Viva Simulator',
    promptText: 'Act as a strict, knowledgeable computer science professor conducting an oral viva exam on Operating Systems (process scheduling, virtual memory, deadlocks). Ask me one challenging question at a time. Evaluate my answer honestly and follow up.',
    instructions: [
      'Select your subject (Operating Systems, DBMS, System Design).',
      'Start the viva simulation and answer each question in your own words.',
      'Receive constructive critiques and targeted areas for improvement.'
    ],
    exampleOutput: 'Rigorous oral exam simulation that tests your actual conceptual understanding under pressure.'
  },
  // 67
  {
    shortcode: 'DXOlWi-juLn',
    slug: 'private-second-brain-ai-system',
    toolName: 'Private Second Brain AI System',
    title: 'Build a Fully Private Second Brain with Local Embeddings & Obsidian',
    category: 'productivity',
    pricing: 'free',
    pricingDetails: '100% Free & Local Open Source Stack',
    toolUrl: 'https://obsidian.md/',
    description: 'Keep your personal journal, project notes, and company secrets 100% private. Learn how to connect Obsidian with Ollama and local vector embeddings so you can chat with your second brain completely offline.',
    promptTitle: 'Personal Knowledge Base Synthesis Prompt',
    promptText: 'Search through my local notes for mentions of "Product Marketing Strategy". Synthesize all ideas into a cohesive strategic document, noting contradictions between earlier notes and current plans.',
    instructions: [
      'Install Obsidian and the Smart Connections community plugin.',
      'Run Ollama with a local embedding model (nomic-embed-text).',
      'Query your personal notes with instant semantic retrieval and zero cloud upload.'
    ],
    exampleOutput: 'Semantic synthesis of your personal notes with direct links to individual markdown files.'
  },
  // 68
  {
    shortcode: 'DXrkkMwieIM',
    slug: 'garry-tan-boris-cherny-claude-setup',
    toolName: 'Garry Tan & Boris Cherny Claude Setups',
    title: 'How Tech Leaders Garry Tan & Boris Cherny Configure Claude Code',
    category: 'coding',
    pricing: 'free',
    pricingDetails: 'Terminal configurations and workflow breakdown',
    toolUrl: 'https://github.com/',
    description: 'Learn the exact terminal configurations, custom slash commands, and multi-file debugging tactics used by Y Combinator\'s Garry Tan and core Claude engineer Boris Cherny to build software at superhuman speed.',
    promptTitle: 'High-Velocity Multi-File Refactoring Command',
    promptText: 'Audit all files in the src/api directory. Standardize error responses to use our AppError class, ensure all async functions have proper try/catch blocks with logging, and update corresponding integration tests.',
    instructions: [
      'Review the workflow habits of top Silicon Valley developers.',
      'Configure auto-approvals for read-only commands in Claude Code.',
      'Leverage multi-file refactoring passes to eliminate repetitive chores.'
    ],
    exampleOutput: 'Terminal log showing synchronized updates across 6 API route files and test fixtures.'
  },
  // 69
  {
    shortcode: 'DXZJQxcgfqQ',
    slug: 'claude-max-pro-oss-integration',
    toolName: 'Claude Max Open Source Integration',
    title: 'Claude Max & Pro: How to Connect High-Limit Tiers to Open Source Tools',
    category: 'coding',
    pricing: 'freemium',
    pricingDetails: 'Requires Claude subscription or developer API access',
    toolUrl: 'https://claude.ai/',
    description: 'Anthropic\'s high-limit tiers give power developers the bandwidth needed for heavy daily coding. Discover how to safely connect your credentials with open-source CLI agents and local developer IDE extensions.',
    promptTitle: 'Autonomous Architecture Scaffold in Local Repo',
    promptText: 'Scaffold a production Next.js 15 app router template with Tailwind CSS v4, Lucide icons, Supabase auth helpers, and clean server actions. Include full directory structure and sample route handlers.',
    instructions: [
      'Set up your developer API key or authorized session.',
      'Connect your CLI tool with your high-limit tier.',
      'Execute large repository scaffolding without hitting rate limits.'
    ],
    exampleOutput: 'Complete directory scaffold with configured Next.js app router and server actions.'
  },
  // 70
  {
    shortcode: 'DWs-dyQD6PR',
    slug: 'anthropic-subscription-api-transition',
    toolName: 'Anthropic Subscription Policy Guide',
    title: 'Anthropic Email Update: What Developers Need to Know About API Access',
    category: 'coding',
    pricing: 'paid',
    pricingDetails: 'Direct developer API billing per million tokens',
    toolUrl: 'https://anthropic.com/',
    description: 'Anthropic quietly updated its terms to clarify that web consumer subscriptions will no longer subsidize high-volume third-party wrappers. Learn how to transition smoothly to pay-as-you-go API keys with cost limits.',
    promptTitle: 'API Cost Optimization & Caching Implementation',
    promptText: 'Implement prompt caching in an Anthropic TypeScript API call. Mark large static system prompts and documentation with type: "ephemeral" to reduce input token costs by up to 90%.',
    instructions: [
      'Open your Anthropic Console at console.anthropic.com.',
      'Create an API key with explicit monthly spend limits to prevent surprises.',
      'Enable prompt caching on your system prompts to cut token expenses drastically.'
    ],
    exampleOutput: 'TypeScript code snippet demonstrating proper Anthropic prompt caching implementation.'
  },
  // 71
  {
    shortcode: 'DXTCb-2gdRD',
    slug: 'ai-solutions-architect-tech-stack-roadmap',
    toolName: 'AI Solutions Architect Roadmap',
    title: 'From Junior Coder to AI Solutions Architect: The Complete Tech Roadmap',
    category: 'coding',
    pricing: 'free',
    pricingDetails: 'Free developer roadmap guide',
    toolUrl: 'https://roadmap.sh/',
    description: 'One ordinary developer armed with modern agentic tools and architectural skills can deliver the output of an entire solutions team. Follow this clear roadmap covering vector databases, orchestration, and evaluation.',
    promptTitle: 'AI Enterprise Architecture Specification Document',
    promptText: 'Draft an architectural design document for an AI knowledge retrieval platform. Include data ingestion pipeline, chunking and embedding service, vector store selection criteria, LLM gateway, and monitoring telemetry.',
    instructions: [
      'Follow the step-by-step roadmap milestones.',
      'Build 3 capstone projects: a hybrid RAG engine, an MCP agent, and an automated evaluator.',
      'Showcase your architectural design docs publicly to attract senior roles.'
    ],
    exampleOutput: 'Comprehensive architecture design document with system diagrams and component interfaces.'
  },
  // 72
  {
    shortcode: 'DWlGcfIgbnf',
    slug: 'emergent-autonomous-app-builder',
    toolName: 'Emergent Autonomous App Builder',
    title: 'Emergent: Describe Your App in Plain English, Deploy Full-Stack Software',
    category: 'coding',
    pricing: 'freemium',
    pricingDetails: 'Freemium tier available for indie builders',
    toolUrl: 'https://emergent.sh/',
    description: 'Emergent reached $100M ARR in just 8 months by turning natural language descriptions into fully tested, deployed cloud software. Discover how vibe coding is replacing traditional drag-and-drop website builders.',
    promptTitle: 'Complete SaaS MVP Specification Prompt',
    promptText: 'Describe a complete SaaS micro-tool: user uploads a CSV of real estate listings, the system computes ROI metrics, formats a PDF executive summary, and emails it to the user with Stripe payment integration.',
    instructions: [
      'Navigate to the Emergent platform.',
      'Type your product specification in plain English.',
      'Review the generated code, automated unit tests, and live cloud deployment preview.'
    ],
    exampleOutput: 'Fully deployed cloud application with functional frontend, API, and database.'
  },
  // 73
  {
    shortcode: 'DXYvd2YoGsz',
    slug: 'vercel-v0-generative-ui-builder',
    toolName: 'Vercel v0 Generative UI',
    title: 'Vercel v0: Instant Production-Ready React & Tailwind Components',
    category: 'design',
    pricing: 'freemium',
    pricingDetails: 'Free monthly generation credits',
    toolUrl: 'https://v0.dev/',
    description: 'Turn your design ideas into clean, semantic React code in seconds. Vercel v0 generates modular components using modern Tailwind CSS and Lucide React icons, ready to copy straight into your Next.js project.',
    promptTitle: 'Modern Bento-Grid Analytics Dashboard',
    promptText: 'Create a responsive bento-grid analytics dashboard for an AI SaaS application. Include 4 stat cards with sparkline trend charts, a recent activity feed, and a quick actions menu. Use clean neutral styling.',
    instructions: [
      'Go to v0.dev and enter your component requirements.',
      'Iterate on specific sections by clicking and describing changes.',
      'Copy the component code directly into your React/Next.js repository.'
    ],
    exampleOutput: 'Clean, modular React component code utilizing modern Tailwind utility classes.'
  },
  // 74
  {
    shortcode: 'DXLjMUTmQwV',
    slug: 'ai-automation-impact-engineering-teams',
    toolName: 'AI Engineering Impact Analysis',
    title: 'The Real Impact of AI on Software Teams: Headcount, Speed & Velocity',
    category: 'research',
    pricing: 'free',
    pricingDetails: 'Industry analytical report',
    toolUrl: '',
    description: 'They said AI couldn\'t replace engineering workflows—until companies began shipping 10x more features with smaller, elite teams. An honest analysis of engineering velocity metrics, layoffs, and emerging roles.',
    promptTitle: 'Engineering Velocity & Tooling ROI Audit',
    promptText: 'Conduct an ROI analysis of adopting AI coding assistants across an 8-person engineering team. Calculate time saved on boilerplate, PR reviews, and unit test generation versus subscription costs.',
    instructions: [
      'Examine the shifting landscape of modern engineering orgs.',
      'Use this prompt to audit where your engineering hours are actually spent.',
      'Shift team focus toward architectural design, security audits, and product strategy.'
    ],
    exampleOutput: 'Detailed ROI spreadsheet analysis projecting 32% faster sprint velocity and reduced tech debt.'
  },
  // 75
  {
    shortcode: 'DWY8JNMmew8',
    slug: 'global-ai-founders-deepseek-landscape',
    toolName: 'Global AI Founders Landscape',
    title: 'Behind the Scenes of Global AI Startups: Exits, Sanctions & Open Weights',
    category: 'research',
    pricing: 'free',
    pricingDetails: 'Investigative narrative & business analysis',
    toolUrl: '',
    description: 'The untold narrative of startup founders navigating global compute sanctions, model acquisitions, and open-weights releases. Learn how resource constraints breed architectural breakthroughs like DeepSeek.',
    promptTitle: 'Open-Weights vs Closed-Weights Business Strategy',
    promptText: 'Analyze the competitive defensibility of deploying self-hosted open-weights models (DeepSeek, Llama) versus building on proprietary API endpoints. Compare cost curves, data privacy, and latency tradeoffs.',
    instructions: [
      'Read the case study on capital efficiency in AI startups.',
      'Evaluate whether your tech stack should prioritize open or closed models.',
      'Architect your systems with model-agnostic abstraction layers.'
    ],
    exampleOutput: 'Strategic framework evaluating privacy, latency, and TCO for enterprise AI adoption.'
  },
  // 76
  {
    shortcode: 'DWib3EVku5-',
    slug: '2026-ai-agentic-ops-roadmap-pdf',
    toolName: '2026 AI Agentic Ops Learning Roadmap',
    title: 'Free PDF Download: The Complete 2026 AI Automation & Agentic Ops Guide',
    category: 'productivity',
    pricing: 'free',
    pricingDetails: 'Free downloadable curriculum & workflow blueprints',
    toolUrl: '',
    description: 'Master the high-demand skills of 2026: n8n workflow automation, Claude autonomous agents, Lovable web generation, vector databases, and LLMOps. Download the complete visual roadmap to guide your learning.',
    promptTitle: 'End-to-End n8n Agent Workflow Blueprint',
    promptText: 'Design an n8n automation workflow that ingests customer support tickets via webhook, classifies urgency with an LLM, queries an internal vector store for documentation, and drafts a suggested response in Slack.',
    instructions: [
      'Download the visual PDF roadmap.',
      'Set up your local n8n instance using Docker.',
      'Build your first autonomous multi-agent pipeline following the guide.'
    ],
    exampleOutput: 'Complete n8n JSON workflow configuration ready to import into your automation engine.'
  },
  // 77
  {
    shortcode: 'DWPKpnDk6sk',
    slug: 'kimi-ai-presentation-deck-builder',
    toolName: 'Kimi AI Presentation Builder',
    title: 'From Blank Slide to "Who Made This?" in Seconds with Kimi AI',
    category: 'productivity',
    pricing: 'freemium',
    pricingDetails: 'Free tier with generous daily slide generation credits',
    toolUrl: 'https://kimi.ai/',
    description: 'Creating high-stakes presentations doesn\'t have to consume your weekend. Kimi AI transforms rough notes, outlines, and spreadsheets into beautifully structured, visually engaging presentation decks in seconds.',
    promptTitle: 'Executive Pitch Deck Outline & Slide Content',
    promptText: 'Create a 10-slide investor pitch deck for a B2B AI analytics startup. Include problem slide, solution, market size (TAM/SAM/SOM), business model, traction metrics, competitive advantage, and ask.',
    instructions: [
      'Open Kimi AI at kimi.ai.',
      'Paste your draft outline or project brief.',
      'Review the generated presentation slides and export as PowerPoint or PDF.'
    ],
    exampleOutput: 'Complete 10-slide executive deck structure with compelling headlines and bullet points.'
  },
  // 78
  {
    shortcode: 'DYCeTEtxly8',
    slug: 'multi-llm-council-collaborative-architecture',
    toolName: 'Multi-LLM Council Architecture',
    title: 'Build a Multi-LLM Council: Claude, ChatGPT & Gemini Working Together',
    category: 'coding',
    pricing: 'free',
    pricingDetails: 'Free open source architectural blueprint',
    toolUrl: 'https://github.com/',
    description: 'Why rely on a single model when you can convene a council? In this architecture, Claude drafts the code, ChatGPT critiques logic bugs, and Gemini fact-checks citations, producing near-zero hallucination rates.',
    promptTitle: 'Multi-Agent Code Peer Review Protocol',
    promptText: 'Act as the Moderator of an LLM Council. Present this code to Model A (Architect) for refactoring, then prompt Model B (Security Auditor) to attack it, and finally synthesize the hardened output.',
    instructions: [
      'Set up an orchestration script connecting to your favorite LLM APIs.',
      'Configure the sequential debate protocol defined in the repository.',
      'Enjoy thoroughly stress-tested code and zero obvious oversights.'
    ],
    exampleOutput: 'Multi-pass code verification transcript showing security fixes introduced during debate.'
  },
  // 79
  {
    shortcode: 'DWngUauDnGD',
    slug: 'frontier-system-prompts-archive',
    toolName: 'Frontier System Prompts Archive',
    title: 'Leaked System Prompts: How OpenAI and Anthropic Prompt Their Models',
    category: 'coding',
    pricing: 'free',
    pricingDetails: 'Free educational GitHub repository',
    toolUrl: 'https://github.com/',
    description: 'Dissect the exact system instructions, ethical boundaries, and tool-calling schemas used internally by frontier AI labs. Learn how industry leaders craft prompts that maintain razor-sharp focus and strict formatting.',
    promptTitle: 'Industrial-Strength System Prompt Template',
    promptText: 'Write a comprehensive system prompt for an autonomous coding assistant. Define operational constraints, tool-calling behavior, rules for asking clarifying questions, and strict prohibition of hallucinated package names.',
    instructions: [
      'Explore the system prompts repository on GitHub.',
      'Study the constraint patterns top AI labs use to prevent hallucinations.',
      'Incorporate these proven guidelines into your own application system prompts.'
    ],
    exampleOutput: 'Battle-tested 400-word system prompt with strict negative constraints and tool execution rules.'
  },
  // 80
  {
    shortcode: 'DWWN8QGjPKe',
    slug: 'rise-and-fall-of-openai-sora',
    toolName: 'OpenAI Sora Evolution & Economics',
    title: 'The Rise and Fall of Sora: Why AI Video Generation Hit an Economic Wall',
    category: 'video-generation',
    pricing: 'free',
    pricingDetails: 'Industry analytical retrospective',
    toolUrl: 'https://openai.com/',
    description: 'When OpenAI first revealed Sora, everyone believed Hollywood was about to be automated overnight. Discover the immense compute costs, temporal consistency bugs, and business model pivots that shaped generative video.',
    promptTitle: 'Generative Video Unit Economics Analysis',
    promptText: 'Break down the estimated GPU compute cost per minute of generating 1080p diffusion video versus traditional CGI rendering. Analyze when generative video becomes cost-effective for commercial marketing.',
    instructions: [
      'Read the investigative retrospective on AI video compute barriers.',
      'Evaluate whether short-form video generation aligns with your creator budget.',
      'Focus on hybrid workflows combining generative B-roll with real human hosts.'
    ],
    exampleOutput: 'Financial cost-benefit model comparing AI video inference costs with traditional video production.'
  },
  // 81
  {
    shortcode: 'DWp8pL6E9g1',
    slug: 'ai-code-debugger-root-cause-explainer',
    toolName: 'AI Root Cause Debugger',
    title: 'Stop Spending 3 Days on Bugs: AI Root Cause Debugger & Stack Trace Fixer',
    category: 'coding',
    pricing: 'free',
    pricingDetails: 'Free debugging prompt workflow',
    toolUrl: 'https://claude.ai/',
    description: 'Life is too short for a coder to spend 3 days staring at the screen asking "why is this not working?". Learn how to feed full stack traces, memory profiles, and minimal reproducible examples to AI for instant root cause diagnosis.',
    promptTitle: 'Stack Trace Root Cause Diagnostic Prompt',
    promptText: 'Analyze this full application stack trace and the relevant function code. Pinpoint the exact line causing the crash, explain the underlying memory/concurrency mechanism responsible, and provide the minimal patch to fix it.',
    instructions: [
      'Copy the complete terminal stack trace and the failing code snippet.',
      'Paste into Claude 3.7 or ChatGPT with this diagnostic prompt.',
      'Apply the verified patch and verify tests pass in your terminal.'
    ],
    exampleOutput: 'Root cause isolation explaining asynchronous event loop starvation with a clean async/await fix.'
  },
  // 82
  {
    shortcode: 'DW_cNdbjzIH',
    slug: 'claude-code-cli-terminal-setup-guide',
    toolName: 'Claude Code CLI Setup Guide',
    title: 'Claude Code Setup Guide: How to Install, Configure & Master the CLI',
    category: 'coding',
    pricing: 'free',
    pricingDetails: 'Free setup video and configuration files',
    toolUrl: 'https://claude.ai/',
    description: 'Vibe coding reaches its final form when your AI lives directly in your terminal. Follow this step-by-step tutorial to install Claude Code, configure environment variables, authorize MCP servers, and set up custom rules.',
    promptTitle: 'Claude Code Project Rules Configuration (.clauderc)',
    promptText: 'Generate a comprehensive .clauderc configuration file for a TypeScript full-stack project. Include guidelines on code formatting, preferred libraries, test runner commands, and strict security rules.',
    instructions: [
      'Install the Claude Code CLI using npm install -g @anthropic-ai/claude-code.',
      'Authenticate with your Anthropic account in your terminal.',
      'Add custom project instructions in CLAUDE.md to keep your agent aligned.'
    ],
    exampleOutput: 'A complete CLAUDE.md guidelines file tailored for modern React and Node.js codebases.'
  },
  // 83
  {
    shortcode: 'DWa0XTqFZky',
    slug: 'avoid-ai-rate-limits-prompt-hygiene',
    toolName: 'Rate Limit Avoidance Prompt Hygiene',
    title: 'Most People Use AI Wrong: How to Never Hit Chatbot Rate Limits Again',
    category: 'productivity',
    pricing: 'free',
    pricingDetails: 'Productivity guidelines and session templates',
    toolUrl: 'https://claude.ai/',
    description: 'Most users trigger hourly rate limits within 10 prompts because they dump raw unorganized text into existing long threads. Learn session hygiene, prompt decomposition, and model switching habits that give you all-day uptime.',
    promptTitle: 'Task Decomposition & Prompt Splitting Plan',
    promptText: 'I need to build a complex feature: [FEATURE]. Break this project down into 4 isolated, self-contained sub-tasks with clear inputs and outputs so each can be executed in a fresh, lightweight chat thread.',
    instructions: [
      'Decompose large requests into discrete, modular steps.',
      'Start a fresh chat thread for each sub-task to keep token weight near zero.',
      'Combine the verified outputs into your main codebase.'
    ],
    exampleOutput: '4-step modular execution plan that prevents chat thread bloating and rate limit lockouts.'
  },
  // 84
  {
    shortcode: 'DWY4C_VFWWA',
    slug: 'metaverse-to-generative-ai-pivot',
    toolName: 'Tech Industry Capital Pivot Analysis',
    title: 'From Virtual Worlds to Generative AI: How Big Tech Pivoted $100B+',
    category: 'research',
    pricing: 'free',
    pricingDetails: 'Business strategy case study',
    toolUrl: '',
    description: 'In 2021, Mark Zuckerberg rebranded Facebook to Meta with a multi-billion dollar bet on virtual reality. By 2024, the entire tech industry pivoted resources toward open-weights AI and compute clusters. Discover the economics behind the pivot.',
    promptTitle: 'Big Tech Strategic Capital Allocation Case Study',
    promptText: 'Analyze the strategic pivot of Silicon Valley capital from VR/Metaverse infrastructure (2021) to Generative AI datacenters (2024-2026). Detail the factors of consumer adoption, developer ecosystem, and revenue timelines.',
    instructions: [
      'Read the business strategy retrospective.',
      'Use this prompt to examine shifting technology investment cycles.',
      'Align your career skills with sectors receiving massive institutional capital.'
    ],
    exampleOutput: 'Analytical case study detailing the macroeconomic shift from VR headsets to GPU compute clusters.'
  },
  // 85
  {
    shortcode: 'DW1YeLHjeNq',
    slug: 'google-opal-autonomous-enterprise-agent',
    toolName: 'Google Opal Enterprise Automation',
    title: 'Google Drops Opal: The Multi-Agent Workflow Engine That Changes Everything',
    category: 'automation',
    pricing: 'freemium',
    pricingDetails: 'Free developer preview via Google Cloud',
    toolUrl: 'https://opal.google/',
    description: 'The automation world is undergoing a seismic shift. Google Opal connects your spreadsheets, internal databases, Slack channels, and customer support desks into collaborative, autonomous multi-agent workflows.',
    promptTitle: 'Google Opal Enterprise Agent Flow Designer',
    promptText: 'Design a Google Opal multi-agent workflow for an e-commerce refund request. Specify the triage agent, fraud verification agent, database lookup agent, and final customer email generation step.',
    instructions: [
      'Access Google Opal on the Google Cloud developer console.',
      'Connect your workspace data sources (Sheets, BigQuery, Gmail).',
      'Deploy autonomous agents with human-in-the-loop approval thresholds.'
    ],
    exampleOutput: 'Visual workflow schema defining 4 specialized agents collaborating on customer operations.'
  },
  // 86
  {
    shortcode: 'DWUTFsBFWAE',
    slug: 'claude-prism-latex-note-typesetter',
    toolName: 'Claude + Prism LaTeX Note Typesetter',
    title: 'Turn Raw Handwritten Notes into Publication-Grade LaTeX PDFs with AI',
    category: 'productivity',
    pricing: 'free',
    pricingDetails: 'Free academic workflow tools',
    toolUrl: 'https://claude.ai/',
    description: 'This is how students and researchers should actually study in 2026. Photograph your messy handwritten lecture notes or whiteboard sketches, and let Claude + Prism format them into gorgeous, publication-ready LaTeX PDFs.',
    promptTitle: 'Handwritten Math to Clean LaTeX Document',
    promptText: 'Transcribe these photographed math lecture notes into a complete, compilable LaTeX document. Use amsmath and tikz for diagrams. Format all theorems, proofs, and definitions in structured colored boxes.',
    instructions: [
      'Snap a photo of your handwritten lecture notes.',
      'Upload the image to Claude with this LaTeX prompt.',
      'Compile the generated .tex code in Overleaf or TeXShop to produce a pristine PDF.'
    ],
    exampleOutput: 'Compilable LaTeX document with beautiful theorem environments and typeset equations.'
  },
  // 87
  {
    shortcode: 'DYd96bzhQeE',
    slug: 'ai-facial-harmony-aesthetic-styling-prompts',
    toolName: 'AI Facial Harmony & Styling Prompts',
    title: 'Upload One Photo, Get Complete AI Face Analysis & Aesthetic Styling',
    category: 'image-generation',
    pricing: 'free',
    pricingDetails: 'Free prompt templates for Gemini and Claude Vision',
    toolUrl: 'https://gemini.google.com/',
    description: 'Upload a single portrait photo and receive an exhaustive facial harmony report: exact face shape classification, most flattering hairstyles, color season palette (warm autumn vs cool winter), and ideal glasses frame geometry.',
    promptTitle: 'Facial Geometry & Aesthetic Color Harmony Analysis',
    promptText: 'Analyze this portrait photo objectively. Classify face shape (oval, square, heart, diamond), determine seasonal color palette (spring/summer/autumn/winter), and recommend 3 flattering hairstyles and eyewear frame shapes.',
    instructions: [
      'Take a well-lit, neutral-expression selfie looking straight at the camera.',
      'Upload the image to Google Gemini or Claude 3.7 with this prompt.',
      'Review your comprehensive facial analysis and personalized styling guide.'
    ],
    exampleOutput: 'Personalized aesthetic dossier recommending rectangular matte frames and textured hairstyles.'
  },
  // 88
  {
    shortcode: 'DYKOj59BJdi',
    slug: 'hidden-prompt-libraries-directory',
    toolName: 'Curated Hidden Prompt Libraries',
    title: 'These Prompt Websites Feel Illegal to Know: Secret AI Prompt Vaults',
    category: 'ai-writing',
    pricing: 'free',
    pricingDetails: 'Free web directories and prompt repositories',
    toolUrl: '',
    description: 'Stop staring at an empty chat box wondering what to write. Discover the web\'s most valuable, underground prompt repositories containing battle-tested formulas for copywriting, full-stack coding, and Midjourney visuals.',
    promptTitle: 'High-Impact Copywriting Formula Injector',
    promptText: 'Rewrite this product landing page copy using the classic PAS (Problem-Agitate-Solution) copywriting framework. Ensure the headline grabs attention, agitates the latent pain point, and presents the tool as the obvious remedy.',
    instructions: [
      'Bookmark the recommended prompt vault websites.',
      'Search by specific use case (cold outreach, code refactoring, portrait photography).',
      'Copy verified templates to produce 10x better outputs instantly.'
    ],
    exampleOutput: 'High-converting landing page copy structured cleanly with the PAS copywriting framework.'
  },
  // 89
  {
    shortcode: 'DYZjOq6xNEy',
    slug: 'claude-deep-research-skill',
    toolName: 'Claude Deep Research Agent Skill',
    title: 'This Claude Deep Research Skill Is Actually Insane: Full-Team Research',
    category: 'research',
    pricing: 'free',
    pricingDetails: 'Free open source skill for Claude Code and coding agents',
    toolUrl: 'https://github.com/',
    description: 'Give it one broad topic, and it investigates like a full analyst team: forms sub-hypotheses, searches across hundreds of academic and news sources, cross-verifies conflicting data, and synthesizes an authoritative report.',
    promptTitle: 'Autonomous Deep Investigative Research Protocol',
    promptText: 'Investigate the market landscape for AI code editors in 2026. Break down market shares, key technological differentiators (local indexing vs cloud LLMs), developer sentiment, and enterprise pricing models with full citations.',
    instructions: [
      'Install the deep research skill into your Claude workspace.',
      'Provide your research topic and depth requirements.',
      'Read the generated comprehensive analytical brief with verified references.'
    ],
    exampleOutput: 'Exhaustive 12-page research report with comparative matrices and verified data sources.'
  },
  // 90
  {
    shortcode: 'DXE0_r8ia1S',
    slug: 'caveman-claude-minimalist-prompt-framework',
    toolName: 'Caveman Claude Minimalist Framework',
    title: 'Caveman Claude: Cut Polite AI Filler, Save 40% Tokens and Latency',
    category: 'coding',
    pricing: 'free',
    pricingDetails: 'Free prompt framework for all models',
    toolUrl: 'https://claude.ai/',
    description: 'AI models love writing polite filler: "Certainly! I would be happy to help you with that...". The Caveman prompt framework forces models to drop pleasantries and respond in dense, telegraphic technical prose, saving 40% tokens and latency.',
    promptTitle: 'Caveman Mode System Instruction',
    promptText: 'Adopt Caveman mode: Respond in dense, telegraphic sentences. Drop all pleasantries, introductions, and polite conclusions. Output only actionable code, concise explanations, and direct answers. High signal, zero noise.',
    instructions: [
      'Add the Caveman prompt instruction to your system prompt or custom instructions.',
      'Watch responses arrive twice as fast without repetitive introductory fluff.',
      'Save thousands of tokens on heavy daily terminal coding sessions.'
    ],
    exampleOutput: 'Terse, high-density technical answer delivering the solution with zero wasted tokens.'
  }
];

// Set of Instagram post shortcodes that are Carousels / Prompt Sets
const carouselShortcodes = new Set([
  'DfMTJ59GaT1', // 1: ChatGPT Photoshoot Carousel
  'DandSxNmatl', // 2: GPT-5.6 Sol, Terra, Luna model suite carousel
  'DaAfo00mQtq', // 13: LinkedIn Profile Picture Prompts Part 2 Carousel
  'DaR4MTmmbT0', // 16: Gemini x Nano Banana Viral Visuals Carousel
  'DZVDkEZjfHm', // 25: Gemini Executive Portrait Prompts Carousel
  'DZgyJNXiFwO', // 26: Times Square Billboard AI Prompt Carousel
  'DZPFVK0NxQ4', // 28: Vedic Kundali & Astrology Prompt
  'DZP3vb_N7x1', // 31: Ghatak Prompt Optimizer
  'DZKeQZcNZIf', // 32: AI Detector Bypass Humanizer Prompts
  'DcUOC8rk7qP', // 35: Google Gemini Student Plan Carousel
  'DYwx1_KtrNy', // 38: Claude Context & Prompt Tokens Guide
  'DZAMMZpjVnJ', // 43: Gemini Editorial Profile Picture Prompts Carousel
  'DZkEb-RCod-', // 45: Nano Banana Photoshoot Part 1 Carousel
  'DX3KBX3Nc5h', // 47: Astrology & Kundali Report Maker Prompt
  'DYTdTgjhOrq', // 48: System Prompt Optimizer Formula
  'DYUrTn0g-k8', // 49: Ghatak Browser Prompt Assistant
  'DYJaxfaSoIQ', // 53: Mothers Day Family Portrait Prompt
  'DXRFOG6GUK5', // 56: Claude Design & Opus 4.7 Multi-Modal Carousel
  'DXeVPncj7s6', // 63: ChatGPT Images 2.0 Reasoning & Prompts Pack
  'DWPKpnDk6sk', // 77: Kimi AI Presentation Slide Deck Carousel
  'DYCeTEtxly8', // 78: Multi-LLM Council Architecture & System Prompts
  'DWngUauDnGD', // 79: Leaked Frontier System Prompts Archive
  'DWa0XTqFZky', // 83: Prompt Hygiene & Rate Limit Avoidance Guide
  'DYd96bzhQeE', // 87: AI Face Analysis & Styling Prompts Carousel
  'DYKOj59BJdi', // 88: Secret AI Prompt Vaults & Directories
  'DXE0_r8ia1S', // 90: Caveman Claude Minimalist Prompt Framework
]);

// Helper to fill all 90 items with high quality, human-crafted data
function generateAll90Posts() {
  const allReels = [];
  
  rawData.forEach((item, index) => {
    const postNumber = index + 1;
    const match = item.url.match(/\/(?:p|reel)\/([^\/]+)/);
    const shortcode = match ? match[1] : `post-${postNumber}`;

    const isCarousel = carouselShortcodes.has(shortcode);
    const postType = isCarousel ? 'carousel' : 'reel';
    const contentType = isCarousel ? 'prompt' : 'tool';
    
    // Find matching entry in our curated table
    const curated = postMetaCatalog.find(c => c.shortcode === shortcode);
    if (!curated) {
      console.warn(`Missing curated entry for shortcode: ${shortcode} (item #${postNumber})`);
    }

    const lines = (item.caption || '').split('\n').map(l => l.trim()).filter(Boolean);
    const firstLine = lines[0] || 'AI Discovery & Workflow';
    const cleanFirstLine = firstLine.replace(/[^\w\s-]/g, '').trim();

    const title = curated ? curated.title : `${cleanFirstLine} AI Guide & Prompt Breakdown`;
    const toolName = curated ? curated.toolName : cleanFirstLine.split(' ').slice(0, 4).join(' ');
    const slug = curated ? curated.slug : `ai-reel-${shortcode.toLowerCase()}`;
    const description = curated ? curated.description : (lines.slice(0, 2).join(' ').replace(/[^\x20-\x7E]/g, ' ') || 'Featured AI workflow breakdown.');
    const category = curated ? curated.category : 'productivity';
    const pricing = curated ? curated.pricing : 'free';
    const pricingDetails = curated ? curated.pricingDetails : 'Free tier available';
    const toolUrl = curated ? curated.toolUrl : '';
    const promptTitle = curated ? curated.promptTitle : `${toolName} Quick-Start Prompt`;
    const promptText = curated ? curated.promptText : `Act as an expert. Optimize the following workflow for efficiency and quality: [INPUT].`;
    const instructions = curated ? curated.instructions : [
      'Review the breakdown in the Instagram video demonstration.',
      'Copy the prompt or tool configuration below.',
      'Apply to your project workspace or model dashboard.'
    ];
    const exampleOutput = curated ? curated.exampleOutput : `Practical verified workflow tested by @thefutureguyy.ai community.`;

    // Stagger dates so items sort naturally by newest from post 1 to 90
    const baseDate = new Date('2026-11-03T10:00:00Z');
    const itemDate = new Date(baseDate.getTime() - index * 24 * 3600 * 1000);
    const publishedAt = itemDate.toISOString().split('T')[0];

    // Highlight top reels
    const isFeatured = index < 12 || (index % 7 === 0);
    const isTrending = index < 15;

    const reelData = {
      id: `reel-${String(postNumber).padStart(3, '0')}`,
      slug: slug,
      title: title,
      toolName: toolName,
      toolUrl: toolUrl,
      description: description,
      category: category,
      pricing: pricing,
      pricingDetails: pricingDetails,
      postType: postType,
      contentType: contentType,
      instagramReelUrl: item.url,
      instagramReelId: shortcode,
      reelThumbnail: item.displayUrl,
      promptSet: [
        {
          id: `pmt-${String(postNumber).padStart(3, '0')}`,
          title: promptTitle,
          description: promptText,
          instructions: instructions,
          exampleOutput: exampleOutput
        }
      ],
      featured: isFeatured,
      trending: isTrending,
      status: 'published',
      publishedAt: publishedAt,
      seo: {
        title: `${title} | futureclub.tech`,
        description: description.slice(0, 160)
      }
    };

    allReels.push(reelData);
  });

  return allReels;
}

const allReels = generateAll90Posts();
console.log(`Generated ${allReels.length} reel objects.`);

// Write each reel file
for (const reel of allReels) {
  const filePath = path.join(reelsDir, `${reel.slug}.json`);
  fs.writeFileSync(filePath, JSON.stringify(reel, null, 2), 'utf8');
}

console.log(`Successfully wrote ${allReels.length} JSON files into src/data/reels/!`);

// Update collections.json so toolIds and promptIds reference real IDs
const collections = [
  {
    id: "col-001",
    slug: "best-free-ai-tools",
    title: "Best Free & Freemium AI Tools for 2026",
    description: "Hand-picked artificial intelligence tools you can use immediately without entering a credit card.",
    coverImage: "/assets/collections/free-tools.svg",
    toolIds: ["reel-003", "reel-004", "reel-007", "reel-008", "reel-009", "reel-010", "reel-011", "reel-015"],
    promptIds: ["pmt-003", "pmt-004", "pmt-007", "pmt-008", "pmt-009", "pmt-010"],
    featured: true,
    status: "published",
    publishedAt: "2026-10-20",
    seo: {
      title: "Best Free AI Tools in 2026 (No Credit Card Required) | futureclub.tech",
      description: "Discover top free AI tools for writing, coding, search, and design. Hand-tested and verified free tiers."
    }
  },
  {
    id: "col-002",
    slug: "ai-tools-for-developers",
    title: "Essential AI Tools for Modern Developers",
    description: "The definitive toolkit for software engineers, frontend architects, and full-stack builders.",
    coverImage: "/assets/collections/developers.svg",
    toolIds: ["reel-002", "reel-006", "reel-008", "reel-009", "reel-010", "reel-014", "reel-019", "reel-024"],
    promptIds: ["pmt-002", "pmt-006", "pmt-008", "pmt-009", "pmt-010", "pmt-014"],
    featured: true,
    status: "published",
    publishedAt: "2026-10-22",
    seo: {
      title: "Essential AI Tools for Developers (2026 Guide) | futureclub.tech",
      description: "Curated collection of the best AI code editors, CLI tools, and agent frameworks for modern engineers."
    }
  },
  {
    id: "col-003",
    slug: "instagram-creator-toolkit",
    title: "AI Creator Toolkit for Instagram & Video",
    description: "Everything creators need to write viral scripts, generate B-roll, clean podcast audio, and automate posting.",
    coverImage: "/assets/collections/creators.svg",
    toolIds: ["reel-001", "reel-005", "reel-013", "reel-015", "reel-016", "reel-017", "reel-020", "reel-022"],
    promptIds: ["pmt-001", "pmt-005", "pmt-013", "pmt-015", "pmt-016", "pmt-017"],
    featured: true,
    status: "published",
    publishedAt: "2026-10-24",
    seo: {
      title: "AI Tools for Instagram & Video Creators | futureclub.tech",
      description: "Scale your short-form video content with AI voiceover, script generators, and photographic prompt formulas."
    }
  },
  {
    id: "col-004",
    slug: "high-converting-prompts",
    title: "High-Converting Problem-Solving & Coding Prompts",
    description: "Battle-tested prompts engineered for first-principles reasoning, deep research, and production code.",
    coverImage: "/assets/collections/copywriting.svg",
    toolIds: ["reel-001", "reel-002", "reel-008", "reel-014", "reel-019", "reel-024", "reel-025"],
    promptIds: ["pmt-001", "pmt-002", "pmt-008", "pmt-014", "pmt-019", "pmt-024"],
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
    toolIds: ["reel-003", "reel-009", "reel-010", "reel-011", "reel-012", "reel-015", "reel-018"],
    promptIds: ["pmt-003", "pmt-009", "pmt-010", "pmt-011", "pmt-012", "pmt-015"],
    featured: false,
    status: "published",
    publishedAt: "2026-10-27",
    seo: {
      title: "Best AI Tools for Students & Research (2026) | futureclub.tech",
      description: "Discover ethical and powerful AI tools for college students, thesis research, and study notes."
    }
  },
  {
    id: "col-006",
    slug: "generative-multimedia-suite",
    title: "Generative Media: Image, Video & Voice",
    description: "The ultimate state-of-the-art suite for generating commercial-grade visual and auditory assets.",
    coverImage: "/assets/collections/multimedia.svg",
    toolIds: ["reel-001", "reel-013", "reel-016", "reel-017", "reel-022", "reel-025", "reel-026"],
    promptIds: ["pmt-001", "pmt-013", "pmt-016", "pmt-017", "pmt-022", "pmt-025"],
    featured: false,
    status: "published",
    publishedAt: "2026-10-28",
    seo: {
      title: "Generative Media Suite: Midjourney, Gemini, Nano Banana & Veo",
      description: "Explore the top generative AI tools for producing cinema-grade imagery, studio audio, and accurate captions."
    }
  }
];

fs.writeFileSync(collectionsFile, JSON.stringify(collections, null, 2), 'utf8');
console.log('Updated collections.json with active reel IDs.');
