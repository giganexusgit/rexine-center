import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, QrCode, ArrowRight, Layers, ChevronLeft, ChevronRight } from 'lucide-react';
import { MOCK_BOOKS, Book } from '../data/mockBooks';
import  BookQRCodeModal from './BookQRCodeModal';

export const BrowseBooksSection: React.FC = () => {
  const navigate = useNavigate();
  const [activeQRBook, setActiveQRBook] = useState<Book | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [slidesPerView, setSlidesPerView] = useState(3);

  const totalBooks = MOCK_BOOKS.length;

  // Handle responsive slides per view
  useEffect(() => {
    const updateSlidesPerView = () => {
      if (window.innerWidth < 768) {
        setSlidesPerView(1);
      } else if (window.innerWidth < 1024) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(3);
      }
    };

    updateSlidesPerView();
    window.addEventListener('resize', updateSlidesPerView);
    return () => window.removeEventListener('resize', updateSlidesPerView);
  }, []);

  const maxIndex = Math.max(0, totalBooks - slidesPerView);

  // Ensure currentIndex doesn't exceed maxIndex when screen resizes
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [slidesPerView, maxIndex, currentIndex]);

  // Auto-slide effect
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex >= maxIndex ? 0 : prevIndex + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused, maxIndex]);

  // Handlers for manual navigation
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? maxIndex : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex >= maxIndex ? 0 : prevIndex + 1));
  };

  return (
    <section 
      id="browse-books" 
      className="bg-[#111111] text-white py-20 border-b border-white/10 overflow-hidden"
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header (Hovering here will NOT pause the carousel) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-[#C67C4E]/20 text-[#C67C4E] px-3.5 py-1.5 rounded-full text-xs font-button font-bold uppercase tracking-widest border border-[#C67C4E]/30">
              <QrCode className="w-3.5 h-3.5" />
              <span>Physical Sample Books Directory</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
              Browse Master Swatch Books
            </h2>

            <p className="font-sans text-sm sm:text-base text-gray-300 leading-relaxed">
              Scan or browse our physical sample binders distributed across India. Every book features an instant QR code that opens all 28+ swatches, specs, and wholesale roll rates upon scanning.
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            {/* Carousel Navigation Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="w-11 h-11 rounded-full bg-white/5 hover:bg-[#C67C4E] border border-white/10 flex items-center justify-center text-white transition-all cursor-pointer shadow-md"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="w-11 h-11 rounded-full bg-white/5 hover:bg-[#C67C4E] border border-white/10 flex items-center justify-center text-white transition-all cursor-pointer shadow-md"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <button
              onClick={() => navigate('/books')}
              className="inline-flex items-center gap-2 bg-[#C67C4E] hover:bg-[#b06a3d] text-white px-6 py-3.5 rounded-full font-button text-xs font-bold uppercase tracking-wider transition-colors shadow-lg cursor-pointer"
            >
              <span>VIEW ALL BOOKS INDEX ({totalBooks})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Sliding Carousel Track Container (Hovering HERE pauses the scroll) */}
        <div 
          className="relative overflow-hidden w-full"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div 
            className="flex -mx-3"
            style={{ 
              transform: `translateX(-${currentIndex * (100 / slidesPerView)}%)`,
              transition: 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)'
            }}
          >
            {MOCK_BOOKS.map((book) => (
              <div
                key={book.slug}
                className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-3"
              >
                <div className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#C67C4E] rounded-3xl overflow-hidden transition-all duration-300 flex flex-col justify-between group shadow-xl h-full">
                  <div>
                    {/* Book Cover Image */}
                    <div
                      className="relative h-64 bg-gray-900 overflow-hidden cursor-pointer"
                      onClick={() => navigate(`/books/${book.slug}`)}
                    >
                      <img
                        src={book.coverImage}
                        alt={book.title}
                        onError={(e) => {
                          if (book.fallbackCover) {
                            e.currentTarget.src = book.fallbackCover;
                          }
                        }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                      {/* QR / Code Badge */}
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveQRBook(book);
                        }}
                        className="absolute top-4 left-4 bg-black/80 backdrop-blur-md text-amber-300 border border-amber-300/30 text-[10px] font-button font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-lg hover:bg-[#C67C4E] hover:text-white transition-colors"
                        title="Scan Book QR Code"
                      >
                        <QrCode className="w-3.5 h-3.5 text-[#C67C4E] group-hover:text-white" />
                        <span>{book.code} (Scan QR)</span>
                      </div>

                      <div className="absolute top-4 right-4 bg-[#C67C4E] text-white text-[10px] font-button font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                        <Layers className="w-3.5 h-3.5" />
                        <span>{book.designCount} Swatches</span>
                      </div>

                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <span className="text-[10px] font-button font-bold text-amber-300 uppercase tracking-widest block mb-0.5">
                          {book.category}
                        </span>
                        <h3 className="font-serif text-xl font-bold leading-snug line-clamp-1 group-hover:text-[#C67C4E] transition-colors">
                          {book.title}
                        </h3>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 pb-3 space-y-4">
                      <p className="font-sans text-xs text-gray-300 leading-relaxed line-clamp-2">
                        {book.description}
                      </p>

                      {/* Specs Pill List */}
                      <div className="grid grid-cols-2 gap-2 bg-black/40 p-3 rounded-2xl border border-white/10 text-xs">
                        <div>
                          <span className="text-[9px] font-button font-bold text-gray-400 uppercase tracking-wider block">
                            Thickness
                          </span>
                          <span className="font-bold text-white">{book.specs?.thickness || '1.2 mm'}</span>
                        </div>
                        <div>
                          <span className="text-[9px] font-button font-bold text-gray-400 uppercase tracking-wider block">
                            Width
                          </span>
                          <span className="font-bold text-white">{book.specs?.width || '54 inches'}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="p-6 border-t border-white/10 mt-4 flex items-center gap-3">
                    <button
                      onClick={() => navigate(`/books/${book.slug}`)}
                      className="flex-1 bg-white hover:bg-[#C67C4E] text-[#111111] hover:text-white py-3 rounded-xl font-button text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>View Swatches ({book.designCount})</span>
                    </button>

                    <button
                      onClick={() => setActiveQRBook(book)}
                      className="bg-white/10 hover:bg-[#C67C4E] text-white p-3 rounded-xl border border-white/20 transition-all shadow-md flex items-center justify-center gap-1.5 font-button text-xs font-bold uppercase cursor-pointer"
                      title="Scan Book QR Code to Open Swatches"
                    >
                      <QrCode className="w-4 h-4 text-amber-300" />
                      <span className="hidden sm:inline">QR Code</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* QR Code Modal */}
        <BookQRCodeModal
          isOpen={!!activeQRBook}
          onClose={() => setActiveQRBook(null)}
          book={activeQRBook}
        />

      </div>
    </section>
  );
};