import React, { useEffect } from 'react';
import { Mail, Instagram, ArrowUpRight, Send, CheckCircle2 } from 'lucide-react';
import { getSiteConfig } from '@/lib/data';
import { updatePageSeo, getBreadcrumbSchema } from '@/lib/seo';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';

export const ContactPage: React.FC = () => {
  const site = getSiteConfig();

  useEffect(() => {
    updatePageSeo({
      title: 'Contact Us & Submit an AI Tool | The Future Guy AI',
      description:
        'Get in touch with The Future Guy AI team. Submit an AI tool for directory inclusion or discuss brand partnerships.',
      canonical: '/contact',
      jsonLd: getBreadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Contact', url: '/contact' },
      ]),
    });
  }, [site]);

  return (
    <div className="max-w-3xl mx-auto space-y-10">
      <Breadcrumbs items={[{ label: 'Contact', href: '/contact' }]} />

      <header className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111215] dark:text-[#f4f4f5]">
          Get in Touch
        </h1>
        <p className="text-base text-[#5e626d] dark:text-[#8e93a0] leading-relaxed">
          Whether you want to submit a new artificial intelligence tool, suggest a prompt workflow, or discuss brand partnerships, we would love to hear from you.
        </p>
      </header>

      {/* Direct Contact Methods */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Email */}
        <div className="p-6 rounded-lg border border-[#e5e5e0] dark:border-[#22252c] bg-[#ffffff] dark:bg-[#141619] space-y-3">
          <div className="w-9 h-9 rounded bg-[#f4f4f0] dark:bg-[#1c1f24] flex items-center justify-center text-[#1e3a8a] dark:text-[#3b82f6]">
            <Mail className="w-4 h-4" />
          </div>
          <h2 className="text-base font-bold text-[#111215] dark:text-[#f4f4f5]">
            Direct Editorial Email
          </h2>
          <p className="text-xs text-[#5e626d] dark:text-[#8e93a0] leading-relaxed">
            For press releases, tool submissions, and partnership inquiries:
          </p>
          <a
            href={`mailto:${site.contactEmail}?subject=Tool%20Submission%20/%20Inquiry%20for%20The%20Future%20Guy%20AI`}
            className="inline-flex items-center text-sm font-semibold text-[#1e3a8a] dark:text-[#3b82f6] hover:underline"
          >
            <span>{site.contactEmail}</span>
            <Send className="w-3.5 h-3.5 ml-1.5" />
          </a>
        </div>

        {/* Instagram DM */}
        <div className="p-6 rounded-lg border border-[#e5e5e0] dark:border-[#22252c] bg-[#ffffff] dark:bg-[#141619] space-y-3">
          <div className="w-9 h-9 rounded bg-[#f4f4f0] dark:bg-[#1c1f24] flex items-center justify-center text-[#ec4899]">
            <Instagram className="w-4 h-4" />
          </div>
          <h2 className="text-base font-bold text-[#111215] dark:text-[#f4f4f5]">
            Instagram Message
          </h2>
          <p className="text-xs text-[#5e626d] dark:text-[#8e93a0] leading-relaxed">
            For fast queries, feedback, or community questions, message us on Instagram:
          </p>
          <a
            href={site.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm font-semibold text-[#111215] dark:text-[#f4f4f5] hover:underline"
          >
            <span>{site.instagramHandle}</span>
            <ArrowUpRight className="w-3.5 h-3.5 ml-1.5" />
          </a>
        </div>
      </div>

      {/* Tool Submission Guidelines */}
      <section className="p-6 sm:p-8 rounded-lg border border-[#e5e5e0] dark:border-[#22252c] bg-[#fbfbfa] dark:bg-[#111317] space-y-4">
        <h2 className="text-lg font-bold text-[#111215] dark:text-[#f4f4f5]">
          How to Submit Your AI Tool for Listing
        </h2>
        <p className="text-xs sm:text-sm text-[#5e626d] dark:text-[#8e93a0] leading-relaxed">
          We welcome submissions from bootstrapped founders and enterprise AI labs alike. To expedite review, please include the following in your email to <code className="text-[#111215] dark:text-[#f4f4f5] font-mono">{site.contactEmail}</code>:
        </p>

        <ul className="space-y-2 text-xs sm:text-sm text-[#5e626d] dark:text-[#8e93a0]">
          <li className="flex items-start space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
            <span>Official tool name and production website URL (no unlaunched coming-soon pages).</span>
          </li>
          <li className="flex items-start space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
            <span>Specific category (e.g. Coding, Image Generation, Automation).</span>
          </li>
          <li className="flex items-start space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
            <span>Transparent pricing tier details (Free tier, trial, or subscription cost).</span>
          </li>
          <li className="flex items-start space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
            <span>High-resolution vector SVG or transparent PNG logo.</span>
          </li>
        </ul>
      </section>
    </div>
  );
};
