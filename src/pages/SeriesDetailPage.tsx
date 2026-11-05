import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PlayCircle, Clock, ArrowRight, Instagram, Layers } from 'lucide-react';
import { getSeriesBySlug, getSeriesPosts } from '@/lib/data';
import { updatePageSeo, getBreadcrumbSchema } from '@/lib/seo';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { SeriesCard } from '@/components/series/SeriesCard';

export const SeriesDetailPage: React.FC = () => {
  const { seriesSlug } = useParams<{ seriesSlug: string }>();
  const navigate = useNavigate();

  const series = getSeriesBySlug(seriesSlug || '');
  const posts = getSeriesPosts(seriesSlug || '');

  useEffect(() => {
    if (!series) {
      navigate('/series', { replace: true });
      return;
    }

    updatePageSeo({
      title: `${series.title} · Video & Blog Series | futureclub.tech`,
      description: series.description,
      canonical: `/series/${series.slug}`,
      jsonLd: [
        getBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Series', url: '/series' },
          { name: series.title, url: `/series/${series.slug}` },
        ]),
      ],
    });
  }, [series, navigate]);

  if (!series) return null;

  return (
    <div className="space-y-12">
      <Breadcrumbs
        items={[
          { label: 'Series', href: '/series' },
          { label: series.title, href: `/series/${series.slug}` },
        ]}
      />

      {/* Series Hero Banner */}
      <div
        data-ui="series-hero"
        className="p-6 sm:p-10 rounded-xl bg-[#ffffff] dark:bg-[#141619] border border-[#e5e7eb] dark:border-[#22252c] space-y-6"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center text-xs font-semibold px-2.5 py-0.5 rounded bg-rose-100 text-rose-800 dark:bg-rose-950/70 dark:text-rose-300">
                <PlayCircle className="w-3.5 h-3.5 mr-1" />
                {series.badge || 'Curated Series'}
              </span>
              <span className="text-xs text-[#888d99] dark:text-[#636773]">
                {posts.length} {posts.length === 1 ? 'Episode' : 'Episodes'}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#111215] dark:text-[#f4f4f5] tracking-tight">
              {series.title}
            </h1>

            <p className="text-sm sm:text-base text-[#5e626d] dark:text-[#8e93a0] leading-relaxed">
              {series.description}
            </p>
          </div>

          <div className="flex-shrink-0">
            <a
              href="https://www.instagram.com/thefutureguyy.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary rounded-md px-5 py-2.5 text-xs sm:text-sm font-semibold inline-flex items-center justify-center"
            >
              <Instagram className="w-4 h-4 mr-2 text-[#ec4899]" />
              <span>Watch on @thefutureguyy.ai</span>
            </a>
          </div>
        </div>
      </div>

      {/* Episodes Grid */}
      <section className="space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#111215] dark:text-[#f4f4f5]">
            All Episodes in this Series
          </h2>
          <p className="text-xs sm:text-sm text-[#5e626d] dark:text-[#8e93a0]">
            Select an episode below to watch the embedded reel and read the deep technical blog post.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <SeriesCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
};

