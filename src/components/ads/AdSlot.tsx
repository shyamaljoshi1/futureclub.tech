import React, { useEffect, useRef } from 'react';
import { useAdSense } from './AdSenseProvider';

interface AdSlotProps {
  slotId?: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal';
  responsive?: boolean;
  className?: string;
  label?: string;
}

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export const AdSlot: React.FC<AdSlotProps> = ({
  slotId,
  format = 'auto',
  responsive = true,
  className = '',
  label = 'Advertisement',
}) => {
  const { isEnabled, clientId, isLoaded } = useAdSense();
  const adRef = useRef<HTMLModElement | null>(null);
  const pushedRef = useRef(false);

  useEffect(() => {
    if (!isEnabled || !isLoaded || !slotId || pushedRef.current) return;

    try {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        window.adsbygoogle.push({});
        pushedRef.current = true;
      }
    } catch (e) {
      console.warn('AdSense push error:', e);
    }
  }, [isEnabled, isLoaded, slotId]);

  // If globally disabled or no slot ID provided
  if (!isEnabled || !clientId || clientId.includes('XXXXXXXXXXXXXXXX') || !slotId) {
    if (import.meta.env.DEV) {
      return (
        <aside
          data-ui="ad-placeholder"
          aria-label="Development Ad Slot Placeholder"
          className={`my-8 p-4 text-center rounded text-xs text-[#888d99] dark:text-[#636773] bg-[#f4f4f0] dark:bg-[#141619] ${className}`}
        >
          <span className="text-xs font-medium block mb-1">
            Ad slot placeholder: {slotId || 'No Slot ID'}
          </span>
          Ads disabled in development (VITE_ADSENSE_ENABLED=false)
        </aside>
      );
    }
    return null;
  }

  return (
    <aside
      data-ui="ad-container"
      aria-label={label}
      className={`my-8 flex flex-col items-center justify-center overflow-hidden clear-both ${className}`}
    >
      <span className="text-xs text-[#888d99] dark:text-[#636773] mb-1.5 select-none font-medium">
        {label}
      </span>
      <div className="w-full max-w-4xl min-h-[90px] flex items-center justify-center bg-[#f4f4f0] dark:bg-[#141619] rounded">
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ display: 'block', width: '100%' }}
          data-ad-client={clientId}
          data-ad-slot={slotId}
          data-ad-format={format}
          data-full-width-responsive={responsive ? 'true' : 'false'}
        />
      </div>
    </aside>
  );
};
