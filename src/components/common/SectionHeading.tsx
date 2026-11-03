import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  linkText?: string;
  linkHref?: string;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  linkText,
  linkHref,
  className = '',
}) => {
  return (
    <div
      data-ui="section-header"
      className={`flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-3 gap-4 ${className}`}
    >
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111215] dark:text-[#f4f4f5]">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-1.5 text-sm sm:text-base text-[#5e626d] dark:text-[#8e93a0] max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {linkText && linkHref && (
        <Link
          to={linkHref}
          className="inline-flex items-center text-xs sm:text-sm font-semibold text-[#1e3a8a] dark:text-[#3b82f6] hover:underline flex-shrink-0"
        >
          <span>{linkText}</span>
          <ArrowRight className="w-3.5 h-3.5 ml-1" />
        </Link>
      )}
    </div>
  );
};
