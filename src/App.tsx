import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PageContainer } from '@/components/layout/PageContainer';
import { AdSenseProvider } from '@/components/ads/AdSenseProvider';
import { ThemeProvider } from '@/lib/theme';
import { initGA } from '@/lib/analytics';

// Pages
import { HomePage } from '@/pages/HomePage';
import { ToolsPage } from '@/pages/ToolsPage';
import { ToolDetailPage } from '@/pages/ToolDetailPage';
import { PromptsPage } from '@/pages/PromptsPage';
import { PromptDetailPage } from '@/pages/PromptDetailPage';
import { CollectionsPage } from '@/pages/CollectionsPage';
import { CollectionDetailPage } from '@/pages/CollectionDetailPage';
import { ResourcesPage } from '@/pages/ResourcesPage';
import { ResourceDetailPage } from '@/pages/ResourceDetailPage';
import { AboutPage } from '@/pages/AboutPage';
import { ContactPage } from '@/pages/ContactPage';
import { LegalPage } from '@/pages/LegalPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { SeriesPage } from '@/pages/SeriesPage';
import { SeriesDetailPage } from '@/pages/SeriesDetailPage';
import { SeriesPostPage } from '@/pages/SeriesPostPage';
import { NewsPage } from '@/pages/NewsPage';
import { NewsDetailPage } from '@/pages/NewsDetailPage';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export const AppContent: React.FC = () => {
  useEffect(() => {
    initGA();
  }, []);

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <ScrollToTop />
      <Header />
      <div className="flex-1">
        <PageContainer>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/news/:slug" element={<NewsDetailPage />} />
            <Route path="/tools" element={<ToolsPage />} />
            <Route path="/tools/:slug" element={<ToolDetailPage />} />
            <Route path="/prompts" element={<PromptsPage />} />
            <Route path="/prompts/:slug" element={<PromptDetailPage />} />
            <Route path="/series" element={<SeriesPage />} />
            <Route path="/series/:seriesSlug" element={<SeriesDetailPage />} />
            <Route path="/series/:seriesSlug/:postSlug" element={<SeriesPostPage />} />
            <Route path="/collections" element={<CollectionsPage />} />
            <Route path="/collections/:slug" element={<CollectionDetailPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/resources/:slug" element={<ResourceDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy-policy" element={<LegalPage />} />
            <Route path="/terms" element={<LegalPage />} />
            <Route path="/disclaimer" element={<LegalPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </PageContainer>
      </div>
      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AdSenseProvider>
        <AppContent />
        <Analytics />
      </AdSenseProvider>
    </ThemeProvider>
  );
};

export default App;
