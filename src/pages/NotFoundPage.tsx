import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';
import { updatePageSeo } from '@/lib/seo';

export const NotFoundPage: React.FC = () => {
  useEffect(() => {
    updatePageSeo({
      title: '404 — Page Not Found | The Future Guy AI',
      description: 'The page you requested could not be found.',
    });
  }, []);

  return (
    <div className="py-24 text-center space-y-6 max-w-lg mx-auto">
      <div className="w-16 h-16 mx-auto rounded-full bg-[#f4f4f0] dark:bg-[#1c1f24] flex items-center justify-center text-[#111215] dark:text-[#f4f4f5] text-2xl font-bold">
        404
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111215] dark:text-[#f4f4f5]">
          Page Not Found
        </h1>
        <p className="text-sm text-[#5e626d] dark:text-[#8e93a0]">
          The resource or directory you were looking for has moved, expired, or does not exist.
        </p>
      </div>

      <div className="flex items-center justify-center space-x-3 pt-2">
        <Link
          to="/"
          className="btn-primary rounded px-4 py-2 text-xs font-semibold inline-flex items-center"
        >
          <Home className="w-3.5 h-3.5 mr-1.5" />
          <span>Back to Home</span>
        </Link>

        <Link
          to="/tools"
          className="btn-secondary rounded px-4 py-2 text-xs font-semibold inline-flex items-center"
        >
          <Search className="w-3.5 h-3.5 mr-1.5" />
          <span>Explore Tools</span>
        </Link>
      </div>
    </div>
  );
};
