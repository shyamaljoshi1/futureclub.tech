import type { Tool, Resource } from '@/types/content';
import siteData from '@/data/site.json';

export function updatePageSeo(options: {
  title?: string;
  description?: string;
  canonical?: string;
  ogType?: string;
  ogImage?: string;
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
}) {
  if (typeof document === 'undefined') return;

  const siteUrl = siteData.siteUrl;
  const fullTitle = options.title
    ? `${options.title} | ${siteData.brandName}`
    : siteData.defaultTitle;
  const description = options.description || siteData.defaultDescription;
  const canonicalUrl = options.canonical
    ? `${siteUrl}${options.canonical.startsWith('/') ? options.canonical : `/${options.canonical}`}`
    : siteUrl;

  document.title = fullTitle;

  // Meta description
  let descMeta = document.querySelector('meta[name="description"]');
  if (!descMeta) {
    descMeta = document.createElement('meta');
    descMeta.setAttribute('name', 'description');
    document.head.appendChild(descMeta);
  }
  descMeta.setAttribute('content', description);

  // Canonical link
  let canonicalLink = document.querySelector('link[rel="canonical"]');
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute('href', canonicalUrl);

  // Open Graph
  setMetaTag('property', 'og:title', fullTitle);
  setMetaTag('property', 'og:description', description);
  setMetaTag('property', 'og:url', canonicalUrl);
  setMetaTag('property', 'og:type', options.ogType || 'website');
  if (options.ogImage) {
    setMetaTag('property', 'og:image', options.ogImage);
  }

  // Twitter
  setMetaTag('name', 'twitter:title', fullTitle);
  setMetaTag('name', 'twitter:description', description);
  if (options.ogImage) {
    setMetaTag('name', 'twitter:image', options.ogImage);
  }

  // JSON-LD Structured Data
  if (options.jsonLd) {
    let scriptTag = document.getElementById('json-ld-structured-data') as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'json-ld-structured-data';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(options.jsonLd);
  }
}

function setMetaTag(attrName: 'name' | 'property', attrValue: string, content: string) {
  let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attrName, attrValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

// Structured Data Generators
export function getWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteData.brandName,
    url: siteData.siteUrl,
    description: siteData.defaultDescription,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteData.siteUrl}/tools?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteData.brandName,
    url: siteData.siteUrl,
    sameAs: [siteData.instagramUrl],
    contactPoint: {
      '@type': 'ContactPoint',
      email: siteData.contactEmail,
      contactType: 'customer support',
    },
  };
}

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${siteData.siteUrl}${item.url}`,
    })),
  };
}

export function getSoftwareApplicationSchema(tool: Tool) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    operatingSystem: tool.platform.join(', '),
    applicationCategory: tool.category,
    description: tool.description,
    url: tool.websiteUrl,
    offers: {
      '@type': 'Offer',
      price: tool.pricing === 'free' ? '0' : undefined,
      priceCurrency: 'USD',
      category: tool.pricing,
    },
  };
}

export function getArticleSchema(resource: Resource) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: resource.title,
    description: resource.description,
    datePublished: resource.publishedAt,
    author: {
      '@type': 'Organization',
      name: siteData.brandName,
      url: siteData.siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: siteData.brandName,
      url: siteData.siteUrl,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteData.siteUrl}/resources/${resource.slug}`,
    },
  };
}
