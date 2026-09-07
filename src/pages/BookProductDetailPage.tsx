import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ChevronRight,
  MessageCircle,
  QrCode,
  ShieldCheck,
  Share2,
  Send,
  ArrowLeft,
  BookOpen,
  Layers,
  Heart,
} from 'lucide-react';
import { getBookProduct, getRelatedProducts } from '../data/mockBooks';
import { Product } from '../types';
import  BookQRCodeModal  from '../components/BookQRCodeModal';

interface BookProductDetailPageProps {
  onOpenEnquiry: (product?: Product | null) => void;
  onSelectProduct?: (product: Product) => void;
  // isWishlisted: boolean;
  // onToggleWishlist: (productId: string) => void;
}

export const BookProductDetailPage: React.FC<BookProductDetailPageProps> = ({
  onOpenEnquiry,
  // isWishlisted,
  // onToggleWishlist,
}) => {
  const { slug, productCode } = useParams<{ slug: string; productCode: string }>();
  const navigate = useNavigate();

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);

  const result = getBookProduct(slug || '', productCode || '');

  if (!result) {
    return (
      <div className="bg-[#F8F6F2] min-h-[70vh] py-20 flex items-center justify-center">
        <div className="bg-white p-10 rounded-3xl border border-gray-200 shadow-md text-center max-w-md mx-auto space-y-4">
          <BookOpen className="w-12 h-12 text-[#C67C4E] mx-auto" />
          <h2 className="font-serif text-2xl font-bold text-gray-900">Product Not Found</h2>
          <p className="font-sans text-xs text-gray-600">
            The requested design swatches ({productCode}) could not be located in book catalogue '{slug}'.
          </p>
          <button
            onClick={() => navigate('/books')}
            className="bg-[#111111] hover:bg-[#C67C4E] text-white px-6 py-2.5 rounded-full font-button text-xs font-bold uppercase tracking-wider transition-colors"
          >
            Back to Books Index
          </button>
        </div>
      </div>
    );
  }

  const { book, product } = result;
  const relatedProducts = getRelatedProducts(book.slug, product.code, 4);

  const activeMainImage = selectedImage || product.image;

  // Convert BookProduct to standard Product type for QuickEnquiryModal & Wishlist
  const standardProduct: Product = {
    id: `${book.slug}-${product.code}`,
    code: product.code,
    name: product.name,
    shadeName: product.shadeName,
    category: product.category || book.category,
    bookTitle: book.title,
    bookId: book.slug,
    unit: product.unit,
    description: product.description,
    image: product.image,
    colors: product.colors || [{ name: product.shadeName || 'Default', hex: '#888888' }],
    specs: product.specs,
    inStock: true,
  };

  // WhatsApp prefilled link for this specific product
  const getWhatsAppProductUrl = () => {
    const text = encodeURIComponent(
      `Hello Rexine Centre,\nI am inquiring about Product Code: *${product.code}* (${product.name})\nFrom Book: *${book.title}* (${book.code})\n\nPlease share wholesale roll pricing, stock availability, and dispatch timeline.`
    );
    return `https://wa.me/918104019890?text=${text}`;
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#F8F6F2] min-h-screen pt-6 pb-28">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-button uppercase tracking-wider text-gray-500 mb-6 flex-wrap">
          <Link to="/" className="hover:text-[#C67C4E] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <Link to="/books" className="hover:text-[#C67C4E] transition-colors">Sample Books</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <Link to={`/books/${book.slug}`} className="hover:text-[#C67C4E] transition-colors line-clamp-1 max-w-[200px]">
            {book.title}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-[#C67C4E] font-bold">{product.code}</span>
        </div>

        {/* Top Actions Header */}
        <div className="bg-white rounded-2xl p-4 mb-8 border border-gray-200 flex items-center justify-between gap-4 flex-wrap shadow-sm">
          <button
            onClick={() => navigate(`/books/${book.slug}`)}
            className="font-button text-xs font-bold text-gray-700 hover:text-[#C67C4E] uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to {book.title} ({book.designCount} Swatches)</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowQRModal(true)}
              className="bg-[#111111] hover:bg-[#C67C4E] text-white px-4 py-2 rounded-xl text-xs font-button font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
            >
              <QrCode className="w-3.5 h-3.5 text-amber-300" />
              <span>Book QR Code</span>
            </button>

            <button
              onClick={handleCopyLink}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3.5 py-2 rounded-xl text-xs font-button font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copied ? 'Copied!' : 'Share'}</span>
            </button>
          </div>
        </div>

        {/* Main Product Layout */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-md mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Gallery Column (Left) */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-gray-100 border border-gray-200 shadow-lg group">
                <img
                  src={activeMainImage}
                  alt={product.name}
                  onError={(e) => {
                    if (product.fallbackImage) {
                      e.currentTarget.src = product.fallbackImage;
                    }
                  }}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                />

                <div
                  onClick={() => setShowQRModal(true)}
                  className="absolute top-4 left-4 bg-[#111111]/90 text-amber-300 border border-amber-300/30 text-[10px] font-button font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-lg cursor-pointer hover:bg-[#C67C4E] hover:text-white transition-colors"
                  title="Scan Book QR Code"
                >
                  <QrCode className="w-3.5 h-3.5 text-[#C67C4E]" />
                  <span>Code: {product.code} (Scan QR)</span>
                </div>

                <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-md text-white px-3 py-1 rounded-lg text-[10px] font-button font-bold uppercase tracking-wider">
                  Shade: {product.shadeName}
                </div>
              </div>

              {/* Thumbnail Bar */}
              {(product.gallery && product.gallery.length > 1) || (product.fallbackImage && product.fallbackImage !== product.image) ? (
                <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
                  {(product.gallery || (product.fallbackImage && product.fallbackImage !== product.image ? [product.image, product.fallbackImage] : [product.image])).map((imgSrc, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(imgSrc)}
                      className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                        activeMainImage === imgSrc ? 'border-[#C67C4E] shadow-md' : 'border-gray-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={imgSrc}
                        alt={`Thumbnail ${idx + 1}`}
                        onError={(e) => {
                          if (product.fallbackImage) e.currentTarget.src = product.fallbackImage;
                        }}
                        className="w-full h-full object-contain"
                      />
                    </button>
                  ))}

                  <button
                    onClick={() => navigate(`/books/${book.slug}`)}
                    className="w-20 h-20 rounded-xl border border-dashed border-gray-300 bg-gray-50 flex flex-col items-center justify-center text-[10px] font-button font-bold uppercase text-gray-500 hover:border-[#C67C4E] hover:text-[#C67C4E] transition-colors shrink-0"
                  >
                    <Layers className="w-4 h-4 mb-1" />
                    <span>+ All Swatches</span>
                  </button>
                </div>
              ) : null}
            </div>

            {/* Specifications & Purchasing Column (Right) */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2 border-b border-gray-100 pb-6">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-button font-bold text-[#C67C4E] uppercase tracking-widest bg-[#C67C4E]/10 px-2.5 py-1 rounded-md border border-[#C67C4E]/20">
                    Book: {book.title}
                  </span>
                  <span className="text-[10px] font-button font-bold text-gray-500 uppercase tracking-wider">
                    {product.category}
                  </span>
                </div>

                <h1 className="font-serif text-3xl font-bold text-[#111111]">
                  {product.name}
                </h1>

                <p className="font-sans text-xs sm:text-sm text-gray-600 leading-relaxed pt-1">
                  {product.description}
                </p>
              </div>

              {/* RRP Price Display */}
              {/* <div className="bg-[#F8F6F2] p-5 rounded-2xl border border-gray-200/90 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-button font-bold uppercase tracking-wider text-gray-500 block">
                    Retail Price (RRP)
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-3xl font-bold text-[#111111]">
                      ₹{product.rrp}
                    </span>
                    <span className="text-xs text-gray-500 font-sans">/ {product.unit}</span>
                  </div>
                </div>

                <span className="text-[10px] font-button font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
                  Ready Roll Stock
                </span>
              </div> */}

              {/* Technical Specifications Table */}
              <div className="space-y-2">
                <h3 className="font-button text-xs font-bold uppercase tracking-wider text-gray-900 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#C67C4E]" />
                  <span>Technical Specifications</span>
                </h3>

                <div className="grid grid-cols-2 gap-3 bg-gray-50 p-4 rounded-2xl border border-gray-200 text-xs font-sans">
                  <div>
                    <span className="text-[9px] font-button font-bold uppercase text-gray-400 block">Thickness</span>
                    <span className="font-bold text-gray-900">{product.specs.thickness || '1.2 mm'}</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-button font-bold uppercase text-gray-400 block">Roll Width</span>
                    <span className="font-bold text-gray-900">{product.specs.width || '54 inches'}</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-button font-bold uppercase text-gray-400 block">Backing</span>
                    <span className="font-bold text-gray-900">{product.specs.backing || 'Woven Cotton'}</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-button font-bold uppercase text-gray-400 block">Finish</span>
                    <span className="font-bold text-gray-900">{product.specs.finish || 'Protective Topcoat'}</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-button font-bold uppercase text-gray-400 block">Density / Weight</span>
                    <span className="font-bold text-gray-900">{product.specs.gsm || '600 GSM'}</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-button font-bold uppercase text-gray-400 block">Abrasion Rating</span>
                    <span className="font-bold text-emerald-700">{product.specs.abrasion || '80,000+ Cycles'}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons with Wishlist */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
  {/* WhatsApp Button */}
  <a
    href={getWhatsAppProductUrl()}
    target="_blank"
    rel="noopener noreferrer"
    className="flex-1 w-full bg-[#25D366] hover:bg-[#1ebd59] text-white py-4 px-4 rounded-xl font-button text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md group"
  >
    <MessageCircle className="w-4 h-4 fill-current group-hover:scale-110 transition-transform shrink-0" />
    <span>PRE-FILLED WHATSAPP ENQUIRY FOR {product.code}</span>
  </a>

  {/* Quote Request Button */}
  <button
    onClick={() => onOpenEnquiry(standardProduct)}
    className="flex-1 w-full bg-[#111111] hover:bg-[#C67C4E] text-white py-4 sm:py-3.5 px-4 rounded-xl font-button text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md"
  >
    <Send className="w-4 h-4 text-amber-300 shrink-0" />
    <span>REQUEST FORM QUOTE & SAMPLE ROLL</span>
  </button>
</div>
            </div>

          </div>
        </div>

        {/* Related Swatches from Same Book */}
        {relatedProducts.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-2xl font-bold text-[#111111]">
                Other Swatches in {book.title}
              </h3>

              <button
                onClick={() => navigate(`/books/${book.slug}`)}
                className="font-button text-xs font-bold text-[#C67C4E] hover:underline uppercase tracking-wider flex items-center gap-1.5"
              >
                <span>View All ({book.designCount})</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {relatedProducts.map((rel) => (
                <div
                  key={rel.code}
                  onClick={() => navigate(`/books/${book.slug}/${rel.code}`)}
                  className="bg-white rounded-2xl p-3 border border-gray-200 shadow-sm hover:shadow-xl cursor-pointer transition-all group flex flex-col justify-between"
                >
                  <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 mb-3">
                    <img
                      src={rel.image}
                      alt={rel.name}
                      onError={(e) => {
                        if (rel.fallbackImage) e.currentTarget.src = rel.fallbackImage;
                      }}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    />
                    <span className="absolute top-2 left-2 bg-[#111111]/80 text-amber-300 text-[9px] font-button font-bold uppercase px-2 py-0.5 rounded">
                      {rel.code}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-serif text-xs font-bold text-[#111111] group-hover:text-[#C67C4E] transition-colors line-clamp-1">
                      {rel.shadeName || rel.name}
                    </h4>
                    {/* <span className="font-button text-[11px] font-extrabold text-gray-900 block">
                      RRP: ₹{rel.rrp}/{rel.unit}
                    </span> */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* QR Code Modal */}
        <BookQRCodeModal
          isOpen={showQRModal}
          onClose={() => setShowQRModal(false)}
          book={book}
        />

      </div>
    </div>
  );
};