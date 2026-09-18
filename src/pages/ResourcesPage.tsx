import React, { useState } from 'react';
import { BLOG_POSTS, FAQS } from '../data/mockData';
import { MOCK_BOOKS } from '../data/mockBooks';
import { BookOpen, FileText, Download, Play, HelpCircle, ChevronDown, ArrowRight, ShieldCheck, Sparkles, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '../types';
import { SITE_URL } from '../config';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { SEO_DATA } from '../data/seoData';

interface ResourcesPageProps {
  onOpenEnquiry: (product?: Product | null) => void;
  onOpenBookScanner: () => void;
  onOpenVideoModal: () => void;
}

export const ResourcesPage: React.FC<ResourcesPageProps> = ({
  onOpenEnquiry,
  onOpenBookScanner,
  onOpenVideoModal,
}) => {
  const [openFaq, setOpenFaq] = useState<string | null>('faq1');

  const handleDownloadPDF = (book: typeof MOCK_BOOKS[0]) => {
    const pdfTarget = `${SITE_URL.replace(/\/$/, '')}/book/${book.slug}/catalogue.pdf`;
    window.open(pdfTarget, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
    <SEO
  title={SEO_DATA.resources.title}
  description={SEO_DATA.resources.description}
  keywords={SEO_DATA.resources.keywords}
/>
    <div className="bg-[#F8F6F2] min-h-screen pt-8 pb-20">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <span className="font-button text-xs font-bold uppercase tracking-[0.2em] text-[#C67C4E] block mb-2">
            Guides, Catalogs & Technical Specs
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#111111] mb-4">
            Resources & Swatch Library
          </h1>
          <p className="font-sans text-sm sm:text-base text-gray-600 leading-relaxed">
            Everything you need to select, specify, clean, and maintain synthetic leather materials. Download official swatch book digital catalogs and explore technical articles.
          </p>
        </div>

        {/* Digital Catalog Download Cards */}
      <div className="mb-16">
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
    <h2 className="font-serif text-2xl font-bold text-[#111111]">
      Digital Swatch Books & Catalogs
    </h2>
    
    <div className="flex items-center justify-between sm:justify-end gap-4">
      {/* Slider Navigation Buttons */}
      <div className="hidden sm:flex items-center gap-2">
        <button
          onClick={() => {
            const container = document.getElementById('digital-books-slider');
            if (container) {
              container.scrollBy({ left: -container.clientWidth / 3, behavior: 'smooth' });
            }
          }}
          className="w-9 h-9 rounded-full border border-gray-200 flex items-center bg-gray-50 justify-center hover:bg-[#C67C4E] hover:text-white transition-colors cursor-pointer text-gray-800 shrink-0"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={() => {
            const container = document.getElementById('digital-books-slider');
            if (container) {
              container.scrollBy({ left: container.clientWidth / 3, behavior: 'smooth' });
            }
          }}
          className="w-9 h-9 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center hover:bg-[#C67C4E] hover:text-white transition-colors cursor-pointer text-gray-800 shrink-0"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <button
        onClick={onOpenBookScanner}
        className="text-xs font-button font-bold text-[#C67C4E] hover:underline inline-flex items-center gap-1.5 uppercase tracking-wider cursor-pointer whitespace-nowrap"
      >
        <span>Scan Physical Swatch Book QR</span>
        <ArrowRight className="w-4 h-4 shrink-0" />
      </button>
    </div>
  </div>

  {/* Slider Container - Displays 1 full card on mobile, 2 on sm, 3 on lg */}
  <div 
    id="digital-books-slider"
    className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-none snap-x snap-mandatory scroll-smooth pb-4"
    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
  >
    {MOCK_BOOKS.map((book) => (
      <div
        key={book.slug}
        className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg transition-all group flex flex-col justify-between shrink-0 snap-start w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
      >
        <div>
          <div className="relative h-48 sm:h-58 bg-gray-100 overflow-hidden">
            <img
              src={book.coverImage}
              alt={book.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <span className="absolute top-3 left-3 bg-[#111111]/80 backdrop-blur-md text-white text-[10px] font-button font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
              {book.code}
            </span>
          </div>
          <div className="p-5">
            <span className="text-[10px] font-button font-bold text-[#C67C4E] uppercase tracking-wider block mb-1">
              {book.category} • {book.designCount} Swatches
            </span>
            <h3 className="font-serif font-bold text-base text-gray-900 mb-2">
              {book.title}
            </h3>
          </div>
        </div>

        <div className="p-5 pt-0">
          <button
            onClick={() => handleDownloadPDF(book)}
            className="w-full bg-gray-50 hover:bg-[#111111] hover:text-white text-gray-800 py-2.5 rounded-lg font-button text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 border border-gray-200 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download PDF Book</span>
          </button>
        </div>
      </div>
    ))}
  </div>
</div>
        {/* Blog & Care Guides Section */}
        <div className="mb-16">
          <h2 className="font-serif text-2xl font-bold text-[#111111] mb-6">
            Technical Articles & Maintenance Guides
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BLOG_POSTS.map((post) => (
              <Link
                key={post.id}
                to={`/resources/${post.slug}`}
                className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 bg-gray-100 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-[#111111]/80 backdrop-blur-md text-white text-[10px] font-button font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
                      {post.date}
                    </span>
                  </div>
                  <div className="p-5">
                    <span className="text-[10px] font-button font-bold text-[#C67C4E] uppercase tracking-wider block mb-1">
                      Technical Guide
                    </span>
                    <h3 className="font-serif font-bold text-base text-gray-900 group-hover:text-[#C67C4E] transition-colors mb-2">
                      {post.title}
                    </h3>
                    <p className="font-sans text-xs text-gray-600 line-clamp-2 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <div className="w-full bg-gray-50 group-hover:bg-[#111111] group-hover:text-white text-gray-800 py-2.5 rounded-lg font-button text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 border border-gray-200">
                    <span>Read Guide</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Video Tutorial Card Banner */}
        {/* <div className="bg-[#111111] text-white rounded-3xl p-8 sm:p-12 mb-16 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-4 max-w-xl">
            <span className="font-button text-xs font-bold uppercase tracking-[0.2em] text-[#C67C4E]">
              Video Workshop
            </span>
            <h2 className="font-serif text-3xl font-bold">
              Watch: How Rexine is Manufactured & Quality Tested
            </h2>
            <p className="font-sans text-sm text-gray-300 leading-relaxed">
              Take a virtual tour of our state-of-the-art coating line, embossing pressure rollers, tensile tear strength testing, and quality control lab.
            </p>
          </div>
          <button
            onClick={onOpenVideoModal}
            className="w-16 h-16 rounded-full bg-[#C67C4E] hover:bg-white hover:text-[#111111] text-white flex items-center justify-center transition-all shadow-xl shrink-0 group scale-105 hover:scale-110 cursor-pointer"
          >
            <Play className="w-6 h-6 fill-current ml-1" />
          </button>
        </div> */}

        {/* Technical FAQ Accordion */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-lg">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="font-button text-xs font-bold uppercase tracking-[0.2em] text-[#C67C4E] block mb-1">
              Got Questions?
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#111111]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4 max-w-3xl mx-auto">
            {FAQS.map((faq) => {
              const isOpen = openFaq === faq.id;
              return (
                <div
                  key={faq.id}
                  className="border border-gray-200 rounded-2xl overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                    className="w-full p-5 text-left bg-gray-50/50 hover:bg-gray-50 flex items-center justify-between gap-4 font-serif font-bold text-gray-900 transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-500 transition-transform ${
                        isOpen ? 'rotate-180 text-[#C67C4E]' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="p-5 pt-2 bg-white font-sans text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
    </>
  );
};