import siteData from '@/data/site.json';
import categoriesData from '@/data/categories.json';
import collectionsData from '@/data/collections.json';
import resourcesData from '@/data/resources.json';
import navigationData from '@/data/navigation.json';
import footerData from '@/data/footer.json';
import seriesData from '@/data/series.json';
import seriesPostsData from '@/data/series-posts.json';

import type {
  Category,
  Collection,
  Resource,
  SiteConfig,
  NavigationConfig,
  FooterConfig,
  ReelItem,
  Series,
  SeriesPost,
  NewsItem,
} from '@/types/content';

// Import all individual reel JSON files automatically via Vite's import.meta.glob
const reelModules = import.meta.glob('../data/reels/*.json', { eager: true }) as Record<
  string,
  { default: ReelItem } | ReelItem
>;

function loadAllReels(): ReelItem[] {
  const list: ReelItem[] = [];
  for (const path in reelModules) {
    const mod = reelModules[path];
    const data = (mod && 'default' in mod ? mod.default : mod) as ReelItem;
    if (data && data.slug) {
      list.push(data);
    }
  }
  return list;
}

// Import all individual news JSON files automatically via Vite's import.meta.glob
const newsModules = import.meta.glob('../data/news/*.json', { eager: true }) as Record<
  string,
  { default: NewsItem } | NewsItem
>;

function loadAllNews(): NewsItem[] {
  const list: NewsItem[] = [];
  for (const path in newsModules) {
    const mod = newsModules[path];
    const data = (mod && 'default' in mod ? mod.default : mod) as NewsItem;
    if (data && data.slug) {
      list.push(data);
    }
  }
  return list.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

// Site
export function getSiteConfig(): SiteConfig {
  return siteData as SiteConfig;
}

// Categories
export function getCategories(): Category[] {
  return categoriesData as Category[];
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return (categoriesData as Category[]).find((c) => c.slug === slug);
}

// Reels / Tools / Prompts Data Layer
export interface ReelFilterOptions {
  category?: string;
  pricing?: 'free' | 'freemium' | 'paid' | 'all';
  platform?: string;
  contentType?: 'tool' | 'prompt' | 'all';
  postType?: 'reel' | 'carousel' | 'all';
  search?: string;
  featured?: boolean;
  trending?: boolean;
  sort?: 'newest' | 'alphabetical' | 'featured';
  limit?: number;
}

export function getReelItems(options: ReelFilterOptions = {}): ReelItem[] {
  let items = loadAllReels().filter((item) => item.status === 'published');

  if (options.contentType && options.contentType !== 'all') {
    items = items.filter((item) => item.contentType === options.contentType);
  }

  if (options.postType && options.postType !== 'all') {
    items = items.filter((item) => item.postType === options.postType);
  }

  if (options.category && options.category !== 'all') {
    items = items.filter((item) => item.category === options.category);
  }

  if (options.pricing && options.pricing !== 'all') {
    items = items.filter((item) => item.pricing === options.pricing);
  }

  if (options.platform && options.platform !== 'all') {
    const p = options.platform.toLowerCase();
    items = items.filter(
      (item) =>
        item.toolName.toLowerCase().includes(p) ||
        item.title.toLowerCase().includes(p) ||
        item.description.toLowerCase().includes(p) ||
        item.promptSet.some(
          (pr) =>
            (pr.title && pr.title.toLowerCase().includes(p)) ||
            (pr.description && pr.description.toLowerCase().includes(p)) ||
            (pr.prompt && pr.prompt.toLowerCase().includes(p))
        )
    );
  }

  if (options.featured) {
    items = items.filter((item) => item.featured);
  }

  if (options.trending) {
    items = items.filter((item) => item.trending);
  }

  if (options.search && options.search.trim() !== '') {
    const q = options.search.toLowerCase().trim();
    items = items.filter(
      (item) =>
        item.toolName.toLowerCase().includes(q) ||
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.promptSet.some(
          (p) =>
            (p.title && p.title.toLowerCase().includes(q)) ||
            (p.description && p.description.toLowerCase().includes(q)) ||
            (p.prompt && p.prompt.toLowerCase().includes(q))
        )
    );
  }

  const sortComparator = (a: ReelItem, b: ReelItem) => {
    const dateDiff = new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    if (dateDiff !== 0) return dateDiff;
    const idA = parseInt(a.id.replace(/\D/g, '') || '0', 10);
    const idB = parseInt(b.id.replace(/\D/g, '') || '0', 10);
    return idB - idA;
  };

  if (options.sort === 'alphabetical') {
    items.sort((a, b) => a.toolName.localeCompare(b.toolName));
  } else if (options.sort === 'featured') {
    items.sort((a, b) => {
      const featDiff = (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      if (featDiff !== 0) return featDiff;
      return sortComparator(a, b);
    });
  } else {
    items.sort(sortComparator);
  }

  if (options.limit && options.limit > 0) {
    items = items.slice(0, options.limit);
  }

  return items;
}

export function getReelItemBySlug(slug: string): ReelItem | undefined {
  return loadAllReels().find(
    (item) => item.slug === slug && item.status === 'published'
  );
}

export function getRelatedReels(reel: ReelItem, limit = 3): ReelItem[] {
  return loadAllReels()
    .filter(
      (r) =>
        r.id !== reel.id &&
        r.status === 'published' &&
        r.category === reel.category
    )
    .slice(0, limit);
}

// Backward-compatible adapters for Tools & Prompts directories
export interface ToolAdapter {
  id: string;
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  category: string;
  pricing: 'free' | 'freemium' | 'paid';
  pricingDetails?: string;
  platform: string[];
  websiteUrl: string;
  logo: string;
  features: string[];
  useCases: string[];
  pros: string[];
  cons: string[];
  featured: boolean;
  trending: boolean;
  status: 'published' | 'draft';
  publishedAt: string;
  updatedAt?: string;
  seo: {
    title: string;
    description: string;
  };
  // Reel Specific
  instagramReelUrl: string;
  instagramReelId?: string;
  reelThumbnail: string;
  postType?: 'reel' | 'carousel';
  contentType?: 'tool' | 'prompt';
  promptSet: Array<{
    id?: string;
    title?: string;
    description?: string;
    prompt?: string;
    instructions?: string[];
    exampleOutput?: string;
  }>;
}

export function reelToTool(reel: ReelItem): ToolAdapter {
  return {
    id: reel.id,
    slug: reel.slug,
    name: reel.toolName,
    description: reel.description,
    longDescription: `${reel.description} Demonstrated with full prompts and workflows on our Instagram channel (@thefutureguyy.ai).`,
    category: reel.category,
    pricing: reel.pricing,
    pricingDetails: reel.pricingDetails,
    platform: ['web'],
    websiteUrl: reel.toolUrl,
    logo: reel.reelThumbnail,
    features: [
      `Complete prompt set verified on Instagram`,
      `Direct link to official ${reel.toolName}`,
      `Copy-paste ready instructions`,
      `Curated by @thefutureguyy.ai`
    ],
    useCases: [
      `Streamlining ${reel.category.replace('-', ' ')} workflows`,
      `Accelerating content, code, and design productivity`
    ],
    pros: [
      `Verified with live Instagram demonstration`,
      `Tested prompt template included`
    ],
    cons: [
      `Check vendor pricing for tier changes`
    ],
    featured: reel.featured,
    trending: reel.trending,
    status: reel.status,
    publishedAt: reel.publishedAt,
    updatedAt: reel.publishedAt,
    seo: reel.seo,
    instagramReelUrl: reel.instagramReelUrl,
    instagramReelId: reel.instagramReelId,
    reelThumbnail: reel.reelThumbnail,
    postType: reel.postType,
    contentType: reel.contentType,
    promptSet: reel.promptSet,
  };
}

export function getTools(options: ReelFilterOptions = {}): ToolAdapter[] {
  const filterOpts: ReelFilterOptions = {
    contentType: 'tool',
    ...options,
  };
  return getReelItems(filterOpts).map(reelToTool);
}

export function getToolBySlug(slug: string): ToolAdapter | undefined {
  const reel = getReelItemBySlug(slug);
  return reel ? reelToTool(reel) : undefined;
}

export function getRelatedTools(tool: ToolAdapter, limit = 3): ToolAdapter[] {
  const reel = getReelItemBySlug(tool.slug);
  if (!reel) return [];
  return getRelatedReels(reel, limit).map(reelToTool);
}

// Prompts Adapter
export interface PromptAdapter {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  platform: string;
  prompt: string;
  instructions: string[];
  tags: string[];
  exampleOutput?: string;
  featured: boolean;
  status: 'published' | 'draft';
  publishedAt: string;
  seo: {
    title: string;
    description: string;
  };
  relatedToolIds?: string[];
  // Reel Specific
  toolName: string;
  toolUrl: string;
  instagramReelUrl: string;
  reelThumbnail: string;
  postType?: 'reel' | 'carousel';
  contentType?: 'tool' | 'prompt';
  promptSet?: ReelItem['promptSet'];
}

export interface ParsedPromptSection {
  id: string;
  title: string;
  content: string;
  instructions?: string[];
  exampleOutput?: string;
}

export function parsePromptSections(
  rawText: string,
  defaultTitle = 'Copy-Paste Prompt Template'
): ParsedPromptSection[] {
  if (!rawText || !rawText.trim()) {
    return [{ id: 'prompt-1', title: defaultTitle, content: '' }];
  }

  const normalized = rawText.replace(/\r\n/g, '\n').trim();
  const regex = /(?:^|\n\s*\n)(?=Prompt\s+\d+[:\s\n-])/i;
  const parts = normalized.split(regex).map((p) => p.trim()).filter(Boolean);

  if (parts.length > 1) {
    return parts.map((part, idx) => {
      const match = part.match(/^Prompt\s+(\d+)[:\s-]*(.*)/i);
      let title = `Prompt ${idx + 1}`;
      let content = part;
      if (match) {
        const promptNum = match[1];
        const rest = match[2].trim();
        const isSubtitle =
          rest.length > 0 &&
          rest.length <= 40 &&
          rest.split(/\s+/).length <= 6 &&
          !/[.,;]$/.test(rest);
        if (isSubtitle) {
          title = `Prompt ${promptNum}: ${rest}`;
          content = part.substring(match[0].length).trim();
        } else {
          title = `Prompt ${promptNum}`;
          content = part.replace(/^Prompt\s+\d+[:\s-]*/i, '').trim();
        }
      }
      return {
        id: `prompt-${idx + 1}`,
        title,
        content,
      };
    });
  }

  if (/^Prompt\s+\d+[:\s\n-]/i.test(normalized)) {
    const match = normalized.match(/^Prompt\s+(\d+)[:\s-]*(.*)/i);
    let title = 'Prompt 1';
    let content = normalized;
    if (match) {
      const promptNum = match[1];
      const rest = match[2].trim();
      const isSubtitle =
        rest.length > 0 &&
        rest.length <= 40 &&
        rest.split(/\s+/).length <= 6 &&
        !/[.,;]$/.test(rest);
      if (isSubtitle) {
        title = `Prompt ${promptNum}: ${rest}`;
        content = normalized.substring(match[0].length).trim();
      } else {
        title = `Prompt ${promptNum}`;
        content = normalized.replace(/^Prompt\s+\d+[:\s-]*/i, '').trim();
      }
    }
    return [{ id: 'prompt-1', title, content }];
  }

  return [
    {
      id: 'prompt-1',
      title: defaultTitle,
      content: normalized,
    },
  ];
}

export function getPromptSections(
  item: {
    prompt?: string;
    promptSet?: Array<{
      id?: string;
      title?: string;
      description?: string;
      prompt?: string;
      instructions?: string[];
      exampleOutput?: string;
    }>;
  },
  defaultTitle = 'Copy-Paste Prompt Template'
): ParsedPromptSection[] {
  if (item.promptSet && item.promptSet.length > 1) {
    const sections: ParsedPromptSection[] = [];
    item.promptSet.forEach((p, idx) => {
      const text = p.description || (p as any).Description || p.prompt || (p as any).Prompt || '';
      const fallbackTitle = p.title || `Prompt ${idx + 1}`;
      const parsed = parsePromptSections(text, fallbackTitle);
      parsed.forEach((s) => {
        if (p.instructions && !s.instructions) s.instructions = p.instructions;
        if (p.exampleOutput && !s.exampleOutput) s.exampleOutput = p.exampleOutput;
      });
      sections.push(...parsed);
    });
    return sections;
  }

  const singleItem = item.promptSet && item.promptSet[0] ? item.promptSet[0] : null;
  const rawText = (singleItem
    ? singleItem.description || (singleItem as any).Description || singleItem.prompt || (singleItem as any).Prompt
    : item.prompt) || '';

  const parsed = parsePromptSections(rawText, singleItem?.title || defaultTitle);
  if (singleItem?.instructions) {
    parsed.forEach((s) => {
      if (!s.instructions) s.instructions = singleItem.instructions;
    });
  }
  return parsed;
}

export function getPrompts(options: ReelFilterOptions = {}): PromptAdapter[] {
  const filterOpts: ReelFilterOptions = {
    contentType: 'prompt',
    ...options,
  };
  const reels = getReelItems(filterOpts);
  const promptList: PromptAdapter[] = [];

  reels.forEach((reel) => {
    reel.promptSet.forEach((p, idx) => {
      promptList.push({
        id: `${reel.id}-${idx}`,
        slug: reel.slug,
        title: p.title || reel.title,
        description: reel.description,
        category: reel.category,
        platform: reel.toolName,
        postType: reel.postType,
        contentType: reel.contentType,
        prompt: p.description || (p as any).Description || p.prompt || (p as any).Prompt || '',
        instructions: p.instructions || [
          `Open ${reel.toolName} at ${reel.toolUrl || 'the web interface'}`,
          `Swipe through the Instagram carousel slides for visual references`,
          `Paste the prompt and customize to your context`,
        ],
        tags: [reel.category, reel.toolName.toLowerCase(), reel.postType],
        exampleOutput: p.exampleOutput,
        featured: reel.featured,
        status: reel.status,
        publishedAt: reel.publishedAt,
        seo: reel.seo,
        relatedToolIds: [reel.id],
        toolName: reel.toolName,
        toolUrl: reel.toolUrl,
        instagramReelUrl: reel.instagramReelUrl,
        reelThumbnail: reel.reelThumbnail,
        promptSet: reel.promptSet,
      });
    });
  });

  return promptList;
}

export function getPromptBySlug(slug: string): PromptAdapter | undefined {
  const reel = getReelItemBySlug(slug);
  if (!reel || !reel.promptSet.length) return undefined;
  const p = reel.promptSet[0];
  return {
    id: `${reel.id}-0`,
    slug: reel.slug,
    title: p.title || reel.title,
    description: reel.description,
    category: reel.category,
    platform: reel.toolName,
    postType: reel.postType,
    contentType: reel.contentType,
    prompt: p.description || (p as any).Description || p.prompt || (p as any).Prompt || '',
    instructions: p.instructions || [
      `Open ${reel.toolName} at ${reel.toolUrl || 'the web interface'}`,
      `Swipe through the Instagram carousel slides for visual references`,
      `Paste the prompt into the model and iterate`,
    ],
    tags: [reel.category, reel.toolName.toLowerCase(), reel.postType],
    exampleOutput: p.exampleOutput,
    featured: reel.featured,
    status: reel.status,
    publishedAt: reel.publishedAt,
    seo: reel.seo,
    relatedToolIds: [reel.id],
    toolName: reel.toolName,
    toolUrl: reel.toolUrl,
    instagramReelUrl: reel.instagramReelUrl,
    reelThumbnail: reel.reelThumbnail,
    promptSet: reel.promptSet,
  };
}

export function getRelatedPrompts(prompt: PromptAdapter, limit = 3): PromptAdapter[] {
  return getPrompts()
    .filter((p) => p.slug !== prompt.slug && p.category === prompt.category)
    .slice(0, limit);
}

// Collections
export function getCollections(featuredOnly = false): Collection[] {
  const items = (collectionsData as Collection[]).filter(
    (col) => col.status === 'published'
  );
  if (featuredOnly) {
    return items.filter((col) => col.featured);
  }
  return items;
}

export function getCollectionBySlug(slug: string): Collection | undefined {
  return (collectionsData as Collection[]).find(
    (col) => col.slug === slug && col.status === 'published'
  );
}

export function getCollectionTools(_collection: Collection): ToolAdapter[] {
  return getTools().slice(0, 4);
}

export function getCollectionPrompts(_collection: Collection): PromptAdapter[] {
  return getPrompts().slice(0, 4);
}

// Resources
export function getResources(): Resource[] {
  return (resourcesData as Resource[]).filter(
    (res) => res.status === 'published'
  );
}

export function getResourceBySlug(slug: string): Resource | undefined {
  return (resourcesData as Resource[]).find(
    (res) => res.slug === slug && res.status === 'published'
  );
}

// Series
export function getAllSeries(): Series[] {
  return (seriesData as Series[]).filter((s) => s.status === 'published');
}

export function getSeriesBySlug(slug: string): Series | undefined {
  return getAllSeries().find((s) => s.slug === slug);
}

// Series Posts
export function getAllSeriesPosts(): SeriesPost[] {
  return (seriesPostsData as SeriesPost[]).filter((p) => p.status === 'published');
}

export function getSeriesPosts(seriesSlug?: string): SeriesPost[] {
  const posts = getAllSeriesPosts();
  if (!seriesSlug) return posts;
  return posts.filter((p) => p.seriesSlug === seriesSlug);
}

export function getSeriesPostBySlug(slug: string): SeriesPost | undefined {
  return getAllSeriesPosts().find((p) => p.slug === slug);
}

export function getRelatedSeriesPosts(post: SeriesPost, limit = 3): SeriesPost[] {
  return getAllSeriesPosts()
    .filter((p) => p.id !== post.id && p.seriesSlug === post.seriesSlug)
    .slice(0, limit);
}

// News Functions
export function getAllNews(
  options: {
    category?: string;
    status?: 'published' | 'draft';
    limit?: number;
  } = {}
): NewsItem[] {
  let list = loadAllNews();
  const statusFilter = options.status || 'published';
  list = list.filter((item) => item.status === statusFilter);

  if (options.category && options.category !== 'all') {
    list = list.filter(
      (item) => item.category.toLowerCase() === options.category!.toLowerCase()
    );
  }

  if (options.limit) {
    list = list.slice(0, options.limit);
  }
  return list;
}

export function getFeaturedTodayNews(): NewsItem[] {
  const all = getAllNews({ status: 'published' });
  if (all.length === 0) return [];

  // Identify the latest publication date available in the dataset (e.g. "2026-11-11")
  const latestDate = all[0].publishedAt;

  // Filter only news articles published on that exact latest date
  const todaysNews = all.filter((item) => item.publishedAt === latestDate);

  // Return all same-date news articles, fallback to top 3 if none match
  return todaysNews.length > 0 ? todaysNews : all.slice(0, 3);
}

export function getNewsBySlug(slug: string): NewsItem | undefined {
  return getAllNews().find((n) => n.slug === slug);
}

export function getRelatedNews(currentSlug: string, limit = 3): NewsItem[] {
  const current = getNewsBySlug(currentSlug);
  return getAllNews()
    .filter((n) => n.slug !== currentSlug)
    .filter((n) => (current ? n.category === current.category || true : true))
    .slice(0, limit);
}

export function getNewsCategories(): string[] {
  const news = getAllNews();
  const set = new Set<string>();
  news.forEach((n) => set.add(n.category));
  return Array.from(set);
}

// Navigation & Footer
export function getNavigation(): NavigationConfig {
  return navigationData as NavigationConfig;
}

export function getFooter(): FooterConfig {
  return footerData as FooterConfig;
}

// Unified Search
export interface SearchResultItem {
  id: string;
  type: 'tool' | 'prompt' | 'resource' | 'collection' | 'series' | 'news';
  title: string;
  description: string;
  url: string;
  badge?: string;
}

export function globalSearch(query: string): SearchResultItem[] {
  if (!query || query.trim().length < 2) return [];
  const q = query.toLowerCase().trim();
  const results: SearchResultItem[] = [];

  // Search News Articles (High priority for timely news)
  getAllNews().forEach((n) => {
    if (
      n.title.toLowerCase().includes(q) ||
      n.summary.toLowerCase().includes(q) ||
      n.content.toLowerCase().includes(q) ||
      n.category.toLowerCase().includes(q) ||
      n.tags.some((t) => t.toLowerCase().includes(q))
    ) {
      results.push({
        id: n.id,
        type: 'news',
        title: n.title,
        description: n.summary,
        url: `/news/${n.slug}`,
        badge: n.category,
      });
    }
  });

  // Search Series Posts (Prioritized)
  getAllSeriesPosts().forEach((post) => {
    const matchInSection = post.sections.some(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.content.toLowerCase().includes(q)
    );
    if (
      post.title.toLowerCase().includes(q) ||
      post.description.toLowerCase().includes(q) ||
      post.slug.toLowerCase().includes(q) ||
      post.seriesTitle.toLowerCase().includes(q) ||
      matchInSection
    ) {
      results.push({
        id: post.id,
        type: 'series',
        title: post.title,
        description: post.description,
        url: `/series/${post.seriesSlug}/${post.slug}`,
        badge: `${post.seriesTitle} • Ep ${post.episodeNumber}`,
      });
    }
  });

  // Search reels as tools and prompts (sorted newest first)
  const allReels = loadAllReels().filter((r) => r.status === 'published');
  allReels.sort((a, b) => {
    const dateDiff = new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    if (dateDiff !== 0) return dateDiff;
    const idA = parseInt(a.id.replace(/\D/g, '') || '0', 10);
    const idB = parseInt(b.id.replace(/\D/g, '') || '0', 10);
    return idB - idA;
  });

  allReels.forEach((r) => {
    const matchInPrompts = r.promptSet?.some(
      (p) =>
        (p.title && p.title.toLowerCase().includes(q)) ||
        (p.description && p.description.toLowerCase().includes(q)) ||
        (p.prompt && p.prompt.toLowerCase().includes(q))
    );
    if (
      r.toolName.toLowerCase().includes(q) ||
      r.title.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q) ||
      r.slug.toLowerCase().includes(q) ||
      matchInPrompts
    ) {
      results.push({
        id: r.id,
        type: r.contentType === 'prompt' ? 'prompt' : 'tool',
        title: r.toolName || r.title,
        description: r.description,
        url: r.contentType === 'prompt' ? `/prompts/${r.slug}` : `/tools/${r.slug}`,
        badge: r.contentType === 'prompt' ? 'Prompt' : r.pricing,
      });
    }
  });

  // Resources
  (resourcesData as Resource[])
    .filter((r) => r.status === 'published')
    .forEach((r) => {
      if (
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.slug.toLowerCase().includes(q)
      ) {
        results.push({
          id: r.id,
          type: 'resource',
          title: r.title,
          description: r.description,
          url: `/resources/${r.slug}`,
          badge: r.readTime,
        });
      }
    });

  // Collections
  (collectionsData as Collection[])
    .filter((c) => c.status === 'published')
    .forEach((c) => {
      if (
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.slug.toLowerCase().includes(q)
      ) {
        results.push({
          id: c.id,
          type: 'collection',
          title: c.title,
          description: c.description,
          url: `/collections/${c.slug}`,
          badge: 'Collection',
        });
      }
    });

  return results.slice(0, 15);
}
