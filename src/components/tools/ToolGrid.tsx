import React from 'react';
import type { Tool } from '@/types/content';
import { ToolCard } from './ToolCard';
import { AdSlot } from '@/components/ads/AdSlot';

interface ToolGridProps {
  tools: Tool[];
  showAdAfterIndex?: number;
  adSlotId?: string;
}

export const ToolGrid: React.FC<ToolGridProps> = ({
  tools,
  showAdAfterIndex = 6,
  adSlotId,
}) => {
  if (tools.length === 0) return null;

  const firstBatch = tools.slice(0, showAdAfterIndex);
  const remainingBatch = tools.slice(showAdAfterIndex);

  return (
    <div className="space-y-8">
      {/* First Batch */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {firstBatch.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>

      {/* Optional AdSlot between batches */}
      {adSlotId && remainingBatch.length > 0 && (
        <AdSlot slotId={adSlotId} label="Sponsored Recommendation" />
      )}

      {/* Remaining Batch */}
      {remainingBatch.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {remainingBatch.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      )}
    </div>
  );
};
