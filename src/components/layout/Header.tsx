import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, ArrowUpRight } from 'lucide-react';
import { getNavigation, getSiteConfig } from '@/lib/data';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import { SearchModal } from '@/components/common/SearchModal';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const location = useLocation();
  const nav = getNavigation();
  const site = getSiteConfig();

  return (
    <>
      <header
        data-ui="site-header"
        className="sticky top-0 z-40 w-full bg-[#ffffff] dark:bg-[#141619] transition-colors"
      >
        <div className="container-custom flex items-center justify-between h-16">
          {/* Brand Logo / Wordmark */}
          <Link
            to="/"
            className="flex items-center hover:opacity-90 transition-opacity py-1"
            aria-label="futureclub.tech homepage"
          >
            <img
              src="/logo.png"
              alt="futureclub.tech"
              className="h-7 w-auto object-contain dark:hidden"
            />
            <img
              src="/logo-dark.png"
              alt="futureclub.tech"
              className="h-7 w-auto object-contain hidden dark:block"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6 text-sm" aria-label="Main navigation">
            {nav.primary.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`transition-colors py-1 ${
                    isActive
                      ? 'text-[#111215] dark:text-[#f4f4f5] font-semibold'
                      : 'text-[#5e626d] dark:text-[#8e93a0] hover:text-[#111215] dark:hover:text-[#f4f4f5]'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions: Search, Theme, CTA */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Search Trigger */}
            <button
              type="button"
              onClick={() => setSearchModalOpen(true)}
              aria-label="Search tools and prompts"
              className="flex items-center space-x-2 px-2.5 py-1.5 text-xs text-[#5e626d] dark:text-[#8e93a0] hover:text-[#111215] dark:hover:text-[#f4f4f5] rounded bg-[#f4f4f0] dark:bg-[#0c0d0f] transition-colors"
            >
              <Search className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden sm:inline-block px-1 py-0.5 text-[10px] rounded bg-[#eaeae5] dark:bg-[#22252c] text-[#888d99] dark:text-[#636773]">
                ⌘K
              </kbd>
            </button>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Instagram CTA */}
            <a
              href={nav.cta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center text-xs font-medium px-3 py-1.5 rounded bg-[#111215] text-[#ffffff] dark:bg-[#f4f4f5] dark:text-[#111215] hover:opacity-90 transition-opacity"
            >
              <span>{nav.cta.label}</span>
              <ArrowUpRight className="w-3 h-3 ml-1" aria-hidden="true" />
            </a>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#5e626d] dark:text-[#8e93a0] hover:text-[#111215] dark:hover:text-[#f4f4f5]"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Menu className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#f4f4f0] dark:bg-[#141619] px-4 py-4 space-y-3">
            <nav className="flex flex-col space-y-2" aria-label="Mobile navigation">
              {nav.primary.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 rounded text-sm font-medium ${
                    location.pathname === item.href
                      ? 'bg-[#ffffff] dark:bg-[#1c1f24] text-[#111215] dark:text-[#f4f4f5]'
                      : 'text-[#5e626d] dark:text-[#8e93a0] hover:bg-[#ffffff] dark:hover:bg-[#1c1f24]'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="pt-3 flex flex-col space-y-2">
              <a
                href={nav.cta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-2 text-xs font-semibold rounded bg-[#111215] text-[#ffffff] dark:bg-[#f4f4f5] dark:text-[#111215]"
              >
                Follow on Instagram ({nav.cta.label})
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      <SearchModal isOpen={searchModalOpen} onClose={() => setSearchModalOpen(false)} />
    </>
  );
};
