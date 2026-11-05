import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { z } from 'zod';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.resolve(__dirname, '../src/data');
const reelsDir = path.join(dataDir, 'reels');

const PricingSchema = z.enum(['free', 'freemium', 'paid']);
const StatusSchema = z.enum(['draft', 'published']);

const SeoSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  canonical: z.string().optional(),
});

const PromptItemSchema = z.object({
  id: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  prompt: z.string().optional(),
  instructions: z.array(z.string()).optional(),
  exampleOutput: z.string().optional(),
}).passthrough();

const ReelItemSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  toolName: z.string(),
  toolUrl: z.union([z.string().url(), z.literal('')]),
  description: z.string(),
  category: z.string(),
  pricing: PricingSchema,
  pricingDetails: z.string().optional(),
  postType: z.enum(['reel', 'carousel']).default('reel'),
  contentType: z.enum(['tool', 'prompt']).default('tool'),
  instagramReelUrl: z.union([z.string().url(), z.literal('')]),
  instagramReelId: z.string().optional(),
  reelThumbnail: z.string(),
  promptSet: z.array(PromptItemSchema),
  featured: z.boolean().default(false),
  trending: z.boolean().default(false),
  status: StatusSchema.default('published'),
  publishedAt: z.string(),
  seo: SeoSchema,
});

const CategorySchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  description: z.string(),
  icon: z.string(),
});

const CollectionSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  coverImage: z.string().optional(),
  toolIds: z.array(z.string()),
  promptIds: z.array(z.string()),
  featured: z.boolean(),
  status: StatusSchema,
  publishedAt: z.string(),
  seo: SeoSchema,
});

const ResourceSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  category: z.string(),
  readTime: z.string(),
  publishedAt: z.string(),
  status: StatusSchema,
  sections: z.array(z.object({
    title: z.string(),
    content: z.string(),
    tips: z.array(z.string()).optional(),
  })),
  seo: SeoSchema,
});

function validateFile(filename, schema) {
  const filePath = path.join(dataDir, filename);
  if (!fs.existsSync(filePath)) {
    console.error(`Missing file: ${filename}`);
    process.exit(1);
  }
  const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const parsed = schema.safeParse(content);
  if (!parsed.success) {
    console.error(`Validation failed for ${filename}:`, parsed.error.format());
    process.exit(1);
  }
  console.log(`Validated ${filename} successfully.`);
}

const SeriesSchema = z.object({
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

const SeriesPostSchema = z.object({
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
  postType: z.enum(['reel', 'carousel']).default('reel'),
  quickTakeaway: z.string(),
  keyHighlights: z.array(z.string()).default([]),
  sections: z.array(z.object({
    id: z.string(),
    title: z.string(),
    content: z.string(),
    callout: z.string().optional(),
    codeSnippet: z.string().optional(),
    takeaway: z.string().optional(),
  })),
  references: z.array(z.object({
    title: z.string(),
    url: z.string().url(),
    source: z.string(),
  })).default([]),
  seo: SeoSchema,
});

console.log('Validating JSON content schemas...');
validateFile('categories.json', z.array(CategorySchema));
validateFile('collections.json', z.array(CollectionSchema));
validateFile('resources.json', z.array(ResourceSchema));
validateFile('series.json', z.array(SeriesSchema));
validateFile('series-posts.json', z.array(SeriesPostSchema));

// Validate individual reel JSON files in src/data/reels/
if (!fs.existsSync(reelsDir)) {
  console.error('Missing src/data/reels directory');
  process.exit(1);
}

const reelFiles = fs.readdirSync(reelsDir).filter((f) => f.endsWith('.json'));
console.log(`Validating ${reelFiles.length} individual reel JSON files in src/data/reels/...`);

for (const file of reelFiles) {
  const filePath = path.join(reelsDir, file);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const parsed = ReelItemSchema.safeParse(data);
  if (!parsed.success) {
    console.error(`Validation failed for reel file ${file}:`, parsed.error.format());
    process.exit(1);
  }
}

console.log(`All ${reelFiles.length} reel files validated successfully.`);
