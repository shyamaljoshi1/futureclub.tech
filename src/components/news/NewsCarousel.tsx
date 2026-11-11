import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Play, Pause, ChevronLeft, ChevronRight, Clock, User, ArrowUpRight } from 'lucide-react';
import { NewsItem } from '@/types/content';

interface NewsCarouselProps {
  newsItems: NewsItem[];
  autoPlayInterval?: number; // milliseconds, default 5500
}

export const NewsCarousel: React.FC<NewsCarouselProps> = ({
  newsItems,
  autoPlayInterval = 5500,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // High-performance progress tracking without React re-renders
  const progressFillRef = useRef<HTMLDivElement | null>(null);
  const elapsedRef = useRef<number>(0);
  const lastTimeRef = useRef<number | null>(null);
  const animFrameId = useRef<number | null>(null);

  const total = newsItems.length;

  const resetProgress = useCallback(() => {
    elapsedRef.current = 0;
    if (progressFillRef.current) {
      progressFillRef.current.style.width = '0%';
    }
  }, []);

  const nextSlide = useCallback(() => {
    if (total <= 1) return;
    resetProgress();
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total, resetProgress]);

  const prevSlide = useCallback(() => {
    if (total <= 1) return;
    resetProgress();
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total, resetProgress]);

  const goToSlide = (index: number) => {
    if (index === currentIndex) return;
    resetProgress();
    setCurrentIndex(index);
  };

  // Auto-advance & progress bar animation loop
  useEffect(() => {
    if (total <= 1) return;

    let isActive = true;

    const animate = (time: number) => {
      if (!isActive) return;

      if (lastTimeRef.current !== null) {
        // Clamp delta to prevent jumps when tab is backgrounded
        const delta = Math.min(time - lastTimeRef.current, 100);

        if (isPlaying && !isHovered) {
          elapsedRef.current += delta;
          const pct = Math.min((elapsedRef.current / autoPlayInterval) * 100, 100);

          if (progressFillRef.current) {
            progressFillRef.current.style.width = `${pct}%`;
          }

          if (elapsedRef.current >= autoPlayInterval) {
            resetProgress();
            nextSlide();
          }
        }
      }

      lastTimeRef.current = time;
      animFrameId.current = requestAnimationFrame(animate);
    };

    animFrameId.current = requestAnimationFrame(animate);

    return () => {
      isActive = false;
      if (animFrameId.current !== null) {
        cancelAnimationFrame(animFrameId.current);
      }
      lastTimeRef.current = null;
    };
  }, [isPlaying, isHovered, total, autoPlayInterval, nextSlide, resetProgress]);

  if (!newsItems || newsItems.length === 0) {
    return null;
  }

  const current = newsItems[currentIndex];

  const formatPublishDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - date.getTime());
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 0) {
        return 'Today';
      } else if (diffDays === 1) {
        return 'Yesterday';
      } else if (diffDays < 7) {
        return `${diffDays} days ago`;
      }
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  // Touch Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    touchStartX.current = null;
  };

  return (
    <div
      data-ui="news-carousel"
      className="relative w-full max-w-5xl mx-auto rounded-2xl bg-[#0e1014] dark:bg-[#111317] border border-[#222631] overflow-hidden select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-roledescription="carousel"
      aria-label="Daily AI News Carousel"
    >
      {/* 1. Image Banner Area */}
      <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden bg-[#090a0d]">
        <Link
          to={`/news/${current.slug}`}
          className="block w-full h-full group"
          aria-label={`Read full story: ${current.title}`}
        >
          <img
            src={current.coverImage}
            alt={current.title}
            className="w-full h-full object-cover transform group-hover:scale-102 transition-transform duration-700 ease-out"
            loading="eager"
          />
        </Link>

        {/* Category Pill Tag (top-left) */}
        <div className="absolute top-4 left-4 z-10">
          <span className="inline-flex items-center px-3 py-1 rounded bg-[#000000] text-[#fbbf24] border border-white/10 text-xs font-semibold">
            {current.category}
          </span>
        </div>

        {/* Carousel Prev / Next Chevron Arrows */}
        {total > 1 && (
          <div className="absolute inset-y-0 inset-x-3 flex items-center justify-between pointer-events-none z-10 opacity-0 group-hover:opacity-100 sm:opacity-75 transition-opacity">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                prevSlide();
              }}
              className="p-2 rounded-full bg-[#111215] hover:bg-[#1a1e27] text-white pointer-events-auto transition-transform active:scale-95"
              aria-label="Previous news slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                nextSlide();
              }}
              className="p-2 rounded-full bg-[#111215] hover:bg-[#1a1e27] text-white pointer-events-auto transition-transform active:scale-95"
              aria-label="Next news slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* 2. Headline & Meta Description Section */}
      <div className="p-5 sm:p-7 space-y-4">
        {/* Title */}
        <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#f4f4f5] leading-snug tracking-tight">
          <Link
            to={`/news/${current.slug}`}
            className="hover:text-[#3b82f6] dark:hover:text-[#60a5fa] transition-colors line-clamp-2"
          >
            {current.title}
          </Link>
        </h2>

        {/* Short Summary Teaser */}
        <p className="text-sm sm:text-base text-[#9ca3af] leading-relaxed line-clamp-2">
          {current.summary}
        </p>

        {/* Timestamp & Author Meta line */}
        <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs sm:text-sm text-[#888d99] dark:text-[#787f90]">
          <span className="flex items-center">
            <Clock className="w-3.5 h-3.5 mr-1 text-[#fbbf24]" />
            {formatPublishDate(current.publishedAt)}
          </span>
          <span>•</span>
          <span className="flex items-center">
            <User className="w-3.5 h-3.5 mr-1" />
            By {current.author}
          </span>
          {current.readingTime && (
            <>
              <span>•</span>
              <span>{current.readingTime}</span>
            </>
          )}
          {current.source && (
            <>
              <span>•</span>
              <span className="text-[#3b82f6] font-medium inline-flex items-center">
                <span>{current.source.name}</span>
                <ArrowUpRight className="w-3 h-3 ml-0.5" />
              </span>
            </>
          )}
        </div>

        {/* 3. Bottom Indicator Bar: Pagination Dots + Pause/Play Button */}
        <div className="pt-2 flex items-center justify-between">
          {/* Pagination Dots with Active Progress Bar Indicator */}
          <div
            className="flex items-center space-x-2"
            role="tablist"
            aria-label="News slide selection"
          >
            {newsItems.map((_, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => goToSlide(idx)}
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Go to news article ${idx + 1} of ${total}`}
                  className={`h-2 rounded-full transition-colors duration-300 relative ${
                    isActive
                      ? 'w-8 sm:w-10 bg-[#252934] overflow-hidden'
                      : 'w-2 bg-[#333947] hover:bg-[#4b5563]'
                  }`}
                >
                  {isActive && (
                    <div
                      ref={progressFillRef}
                      className="absolute inset-y-0 left-0 bg-[#f59e0b] rounded-full"
                      style={{ width: total <= 1 ? '100%' : '0%' }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Action: Pause / Play toggle and Full Story Link */}
          <div className="flex items-center space-x-3">
            {total > 1 && (
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-1.5 rounded-md text-[#9ca3af] hover:text-white hover:bg-[#1a1e27] transition-colors"
                aria-label={isPlaying ? 'Pause auto-slide' : 'Resume auto-slide'}
                title={isPlaying ? 'Pause auto-play' : 'Resume auto-play'}
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 fill-current text-[#fbbf24]" />
                ) : (
                  <Play className="w-4 h-4 fill-current text-[#9ca3af]" />
                )}
              </button>
            )}

            <Link
              to={`/news/${current.slug}`}
              className="text-xs sm:text-sm font-semibold text-[#3b82f6] hover:text-[#60a5fa] hover:underline inline-flex items-center"
            >
              <span>Read Full Story</span>
              <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
