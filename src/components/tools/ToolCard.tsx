import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, TrendingUp, Instagram, Layers, ExternalLink } from 'lucide-react';
import type { ToolAdapter } from '@/lib/data';
import { trackToolClick, trackExternalVisit } from '@/lib/analytics';

interface ToolCardProps {
  tool: ToolAdapter;
}

export const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  const [imageError, setImageError] = useState(false);

  const getPricingBadge = (pricing: string) => {
    switch (pricing) {
      case 'free':
        return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400';
      case 'freemium':
        return 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400';
      case 'paid':
        return 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <article
      data-ui="tool-card"
      className="group flex flex-col justify-between rounded-lg bg-[#ffffff] dark:bg-[#141619] overflow-hidden transition-colors"
    >
      <div>
        {/* Reel Thumbnail Header */}
        <Link
          to={`/tools/${tool.slug}`}
          onClick={() => trackToolClick(tool.slug, tool.name)}
          className="relative block aspect-[16/9] w-full overflow-hidden bg-[#111215]"
        >
          {tool.reelThumbnail && !imageError ? (
            <img
              src={tool.reelThumbnail}
              alt={`${tool.name} Instagram reel thumbnail`}
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white font-bold text-xl">
              {tool.name}
            </div>
          )}

          <div className="absolute top-2.5 left-2.5 flex items-center space-x-1.5 px-2 py-1 rounded bg-black/80 text-white text-[11px] font-medium">
            {tool.postType === 'carousel' ? (
              <>
                <Layers className="w-3.5 h-3.5 text-[#d97706]" />
                <span>Prompt Carousel</span>
              </>
            ) : (
              <>
                <Instagram className="w-3.5 h-3.5 text-[#ec4899]" />
                <span>Reel Breakdown</span>
              </>
            )}
          </div>

          <div className="absolute top-2.5 right-2.5 flex items-center space-x-1">
            {tool.trending && (
              <span
                title="Trending"
                className="p-1 rounded bg-black/70 text-[#ea580c]"
                aria-label="Trending"
              >
                <TrendingUp className="w-3.5 h-3.5" />
              </span>
            )}
            {tool.featured && (
              <span
                title="Featured"
                className="p-1 rounded bg-black/70 text-[#d97706]"
                aria-label="Featured"
              >
                <Sparkles className="w-3.5 h-3.5" />
              </span>
            )}
          </div>
        </Link>

        {/* Card Body */}
        <div className="p-5">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <h3 className="text-base font-semibold text-[#111215] dark:text-[#f4f4f5] group-hover:text-[#1e3a8a] dark:group-hover:text-[#3b82f6] transition-colors leading-snug">
                <Link
                  to={`/tools/${tool.slug}`}
                  onClick={() => trackToolClick(tool.slug, tool.name)}
                >
                  {tool.name}
                </Link>
              </h3>
              <p className="text-xs text-[#888d99] dark:text-[#636773] capitalize">
                {tool.category.replace('-', ' ')}
              </p>
            </div>

            <span
              className={`text-[11px] font-medium capitalize px-2 py-0.5 rounded ${getPricingBadge(
                tool.pricing
              )}`}
            >
              {tool.pricing}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-[#5e626d] dark:text-[#8e93a0] line-clamp-2 leading-relaxed mb-4">
            {tool.description}
          </p>

          {/* Quick Prompt Count */}
          {tool.promptSet && tool.promptSet.length > 0 && (
            <div className="text-xs text-[#1e3a8a] dark:text-[#3b82f6] font-medium mb-2">
              Includes {tool.promptSet.length} verified prompt template
            </div>
          )}
        </div>
      </div>

      {/* Footer bar: Official Website + View Details */}
      <div className="px-5 pb-5 pt-1 flex items-center justify-between">
        {tool.websiteUrl ? (
          <a
            href={tool.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackExternalVisit(tool.websiteUrl, tool.name)}
            className="text-xs font-medium text-[#5e626d] dark:text-[#8e93a0] hover:text-[#111215] dark:hover:text-[#f4f4f5] inline-flex items-center"
          >
            <span>Official Site</span>
            <ExternalLink className="w-3 h-3 ml-1" />
          </a>
        ) : (
          <a
            href={tool.instagramReelUrl || 'https://www.instagram.com/thefutureguyy.ai/'}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium text-[#5e626d] dark:text-[#8e93a0] hover:text-[#111215] dark:hover:text-[#f4f4f5] inline-flex items-center"
          >
            <span>Instagram Post</span>
            <ExternalLink className="w-3 h-3 ml-1" />
          </a>
        )}

        <Link
          to={`/tools/${tool.slug}`}
          onClick={() => trackToolClick(tool.slug, tool.name)}
          className="text-xs font-semibold text-[#111215] dark:text-[#f4f4f5] inline-flex items-center group-hover:translate-x-0.5 transition-transform"
        >
          <span>Watch Reel & Prompts</span>
          <ArrowRight className="w-3.5 h-3.5 ml-1 text-[#888d99] dark:text-[#636773]" />
        </Link>
      </div>
    </article>
  );
};
