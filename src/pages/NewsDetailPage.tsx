import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Clock,
  User,
  ExternalLink,
  Share2,
  Check,
  Tag,
  ArrowLeft,
  Sparkles,
  Newspaper,
} from 'lucide-react';
import { getNewsBySlug, getRelatedNews } from '@/lib/data';
import { updatePageSeo, getBreadcrumbSchema } from '@/lib/seo';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { NewsCard } from '@/components/news/NewsCard';

export const NewsDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const article = slug ? getNewsBySlug(slug) : undefined;
  const relatedNews = slug ? getRelatedNews(slug, 3) : [];
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!article) return;

    updatePageSeo({
      title: article.seo.title,
      description: article.seo.description,
      canonical: `/news/${article.slug}`,
      jsonLd: [
        getBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'AI News', url: '/news' },
          { name: article.title, url: `/news/${article.slug}` },
        ]),
        {
          '@context': 'https://schema.org',
          '@type': 'NewsArticle',
          headline: article.title,
          description: article.summary,
          image: [article.coverImage],
          datePublished: article.publishedAt,
          author: {
            '@type': 'Person',
            name: article.author,
          },
        },
      ],
    });
  }, [article]);

  if (!article) {
    return (
      <div className="py-20 text-center space-y-4">
        <h1 className="text-2xl font-bold text-[#111215] dark:text-[#f4f4f5]">
          News article not found
        </h1>
        <p className="text-sm text-[#5e626d] dark:text-[#8e93a0]">
          The news item you are looking for does not exist or may have been moved.
        </p>
        <Link
          to="/news"
          className="inline-flex items-center text-sm font-semibold text-[#1e3a8a] dark:text-[#3b82f6] hover:underline"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          <span>Back to AI News</span>
        </Link>
      </div>
    );
  }

  const handleCopyLink = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formatPublishDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  // Render inline markdown formatting (links, bold, code, italics)
  const renderFormattedInline = (rawText: string) => {
    const tokenRegex = /(\[[^\]]+\]\([^\s)]+\)|\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g;
    const parts = rawText.split(tokenRegex);

    return parts.map((part, pIdx) => {
      if (!part) return null;

      // Link: [text](url)
      if (part.startsWith('[') && part.includes('](') && part.endsWith(')')) {
        const splitIndex = part.indexOf('](');
        const linkText = part.slice(1, splitIndex);
        const linkUrl = part.slice(splitIndex + 2, -1);
        return (
          <a
            key={pIdx}
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#d97706] dark:text-[#fbbf24] underline hover:text-[#b45309] dark:hover:text-[#f59e0b] font-medium"
          >
            {linkText}
          </a>
        );
      }

      // Bold: **text**
      if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
        return (
          <strong key={pIdx} className="font-semibold text-[#111215] dark:text-[#f4f4f5]">
            {part.slice(2, -2)}
          </strong>
        );
      }

      // Code: `code`
      if (part.startsWith('`') && part.endsWith('`') && part.length >= 2) {
        return (
          <code
            key={pIdx}
            className="px-1.5 py-0.5 rounded bg-[#f3f4f6] dark:bg-[#1f2228] text-xs text-[#d97706] dark:text-[#fbbf24]"
          >
            {part.slice(1, -1)}
          </code>
        );
      }

      // Italic: *text*
      if (part.startsWith('*') && part.endsWith('*') && part.length >= 2) {
        return (
          <em key={pIdx} className="italic text-[#374151] dark:text-[#d1d5db]">
            {part.slice(1, -1)}
          </em>
        );
      }

      // Regular text
      return <span key={pIdx}>{part}</span>;
    });
  };

  // Render article content paragraphs, headings, and bullet points
  const renderArticleContent = (content: string) => {
    const rawLines = content.split(/\r?\n/);

    type Block =
      | { type: 'heading'; level: number; text: string }
      | { type: 'paragraph'; text: string }
      | { type: 'list'; items: string[] };

    const blocks: Block[] = [];
    let currentList: string[] | null = null;
    let currentParagraph: string[] | null = null;

    const flushList = () => {
      if (currentList && currentList.length > 0) {
        blocks.push({ type: 'list', items: currentList });
        currentList = null;
      }
    };

    const flushParagraph = () => {
      if (currentParagraph && currentParagraph.length > 0) {
        blocks.push({ type: 'paragraph', text: currentParagraph.join(' ') });
        currentParagraph = null;
      }
    };

    for (const rawLine of rawLines) {
      const line = rawLine.trim();

      if (!line) {
        flushList();
        flushParagraph();
        continue;
      }

      // Heading: "### Heading" or "## Heading"
      const headingMatch = line.match(/^(#{1,3})\s+(.+)$/);
      if (headingMatch) {
        flushList();
        flushParagraph();
        blocks.push({
          type: 'heading',
          level: headingMatch[1].length,
          text: headingMatch[2].trim(),
        });
        continue;
      }

      // Bullets: lines starting with •, -, or *
      const bulletMatch = line.match(/^[•\-\*]\s*(.+)$/);
      if (bulletMatch) {
        flushParagraph();
        if (!currentList) {
          currentList = [];
        }
        currentList.push(bulletMatch[1].trim());
        continue;
      }

      // Regular paragraph text
      flushList();
      if (!currentParagraph) {
        currentParagraph = [];
      }
      currentParagraph.push(line);
    }

    flushList();
    flushParagraph();

    return blocks.map((block, idx) => {
      if (block.type === 'heading') {
        return (
          <h2
            key={idx}
            className="text-xl sm:text-2xl font-bold text-[#111215] dark:text-[#f4f4f5] pt-6 pb-2 tracking-tight"
          >
            {renderFormattedInline(block.text)}
          </h2>
        );
      }

      if (block.type === 'list') {
        return (
          <ul key={idx} className="space-y-3 my-4 pl-1">
            {block.items.map((item, itemIdx) => (
              <li
                key={itemIdx}
                className="flex items-start text-base sm:text-lg font-normal text-[#2d3139] dark:text-[#d4d7df] leading-relaxed"
              >
                <span className="text-[#d97706] dark:text-[#fbbf24] font-bold select-none mr-3 mt-1 text-sm">
                  •
                </span>
                <span className="flex-1 min-w-0">
                  {renderFormattedInline(item)}
                </span>
              </li>
            ))}
          </ul>
        );
      }

      return (
        <p
          key={idx}
          className="text-base sm:text-lg font-normal text-[#2d3139] dark:text-[#d4d7df] leading-relaxed my-3"
        >
          {renderFormattedInline(block.text)}
        </p>
      );
    });
  };

  return (
    <article className="space-y-10 py-6 max-w-4xl mx-auto">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'AI News', href: '/news' },
          { label: article.title },
        ]}
      />

      {/* Article Header */}
      <header className="space-y-4">
        {/* Category Pill */}
        <div className="inline-flex items-center space-x-2">
          <span className="px-3 py-1 rounded bg-[#fef3c7] dark:bg-[#78350f]/40 text-[#b45309] dark:text-[#fbbf24] text-xs font-semibold">
            {article.category}
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#111215] dark:text-[#f4f4f5] leading-[1.18] tracking-tight">
          {article.title}
        </h1>

        {/* Lead summary */}
        <p className="text-lg sm:text-xl text-[#5e626d] dark:text-[#9ca3af] leading-relaxed font-medium">
          {article.summary}
        </p>

        {/* Meta Row: Author, Date, Reading Time & Share */}
        <div className="pt-3 flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm text-[#888d99] dark:text-[#787f90]">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="flex items-center font-medium text-[#111215] dark:text-[#f4f4f5]">
              <User className="w-4 h-4 mr-1.5 text-[#fbbf24]" />
              {article.author}
            </span>
            <span>•</span>
            <span className="flex items-center">
              <Clock className="w-4 h-4 mr-1.5 text-[#fbbf24]" />
              {formatPublishDate(article.publishedAt)}
            </span>
            {article.readingTime && (
              <>
                <span>•</span>
                <span>{article.readingTime}</span>
              </>
            )}
          </div>

          {/* Share Button */}
          <button
            type="button"
            onClick={handleCopyLink}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#f4f4f0] dark:bg-[#1a1e26] text-[#111215] dark:text-[#f4f4f5] text-xs font-semibold hover:bg-[#e8e8e4] dark:hover:bg-[#252a36] transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span>Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>Share Article</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Featured Cover Image */}
      <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-[#0d0f14] border border-[#e5e7eb] dark:border-[#222631]">
        <img
          src={article.coverImage}
          alt={article.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Main Content Body */}
      <div className="space-y-6 pt-2">
        {renderArticleContent(article.content)}
      </div>

      {/* Official Source Attribution Box */}
      {article.source && article.source.url && (
        <div className="p-5 rounded-xl bg-[#f8f9fa] dark:bg-[#151820] border border-[#e2e4e9] dark:border-[#232733] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-semibold text-[#888d99] dark:text-[#787f90]">
              Original Source &amp; Attribution
            </span>
            <p className="text-sm font-semibold text-[#111215] dark:text-[#f4f4f5]">
              {article.source.name}
            </p>
          </div>
          <a
            href={article.source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 rounded-lg bg-[#111215] dark:bg-[#f4f4f5] text-white dark:text-[#111215] text-xs font-semibold hover:opacity-90 transition-opacity"
          >
            <span>Visit Official Source</span>
            <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
          </a>
        </div>
      )}

      {/* Article Tags */}
      {article.tags.length > 0 && (
        <div className="pt-4 flex flex-wrap items-center gap-2">
          <Tag className="w-4 h-4 text-[#888d99] mr-1" />
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-md bg-[#f4f4f0] dark:bg-[#1a1e26] text-xs font-medium text-[#5e626d] dark:text-[#8e93a0]"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Related News Section */}
      {relatedNews.length > 0 && (
        <section aria-labelledby="related-news-heading" className="pt-12 space-y-6">
          <div className="flex items-center justify-between">
            <h2
              id="related-news-heading"
              className="text-2xl font-bold text-[#111215] dark:text-[#f4f4f5] tracking-tight"
            >
              More Recent AI News
            </h2>
            <Link
              to="/news"
              className="text-sm font-semibold text-[#1e3a8a] dark:text-[#3b82f6] hover:underline"
            >
              View all news &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedNews.map((rel) => (
              <NewsCard key={rel.id} article={rel} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
};
