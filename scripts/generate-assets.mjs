import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.resolve(__dirname, '../public/assets');
const toolsDir = path.join(publicDir, 'tools');
const collectionsDir = path.join(publicDir, 'collections');

fs.mkdirSync(toolsDir, { recursive: true });
fs.mkdirSync(collectionsDir, { recursive: true });

const toolIcons = {
  chatgpt: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="none"><rect width="100" height="100" rx="20" fill="#10a37f"/><path d="M50 20c-16.57 0-30 13.43-30 30s13.43 30 30 30 30-13.43 30-30-13.43-30-30-30zm0 10c11.05 0 20 8.95 20 20s-8.95 20-20 20-20-8.95-20-20 8.95-20 20-20z" fill="#ffffff" fill-opacity="0.9"/></svg>`,
  claude: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="none"><rect width="100" height="100" rx="20" fill="#d97706"/><circle cx="50" cy="50" r="28" stroke="#ffffff" stroke-width="8" stroke-dasharray="16 10"/><circle cx="50" cy="50" r="10" fill="#ffffff"/></svg>`,
  cursor: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="none"><rect width="100" height="100" rx="20" fill="#000000"/><path d="M30 25l45 25-25 5-5 25L30 25z" fill="#ffffff"/></svg>`,
  midjourney: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="none"><rect width="100" height="100" rx="20" fill="#1e293b"/><path d="M25 65l25-40 25 40H25z" stroke="#ffffff" stroke-width="6" stroke-linejoin="round"/><circle cx="50" cy="48" r="8" fill="#38bdf8"/></svg>`,
  perplexity: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="none"><rect width="100" height="100" rx="20" fill="#171717"/><path d="M35 30v40m30-40v40M35 50h30M42 35l16 30m0-30L42 65" stroke="#22d3ee" stroke-width="6" stroke-linecap="round"/></svg>`,
  v0: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="none"><rect width="100" height="100" rx="20" fill="#000000"/><text x="50" y="65" font-family="system-ui, sans-serif" font-size="44" font-weight="900" fill="#ffffff" text-anchor="middle">v0</text></svg>`,
  elevenlabs: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="none"><rect width="100" height="100" rx="20" fill="#000000"/><rect x="36" y="25" width="8" height="50" rx="4" fill="#ffffff"/><rect x="56" y="25" width="8" height="50" rx="4" fill="#ffffff"/></svg>`,
  runway: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="none"><rect width="100" height="100" rx="20" fill="#111827"/><circle cx="50" cy="50" r="28" stroke="#f43f5e" stroke-width="8"/><polygon points="44,38 64,50 44,62" fill="#ffffff"/></svg>`,
  make: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="none"><rect width="100" height="100" rx="20" fill="#6d28d9"/><circle cx="36" cy="50" r="14" fill="#ffffff"/><circle cx="64" cy="50" r="14" fill="#ffffff"/><path d="M36 50h28" stroke="#ffffff" stroke-width="6"/></svg>`,
  notion: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="none"><rect width="100" height="100" rx="20" fill="#000000"/><text x="50" y="68" font-family="serif" font-size="52" font-weight="bold" fill="#ffffff" text-anchor="middle">N</text></svg>`,
  suno: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="none"><rect width="100" height="100" rx="20" fill="#000000"/><circle cx="50" cy="50" r="24" fill="#ea580c"/></svg>`,
  descript: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="none"><rect width="100" height="100" rx="20" fill="#2563eb"/><path d="M35 25h16c14 0 24 10 24 25s-10 25-24 25H35V25z" fill="#ffffff"/><path d="M47 39h4c6 0 10 4 10 11s-4 11-10 11h-4V39z" fill="#2563eb"/></svg>`
};

for (const [key, svg] of Object.entries(toolIcons)) {
  fs.writeFileSync(path.join(toolsDir, `${key}.svg`), svg);
}

const collectionCovers = {
  'free-tools': `<svg viewBox="0 0 600 340" xmlns="http://www.w3.org/2000/svg"><rect width="600" height="340" fill="#18181b"/><circle cx="300" cy="170" r="90" fill="#27272a"/><path d="M260 170l30 30 60-60" stroke="#22c55e" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  'developers': `<svg viewBox="0 0 600 340" xmlns="http://www.w3.org/2000/svg"><rect width="600" height="340" fill="#09090b"/><rect x="180" y="90" width="240" height="160" rx="16" fill="#18181b" stroke="#27272a" stroke-width="4"/><path d="M240 150l-20 20 20 20m120-40l20 20-20 20m-50-50l-20 60" stroke="#3b82f6" stroke-width="8" stroke-linecap="round"/></svg>`,
  'creators': `<svg viewBox="0 0 600 340" xmlns="http://www.w3.org/2000/svg"><rect width="600" height="340" fill="#1c1917"/><circle cx="300" cy="170" r="80" stroke="#e11d48" stroke-width="8"/><polygon points="280,140 335,170 280,200" fill="#e11d48"/></svg>`,
  'copywriting': `<svg viewBox="0 0 600 340" xmlns="http://www.w3.org/2000/svg"><rect width="600" height="340" fill="#0f172a"/><path d="M240 120h120M240 160h120M240 200h80" stroke="#38bdf8" stroke-width="10" stroke-linecap="round"/></svg>`,
  'students': `<svg viewBox="0 0 600 340" xmlns="http://www.w3.org/2000/svg"><rect width="600" height="340" fill="#141417"/><circle cx="300" cy="170" r="70" stroke="#f59e0b" stroke-width="8"/><circle cx="300" cy="170" r="25" fill="#f59e0b"/></svg>`,
  'multimedia': `<svg viewBox="0 0 600 340" xmlns="http://www.w3.org/2000/svg"><rect width="600" height="340" fill="#18141c"/><circle cx="260" cy="160" r="50" fill="#8b5cf6" fill-opacity="0.8"/><circle cx="340" cy="180" r="60" fill="#ec4899" fill-opacity="0.8"/></svg>`
};

for (const [key, svg] of Object.entries(collectionCovers)) {
  fs.writeFileSync(path.join(collectionsDir, `${key}.svg`), svg);
}

console.log('Static SVG assets generated successfully.');
