import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Layers } from 'lucide-react';
import { getCollections, getSiteConfig } from '@/lib/data';
import { updatePageSeo, getBreadcrumbSchema } from '@/lib/seo';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';

export const CollectionsPage: React.FC = () => {
  const collections = getCollections();
  const site = getSiteConfig();

  useEffect(() => {
    updatePageSeo({
      title: 'Curated AI Collections & Toolkits | The Future Guy AI',
      description:
        'Hand-picked toolkits and prompt collections for developers, content creators, college students, and marketing teams.',
      canonical: '/collections',
      jsonLd: getBreadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Collections', url: '/collections' },
      ]),
    });
  }, [site]);

  return (
    <div className="space-y-10">
      <Breadcrumbs items={[{ label: 'Collections', href: '/collections' }]} />

      <div className="max-w-3xl">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111215] dark:text-[#f4f4f5] mb-2">
          Curated AI Toolkits & Collections
        </h1>
        <p className="text-sm sm:text-base text-[#5e626d] dark:text-[#8e93a0] leading-relaxed">
          Comprehensive bundles bringing together verified tools and matching prompt workflows for specific objectives.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map((col) => (
          <Link
            key={col.id}
            to={`/collections/${col.slug}`}
            className="group flex flex-col justify-between p-6 rounded-lg border border-[#e5e5e0] dark:border-[#22252c] bg-[#ffffff] dark:bg-[#141619] hover:border-[#111215] dark:hover:border-[#f4f4f5] transition-colors"
          >
            <div>
              <div className="flex items-center space-x-2 text-xs text-[#1e3a8a] dark:text-[#3b82f6] font-semibold mb-3">
                <Layers className="w-3.5 h-3.5" />
                <span>{col.toolIds.length} Tools · {col.promptIds.length} Prompts</span>
              </div>

              <h2 className="text-xl font-bold text-[#111215] dark:text-[#f4f4f5] group-hover:text-[#1e3a8a] dark:group-hover:text-[#3b82f6] transition-colors mb-3 leading-snug">
                {col.title}
              </h2>

              <p className="text-xs sm:text-sm text-[#5e626d] dark:text-[#8e93a0] leading-relaxed mb-6">
                {col.description}
              </p>
            </div>

            <div className="flex items-center text-xs font-semibold text-[#111215] dark:text-[#f4f4f5] group-hover:translate-x-1 transition-transform pt-4">
              <span>Explore Collection</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
