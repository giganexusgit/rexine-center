import React from 'react';
import { useNavigate } from 'react-router-dom';

import { HeroBanner } from '../components/HeroBanner';
import OurClients from '../components/OurClients';
import { HighlightsBar } from '../components/HighlightsBar';
import { SearchSection } from '../components/SearchSection';
import { LeatherMarquee } from '../components/LeatherMarquee';
import { BrowseBooksSection } from '../components/BrowseBooksSection';
import { CustomizerSection } from '../components/CustomizerSection';
import { ApplicationsSection } from '../components/ApplicationsSection';
import { MetricsBar } from '../components/MetricsBar';
import { ProcessSection } from '../components/ProcessSection';
import { GalleryTestimonialsBlog } from '../components/GalleryTestimonialsBlog';
import { FAQAndBulkSection } from '../components/FAQAndBulkSection';
import { IndiaSupplySection } from '../components/IndiaSupplySection';

import { Product } from '../types';
import { SEO } from '../components/SEO';
import { SEO_DATA } from '../data/seoData';

interface HomePageProps {
  onOpenBookScanner: () => void;
  onOpenEnquiry: (product?: Product | null) => void;
  onSearchSubmit: (query: string) => void;
  onSelectProduct: (product: Product) => void;
  onSelectApplication: (appId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onOpenBookScanner,
  onOpenEnquiry,
  onSearchSubmit,
  onSelectProduct,
  onSelectApplication,
}) => {
  const navigate = useNavigate();

  return (
    <div>

      {/* SEO */}
      <SEO
        title={SEO_DATA.home.title}
        description={SEO_DATA.home.description}
        keywords={SEO_DATA.home.keywords}

      />

      {/* 1. Hero Banner */}
      <HeroBanner
        onOpenBookScanner={onOpenBookScanner}
        onOpenEnquiry={() => onOpenEnquiry(null)}
      />

      <OurClients />

      {/* 2. Highlights Bar */}
      <HighlightsBar />

      {/* 3. Search Bar */}
      <SearchSection
        onSearchSubmit={onSearchSubmit}
        onOpenEnquiry={() => onOpenEnquiry(null)}
      />

      {/* Leather Swatches Marquee Banner */}
      <LeatherMarquee />

      {/* 4. Browse Physical Sample Books */}
      <BrowseBooksSection />

      {/* 5. Customizer Section */}
      <CustomizerSection
        onOpenEnquiry={() => onOpenEnquiry(null)}
      />

      {/* 6. Applications Section */}
      <ApplicationsSection
        onSelectApplication={(appId) =>
          navigate(`/applications/${appId}`)
        }
      />

      {/* 7. Metrics Bar */}
      <MetricsBar />

      {/* 8. Process Section */}
      <ProcessSection />

      {/* 9. Gallery & Blog */}
      <GalleryTestimonialsBlog />

      {/* 10. FAQs & Bulk Quote Banner */}
      <FAQAndBulkSection
        onOpenEnquiry={() => onOpenEnquiry(null)}
      />

      {/* 11. India Supply Section */}
      <IndiaSupplySection />
    </div>
  );
};