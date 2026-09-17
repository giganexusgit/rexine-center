import React from 'react';
import { aboutInteriorDining, heroLeatherRolls, leatherSwatchesStacked } from '../data/mockData';
import { ShieldCheck, Award, Factory, Users, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import OurClients from '../components/OurClients';
import { SEO } from '../components/SEO';
import { SEO_DATA } from '../data/seoData';

interface AboutPageProps {
  onOpenEnquiry: (product?: Product | null) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenEnquiry }) => {
  return (
    <>
    <SEO
    title={SEO_DATA.about.title}
    description={SEO_DATA.about.description}
    keywords={SEO_DATA.about.keywords}
    />
    
    <div className="bg-[#F8F6F2] min-h-screen pt-8 pb-20">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-6 space-y-6">
            <span className="font-button text-xs font-bold uppercase tracking-[0.2em] text-[#C67C4E]">
              Over 25+ Years of Excellence
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#111111] leading-tight">
              Pioneering Synthetic Leather Solutions Across India
            </h1>
            <p className="font-sans text-sm sm:text-base text-gray-600 leading-relaxed">
              Founded in 1998, REXINE Premium Solutions has grown into India's leading manufacturer and wholesale distributor of engineered synthetic hides, leatherettes, and specialized PVC sheets.
            </p>
            <p className="font-sans text-sm text-gray-600 leading-relaxed">
              We serve over 1000+ commercial clients across furniture manufacturing, automotive OEM, hospitality design, marine seating, and public infrastructure.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
              <div>
                <span className="font-serif text-3xl font-bold text-[#111111] block">25+</span>
                <span className="font-button text-[10px] font-bold text-gray-500 uppercase tracking-wider">Years Experience</span>
              </div>
              <div>
                <span className="font-serif text-3xl font-bold text-[#C67C4E] block">1000+</span>
                <span className="font-button text-[10px] font-bold text-gray-500 uppercase tracking-wider">Happy Clients</span>
              </div>
              <div>
                <span className="font-serif text-3xl font-bold text-[#111111] block">28+</span>
                <span className="font-button text-[10px] font-bold text-gray-500 uppercase tracking-wider">States Covered</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[420px] border border-gray-200">
              <img
                src={aboutInteriorDining}
                alt="Rexine Interior Factory Showcase"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20">
                <span className="font-button text-[10px] font-bold uppercase tracking-wider text-[#C67C4E] block mb-1">
                  Manufacturing Hub
                </span>
                <p className="font-serif text-sm font-semibold">
                  State-of-the-art coating & embossing machinery delivering over 500,000 meters monthly.
                </p>
              </div>
            </div>
          </div>
      <OurClients />
        </div>

        {/* Our Core Values & Certification Standards */}
        <div className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="font-button text-xs font-bold uppercase tracking-[0.2em] text-[#C67C4E] block mb-2">
              Why Choose REXINE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#111111]">
              Uncompromising Quality Standards
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-[#C67C4E] flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-xl text-gray-900">
                Martindale Abrasion Tested
              </h3>
              <p className="font-sans text-xs text-gray-600 leading-relaxed">
                Every batch undergoes rigorous 100,000+ rub testing to guarantee zero peeling, cracking, or surface degradation over heavy commercial usage.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-[#C67C4E] flex items-center justify-center">
                <Factory className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-xl text-gray-900">
                In-House Coating Lines
              </h3>
              <p className="font-sans text-xs text-gray-600 leading-relaxed">
                Direct control over PVC release paper casting, PU topcoat formulations, and backing fabric lamination ensures uniform GSM and roll consistency.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-[#C67C4E] flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-xl text-gray-900">
                Eco-Conscious Formulations
              </h3>
              <p className="font-sans text-xs text-gray-600 leading-relaxed">
                Phthalate-free, low-VOC coatings complying with REACH standards, engineered to reduce water consumption compared to traditional tanning.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="bg-[#111111] text-white rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl max-w-4xl mx-auto">
          <span className="font-button text-xs font-bold uppercase tracking-[0.2em] text-[#C67C4E] block mb-3">
            Partner With Us
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4">
            Become an Authorized Dealer or Bulk Wholesale Partner
          </h2>
          <p className="font-sans text-sm text-gray-300 max-w-xl mx-auto mb-6 leading-relaxed">
            Get physical swatch sample books delivered directly to your showroom, design office, or manufacturing facility.
          </p>
          <button
            onClick={() => onOpenEnquiry(null)}
            className="bg-[#C67C4E] hover:bg-[#b06a3d] text-white px-8 py-3.5 rounded-full font-button text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2.5 transition-all shadow-lg"
          >
            <span>Contact Wholesale Team</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
    </>
  );
};
