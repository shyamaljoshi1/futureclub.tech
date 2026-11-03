import React from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import type { Category } from '@/types/content';

interface ToolFiltersProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  selectedPricing: string;
  onSelectPricing: (pricing: 'free' | 'freemium' | 'paid' | 'all') => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  sortBy: 'newest' | 'alphabetical' | 'featured';
  onSortChange: (sort: 'newest' | 'alphabetical' | 'featured') => void;
  totalCount: number;
}

export const ToolFilters: React.FC<ToolFiltersProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  selectedPricing,
  onSelectPricing,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  totalCount,
}) => {
  return (
    <div className="space-y-4 mb-8">
      {/* Search and Sort row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888d99] dark:text-[#636773]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search AI tools by name, features, or workflows..."
            className="w-full pl-9 pr-9 py-2 text-sm rounded border border-[#e5e5e0] dark:border-[#22252c] bg-[#ffffff] dark:bg-[#141619] text-[#111215] dark:text-[#f4f4f5] placeholder-[#888d99] dark:placeholder-[#636773] focus:outline-none focus:ring-1 focus:ring-[#111215] dark:focus:ring-[#f4f4f5]"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#888d99] hover:text-[#111215] dark:hover:text-[#f4f4f5]"
              aria-label="Clear search query"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort and Pricing Selectors */}
        <div className="flex items-center space-x-2">
          {/* Pricing filter */}
          <select
            value={selectedPricing}
            onChange={(e) =>
              onSelectPricing(e.target.value as 'free' | 'freemium' | 'paid' | 'all')
            }
            className="px-3 py-2 text-xs font-medium rounded border border-[#e5e5e0] dark:border-[#22252c] bg-[#ffffff] dark:bg-[#141619] text-[#111215] dark:text-[#f4f4f5] focus:outline-none"
            aria-label="Filter by pricing model"
          >
            <option value="all">All Pricing</option>
            <option value="free">Free</option>
            <option value="freemium">Freemium</option>
            <option value="paid">Paid</option>
          </select>

          {/* Sort selector */}
          <select
            value={sortBy}
            onChange={(e) =>
              onSortChange(e.target.value as 'newest' | 'alphabetical' | 'featured')
            }
            className="px-3 py-2 text-xs font-medium rounded border border-[#e5e5e0] dark:border-[#22252c] bg-[#ffffff] dark:bg-[#141619] text-[#111215] dark:text-[#f4f4f5] focus:outline-none"
            aria-label="Sort tools"
          >
            <option value="featured">Featured First</option>
            <option value="newest">Newest Added</option>
            <option value="alphabetical">Alphabetical (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Category Pills horizontal scroll */}
      <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 pt-1 scrollbar-none">
        <button
          type="button"
          onClick={() => onSelectCategory('all')}
          className={`px-3 py-1.5 rounded text-xs font-medium whitespace-nowrap transition-colors ${
            selectedCategory === 'all'
              ? 'bg-[#111215] text-[#ffffff] dark:bg-[#f4f4f5] dark:text-[#111215]'
              : 'bg-[#ffffff] dark:bg-[#141619] text-[#5e626d] dark:text-[#8e93a0] border border-[#e5e5e0] dark:border-[#22252c] hover:text-[#111215] dark:hover:text-[#f4f4f5]'
          }`}
        >
          All Categories
        </button>

        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => onSelectCategory(cat.slug)}
            className={`px-3 py-1.5 rounded text-xs font-medium whitespace-nowrap transition-colors ${
              selectedCategory === cat.slug
                ? 'bg-[#111215] text-[#ffffff] dark:bg-[#f4f4f5] dark:text-[#111215]'
                : 'bg-[#ffffff] dark:bg-[#141619] text-[#5e626d] dark:text-[#8e93a0] border border-[#e5e5e0] dark:border-[#22252c] hover:text-[#111215] dark:hover:text-[#f4f4f5]'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Count readout */}
      <div className="flex items-center justify-between text-xs text-[#888d99] dark:text-[#636773] pt-1">
        <span>
          Showing <strong className="text-[#111215] dark:text-[#f4f4f5]">{totalCount}</strong> verified AI tools
        </span>
        {(selectedCategory !== 'all' || selectedPricing !== 'all' || searchQuery) && (
          <button
            type="button"
            onClick={() => {
              onSelectCategory('all');
              onSelectPricing('all');
              onSearchChange('');
            }}
            className="text-xs text-[#1e3a8a] dark:text-[#3b82f6] hover:underline flex items-center"
          >
            <SlidersHorizontal className="w-3 h-3 mr-1" />
            Reset all filters
          </button>
        )}
      </div>
    </div>
  );
};
