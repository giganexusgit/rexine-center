import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  QrCode,
  BookOpen,
  Search,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Layers,
  MessageCircle,
  Filter,
  CheckCircle2,
  Share2,
  Printer,
  ChevronLeft
} from 'lucide-react';
import { SAMPLE_BOOKS_DATA } from '../data/booksData';
import { SampleBook, Product } from '../types';

interface BooksPageProps {
  onOpenEnquiry: (product?: Product | null) => void;
}
export const BooksPage: React.FC<BooksPageProps> = ({ onOpenEnquiry }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const [selectedBrand, setSelectedBrand] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');

  // Deduplicate SAMPLE_BOOKS_DATA by 'id' to ensure no item ever renders twice
  const uniqueBooks = Array.from(
    new Map(SAMPLE_BOOKS_DATA.map((book) => [book.id, book])).values()
  );

  // Filter physical sample books using the deduplicated array
  const filteredBooks = uniqueBooks.filter((book) => {
    const matchesBrand =
      selectedBrand === 'all' ||
      book.code.toLowerCase() === selectedBrand.toLowerCase() ||
      book.collectionId?.toLowerCase() === selectedBrand.toLowerCase() ||
      book.collectionName?.toLowerCase().includes(selectedBrand.toLowerCase());

    const matchesSearch =
      !searchQuery ||
      book.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.description?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesBrand && matchesSearch;
  });

  // ... rest of your component remains the same, 
  // but ensure any other map loops use uniqueBooks if needed.
  return (
    <div className="bg-[#F8F6F2] min-h-screen pt-6 pb-28">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-button uppercase tracking-wider text-gray-500 mb-6">
          <Link to="/" className="hover:text-[#C67C4E] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <Link to="/collections" className="hover:text-[#C67C4E] transition-colors">Collections</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-[#C67C4E] font-bold">Physical Sample Books Index</span>
        </div>

        {/* PAGE HEADER */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-sm mb-10 relative overflow-hidden">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 bg-[#111111] text-white px-3.5 py-1.5 rounded-full text-xs font-button font-bold uppercase tracking-widest shadow-xs">
              <QrCode className="w-3.5 h-3.5 text-[#C67C4E]" />
              <span>Physical Sample Books with QR Code</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#111111] leading-tight">
              Physical Swatch Books Catalogue
            </h1>

            <p className="font-sans text-sm sm:text-base text-gray-600 leading-relaxed">
              Explore our master physical sample binders distributed across India. Every book carries 25–30 high-definition physical swatches with individual QR codes for instant digital specification and wholesale stock verification.
            </p>
          </div>
        </div>

        {/* 1. PHYSICAL SAMPLE BOOKS SHOWCASE BANNER */}
        <div className="bg-[#111111] text-white rounded-3xl p-6 sm:p-8 mb-10 border border-white/10 shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-[#C67C4E]/20 text-[#C67C4E] px-3 py-1 rounded-full text-[10px] font-button font-bold uppercase tracking-widest border border-[#C67C4E]/30 mb-2">
                <QrCode className="w-3.5 h-3.5" />
                <span>Physical Sample Books with QR Code</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                Scan Any Physical Book to View 25–30 Swatches
              </h3>
              <p className="font-sans text-xs text-gray-300 mt-1 max-w-2xl">
                Every physical sample book sent to dealers and architects carries a unique QR Code. Click any book below to simulate scanning and view all designs with RRP pricing.
              </p>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
              {/* Slider Navigation Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const container = document.getElementById('books-slider');
                    if (container) {
                      container.scrollBy({ left: -container.clientWidth * 0.75, behavior: 'smooth' });
                    }
                  }}
                  className="bg-white/5 hover:bg-[#C67C4E] border border-white/10 hover:border-[#C67C4E] text-white p-2.5 rounded-full transition-colors shadow-md"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    const container = document.getElementById('books-slider');
                    if (container) {
                      container.scrollBy({ left: container.clientWidth * 0.75, behavior: 'smooth' });
                    }
                  }}
                  className="bg-white/5 hover:bg-[#C67C4E] border border-white/10 hover:border-[#C67C4E] text-white p-2.5 rounded-full transition-colors shadow-md"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={() => onOpenEnquiry(null)}
                className="bg-[#C67C4E] hover:bg-[#b06a3d] text-white px-5 py-2.5 rounded-full font-button text-xs font-bold uppercase tracking-wider shrink-0 transition-colors shadow-md"
              >
                Request Physical Book
              </button>
            </div>
          </div>

          {/* Slider Container - 2 cards visible on mobile, 3 on sm, 5 on lg */}
          <div
            id="books-slider"
            className="flex gap-4 overflow-x-auto scrollbar-none snap-x snap-mandatory scroll-smooth pb-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {uniqueBooks.map((book) => (
              <div
                key={book.id}
                onClick={() => navigate(`/books/${book.id}`)}
                className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#C67C4E] rounded-2xl p-3 cursor-pointer transition-all text-center group flex flex-col justify-between shrink-0 snap-start w-[calc(50%-8px)] sm:w-[calc(33.333%-16px*2/3)] lg:w-[calc(20%-16px*4/5)]"
              >
                <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-900 mb-2 border border-white/10">
                  <img
                    src={book.coverImage}
                    alt={book.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-2 right-2 bg-[#C67C4E] text-white text-[9px] font-button font-bold uppercase px-1.5 py-0.5 rounded">
                    QR Code
                  </span>
                  <div className="absolute bottom-2 left-2 right-2 bg-black/70 backdrop-blur-sm text-[9px] font-button font-bold text-amber-300 uppercase px-1 py-0.5 rounded truncate">
                    {book.totalSwatches} Designs
                  </div>
                </div>

                <div className="space-y-1">
                  <h4 className="font-serif text-xs font-bold text-white group-hover:text-[#C67C4E] transition-colors line-clamp-1">
                    {book.name}
                  </h4>
                  <span className="text-[10px] font-button text-gray-400 block uppercase font-bold">
                    Code: {book.code}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>      {/* 2. BRAND & SEARCH FILTERS */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm mb-10 flex flex-col md:flex-row items-center gap-4 justify-between">
          {/* Brand Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            <button
              onClick={() => setSelectedBrand('all')}
              className={`px-4 py-2 rounded-xl text-xs font-button font-bold uppercase tracking-wider shrink-0 transition-all ${selectedBrand === 'all'
                  ? 'bg-[#111111] text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              All Sample Books ({SAMPLE_BOOKS_DATA.length})
            </button>

            {SAMPLE_BOOKS_DATA.map((brand) => (
              <button
                key={brand.slug}
                onClick={() => setSelectedBrand(brand.code)}
                className={`px-3 py-2 rounded-xl text-xs font-button font-bold uppercase tracking-wider shrink-0 transition-all ${selectedBrand === brand.code
                    ? 'bg-[#C67C4E] text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
              >
                {brand.code}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search e.g. Aura, Cinefab..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-sans focus:outline-none focus:ring-2 focus:ring-[#C67C4E]"
            />
          </div>
        </div>
        {/* 3. DETAILED PHYSICAL SAMPLE BOOKS GRID */}
        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {filteredBooks.map((book) => (
              <div
                key={book.id}
                className="bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Book Image */}
                  <div className="relative h-64 bg-gray-100 overflow-hidden cursor-pointer" onClick={() => navigate(`/books/${book.id}`)}>
                    <img
                      src={book.coverImage}
                      alt={book.name}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* QR Code Tag */}
                    <div className="absolute top-4 left-4 bg-[#111111]/90 backdrop-blur-md text-amber-300 border border-amber-300/30 text-[10px] font-button font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-lg">
                      <QrCode className="w-3.5 h-3.5 text-[#C67C4E]" />
                      <span>{book.code}</span>
                    </div>

                    <div className="absolute top-4 right-4 bg-[#C67C4E] text-white text-[10px] font-button font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>{book.totalSwatches} Swatches</span>
                    </div>

                    {/* Book Cover Overlay Content */}
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="text-[10px] font-button font-bold text-amber-300 uppercase tracking-widest block mb-0.5">
                        {book.collectionName} Collection
                      </span>
                      <h3 className="font-serif text-xl font-bold leading-snug line-clamp-1">
                        {book.name}
                      </h3>
                      <p className="text-xs text-gray-300 font-sans mt-0.5">{book.year}</p>
                    </div>
                  </div>

                  {/* Book Content Specs */}
                  <div className="p-6 space-y-4">
                    <p className="font-sans text-xs text-gray-600 leading-relaxed line-clamp-2">
                      {book.description}
                    </p>

                    {/* Technical Specs Table */}
                    <div className="grid grid-cols-2 gap-2 bg-[#F8F6F2] p-3 rounded-2xl border border-gray-200/80 text-xs">
                      <div>
                        <span className="text-[9px] font-button font-bold text-gray-400 uppercase tracking-wider block">
                          Thickness
                        </span>
                        <span className="font-bold text-gray-900">{book.specs?.thickness || '1.2 mm'}</span>
                      </div>
                      <div>
                        <span className="text-[9px] font-button font-bold text-gray-400 uppercase tracking-wider block">
                          Width
                        </span>
                        <span className="font-bold text-gray-900">{book.specs?.width || '54 inches'}</span>
                      </div>
                      <div>
                        <span className="text-[9px] font-button font-bold text-gray-400 uppercase tracking-wider block">
                          Backing
                        </span>
                        <span className="font-bold text-gray-900">{book.specs?.backing || 'Woven Mesh'}</span>
                      </div>
                      <div>
                        <span className="text-[9px] font-button font-bold text-gray-400 uppercase tracking-wider block">
                          Target Use
                        </span>
                        <span className="font-bold text-[#C67C4E]">{book.specs?.targetUse || 'Upholstery'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="p-6 pt-0 border-t border-gray-100 mt-auto pt-4 flex items-center gap-3">
                  <button
                    onClick={() => navigate(`/books/${book.id}`)}
                    className="flex-1 bg-[#111111] hover:bg-[#C67C4E] text-white py-3 rounded-xl font-button text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-sm"
                  >
                    <span>View Swatches ({book.totalSwatches})</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={`https://wa.me/918104019890?text=${encodeURIComponent(`Hello Rexine Centre,\nI would like to request physical sample book: *${book.name}* (${book.code}).\nPlease send wholesale dealer terms and dispatch timeline.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#25D366] hover:bg-[#1ebd59] text-white p-3 rounded-xl transition-all shadow-sm"
                    title="Inquire Book on WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-200 shadow-sm mb-16 max-w-md mx-auto space-y-4">
            <Search className="w-10 h-10 text-gray-300 mx-auto" />
            <h3 className="font-serif text-lg font-bold text-gray-900">No Sample Books Found</h3>
            <p className="font-sans text-xs text-gray-500">
              There are no physical sample books matching "{searchQuery}".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedBrand('all');
              }}
              className="bg-[#111111] text-white px-5 py-2 rounded-full font-button text-xs font-bold uppercase tracking-wider"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
