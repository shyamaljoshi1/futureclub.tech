import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Tag,
  HelpCircle,
  FileText,
  Wrench,
  ExternalLink,
} from 'lucide-react';
import { getPromptBySlug, getRelatedPrompts, getTools } from '@/lib/data';
import { updatePageSeo, getBreadcrumbSchema } from '@/lib/seo';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { CopyPromptButton } from '@/components/prompts/CopyPromptButton';
import { PromptCard } from '@/components/prompts/PromptCard';
import { ToolCard } from '@/components/tools/ToolCard';
import { InstagramReelEmbed } from '@/components/common/InstagramReelEmbed';
import { AdSlot } from '@/components/ads/AdSlot';
import { trackExternalVisit } from '@/lib/analytics';

export const PromptDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const prompt = getPromptBySlug(slug || '');
  const detailsAdSlot = import.meta.env.VITE_ADSENSE_SLOT_DETAILS;

  useEffect(() => {
    if (!prompt) {
      navigate('/prompts', { replace: true });
      return;
    }

    updatePageSeo({
      title: prompt.seo.title,
      description: prompt.seo.description,
      canonical: `/prompts/${prompt.slug}`,
      jsonLd: getBreadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Prompts', url: '/prompts' },
        { name: prompt.title, url: `/prompts/${prompt.slug}` },
      ]),
    });
  }, [prompt, navigate]);

  if (!prompt) return null;

  const relatedPrompts = getRelatedPrompts(prompt, 2);
  const relatedTools = getTools().filter((t) => t.slug === prompt.slug);

  const wordCount = prompt.prompt.trim().split(/\s+/).length;
  const estimatedTokens = Math.round(wordCount * 1.35);

  return (
    <div className="space-y-12">
      <Breadcrumbs
        items={[
          { label: 'Prompts', href: '/prompts' },
          { label: prompt.title, href: `/prompts/${prompt.slug}` },
        ]}
      />

      {/* Header Info Block */}
      <div data-ui="prompt-header" className="p-6 sm:p-8 rounded-lg bg-[#ffffff] dark:bg-[#141619]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-xs capitalize px-2.5 py-0.5 rounded bg-[#f4f4f0] dark:bg-[#1c1f24] text-[#111215] dark:text-[#f4f4f5] font-semibold">
                {prompt.platform}
              </span>
              <span className="text-xs text-[#5e626d] dark:text-[#8e93a0] capitalize flex items-center">
                <Tag className="w-3 h-3 mr-1 text-[#888d99]" />
                {prompt.category.replace('-', ' ')}
              </span>
              {prompt.featured && (
                <span className="inline-flex items-center text-xs font-medium px-2 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Featured Reel
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111215] dark:text-[#f4f4f5] mb-3 leading-snug">
              {prompt.title}
            </h1>

            <p className="text-sm sm:text-base text-[#5e626d] dark:text-[#8e93a0] max-w-2xl leading-relaxed">
              {prompt.description}
            </p>
          </div>

          {prompt.toolUrl && (
            <div className="flex-shrink-0">
              <a
                href={prompt.toolUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackExternalVisit(prompt.toolUrl, prompt.toolName)}
                className="btn-primary rounded-md px-5 py-2.5 text-xs sm:text-sm font-semibold inline-flex items-center"
              >
                <span>Open {prompt.toolName}</span>
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="mt-6 pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-[#888d99] dark:text-[#636773]">
          <div>
            <span className="block mb-1">Length</span>
            <span className="font-medium text-[#111215] dark:text-[#f4f4f5]">~{wordCount} words</span>
          </div>
          <div>
            <span className="block mb-1">Token Estimate</span>
            <span className="font-medium text-[#111215] dark:text-[#f4f4f5]">~{estimatedTokens} tokens</span>
          </div>
          <div>
            <span className="block mb-1">Recommended Tool</span>
            <span className="font-medium text-[#111215] dark:text-[#f4f4f5]">{prompt.toolName}</span>
          </div>
          <div>
            <span className="block mb-1">Published</span>
            <span className="font-medium text-[#111215] dark:text-[#f4f4f5]">{prompt.publishedAt}</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Reel Embed + Prompt Block */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Instagram Carousel Embed */}
        <div className="lg:col-span-5">
          <InstagramReelEmbed
            reelUrl={prompt.instagramReelUrl}
            thumbnailUrl={prompt.reelThumbnail}
            postType={prompt.postType || 'carousel'}
            title={`${prompt.title} Instagram Prompt Carousel`}
          />
        </div>

        {/* Right: Full Prompt Text + Instructions */}
        <div className="lg:col-span-7 space-y-6">
          <section aria-labelledby="prompt-content-heading" className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 id="prompt-content-heading" className="text-lg font-bold text-[#111215] dark:text-[#f4f4f5] flex items-center">
                <FileText className="w-4 h-4 mr-2 text-[#1e3a8a] dark:text-[#3b82f6]" />
                Copy-Paste Prompt Template
              </h2>

              <CopyPromptButton
                promptText={prompt.prompt}
                promptSlug={prompt.slug}
                promptTitle={prompt.title}
                size="md"
              />
            </div>

            <div className="p-5 sm:p-6 rounded-lg bg-[#ffffff] dark:bg-[#141619]">
              {prompt.prompt.trim() ? (
                <pre className="font-mono text-xs sm:text-sm text-[#111215] dark:text-[#f4f4f5] whitespace-pre-wrap leading-relaxed select-all overflow-x-auto">
                  {prompt.prompt}
                </pre>
              ) : (
                <div className="text-xs sm:text-sm text-[#888d99] dark:text-[#636773] italic">
                  Prompt text will be added soon. Watch the embedded Instagram reel breakdown on the left or check @thefutureguyy.ai on Instagram!
                </div>
              )}
            </div>
          </section>

          {/* Step-by-Step Execution Guide */}
          <section className="p-6 rounded-lg bg-[#ffffff] dark:bg-[#141619]">
            <h2 className="text-lg font-bold text-[#111215] dark:text-[#f4f4f5] mb-4 flex items-center">
              <HelpCircle className="w-4 h-4 mr-2 text-emerald-600 dark:text-emerald-400" />
              How to Run This Prompt
            </h2>
            <ol className="space-y-3 text-sm text-[#5e626d] dark:text-[#8e93a0]">
              {prompt.instructions.map((step, idx) => (
                <li key={idx} className="flex items-start space-x-3">
                  <span className="w-5 h-5 rounded-full bg-[#f4f4f0] dark:bg-[#1c1f24] text-[#111215] dark:text-[#f4f4f5] text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </div>

      {/* AdSlot */}
      {detailsAdSlot && <AdSlot slotId={detailsAdSlot} label="Sponsored Tool Recommendations" />}

      {/* Related AI Tool */}
      {relatedTools.length > 0 && (
        <section className="pt-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-[#111215] dark:text-[#f4f4f5] flex items-center">
              <Wrench className="w-4 h-4 mr-2 text-[#1e3a8a] dark:text-[#3b82f6]" />
              Official Tool for this Prompt
            </h2>
            <Link
              to="/tools"
              className="text-xs font-semibold text-[#1e3a8a] dark:text-[#3b82f6] hover:underline inline-flex items-center"
            >
              <span>Explore all tools</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {relatedTools.map((t) => (
              <ToolCard key={t.id} tool={t} />
            ))}
          </div>
        </section>
      )}

      {/* Related Prompts */}
      {relatedPrompts.length > 0 && (
        <section className="pt-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-[#111215] dark:text-[#f4f4f5]">
              More Prompts from Recent Reels
            </h2>
            <Link
              to="/prompts"
              className="text-xs font-semibold text-[#1e3a8a] dark:text-[#3b82f6] hover:underline inline-flex items-center"
            >
              <span>All Prompts</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {relatedPrompts.map((p) => (
              <PromptCard key={p.id} prompt={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
