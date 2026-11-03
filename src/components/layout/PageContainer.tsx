import React from 'react';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'default' | 'narrow' | 'wide';
}

export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  className = '',
  maxWidth = 'default',
}) => {
  const widthClasses = {
    narrow: 'max-w-4xl',
    default: 'max-w-7xl',
    wide: 'max-w-screen-2xl',
  }[maxWidth];

  return (
    <main className={`min-h-[75vh] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 ${widthClasses} ${className}`}>
      {children}
    </main>
  );
};
