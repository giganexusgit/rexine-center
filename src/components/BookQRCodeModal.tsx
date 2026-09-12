import React, { useState } from "react";
import {
  X,
  Copy,
  Check,
  ArrowRight,
  FileText,
  Camera,
  QrCode,
} from "lucide-react";
import type { Book } from "../data/mockBooks";
import { siteUrl } from "../config";
import PDFViewerModal from "./PDFViewerModal";

interface BookQRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  book?: Book | null;
  title?: string;
  code?: string;
  category?: string;
  pdfUrl?: string;
  pageCount?: number;
  onOpenCatalogue?: () => void;
}

export default function BookQRCodeModal({
  isOpen,
  onClose,
  book,
  title,
  code,
  category,
  pdfUrl,
  pageCount,
  onOpenCatalogue,
}: BookQRCodeModalProps) {
  const [copied, setCopied] = useState(false);
  const [showPDFViewer, setShowPDFViewer] = useState(false);

  /*
   * Keep all hooks unconditionally before the early return to avoid
   * React hook order issues.
   */

  // Resolve Book Code (e.g. "643" or "PLUSH-643")
  const rawCode = book?.code || code || "";
  const bookCode = rawCode.includes("-")
    ? rawCode.split("-").pop() || rawCode
    : rawCode;

  // Resolve Title (e.g. "PLUSH-643")
  const fullTitle = book?.title || title || (bookCode ? `BOOK-${bookCode}` : "CATALOGUE");
  const displayTitle = fullTitle.includes(" - ")
    ? fullTitle.split(" - ")[0].trim()
    : fullTitle.trim();

  // Resolve Category (e.g. "REXINE & UPHOLSTERY")
  const bookCategory =
    book?.category || category || "REXINE & UPHOLSTERY";

  const origin =
    typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : 'https://rexinecentre.com';

  const rawPath =
    pdfUrl ||
    book?.pdfPath ||
    `/book/${(book?.slug || bookCode).toLowerCase()}/catalogue.pdf`;

  const catalogueUrl =
    rawPath.startsWith('http://') || rawPath.startsWith('https://')
      ? rawPath
      : `${origin}/${rawPath.replace(/^\//, '')}`;

  // Scannable QR Code pointing directly to the PDF catalogue URL
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&margin=12&data=${encodeURIComponent(
    catalogueUrl
  )}`;

  const swatchCount = book?.designCount || pageCount || 0;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(catalogueUrl);
      setCopied(true);
      window.setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {
      setCopied(false);
    }
  };

  const handleSimulateScan = () => {
    window.open(catalogueUrl, "_blank", "noopener,noreferrer");
  };

  const handleOpenCatalogue = () => {
    if (onOpenCatalogue) {
      onOpenCatalogue();
    } else {
      setShowPDFViewer(true);
    }
  };

  const handleClose = () => {
    setCopied(false);
    setShowPDFViewer(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto"
        onClick={handleClose}
      >
        <div
          className="relative w-full max-w-[430px] rounded-[28px] bg-[#141414] border border-white/10 shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* ===================================================
              HEADER
          ==================================================== */}
          <div className="flex items-center justify-between px-5 pt-5 pb-3">
            <div className="flex items-center gap-3">
              {/* QR Code Icon Badge */}
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#C67C4E] shadow-md shrink-0">
                <QrCode size={22} strokeWidth={2.2} className="text-white" />
              </div>

              {/* Title & Book Code */}
              <div>
                <p className="font-button text-[12px] font-black uppercase tracking-wider text-[#E5B94C] leading-none">
                  PHYSICAL BOOK QR CODE
                </p>
                <p className="mt-1 text-xs font-semibold text-white/50">
                  Book Code:{" "}
                  <span className="text-white font-bold">{bookCode}</span>
                </p>
              </div>
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close QR modal"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-white/50 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* ===================================================
              MAIN CONTENT
          ==================================================== */}
          <div
            className="overflow-y-auto px-5 pb-5 pt-2"
            style={{ scrollbarWidth: "none" }}
          >
            {/* Category Pill */}
            <div className="flex justify-center">
              <span className="rounded-md border border-[#C67C4E]/40 bg-[#C67C4E]/10 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.08em] text-[#C67C4E]">
                {bookCategory}
              </span>
            </div>

            {/* Title */}
            <h2 className="mt-3 text-center text-[24px] font-extrabold leading-tight tracking-tight text-white uppercase">
              {displayTitle}
            </h2>

            {/* Subtitle */}
            <p className="mt-1.5 text-center text-[12px] leading-5 text-white/50">
              Scan QR code to open the PDF catalogue directly
            </p>

            {/* =================================================
                QR CODE
            ================================================== */}
            <div className="mt-5 flex justify-center">
              <div className="rounded-[18px] border-[4px] border-[#E9C2A9] bg-white p-2.5 shadow-[0_12px_35px_rgba(0,0,0,0.35)]">
                <div className="relative overflow-hidden rounded-md bg-white">
                  <img
                    src={qrImageUrl}
                    alt={`QR code for ${displayTitle}`}
                    className="block h-[250px] w-[250px] object-contain"
                  />

                  {/* Centre Branding */}
                  <div className="pointer-events-none absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-1 rounded-md bg-[#111111] px-2 py-1 shadow-lg border border-white/10">
                    <QrCode size={11} className="text-[#F4C21D]" />
                    <span className="text-[8px] font-extrabold uppercase tracking-wider text-[#C67C4E]">
                      REXINE
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* =================================================
                URL BAR
            ================================================== */}
            <div className="mt-5 flex h-[48px] items-center gap-2 rounded-[16px] border border-white/10 bg-[#1D1D1D] px-3.5">
              <p className="min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap font-mono text-[10px] sm:text-[11px] text-[#F4C21D]">
                {catalogueUrl}
              </p>

              <button
                type="button"
                onClick={handleCopy}
                aria-label="Copy catalogue link"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white/80 hover:bg-white/20 hover:text-white transition-colors cursor-pointer"
              >
                {copied ? (
                  <Check size={16} className="text-emerald-400" />
                ) : (
                  <Copy size={16} />
                )}
              </button>
            </div>

            {/* =================================================
                BUTTONS
            ================================================== */}
            <div className="mt-4 space-y-2.5">
              {/* Primary: Simulate Scan & Open PDF Catalogue */}
              <button
                type="button"
                onClick={handleSimulateScan}
                className="group flex h-[49px] w-full items-center justify-center gap-2 rounded-[15px] bg-[#C67C4E] hover:bg-[#B66C40] active:scale-[0.99] px-4 text-[12px] sm:text-[13px] font-extrabold uppercase tracking-wide text-white shadow-lg shadow-[#C67C4E]/20 transition-all duration-200 cursor-pointer"
              >
                <Camera size={17} strokeWidth={2.2} />
                <span>Simulate Scan &amp; Open PDF Catalogue</span>
                <ArrowRight
                  size={17}
                  strokeWidth={2.2}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </button>

              {/* Secondary: Open Catalogue PDF Viewer */}
              <button
                type="button"
                onClick={handleOpenCatalogue}
                className="flex h-[47px] w-full items-center justify-center gap-2 rounded-[15px] border border-white/15 bg-white/[0.08] hover:border-white/25 hover:bg-white/[0.13] active:scale-[0.99] px-4 text-[12px] sm:text-[13px] font-extrabold uppercase tracking-wide text-white transition-all cursor-pointer"
              >
                <FileText size={17} className="text-[#F4C21D]" />
                <span>Open Catalogue PDF Viewer</span>
              </button>
            </div>

            {/* =================================================
                FOOTER
            ================================================== */}
            <p className="mt-3 text-center text-[9px] sm:text-[10px] leading-4 text-white/40">
              Scanning or clicking opens all swatches, wholesale rates, and PDF catalogue.
            </p>
          </div>
        </div>
      </div>

      {/* Internal PDF Viewer modal fallback if parent does not handle onOpenCatalogue */}
      {showPDFViewer && (
        <PDFViewerModal
          isOpen={showPDFViewer}
          onClose={() => setShowPDFViewer(false)}
          title={displayTitle}
          pdfUrl={resolvedPdfPath}
          code={bookCode}
          pageCount={swatchCount ? swatchCount + 4 : 39}
        />
      )}
    </>
  );
}