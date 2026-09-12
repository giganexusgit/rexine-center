import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { SITE_URL } from '../config';
import {
  QrCode,
  BookOpen,
  Search,
  MessageCircle,
  Share2,
  ChevronRight,
  FileText,
  CheckSquare,
  Square,
  Layers,
  Clock,
  Sparkles,
  PhoneCall,
  CheckCircle2,
} from 'lucide-react';
import { getBookBySlug, MOCK_BOOKS, BookProduct, Book } from '../data/mockBooks';
import { Product } from '../types';
import BookQRCodeModal from '../components/BookQRCodeModal';
import PDFViewerModal from '../components/PDFViewerModal';

interface BookDetailPageProps {
  onSelectProduct?: (product: Product) => void;
  onOpenEnquiry?: (product?: Product | null) => void;
}

export const BookDetailPage: React.FC<BookDetailPageProps> = ({
  onOpenEnquiry,
}) => {
  const { slug, bookId } = useParams<{ slug?: string; bookId?: string }>();
  const navigate = useNavigate();

  const activeQuery = slug || bookId || 'ddecor-luxury-velvet';
  const book = getBookBySlug(activeQuery) || MOCK_BOOKS[0];
  const isComingSoon = book.status === 'coming-soon' || !book.products || book.products.length === 0;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSwatches, setSelectedSwatches] = useState<BookProduct[]>([]);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [showPDFModal, setShowPDFModal] = useState(false);

  const wholesalePrice = book.salePrice || 1500;

  const rrpPrice =
    book.products?.length > 0
      ? Math.round(
          book.products.reduce(
            (acc, product) => acc + (product.rrp || 0),
            0
          ) / book.products.length
        )
      : Math.round(wholesalePrice * 1.25);
  const savingAmount = Math.max(0, rrpPrice - wholesalePrice);

  // Filter swatches inside book
  const filteredProducts = (book.products || []).filter((p) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.code.toLowerCase().includes(q) ||
      p.name.toLowerCase().includes(q) ||
      (p.shadeName && p.shadeName.toLowerCase().includes(q)) ||
      p.description.toLowerCase().includes(q)
    );
  });

  const toggleSwatchSelection = (product: BookProduct) => {
    if (selectedSwatches.some((s) => s.code === product.code)) {
      setSelectedSwatches(selectedSwatches.filter((s) => s.code !== product.code));
    } else {
      setSelectedSwatches([...selectedSwatches, product]);
    }
  };

  const handleSendBulkWhatsAppInquiry = () => {
    if (selectedSwatches.length === 0) return;
    const swatchListText = selectedSwatches
      .map((s, idx) => `${idx + 1}. Code: *${s.code}* - ${s.shadeName || s.name} (RRP: ₹${s.rrp}/m)`)
      .join('\n');

    const text = encodeURIComponent(
      `Hello Rexine Centre,\nI scanned Physical Sample Book: *${book.title}* (${book.code})\n\nI selected ${selectedSwatches.length} design swatches for enquiry:\n${swatchListText}\n\nPlease share wholesale roll pricing, stock availability, and dispatch timeline.`
    );

    window.open(`https://wa.me/918104019890?text=${text}`, '_blank');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Available books for recommendation
  const availableBooks = MOCK_BOOKS.filter(
    (b) => b.status !== 'coming-soon' && b.products && b.products.length > 0 && b.slug !== book.slug
  ).slice(0, 6);

  return (
    <div className="bg-[#F8F6F2] min-h-screen pt-6 pb-28">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-button uppercase tracking-wider text-gray-500 mb-6 flex-wrap">
          <Link to="/" className="hover:text-[#C67C4E] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <Link to="/books" className="hover:text-[#C67C4E] transition-colors">Physical Sample Books</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-[#C67C4E] font-bold">
            {book.title} {isComingSoon ? '(Coming Soon)' : ''}
          </span>
        </div>

        {/* 1. PHYSICAL BOOK DEEP LINK NOTIFICATION BANNER */}
        <div className="bg-[#111111] text-white p-4 sm:p-5 rounded-2xl mb-8 flex flex-col md:flex-row items-center justify-between gap-4 border border-white/10 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#C67C4E] flex items-center justify-center shrink-0 text-white animate-pulse">
              <QrCode className="w-5 h-5" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 min-w-0 flex-wrap">
                <span className="shrink-0 text-[10px] font-button font-bold text-[#C67C4E] uppercase tracking-widest bg-[#C67C4E]/20 px-2.5 py-0.5 rounded border border-[#C67C4E]/40">
                  Physical Book QR Verified
                </span>
                <span className="text-xs font-sans text-gray-300">
                  Book Code: <strong className="text-white">{book.code}</strong>
                </span>
                {isComingSoon && (
                  <span className="text-[10px] font-button font-bold text-amber-300 uppercase tracking-wider bg-amber-400/20 px-2 py-0.5 rounded border border-amber-400/30">
                    New Collection
                  </span>
                )}
              </div>

              <h4 className="font-serif text-sm sm:text-base font-bold text-white mt-0.5">
                Deep Link Target:{' '}
                <span className="text-amber-200 break-all">
                  {SITE_URL.replace('https://', '')}/book/{book.slug}/catalogue.pdf
                </span>
              </h4>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 flex-wrap">
            <button
              onClick={() => setShowQRModal(true)}
              className="bg-[#C67C4E] hover:bg-[#b06a3d] text-white px-4 py-2 rounded-xl text-xs font-button font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
            >
              <QrCode className="w-3.5 h-3.5 text-amber-200" />
              <span>Show Book QR Code</span>
            </button>

            <button
              onClick={handleCopyLink}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-3.5 py-2 rounded-xl text-xs font-button font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copiedLink ? 'Link Copied!' : 'Share Book'}</span>
            </button>
          </div>
        </div>

        {/* 2. COMING SOON VIEW OR STANDARD HERO VIEW */}
        {isComingSoon ? (
          <div className="space-y-12">
            {/* Coming Soon Hero Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-xl relative overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Cover Image Column */}
                <div className="lg:col-span-4 relative group cursor-pointer" onClick={() => setShowQRModal(true)}>
                  <div className="relative aspect-[3/4] sm:aspect-[4/5] rounded-2xl overflow-hidden bg-gray-900 border border-gray-200 shadow-xl w-full">
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      onError={(e) => {
                        if (book.fallbackCover) e.currentTarget.src = book.fallbackCover;
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />

                    <div className="absolute top-4 right-4 bg-amber-500 text-black text-[10px] font-button font-black uppercase px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 tracking-wider animate-pulse">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Coming Soon</span>
                    </div>

                    <div className="absolute bottom-5 left-5 right-5 text-white space-y-2">
                      <span className="text-[10px] font-button font-bold text-amber-300 uppercase tracking-widest bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-amber-300/30">
                        {book.category}
                      </span>
                      <h3 className="font-serif text-2xl font-bold">{book.title}</h3>
                      <p className="text-xs text-amber-200 font-button uppercase tracking-wider font-semibold">
                        Physical Binder Code: {book.code}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Information Column */}
                <div className="lg:col-span-8 space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="text-xs font-button font-bold text-[#C67C4E] uppercase tracking-widest bg-[#C67C4E]/10 px-3 py-1 rounded-full border border-[#C67C4E]/20">
                        {book.category}
                      </span>
                      <span className="text-xs font-button font-bold text-gray-700 uppercase tracking-wider bg-gray-100 px-3 py-1 rounded-full">
                        Book Code: {book.code}
                      </span>
                      <span className="text-xs font-button font-bold text-amber-700 uppercase tracking-wider bg-amber-100 px-3 py-1 rounded-full border border-amber-200">
                        ✨ Launching Soon
                      </span>
                    </div>

                    <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#111111] leading-tight">
                      {book.title}
                    </h1>
                  </div>

                  {/* Coming Soon Notice Card */}
                  <div className="bg-[#111111] p-6 sm:p-7 rounded-2xl border border-white/10 shadow-lg text-white space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-amber-300 shrink-0">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-button font-bold uppercase tracking-widest text-amber-300 block">
                          Catalogue Status
                        </span>
                        <h3 className="font-serif text-lg sm:text-xl font-bold text-white">
                          Digital Swatches & Catalogue Coming Soon
                        </h3>
                      </div>
                    </div>

                    <p className="font-sans text-sm sm:text-base text-gray-300 leading-relaxed">
                      {book.message ||
                        `Detailed information, specifications, colours and swatches for the ${book.title} collection will be available soon.`}
                    </p>

                    <div className="pt-2 border-t border-white/10 text-xs text-gray-400 space-y-1">
                      <p className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>Genuine Rexine Centre physical sample binder verified.</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>High-definition swatch scans and shade matching are currently being updated.</span>
                      </p>
                    </div>
                  </div>

                  {/* Prominent Action Buttons */}
                  <div className="flex items-center gap-3.5 flex-wrap pt-2">
                    <a
                      href={`https://wa.me/918104019890?text=${encodeURIComponent(
                        `Hello Rexine Centre,\nI scanned Physical Sample Book: *${book.title}* (${book.code}).\n\nPlease share early wholesale pricing, swatch details, and stock availability.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#25D366] hover:bg-[#1ebd59] text-white px-7 py-3.5 rounded-full font-button text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-md cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4 fill-current" />
                      <span>Enquire on WhatsApp</span>
                    </a>

                    <button
                      onClick={() => onOpenEnquiry && onOpenEnquiry(null)}
                      className="bg-[#C67C4E] hover:bg-[#b06a3d] text-white px-7 py-3.5 rounded-full font-button text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-md cursor-pointer"
                    >
                      <span>Request Wholesale Sample / Quote</span>
                    </button>

                    <button
                      onClick={() => setShowQRModal(true)}
                      className="bg-[#111111] hover:bg-black text-white px-6 py-3.5 rounded-full font-button text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-md cursor-pointer"
                    >
                      <QrCode className="w-4 h-4 text-amber-300" />
                      <span>Show QR Code</span>
                    </button>
                  </div>

                </div>

              </div>
            </div>

            {/* Other Available Sample Books Section */}
            {availableBooks.length > 0 && (
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-button font-bold text-[#C67C4E] uppercase tracking-widest block mb-1">
                      Ready Collections
                    </span>
                    <h2 className="font-serif text-xl sm:text-2xl font-bold text-gray-900">
                      Explore Currently Available Sample Books
                    </h2>
                    <p className="font-sans text-xs text-gray-500 mt-1">
                      Browse complete swatches, specifications, and wholesale pricing for ready-to-order collections.
                    </p>
                  </div>

                  <Link
                    to="/books"
                    className="bg-[#111111] hover:bg-[#C67C4E] text-white px-5 py-2.5 rounded-full font-button text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-sm shrink-0"
                  >
                    <span>View All Sample Books</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {availableBooks.map((b) => (
                    <div
                      key={b.slug}
                      onClick={() => navigate(`/books/${b.slug}`)}
                      className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                    >
                      <div className="relative aspect-[4/3] w-full bg-gray-900 overflow-hidden">
                        <img
                          src={b.coverImage}
                          alt={b.title}
                          onError={(e) => {
                            if (b.fallbackCover) e.currentTarget.src = b.fallbackCover;
                          }}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute top-3 left-3 bg-[#111111]/90 text-amber-300 text-[10px] font-button font-bold uppercase px-2.5 py-1 rounded-md border border-amber-300/30">
                          {b.code}
                        </div>
                        <div className="absolute top-3 right-3 bg-[#C67C4E] text-white text-[10px] font-button font-bold uppercase px-2.5 py-1 rounded-full">
                          {b.products?.length || b.designCount} Swatches
                        </div>
                        <div className="absolute bottom-3 left-3 right-3 text-white">
                          <h4 className="font-serif text-base font-bold truncate">{b.title}</h4>
                          <p className="text-[11px] text-gray-300">{b.category}</p>
                        </div>
                      </div>

                      <div className="p-4 flex items-center justify-between border-t border-gray-100">
                        <span className="text-xs font-bold text-gray-700">₹{b.salePrice || 1500}/m</span>
                        <span className="text-[11px] font-button font-bold text-[#C67C4E] uppercase tracking-wider flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          <span>Browse Swatches</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            {/* 2. STANDARD BOOK COVER & DETAILS HERO SECTION */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-md mb-12 relative overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Cover Image Column */}
                <div className="lg:col-span-4 relative group cursor-pointer" onClick={() => setShowQRModal(true)}>
                  <div className="relative aspect-[3/4] sm:aspect-[4/5] rounded-2xl overflow-hidden bg-gray-900 border border-gray-200 shadow-xl w-full">
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      onError={(e) => {
                        if (book.fallbackCover) e.currentTarget.src = book.fallbackCover;
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                    <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                      <span className="text-[10px] font-button font-bold text-amber-300 uppercase tracking-widest bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-amber-300/30">
                        {book.category}
                      </span>
                      <h3 className="font-serif text-xl font-bold">{book.title}</h3>
                      <p className="text-xs text-gray-300">{book.year}</p>
                    </div>

                    <div className="absolute top-4 right-4 bg-[#C67C4E] text-white text-[10px] font-button font-bold uppercase px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>{book.designCount} Swatches</span>
                    </div>
                  </div>
                </div>

                {/* Information Column */}
                <div className="lg:col-span-8 space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-xs font-button font-bold text-[#C67C4E] uppercase tracking-widest bg-[#C67C4E]/10 px-3 py-1 rounded-full border border-[#C67C4E]/20">
                        Category: {book.category}
                      </span>
                      <span className="text-xs font-button font-bold text-gray-500 uppercase tracking-wider">
                        Code: {book.code}
                      </span>
                    </div>

                    <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#111111] leading-tight">
                      {book.title}
                    </h1>

                    <p className="font-sans text-sm sm:text-base text-gray-600 leading-relaxed pt-1">
                      {book.description}
                    </p>
                  </div>

                  {/* Wholesale Price + Description Container */}
                  <div className="bg-[#111111] p-5 rounded-2xl border border-[#111111] shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      
                      {/* Price */}
                      <div>
                        <span className="text-[10px] font-button font-bold uppercase tracking-wider text-gray-400 block mb-1">
                          Wholesale Price
                        </span>
                        <div className="flex items-baseline gap-1.5">
                          <span className="font-serif text-3xl sm:text-4xl font-bold text-white leading-none">
                            ₹{wholesalePrice}
                          </span>
                          <span className="text-xs text-gray-400 font-sans">
                            / meter
                          </span>
                        </div>
                      </div>

                      {/* RRP + Savings */}
                      <div className="flex items-center gap-3 sm:text-right pt-2 sm:pt-0 border-t sm:border-t-0 border-white/10">
                        <div>
                          <span className="text-xs text-gray-400 font-sans block">
                            AVG. RRP ₹{rrpPrice} /meter
                          </span>
                          <span className="text-sm font-bold text-emerald-400">
                            Save ₹{savingAmount}
                          </span>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Physical Book Specifications */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-[#F8F6F2] p-4 rounded-2xl border border-gray-200">
                    <div className="min-w-0">
                      <span className="text-[9px] font-button font-bold text-gray-400 uppercase tracking-wider block mb-1">
                        Thickness
                      </span>
                      <span className="text-xs font-bold text-gray-900">
                        {book.specs?.thickness || '1.2 mm'}
                      </span>
                    </div>

                    <div className="min-w-0">
                      <span className="text-[9px] font-button font-bold text-gray-400 uppercase tracking-wider block mb-1">
                        Roll Width
                      </span>
                      <span className="text-xs font-bold text-gray-900 leading-relaxed">
                        {book.specs?.width || '140 CMS (54 Inches)'}
                      </span>
                    </div>

                    <div className="col-span-2 min-w-0">
                      <span className="text-[9px] font-button font-bold text-gray-400 uppercase tracking-wider block mb-1">
                        Backing Type
                      </span>
                      <span className="text-xs font-bold text-gray-900 leading-relaxed">
                        {book.specs?.backing || '100% Polyester Backing'}
                      </span>
                    </div>
                  </div>

                  {/* Prominent Action Buttons */}
                  <div className="flex items-center gap-4 flex-wrap pt-2">
                    <button
                      onClick={() => setShowQRModal(true)}
                      className="bg-[#111111] hover:bg-[#C67C4E] text-white px-7 py-3.5 rounded-full font-button text-xs font-bold uppercase tracking-wider flex items-center gap-2.5 transition-all shadow-md group cursor-pointer"
                    >
                      <QrCode className="w-4 h-4 text-amber-300 group-hover:scale-110 transition-transform" />
                      <span>SHOW BOOK QR CODE</span>
                    </button>

                    <button
                      onClick={() => setShowPDFModal(true)}
                      className="bg-[#C67C4E] hover:bg-[#b06a3d] text-white px-7 py-3.5 rounded-full font-button text-xs font-bold uppercase tracking-wider flex items-center gap-2.5 transition-all shadow-md cursor-pointer"
                    >
                      <FileText className="w-4 h-4 text-amber-200" />
                      <span>VIEW CATALOGUE PDF</span>
                    </button>

                    <button
                      onClick={() => onOpenEnquiry && onOpenEnquiry(null)}
                      className="bg-white hover:bg-gray-100 text-[#111111] border border-gray-300 px-6 py-3.5 rounded-full font-button text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-xs cursor-pointer"
                    >
                      <span>Request Physical Sample Book</span>
                    </button>
                  </div>

                </div>

              </div>
            </div>

            {/* 3. PRODUCT SWATCHES GRID & SEARCH */}
            <div className="space-y-6">
              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Layers className="w-5 h-5 text-[#C67C4E]" />
                  <h2 className="font-serif text-xl font-bold text-gray-900">
                    Book Swatches ({filteredProducts.length} / {book.designCount})
                  </h2>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                  <div className="relative w-full md:w-80">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search design code or shade e.g. DD-101..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-sans focus:outline-none focus:ring-2 focus:ring-[#C67C4E]"
                    />
                  </div>

                  {selectedSwatches.length > 0 && (
                    <button
                      onClick={handleSendBulkWhatsAppInquiry}
                      className="bg-[#25D366] hover:bg-[#1ebd59] text-white px-4 py-2 rounded-xl font-button text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shrink-0 shadow-sm"
                    >
                      <MessageCircle className="w-4 h-4 fill-current" />
                      <span>Enquire {selectedSwatches.length} Swatches</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Swatches Grid */}
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filteredProducts.map((product) => {
                    const isSelected = selectedSwatches.some((s) => s.code === product.code);

                    return (
                      <div
                        key={product.code}
                        className={`bg-white rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-xl ${
                          isSelected ? 'border-[#C67C4E] ring-2 ring-[#C67C4E]/20' : 'border-gray-200'
                        }`}
                      >
                        <div>
                          {/* Swatch Image */}
                          <div
                            className="relative aspect-[4/3] w-full bg-gray-100 overflow-hidden cursor-pointer"
                            onClick={() => navigate(`/books/${book.slug}/${product.code}`)}
                          >
                            <img
                              src={product.image}
                              alt={product.name}
                              onError={(e) => {
                                if (product.fallbackImage) e.currentTarget.src = product.fallbackImage;
                              }}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />

                            {/* Code Badge */}
                            <div className="absolute top-3 left-3 bg-[#111111]/90 text-amber-300 text-[10px] font-button font-bold uppercase px-2.5 py-1 rounded-md border border-amber-300/30">
                              {product.code}
                            </div>

                            {/* Selection Checkbox */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleSwatchSelection(product);
                              }}
                              className="absolute top-3 right-3 text-white bg-black/60 backdrop-blur-md p-1.5 rounded-lg hover:scale-110 transition-transform cursor-pointer"
                              title="Select Swatch for Bulk Enquiry"
                            >
                              {isSelected ? (
                                <CheckSquare className="w-4 h-4 text-[#25D366]" />
                              ) : (
                                <Square className="w-4 h-4 text-white/80" />
                              )}
                            </button>
                          </div>

                          {/* Content & Specifications */}
                          <div className="p-4 space-y-2">
                            <span className="text-[11px] font-button uppercase text-gray-700 block font-semibold">
                              {product.shadeName || product.name}
                            </span>

                            <p className="text-[11px] text-gray-600 font-sans line-clamp-2">
                              {product.description}
                            </p>
                          </div>
                        </div>

                        {/* Footer Links */}
                        <div className="p-4 pt-0 border-t border-gray-100 mt-2 flex items-center gap-2">
                          <button
                            onClick={() => navigate(`/books/${book.slug}/${product.code}`)}
                            className="flex-1 bg-gray-100 hover:bg-[#111111] text-gray-800 hover:text-white py-2 rounded-xl font-button text-[11px] font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1 cursor-pointer"
                          >
                            <span>View Specs</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>

                          <a
                            href={`https://wa.me/918104019890?text=${encodeURIComponent(`Hello Rexine Centre,\nI scanned Physical Sample Book: *${book.title}* (${book.code})\n\nInquiring about Design Swatch: *${product.code}* (${product.shadeName || product.name})\nRetail RRP: ₹${product.rrp}/${product.unit}\n\nPlease share wholesale roll price and availability.`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#25D366] hover:bg-[#1ebd59] text-white p-2 rounded-xl transition-all shadow-xs"
                            title="Enquire on WhatsApp"
                          >
                            <MessageCircle className="w-4 h-4 fill-current" />
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="bg-white rounded-2xl p-10 text-center border border-gray-200">
                  <p className="font-sans text-xs text-gray-500">
                    No swatches matching "{searchQuery}" inside {book.title}.
                  </p>
                </div>
              )}
            </div>
          </>
        )}

        {/* QR Code Modal */}
        <BookQRCodeModal
          isOpen={showQRModal}
          onClose={() => setShowQRModal(false)}
          book={book}
        />

        {/* PDF Catalogue Viewer Modal */}
        <PDFViewerModal
          isOpen={showPDFModal}
          onClose={() => setShowPDFModal(false)}
          title={book.title}
          pdfUrl={book.pdfPath}
          code={book.code}
          pageCount={book.designCount ? book.designCount + 4 : 39}
        />

      </div>
    </div>
  );
};

export default BookDetailPage;
