import React, { useState } from 'react';
import { Search, Sparkles } from 'lucide-react';
import { NewsItem } from '@/types/content';
import { NewsCard } from './NewsCard';

interface NewsGridProps {
  newsList: NewsItem[];
  categories: string[];
}

export const NewsGrid: React.FC<NewsGridProps> = ({ newsList, categories }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredNews = newsList.filter((item) => {
    const matchesCategory =
      selectedCategory === 'all' ||
      item.category.toLowerCase() === selectedCategory.toLowerCase();

    const matchesSearch =
      searchQuery.trim() === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Search and Category Filters */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedCategory === 'all'
                ? 'bg-[#111215] dark:bg-[#f4f4f5] text-white dark:text-[#111215]'
                : 'bg-[#f4f4f0] dark:bg-[#1a1e26] text-[#5e626d] dark:text-[#8e93a0] hover:text-[#111215] dark:hover:text-[#f4f4f5]'
            }`}
          >
            All News ({newsList.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#111215] dark:bg-[#f4f4f5] text-white dark:text-[#111215]'
                  : 'bg-[#f4f4f0] dark:bg-[#1a1e26] text-[#5e626d] dark:text-[#8e93a0] hover:text-[#111215] dark:hover:text-[#f4f4f5]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#888d99]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search news..."
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-[#f4f4f0] dark:bg-[#141619] border border-transparent dark:border-[#22252c] text-sm text-[#111215] dark:text-[#f4f4f5] focus:outline-none focus:ring-1 focus:ring-[#3b82f6]"
          />
        </div>
      </div>

      {/* Grid */}
      {filteredNews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-[#ffffff] dark:bg-[#111317] rounded-xl border border-[#e5e7eb] dark:border-[#222631] p-8">
          <p className="text-base text-[#5e626d] dark:text-[#8e93a0] mb-3">
            No news articles found matching your criteria.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="text-sm font-semibold text-[#1e3a8a] dark:text-[#3b82f6] hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
};

