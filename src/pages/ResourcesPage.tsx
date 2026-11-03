import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, ArrowRight } from 'lucide-react';
import { getResources, getSiteConfig } from '@/lib/data';
import { updatePageSeo, getBreadcrumbSchema } from '@/lib/seo';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';

export const ResourcesPage: React.FC = () => {
  const resources = getResources();
  const site = getSiteConfig();

  useEffect(() => {
    updatePageSeo({
      title: 'AI Tutorials, Guides & Workflows | The Future Guy AI',
      description:
        'Practical step-by-step guides on prompt engineering, AI developer workflows, Midjourney photorealism, and Instagram content automation.',
      canonical: '/resources',
      jsonLd: getBreadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Resources', url: '/resources' },
      ]),
    });
  }, [site]);

  return (
    <div className="space-y-10">
      <Breadcrumbs items={[{ label: 'Resources', href: '/resources' }]} />

      <div className="max-w-3xl">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111215] dark:text-[#f4f4f5] mb-2">
          AI Guides & Workflows
        </h1>
        <p className="text-sm sm:text-base text-[#5e626d] dark:text-[#8e93a0] leading-relaxed">
          Tactical tutorials and frameworks for developers, creators, and professionals looking to extract genuine productivity from artificial intelligence.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resources.map((res) => (
          <article
            key={res.id}
            className="group flex flex-col justify-between p-6 sm:p-8 rounded-lg border border-[#e5e5e0] dark:border-[#22252c] bg-[#ffffff] dark:bg-[#141619] hover:border-[#111215] dark:hover:border-[#f4f4f5] transition-colors"
          >
            <div>
              <div className="flex items-center space-x-3 text-xs text-[#888d99] dark:text-[#636773] mb-3">
                <span className="flex items-center">
                  <Clock className="w-3.5 h-3.5 mr-1" />
                  {res.readTime}
                </span>
                <span>·</span>
                <span className="capitalize">{res.category.replace('-', ' ')}</span>
              </div>

              <h2 className="text-xl font-bold text-[#111215] dark:text-[#f4f4f5] group-hover:text-[#1e3a8a] dark:group-hover:text-[#3b82f6] transition-colors mb-3 leading-snug">
                <Link to={`/resources/${res.slug}`}>
                  {res.title}
                </Link>
              </h2>

              <p className="text-sm text-[#5e626d] dark:text-[#8e93a0] leading-relaxed mb-6">
                {res.description}
              </p>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <span className="text-xs text-[#888d99] dark:text-[#636773]">
                Published {res.publishedAt}
              </span>

              <Link
                to={`/resources/${res.slug}`}
                className="text-xs font-semibold text-[#111215] dark:text-[#f4f4f5] inline-flex items-center group-hover:translate-x-1 transition-transform"
              >
                <span>Read Full Guide</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
