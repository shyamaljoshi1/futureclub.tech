import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { trackPromptCopy } from '@/lib/analytics';

interface CopyPromptButtonProps {
  promptText: string;
  promptSlug?: string;
  promptTitle?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const CopyPromptButton: React.FC<CopyPromptButtonProps> = ({
  promptText,
  promptSlug = 'prompt',
  promptTitle = 'AI Prompt',
  className = '',
  size = 'md',
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      await navigator.clipboard.writeText(promptText);
      setCopied(true);
      trackPromptCopy(promptSlug, promptTitle);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy to clipboard', err);
    }
  };

  const sizeClasses = {
    sm: 'px-2.5 py-1 text-xs',
    md: 'px-3.5 py-1.5 text-xs font-semibold',
    lg: 'px-5 py-2.5 text-sm font-semibold',
  }[size];

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? 'Prompt copied to clipboard' : 'Copy prompt to clipboard'}
      className={`inline-flex items-center justify-center rounded transition-colors ${
        copied
          ? 'bg-emerald-600 text-white'
          : 'bg-[#111215] text-[#ffffff] dark:bg-[#f4f4f5] dark:text-[#111215] hover:opacity-90'
      } ${sizeClasses} ${className}`}
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 mr-1 text-white" aria-hidden="true" />
          <span>Copied!</span>
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5 mr-1" aria-hidden="true" />
          <span>Copy Prompt</span>
        </>
      )}
    </button>
  );
};
