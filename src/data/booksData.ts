import { SampleBook, Product, BrandCollection } from '../types';
import { MOCK_BOOKS, Book, BookProduct } from './mockBooks';
import { siteUrl } from '../config';
import heroLeatherRolls from '../assets/images/hero_leather_rolls_1785154192570.jpg';
import aboutInteriorDining from '../assets/images/about_interior_dining_1785154208545.jpg';
import leatherSwatchesStacked from '../assets/images/leather_swatches_stacked_1785154222031.jpg';
import rexineCognacNappa from '../assets/images/rexine_cognac_nappa_1785227277160.jpg';
import rexineBurgundyWine from '../assets/images/rexine_burgundy_wine_1785227406807.jpg';
import rexineEmeraldGreen from '../assets/images/rexine_emerald_green_1785227447891.jpg';
import rexineMidnightNavy from '../assets/images/rexine_midnight_navy_1785227463408.jpg';

// Brand / Parent Collections
export const BRAND_COLLECTIONS: BrandCollection[] = [
  {
    id: 'ddecor',
    name: "D'Decor",
    tagline: 'Luxury Upholstery & Premium Textiles',
    description: "International standard luxury fabrics, crushed velvets, and soft touch furnishing leatherette sample books.",
    image: rexineBurgundyWine,
    accentColor: '#581825',
    totalBooks: 3,
  },
  {
    id: 'milano',
    name: 'Milano',
    tagline: 'Italian Silky Nappa Leatherette',
    description: 'Ultra-luxurious silky smooth synthetic hides engineered for executive seating, hotels, and luxury sofas.',
    image: rexineCognacNappa,
    accentColor: '#A66E38',
    totalBooks: 2,
  },
  {
    id: 'supreme',
    name: 'Supreme',
    tagline: 'Automotive & Heavy Duty UV Leatherette',
    description: 'UV-stabilized, flame-retardant, and high tear strength synthetic hides for vehicle seating & marine yachts.',
    image: rexineMidnightNavy,
    accentColor: '#1E2A38',
    totalBooks: 2,
  },
  {
    id: 'royal',
    name: 'Royal',
    tagline: 'Heritage Sofa Fabrics & Jacquard Weaves',
    description: 'Opulent woven upholstery, stain-resistant sofa velvets, and chenille fabrics.',
    image: aboutInteriorDining,
    accentColor: '#8C6239',
    totalBooks: 2,
  },
  {
    id: 'elite',
    name: 'Elite',
    tagline: 'Commercial High Density PVC Sheets',
    description: 'Tough, bleach-cleanable flexible PVC sheets engineered for heavy footfall seating, restaurants, and clinics.',
    image: leatherSwatchesStacked,
    accentColor: '#111111',
    totalBooks: 2,
  },
  {
    id: 'signature',
    name: 'Signature',
    tagline: 'Embossed & Diamond Quilted Rexine',
    description: 'Bespoke diamond stitched padded hides, metallic shimmers, and decorative wall panel upholstery.',
    image: rexineEmeraldGreen,
    accentColor: '#1E4D3A',
    totalBooks: 2,
  }
];

// Helper converter from Book -> SampleBook
const mapBookToSampleBook = (b: Book): SampleBook => ({
  id: b.slug,
  slug: b.slug,
  code: b.code,
  name: b.title,
  collectionId: b.slug.split('-')[0],
  collectionName: b.title.split('-')[0].trim(),
  category: b.category,
  year: b.year || '2026 Edition',
  description: b.description,
  totalSwatches: b.designCount,
  // Prefer fallbackCover when coverImage is a local placeholder path not yet uploaded
  coverImage: (b.coverImage && !b.coverImage.startsWith('/books-json/'))
    ? b.coverImage
    : (b.fallbackCover || rexineBurgundyWine),
  // QR code points directly to the PDF catalogue, not the book page
  qrCodeUrl: siteUrl(b.pdfPath),
  status: b.status,
  message: b.message,
  specs: b.specs,
});

// Physical Sample Books array
export const SAMPLE_BOOKS_DATA: SampleBook[] = MOCK_BOOKS.map(mapBookToSampleBook);

// Helper converter from BookProduct -> Product
const mapBookProductToProduct = (bp: BookProduct, b: Book): Product => ({
  id: `${b.slug}-${bp.code}`,
  code: bp.code,
  name: bp.name,
  shadeName: bp.shadeName,
  category: bp.category || b.category,
  collectionId: b.slug.split('-')[0],
  collectionName: b.title.split('-')[0].trim(),
  bookId: b.slug,
  bookTitle: b.title,
  // rrp: bp.rrp,
  unit: bp.unit,
  description: bp.description,
  image: bp.image || bp.fallbackImage || rexineBurgundyWine,
  colors: bp.colors || [{ name: bp.shadeName || 'Natural', hex: '#888888' }],
  specs: bp.specs,
  featured: true,
  inStock: bp.inStock ?? true,
});

// All book designs mapped across all mock books
export const ALL_BOOK_DESIGNS: Product[] = MOCK_BOOKS.flatMap((b) =>
  b.products.map((bp) => mapBookProductToProduct(bp, b))
);

export const getBookById = (bookId: string): SampleBook | undefined => {
  const found = MOCK_BOOKS.find(
    (b) => b.slug.toLowerCase() === bookId.toLowerCase() || b.code.toLowerCase() === bookId.toLowerCase()
  );
  return found ? mapBookToSampleBook(found) : undefined;
};

export const getDesignsByBookId = (bookId: string): Product[] => {
  const found = MOCK_BOOKS.find(
    (b) => b.slug.toLowerCase() === bookId.toLowerCase() || b.code.toLowerCase() === bookId.toLowerCase()
  );
  if (!found) return [];
  return found.products.map((bp) => mapBookProductToProduct(bp, found));
};
