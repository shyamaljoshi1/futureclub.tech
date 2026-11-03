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

  // Check if slot ID is empty or a dummy placeholder
  const isDummySlot = !slotId || /^(1234567890|2345678901|3456789012|4567890123)$/.test(slotId.trim());

  // If globally disabled or no manual slot ID provided
  if (!isEnabled || !clientId || clientId.includes('XXXXXXXXXXXXXXXX') || isDummySlot) {
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
