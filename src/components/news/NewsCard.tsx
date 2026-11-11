import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, User, ArrowUpRight } from 'lucide-react';
import { NewsItem } from '@/types/content';

interface NewsCardProps {
  article: NewsItem;
}

export const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  const formatPublishDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  return (
    <article
      data-ui="news-card"
      className="group flex flex-col rounded-xl bg-[#ffffff] dark:bg-[#111317] border border-[#e5e7eb] dark:border-[#222631] overflow-hidden hover:border-[#3b82f6]/40 dark:hover:border-[#3b82f6]/40 transition-colors"
    >
      {/* Cover Image */}
      <Link
        to={`/news/${article.slug}`}
        className="relative aspect-[16/9] w-full overflow-hidden bg-[#0d0f14]"
        aria-label={article.title}
      >
        <img
          src={article.coverImage}
          alt={article.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 z-10">
          <span className="inline-flex items-center px-2.5 py-1 rounded bg-[#111215] text-[#fbbf24] text-xs font-semibold">
            {article.category}
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="flex-1 p-5 flex flex-col justify-between space-y-3">
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-[#111215] dark:text-[#f4f4f5] leading-snug group-hover:text-[#1e3a8a] dark:group-hover:text-[#3b82f6] transition-colors line-clamp-2">
            <Link to={`/news/${article.slug}`}>{article.title}</Link>
          </h3>
          <p className="text-xs sm:text-sm text-[#5e626d] dark:text-[#8e93a0] line-clamp-2 leading-relaxed">
            {article.summary}
          </p>
        </div>

        {/* Footer Meta */}
        <div className="pt-3 flex items-center justify-between text-xs text-[#888d99] dark:text-[#787f90]">
          <span className="flex items-center">
            <Clock className="w-3 h-3 mr-1 text-[#fbbf24]" />
            {formatPublishDate(article.publishedAt)}
          </span>
          <span className="font-semibold text-[#1e3a8a] dark:text-[#3b82f6] group-hover:underline inline-flex items-center">
            <span>Read Story</span>
            <ArrowUpRight className="w-3 h-3 ml-0.5" />
          </span>
        </div>
      </div>
    </article>
  );
};
