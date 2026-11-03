import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/lib/theme';

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
      className={`p-2 rounded border border-[#e5e5e0] dark:border-[#22252c] text-[#5e626d] dark:text-[#8e93a0] hover:text-[#111215] dark:hover:text-[#f4f4f5] hover:bg-[#f4f4f0] dark:hover:bg-[#1c1f24] transition-colors ${className}`}
    >
      {theme === 'light' ? (
        <Moon className="w-4 h-4" aria-hidden="true" />
      ) : (
        <Sun className="w-4 h-4" aria-hidden="true" />
      )}
    </button>
  );
};
