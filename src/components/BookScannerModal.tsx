import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  X,
  QrCode,
  BookOpen,
  CheckCircle,
  ArrowRight,
  Camera,
  FileText,
  Sparkles,
  RefreshCw,
} from 'lucide-react';

import { MOCK_BOOKS } from '../data/mockBooks';
import PDFViewerModal from './PDFViewerModal';

interface BookScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookScannerModal: React.FC<BookScannerModalProps> = ({
  isOpen,
  onClose,
}) => {
  const navigate = useNavigate();

  const [selectedBook, setSelectedBook] = useState(MOCK_BOOKS[0]);
  const [scanned, setScanned] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [showPDFModal, setShowPDFModal] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (!isOpen) {
      stopCamera();
      setScanned(false);
      setCameraError(null);
    }
  }, [isOpen]);

  const startCamera = async () => {
    setCameraError(null);

    try {
      if (
        navigator.mediaDevices &&
        navigator.mediaDevices.getUserMedia
      ) {
        const stream =
          await navigator.mediaDevices.getUserMedia({
            video: {
              facingMode: 'environment',
            },
          });

        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        setIsCameraActive(true);
      } else {
        setCameraError(
          'Camera API is not supported in this browser. You can use the simulated scanner below.'
        );
      }
    } catch (error) {
      console.warn('Camera access error:', error);

      setCameraError(
        'Camera access is unavailable or was declined. You can use the simulated scanner below.'
      );
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current
        .getTracks()
        .forEach((track) => track.stop());

      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setIsCameraActive(false);
  };

  /**
   * IMPORTANT:
   *
   * We DO NOT open /catalogue.pdf here.
   *
   * The new 16 coming-soon books don't have real PDF files yet.
   * The scanner should therefore open the BookDetailPage,
   * where the dummy book data is displayed.
   */
  const handleSimulateScan = (book: typeof MOCK_BOOKS[0]) => {
    setSelectedBook(book);
    setScanned(true);

    setTimeout(() => {
      stopCamera();
      setScanned(false);
      onClose();

      // Open the actual book detail page.
      navigate(`/books/${book.slug}`);
    }, 700);
  };

  const handleOpenDirectly = (bookSlug: string) => {
    stopCamera();
    onClose();

    navigate(`/books/${bookSlug}`);
  };

  const handleResetScanner = () => {
    setScanned(false);
    setCameraError(null);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* =====================================================
          SCANNER MODAL
      ====================================================== */}

      <div
        className="fixed inset-0 z-[999] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
        onClick={() => {
          stopCamera();
          onClose();
        }}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl max-h-[90vh] bg-[#111111] text-white rounded-3xl shadow-2xl border border-white/15 overflow-hidden flex flex-col"
        >
          {/* =================================================
              HEADER
          ================================================== */}

          <div className="p-5 bg-[#181818] border-b border-white/10 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#C67C4E] flex items-center justify-center text-white shrink-0 shadow-md">
                <QrCode className="w-5 h-5 text-amber-200" />
              </div>

              <div>
                <h3 className="font-button text-xs font-bold uppercase tracking-widest text-amber-300">
                  PHYSICAL SAMPLE BOOK QR SCANNER
                </h3>

                <p className="font-sans text-xs text-gray-400">
                  Scan physical book QR code to open all swatches & catalogue
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                stopCamera();
                onClose();
              }}
              className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* =================================================
              SCROLLABLE CONTENT
          ================================================== */}

          <div
            data-lenis-prevent
            className="p-6 space-y-6 overflow-y-auto flex-grow"
          >
            {/* =================================================
                CAMERA VIEWFINDER
            ================================================== */}

            <div className="space-y-3">
              <div className="relative w-full h-48 sm:h-56 bg-black rounded-2xl border-2 border-white/15 overflow-hidden flex flex-col items-center justify-center">
                {isCameraActive ? (
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-950 to-[#181818] flex flex-col items-center justify-center p-4 text-center">
                    <div className="relative w-24 h-24 border-2 border-dashed border-[#C67C4E]/60 rounded-xl flex items-center justify-center mb-2 overflow-hidden bg-black/40">
                      <div className="absolute inset-x-0 h-1 bg-[#C67C4E] shadow-[0_0_15px_#C67C4E] animate-bounce z-10" />

                      <QrCode className="w-10 h-10 text-[#C67C4E]/80" />
                    </div>

                    <p className="text-xs text-gray-300 font-sans max-w-xs">
                      Point camera at{' '}
                      <span className="text-amber-300 font-bold">
                        {selectedBook.code}
                      </span>{' '}
                      QR code on the physical sample book
                    </p>
                  </div>
                )}

                {/* Viewfinder */}

                <div className="absolute inset-6 sm:inset-8 border-2 border-amber-400/30 rounded-xl pointer-events-none flex flex-col justify-between p-2">
                  <div className="flex justify-between">
                    <div className="w-4 h-4 border-t-2 border-l-2 border-amber-300" />
                    <div className="w-4 h-4 border-t-2 border-r-2 border-amber-300" />
                  </div>

                  <div className="flex justify-between">
                    <div className="w-4 h-4 border-b-2 border-l-2 border-amber-300" />
                    <div className="w-4 h-4 border-b-2 border-r-2 border-amber-300" />
                  </div>
                </div>
              </div>

              {/* Camera Controls */}

              <div className="flex items-center justify-between gap-2 flex-wrap">
                {!isCameraActive ? (
                  <button
                    type="button"
                    onClick={startCamera}
                    className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-3.5 py-2 rounded-xl text-[11px] font-button uppercase font-bold flex items-center gap-1.5 cursor-pointer border border-white/20 transition-all"
                  >
                    <Camera className="w-3.5 h-3.5 text-amber-300" />

                    <span>
                      Enable Live Device Camera
                    </span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={stopCamera}
                    className="bg-red-500/80 hover:bg-red-600 backdrop-blur-md text-white px-3.5 py-2 rounded-xl text-[11px] font-button uppercase font-bold flex items-center gap-1 cursor-pointer transition-all"
                  >
                    <span>Stop Camera</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setShowPDFModal(true)}
                  className="bg-[#C67C4E] hover:bg-[#b06a3d] backdrop-blur-md text-white px-4 py-2 rounded-xl text-[11px] font-button uppercase font-bold flex items-center gap-1.5 cursor-pointer shadow-md transition-all"
                >
                  <FileText className="w-3.5 h-3.5 text-amber-200" />

                  <span>Open PDF Catalogue</span>
                </button>
              </div>
            </div>

            {/* Camera Error */}

            {cameraError && (
              <p className="text-[11px] text-amber-300/80 bg-amber-400/10 p-2.5 rounded-xl border border-amber-400/20 text-center font-sans">
                {cameraError}
              </p>
            )}

            {/* =================================================
                ACTIVE BOOK
            ================================================== */}

            <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-center gap-5">
              <div className="relative w-24 h-24 bg-gray-900 rounded-xl overflow-hidden shrink-0 border border-white/10 shadow-md">
                <img
                  src={selectedBook.coverImage}
                  alt={selectedBook.title}
                  onError={(e) => {
                    if (selectedBook.fallbackCover) {
                      e.currentTarget.src =
                        selectedBook.fallbackCover;
                    }
                  }}
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/20" />

                <div className="absolute bottom-1 left-1 right-1 text-[9px] font-button font-bold text-amber-300 uppercase bg-black/80 px-1 py-0.5 rounded text-center truncate">
                  {selectedBook.code}
                </div>
              </div>

              <div className="flex-grow text-center sm:text-left space-y-1">
                <span className="text-[10px] uppercase font-button text-[#C67C4E] font-bold tracking-wider">
                  {selectedBook.category}
                </span>

                <h4 className="font-serif text-lg font-bold text-white">
                  {selectedBook.title}
                </h4>

                <p className="font-sans text-xs text-gray-400 mb-3">
                  {selectedBook.status === 'coming-soon'
                    ? 'Dummy catalogue data is available for preview. Detailed physical book information will be available soon.'
                    : `Contains ${selectedBook.designCount} active physical swatches with specs & wholesale rates.`}
                </p>

                {scanned ? (
                  <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-xl text-xs font-bold border border-emerald-500/30">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />

                    <span>
                      QR Code Scanned! Opening Digital Book...
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2.5 justify-center sm:justify-start flex-wrap pt-1">
                    <button
                      type="button"
                      onClick={() =>
                        handleSimulateScan(selectedBook)
                      }
                      className="inline-flex items-center gap-2 bg-[#C67C4E] hover:bg-[#b06a3d] text-white px-5 py-2.5 rounded-xl font-button text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 text-amber-200" />

                      <span>Scan & View Swatches</span>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleOpenDirectly(selectedBook.slug)
                      }
                      className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white px-4 py-2.5 rounded-xl font-button text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer border border-white/10"
                    >
                      <span>
                        Open Book ({selectedBook.designCount})
                      </span>

                      <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* =================================================
                BOOK SELECTION
            ================================================== */}

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h5 className="font-button text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  Select Physical Sample Book:
                </h5>

                <button
                  type="button"
                  onClick={handleResetScanner}
                  className="text-gray-500 hover:text-white transition-colors"
                  title="Reset scanner"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {MOCK_BOOKS.map((book) => (
                  <button
                    type="button"
                    key={book.slug}
                    onClick={() => {
                      setSelectedBook(book);
                      handleSimulateScan(book);
                    }}
                    className={`p-2.5 rounded-xl border text-left transition-all flex items-center gap-2.5 cursor-pointer ${
                      selectedBook.slug === book.slug
                        ? 'border-[#C67C4E] bg-[#C67C4E]/15 shadow-md text-white ring-1 ring-[#C67C4E]'
                        : 'border-white/10 bg-white/5 hover:bg-white/10 text-gray-300'
                    }`}
                  >
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      onError={(e) => {
                        if (book.fallbackCover) {
                          e.currentTarget.src =
                            book.fallbackCover;
                        }
                      }}
                      className="w-9 h-9 rounded-lg object-cover shrink-0 border border-white/10"
                    />

                    <div className="overflow-hidden">
                      <p className="font-button text-[10px] font-bold text-amber-300 uppercase truncate">
                        {book.code}
                      </p>

                      <p className="font-sans text-[11px] text-gray-200 truncate">
                        {book.title}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          PDF VIEWER
      ====================================================== */}

      <PDFViewerModal
        isOpen={showPDFModal}
        onClose={() => setShowPDFModal(false)}
        title={selectedBook.title}
        pdfUrl={selectedBook.pdfPath}
        code={selectedBook.code}
        pageCount={
          selectedBook.designCount
            ? selectedBook.designCount + 4
            : 39
        }
      />
    </>
  );
};

export default BookScannerModal;