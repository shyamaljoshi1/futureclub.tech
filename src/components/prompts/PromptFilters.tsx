import React from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import type { Category } from '@/types/content';

interface PromptFiltersProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  selectedPlatform: string;
  onSelectPlatform: (platform: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  totalCount: number;
}

const PLATFORMS = [
  { id: 'all', label: 'All AI Models' },
  { id: 'chatgpt', label: 'ChatGPT' },
  { id: 'claude', label: 'Claude' },
  { id: 'gemini', label: 'Gemini' },
  { id: 'midjourney', label: 'Midjourney' },
];

export const PromptFilters: React.FC<PromptFiltersProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  selectedPlatform,
  onSelectPlatform,
  searchQuery,
  onSearchChange,
  totalCount,
}) => {
  return (
    <div className="space-y-4 mb-8">
      {/* Search and Platform Row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888d99] dark:text-[#636773]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search prompt library by role, task, or keyword..."
            className="w-full pl-9 pr-9 py-2 text-sm rounded border border-[#e5e5e0] dark:border-[#22252c] bg-[#ffffff] dark:bg-[#141619] text-[#111215] dark:text-[#f4f4f5] placeholder-[#888d99] dark:placeholder-[#636773] focus:outline-none focus:ring-1 focus:ring-[#111215] dark:focus:ring-[#f4f4f5]"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#888d99] hover:text-[#111215] dark:hover:text-[#f4f4f5]"
              aria-label="Clear prompt search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Platform model filter */}
        <div className="flex items-center space-x-1 overflow-x-auto pb-1 sm:pb-0">
          {PLATFORMS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => onSelectPlatform(p.id)}
              className={`px-3 py-1.5 rounded text-xs font-medium whitespace-nowrap transition-colors ${
                selectedPlatform === p.id
                  ? 'bg-[#111215] text-[#ffffff] dark:bg-[#f4f4f5] dark:text-[#111215]'
                  : 'bg-[#ffffff] dark:bg-[#141619] text-[#5e626d] dark:text-[#8e93a0] border border-[#e5e5e0] dark:border-[#22252c] hover:text-[#111215] dark:hover:text-[#f4f4f5]'
              }`}
            >
              {p.label}
            </button>
          ))}
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

      {/* Readout */}
      <div className="flex items-center justify-between text-xs text-[#888d99] dark:text-[#636773] pt-1">
        <span>
          Showing <strong className="text-[#111215] dark:text-[#f4f4f5]">{totalCount}</strong> ready-to-copy prompts
        </span>
        {(selectedCategory !== 'all' || selectedPlatform !== 'all' || searchQuery) && (
          <button
            type="button"
            onClick={() => {
              onSelectCategory('all');
              onSelectPlatform('all');
              onSearchChange('');
            }}
            className="text-xs text-[#1e3a8a] dark:text-[#3b82f6] hover:underline flex items-center"
          >
            <SlidersHorizontal className="w-3 h-3 mr-1" />
            Reset filters
          </button>
        )}
      </div>
    </div>
  );
};
