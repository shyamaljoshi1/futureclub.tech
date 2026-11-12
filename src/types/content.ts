import { z } from 'zod';

// Pricing Enum
export const PricingSchema = z.enum(['free', 'freemium', 'paid']);
export type Pricing = z.infer<typeof PricingSchema>;

// Status Enum
export const StatusSchema = z.enum(['draft', 'published']);
export type Status = z.infer<typeof StatusSchema>;

// AI Model / Prompt Platform Enum
export const AIPlatformSchema = z.enum([
  'chatgpt',
  'claude',
  'gemini',
  'midjourney',
  'flux',
  'general'
]);
export type AIPlatform = z.infer<typeof AIPlatformSchema>;

// SEO Meta Schema
export const SeoSchema = z.object({
  title: z.string(),
  description: z.string(),
  canonical: z.string().optional(),
  keywords: z.array(z.string()).optional(),
  ogImage: z.string().optional(),
});
export type SeoMeta = z.infer<typeof SeoSchema>;

// Prompt Item inside a Reel
export const PromptItemSchema = z.object({
  id: z.string().optional(),
  title: z.string().optional().default(''),
  description: z.string().optional(),
  prompt: z.string().optional(),
  instructions: z.array(z.string()).optional(),
  exampleOutput: z.string().optional(),
}).passthrough();
export type PromptItem = z.infer<typeof PromptItemSchema>;

// Post Type & Content Type Enums (for classifying Reels vs Carousels)
export const PostTypeSchema = z.enum(['reel', 'carousel']);
export type PostType = z.infer<typeof PostTypeSchema>;

export const ContentTypeSchema = z.enum(['tool', 'prompt']);
export type ContentType = z.infer<typeof ContentTypeSchema>;

// Reel Entry Schema (1 file = 1 reel / tool / prompt set)
export const ReelItemSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  toolName: z.string(),
  toolUrl: z.union([z.string().url(), z.literal('')]),
  description: z.string(),
  category: z.string(),
  pricing: PricingSchema,
  pricingDetails: z.string().optional(),
  postType: PostTypeSchema.default('reel'),
  contentType: ContentTypeSchema.default('tool'),
  instagramReelUrl: z.union([z.string().url(), z.literal('')]),
  instagramReelId: z.string().optional(),
  reelThumbnail: z.string(),
  coverImage: z.string().optional(),
  promptSet: z.array(PromptItemSchema).default([]),
  featured: z.boolean().default(false),
  trending: z.boolean().default(false),
  status: StatusSchema.default('published'),
  publishedAt: z.string(),
  seo: SeoSchema,
});
export type ReelItem = z.infer<typeof ReelItemSchema>;

// Category Schema
export const CategorySchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  description: z.string(),
  icon: z.string(),
});
export type Category = z.infer<typeof CategorySchema>;

// Collection Schema
export const CollectionSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  coverImage: z.string().optional(),
  toolIds: z.array(z.string()).default([]),
  promptIds: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  status: StatusSchema.default('published'),
  publishedAt: z.string(),
  seo: SeoSchema,
});
export type Collection = z.infer<typeof CollectionSchema>;

// Resource Section Schema
export const ResourceSectionSchema = z.object({
  title: z.string(),
  content: z.string(),
  tips: z.array(z.string()).optional(),
});

// Resource Schema
export const ResourceSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  category: z.string(),
  readTime: z.string(),
  publishedAt: z.string(),
  status: StatusSchema.default('published'),
  sections: z.array(ResourceSectionSchema),
  seo: SeoSchema,
});
export type Resource = z.infer<typeof ResourceSchema>;

// Site Config Schema
export const SiteConfigSchema = z.object({
  brandName: z.string(),
  tagline: z.string(),
  subheadline: z.string(),
  instagramHandle: z.string(),
  instagramUrl: z.string().url(),
  contactEmail: z.string().email(),
  siteUrl: z.string().url(),
  defaultTitle: z.string(),
  defaultDescription: z.string(),
});
export type SiteConfig = z.infer<typeof SiteConfigSchema>;

// Navigation Schema
export const NavigationItemSchema = z.object({
  label: z.string(),
  href: z.string(),
  isExternal: z.boolean().optional(),
});
export type NavigationItem = z.infer<typeof NavigationItemSchema>;

export const NavigationSchema = z.object({
  primary: z.array(NavigationItemSchema),
  cta: NavigationItemSchema,
});
export type NavigationConfig = z.infer<typeof NavigationSchema>;

// Footer Schema
export const FooterColumnSchema = z.object({
  title: z.string(),
  links: z.array(NavigationItemSchema),
});

export const FooterSchema = z.object({
  aboutText: z.string(),
  columns: z.array(FooterColumnSchema),
  legal: z.array(NavigationItemSchema),
  copyright: z.string(),
  disclaimer: z.string(),
});
export type FooterConfig = z.infer<typeof FooterSchema>;

// Series Schema
export const SeriesSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  tagline: z.string(),
  description: z.string(),
  coverImage: z.string().optional(),
  badge: z.string().optional(),
  featured: z.boolean().default(false),
  status: StatusSchema.default('published'),
  publishedAt: z.string(),
  seo: SeoSchema,
});
export type Series = z.infer<typeof SeriesSchema>;

// Series Post Section Schema
export const SeriesPostSectionSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  callout: z.string().optional(),
  codeSnippet: z.string().optional(),
  takeaway: z.string().optional(),
});
export type SeriesPostSection = z.infer<typeof SeriesPostSectionSchema>;

// Series Post Reference Schema
export const SeriesPostReferenceSchema = z.object({
  title: z.string(),
  url: z.string().url(),
  source: z.string(),
});
export type SeriesPostReference = z.infer<typeof SeriesPostReferenceSchema>;

// Series Post Schema
export const SeriesPostSchema = z.object({
  id: z.string(),
  seriesId: z.string(),
  seriesSlug: z.string(),
  seriesTitle: z.string(),
  episodeNumber: z.number(),
  slug: z.string(),
  title: z.string(),
  subtitle: z.string().optional(),
  description: z.string(),
  category: z.string(),
  readTime: z.string(),
  publishedAt: z.string(),
  status: StatusSchema.default('published'),
  instagramReelUrl: z.union([z.string().url(), z.literal('')]),
  instagramReelId: z.string().optional(),
  reelThumbnail: z.string(),
  coverImage: z.string().optional(),
  postType: PostTypeSchema.default('reel'),
  quickTakeaway: z.string(),
  keyHighlights: z.array(z.string()).default([]),
  sections: z.array(SeriesPostSectionSchema),
  references: z.array(SeriesPostReferenceSchema).default([]),
  seo: SeoSchema,
});
export type SeriesPost = z.infer<typeof SeriesPostSchema>;

// News Article Schema (1 JSON file per news article)
export const NewsItemSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  summary: z.string(),
  content: z.string(),
  category: z.string(),
  coverImage: z.string(),
  publishedAt: z.string(), // YYYY-MM-DD
  author: z.string().default('@thefutureguyy.ai'),
  readingTime: z.string().default('2 min read'),
  source: z.object({
    name: z.string(),
    url: z.string().url().or(z.literal('')),
  }).optional(),
  tags: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  status: StatusSchema.default('published'),
  seo: SeoSchema,
});
export type NewsItem = z.infer<typeof NewsItemSchema>;
