import rexineCognacNappa from '../assets/images/rexine_cognac_nappa_1785227277160.jpg';
import rexineBurgundyWine from '../assets/images/rexine_burgundy_wine_1785227406807.jpg';
import rexineSlateCharcoal from '../assets/images/rexine_slate_charcoal_1785227428841.jpg';
import rexineEmeraldGreen from '../assets/images/rexine_emerald_green_1785227447891.jpg';
import rexineMidnightNavy from '../assets/images/rexine_midnight_navy_1785227463408.jpg';
import heroLeatherRolls from '../assets/images/hero_leather_rolls_1785154192570.jpg';

// ============================================================
// EXISTING BOOK JSON IMPORTS
// ============================================================

import aura647 from './books-json/aura-647.json';
import cinefab651 from './books-json/cinefab-651.json';
import cliff653 from './books-json/cliff-653.json';
import coral from './books-json/coral.json';
import flow424 from './books-json/flow-424.json';
import italianleather422 from './books-json/italian-leather-422.json';
import luxe648 from './books-json/luxe-648.json';
import sand from './books-json/sand.json';
import star from './books-json/star.json';
import ultra649 from './books-json/ultra-649.json';
import nova201 from './books-json/nova-201.json';
import sleek205 from './books-json/sleek-205.json';
import home203 from './books-json/home-203.json';
import kraft204 from './books-json/Kraft-204.json';
import regal202 from './books-json/regal-202.json';
import prime206 from './books-json/prime-206.json';
import velveto207 from './books-json/velveto-207.json';

// ============================================================
// NEW COMING-SOON BOOK JSON IMPORTS
// ============================================================

import aveo412 from './books-json/aveo-412.json';
import studio414 from './books-json/studio-414.json';
import cinematte415 from './books-json/cinematte-415.json';
import noira426 from './books-json/noira-426.json';
import germanleather425 from './books-json/german leather-425.json';
import koreanleather427 from './books-json/korean leather-427.json';
import plush643 from './books-json/plush-643.json';
import urban644 from './books-json/urban-644.json';
import brookley654 from './books-json/brookley-654.json';
import roman655 from './books-json/roman-655.json';
import linen656 from './books-json/linen-656.json';
import luxury657 from './books-json/luxury-657.json';
import rich658 from './books-json/rich-658.json';
import softy659 from './books-json/softy-659.json';
import maple660 from './books-json/maple-660.json';
import casa661 from './books-json/casa-661.json';

// ============================================================
// TYPES
// ============================================================

export interface BookProduct {
  code: string;
  name: string;
  shadeName?: string;
  category?: string;

  // Retail RRP price in INR per meter
  rrp: number;

  unit: string;
  description: string;
  image: string;
  fallbackImage?: string;
  gallery?: string[];

  colors?: {
    name: string;
    hex: string;
  }[];

  specs: {
    thickness?: string;
    width?: string;
    backing?: string;
    finish?: string;
    gsm?: string;
    rollLength?: string;
    abrasion?: string;
  };

  inStock?: boolean;
}

export interface Book {
  slug: string;
  title: string;
  code: string;
  category: string;
  year?: string;
  description: string;
  coverImage: string;
  fallbackCover?: string;
  pdfPath: string;
  designCount: number;

  // Sale price in INR per meter
  salePrice: number;

  specs?: {
    thickness?: string;
    width?: string;
    backing?: string;
    finish?: string;
    targetUse?: string;
  };

  products: BookProduct[];

  // Used for books whose catalogue information is not available yet
  status?: 'available' | 'coming-soon';

  // Optional message shown for coming-soon books
  message?: string;
}

// ============================================================
// HELPERS
// ============================================================

const COMING_SOON_MESSAGE =
  'Detailed information, specifications, colours and swatches for this collection will be available soon.';

/**
 * Converts the lightweight coming-soon JSON files into the
 * complete Book structure used by the existing application.
 */
const createComingSoonBook = (book: {
  id?: string;
  name?: string;
  code?: string;
  title?: string;
  status?: string;
  message?: string;
}): Book => {
  const name = book.name || book.title || 'Collection';
  const id = book.id || `${name.toLowerCase().replace(/\s+/g, '-')}-${book.code}`;

  return {
    slug: id,
    title: book.title || `${name}-${book.code}`,
    code: book.code || '',
    category: 'Rexine & Upholstery',
    year: 'Coming Soon',
    description:
      book.message ||
      COMING_SOON_MESSAGE,
    coverImage: heroLeatherRolls,
    fallbackCover: heroLeatherRolls,
    pdfPath: '',
    designCount: 0,
    salePrice: 0,

    specs: {
      thickness: undefined,
      width: undefined,
      backing: undefined,
      finish: undefined,
      targetUse: undefined,
    },

    products: [],

    status: 'coming-soon',

    message:
      book.message ||
      COMING_SOON_MESSAGE,
  };
};

// ============================================================
// MAIN BOOK DATA
// ============================================================

export const MOCK_BOOKS: Book[] = [
  // ----------------------------------------------------------
  // EXISTING 17 BOOKS
  // ----------------------------------------------------------

  aura647 as Book,
  cinefab651 as Book,
  cliff653 as Book,
  coral as Book,
  flow424 as Book,
  italianleather422 as Book,
  luxe648 as Book,
  sand as Book,
  star as Book,
  ultra649 as Book,
  nova201 as Book,
  regal202 as Book,
  home203 as Book,
  kraft204 as Book,
  sleek205 as Book,
  prime206 as Book,
  velveto207 as Book,

  // ----------------------------------------------------------
  // NEW 16 COMING-SOON BOOKS
  // ----------------------------------------------------------

  createComingSoonBook(aveo412),
  createComingSoonBook(studio414),
  createComingSoonBook(cinematte415),
  createComingSoonBook(noira426),
  createComingSoonBook(germanleather425),
  createComingSoonBook(koreanleather427),
  createComingSoonBook(plush643),
  createComingSoonBook(urban644),
  createComingSoonBook(brookley654),
  createComingSoonBook(roman655),
  createComingSoonBook(linen656),
  createComingSoonBook(luxury657),
  createComingSoonBook(rich658),
  createComingSoonBook(softy659),
  createComingSoonBook(maple660),
  createComingSoonBook(casa661),
];

// ============================================================
// SAMPLE BOOK DATA
// Used by BooksPage.tsx
// ============================================================

export const SAMPLE_BOOKS_DATA = MOCK_BOOKS.map((book) => ({
  id: book.slug,
  slug: book.slug,

  name: book.title,
  title: book.title,

  code: book.code,

  collectionId: book.slug,
  collectionName: book.title.replace(/-\d+$/, ''),

  category: book.category,

  year: book.year || '2026 Master Edition',

  description: book.description,

  coverImage: book.coverImage,
  fallbackCover: book.fallbackCover,

  pdfPath: book.pdfPath,

  totalSwatches: book.designCount,

  designCount: book.designCount,

  salePrice: book.salePrice,

  specs: book.specs,

  products: book.products,

  status: book.status || 'available',

  message: book.message,
}));

// ============================================================
// GET BOOK BY SLUG / ID / CODE
// ============================================================

export const getBookBySlug = (
  slugOrId: string
): Book | undefined => {
  const query = slugOrId.toLowerCase().trim();

  return MOCK_BOOKS.find(
    (book) =>
      book.slug.toLowerCase() === query ||
      book.code.toLowerCase() === query ||
      book.slug.replace(/-/g, '').toLowerCase() ===
        query.replace(/-/g, '')
  );
};

// ============================================================
// GET PRODUCT INSIDE BOOK
// ============================================================

export const getBookProduct = (
  slug: string,
  productCode: string
): {
  book: Book;
  product: BookProduct;
} | undefined => {
  const book = getBookBySlug(slug);

  if (!book) return undefined;

  const codeQuery = productCode.toLowerCase().trim();

  const product = book.products.find(
    (product) =>
      product.code.toLowerCase() === codeQuery
  );

  if (!product) return undefined;

  return {
    book,
    product,
  };
};

// ============================================================
// GET RELATED PRODUCTS
// ============================================================

export const getRelatedProducts = (
  slug: string,
  currentProductCode: string,
  limit = 4
): BookProduct[] => {
  const book = getBookBySlug(slug);

  if (!book) return [];

  return book.products
    .filter(
      (product) =>
        product.code.toLowerCase() !==
        currentProductCode.toLowerCase()
    )
    .slice(0, limit);
};