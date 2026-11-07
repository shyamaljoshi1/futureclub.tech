import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Search,
  PenTool,
  Code2,
  Image,
  Video,
  CheckSquare,
  Cpu,
  Mic,
  Layout,
  Layers,
  ArrowUpRight,
  ShieldCheck,
} from 'lucide-react';
import {
  getSiteConfig,
  getCategories,
  getTools,
  getPrompts,
  getCollections,
  getAllSeriesPosts,
} from '@/lib/data';
import { updatePageSeo, getWebsiteSchema, getOrganizationSchema } from '@/lib/seo';
import { ToolGrid } from '@/components/tools/ToolGrid';
import { PromptGrid } from '@/components/prompts/PromptGrid';
import { SectionHeading } from '@/components/common/SectionHeading';
import { SeriesCard } from '@/components/series/SeriesCard';
import { InstagramCTA } from '@/components/common/InstagramCTA';
import { PromptPlayground } from '@/components/common/PromptPlayground';
import { AdSlot } from '@/components/ads/AdSlot';

export const HomePage: React.FC = () => {
  const site = getSiteConfig();
  const categories = getCategories();
  const trendingTools = getTools({ trending: true, limit: 6 });
  const recentTools = getTools({ sort: 'newest', limit: 6 });
  const featuredPrompts = getPrompts({ featured: true, limit: 4 });
  const collections = getCollections(true).slice(0, 3);
  const seriesPosts = getAllSeriesPosts().slice(0, 3);

  const homeAdSlot1 = import.meta.env.VITE_ADSENSE_SLOT_HOME;

  useEffect(() => {
    updatePageSeo({
      title: site.tagline,
      description: site.subheadline,
      canonical: '/',
      jsonLd: [getWebsiteSchema(), getOrganizationSchema()],
    });
  }, [site]);

  const renderCategoryIcon = (iconName: string) => {
    const props = { className: 'w-4 h-4 text-[#111215] dark:text-[#f4f4f5]' };
    switch (iconName) {
      case 'PenTool':
        return <PenTool {...props} />;
      case 'Code2':
        return <Code2 {...props} />;
      case 'Image':
        return <Image {...props} />;
      case 'Video':
        return <Video {...props} />;
      case 'CheckSquare':
        return <CheckSquare {...props} />;
      case 'Cpu':
        return <Cpu {...props} />;
      case 'Mic':
        return <Mic {...props} />;
      case 'Layout':
        return <Layout {...props} />;
      default:
        return <Layers {...props} />;
    }
  };

  return (
    <div className="space-y-24">
      {/* 1. Hero Section */}
      <section aria-labelledby="hero-title" className="pt-8 sm:pt-16 pb-6">
        <div className="max-w-3xl">
          {/* Instagram Link */}
          <div className="mb-6 inline-flex items-center space-x-2 text-xs text-[#5e626d] dark:text-[#8e93a0]">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Curated by</span>
            <a
              href={site.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[#111215] dark:text-[#f4f4f5] hover:underline inline-flex items-center"
            >
              <span>{site.instagramHandle}</span>
              <ArrowUpRight className="w-3 h-3 ml-0.5" />
            </a>
          </div>

          <h1
            id="hero-title"
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#111215] dark:text-[#f4f4f5] leading-[1.08] mb-6"
          >
            Discover AI Tools. Unlock What&apos;s Possible. {/* taste-skill-ignore */}
          </h1>

          {/* Supporting sentence directly below headline */}
          <p className="text-base sm:text-lg text-[#5e626d] dark:text-[#8e93a0] leading-relaxed mb-8 max-w-2xl">
            {site.subheadline}
          </p>

          {/* Search bar & Primary CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Link
              to="/tools"
              className="btn-primary rounded-md px-6 py-3 text-sm font-semibold inline-flex items-center justify-center"
            >
              <span>Explore AI Tools</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>

            <Link
              to="/prompts"
              className="btn-secondary rounded-md px-6 py-3 text-sm font-semibold inline-flex items-center justify-center"
            >
              <span>Browse Prompt Library</span>
            </Link>

            <Link
              to="/tools?search="
              className="p-3 rounded-md bg-[#f4f4f0] dark:bg-[#141619] text-[#5e626d] dark:text-[#8e93a0] hover:text-[#111215] dark:hover:text-[#f4f4f5] hidden sm:flex items-center justify-center"
              aria-label="Direct search"
            >
              <Search className="w-4 h-4" />
            </Link>
          </div>

          {/* Trust points */}
          <div className="mt-8 pt-6 flex flex-wrap items-center gap-6 text-xs text-[#888d99] dark:text-[#636773]">
            <span className="flex items-center">
              <ShieldCheck className="w-3.5 h-3.5 mr-1.5 text-emerald-600 dark:text-emerald-400" />
              100% Manually tested tools
            </span>
            <span>Zero sponsored bias</span>
            <span>Instant copy-paste prompts</span>
          </div>
        </div>
      </section>

      {/* 2. One Live Thing: Interactive Prompt Synthesizer & Token Calculator */}
      {/* <PromptPlayground /> */}

      {/* 3. Featured Categories */}
      <section aria-labelledby="featured-categories-heading">
        <SectionHeading
          title="Browse by Category"
          subtitle="Explore artificial intelligence tools organized by real daily applications and workflows."
          linkText="View all tools"
          linkHref="/tools"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {categories.slice(0, 8).map((cat) => (
            <Link
              key={cat.id}
              to={`/tools?category=${cat.slug}`}
              className="group p-4 rounded-lg bg-[#ffffff] dark:bg-[#141619] transition-colors flex flex-col justify-between"
            >
              <div className="flex items-center space-x-2.5 mb-2">
                <span className="p-1.5 rounded bg-[#f4f4f0] dark:bg-[#1c1f24] group-hover:scale-105 transition-transform">
                  {renderCategoryIcon(cat.icon)}
                </span>
                <h3 className="text-sm font-semibold text-[#111215] dark:text-[#f4f4f5] group-hover:text-[#1e3a8a] dark:group-hover:text-[#3b82f6] transition-colors truncate">
                  {cat.name}
                </h3>
              </div>
              <p className="text-xs text-[#5e626d] dark:text-[#8e93a0] line-clamp-2 leading-relaxed">
                {cat.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. Trending AI Tools */}
      <section aria-labelledby="trending-tools-heading">
        <SectionHeading
          title="Trending AI Tools"
          subtitle="The tools experiencing the highest adoption across development, writing, and design."
          linkText="Explore all tools"
          linkHref="/tools"
        />
        <ToolGrid tools={trendingTools} />
      </section>

      {/* AdSlot 1 between discovery sections */}
      {homeAdSlot1 && <AdSlot slotId={homeAdSlot1} label="Featured Technology Partner" />}

      {/* 5. Featured Prompts with Instant Copy */}
      <section aria-labelledby="featured-prompts-heading">
        <SectionHeading
          title="Curated AI Prompts"
          subtitle="Copy-paste prompts engineered for ChatGPT, Claude 3.5, and Midjourney."
          linkText="Explore entire prompt library"
          linkHref="/prompts"
        />
        <PromptGrid prompts={featuredPrompts} />
      </section>

      {/* Series Spotlight */}
      {seriesPosts.length > 0 && (
        <section aria-labelledby="series-spotlight-heading">
          <SectionHeading
            title="Original Engineering & AI Series"
            subtitle="Deep-dive video reels paired with comprehensive technical breakdowns and architecture guides."
            linkText="Explore all series"
            linkHref="/series"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {seriesPosts.map((post) => (
              <SeriesCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* 6. Recently Added Tools */}
      <section aria-labelledby="recent-tools-heading">
        <SectionHeading
          title="Recently Added to Directory"
          subtitle="New generative video models, AI code editors, and workflow orchestrators."
          linkText="View directory"
          linkHref="/tools?sort=newest"
        />
        <ToolGrid tools={recentTools} />
      </section>

      {/* 7. Featured Curated Collections */}
      <section aria-labelledby="curated-collections-heading">
        <SectionHeading
          title="Curated Collections"
          subtitle="Hand-picked tool and prompt bundles structured for specific roles and outcomes."
          linkText="View all collections"
          linkHref="/collections"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {collections.map((col) => (
            <Link
              key={col.id}
              to={`/collections/${col.slug}`}
              className="group flex flex-col justify-between p-6 rounded-lg bg-[#ffffff] dark:bg-[#141619] transition-colors"
            >
              <div>
                <span className="text-xs text-[#1e3a8a] dark:text-[#3b82f6] block mb-2 font-semibold">
                  Collection · {col.toolIds.length} Tools
                </span>
                <h3 className="text-lg font-bold text-[#111215] dark:text-[#f4f4f5] group-hover:text-[#1e3a8a] dark:group-hover:text-[#3b82f6] transition-colors mb-2 leading-snug">
                  {col.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#5e626d] dark:text-[#8e93a0] leading-relaxed line-clamp-3 mb-6">
                  {col.description}
                </p>
              </div>

              <div className="flex items-center text-xs font-semibold text-[#111215] dark:text-[#f4f4f5] group-hover:translate-x-1 transition-transform">
                <span>Browse Collection</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 8. Instagram Community CTA */}
      <InstagramCTA />

      {/* 9. Optional Editorial Updates / Newsletter (Honest, no fake form) */}
      <section aria-labelledby="editorial-updates-heading" className="p-8 rounded-lg bg-[#f4f4f0] dark:bg-[#111317]">
        <div className="max-w-2xl">
          <h3 id="editorial-updates-heading" className="text-lg font-bold text-[#111215] dark:text-[#f4f4f5] mb-2">
            Stay Updated with The Future Guy AI
          </h3>
          <p className="text-xs sm:text-sm text-[#5e626d] dark:text-[#8e93a0] leading-relaxed mb-4">
            We publish new verified AI tools, workflow prompts, and tutorials every week. Follow our direct channels to keep your workflow updated.
          </p>
          <div className="flex items-center space-x-4">
            <a
              href={site.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-[#1e3a8a] dark:text-[#3b82f6] hover:underline inline-flex items-center"
            >
              <span>Follow @thefutureguyy.ai on Instagram</span>
              <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
            </a>
            <span className="text-[#888d99] dark:text-[#636773]">·</span>
            <Link
              to="/resources"
              className="text-xs font-semibold text-[#5e626d] dark:text-[#8e93a0] hover:text-[#111215] dark:hover:text-[#f4f4f5]"
            >
              Read Editorial Guides
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
