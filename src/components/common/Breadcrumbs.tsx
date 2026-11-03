import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {
  return (
    <nav aria-label="Breadcrumb" className={`mb-6 ${className}`}>
      <ol className="flex items-center space-x-1.5 text-xs text-[#5e626d] dark:text-[#8e93a0] flex-wrap">
        <li>
          <Link
            to="/"
            className="hover:text-[#111215] dark:hover:text-[#f4f4f5] transition-colors inline-flex items-center"
            aria-label="Home"
          >
            <Home className="w-3.5 h-3.5" />
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.label} className="flex items-center space-x-1.5">
              <ChevronRight className="w-3 h-3 text-[#888d99] dark:text-[#636773] flex-shrink-0" aria-hidden="true" />
              {isLast || !item.href ? (
                <span className="text-[#111215] dark:text-[#f4f4f5] font-medium truncate max-w-xs" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.href}
                  className="hover:text-[#111215] dark:hover:text-[#f4f4f5] transition-colors truncate max-w-xs"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
