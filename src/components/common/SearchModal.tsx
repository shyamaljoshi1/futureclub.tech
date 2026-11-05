import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, Wrench, Sparkles, BookOpen, Layers, PlayCircle } from 'lucide-react';
import { globalSearch, SearchResultItem } from '@/lib/data';
import { trackSearchQuery } from '@/lib/analytics';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setResults([]);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      }
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
      } else if (e.key === 'Enter' && results[selectedIndex]) {
        e.preventDefault();
        navigate(results[selectedIndex].url);
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex, navigate, onClose]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    const hits = globalSearch(val);
    setResults(hits);
    setSelectedIndex(0);
    if (val.length > 2) {
      trackSearchQuery(val, hits.length);
    }
  };

  const handleSelect = (url: string) => {
    navigate(url);
    onClose();
  };

  if (!isOpen) return null;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'series':
        return <PlayCircle className="w-3.5 h-3.5 text-[#ec4899]" />;
      case 'tool':
        return <Wrench className="w-3.5 h-3.5 text-[#2563eb]" />;
      case 'prompt':
        return <Sparkles className="w-3.5 h-3.5 text-[#d97706]" />;
      case 'resource':
        return <BookOpen className="w-3.5 h-3.5 text-[#059669]" />;
      case 'collection':
        return <Layers className="w-3.5 h-3.5 text-[#475569]" />;
      default:
        return <Search className="w-3.5 h-3.5 text-[#888d99]" />;
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-modal-title"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60"
      onClick={onClose}
    >
      <div
        data-ui="search-dialog"
        className="w-full max-w-2xl bg-[#ffffff] dark:bg-[#141619] rounded-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center px-4 py-3.5 bg-[#f4f4f0] dark:bg-[#101215]">
          <Search className="w-5 h-5 text-[#888d99] dark:text-[#636773] mr-3" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            id="search-modal-title"
            value={query}
            onChange={handleSearch}
            placeholder="Search AI tools, prompts, guides, collections..."
            className="w-full bg-transparent text-sm sm:text-base text-[#111215] dark:text-[#f4f4f5] placeholder-[#888d99] dark:placeholder-[#636773] focus:outline-none"
          />
          {query ? (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setResults([]);
              }}
              className="p-1 text-[#888d99] hover:text-[#111215] dark:hover:text-[#f4f4f5]"
              aria-label="Clear query"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <span className="hidden sm:inline-block px-2 py-0.5 text-xs text-[#888d99] dark:text-[#636773] bg-[#eaeae5] dark:bg-[#1c1f24] rounded">
              Esc
            </span>
          )}
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto p-2">
          {query.trim().length >= 2 && results.length === 0 ? (
            <div className="py-8 text-center text-sm text-[#5e626d] dark:text-[#8e93a0]">
              No resources found matching &quot;{query}&quot;. Try searching for &quot;Claude&quot;, &quot;LinkedIn&quot;, or &quot;Coding&quot;.
            </div>
          ) : results.length > 0 ? (
            <ul className="space-y-1">
              {results.map((item, idx) => {
                const isSelected = idx === selectedIndex;
                return (
                  <li key={`${item.type}-${item.id}`}>
                    <button
                      type="button"
                      onClick={() => handleSelect(item.url)}
                      className={`w-full text-left px-3 py-2.5 rounded flex items-center justify-between transition-colors ${
                        isSelected
                          ? 'bg-[#f4f4f0] dark:bg-[#1c1f24] text-[#111215] dark:text-[#f4f4f5]'
                          : 'text-[#5e626d] dark:text-[#8e93a0] hover:bg-[#f4f4f0] dark:hover:bg-[#1c1f24]'
                      }`}
                    >
                      <div className="flex items-center space-x-3 overflow-hidden">
                        <span className="p-1.5 rounded bg-[#eaeae5] dark:bg-[#22252c] flex-shrink-0">
                          {getTypeIcon(item.type)}
                        </span>
                        <div className="truncate">
                          <p className="text-sm font-medium text-[#111215] dark:text-[#f4f4f5] truncate">
                            {item.title}
                          </p>
                          <p className="text-xs text-[#888d99] dark:text-[#636773] truncate">
                            {item.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 flex-shrink-0 ml-3">
                        {item.badge && (
                          <span className="text-[10px] capitalize px-1.5 py-0.5 rounded bg-[#eaeae5] dark:bg-[#22252c] text-[#5e626d] dark:text-[#8e93a0]">
                            {item.badge}
                          </span>
                        )}
                        <ArrowRight className="w-3.5 h-3.5 text-[#888d99]" />
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="py-6 px-4">
              <p className="text-xs font-semibold text-[#888d99] dark:text-[#636773] mb-2">
                Quick Suggestions
              </p>
              <div className="flex flex-wrap gap-2">
                {['ChatGPT', 'Claude 3.5', 'Cursor', 'Midjourney', 'LinkedIn Prompts', 'Cold Email', 'Generative UI'].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => {
                      setQuery(s);
                      setResults(globalSearch(s));
                    }}
                    className="text-xs px-2.5 py-1 rounded bg-[#f4f4f0] dark:bg-[#1c1f24] text-[#5e626d] dark:text-[#8e93a0] hover:text-[#111215] dark:hover:text-[#f4f4f5]"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="px-4 py-2 bg-[#f4f4f0] dark:bg-[#101215] flex items-center justify-between text-xs text-[#888d99] dark:text-[#636773]">
          <span className="hidden sm:inline">Use arrow keys to navigate, Enter to select</span>
          <span>The Future Guy AI Directory</span>
        </div>
      </div>
    </div>
  );
};
