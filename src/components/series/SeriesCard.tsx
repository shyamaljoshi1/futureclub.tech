import React from 'react';
import { Link } from 'react-router-dom';
import { PlayCircle, Clock, ArrowRight, Instagram } from 'lucide-react';
import type { SeriesPost } from '@/types/content';

interface SeriesCardProps {
  post: SeriesPost;
  featured?: boolean;
}

export const SeriesCard: React.FC<SeriesCardProps> = ({ post }) => {
  return (
    <article
      data-ui="series-card"
      className="group flex flex-col justify-between rounded-lg bg-[#ffffff] dark:bg-[#141619] overflow-hidden transition-transform duration-200 hover:-translate-y-0.5 border border-[#e5e7eb]/60 dark:border-[#22252c]"
    >
      <div>
        {/* Thumbnail Container */}
        <Link
          to={`/series/${post.seriesSlug}/${post.slug}`}
          className="relative block aspect-[16/9] w-full overflow-hidden bg-[#0d0f12]"
        >
          <img
            src={post.coverImage || post.reelThumbnail}
            alt={post.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Top Left Badge: Series Name & Episode */}
          <div className="absolute top-2.5 left-2.5 flex items-center space-x-1.5 px-2.5 py-1 rounded bg-black/90 text-white text-[11px] font-semibold border border-white/10">
            <span className="w-2 h-2 rounded-full bg-[#f43f5e]"></span>
            <span>{post.seriesTitle}</span>
            <span className="text-[#a1a1aa]">•</span>
            <span className="text-[#f43f5e]">Ep {post.episodeNumber}</span>
          </div>

          {/* Top Right Read Time */}
          <div className="absolute top-2.5 right-2.5 flex items-center space-x-1 px-2 py-0.5 rounded bg-black/80 text-white text-[11px]">
            <Clock className="w-3 h-3 text-[#60a5fa]" />
            <span>{post.readTime}</span>
          </div>
        </Link>

        {/* Card Body */}
        <div className="p-5 space-y-2.5">
          <div className="flex items-center justify-between text-xs text-[#888d99] dark:text-[#636773]">
            <span className="font-semibold text-[#1e3a8a] dark:text-[#60a5fa] text-[11px]">
              {post.category}
            </span>
            <span>{post.publishedAt}</span>
          </div>

          <h3 className="text-lg font-bold text-[#111215] dark:text-[#f4f4f5] group-hover:text-[#1e3a8a] dark:group-hover:text-[#60a5fa] transition-colors leading-snug">
            <Link to={`/series/${post.seriesSlug}/${post.slug}`}>
              {post.title}
            </Link>
          </h3>

          <p className="text-xs sm:text-sm text-[#5e626d] dark:text-[#8e93a0] line-clamp-2 leading-relaxed">
            {post.description}
          </p>
        </div>
      </div>

      {/* Footer bar */}
      <div data-ui="series-card-footer" className="px-5 pb-5 pt-3 flex items-center justify-between text-xs">
        <span className="text-[#5e626d] dark:text-[#8e93a0] inline-flex items-center">
          <Instagram className="w-3.5 h-3.5 mr-1 text-[#ec4899]" />
          <span>Reel + Blog</span>
        </span>

        <Link
          to={`/series/${post.seriesSlug}/${post.slug}`}
          className="font-semibold text-[#111215] dark:text-[#f4f4f5] inline-flex items-center group-hover:translate-x-1 transition-transform"
        >
          <span>Watch &amp; Read</span>
          <ArrowRight className="w-3.5 h-3.5 ml-1 text-[#888d99] dark:text-[#636773]" />
        </Link>
      </div>
    </article>
  );
};
