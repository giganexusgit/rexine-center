import React, { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import Lenis from 'lenis';
import { setLenis } from './lib/lenis';

import { CustomCursor } from './components/CustomCursor';
import { Preloader } from './components/Preloader';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingElements } from './components/FloatingElements';

// Pages
import { HomePage } from './pages/HomePage';
import { BooksPage } from './pages/BooksPage';
import BookDetailPage from './pages/BookDetailPage';
import { BookProductDetailPage } from './pages/BookProductDetailPage';
import { ApplicationsPage } from './pages/ApplicationsPage';
import { CustomizerPage } from './pages/CustomizerPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { CitiesSupplyPage } from './pages/CitiesSupplyPage';
import { SitemapPage } from './pages/SitemapPage';
import { BlogDetailPage } from './pages/BlogDetailPage';

// Modals
import { QuickEnquiryModal } from './components/QuickEnquiryModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { BookScannerModal } from './components/BookScannerModal';
import { VideoModal } from './components/VideoModal';
import { SearchModal } from './components/SearchModal';

import { PRODUCTS } from './data/mockData';
import { Product } from './types';

// ============================================================
// SCROLL TO TOP
// ============================================================

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    });
  }, [pathname]);

  return null;
}

// ============================================================
// MAIN APP CONTENT
// ============================================================

function MainAppContent() {
  const [loading, setLoading] = useState(true);

  const [wishlistIds, setWishlistIds] = useState<string[]>([
    'p1',
    'p3',
  ]);

  // ============================================================
  // MODAL STATE
  // ============================================================

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchInitialQuery, setSearchInitialQuery] = useState('');

  const [wishlistOpen, setWishlistOpen] = useState(false);

  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [selectedEnquiryProduct, setSelectedEnquiryProduct] =
    useState<Product | null>(null);

  const [detailProduct, setDetailProduct] =
    useState<Product | null>(null);

  const [bookScannerOpen, setBookScannerOpen] =
    useState(false);

  const [videoOpen, setVideoOpen] = useState(false);

  const navigate = useNavigate();

  // ============================================================
  // LENIS
  // ============================================================

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) =>
        Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    setLenis(lenis);

    let animationFrameId: number;

    const raf = (time: number) => {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    };

    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, []);

  // ============================================================
  // WISHLIST
  // ============================================================

  const handleToggleWishlist = (productId: string) => {
    setWishlistIds((previous) =>
      previous.includes(productId)
        ? previous.filter((id) => id !== productId)
        : [...previous, productId]
    );
  };

  // ============================================================
  // SEARCH
  // ============================================================

  const handleSearchSubmit = (query: string) => {
    setSearchInitialQuery(query);
    setSearchOpen(true);
  };

  // ============================================================
  // ENQUIRY
  // ============================================================

  const handleOpenEnquiryWithProduct = (
    product?: Product | null
  ) => {
    setSelectedEnquiryProduct(product || null);
    setEnquiryOpen(true);
  };

  // ============================================================
  // WISHLIST PRODUCTS
  // ============================================================

  const wishlistProducts = PRODUCTS.filter((product) =>
    wishlistIds.includes(product.id)
  );

  return (
    <div className="relative min-h-screen bg-[#F8F6F2] text-[#111111] antialiased selection:bg-[#C67C4E] selection:text-white">
      <ScrollToTop />

      <CustomCursor />

      <Preloader
        onComplete={() => setLoading(false)}
      />

      {!loading && (
        <div className="flex min-h-screen flex-col">

          {/* ======================================================
              NAVBAR
          ====================================================== */}

          <Navbar
            onOpenSearch={() => setSearchOpen(true)}
            onOpenWishlist={() => setWishlistOpen(true)}
            onOpenEnquiry={() =>
              handleOpenEnquiryWithProduct(null)
            }
          />

          {/* ======================================================
              ROUTES
          ====================================================== */}

          <main className="flex-grow">
            <Routes>

              {/* HOME */}
              <Route
                path="/"
                element={
                  <HomePage
                    onOpenBookScanner={() =>
                      setBookScannerOpen(true)
                    }
                    onOpenEnquiry={
                      handleOpenEnquiryWithProduct
                    }
                    onSearchSubmit={
                      handleSearchSubmit
                    }
                    onSelectProduct={(product) =>
                      setDetailProduct(product)
                    }
                    onSelectApplication={() =>
                      navigate('/applications')
                    }
                  />
                }
              />

              {/* BOOKS */}
              <Route
                path="/books"
                element={
                  <BooksPage
                    onOpenEnquiry={
                      handleOpenEnquiryWithProduct
                    }
                  />
                }
              />

              {/* BOOK DETAIL */}
              <Route
                path="/books/:slug"
                element={
                  <BookDetailPage
                    onOpenEnquiry={handleOpenEnquiryWithProduct}
                    onSelectProduct={(product) =>
                      setDetailProduct(product)
                    }
                  />
                }
              />

              {/* BOOK PRODUCT DETAIL */}
              <Route
                path="/books/:slug/:productCode"
                element={
                  <BookProductDetailPage
                    onOpenEnquiry={
                      handleOpenEnquiryWithProduct
                    }
                    onSelectProduct={(product) =>
                      setDetailProduct(product)
                    }
                  />
                }
              />

              {/* APPLICATIONS */}
              <Route
                path="/applications"
                element={
                  <ApplicationsPage
                    onOpenEnquiry={
                      handleOpenEnquiryWithProduct
                    }
                  />
                }
              />

              <Route
                path="/applications/:applicationId"
                element={
                  <ApplicationsPage
                    onOpenEnquiry={
                      handleOpenEnquiryWithProduct
                    }
                  />
                }
              />

              {/* CUSTOMIZER */}
              <Route
                path="/customizer"
                element={
                  <CustomizerPage
                    onOpenEnquiry={
                      handleOpenEnquiryWithProduct
                    }
                  />
                }
              />

              {/* RESOURCES */}
              <Route
                path="/resources"
                element={
                  <ResourcesPage
                    onOpenEnquiry={
                      handleOpenEnquiryWithProduct
                    }
                    onOpenBookScanner={() =>
                      setBookScannerOpen(true)
                    }
                    onOpenVideoModal={() =>
                      setVideoOpen(true)
                    }
                  />
                }
              />

              {/* BLOG */}
              <Route
                path="/resources/:slug"
                element={<BlogDetailPage />}
              />

              {/* ABOUT */}
              <Route
                path="/about"
                element={
                  <AboutPage
                    onOpenEnquiry={
                      handleOpenEnquiryWithProduct
                    }
                  />
                }
              />

              {/* CONTACT */}
              <Route
                path="/contact"
                element={
                  <ContactPage
                    onOpenEnquiry={
                      handleOpenEnquiryWithProduct
                    }
                  />
                }
              />

              {/* SUPPLY LOCATIONS */}
              <Route
                path="/supply-locations"
                element={
                  <CitiesSupplyPage
                    onOpenEnquiry={
                      handleOpenEnquiryWithProduct
                    }
                  />
                }
              />

              {/* SITEMAP */}
              <Route
                path="/sitemap"
                element={
                  <SitemapPage
                    onOpenEnquiry={
                      handleOpenEnquiryWithProduct
                    }
                  />
                }
              />

              {/* FALLBACK */}
              <Route
                path="*"
                element={
                  <HomePage
                    onOpenBookScanner={() =>
                      setBookScannerOpen(true)
                    }
                    onOpenEnquiry={
                      handleOpenEnquiryWithProduct
                    }
                    onSearchSubmit={
                      handleSearchSubmit
                    }
                    onSelectProduct={(product) =>
                      setDetailProduct(product)
                    }
                    onSelectApplication={() =>
                      navigate('/applications')
                    }
                  />
                }
              />

            </Routes>
          </main>

          <Footer />

          <FloatingElements />
        </div>
      )}

      {/* ========================================================
          MODALS
      ======================================================== */}

      <QuickEnquiryModal
        isOpen={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        selectedProduct={selectedEnquiryProduct}
      />

      <ProductDetailModal
        product={detailProduct}
        onClose={() => setDetailProduct(null)}
        onOpenEnquiry={
          handleOpenEnquiryWithProduct
        }
      />

      <BookScannerModal
        isOpen={bookScannerOpen}
        onClose={() => setBookScannerOpen(false)}
      />

      <VideoModal
        isOpen={videoOpen}
        onClose={() => setVideoOpen(false)}
      />

      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectProduct={(product) =>
          setDetailProduct(product)
        }
        initialQuery={searchInitialQuery}
      />
    </div>
  );
}

// ============================================================
// APP ROOT
// ============================================================

export default function App() {
  return (
    <BrowserRouter>
      <MainAppContent />
    </BrowserRouter>
  );
}