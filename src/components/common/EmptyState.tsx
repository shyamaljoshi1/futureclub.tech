import React from 'react';
import { SearchX } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No items found',
  description = 'Try adjusting your search query or selecting a different category filter.',
  actionText,
  onAction,
}) => {
  return (
    <div
      data-ui="empty-state"
      className="py-16 px-4 text-center rounded-lg my-8 bg-[#f4f4f0] dark:bg-[#111317]"
    >
      <div className="w-12 h-12 mx-auto rounded-full bg-[#f4f4f0] dark:bg-[#1c1f24] flex items-center justify-center text-[#5e626d] dark:text-[#8e93a0] mb-4">
        <SearchX className="w-6 h-6" />
      </div>
      <h3 className="text-base font-semibold text-[#111215] dark:text-[#f4f4f5] mb-1">
        {title}
      </h3>
      <p className="text-sm text-[#5e626d] dark:text-[#8e93a0] max-w-sm mx-auto mb-6">
        {description}
      </p>
      {actionText && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="inline-flex items-center px-4 py-2 text-xs font-semibold rounded bg-[#111215] text-[#ffffff] dark:bg-[#f4f4f5] dark:text-[#111215] hover:opacity-90 transition-opacity"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};
