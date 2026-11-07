import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PlayCircle, Clock, ArrowRight, Instagram, Layers } from 'lucide-react';
import { getAllSeries, getAllSeriesPosts } from '@/lib/data';
import { updatePageSeo, getBreadcrumbSchema } from '@/lib/seo';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { SeriesCard } from '@/components/series/SeriesCard';

export const SeriesPage: React.FC = () => {
  const seriesList = getAllSeries();
  const allPosts = getAllSeriesPosts();
  const [selectedSeriesSlug, setSelectedSeriesSlug] = useState<string>('all');

  useEffect(() => {
    updatePageSeo({
      title: 'Original Engineering & AI Series | Video Reels & Deep Tech Guides',
      description: 'Explore original video & blog series by @thefutureguyy.ai. From Localhost to Production cloud engineering to 2 Minute me samjo AI research breakdowns.',
      canonical: '/series',
      jsonLd: [
        getBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Series', url: '/series' },
        ]),
      ],
    });
  }, []);

  const filteredPosts =
    selectedSeriesSlug === 'all'
      ? allPosts
      : allPosts.filter((p) => p.seriesSlug === selectedSeriesSlug);

  return (
    <div className="space-y-12">
      <Breadcrumbs items={[{ label: 'Series', href: '/series' }]} />

      {/* Hero Header */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center text-xs font-semibold px-2.5 py-0.5 rounded bg-rose-100 text-rose-800 dark:bg-rose-950/70 dark:text-rose-300">
            <PlayCircle className="w-3.5 h-3.5 mr-1" />
            Original Video &amp; Technical Series
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#111215] dark:text-[#f4f4f5] tracking-tight">
          Explore Original Series
        </h1>

        <p className="text-sm sm:text-base text-[#5e626d] dark:text-[#8e93a0] max-w-2xl leading-relaxed">
          Deep-dive video reels paired with comprehensive technical blog posts. Watch the breakdown on the left, then unpack the systems architecture, research papers, and code implementations on the right.
        </p>
      </div>

      {/* Curated Series Tracks Showcase */}
      <section className="space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#111215] dark:text-[#f4f4f5]">
            Featured Series Tracks
          </h2>
          <p className="text-xs sm:text-sm text-[#5e626d] dark:text-[#8e93a0]">
            Browse multi-part technical journeys from systems engineering to frontier AI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {seriesList.map((series) => {
            const seriesPostsCount = allPosts.filter((p) => p.seriesSlug === series.slug).length;
            return (
              <div
                key={series.id}
                data-ui="series-track-card"
                className="group relative rounded-xl overflow-hidden bg-[#18181b] border border-[#27272a] p-6 sm:p-8 text-white flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full bg-white/10 text-[#38bdf8] border border-white/10">
                      <Layers className="w-3.5 h-3.5 mr-1.5" />
                      {series.badge || 'Curated Series'}
                    </span>
                    <span className="text-xs text-[#a1a1aa] font-medium">
                      {seriesPostsCount} {seriesPostsCount === 1 ? 'Episode' : 'Episodes'}
                    </span>
                  </div>

                  <h3 className="text-2xl font-extrabold tracking-tight group-hover:text-[#38bdf8] transition-colors">
                    <Link to={`/series/${series.slug}`}>{series.title}</Link>
                  </h3>

                  <p className="text-xs sm:text-sm text-[#d4d4d8] leading-relaxed line-clamp-3">
                    {series.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 flex items-center justify-between">
                  <div className="flex items-center space-x-1.5 text-xs text-[#a1a1aa]">
                    <Clock className="w-3.5 h-3.5 text-[#38bdf8]" />
                    <span>Video Reel + In-Depth Blog</span>
                  </div>

                  <Link
                    to={`/series/${series.slug}`}
                    className="btn-primary rounded-md px-4 py-2 text-xs font-semibold inline-flex items-center justify-center bg-[#38bdf8] hover:bg-[#0284c7] text-[#090b0e] border-none transition-colors"
                  >
                    <span>View Episodes</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Episodes Directory with Filter Tabs */}
      <section className="space-y-6 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#111215] dark:text-[#f4f4f5]">
              Latest Series Episodes
            </h2>
            <p className="text-xs sm:text-sm text-[#5e626d] dark:text-[#8e93a0]">
              Every episode features an embedded video reel on the left and full technical blog on the right.
            </p>
          </div>

          {/* Filter Pills */}
          <div data-ui="series-filter-pills" className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setSelectedSeriesSlug('all')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                selectedSeriesSlug === 'all'
                  ? 'bg-[#111215] text-[#ffffff] dark:bg-[#f4f4f5] dark:text-[#111215]'
                  : 'bg-[#f4f4f0] text-[#5e626d] hover:bg-[#eaeae4] dark:bg-[#1a1d23] dark:text-[#8e93a0] dark:hover:bg-[#22262f]'
              }`}
            >
              All Episodes ({allPosts.length})
            </button>
            {seriesList.map((s) => {
              const count = allPosts.filter((p) => p.seriesSlug === s.slug).length;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSelectedSeriesSlug(s.slug)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    selectedSeriesSlug === s.slug
                      ? 'bg-[#111215] text-[#ffffff] dark:bg-[#f4f4f5] dark:text-[#111215]'
                      : 'bg-[#f4f4f0] text-[#5e626d] hover:bg-[#eaeae4] dark:bg-[#1a1d23] dark:text-[#8e93a0] dark:hover:bg-[#22262f]'
                  }`}
                >
                  {s.title} ({count})
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <SeriesCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
};
