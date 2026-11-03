import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { updatePageSeo } from '@/lib/seo';
import { getSiteConfig } from '@/lib/data';

export const LegalPage: React.FC = () => {
  const location = useLocation();
  const site = getSiteConfig();

  const pathname = location.pathname;

  let pageType: 'privacy' | 'terms' | 'disclaimer' = 'privacy';
  if (pathname.includes('terms')) pageType = 'terms';
  if (pathname.includes('disclaimer')) pageType = 'disclaimer';

  useEffect(() => {
    const titles = {
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      disclaimer: 'Disclaimer & Affiliate Disclosure',
    };
    updatePageSeo({
      title: `${titles[pageType]} | ${site.brandName}`,
      description: `Official ${titles[pageType]} and disclosures for ${site.brandName}.`,
      canonical: pathname,
    });
  }, [pageType, pathname, site]);

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <Breadcrumbs
        items={[
          {
            label:
              pageType === 'privacy'
                ? 'Privacy Policy'
                : pageType === 'terms'
                ? 'Terms of Service'
                : 'Disclaimer',
            href: pathname,
          },
        ]}
      />

      {/* Verification notice for owner */}
      <div className="p-4 rounded border border-amber-200 dark:border-amber-900/60 bg-amber-50 dark:bg-amber-950/40 text-xs text-amber-900 dark:text-amber-300 leading-relaxed">
        <strong>Editorial Note for Site Owner:</strong> This document serves as a baseline legal template tailored for Google AdSense and directory compliance. Review and verify business-specific contact details or local jurisdiction requirements prior to public monetization review.
      </div>

      {pageType === 'privacy' && (
        <article className="space-y-6 text-sm sm:text-base text-[#5e626d] dark:text-[#8e93a0] leading-relaxed">
          <header className="space-y-2 pb-6">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111215] dark:text-[#f4f4f5]">
              Privacy Policy
            </h1>
            <p className="text-xs text-[#888d99] dark:text-[#636773]">
              Last Updated: November 1, 2026
            </p>
          </header>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#111215] dark:text-[#f4f4f5]">
              1. Information We Collect
            </h2>
            <p>
              The Future Guy AI (&quot;we&quot;, &quot;our&quot;, or &quot;the Platform&quot;) operates as an informational directory and prompt repository. We do not require user account registration, passwords, or credit card collection to access our directories.
            </p>
            <p>
              When you browse our website, standard web server logs and anonymous analytics data may be collected automatically, including your IP address (anonymized), browser type, referring pages, and interaction timestamps.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#111215] dark:text-[#f4f4f5]">
              2. Cookies & Advertising Technologies
            </h2>
            <p>
              We may partner with third-party advertising networks, specifically <strong>Google AdSense</strong>. Google, as a third-party vendor, uses cookies to serve advertisements on our site based on a user&apos;s prior visits to this website or other websites on the internet.
            </p>
            <p>
              Google&apos;s use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our sites and/or other sites on the Internet. Users may opt out of personalized advertising by visiting Google Ads Settings (<a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer" className="underline text-[#1e3a8a] dark:text-[#3b82f6]">https://adssettings.google.com/</a>).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#111215] dark:text-[#f4f4f5]">
              3. Third-Party Links & AI Tools
            </h2>
            <p>
              Our directory contains links to external artificial intelligence tools, platforms, and resources operated by third parties (e.g. OpenAI, Anthropic, Midjourney). Once you click an external link, you leave our platform. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#111215] dark:text-[#f4f4f5]">
              4. Contact Us
            </h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at <a href={`mailto:${site.contactEmail}`} className="underline text-[#1e3a8a] dark:text-[#3b82f6] font-medium">{site.contactEmail}</a>.
            </p>
          </section>
        </article>
      )}

      {pageType === 'terms' && (
        <article className="space-y-6 text-sm sm:text-base text-[#5e626d] dark:text-[#8e93a0] leading-relaxed">
          <header className="space-y-2 pb-6">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111215] dark:text-[#f4f4f5]">
              Terms of Service
            </h1>
            <p className="text-xs text-[#888d99] dark:text-[#636773]">
              Last Updated: November 1, 2026
            </p>
          </header>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#111215] dark:text-[#f4f4f5]">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using The Future Guy AI, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, please do not use this site.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#111215] dark:text-[#f4f4f5]">
              2. Informational Purpose & Prompt Usage
            </h2>
            <p>
              All prompts, tool evaluations, and educational guides provided on The Future Guy AI are provided for personal and educational use. While prompts are tested for performance, generative AI model outputs are inherently non-deterministic. We do not guarantee specific business outcomes, viral reach, or computational accuracy from executing listed prompts.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#111215] dark:text-[#f4f4f5]">
              3. Intellectual Property & Trademarks
            </h2>
            <p>
              Trademarks, brand names, product logos, and screenshots displayed on this website belong to their respective corporate owners (e.g., ChatGPT is a trademark of OpenAI, Claude of Anthropic). Our use of these marks is strictly for identification and editorial commentary purposes.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#111215] dark:text-[#f4f4f5]">
              4. Changes to Terms
            </h2>
            <p>
              We reserve the right to modify these terms at any time. Continued use of the platform after changes indicates acceptance of revised terms.
            </p>
          </section>
        </article>
      )}

      {pageType === 'disclaimer' && (
        <article className="space-y-6 text-sm sm:text-base text-[#5e626d] dark:text-[#8e93a0] leading-relaxed">
          <header className="space-y-2 pb-6">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111215] dark:text-[#f4f4f5]">
              Disclaimer & Disclosure
            </h1>
            <p className="text-xs text-[#888d99] dark:text-[#636773]">
              Last Updated: November 1, 2026
            </p>
          </header>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#111215] dark:text-[#f4f4f5]">
              1. Affiliate Disclosure
            </h2>
            <p>
              The Future Guy AI participates in affiliate referral programs. Some outbound links to third-party artificial intelligence tools and software services may be affiliate links. If you click on an affiliate link and make a purchase or subscribe, we may receive a commission at no additional cost to you.
            </p>
            <p>
              Our editorial assessments, pros, cons, and recommendations are conducted independently. We do not accept payment to rate subpar software favorably.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#111215] dark:text-[#f4f4f5]">
              2. Tool Pricing & Availability Disclaimer
            </h2>
            <p>
              AI software platforms change their pricing tiers, free quotas, and feature availability frequently. While we strive to maintain up-to-date pricing tags (Free, Freemium, Paid), you must always verify the current pricing directly on the official vendor&apos;s website before subscribing.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#111215] dark:text-[#f4f4f5]">
              3. General AI Advice Disclaimer
            </h2>
            <p>
              The content provided on this website does not constitute legal, financial, or certified professional advice. Always review AI-generated code, legal summaries, or medical/financial text with qualified human experts before production deployment.
            </p>
          </section>
        </article>
      )}
    </div>
  );
};
