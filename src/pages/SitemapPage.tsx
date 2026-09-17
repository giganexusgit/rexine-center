import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Map,
  ChevronRight,
  Layers,
  BookOpen,
  Briefcase,
  Sliders,
  FileText,
  Building2,
  MapPin,
  Search,
  ExternalLink,
  QrCode,
  ShieldCheck,
  Phone,
  Mail,
  ArrowRight
} from 'lucide-react';
import { SAMPLE_BOOKS_DATA, BRAND_COLLECTIONS } from '../data/booksData';
import { SEO } from '../components/SEO';
import { SEO_DATA } from '../data/seoData';

interface SitemapPageProps {
  onOpenEnquiry?: (product?: any) => void;
}

export const SitemapPage: React.FC<SitemapPageProps> = ({ onOpenEnquiry }) => {
  const navigate = useNavigate();
  const [filterQuery, setFilterQuery] = useState('');

  const siteSections = [
    {
      id: 'main-navigation',
      title: 'Main Navigation & Portals',
      icon: Map,
      description: 'Primary portal entry points and interactive applications across the platform.',
      links: [
        { name: 'Home Page', path: '/', badge: 'Primary' },
        { name: 'All Rexine Collections', path: '/collections', badge: 'Catalog' },
        { name: 'Physical Sample Books Index', path: '/books', badge: 'Swatches' },
        { name: 'Industry Applications', path: '/applications', badge: 'Solutions' },
        { name: 'Customizer Studio & Visualizer', path: '/customizer', badge: 'Interactive' },
        { name: 'Resources, Blog & Guides', path: '/resources', badge: 'Knowledge' },
        { name: 'About Rexine Centre', path: '/about', badge: 'Company' },
        { name: 'Contact & Bulk Inquiries', path: '/contact', badge: 'Support' },
        { name: 'Pan-India Supply Locations', path: '/supply-locations', badge: 'Logistics' },
      ],
    },
    {
      id: 'rexine-collections',
      title: 'Rexine Collections & Material Grades',
      icon: Layers,
      description: 'Explore full product lines by material composition, texture, and durability class.',
      links: BRAND_COLLECTIONS.map((brand) => ({
        name: `${brand.name} Collection (${brand.tagline})`,
        path: `/collections?category=${brand.id}`,
        badge: brand.id.toUpperCase(),
      })).concat([
        { name: 'Sofa & Upholstery Rexine', path: '/collections?category-[#111111]', badge: 'Furniture' },
        { name: 'Automotive Grade Leatherette', path: '/collections', badge: 'Auto' },
        { name: 'PU Leather (Polyurethane)', path: '/collections', badge: 'Premium' },
        { name: 'PVC Leather (Vinyl)', path: '/collections', badge: 'Durable' },
        { name: 'Office Chair & Executive Seating', path: '/collections', badge: 'Commercial' },
        { name: 'Fire Retardant & Heavy Duty', path: '/collections', badge: 'Certified' },
      ]),
    },
    {
      id: 'sample-books',
      title: 'Physical Sample Books with QR Code',
      icon: BookOpen,
      description: 'Master sample binders supplied to architects, dealers, and upholstery workshops.',
      links: SAMPLE_BOOKS_DATA.map((book) => ({
        name: `${book.name} (Book Code: ${book.code})`,
        path: `/books/${book.id}`,
        badge: `${book.totalSwatches} Swatches`,
      })),
    },
    {
      id: 'applications-industries',
      title: 'Applications & Sector Solutions',
      icon: Briefcase,
      description: 'Tailored rexine solutions optimized for specific industrial performance requirements.',
      links: [
        { name: 'Automotive Interiors & Seat Covers', path: '/applications', badge: 'Auto' },
        { name: 'Furniture & Living Upholstery', path: '/applications', badge: 'Home' },
        { name: 'Office Chairs & Corporate Spaces', path: '/applications', badge: 'Office' },
        { name: 'Hospitality, Hotels & Restaurants', path: '/applications', badge: 'Hotel' },
        { name: 'Marine & Outdoor Water-Resistant', path: '/applications', badge: 'Marine' },
        { name: 'Healthcare & Antimicrobial Seating', path: '/applications', badge: 'Medical' },
        { name: 'Educational Institutions & Auditoriums', path: '/applications', badge: 'Public' },
        { name: 'Gym Equipment & Heavy Impact', path: '/applications', badge: 'Fitness' },
      ],
    },
    {
      id: 'interactive-tools',
      title: 'Interactive Tools & Downloads',
      icon: Sliders,
      description: 'Digital tools to customize, simulate, scan, and order physical samples.',
      links: [
        { name: 'Virtual Rexine Customizer Studio', path: '/customizer', badge: '3D Render' },
        { name: 'Physical Sample Book QR Scanner', path: '/resources', badge: 'QR Tool' },
        { name: 'Rexine Buying & Selection Guide', path: '/resources', badge: 'PDF' },
        { name: 'Care & Maintenance Instructions', path: '/resources', badge: 'Guide' },
        { name: 'Master Product Catalog Download', path: '/resources', badge: 'Download' },
        { name: 'Frequently Asked Questions (FAQs)', path: '/resources', badge: 'Help' },
      ],
    },
    {
      id: 'supply-locations',
      title: 'Pan-India Wholesale Supply Hubs',
      icon: MapPin,
      description: 'Key states and major commercial hubs served directly from Surat manufacturing facility.',
      links: [
        { name: 'Maharashtra (Mumbai, Pune, Nagpur, Nashik, Bhiwandi)', path: '/supply-locations?state=maharashtra', badge: 'Major Hub' },
        { name: 'Gujarat (Surat, Ahmedabad, Vadodara, Rajkot)', path: '/supply-locations?state=gujarat', badge: 'Factory Hub' },
        { name: 'Delhi NCR (Delhi, Gurgaon, Noida, Faridabad)', path: '/supply-locations?state=delhi', badge: 'North Hub' },
        { name: 'Karnataka (Bangalore, Mysore, Hubli)', path: '/supply-locations?state=karnataka', badge: 'South Hub' },
        { name: 'Tamil Nadu (Chennai, Coimbatore, Madurai)', path: '/supply-locations?state=tamil-nadu', badge: 'South Hub' },
        { name: 'Punjab (Ludhiana, Jalandhar, Amritsar)', path: '/supply-locations?state=punjab', badge: 'North Hub' },
        { name: 'Rajasthan (Jaipur, Jodhpur, Udaipur)', path: '/supply-locations?state=rajasthan', badge: 'West Hub' },
        { name: 'Uttar Pradesh (Lucknow, Kanpur, Agra)', path: '/supply-locations?state=uttar-pradesh', badge: 'Central Hub' },
      ],
    },
    {
      id: 'company-legal',
      title: 'Company Information & Policies',
      icon: Building2,
      description: 'Corporate overview, quality certifications, manufacturing facility, and legal terms.',
      links: [
        { name: 'About Rexine Centre', path: '/about', badge: 'Company' },
        { name: 'Manufacturing Factory & Infrastructure', path: '/about', badge: 'Facility' },
        { name: 'ISO & Fire Safety Certifications', path: '/about', badge: 'Standards' },
        { name: 'Sustainability & Eco Practices', path: '/about', badge: 'Green' },
        { name: 'Contact & Factory Address', path: '/contact', badge: 'Address' },
        { name: 'Privacy Policy', path: '/contact', badge: 'Legal' },
        { name: 'Terms & Conditions', path: '/contact', badge: 'Legal' },
        { name: 'Refund & Return Policy', path: '/contact', badge: 'Legal' },
      ],
    },
  ];

  // Filter sections based on user search query
  const filteredSections = siteSections.map((section) => {
    const matchesSectionTitle = section.title.toLowerCase().includes(filterQuery.toLowerCase());
    const matchedLinks = section.links.filter(
      (link) =>
        matchesSectionTitle ||
        link.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
        link.badge.toLowerCase().includes(filterQuery.toLowerCase())
    );
    return { ...section, links: matchedLinks };
  }).filter((section) => section.links.length > 0);

  return (
    <>
    <SEO
  title={SEO_DATA.sitemap.title}
  description={SEO_DATA.sitemap.description}
  keywords={SEO_DATA.sitemap.keywords}
/>
    <div className="bg-[#F8F6F2] min-h-screen pt-6 pb-28">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-button uppercase tracking-wider text-gray-500 mb-6">
          <Link to="/" className="hover:text-[#C67C4E] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-[#C67C4E] font-bold">Sitemap</span>
        </div>

        {/* HERO BANNER */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-sm mb-10 relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 bg-[#111111] text-white px-3.5 py-1.5 rounded-full text-xs font-button font-bold uppercase tracking-widest shadow-xs">
              <Map className="w-3.5 h-3.5 text-[#C67C4E]" />
              <span>Complete Website Architecture</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#111111] leading-tight">
              Rexine Centre Sitemap
            </h1>

            <p className="font-sans text-sm sm:text-base text-gray-600 leading-relaxed">
              Navigate all collections, physical sample books, industrial application guides, customizer visualizers, and pan-India wholesale supply hubs from a single unified directory.
            </p>

            {/* Quick Search Filter */}
            <div className="pt-2 relative max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search sitemap e.g. Velvet, D'Decor, Mumbai, Customizer..."
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-sans focus:outline-none focus:ring-2 focus:ring-[#C67C4E] shadow-inner"
              />
              {filterQuery && (
                <button
                  onClick={() => setFilterQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-700"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* QUICK STATS BAR */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#C67C4E]/10 text-[#C67C4E] flex items-center justify-center shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="font-serif text-lg font-bold text-[#111111]">6 Master</div>
              <div className="text-[11px] font-button text-gray-500 uppercase tracking-wider">Collections</div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="font-serif text-lg font-bold text-[#111111]">168 Swatches</div>
              <div className="text-[11px] font-button text-gray-500 uppercase tracking-wider">Across 6 Sample Books</div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <div className="font-serif text-lg font-bold text-[#111111]">9 Sectors</div>
              <div className="text-[11px] font-button text-gray-500 uppercase tracking-wider">Industrial Uses</div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="font-serif text-lg font-bold text-[#111111]">26+ Cities</div>
              <div className="text-[11px] font-button text-gray-500 uppercase tracking-wider">Wholesale Locations</div>
            </div>
          </div>
        </div>

        {/* SITEMAP SECTIONS GRID */}
        {filteredSections.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {filteredSections.map((section) => {
              const Icon = section.icon;
              return (
                <div
                  key={section.id}
                  className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div>
                    {/* Section Header */}
                    <div className="flex items-start gap-3.5 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-[#111111] text-[#C67C4E] flex items-center justify-center shrink-0 shadow-sm">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h2 className="font-serif text-xl font-bold text-[#111111]">
                          {section.title}
                        </h2>
                        <p className="font-sans text-xs text-gray-500 mt-0.5">
                          {section.description}
                        </p>
                      </div>
                    </div>

                    <hr className="my-4 border-gray-100" />

                    {/* Links List */}
                    <ul className="space-y-2.5">
                      {section.links.map((link, idx) => (
                        <li key={idx}>
                          <Link
                            to={link.path}
                            className="group flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F8F6F2] transition-colors border border-transparent hover:border-gray-200/80"
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#C67C4E] group-hover:scale-150 transition-transform" />
                              <span className="font-sans text-xs font-semibold text-gray-800 group-hover:text-[#C67C4E] transition-colors">
                                {link.name}
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              <span className="text-[9px] font-button font-bold text-gray-500 group-hover:text-[#C67C4E] bg-gray-100 group-hover:bg-[#C67C4E]/10 uppercase tracking-wider px-2 py-0.5 rounded-md transition-colors">
                                {link.badge}
                              </span>
                              <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#C67C4E] group-hover:translate-x-0.5 transition-all" />
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-200 shadow-sm mb-16 max-w-md mx-auto space-y-4">
            <Search className="w-10 h-10 text-gray-300 mx-auto" />
            <h3 className="font-serif text-lg font-bold text-gray-900">No Matching Links</h3>
            <p className="font-sans text-xs text-gray-500">
              No pages or links matched "{filterQuery}".
            </p>
            <button
              onClick={() => setFilterQuery('')}
              className="bg-[#111111] text-white px-5 py-2 rounded-full font-button text-xs font-bold uppercase tracking-wider"
            >
              Reset Search
            </button>
          </div>
        )}

        {/* QUICK CONTACT BANNER */}
        <div className="bg-[#111111] text-white rounded-3xl p-6 sm:p-10 border border-white/10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 bg-[#C67C4E]/20 text-[#C67C4E] px-3 py-1 rounded-full text-[10px] font-button font-bold uppercase tracking-widest border border-[#C67C4E]/30">
              <Phone className="w-3.5 h-3.5" />
              <span>Wholesale Support & Dealer Inquiries</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Need Direct Custom Swatches or Bulk Factory Quotes?
            </h3>
            <p className="font-sans text-xs text-gray-300">
              Our Surat factory desk assists architects, dealers, and OEM manufacturers with physical sample binders and custom roll production.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/contact"
              className="bg-[#C67C4E] hover:bg-[#b06a3d] text-white px-5 py-3 rounded-full font-button text-xs font-bold uppercase tracking-wider transition-colors shadow-md"
            >
              Contact Factory Desk
            </Link>
          </div>
        </div>

      </div>
    </div>
    </>
  );
};
