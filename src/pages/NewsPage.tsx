import React, { useEffect } from 'react';
import { Newspaper, Sparkles } from 'lucide-react';
import { getAllNews, getNewsCategories, getFeaturedTodayNews } from '@/lib/data';
import { updatePageSeo, getBreadcrumbSchema } from '@/lib/seo';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { NewsGrid } from '@/components/news/NewsGrid';
import { NewsCarousel } from '@/components/news/NewsCarousel';

export const NewsPage: React.FC = () => {
  const allNews = getAllNews({ status: 'published' });
  const featuredNews = getFeaturedTodayNews();
  const categories = getNewsCategories();

  useEffect(() => {
    updatePageSeo({
      title: 'AI News & Daily Briefings | futureclub.tech',
      description:
        'Stay updated with daily artificial intelligence news, frontier model releases, autonomous agent breakthroughs, and open-source developer updates.',
      canonical: '/news',
      jsonLd: [
        getBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'AI News', url: '/news' },
        ]),
      ],
    });
  }, []);

  return (
    <div className="space-y-12 py-6">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'AI News' }]} />

      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center space-x-2 text-xs font-semibold text-[#d97706] dark:text-[#fbbf24]">
          <Newspaper className="w-4 h-4" />
          <span>Daily AI Intelligence</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#111215] dark:text-[#f4f4f5] tracking-tight">
          AI News &amp; Daily Briefings
        </h1>
        <p className="text-base sm:text-lg text-[#5e626d] dark:text-[#8e93a0] leading-relaxed">
          Daily verified intelligence on frontier LLMs, creative AI video engines, autonomous browser agents, and developer utilities.
        </p>
      </div>

      {/* Featured Today's Carousel */}
      {featuredNews.length > 0 && (
        <section aria-labelledby="featured-news-heading" className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <h2
              id="featured-news-heading"
              className="text-lg font-bold text-[#111215] dark:text-[#f4f4f5] flex items-center"
            >
              <Sparkles className="w-4 h-4 mr-2 text-[#fbbf24]" />
              <span>Today&apos;s Featured Stories {/* taste-skill-ignore */}</span>
            </h2>
          </div>
          <NewsCarousel newsItems={featuredNews} />
        </section>
      )}

      {/* Complete News Archive & Directory */}
      <section aria-labelledby="news-archive-heading" className="space-y-6 pt-10">
        <div className="space-y-1">
          <h2
            id="news-archive-heading"
            className="text-2xl font-bold text-[#111215] dark:text-[#f4f4f5] tracking-tight"
          >
            All AI News Articles
          </h2>
          <p className="text-sm text-[#5e626d] dark:text-[#8e93a0]">
            Browse the complete archive of past updates, industry announcements, and releases.
          </p>
        </div>

        <NewsGrid newsList={allNews} categories={categories} />
      </section>
    </div>
  );
};
