import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getTools, getCategories, getSiteConfig } from '@/lib/data';
import { updatePageSeo, getBreadcrumbSchema } from '@/lib/seo';
import { ToolGrid } from '@/components/tools/ToolGrid';
import { ToolFilters } from '@/components/tools/ToolFilters';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { EmptyState } from '@/components/common/EmptyState';
import { AdSlot } from '@/components/ads/AdSlot';

export const ToolsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const site = getSiteConfig();
  const categories = getCategories();

  const categoryParam = searchParams.get('category') || 'all';
  const pricingParam = (searchParams.get('pricing') as 'free' | 'freemium' | 'paid' | 'all') || 'all';
  const queryParam = searchParams.get('search') || '';
  const sortParam = (searchParams.get('sort') as 'newest' | 'alphabetical' | 'featured') || 'featured';

  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [selectedPricing, setSelectedPricing] = useState(pricingParam);
  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [sortBy, setSortBy] = useState(sortParam);

  const toolsAdSlot = import.meta.env.VITE_ADSENSE_SLOT_TOOLS;

  // Sync state to URL search parameters
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedCategory !== 'all') params.set('category', selectedCategory);
    if (selectedPricing !== 'all') params.set('pricing', selectedPricing);
    if (searchQuery.trim() !== '') params.set('search', searchQuery.trim());
    if (sortBy !== 'featured') params.set('sort', sortBy);
    setSearchParams(params, { replace: true });
  }, [selectedCategory, selectedPricing, searchQuery, sortBy, setSearchParams]);

  const tools = getTools({
    category: selectedCategory,
    pricing: selectedPricing,
    search: searchQuery,
    sort: sortBy,
  });

  useEffect(() => {
    updatePageSeo({
      title: 'AI Tools Directory | Best Verified AI Tools (2026)',
      description:
        'Search and filter curated artificial intelligence tools for writing, coding, image generation, video, productivity, and automation.',
      canonical: '/tools',
      jsonLd: getBreadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'AI Tools', url: '/tools' },
      ]),
    });
  }, [site]);

  return (
    <div>
      <Breadcrumbs items={[{ label: 'AI Tools', href: '/tools' }]} />

      {/* Page Title & Intro */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111215] dark:text-[#f4f4f5] mb-2">
          AI Tools Directory
        </h1>
        <p className="text-sm sm:text-base text-[#5e626d] dark:text-[#8e93a0] max-w-3xl leading-relaxed">
          Discover verified artificial intelligence tools, developer CLI agents, and productivity workflows demonstrated across @thefutureguyy.ai video reels.
        </p>
      </div>

      {/* Filters & Search */}
      <ToolFilters
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        selectedPricing={selectedPricing}
        onSelectPricing={setSelectedPricing}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortBy={sortBy}
        onSortChange={setSortBy}
        totalCount={tools.length}
      />

      {/* Tools Content Grid or Empty State */}
      {tools.length > 0 ? (
        <ToolGrid tools={tools} adSlotId={toolsAdSlot} showAdAfterIndex={6} />
      ) : (
        <EmptyState
          title="No AI tools match your criteria"
          description="Try broadening your category filter or clearing the search query to see all tools."
          actionText="Reset All Filters"
          onAction={() => {
            setSelectedCategory('all');
            setSelectedPricing('all');
            setSearchQuery('');
            setSortBy('featured');
          }}
        />
      )}

      {/* Bottom AdSlot */}
      {toolsAdSlot && tools.length > 6 && (
        <AdSlot slotId={toolsAdSlot} label="Featured Partner" className="mt-16" />
      )}
    </div>
  );
};
