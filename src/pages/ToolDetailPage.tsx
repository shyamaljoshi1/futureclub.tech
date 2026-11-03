import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ExternalLink,
  Sparkles,
  TrendingUp,
  Tag,
  ArrowRight,
  FileText,
  Instagram,
} from 'lucide-react';
import { getToolBySlug, getRelatedTools } from '@/lib/data';
import {
  updatePageSeo,
  getBreadcrumbSchema,
  getSoftwareApplicationSchema,
} from '@/lib/seo';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { ToolCard } from '@/components/tools/ToolCard';
import { CopyPromptButton } from '@/components/prompts/CopyPromptButton';
import { InstagramReelEmbed } from '@/components/common/InstagramReelEmbed';
import { AdSlot } from '@/components/ads/AdSlot';
import { trackExternalVisit } from '@/lib/analytics';

export const ToolDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const tool = getToolBySlug(slug || '');
  const detailsAdSlot = import.meta.env.VITE_ADSENSE_SLOT_DETAILS;

  useEffect(() => {
    if (!tool) {
      navigate('/tools', { replace: true });
      return;
    }

    updatePageSeo({
      title: tool.seo.title,
      description: tool.seo.description,
      canonical: `/tools/${tool.slug}`,
      jsonLd: [
        getSoftwareApplicationSchema({
          id: tool.id,
          slug: tool.slug,
          name: tool.name,
          description: tool.description,
          longDescription: tool.longDescription,
          category: tool.category,
          pricing: tool.pricing,
          platform: tool.platform,
          websiteUrl: tool.websiteUrl,
          features: tool.features,
          useCases: tool.useCases,
          pros: tool.pros,
          cons: tool.cons,
          featured: tool.featured,
          trending: tool.trending,
          status: tool.status,
          publishedAt: tool.publishedAt,
          seo: tool.seo,
        }),
        getBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'AI Tools', url: '/tools' },
          { name: tool.name, url: `/tools/${tool.slug}` },
        ]),
      ],
    });
  }, [tool, navigate]);

  if (!tool) return null;

  const relatedTools = getRelatedTools(tool, 3);

  return (
    <div className="space-y-12">
      <Breadcrumbs
        items={[
          { label: 'AI Tools', href: '/tools' },
          { label: tool.name, href: `/tools/${tool.slug}` },
        ]}
      />

      {/* Header Info Block */}
      <div data-ui="tool-header" className="p-6 sm:p-8 rounded-lg bg-[#ffffff] dark:bg-[#141619]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-[#f4f4f0] dark:bg-[#1c1f24] text-[#111215] dark:text-[#f4f4f5]">
                {tool.name}
              </span>
              <span className="text-xs text-[#5e626d] dark:text-[#8e93a0] capitalize flex items-center">
                <Tag className="w-3 h-3 mr-1 text-[#888d99]" />
                {tool.category.replace('-', ' ')}
              </span>
              {tool.trending && (
                <span className="inline-flex items-center text-xs font-medium px-2 py-0.5 rounded bg-orange-100 text-orange-800 dark:bg-orange-950/70 dark:text-orange-300">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  Trending Reel
                </span>
              )}
              {tool.featured && (
                <span className="inline-flex items-center text-xs font-medium px-2 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Featured
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#111215] dark:text-[#f4f4f5]">
              {tool.name}
            </h1>

            <p className="text-sm sm:text-base text-[#5e626d] dark:text-[#8e93a0] max-w-2xl leading-relaxed">
              {tool.description}
            </p>
          </div>

          {/* Primary Action Button to Official Website */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-shrink-0">
            {tool.websiteUrl ? (
              <a
                href={tool.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackExternalVisit(tool.websiteUrl, tool.name)}
                className="btn-primary rounded-md px-6 py-3 text-sm font-semibold inline-flex items-center justify-center"
              >
                <span>Visit Official Website</span>
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            ) : (
              <a
                href={tool.instagramReelUrl || 'https://www.instagram.com/thefutureguyy.ai/'}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary rounded-md px-6 py-3 text-sm font-semibold inline-flex items-center justify-center"
              >
                <span>View on Instagram</span>
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            )}
          </div>
        </div>

        {/* Quick Meta Row */}
        <div className="mt-8 pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-[#888d99] dark:text-[#636773] block mb-1">
              Pricing Model
            </span>
            <span className="font-medium text-[#111215] dark:text-[#f4f4f5] capitalize">
              {tool.pricing}
            </span>
          </div>

          <div>
            <span className="text-[#888d99] dark:text-[#636773] block mb-1">
              Category
            </span>
            <span className="font-medium text-[#111215] dark:text-[#f4f4f5] capitalize">
              {tool.category.replace('-', ' ')}
            </span>
          </div>

          <div>
            <span className="text-[#888d99] dark:text-[#636773] block mb-1">
              Instagram Reel
            </span>
            <a
              href={tool.instagramReelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[#1e3a8a] dark:text-[#3b82f6] hover:underline inline-flex items-center"
            >
              <Instagram className="w-3.5 h-3.5 mr-1 text-[#ec4899]" />
              <span>Watch Reel</span>
            </a>
          </div>

          <div>
            <span className="text-[#888d99] dark:text-[#636773] block mb-1">
              Published
            </span>
            <span className="font-medium text-[#111215] dark:text-[#f4f4f5]">
              {tool.publishedAt}
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Reel Embed + Prompts Used in Reel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Embedded Instagram Reel / Carousel */}
        <div className="lg:col-span-5">
          <InstagramReelEmbed
            reelUrl={tool.instagramReelUrl}
            reelId={tool.instagramReelId}
            thumbnailUrl={tool.reelThumbnail}
            postType={tool.postType}
            title={`${tool.name} Instagram breakdown`}
          />
        </div>

        {/* Right Column: Content / Description Used in the Reel */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-[#1e3a8a] dark:text-[#3b82f6]" />
            <h2 className="text-xl font-bold text-[#111215] dark:text-[#f4f4f5]">
              Description
            </h2>
          </div>

          {tool.promptSet && tool.promptSet.length > 0 ? (
            tool.promptSet.map((p, idx) => {
              const textContent = p.description || p.prompt || '';
              return (
                <div
                  key={p.id || idx}
                  data-ui="prompt-box"
                  className="p-6 rounded-lg bg-[#ffffff] dark:bg-[#141619] space-y-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-base font-semibold text-[#111215] dark:text-[#f4f4f5]">
                      {p.title || (tool.promptSet.length > 1 ? `Description ${idx + 1}` : 'Description')}
                    </h3>
                    {textContent && (
                      <CopyPromptButton
                        promptText={textContent}
                        promptSlug={tool.slug}
                        promptTitle={p.title || tool.name}
                        label="Copy"
                        size="md"
                      />
                    )}
                  </div>

                  {textContent && (
                    <pre className="p-4 rounded bg-[#fbfbfa] dark:bg-[#101215] text-xs sm:text-sm font-mono text-[#111215] dark:text-[#f4f4f5] whitespace-pre-wrap leading-relaxed select-all overflow-x-auto">
                      {textContent}
                    </pre>
                  )}

                  {p.instructions && p.instructions.length > 0 && (
                    <div className="space-y-2 pt-2">
                      <h4 className="text-xs font-semibold text-[#5e626d] dark:text-[#8e93a0]">
                        Instructions:
                      </h4>
                      <ol className="space-y-1.5 text-xs text-[#5e626d] dark:text-[#8e93a0]">
                        {p.instructions.map((inst, i) => (
                          <li key={i} className="flex items-start space-x-2">
                            <span className="font-bold text-[#111215] dark:text-[#f4f4f5]">{i + 1}.</span>
                            <span>{inst}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div
              data-ui="prompt-box"
              className="p-6 rounded-lg bg-[#ffffff] dark:bg-[#141619] space-y-4"
            >
              <h3 className="text-base font-semibold text-[#111215] dark:text-[#f4f4f5]">
                {tool.name}
              </h3>
              <p className="text-sm text-[#5e626d] dark:text-[#8e93a0] leading-relaxed">
                {tool.longDescription || tool.description}
              </p>
            </div>
          )}

          {/* Quick tool outbound card */}
          <div className="p-5 rounded-lg bg-[#f4f4f0] dark:bg-[#101215] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-bold text-[#111215] dark:text-[#f4f4f5]">
                Ready to explore {tool.name}?
              </h3>
              <p className="text-xs text-[#5e626d] dark:text-[#8e93a0]">
                Access the official platform to start building and experimenting.
              </p>
            </div>
            {tool.websiteUrl ? (
              <a
                href={tool.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackExternalVisit(tool.websiteUrl, tool.name)}
                className="btn-primary rounded px-4 py-2 text-xs font-semibold whitespace-nowrap inline-flex items-center"
              >
                <span>Open {tool.name}</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
              </a>
            ) : (
              <a
                href={tool.instagramReelUrl || 'https://www.instagram.com/thefutureguyy.ai/'}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary rounded px-4 py-2 text-xs font-semibold whitespace-nowrap inline-flex items-center"
              >
                <span>View on Instagram</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* AdSlot */}
      {detailsAdSlot && <AdSlot slotId={detailsAdSlot} label="Sponsored Tool Alternative" />}

      {/* Related Reels / Tools */}
      {relatedTools.length > 0 && (
        <section className="pt-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-[#111215] dark:text-[#f4f4f5]">
              More AI Tool Breakdowns
            </h2>
            <Link
              to="/tools"
              className="text-xs font-semibold text-[#1e3a8a] dark:text-[#3b82f6] hover:underline inline-flex items-center"
            >
              <span>View all tools</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {relatedTools.map((t) => (
              <ToolCard key={t.id} tool={t} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
