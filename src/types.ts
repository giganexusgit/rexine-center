export interface Product {
  id: string;
  code: string;
  name: string;
  category: string;
  subCategory?: string;
  collectionId?: string;
  collectionName?: string;
  bookId?: string;
  bookTitle?: string;
  shadeName?: string;
  rrp?: number; // Retail Price ONLY
  unit: string;
  description: string;
  image: string;
  colors: { name: string; hex: string; image?: string }[];
  specs: {
    thickness?: string;
    width?: string;
    backing?: string;
    finish?: string;
    gsm?: string;
    rollLength?: string;
    abrasion?: string;
  };
  featured?: boolean;
  isNew?: boolean;
  inStock?: boolean;
}

export interface BrandCollection {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  accentColor?: string;
  totalBooks: number;
}

export interface FeaturedCollection {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  designs: string;
  image: string;
  accentColor?: string;
}

export interface CategoryItem {
  id: string;
  title: string;
  count: string;
  image: string;
  iconName: string;
  description: string;
}

export interface SampleBook {
  id: string;
  slug: string;
  code: string;
  name: string;
  collectionId?: string;
  collectionName?: string;
  category: string;
  year?: string;
  description?: string;
  totalSwatches: number;
  coverImage: string;
  qrCodeUrl: string;
  status?: 'available' | 'coming-soon';
  message?: string;
  specs?: {
    thickness?: string;
    width?: string;
    backing?: string;
    finish?: string;
    targetUse?: string;
  };
}

export interface IndustryItem {
  id: string;
  title: string;
  iconName: string;
  image: string;
  description: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company?: string;
  rating: number;
  avatar: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface EnquiryData {
  productCode?: string;
  productName?: string;
  selectedColor?: string;
  quantity?: string;
  userType?: 'Retailer' | 'Architect' | 'Manufacturer' | 'End User' | 'Other';
  name: string;
  phone: string;
  city: string;
  message: string;
}
