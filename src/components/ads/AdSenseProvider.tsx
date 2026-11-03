import React, { createContext, useContext, useEffect, useState } from 'react';

interface AdSenseContextType {
  isEnabled: boolean;
  clientId: string;
  isLoaded: boolean;
}

const AdSenseContext = createContext<AdSenseContextType>({
  isEnabled: false,
  clientId: '',
  isLoaded: false,
});

export const useAdSense = () => useContext(AdSenseContext);

interface AdSenseProviderProps {
  children: React.ReactNode;
}

export const AdSenseProvider: React.FC<AdSenseProviderProps> = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const isEnabled = import.meta.env.VITE_ADSENSE_ENABLED === 'true';
  const clientId = import.meta.env.VITE_ADSENSE_CLIENT || '';

  useEffect(() => {
    // Only load script if globally enabled and valid client ID is present
    if (!isEnabled || !clientId || clientId.includes('XXXXXXXXXXXXXXXX') || typeof window === 'undefined') {
      return;
    }

    // Check if script is already present
    const existingScript = document.getElementById('adsbygoogle-script') || document.querySelector('script[src*="pagead2.googlesyndication.com"]');
    if (existingScript) {
      setIsLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.id = 'adsbygoogle-script';
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`;
    script.onload = () => setIsLoaded(true);
    script.onerror = () => {
      console.warn('Google AdSense failed to load (possibly blocked by ad-blocker).');
    };

    document.head.appendChild(script);
  }, [isEnabled, clientId]);

  return (
    <AdSenseContext.Provider value={{ isEnabled, clientId, isLoaded }}>
      {children}
    </AdSenseContext.Provider>
  );
};
