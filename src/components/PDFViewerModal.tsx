import React, { useState } from "react";
import {
  X,
  Download,
  FileText,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { MOCK_BOOKS } from "../data/mockBooks";

interface PDFViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  pdfUrl?: string;
  code?: string;
  pageCount?: number;
}

const PDFViewerModal: React.FC<PDFViewerModalProps> = ({
  isOpen,
  onClose,
  title,
  pdfUrl: propPdfUrl,
  code = "CINEFAB-651",
  pageCount: propPageCount,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState<"embed" | "gallery">("gallery");

  if (!isOpen) return null;

  const normalizedCode = code.toLowerCase();

  const book = MOCK_BOOKS.find(
    (b) =>
      b.code.toLowerCase() === normalizedCode ||
      b.slug.toLowerCase() === normalizedCode
  );

  const pdfUrl =
    propPdfUrl ||
    book?.pdfPath ||
    `/book/${normalizedCode}/catalogue.pdf`;

  const products = book?.products ?? [];

  const resolvedPageCount =
    propPageCount ||
    (products.length > 0 ? products.length + 2 : 39);

  const coverImage =
    book?.coverImage || `/book/${normalizedCode}/cover.png`;

  const handleDownload = () => {
    const link = document.createElement("a");

    link.href = pdfUrl;
    link.download = `${code}-Catalogue.pdf`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenNewTab = () => {
    window.open(pdfUrl, "_blank", "noopener,noreferrer");
  };

  const swatchIndex = currentPage - 2;
  const product = products[swatchIndex];
  const shadeNumber = swatchIndex + 1;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/85 p-2 backdrop-blur-md animate-fade-in sm:p-4">
      <div className="flex h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-white/15 bg-[#111111] text-white shadow-2xl">

        {/* Header */}
        <div className="flex shrink-0 items-center justify-between gap-4 border-b border-white/10 bg-[#181818] p-4 sm:p-5">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#C67C4E] shadow-md">
              <FileText className="h-5 w-5 text-amber-200" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="rounded border border-amber-400/20 bg-amber-400/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-amber-300">
                  {code}
                </span>

                <span className="hidden text-xs text-gray-400 sm:inline">
                  Official Catalogue PDF
                </span>
              </div>

              <h3 className="max-w-md truncate font-serif text-base font-bold text-white sm:text-lg">
                {title || book?.title}
              </h3>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">

            {/* Desktop Tabs */}
            <div className="hidden rounded-xl border border-white/10 bg-white/5 p-1 sm:flex">
              <button
                type="button"
                onClick={() => setActiveTab("gallery")}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold uppercase transition-all ${
                  activeTab === "gallery"
                    ? "bg-[#C67C4E] text-white shadow-xs"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Page Slides ({resolvedPageCount})
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("embed")}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold uppercase transition-all ${
                  activeTab === "embed"
                    ? "bg-[#C67C4E] text-white shadow-xs"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                PDF View
              </button>
            </div>

            {/* Download */}
            <button
              type="button"
              onClick={handleDownload}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 p-2.5 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-white/20 sm:px-4 sm:py-2"
              title="Download PDF"
            >
              <Download className="h-4 w-4 text-amber-300" />

              <span className="hidden sm:inline">
                Download PDF
              </span>
            </button>

            {/* Open */}
            <button
              type="button"
              onClick={handleOpenNewTab}
              className="flex items-center gap-2 rounded-xl bg-[#C67C4E] p-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-md transition-all hover:bg-[#b06a3d] sm:px-4 sm:py-2"
              title="Open PDF in New Tab"
            >
              <ExternalLink className="h-4 w-4" />

              <span className="hidden sm:inline">
                Open in Tab
              </span>
            </button>

            {/* Close */}
            <button
              type="button"
              onClick={onClose}
              className="ml-1 rounded-full p-2 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile Tabs */}
        <div className="flex shrink-0 justify-center gap-2 border-b border-white/10 bg-[#181818] p-2 sm:hidden">
          <button
            type="button"
            onClick={() => setActiveTab("gallery")}
            className={`rounded-lg px-3 py-1 text-xs font-bold uppercase ${
              activeTab === "gallery"
                ? "bg-[#C67C4E] text-white"
                : "text-gray-400"
            }`}
          >
            Slides View
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("embed")}
            className={`rounded-lg px-3 py-1 text-xs font-bold uppercase ${
              activeTab === "embed"
                ? "bg-[#C67C4E] text-white"
                : "text-gray-400"
            }`}
          >
            Native PDF
          </button>
        </div>

        {/* Body */}
        <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden bg-black">

          {activeTab === "embed" ? (
            <div className="flex h-full w-full flex-col">
              <iframe
                src={`${pdfUrl}#toolbar=1&navpanes=1`}
                title={`${title} Catalogue PDF`}
                className="w-full flex-1 border-0"
              />

              <div className="flex items-center justify-between border-t border-white/10 bg-[#181818] p-3 text-xs text-gray-400">
                <span>PDF Document Stream</span>

                <button
                  type="button"
                  onClick={handleOpenNewTab}
                  className="flex items-center gap-1 text-[11px] font-bold uppercase text-amber-300 hover:underline"
                >
                  If preview doesn't render, click to open PDF directly
                  <ExternalLink className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex h-full w-full flex-col p-4">
              <div className="relative flex flex-1 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#181818] p-4">

                <div className="relative flex max-h-full max-w-full aspect-[1/1.4] flex-col justify-between overflow-hidden rounded-lg bg-white p-6 text-black shadow-2xl">

                  {/* Cover */}
                  {currentPage === 1 ? (
                    <div className="flex h-full flex-col items-center justify-between py-8 text-center">
                      <div className="pb-2 font-serif text-xl font-bold tracking-widest">
                        REXINE CENTRE
                      </div>

                      <div className="my-auto space-y-3">
                        <div className="mx-auto h-36 w-48 overflow-hidden rounded-2xl border-2 border-[#C67C4E] shadow-sm">
                          <img
                            src={coverImage}
                            alt={`${code} catalogue cover`}
                            className="h-full w-full object-cover"
                          />
                        </div>

                        <h2 className="font-serif text-2xl font-bold text-gray-900">
                          SAMPLE CATALOGUE
                        </h2>

                        <p className="mx-auto max-w-xs text-xs text-gray-600">
                          {book?.category ||
                            "100% Polyester Premium Upholstery Fabrics"}

                          <br />

                          {book?.specs?.finish ||
                          book?.specs?.thickness
                            ? `(${book?.specs?.finish || ""} • ${
                                book?.specs?.thickness || ""
                              })`
                            : ""}
                        </p>
                      </div>

                      <div className="text-[10px] uppercase tracking-widest text-gray-500">
                        Official Rexine Centre Physical Sample Binder
                      </div>
                    </div>
                  ) : currentPage === resolvedPageCount ? (
                    /* Specs Page */
                    <div className="flex h-full flex-col justify-between rounded-lg border border-amber-200 bg-amber-50/50 p-4 text-left">
                      <div className="flex items-center justify-between border-b border-gray-300 pb-3">
                        <span className="font-serif text-lg font-bold text-gray-900">
                          REXINE CENTRE
                        </span>

                        <span className="font-mono text-xs font-bold text-[#C67C4E]">
                          {code}
                        </span>
                      </div>

                      <div className="my-auto space-y-4">
                        <h3 className="font-serif text-xl font-bold text-gray-900">
                          Technical Specifications
                        </h3>

                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div className="rounded border border-gray-200 bg-white p-2.5">
                            <span className="block text-[10px] font-bold uppercase text-gray-500">
                              Width
                            </span>

                            <span className="font-bold text-gray-900">
                              {book?.specs?.width ||
                                "140 CMS (54 Inches)"}
                            </span>
                          </div>

                          <div className="rounded border border-gray-200 bg-white p-2.5">
                            <span className="block text-[10px] font-bold uppercase text-gray-500">
                              Backing
                            </span>

                            <span className="font-bold text-gray-900">
                              {book?.specs?.backing ||
                                "Standard Backing"}
                            </span>
                          </div>

                          <div className="rounded border border-gray-200 bg-white p-2.5">
                            <span className="block text-[10px] font-bold uppercase text-gray-500">
                              Finish / GSM
                            </span>

                            <span className="font-bold text-gray-900">
                              {book?.specs?.finish ||
                                "Standard Finish"}
                            </span>
                          </div>

                          <div className="rounded border border-gray-200 bg-white p-2.5">
                            <span className="block text-[10px] font-bold uppercase text-gray-500">
                              Target Use
                            </span>

                            <span className="font-bold text-gray-900">
                              {book?.specs?.targetUse ||
                                "Upholstery"}
                            </span>
                          </div>
                        </div>

                        <div className="rounded border border-gray-200 bg-white p-3 text-[11px] text-gray-600">
                          <span className="mb-0.5 block font-bold text-gray-800">
                            Care Instructions:
                          </span>

                          Gentle wash or professional dry clean.
                          Colour shades may slightly vary from dye lot
                          to dye lot.
                        </div>
                      </div>

                      <div className="border-t border-gray-300 pt-2 text-center font-mono text-[10px] text-gray-500">
                        Page {currentPage} of {resolvedPageCount} • Rexine Centre India
                      </div>
                    </div>
                  ) : product ? (
                    /* Swatch Page */
                    <div className="flex h-full flex-col justify-between">
                      <div className="flex items-center justify-between border-b border-gray-200 pb-2 text-xs text-gray-500">
                        <span className="font-serif font-bold text-black">
                          REXINE CENTRE
                        </span>

                        <span className="font-mono text-xs font-bold text-[#C67C4E]">
                          SR.NO:{" "}
                          {String(shadeNumber).padStart(2, "0")}
                        </span>
                      </div>

                      <div className="my-auto flex flex-col items-center justify-center p-4">
                        <div className="flex h-64 w-56 flex-col items-center justify-center rounded-xl border-4 border-dashed border-amber-300 bg-amber-100/50 p-4 text-center shadow-inner">
                          <div className="mb-2 h-50 w-50 overflow-hidden rounded-2xl border border-gray-200 shadow-md">
                            <img
                              src={product.image}
                              alt={product.code}
                              className="h-full w-full object-cover"
                            />
                          </div>

                          <span className="font-serif text-base font-bold text-gray-900">
                            {product.code}
                          </span>

                          <span className="mt-1 font-mono text-xs font-bold text-[#C67C4E]">
                            Shade #{String(shadeNumber).padStart(2, "0")}
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <p className="text-gray-500">
                        No preview available.
                      </p>
                    </div>
                  )}
                </div>

                {/* Left */}
                <button
                  type="button"
                  onClick={() =>
                    setCurrentPage((p) => Math.max(1, p - 1))
                  }
                  disabled={currentPage === 1}
                  className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-black/80 p-3 text-white shadow-xl transition-all hover:bg-[#C67C4E] disabled:opacity-30"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>

                {/* Right */}
                <button
                  type="button"
                  onClick={() =>
                    setCurrentPage((p) =>
                      Math.min(resolvedPageCount, p + 1)
                    )
                  }
                  disabled={currentPage === resolvedPageCount}
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-black/80 p-3 text-white shadow-xl transition-all hover:bg-[#C67C4E] disabled:opacity-30"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>

              {/* Toolbar */}
              <div className="mt-3 flex items-center justify-between rounded-2xl border border-white/10 bg-[#181818] p-3 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold uppercase text-gray-400">
                    Page {currentPage} of {resolvedPageCount}
                  </span>

                  <span className="text-gray-600">
                    |
                  </span>

                  <span className="hidden truncate text-xs text-amber-300 sm:inline">
                    {currentPage === 1
                      ? "Cover Page"
                      : currentPage === resolvedPageCount
                      ? "Technical Specs & Back Cover"
                      : `Swatch Shade #${String(
                          currentPage - 1
                        ).padStart(2, "0")}`}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setCurrentPage(1)}
                    className="rounded bg-white/5 px-2.5 py-1 text-[11px] font-bold uppercase text-gray-300 hover:bg-white/10"
                  >
                    Cover
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setCurrentPage(
                        resolvedPageCount > 2 ? 2 : 1
                      )
                    }
                    className="rounded bg-white/5 px-2.5 py-1 text-[11px] font-bold uppercase text-gray-300 hover:bg-white/10"
                  >
                    First Swatch
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setCurrentPage(resolvedPageCount)
                    }
                    className="rounded bg-white/5 px-2.5 py-1 text-[11px] font-bold uppercase text-gray-300 hover:bg-white/10"
                  >
                    Specs Page
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PDFViewerModal;