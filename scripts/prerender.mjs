import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');
const dataDir = path.resolve(rootDir, 'src/data');
const reelsDir = path.join(dataDir, 'reels');

const site = JSON.parse(fs.readFileSync(path.join(dataDir, 'site.json'), 'utf8'));
const collections = JSON.parse(fs.readFileSync(path.join(dataDir, 'collections.json'), 'utf8')).filter((c) => c.status === 'published');
const resources = JSON.parse(fs.readFileSync(path.join(dataDir, 'resources.json'), 'utf8')).filter((r) => r.status === 'published');
const seriesList = JSON.parse(fs.readFileSync(path.join(dataDir, 'series.json'), 'utf8')).filter((s) => s.status === 'published');
const seriesPosts = JSON.parse(fs.readFileSync(path.join(dataDir, 'series-posts.json'), 'utf8')).filter((p) => p.status === 'published');

// Load all individual reels from src/data/reels/
const reelFiles = fs.readdirSync(reelsDir).filter((f) => f.endsWith('.json'));
const reels = reelFiles
  .map((f) => JSON.parse(fs.readFileSync(path.join(reelsDir, f), 'utf8')))
  .filter((r) => r.status === 'published');

const templatePath = path.join(distDir, 'index.html');
if (!fs.existsSync(templatePath)) {
  console.error('dist/index.html does not exist. Run vite build first.');
  process.exit(1);
}
const template = fs.readFileSync(templatePath, 'utf8');

// Import SSR bundle
const ssrBundlePath = path.join(rootDir, 'dist-ssr/entry-server.js');
if (!fs.existsSync(ssrBundlePath)) {
  console.error('dist-ssr/entry-server.js does not exist. Run SSR build first.');
  process.exit(1);
}

const { render } = await import(pathToFileURL(ssrBundlePath).href);

// Core static routes
const routes = [
  {
    url: '/',
    title: `${site.tagline} | ${site.brandName}`,
    description: site.subheadline,
    priority: '1.0',
    changefreq: 'daily',
  },
  {
    url: '/tools',
    title: `AI Tools Directory — Best Verified AI Tools (2026) | ${site.brandName}`,
    description: 'Explore verified AI tools with prompt breakdowns and Instagram reel demonstrations.',
    priority: '0.9',
    changefreq: 'daily',
  },
  {
    url: '/prompts',
    title: `AI Prompt Library — Curated Prompt Sets | ${site.brandName}`,
    description: 'Copy-paste prompt templates used in @thefutureguyy.ai Instagram reels.',
    priority: '0.9',
    changefreq: 'daily',
  },
  {
    url: '/series',
    title: `Original AI Series | 2 Minute me samjo & Deep Dives | ${site.brandName}`,
    description: 'Explore original video & blog series by @thefutureguyy.ai. Fast-track 2-minute visual explainers on frontier AI breakthroughs, neural architectures, and developer mechanics.',
    priority: '0.9',
    changefreq: 'daily',
  },
  {
    url: '/collections',
    title: `Curated AI Collections & Toolkits | ${site.brandName}`,
    description: 'Hand-picked toolkits and prompt collections for developers, content creators, and students.',
    priority: '0.8',
    changefreq: 'weekly',
  },
  {
    url: '/resources',
    title: `AI Tutorials, Guides & Workflows | ${site.brandName}`,
    description: 'Step-by-step guides on prompt engineering, developer AI workflows, and content automation.',
    priority: '0.8',
    changefreq: 'weekly',
  },
  {
    url: '/about',
    title: `About Us — Editorial Mission | ${site.brandName}`,
    description: `Learn about ${site.brandName} (${site.instagramHandle}) and our editorial curation standards.`,
    priority: '0.6',
    changefreq: 'monthly',
  },
  {
    url: '/contact',
    title: `Contact Us & Submit an AI Tool | ${site.brandName}`,
    description: `Get in touch with ${site.brandName}. Submit an AI tool for directory inclusion.`,
    priority: '0.6',
    changefreq: 'monthly',
  },
  {
    url: '/privacy-policy',
    title: `Privacy Policy | ${site.brandName}`,
    description: `Privacy policy and cookie disclosures for ${site.brandName}.`,
    priority: '0.3',
    changefreq: 'yearly',
  },
  {
    url: '/terms',
    title: `Terms of Service | ${site.brandName}`,
    description: `Terms of service and usage guidelines for ${site.brandName}.`,
    priority: '0.3',
    changefreq: 'yearly',
  },
  {
    url: '/disclaimer',
    title: `Disclaimer & Affiliate Disclosure | ${site.brandName}`,
    description: `Affiliate disclosures and information disclaimer for ${site.brandName}.`,
    priority: '0.3',
    changefreq: 'yearly',
  },
];

// Add individual tool & prompt detail routes from reels
reels.forEach((reel) => {
  // Tool page
  routes.push({
    url: `/tools/${reel.slug}`,
    title: reel.seo.title.includes(site.brandName)
      ? reel.seo.title
      : `${reel.seo.title} | ${site.brandName}`,
    description: reel.seo.description,
    priority: '0.8',
    changefreq: 'weekly',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: reel.toolName,
      applicationCategory: reel.category,
      description: reel.description,
      url: reel.toolUrl || reel.instagramReelUrl,
    },
  });

  // Prompt page
  routes.push({
    url: `/prompts/${reel.slug}`,
    title: reel.postType === 'carousel'
      ? `${reel.title} — Prompt Carousel | ${site.brandName}`
      : `${reel.title} Prompt Set | ${site.brandName}`,
    description: reel.description,
    priority: '0.8',
    changefreq: 'weekly',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: reel.title,
      description: reel.description,
      creator: {
        '@type': 'Organization',
        name: site.brandName,
        url: site.instagramUrl,
      },
      text: reel.promptSet[0]?.description || reel.promptSet[0]?.prompt || reel.description,
    },
  });
});

// Collections
collections.forEach((col) => {
  routes.push({
    url: `/collections/${col.slug}`,
    title: `${col.seo.title} | ${site.brandName}`,
    description: col.seo.description,
    priority: '0.7',
    changefreq: 'weekly',
  });
});

// Resources
resources.forEach((res) => {
  routes.push({
    url: `/resources/${res.slug}`,
    title: `${res.seo.title} | ${site.brandName}`,
    description: res.seo.description,
    priority: '0.8',
    changefreq: 'weekly',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: res.title,
      description: res.description,
      datePublished: res.publishedAt,
    },
  });
});

// Series Hubs
seriesList.forEach((s) => {
  routes.push({
    url: `/series/${s.slug}`,
    title: `${s.title} · Video & Blog Series | ${site.brandName}`,
    description: s.description,
    priority: '0.8',
    changefreq: 'weekly',
  });
});

// Series Posts
seriesPosts.forEach((post) => {
  routes.push({
    url: `/series/${post.seriesSlug}/${post.slug}`,
    title: `${post.title} | ${post.seriesTitle} | ${site.brandName}`,
    description: post.description,
    priority: '0.9',
    changefreq: 'weekly',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.description,
      datePublished: post.publishedAt,
    },
  });
});

console.log(`Prerendering ${routes.length} static routes from reels and editorial content...`);

for (const route of routes) {
  try {
    const { html: appHtml } = render(route.url);
    const canonicalUrl = `${site.siteUrl}${route.url === '/' ? '' : route.url}`;

    let pageHtml = template.replace('<!--ssr-outlet-->', appHtml);

    // Replace Title
    pageHtml = pageHtml.replace(
      /<title>.*?<\/title>/,
      `<title>${route.title}</title>`
    );

    // Replace Description
    pageHtml = pageHtml.replace(
      /<meta\s+name=["']description["']\s+content=["'].*?["']\s*\/?>/i,
      `<meta name="description" content="${route.description}" />`
    );

    // Replace Canonical
    pageHtml = pageHtml.replace(
      /<link\s+rel=["']canonical["']\s+href=["'].*?["']\s*\/?>/i,
      `<link rel="canonical" href="${canonicalUrl}" />`
    );

    // Update Open Graph tags
    pageHtml = pageHtml.replace(
      /<meta\s+property=["']og:title["']\s+content=["'].*?["']\s*\/?>/i,
      `<meta property="og:title" content="${route.title}" />`
    );
    pageHtml = pageHtml.replace(
      /<meta\s+property=["']og:description["']\s+content=["'].*?["']\s*\/?>/i,
      `<meta property="og:description" content="${route.description}" />`
    );
    pageHtml = pageHtml.replace(
      /<meta\s+property=["']og:url["']\s+content=["'].*?["']\s*\/?>/i,
      `<meta property="og:url" content="${canonicalUrl}" />`
    );

    // Update Twitter tags
    pageHtml = pageHtml.replace(
      /<meta\s+name=["']twitter:title["']\s+content=["'].*?["']\s*\/?>/i,
      `<meta name="twitter:title" content="${route.title}" />`
    );
    pageHtml = pageHtml.replace(
      /<meta\s+name=["']twitter:description["']\s+content=["'].*?["']\s*\/?>/i,
      `<meta name="twitter:description" content="${route.description}" />`
    );

    // Inject JSON-LD if present
    if (route.jsonLd) {
      const jsonLdScript = `<script type="application/ld+json" id="json-ld-structured-data">${JSON.stringify(route.jsonLd)}</script>`;
      pageHtml = pageHtml.replace('</head>', `  ${jsonLdScript}\n</head>`);
    }

    // Determine target file path
    const targetDir = route.url === '/' ? distDir : path.join(distDir, route.url);
    fs.mkdirSync(targetDir, { recursive: true });
    fs.writeFileSync(path.join(targetDir, 'index.html'), pageHtml, 'utf8');
  } catch (err) {
    console.error(`Failed to prerender route ${route.url}:`, err);
  }
}

// Generate sitemap.xml
const today = new Date().toISOString().split('T')[0];
const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) => `  <url>
    <loc>${site.siteUrl}${r.url === '/' ? '' : r.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapXml, 'utf8');
fs.writeFileSync(path.join(rootDir, 'public/sitemap.xml'), sitemapXml, 'utf8');

console.log(`Prerendering completed. Generated ${routes.length} static HTML pages and sitemap.xml.`);
