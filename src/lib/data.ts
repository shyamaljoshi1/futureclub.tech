import siteData from '@/data/site.json';
import categoriesData from '@/data/categories.json';
import collectionsData from '@/data/collections.json';
import resourcesData from '@/data/resources.json';
import navigationData from '@/data/navigation.json';
import footerData from '@/data/footer.json';

import type {
  Category,
  Collection,
  Resource,
  SiteConfig,
  NavigationConfig,
  FooterConfig,
  ReelItem,
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

  if (options.sort === 'alphabetical') {
    items.sort((a, b) => a.toolName.localeCompare(b.toolName));
  } else if (options.sort === 'featured') {
    items.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  } else {
    items.sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
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
  type: 'tool' | 'prompt' | 'resource' | 'collection';
  title: string;
  description: string;
  url: string;
  badge?: string;
}

export function globalSearch(query: string): SearchResultItem[] {
  if (!query || query.trim().length < 2) return [];
  const q = query.toLowerCase().trim();
  const results: SearchResultItem[] = [];

  // Search reels as tools
  loadAllReels()
    .filter((r) => r.status === 'published')
    .forEach((r) => {
      if (
        r.toolName.toLowerCase().includes(q) ||
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q)
      ) {
        results.push({
          id: r.id,
          type: 'tool',
          title: r.toolName,
          description: r.description,
          url: `/tools/${r.slug}`,
          badge: r.pricing,
        });
      }
    });

  // Resources
  (resourcesData as Resource[])
    .filter((r) => r.status === 'published')
    .forEach((r) => {
      if (
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q)
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
        c.description.toLowerCase().includes(q)
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

  return results.slice(0, 10);
}
