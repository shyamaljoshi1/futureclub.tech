import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { getFooter, getSiteConfig } from '@/lib/data';

export const Footer: React.FC = () => {
  const footer = getFooter();
  const site = getSiteConfig();

  return (
    <footer data-ui="site-footer" className="bg-[#f4f4f0] dark:bg-[#141619] transition-colors mt-24">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand info column */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center hover:opacity-90 transition-opacity">
              <img
                src="/logo.png"
                alt="futureclub.tech"
                className="h-8 w-auto object-contain dark:hidden"
              />
              <img
                src="/logo-dark.png"
                alt="futureclub.tech"
                className="h-8 w-auto object-contain hidden dark:block"
              />
            </Link>
            <p className="text-sm text-[#5e626d] dark:text-[#8e93a0] max-w-sm leading-relaxed">
              {footer.aboutText}
            </p>
            <div className="pt-2">
              <a
                href={site.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-xs font-medium text-[#1e3a8a] dark:text-[#3b82f6] hover:underline"
              >
                <span>Follow {site.instagramHandle} on Instagram</span>
                <ArrowUpRight className="w-3.5 h-3.5 ml-0.5" />
              </a>
            </div>
          </div>

          {/* Nav columns */}
          {footer.columns.slice(0, 3).map((col) => (
            <div key={col.title} className="space-y-3">
              <h3 className="text-xs font-semibold text-[#111215] dark:text-[#f4f4f5]">
                {col.title}
              </h3>
              <ul className="space-y-2 text-sm">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.isExternal ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#5e626d] dark:text-[#8e93a0] hover:text-[#111215] dark:hover:text-[#f4f4f5] transition-colors inline-flex items-center"
                      >
                        {link.label}
                        <ArrowUpRight className="w-3 h-3 ml-1 text-[#888d99]" />
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="text-[#5e626d] dark:text-[#8e93a0] hover:text-[#111215] dark:hover:text-[#f4f4f5] transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Legal & Disclaimer Section */}
        <div className="mt-12 pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-[#888d99] dark:text-[#636773]">
          <p className="max-w-xl">
            {footer.disclaimer}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            {footer.legal.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="hover:text-[#111215] dark:hover:text-[#f4f4f5] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-4 text-xs text-[#888d99] dark:text-[#636773]">
          {footer.copyright}
        </div>
      </div>
    </footer>
  );
};
