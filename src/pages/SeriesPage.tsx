import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlayCircle, Clock, ArrowRight, Instagram } from 'lucide-react';
import { getAllSeries, getAllSeriesPosts } from '@/lib/data';
import { updatePageSeo, getBreadcrumbSchema } from '@/lib/seo';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { SeriesCard } from '@/components/series/SeriesCard';

export const SeriesPage: React.FC = () => {
  const seriesList = getAllSeries();
  const allPosts = getAllSeriesPosts();

  useEffect(() => {
    updatePageSeo({
      title: 'Original AI Series | 2 Minute me samjo & Deep Dives',
      description: 'Explore original video & blog series by @thefutureguyy.ai. Fast-track 2-minute visual explainers on frontier AI breakthroughs, neural architectures, and developer mechanics.',
      canonical: '/series',
      jsonLd: [
        getBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Series', url: '/series' },
        ]),
      ],
    });
  }, []);

  const featuredSeries = seriesList[0];

  return (
    <div className="space-y-12">
      <Breadcrumbs items={[{ label: 'Series', href: '/series' }]} />

      {/* Hero Header */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center text-xs font-semibold px-2.5 py-0.5 rounded bg-rose-100 text-rose-800 dark:bg-rose-950/70 dark:text-rose-300">
            <PlayCircle className="w-3.5 h-3.5 mr-1" />
            Original Video &amp; Blog Series
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#111215] dark:text-[#f4f4f5] tracking-tight">
          Explore Curated AI Series
        </h1>

        <p className="text-sm sm:text-base text-[#5e626d] dark:text-[#8e93a0] max-w-2xl leading-relaxed">
          Deep-dive Instagram reels paired with comprehensive technical blog posts. Watch the 120-second reel on the left, then unpack the architecture, research papers, and code implementations on the right.
        </p>
      </div>

      {/* Featured Series Hero Card: 2 Minute me samjo */}
      {featuredSeries && (
        <section
          data-ui="featured-series-banner"
          className="relative rounded-xl overflow-hidden bg-[#18181b] border border-[#27272a] p-6 sm:p-10 text-white"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#f43f5e]"></span>
                <span className="text-xs font-semibold text-[#f43f5e]">
                  {featuredSeries.badge || 'Featured Series'}
                </span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                {featuredSeries.title}
              </h2>

              <p className="text-sm sm:text-base text-[#d4d4d8] leading-relaxed max-w-xl">
                {featuredSeries.description}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-[#a1a1aa]">
                <div className="flex items-center space-x-1.5">
                  <Clock className="w-4 h-4 text-[#60a5fa]" />
                  <span>120-second fast-track format</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Instagram className="w-4 h-4 text-[#ec4899]" />
                  <span>Demonstrated on @thefutureguyy.ai</span>
                </div>
              </div>

              <div className="pt-4 flex items-center gap-3">
                <Link
                  to={`/series/${featuredSeries.slug}`}
                  className="btn-primary rounded-md px-6 py-2.5 text-xs sm:text-sm font-semibold inline-flex items-center justify-center bg-[#f43f5e] hover:bg-[#e11d48] text-white border-none"
                >
                  <span>Explore Series Episodes</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <Link
                to={`/series/${featuredSeries.slug}`}
                className="group relative block aspect-[16/9] rounded-lg overflow-hidden border border-white/10 bg-[#090a0f]"
              >
                <img
                  src={featuredSeries.coverImage}
                  alt={featuredSeries.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/70 flex items-end p-4">
                  <div className="flex items-center space-x-2 text-xs font-semibold text-white">
                    <PlayCircle className="w-5 h-5 text-[#f43f5e]" />
                    <span>Watch latest: Episode 01</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Episodes Directory */}
      <section className="space-y-6 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#111215] dark:text-[#f4f4f5]">
              Latest Series Episodes
            </h2>
            <p className="text-xs sm:text-sm text-[#5e626d] dark:text-[#8e93a0]">
              Every episode features an embedded video reel on the left and full technical blog on the right.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allPosts.map((post) => (
            <SeriesCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
};
