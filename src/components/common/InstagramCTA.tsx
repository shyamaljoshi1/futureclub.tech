import React from 'react';
import { Instagram, ArrowUpRight } from 'lucide-react';
import { getSiteConfig } from '@/lib/data';

export const InstagramCTA: React.FC = () => {
  const site = getSiteConfig();

  return (
    <section data-ui="instagram-cta" aria-labelledby="instagram-cta-title" className="my-16">
      <div className="bg-[#111215] dark:bg-[#141619] text-[#ffffff] rounded-lg p-8 sm:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div className="max-w-xl space-y-3">
          <div className="flex items-center space-x-2 text-[#8e93a0] text-xs font-medium">
            <Instagram className="w-4 h-4 text-[#ec4899]" />
            <span>Instagram channel</span>
          </div>
          <h2 id="instagram-cta-title" className="text-2xl sm:text-3xl font-bold tracking-tight text-[#ffffff]">
            Follow our daily tool reviews on Instagram
          </h2>
          <p className="text-sm sm:text-base text-[#8e93a0] leading-relaxed">
            Follow <strong className="text-white">{site.instagramHandle}</strong> for short video workflows, prompt breakdowns, and tool comparisons.
          </p>
        </div>

        <div className="flex-shrink-0 w-full sm:w-auto">
          <a
            href={site.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded text-sm font-semibold bg-[#ffffff] text-[#111215] hover:bg-[#f4f4f0] transition-colors"
          >
            <span>Follow {site.instagramHandle}</span>
            <ArrowUpRight className="w-4 h-4 ml-2" />
          </a>
        </div>
      </div>
    </section>
  );
};
