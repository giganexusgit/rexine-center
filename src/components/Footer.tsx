import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import logoWhite from '../assets/rexine-logo-white.png';
import { APPLICATIONS } from "../data/mockData";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#111111] text-white pt-14 pb-8 border-t border-white/10 text-xs font-sans">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Top Footer Columns Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8">

          {/* Column 1: Brand Info (2 cols width on lg) */}
          <div className="col-span-2 lg:col-span-2 space-y-4">
            <div>
              <Link to="/" className="inline-block py-1">
                <img src={logoWhite} alt="Rexine Centre" className="h-24" />
              </Link>
            </div>

            <p className="text-gray-400 text-xs leading-relaxed max-w-xs">
              Leading manufacturer and supplier of premium rexine for diverse industries across India. Crafted with precision, designed for perfection.
            </p>

            <div className="space-y-2 text-xs text-gray-300">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#C67C4E]" />
                <span>+91 81040 19890</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#C67C4E]" />
                <span>info@rexinecentre.com</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C67C4E] mt-0.5 shrink-0" />
                <span>B-21-4, Kismat Nagar, Maqsood Estate, CST Road, Kurla West, Mumbai, Maharashtra 400070, India</span>
              </div>
            </div>

            {/* Chat with us WhatsApp button */}
            <div className="pt-2">
              <a
                href="https://wa.me/918104019890"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white px-3.5 py-2 rounded-lg font-button text-[10px] font-bold uppercase tracking-wider hover:bg-[#1eb857] transition-colors"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Chat with us on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Column 2: PRODUCTS */}
          <div className="space-y-3">
            <h4 className="font-button text-[11px] font-bold uppercase tracking-wider text-white">
              PRODUCTS
            </h4>
            <ul className="space-y-1.5 text-gray-400 text-[11px]">
              <li><Link to="/applications" className="hover:text-white transition-colors">Sofa Rexine</Link></li>
              <li><Link to="/applications" className="hover:text-white transition-colors">Automotive Rexine</Link></li>
              <li><Link to="/applications" className="hover:text-white transition-colors">PU Leather</Link></li>
              <li><Link to="/applications" className="hover:text-white transition-colors">PVC Leather</Link></li>
              <li><Link to="/applications" className="hover:text-white transition-colors">Office Chair Rexine</Link></li>
              <li><Link to="/applications" className="hover:text-white transition-colors">Hospitality Rexine</Link></li>
              <li><Link to="/applications" className="hover:text-white transition-colors">Gym Rexine</Link></li>
              <li><Link to="/applications" className="hover:text-white transition-colors">Fire Retardant Rexine</Link></li>
              <li><Link to="/books" className="hover:text-[#C67C4E] font-bold transition-colors">Sample Books Catalogue</Link></li>
            </ul>
          </div>

          {/* Column 3: APPLICATIONS (Independent URL query parameter routing) */}
          <div className="space-y-3">
            <h4 className="font-button text-[11px] font-bold uppercase tracking-wider text-white">
              APPLICATIONS
            </h4>
            <ul className="space-y-1.5 text-gray-400 text-[11px]">
              {APPLICATIONS.map((app) => (
                <li key={app.id}>
                  <Link
                    to={`/applications/${app.id}`}
                    className="hover:text-white transition-colors block"
                  >
                    {app.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: RESOURCES */}
          <div className="space-y-3">
            <h4 className="font-button text-[11px] font-bold uppercase tracking-wider text-white">
              RESOURCES
            </h4>
            <ul className="space-y-1.5 text-gray-400 text-[11px]">
              <li><Link to="/resources" className="hover:text-white transition-colors">Blog & News</Link></li>
              <li><Link to="/resources" className="hover:text-white transition-colors">Buying Guide</Link></li>
              <li><Link to="/resources" className="hover:text-white transition-colors">Care & Maintenance</Link></li>
              <li><Link to="/customizer" className="hover:text-white transition-colors">Customizer Studio</Link></li>
              <li><Link to="/resources" className="hover:text-white transition-colors">Catalog Download</Link></li>
              <li><Link to="/resources" className="hover:text-white transition-colors">FAQs</Link></li>
              <li><Link to="/resources" className="hover:text-white transition-colors">Video Gallery</Link></li>
            </ul>
          </div>

          {/* Column 5: COMPANY */}
          <div className="space-y-3">
            <h4 className="font-button text-[11px] font-bold uppercase tracking-wider text-white">
              COMPANY
            </h4>
            <ul className="space-y-1.5 text-gray-400 text-[11px]">
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Our Factory</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Quality Assurance</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Certifications</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Sustainability</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/sitemap" className="hover:text-[#C67C4E] font-bold transition-colors">Sitemap</Link></li>
            </ul>
          </div>

          {/* Column 6: SUPPLY ACROSS INDIA */}
          <div className="space-y-3">
            <h4 className="font-button text-[11px] font-bold uppercase tracking-wider text-white">
              SUPPLY INDIA
            </h4>
            <ul className="space-y-1.5 text-gray-400 text-[11px]">
             <li>
  <Link to="/rexine-supplier/maharashtra" className="hover:text-white transition-colors">
    Maharashtra
  </Link>
</li>

<li>
  <Link to="/rexine-supplier/gujarat" className="hover:text-white transition-colors">
    Gujarat
  </Link>
</li>

<li>
  <Link to="/rexine-supplier/delhi" className="hover:text-white transition-colors">
    Delhi NCR
  </Link>
</li>

<li>
  <Link to="/rexine-supplier/karnataka" className="hover:text-white transition-colors">
    Karnataka
  </Link>
</li>

<li>
  <Link to="/rexine-supplier/tamil-nadu" className="hover:text-white transition-colors">
    Tamil Nadu
  </Link>
</li>

<li>
  <Link to="/rexine-supplier/punjab" className="hover:text-white transition-colors">
    Punjab
  </Link>
</li>

<li>
  <Link to="/rexine-supplier/rajasthan" className="hover:text-white transition-colors">
    Rajasthan
  </Link>
</li>

<li>
  <Link to="/rexine-supplier/uttar-pradesh" className="hover:text-white transition-colors">
    Uttar Pradesh
  </Link>
</li>            </ul>
          </div>

        </div>

        {/* Popular Cities SEO Footer Bar */}
        <div className="pt-8 mt-8 border-t border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-button text-[10px] font-bold text-[#C67C4E] uppercase tracking-widest">
              POPULAR CITIES WHOLESALE REXINE SUPPLY
            </span>
            <Link to="/supply-locations" className="text-[10px] font-button font-bold text-gray-400 hover:text-white uppercase tracking-wider">
              Explore All Cities →
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-gray-400">
           {[
  { name: 'Mumbai', state: 'maharashtra' },
  { name: 'Pune', state: 'maharashtra' },
  { name: 'Surat', state: 'gujarat' },
  { name: 'Ahmedabad', state: 'gujarat' },
  { name: 'Delhi', state: 'delhi' },
  { name: 'Gurgaon', state: 'delhi' },
  { name: 'Noida', state: 'delhi' },
  { name: 'Bangalore', state: 'karnataka' },
  { name: 'Chennai', state: 'tamil-nadu' },
  { name: 'Coimbatore', state: 'tamil-nadu' },
  { name: 'Hyderabad', state: 'telangana' },
  { name: 'Jaipur', state: 'rajasthan' },
  { name: 'Jodhpur', state: 'rajasthan' },
  { name: 'Ludhiana', state: 'punjab' },
  { name: 'Jalandhar', state: 'punjab' },
  { name: 'Lucknow', state: 'uttar-pradesh' },
  { name: 'Kanpur', state: 'uttar-pradesh' },
  { name: 'Kolkata', state: 'west-bengal' },
  { name: 'Nagpur', state: 'maharashtra' },
  { name: 'Nashik', state: 'maharashtra' },
  { name: 'Vadodara', state: 'gujarat' },
  { name: 'Rajkot', state: 'gujarat' },
  { name: 'Bhiwandi', state: 'maharashtra' },
  { name: 'Indore', state: 'madhya-pradesh' },
  { name: 'Bhopal', state: 'madhya-pradesh' },
  { name: 'Patna', state: 'bihar' }
].map((city, idx, arr) => (
  <React.Fragment key={idx}>
    <Link
      to={`/rexine-supplier/${city.state}/${city.name.toLowerCase().replace(/\s+/g, '-')}`}
      className="hover:text-white hover:underline transition-colors"
    >
      {city.name} Rexine
    </Link>

    {idx < arr.length - 1 && (
      <span className="text-gray-700">•</span>
    )}
  </React.Fragment>
))}          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-gray-400 text-[11px] gap-4">
          <p>© 2026 Rexine Centre. All rights reserved.</p>

          <p className="whitespace-nowrap">MANAGED BY GIGA NEXUS TECHNOLOGY</p>

          <div className="flex flex-nowrap items-center gap-1.5 whitespace-nowrap text-[10px] sm:text-[11px]">
            <Link
              to="/sitemap"
              className="hover:text-white transition-colors font-semibold text-gray-300"
            >
              Sitemap
            </Link>
            <span>|</span>
            <Link to="/contact" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span>|</span>
            <Link to="/contact" className="hover:text-white transition-colors">
              Terms & Conditions
            </Link>
            <span>|</span>
            <Link to="/contact" className="hover:text-white transition-colors">
              Refund Policy
            </Link>
          </div>
        </div>

        {/* Google reCAPTCHA v3 Compliance Notice */}
        <div className="pt-3 text-center text-gray-600 text-[9px] font-sans">
          This site is protected by reCAPTCHA and the Google{' '}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-200 underline"
          >
            Privacy Policy
          </a>{' '}
          and{' '}
          <a
            href="https://policies.google.com/terms"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-200 underline"
          >
            Terms of Service
          </a>{' '}
          apply.
        </div>


      </div>
    </footer>
  );
};