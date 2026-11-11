import React, { useEffect } from 'react';
import { getAllNews, getNewsCategories } from '@/lib/data';
import { updatePageSeo, getBreadcrumbSchema } from '@/lib/seo';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { NewsGrid } from '@/components/news/NewsGrid';

export const NewsPage: React.FC = () => {
  const allNews = getAllNews({ status: 'published' });
  const categories = getNewsCategories();

  useEffect(() => {
    updatePageSeo({
      title: 'AI News | futureclub.tech',
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
    <div className="space-y-8 py-6">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'AI News' }]} />

      {/* News Archive & Directory */}
      <section aria-labelledby="news-heading" className="space-y-6">
        <h1
          id="news-heading"
          className="text-2xl sm:text-3xl font-extrabold text-[#111215] dark:text-[#f4f4f5] tracking-tight"
        >
          AI News
        </h1>

        <NewsGrid newsList={allNews} categories={categories} />
      </section>
    </div>
  );
};
