import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ExternalLink,
  Sparkles,
  TrendingUp,
  Tag,
  ArrowRight,
  FileText,
  Instagram,
  Copy,
  Check,
} from 'lucide-react';
import { getToolBySlug, getRelatedTools, getPromptSections } from '@/lib/data';
import {
  updatePageSeo,
  getBreadcrumbSchema,
  getSoftwareApplicationSchema,
} from '@/lib/seo';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { ToolCard } from '@/components/tools/ToolCard';
import { InstagramReelEmbed } from '@/components/common/InstagramReelEmbed';
import { AdSlot } from '@/components/ads/AdSlot';
import { trackExternalVisit } from '@/lib/analytics';

const renderLinks = (text: string) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);
  return parts.map((part, index) => {
    if (urlRegex.test(part)) {
      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#1e3a8a] dark:text-[#3b82f6] hover:underline font-semibold inline-flex items-center break-all"
        >
          <span>{part}</span>
          <ExternalLink className="w-3.5 h-3.5 ml-1 flex-shrink-0" />
        </a>
      );
    }
    return part;
  });
};

const ToolDescriptionRenderer: React.FC<{ text: string }> = ({ text }) => {
  const blocks = text.split(/\n\s*\n/).map((b) => b.trim()).filter(Boolean);

  return (
    <div className="space-y-4 text-base sm:text-[17px] text-[#2d3139] dark:text-[#d4d7df] leading-relaxed">
      {blocks.map((block, idx) => {
        const lines = block.split('\n').map((l) => l.trim()).filter(Boolean);

        // Block 0: Tool headline title (e.g. "Archify – Turn Ideas...")
        if (idx === 0 && lines.length === 1 && lines[0].includes('–')) {
          return (
            <h4
              key={idx}
              className="text-lg sm:text-xl font-bold text-[#111215] dark:text-[#f4f4f5] tracking-tight pb-1"
            >
              {lines[0]}
            </h4>
          );
        }

        // Section: Key Features
        if (lines[0].toLowerCase().startsWith('key features')) {
          const header = lines[0];
          const bullets = lines.slice(1);
          return (
            <div key={idx} className="space-y-2 pt-2">
              <h5 className="text-base sm:text-[17px] font-bold text-[#111215] dark:text-[#f4f4f5]">
                {header}
              </h5>
              <ul className="space-y-2 pl-0.5">
                {bullets.map((bullet, bIdx) => {
                  const cleaned = bullet.replace(/^[•\-\*]\s*/, '');
                  return (
                    <li key={bIdx} className="flex items-start space-x-2.5">
                      <span className="text-[#1e3a8a] dark:text-[#3b82f6] font-bold select-none">•</span>
                      <span className="flex-1">{renderLinks(cleaned)}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        }

        // Section: Step-by-Step / How to Use
        if (/^(how to use|step-by-step|quick usage)/i.test(lines[0])) {
          const header = lines[0];
          const steps = lines.slice(1);
          return (
            <div key={idx} className="space-y-2 pt-2">
              <h5 className="text-base sm:text-[17px] font-bold text-[#111215] dark:text-[#f4f4f5]">
                {header}
              </h5>
              <ol className="space-y-2 pl-0.5">
                {steps.map((step, sIdx) => {
                  const cleaned = step.replace(/^\d+[\.\)]\s*/, '');
                  return (
                    <li key={sIdx} className="flex items-start space-x-2.5">
                      <span className="font-bold text-[#111215] dark:text-[#f4f4f5] select-none">
                        {sIdx + 1}.
                      </span>
                      <span className="flex-1">{renderLinks(cleaned)}</span>
                    </li>
                  );
                })}
              </ol>
            </div>
          );
        }

        // Section: Installation
        if (lines[0].toLowerCase().startsWith('installation')) {
          const header = lines[0];
          const commands = lines.slice(1);
          return (
            <div key={idx} className="space-y-2 pt-2">
              <h5 className="text-base sm:text-[17px] font-bold text-[#111215] dark:text-[#f4f4f5]">
                {header}
              </h5>
              {commands.map((cmd, cIdx) => (
                <code
                  key={cIdx}
                  className="px-4 py-2.5 rounded bg-[#f4f4f0] dark:bg-[#1a1d23] text-sm sm:text-base font-mono text-[#111215] dark:text-[#f4f4f5] border border-[#e5e7eb] dark:border-[#262b35] select-all overflow-x-auto inline-block"
                >
                  {cmd}
                </code>
              ))}
            </div>
          );
        }

        // Section: Links block
        const isLinksBlock = lines.some((l) =>
          /^(github repository|official website|tool link|instagram breakdown)/i.test(l)
        );
        if (isLinksBlock) {
          return (
            <div
              key={idx}
              className="space-y-2 pt-4 mt-2"
            >
              {lines.map((linkLine, lIdx) => {
                const colonIdx = linkLine.indexOf(':');
                if (colonIdx !== -1) {
                  const label = linkLine.substring(0, colonIdx).trim();
                  const url = linkLine.substring(colonIdx + 1).trim();
                  return (
                    <div
                      key={lIdx}
                      className="flex flex-wrap items-center gap-2 text-base sm:text-[17px]"
                    >
                      <span className="font-semibold text-[#5e626d] dark:text-[#8e93a0]">
                        {label}:
                      </span>
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-[#1e3a8a] dark:text-[#3b82f6] hover:underline inline-flex items-center break-all"
                      >
                        <span>{url}</span>
                        <ExternalLink className="w-3.5 h-3.5 ml-1 flex-shrink-0" />
                      </a>
                    </div>
                  );
                }
                return <p key={lIdx}>{renderLinks(linkLine)}</p>;
              })}
            </div>
          );
        }

        // Standard narrative paragraph
        return (
          <p key={idx} className="leading-relaxed">
            {renderLinks(block)}
          </p>
        );
      })}
    </div>
  );
};

export const ToolDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [copiedToolUrl, setCopiedToolUrl] = useState(false);

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
  const toolSections = getPromptSections(tool, 'Description');
  const primaryToolUrl = tool.websiteUrl || tool.instagramReelUrl || '';

  const handleCopyToolLink = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!primaryToolUrl) return;
    try {
      await navigator.clipboard.writeText(primaryToolUrl);
      setCopiedToolUrl(true);
      setTimeout(() => setCopiedToolUrl(false), 2000);
    } catch (err) {
      console.error('Failed to copy tool link', err);
    }
  };

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

          {/* Primary Action Buttons: Visit Official Website & Copy Tool Link */}
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

            {primaryToolUrl && (
              <button
                type="button"
                onClick={handleCopyToolLink}
                className="px-5 py-3 rounded-md text-sm font-semibold border border-[#d6d8db] dark:border-[#2a2e37] bg-[#ffffff] dark:bg-[#1a1d23] text-[#111215] dark:text-[#f4f4f5] hover:bg-[#f4f4f0] dark:hover:bg-[#22262e] inline-flex items-center justify-center transition-colors"
                aria-label="Copy direct tool link"
              >
                {copiedToolUrl ? (
                  <>
                    <Check className="w-4 h-4 mr-2 text-emerald-600 dark:text-emerald-400" />
                    <span>Link Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2 text-[#5e626d] dark:text-[#8e93a0]" />
                    <span>Copy Tool Link</span>
                  </>
                )}
              </button>
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
            {tool.instagramReelUrl ? (
              <a
                href={tool.instagramReelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#1e3a8a] dark:text-[#3b82f6] hover:underline inline-flex items-center"
              >
                <Instagram className="w-3.5 h-3.5 mr-1 text-[#ec4899]" />
                <span>Watch Reel</span>
              </a>
            ) : (
              <span className="text-[#888d99] dark:text-[#636773]">Coming Soon</span>
            )}
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

          {toolSections.length > 0 ? (
            toolSections.map((p, idx) => {
              const textContent = p.content || '';
              return (
                <div
                  key={p.id || idx}
                  data-ui="prompt-box"
                  className="p-6 sm:p-7 rounded-lg bg-[#ffffff] dark:bg-[#141619] space-y-5"
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-xl font-bold text-[#111215] dark:text-[#f4f4f5]">
                      {p.title}
                    </h3>
                  </div>

                  {textContent && <ToolDescriptionRenderer text={textContent} />}

                  {p.instructions && p.instructions.length > 0 && (
                    <div className="space-y-2.5 pt-6 mt-4">
                      <h4 className="text-base sm:text-[17px] font-bold text-[#111215] dark:text-[#f4f4f5]">
                        Instructions:
                      </h4>
                      <ol className="space-y-2 text-base sm:text-[17px] text-[#2d3139] dark:text-[#d4d7df]">
                        {p.instructions.map((inst, i) => (
                          <li key={i} className="flex items-start space-x-2.5">
                            <span className="font-bold text-[#111215] dark:text-[#f4f4f5]">
                              {i + 1}.
                            </span>
                            <span className="leading-relaxed">{renderLinks(inst)}</span>
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
              className="p-6 sm:p-7 rounded-lg bg-[#ffffff] dark:bg-[#141619] space-y-4"
            >
              <h3 className="text-xl font-bold text-[#111215] dark:text-[#f4f4f5]">
                {tool.name}
              </h3>
              <p className="text-base sm:text-[17px] text-[#2d3139] dark:text-[#d4d7df] leading-relaxed">
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
