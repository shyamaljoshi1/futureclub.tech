import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  PlayCircle,
  Clock,
  Tag,
  ExternalLink,
  Instagram,
  Copy,
  Check,
  ArrowRight,
  BookOpen,
  Sparkles,
  Zap,
  BookmarkCheck,
} from 'lucide-react';
import { getSeriesPostBySlug, getSeriesBySlug, getRelatedSeriesPosts } from '@/lib/data';
import { updatePageSeo, getBreadcrumbSchema, getSeriesPostSchema } from '@/lib/seo';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { InstagramReelEmbed } from '@/components/common/InstagramReelEmbed';
import { trackExternalVisit } from '@/lib/analytics';

export const SeriesPostPage: React.FC = () => {
  const { seriesSlug, postSlug } = useParams<{ seriesSlug?: string; postSlug?: string }>();
  const navigate = useNavigate();
  const [copiedLink, setCopiedLink] = useState(false);

  // Support both /series/:seriesSlug/:postSlug and /series/:postSlug
  const slugToLookup = postSlug || seriesSlug || '';
  const post = getSeriesPostBySlug(slugToLookup);

  useEffect(() => {
    if (!post) {
      navigate('/series', { replace: true });
      return;
    }

    updatePageSeo({
      title: post.seo.title,
      description: post.seo.description,
      canonical: `/series/${post.seriesSlug}/${post.slug}`,
      ogImage: post.coverImage || post.reelThumbnail,
      jsonLd: [
        getSeriesPostSchema(post),
        getBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Series', url: '/series' },
          { name: post.seriesTitle, url: `/series/${post.seriesSlug}` },
          { name: post.title, url: `/series/${post.seriesSlug}/${post.slug}` },
        ]),
      ],
    });
  }, [post, navigate]);

  if (!post) return null;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch (err) {
      console.error('Failed to copy URL', err);
    }
  };

  return (
    <div className="space-y-10">
      <Breadcrumbs
        items={[
          { label: 'Series', href: '/series' },
          { label: post.seriesTitle, href: `/series/${post.seriesSlug}` },
          { label: post.title, href: `/series/${post.seriesSlug}/${post.slug}` },
        ]}
      />

      {/* Header Info Block */}
      <header
        data-ui="series-post-header"
        className="p-6 sm:p-10 rounded-xl bg-[#ffffff] dark:bg-[#141619] border border-[#e5e7eb] dark:border-[#22252c] space-y-5"
      >
        <div className="flex flex-wrap items-center gap-2">
          <Link
            to={`/series/${post.seriesSlug}`}
            className="inline-flex items-center text-xs font-bold px-2.5 py-1 rounded bg-rose-100 text-rose-800 dark:bg-rose-950/70 dark:text-rose-300 hover:opacity-90 transition-opacity"
          >
            <PlayCircle className="w-3.5 h-3.5 mr-1" />
            <span>{post.seriesTitle}</span>
          </Link>

          <span className="text-xs font-semibold px-2.5 py-1 rounded bg-[#f4f4f0] dark:bg-[#1c1f24] text-[#111215] dark:text-[#f4f4f5]">
            Episode {post.episodeNumber}
          </span>

          <span className="text-xs text-[#5e626d] dark:text-[#8e93a0] flex items-center px-2 py-0.5">
            <Tag className="w-3 h-3 mr-1 text-[#888d99]" />
            {post.category}
          </span>

          <span className="text-xs text-[#5e626d] dark:text-[#8e93a0] flex items-center px-2 py-0.5">
            <Clock className="w-3 h-3 mr-1 text-[#60a5fa]" />
            {post.readTime}
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-[#111215] dark:text-[#f4f4f5] tracking-tight leading-tight">
          {post.title}
        </h1>

        {post.subtitle && (
          <p className="text-base sm:text-xl text-[#5e626d] dark:text-[#8e93a0] font-medium leading-relaxed max-w-3xl">
            {post.subtitle}
          </p>
        )}

        <div
          data-ui="post-meta-footer"
          className="pt-6 mt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4"
        >
          <div className="flex items-center space-x-3 text-xs text-[#5e626d] dark:text-[#8e93a0]">
            <img
              src="/logo.png"
              alt="@thefutureguyy.ai"
              className="w-7 h-7 rounded-full bg-[#f4f4f0] dark:bg-[#1c1f24] object-contain p-0.5 border border-[#e5e7eb] dark:border-[#22252c]"
            />
            <div>
              <span className="font-semibold text-[#111215] dark:text-[#f4f4f5] block">
                By @thefutureguyy.ai
              </span>
              <span>Published on {post.publishedAt}</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handleCopyLink}
              className="px-4 py-2 rounded-md text-xs font-semibold border border-[#d6d8db] dark:border-[#2a2e37] bg-[#ffffff] dark:bg-[#1a1d23] text-[#111215] dark:text-[#f4f4f5] hover:bg-[#f4f4f0] dark:hover:bg-[#22262e] inline-flex items-center transition-colors"
              aria-label="Copy article link"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 mr-1.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Link Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 mr-1.5 text-[#5e626d] dark:text-[#8e93a0]" />
                  <span>Share Post</span>
                </>
              )}
            </button>

            {post.instagramReelUrl && (
              <a
                href={post.instagramReelUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackExternalVisit(post.instagramReelUrl, `${post.title} Reel`)}
                className="btn-primary rounded-md px-4 py-2 text-xs font-semibold inline-flex items-center justify-center bg-[#111215] text-[#ffffff] dark:bg-[#f4f4f5] dark:text-[#111215]"
              >
                <Instagram className="w-3.5 h-3.5 mr-1.5 text-[#ec4899]" />
                <span>Watch on Instagram</span>
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Main Grid: Left Embedded Reel & Sidebar + Right Deep Blog Post */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Embedded Instagram Reel + Quick Meta */}
        <aside className="lg:col-span-5 space-y-6 lg:sticky lg:top-20">
          {/* Reel Embed Card */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <PlayCircle className="w-4 h-4 text-[#f43f5e]" />
              <h2 className="text-sm font-bold text-[#111215] dark:text-[#f4f4f5] tracking-wide">
                Embedded Reel Breakdown
              </h2>
            </div>

            <InstagramReelEmbed
              reelUrl={post.instagramReelUrl}
              reelId={post.instagramReelId}
              thumbnailUrl={post.reelThumbnail}
              postType={post.postType}
              title={`${post.title} Video Reel`}
            />
          </div>

          {/* Key Highlights Card */}
          {post.keyHighlights && post.keyHighlights.length > 0 && (
            <div
              data-ui="highlights-box"
              className="p-5 rounded-lg bg-[#ffffff] dark:bg-[#141619] border border-[#e5e7eb] dark:border-[#22252c] space-y-3"
            >
              <h3 className="text-sm font-bold text-[#111215] dark:text-[#f4f4f5] flex items-center">
                <BookmarkCheck className="w-4 h-4 mr-2 text-[#3b82f6]" />
                Key Breakthrough Takeaways
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#4b5563] dark:text-[#9ca3af]">
                {post.keyHighlights.map((hl, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-[#3b82f6] font-bold mt-0.5">•</span>
                    <span className="leading-relaxed">{hl}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Research & Source References Card */}
          {post.references && post.references.length > 0 && (
            <div
              data-ui="references-box"
              className="p-5 rounded-lg bg-[#ffffff] dark:bg-[#141619] border border-[#e5e7eb] dark:border-[#22252c] space-y-3"
            >
              <h3 className="text-sm font-bold text-[#111215] dark:text-[#f4f4f5] flex items-center">
                <BookOpen className="w-4 h-4 mr-2 text-[#ec4899]" />
                Original Research Sources
              </h3>
              <p className="text-xs text-[#5e626d] dark:text-[#8e93a0]">
                Deep dive into the original experiments, paper logs, and analysis:
              </p>
              <div className="space-y-2 pt-1">
                {post.references.map((ref, idx) => (
                  <a
                    key={idx}
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackExternalVisit(ref.url, ref.title)}
                    className="group block p-3 rounded-md bg-[#f4f4f0] dark:bg-[#1a1d23] hover:bg-[#eaeae4] dark:hover:bg-[#22262f] transition-colors border border-transparent hover:border-[#3b82f6]/30"
                  >
                    <div className="flex items-center justify-between text-[11px] font-semibold text-[#1e3a8a] dark:text-[#60a5fa] mb-1">
                      <span>{ref.source}</span>
                      <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                    <p className="text-xs text-[#111215] dark:text-[#f4f4f5] font-medium leading-snug">
                      {ref.title}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Series Navigation Box */}
          <div
            data-ui="series-nav-box"
            className="p-5 rounded-lg bg-[#f4f4f0] dark:bg-[#101215] border border-[#e5e7eb]/80 dark:border-[#1e2229] space-y-3"
          >
            <span className="text-[11px] font-bold text-[#f43f5e] block">
              Series Navigator
            </span>
            <h4 className="text-sm font-bold text-[#111215] dark:text-[#f4f4f5]">
              {post.seriesTitle}
            </h4>
            <p className="text-xs text-[#5e626d] dark:text-[#8e93a0] leading-relaxed">
              Fast-track visual breakdowns demystifying complex neural models and AI engineering in 120 seconds.
            </p>
            <div className="pt-2">
              <Link
                to={`/series/${post.seriesSlug}`}
                className="text-xs font-semibold text-[#1e3a8a] dark:text-[#3b82f6] hover:underline inline-flex items-center"
              >
                <span>View all series episodes</span>
                <ArrowRight className="w-3 h-3 ml-1" />
              </Link>
            </div>
          </div>
        </aside>

        {/* Right Column: In-Depth Technical Blog Post */}
        <article className="lg:col-span-7 space-y-8">
          {/* Quick 2-Minute Takeaway Callout Box */}
          {post.quickTakeaway && (
            <div
              data-ui="quick-takeaway-banner"
              className="p-6 rounded-xl bg-amber-50 dark:bg-[#1c1815] border border-amber-200 dark:border-amber-900/50 space-y-2.5"
            >
              <div className="flex items-center space-x-2 text-amber-800 dark:text-amber-300">
                <Zap className="w-4 h-4 fill-amber-500 text-amber-500" />
                <h2 className="text-sm font-bold">
                  2 Minute me Samjo (Quick Takeaway)
                </h2>
              </div>
              <p className="text-sm sm:text-base text-[#111215] dark:text-[#f4f4f5] leading-relaxed font-medium">
                {post.quickTakeaway}
              </p>
            </div>
          )}

          {/* Blog Narrative Sections */}
          <div className="space-y-8">
            {post.sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                data-ui="blog-section"
                className="p-6 sm:p-8 rounded-xl bg-[#ffffff] dark:bg-[#141619] border border-[#e5e7eb] dark:border-[#22252c] space-y-4"
              >
                <h2 className="text-xl sm:text-2xl font-bold text-[#111215] dark:text-[#f4f4f5] tracking-tight">
                  {section.title}
                </h2>

                <div className="text-base sm:text-[17px] text-[#2d3139] dark:text-[#d4d7df] leading-relaxed whitespace-pre-wrap space-y-4 font-sans">
                  {section.content}
                </div>

                {/* Optional Callout Quote */}
                {section.callout && (
                  <div className="mt-4 p-4 rounded-md bg-[#f4f4f0] dark:bg-[#1a1d24] border-l-4 border-[#3b82f6] text-sm sm:text-base italic text-[#111215] dark:text-[#f4f4f5] leading-relaxed">
                    {section.callout}
                  </div>
                )}

                {/* Optional Code Snippet */}
                {section.codeSnippet && (
                  <div className="mt-4 space-y-1.5">
                    <span className="text-[11px] font-semibold text-[#888d99] dark:text-[#636773] block">
                      Code Execution / Subspace Direction Script
                    </span>
                    <pre className="p-4 rounded-lg bg-[#0d0f12] text-xs sm:text-sm font-mono text-[#e2e8f0] overflow-x-auto select-all leading-relaxed border border-[#22252c]">
                      <code>{section.codeSnippet}</code>
                    </pre>
                  </div>
                )}

                {/* Optional Key Section Takeaway */}
                {section.takeaway && (
                  <div className="mt-4 flex items-start space-x-2.5 p-3 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-300 text-xs sm:text-sm border border-emerald-200 dark:border-emerald-800/40">
                    <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{section.takeaway}</span>
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* Social CTA & Discussion Box */}
          <div
            data-ui="social-cta-box"
            className="p-6 sm:p-8 rounded-xl bg-[#ffffff] dark:bg-[#141619] border border-[#e5e7eb] dark:border-[#22252c] flex flex-col sm:flex-row items-center justify-between gap-6"
          >
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-base font-bold text-[#111215] dark:text-[#f4f4f5]">
                Enjoyed this 2-Minute Breakdown?
              </h3>
              <p className="text-xs sm:text-sm text-[#5e626d] dark:text-[#8e93a0]">
                Join the conversation on Instagram and drop your thoughts on Weight Space Programming!
              </p>
            </div>

            <a
              href="https://www.instagram.com/thefutureguyy.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary rounded-md px-6 py-3 text-xs sm:text-sm font-semibold inline-flex items-center justify-center whitespace-nowrap"
            >
              <Instagram className="w-4 h-4 mr-2 text-[#ec4899]" />
              <span>Discuss on @thefutureguyy.ai</span>
            </a>
          </div>
        </article>
      </div>
    </div>
  );
};
