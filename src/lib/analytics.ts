// Google Analytics 4 integration helper
// Disabled by default unless VITE_GA4_MEASUREMENT_ID is configured

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function initGA(): void {
  const measurementId = import.meta.env.VITE_GA4_MEASUREMENT_ID;
  if (!measurementId || typeof window === 'undefined') return;

  // Check if script already injected
  if (document.getElementById('ga4-script')) return;

  const script = document.createElement('script');
  script.id = 'ga4-script';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer?.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    anonymize_ip: true,
  });
}

export function trackEvent(
  eventName: string,
  params: Record<string, unknown> = {}
): void {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
}

export function trackToolClick(toolSlug: string, toolName: string): void {
  trackEvent('tool_visit', {
    tool_slug: toolSlug,
    tool_name: toolName,
  });
}

export function trackPromptCopy(promptSlug: string, promptTitle: string): void {
  trackEvent('prompt_copy', {
    prompt_slug: promptSlug,
    prompt_title: promptTitle,
  });
}

export function trackSearchQuery(query: string, resultsCount: number): void {
  trackEvent('search', {
    search_term: query,
    results_count: resultsCount,
  });
}

export function trackCategorySelect(categorySlug: string): void {
  trackEvent('category_select', {
    category_slug: categorySlug,
  });
}

export function trackExternalVisit(destinationUrl: string, label: string): void {
  trackEvent('external_link_click', {
    destination_url: destinationUrl,
    link_label: label,
  });
}
