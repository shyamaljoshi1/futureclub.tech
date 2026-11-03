import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPrompts, getCategories, getSiteConfig } from '@/lib/data';
import { updatePageSeo, getBreadcrumbSchema } from '@/lib/seo';
import { PromptGrid } from '@/components/prompts/PromptGrid';
import { PromptFilters } from '@/components/prompts/PromptFilters';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { EmptyState } from '@/components/common/EmptyState';
import { AdSlot } from '@/components/ads/AdSlot';

export const PromptsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const site = getSiteConfig();
  const categories = getCategories();

  const categoryParam = searchParams.get('category') || 'all';
  const platformParam = searchParams.get('platform') || 'all';
  const queryParam = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [selectedPlatform, setSelectedPlatform] = useState(platformParam);
  const [searchQuery, setSearchQuery] = useState(queryParam);

  const promptsAdSlot = import.meta.env.VITE_ADSENSE_SLOT_PROMPTS;

  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedCategory !== 'all') params.set('category', selectedCategory);
    if (selectedPlatform !== 'all') params.set('platform', selectedPlatform);
    if (searchQuery.trim() !== '') params.set('search', searchQuery.trim());
    setSearchParams(params, { replace: true });
  }, [selectedCategory, selectedPlatform, searchQuery, setSearchParams]);

  const prompts = getPrompts({
    category: selectedCategory,
    platform: selectedPlatform,
    search: searchQuery,
  });

  useEffect(() => {
    updatePageSeo({
      title: 'AI Prompt Library — ChatGPT, Claude & Midjourney Prompts',
      description:
        'Copy-paste prompt templates for ChatGPT, Claude 3.5, Gemini, and Midjourney v6. Tested for copywriting, coding, and creative generation.',
      canonical: '/prompts',
      jsonLd: getBreadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Prompts', url: '/prompts' },
      ]),
    });
  }, [site]);

  return (
    <div>
      <Breadcrumbs items={[{ label: 'Prompts', href: '/prompts' }]} />

      {/* Page Title & Intro */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111215] dark:text-[#f4f4f5] mb-2">
          Curated AI Prompt Library & Carousels
        </h1>
        <p className="text-sm sm:text-base text-[#5e626d] dark:text-[#8e93a0] max-w-3xl leading-relaxed">
          Explore ready-to-use prompt sets and swipeable Instagram carousels from @thefutureguyy.ai. Click any prompt to copy instantly to your clipboard.
        </p>
      </div>

      {/* Filters & Search */}
      <PromptFilters
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        selectedPlatform={selectedPlatform}
        onSelectPlatform={setSelectedPlatform}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        totalCount={prompts.length}
      />

      {/* Prompts Content Grid or Empty State */}
      {prompts.length > 0 ? (
        <PromptGrid prompts={prompts} adSlotId={promptsAdSlot} showAdAfterIndex={4} />
      ) : (
        <EmptyState
          title="No prompts found matching your filters"
          description="Try selecting 'All AI Models' or clearing your search term to see the complete library."
          actionText="Reset All Filters"
          onAction={() => {
            setSelectedCategory('all');
            setSelectedPlatform('all');
            setSearchQuery('');
          }}
        />
      )}

      {/* Bottom AdSlot */}
      {promptsAdSlot && prompts.length > 4 && (
        <AdSlot slotId={promptsAdSlot} label="Sponsored Prompts" className="mt-16" />
      )}
    </div>
  );
};
