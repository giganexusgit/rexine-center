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

  /*
   * IMPORTANT:
   * Do not put hooks after "if (!isOpen) return null".
   * This fixes the React "change in order of Hooks" error.
   */

  const bookTitle =
    book?.title ||
    title ||
    "Catalogue";

  const bookCode =
    book?.code ||
    code ||
    "";

  const bookCategory =
    book?.category ||
    category ||
    "REXINE CENTRE";

  const catalogueUrl =
    pdfUrl ||
    book?.pdfPath ||
    `${window.location.origin}/book/${bookCode.toLowerCase()}/catalogue.pdf`;

  const swatchCount =
    book?.designCount ||
    pageCount ||
    0;

  const qrImageUrl =
    `https://api.qrserver.com/v1/create-qr-code/?size=500x500&margin=12&data=${encodeURIComponent(
      catalogueUrl
    )}`;

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
    window.open(
      catalogueUrl,
      "_blank",
      "noopener,noreferrer"
    );
  };

  if (!isOpen) return null;

  return (
    <div
      className="
        fixed
        inset-0
        z-[200]
        flex
        items-center
        justify-center
        bg-black/75
        px-3
        py-3
        backdrop-blur-md
      "
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      {/* =====================================================
          COMPACT MODAL
      ====================================================== */}

      <div
        className="
          relative
          flex
          w-full
          max-w-[485px]
          max-h-[calc(100vh-24px)]
          flex-col
          overflow-hidden
          rounded-[24px]
          border
          border-white/15
          bg-[#111111]
          text-white
          shadow-[0_25px_80px_rgba(0,0,0,0.65)]
        "
      >
        {/* ===================================================
            HEADER
        ==================================================== */}

        <div
          className="
            flex
            shrink-0
            items-center
            justify-between
            border-b
            border-white/10
            bg-[#111111]
            px-5
            py-4
          "
        >
          <div className="flex items-center gap-3">
            {/* Icon */}

            <div
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-[#C67C4E]
                shadow-md
              "
            >
              <QrCode
                size={20}
                strokeWidth={2.3}
                className="text-amber-200"
              />
            </div>

            {/* Heading */}

            <div>
              <h2
                className="
                  text-[13px]
                  font-extrabold
                  uppercase
                  tracking-[0.07em]
                  text-[#F4C21D]
                "
              >
                Physical Book QR Code
              </h2>

              <p className="mt-0.5 text-[10px] text-white/50">
                Book Code:{" "}
                <span className="font-bold text-white">
                  {bookCode}
                </span>
              </p>
            </div>
          </div>

          {/* Close */}

          <button
            type="button"
            onClick={onClose}
            aria-label="Close QR modal"
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-full
              text-white/50
              transition
              hover:bg-white/10
              hover:text-white
            "
          >
            <X size={20} />
          </button>
        </div>

        {/* ===================================================
            MAIN CONTENT
        ==================================================== */}

        <div
          className="
            overflow-y-auto
            px-5
            py-5
          "
          style={{
            scrollbarWidth: "none",
          }}
        >
          {/* Category */}

          <div className="flex justify-center">
            <span
              className="
                rounded-md
                border
                border-[#C67C4E]/40
                bg-[#C67C4E]/10
                px-3
                py-1
                text-[9px]
                font-bold
                uppercase
                tracking-[0.08em]
                text-[#C67C4E]
              "
            >
              {bookCategory}
            </span>
          </div>

          {/* Title */}

          <h1
            className="
              mt-3
              text-center
              text-[22px]
              font-extrabold
              leading-tight
              tracking-tight
              text-white
            "
          >
            {bookTitle}
          </h1>

          {/* Description */}

          <p
            className="
              mt-1.5
              text-center
              text-[12px]
              leading-5
              text-white/50
            "
          >
            Scan QR code to open the PDF catalogue directly
            {swatchCount > 0
              ? ` (${swatchCount}+ swatches)`
              : ""}
          </p>

          {/* =================================================
              QR CODE
          ================================================== */}

          <div className="mt-5 flex justify-center">
            <div
              className="
                rounded-[18px]
                border-[4px]
                border-[#E9C2A9]
                bg-white
                p-2.5
                shadow-[0_12px_35px_rgba(0,0,0,0.35)]
              "
            >
              <div
                className="
                  relative
                  overflow-hidden
                  rounded-md
                  bg-white
                "
              >
                <img
                  src={qrImageUrl}
                  alt={`QR code for ${bookTitle}`}
                  className="
                    block
                    h-[250px]
                    w-[250px]
                    object-contain
                  "
                />

                {/* Centre Branding */}

                <div
                  className="
                    absolute
                    left-1/2
                    top-1/2
                    flex
                    -translate-x-1/2
                    -translate-y-1/2
                    items-center
                    gap-1
                    rounded-md
                    bg-[#111111]
                    px-2
                    py-1
                    shadow-lg
                  "
                >
                  <QrCode
                    size={11}
                    className="text-[#F4C21D]"
                  />

                  <span
                    className="
                      text-[8px]
                      font-extrabold
                      uppercase
                      tracking-wider
                      text-[#C67C4E]
                    "
                  >
                    REXINE
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* =================================================
              URL
          ================================================== */}

          <div
            className="
              mt-5
              flex
              h-[48px]
              items-center
              gap-2
              rounded-[16px]
              border
              border-white/10
              bg-[#1D1D1D]
              px-3
            "
          >
            <p
              className="
                min-w-0
                flex-1
                overflow-hidden
                text-ellipsis
                whitespace-nowrap
                font-mono
                text-[10px]
                text-[#F4C21D]
              "
            >
              {catalogueUrl}
            </p>

            <button
              type="button"
              onClick={handleCopy}
              aria-label="Copy catalogue link"
              className="
                flex
                h-8
                w-8
                shrink-0
                items-center
                justify-center
                rounded-lg
                bg-white/10
                text-white
                transition
                hover:bg-white/20
              "
            >
              {copied ? (
                <Check
                  size={16}
                  className="text-green-400"
                />
              ) : (
                <Copy size={16} />
              )}
            </button>
          </div>

          {/* =================================================
              BUTTONS
          ================================================== */}

          <div className="mt-4 space-y-2.5">
            {/* Primary */}

            <button
              type="button"
              onClick={handleSimulateScan}
              className="
                group
                flex
                h-[49px]
                w-full
                items-center
                justify-center
                gap-2
                rounded-[15px]
                bg-[#C67C4E]
                px-4
                text-[12px]
                font-extrabold
                uppercase
                tracking-wide
                text-white
                shadow-lg
                shadow-[#C67C4E]/20
                transition
                duration-200
                hover:bg-[#B66C40]
              "
            >
              <Camera size={17} />

              <span>
                Simulate Scan &amp; Open PDF Catalogue
              </span>

              <ArrowRight
                size={17}
                className="
                  transition-transform
                  duration-200
                  group-hover:translate-x-1
                "
              />
            </button>

            {/* Secondary */}

            <button
              type="button"
              onClick={() => {
                if (onOpenCatalogue) {
                  onOpenCatalogue();
                } else {
                  window.open(
                    catalogueUrl,
                    "_blank",
                    "noopener,noreferrer"
                  );
                }
              }}
              className="
                flex
                h-[47px]
                w-full
                items-center
                justify-center
                gap-2
                rounded-[15px]
                border
                border-white/15
                bg-white/[0.08]
                px-4
                text-[12px]
                font-extrabold
                uppercase
                tracking-wide
                text-white
                transition
                hover:border-white/25
                hover:bg-white/[0.13]
              "
            >
              <FileText
                size={17}
                className="text-[#F4C21D]"
              />

              Open Catalogue PDF Viewer
            </button>
          </div>

          {/* =================================================
              FOOTER
          ================================================== */}

          <p
            className="
              mt-3
              text-center
              text-[9px]
              leading-4
              text-white/40
            "
          >
            Scanning or clicking opens all swatches,
            wholesale rates, and PDF catalogue.
          </p>
        </div>
      </div>
    </div>
  );
}