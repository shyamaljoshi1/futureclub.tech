import React from 'react';
import type { Prompt } from '@/types/content';
import { PromptCard } from './PromptCard';
import { AdSlot } from '@/components/ads/AdSlot';

interface PromptGridProps {
  prompts: Prompt[];
  showAdAfterIndex?: number;
  adSlotId?: string;
}

export const PromptGrid: React.FC<PromptGridProps> = ({
  prompts,
  showAdAfterIndex = 4,
  adSlotId,
}) => {
  if (prompts.length === 0) return null;

  const firstBatch = prompts.slice(0, showAdAfterIndex);
  const remainingBatch = prompts.slice(showAdAfterIndex);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {firstBatch.map((prompt) => (
          <PromptCard key={prompt.id} prompt={prompt} />
        ))}
      </div>

      {adSlotId && remainingBatch.length > 0 && (
        <AdSlot slotId={adSlotId} label="Sponsored Prompts" />
      )}

      {remainingBatch.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {remainingBatch.map((prompt) => (
            <PromptCard key={prompt.id} prompt={prompt} />
          ))}
        </div>
      )}
    </div>
  );
};
