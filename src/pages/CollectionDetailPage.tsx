import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layers, Wrench, Sparkles } from 'lucide-react';
import {
  getCollectionBySlug,
  getCollectionTools,
  getCollectionPrompts,
} from '@/lib/data';
import { updatePageSeo, getBreadcrumbSchema } from '@/lib/seo';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { ToolCard } from '@/components/tools/ToolCard';
import { PromptCard } from '@/components/prompts/PromptCard';
import { AdSlot } from '@/components/ads/AdSlot';

export const CollectionDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const collection = getCollectionBySlug(slug || '');
  const detailsAdSlot = import.meta.env.VITE_ADSENSE_SLOT_DETAILS;

  useEffect(() => {
    if (!collection) {
      navigate('/collections', { replace: true });
      return;
    }

    updatePageSeo({
      title: collection.seo.title,
      description: collection.seo.description,
      canonical: `/collections/${collection.slug}`,
      jsonLd: getBreadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Collections', url: '/collections' },
        { name: collection.title, url: `/collections/${collection.slug}` },
      ]),
    });
  }, [collection, navigate]);

  if (!collection) return null;

  const tools = getCollectionTools(collection);
  const prompts = getCollectionPrompts(collection);

  return (
    <div className="space-y-12">
      <Breadcrumbs
        items={[
          { label: 'Collections', href: '/collections' },
          { label: collection.title, href: `/collections/${collection.slug}` },
        ]}
      />

      {/* Hero Header */}
      <div className="p-6 sm:p-10 rounded-lg border border-[#e5e5e0] dark:border-[#22252c] bg-[#ffffff] dark:bg-[#141619]">
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center space-x-2 text-xs text-[#1e3a8a] dark:text-[#3b82f6] font-semibold">
            <Layers className="w-4 h-4" />
            <span>Curated Collection</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#111215] dark:text-[#f4f4f5] leading-snug">
            {collection.title}
          </h1>

          <p className="text-sm sm:text-base text-[#5e626d] dark:text-[#8e93a0] leading-relaxed">
            {collection.description}
          </p>

          <div className="pt-4 flex items-center space-x-6 text-xs text-[#888d99] dark:text-[#636773]">
            <span>{tools.length} Tools included</span>
            <span>{prompts.length} Prompts included</span>
            <span>Published {collection.publishedAt}</span>
          </div>
        </div>
      </div>

      {/* Included Tools */}
      {tools.length > 0 && (
        <section aria-labelledby="collection-tools-heading" className="space-y-6">
          <div className="flex items-center space-x-2">
            <Wrench className="w-5 h-5 text-[#1e3a8a] dark:text-[#3b82f6]" />
            <h2 id="collection-tools-heading" className="text-xl sm:text-2xl font-bold text-[#111215] dark:text-[#f4f4f5]">
              Featured Tools in this Collection
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {tools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>
      )}

      {/* AdSlot between tools and prompts */}
      {detailsAdSlot && <AdSlot slotId={detailsAdSlot} label="Featured Solution" />}

      {/* Included Prompts */}
      {prompts.length > 0 && (
        <section aria-labelledby="collection-prompts-heading" className="space-y-6 pt-6">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-[#d97706]" />
            <h2 id="collection-prompts-heading" className="text-xl sm:text-2xl font-bold text-[#111215] dark:text-[#f4f4f5]">
              Accompanying Prompt Workflows
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {prompts.map((prompt) => (
              <PromptCard key={prompt.id} prompt={prompt} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
