import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Clock, Tag, ArrowRight, Lightbulb, Share2 } from 'lucide-react';
import { getResourceBySlug, getResources } from '@/lib/data';
import { updatePageSeo, getBreadcrumbSchema, getArticleSchema } from '@/lib/seo';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { AdSlot } from '@/components/ads/AdSlot';

export const ResourceDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const resource = getResourceBySlug(slug || '');
  const detailsAdSlot = import.meta.env.VITE_ADSENSE_SLOT_DETAILS;

  useEffect(() => {
    if (!resource) {
      navigate('/resources', { replace: true });
      return;
    }

    updatePageSeo({
      title: resource.seo.title,
      description: resource.seo.description,
      canonical: `/resources/${resource.slug}`,
      ogType: 'article',
      jsonLd: [
        getArticleSchema(resource),
        getBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Resources', url: '/resources' },
          { name: resource.title, url: `/resources/${resource.slug}` },
        ]),
      ],
    });
  }, [resource, navigate]);

  if (!resource) return null;

  const moreResources = getResources()
    .filter((r) => r.id !== resource.id)
    .slice(0, 2);

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <Breadcrumbs
        items={[
          { label: 'Resources', href: '/resources' },
          { label: resource.title, href: `/resources/${resource.slug}` },
        ]}
      />

      {/* Article Header */}
      <header className="space-y-4 pb-6">
        <div className="flex items-center space-x-3 text-xs text-[#888d99] dark:text-[#636773]">
          <span className="flex items-center">
            <Clock className="w-3.5 h-3.5 mr-1" />
            {resource.readTime}
          </span>
          <span>·</span>
          <span className="capitalize flex items-center">
            <Tag className="w-3 h-3 mr-1" />
            {resource.category.replace('-', ' ')}
          </span>
          <span>·</span>
          <span>Updated {resource.publishedAt}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#111215] dark:text-[#f4f4f5] leading-[1.12]">
          {resource.title}
        </h1>

        <p className="text-base sm:text-lg text-[#5e626d] dark:text-[#8e93a0] leading-relaxed">
          {resource.description}
        </p>
      </header>

      {/* Article Body Sections */}
      <article className="space-y-12">
        {resource.sections.map((section, idx) => (
          <section key={idx} className="space-y-4">
            <h2 className="text-2xl font-bold text-[#111215] dark:text-[#f4f4f5]">
              {section.title}
            </h2>

            <div className="text-base text-[#5e626d] dark:text-[#8e93a0] leading-relaxed whitespace-pre-line space-y-4">
              {section.content}
            </div>

            {section.tips && section.tips.length > 0 && (
              <div className="my-6 p-5 rounded-lg bg-[#fbfbfa] dark:bg-[#141619] space-y-2">
                <div className="flex items-center space-x-2 text-xs font-bold text-[#1e3a8a] dark:text-[#3b82f6]">
                  <Lightbulb className="w-4 h-4" />
                  <span>Key Principles</span>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-[#5e626d] dark:text-[#8e93a0]">
                  {section.tips.map((tip, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <span className="text-[#1e3a8a] dark:text-[#3b82f6] font-bold">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        ))}
      </article>

      {/* AdSlot in article */}
      {detailsAdSlot && <AdSlot slotId={detailsAdSlot} label="Sponsored Reading" />}

      {/* Share / Follow CTA */}
      <div className="p-6 rounded-lg bg-[#ffffff] dark:bg-[#141619] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-[#111215] dark:text-[#f4f4f5]">
            Enjoyed this guide?
          </h3>
          <p className="text-xs sm:text-sm text-[#5e626d] dark:text-[#8e93a0]">
            We break down real workflows and generative tools every day on our Instagram channel.
          </p>
        </div>
        <a
          href="https://www.instagram.com/thefutureguyy.ai/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary rounded-md px-4 py-2 text-xs font-semibold whitespace-nowrap"
        >
          Follow @thefutureguyy.ai
        </a>
      </div>

      {/* Next Guides */}
      {moreResources.length > 0 && (
        <section className="pt-8 space-y-6">
          <h2 className="text-xl font-bold text-[#111215] dark:text-[#f4f4f5]">
            Continue Reading
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {moreResources.map((r) => (
              <Link
                key={r.id}
                to={`/resources/${r.slug}`}
                className="group p-5 rounded-lg border border-[#e5e5e0] dark:border-[#22252c] bg-[#ffffff] dark:bg-[#141619] hover:border-[#111215] dark:hover:border-[#f4f4f5] transition-colors"
              >
                <span className="text-xs text-[#888d99] dark:text-[#636773] block mb-2">
                  {r.readTime}
                </span>
                <h3 className="text-base font-bold text-[#111215] dark:text-[#f4f4f5] group-hover:text-[#1e3a8a] dark:group-hover:text-[#3b82f6] transition-colors mb-2 leading-snug">
                  {r.title}
                </h3>
                <div className="flex items-center text-xs font-semibold text-[#1e3a8a] dark:text-[#3b82f6]">
                  <span>Read guide</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
