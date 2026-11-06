import React, { useState } from 'react';
import { Instagram, Play, ExternalLink, Layers } from 'lucide-react';

interface InstagramReelEmbedProps {
  reelUrl: string;
  reelId?: string;
  thumbnailUrl?: string;
  title?: string;
  postType?: 'reel' | 'carousel';
  className?: string;
}

export const InstagramReelEmbed: React.FC<InstagramReelEmbedProps> = ({
  reelUrl,
  reelId,
  thumbnailUrl,
  title = 'Instagram breakdown',
  postType = 'reel',
  className = '',
}) => {
  const [loadIframe, setLoadIframe] = useState(false);

  // Extract Reel / Post ID if not provided directly
  const extractedId =
    reelId ||
    reelUrl.match(/\/reel\/([A-Za-z0-9_-]+)/)?.[1] ||
    reelUrl.match(/\/p\/([A-Za-z0-9_-]+)/)?.[1] ||
    '';

  const embedUrl = extractedId
    ? `https://www.instagram.com/p/${extractedId}/embed/`
    : '';

  const isCarousel = postType === 'carousel';

  return (
    <div
      data-ui="reel-embed-container"
      className={`rounded-lg bg-[#ffffff] dark:bg-[#141619] overflow-hidden ${className}`}
    >
      <div className="p-4 bg-[#f4f4f0] dark:bg-[#101215] flex items-center justify-between gap-3">
        <div className="flex items-center space-x-2">
          {isCarousel ? (
            <>
              <Layers className="w-4 h-4 text-[#d97706]" />
              <span className="text-xs font-semibold text-[#111215] dark:text-[#f4f4f5]">
                Instagram Prompt Carousel (Swipeable Slides)
              </span>
            </>
          ) : (
            <>
              <Instagram className="w-4 h-4 text-[#ec4899]" />
              <span className="text-xs font-semibold text-[#111215] dark:text-[#f4f4f5]">
                Instagram Reel Breakdown
              </span>
            </>
          )}
        </div>

        {reelUrl ? (
          <a
            href={reelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#1e3a8a] dark:text-[#3b82f6] hover:underline inline-flex items-center"
          >
            <span>Watch on Instagram</span>
            <ExternalLink className="w-3 h-3 ml-1" />
          </a>
        ) : (
          <span className="text-xs text-[#888d99] dark:text-[#636773]">
            Reel Coming Soon
          </span>
        )}
      </div>

      <div className="relative aspect-[9/16] w-full max-w-[340px] mx-auto my-4 rounded-lg overflow-hidden bg-[#111215]">
        {loadIframe && embedUrl ? (
          <iframe
            src={embedUrl}
            title={title}
            className="w-full h-full"
            frameBorder="0"
            scrolling="no"
            allowFullScreen
          />
        ) : (
          <div className="relative w-full h-full flex flex-col items-center justify-between p-6">
            {thumbnailUrl ? (
              <img
                src={thumbnailUrl}
                alt={title}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover opacity-80"
              />
            ) : null}

            <div className="relative z-10 w-full flex items-center justify-between text-xs text-white">
              <span className="bg-black/60 px-2 py-1 rounded">@thefutureguyy.ai</span>
              {isCarousel && (
                <span className="bg-amber-950/80 text-amber-200 px-2 py-0.5 rounded text-[11px] font-medium flex items-center">
                  <Layers className="w-3 h-3 mr-1" />
                  Carousel
                </span>
              )}
            </div>

            {/* Play / Load Trigger */}
            {embedUrl ? (
              <button
                type="button"
                onClick={() => setLoadIframe(true)}
                aria-label={isCarousel ? 'Load interactive carousel' : 'Play embedded reel'}
                className="relative z-10 w-16 h-16 rounded-full bg-white/90 text-[#111215] flex items-center justify-center hover:scale-105 transition-transform"
              >
                {isCarousel ? (
                  <Layers className="w-6 h-6 text-[#111215]" />
                ) : (
                  <Play className="w-6 h-6 ml-1 fill-current" />
                )}
              </button>
            ) : null}

            <div className="relative z-10 text-center text-xs text-white bg-black/60 px-3 py-1.5 rounded">
              {embedUrl
                ? (isCarousel
                    ? 'Click to load interactive Instagram carousel'
                    : 'Click to load interactive Instagram player')
                : 'Instagram breakdown coming soon'}
            </div>
          </div>
        )}
      </div>

      {loadIframe && isCarousel && (
        <div className="px-4 pb-3 text-center text-xs text-[#888d99] dark:text-[#636773]">
          Swipe left or right inside the embed to view all prompt slides
        </div>
      )}
    </div>
  );
};
