import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Layers, ExternalLink } from 'lucide-react';
import type { PromptAdapter } from '@/lib/data';
import { CopyPromptButton } from './CopyPromptButton';
import { trackExternalVisit } from '@/lib/analytics';

interface PromptCardProps {
  prompt: PromptAdapter;
}

export const PromptCard: React.FC<PromptCardProps> = ({ prompt }) => {
  return (
    <article
      data-ui="prompt-card"
      className="group flex flex-col justify-between rounded-lg bg-[#ffffff] dark:bg-[#141619] overflow-hidden transition-colors"
    >
      <div>
        {/* Top header with reel preview and metadata */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#111215]">
          {prompt.reelThumbnail && (
            <img
              src={prompt.reelThumbnail}
              alt={prompt.title}
              loading="lazy"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          )}

          <div className="absolute top-2.5 left-2.5 flex items-center space-x-1.5 px-2 py-1 rounded bg-black/80 text-white text-[11px] font-medium">
            <Layers className="w-3.5 h-3.5 text-[#d97706]" />
            <span>Prompt Carousel</span>
          </div>

          {prompt.featured && (
            <span
              title="Featured Prompt"
              className="absolute top-2.5 right-2.5 p-1 rounded bg-black/70 text-[#d97706]"
            >
              <Sparkles className="w-3.5 h-3.5" />
            </span>
          )}
        </div>

        <div className="p-5">
          {/* Title */}
          <h3 className="text-base font-semibold text-[#111215] dark:text-[#f4f4f5] group-hover:text-[#1e3a8a] dark:group-hover:text-[#3b82f6] transition-colors mb-2 leading-snug">
            <Link to={`/prompts/${prompt.slug}`}>
              {prompt.title}
            </Link>
          </h3>

          {/* Description */}
          <p className="text-xs sm:text-sm text-[#5e626d] dark:text-[#8e93a0] line-clamp-2 leading-relaxed mb-4">
            {prompt.description}
          </p>

          {/* Prompt snippet preview in code element */}
          <code className="block p-3 rounded bg-[#f4f4f0] dark:bg-[#101215] mb-4 text-xs font-mono text-[#5e626d] dark:text-[#8e93a0] line-clamp-3 leading-relaxed">
            {prompt.prompt}
          </code>
        </div>
      </div>

      {/* Bottom actions: Copy Button & Full Guide */}
      <div className="px-5 pb-5 pt-1 flex items-center justify-between gap-2">
        <CopyPromptButton
          promptText={prompt.prompt}
          promptSlug={prompt.slug}
          promptTitle={prompt.title}
          size="sm"
        />

        <div className="flex items-center space-x-3">
          {prompt.toolUrl && (
            <a
              href={prompt.toolUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackExternalVisit(prompt.toolUrl, prompt.toolName)}
              className="text-xs text-[#5e626d] dark:text-[#8e93a0] hover:text-[#111215] dark:hover:text-[#f4f4f5] inline-flex items-center"
            >
              <span>{prompt.toolName}</span>
              <ExternalLink className="w-3 h-3 ml-1" />
            </a>
          )}

          <Link
            to={`/prompts/${prompt.slug}`}
            className="text-xs font-semibold text-[#111215] dark:text-[#f4f4f5] inline-flex items-center group-hover:translate-x-0.5 transition-transform"
          >
            <span>View Carousel</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1 text-[#888d99] dark:text-[#636773]" />
          </Link>
        </div>
      </div>
    </article>
  );
};
