import React from 'react';
import { CustomizerSection } from '../components/CustomizerSection';
import { Sparkles, Shield, RefreshCw, CheckCircle2 } from 'lucide-react';
import { Product } from '../types';
import { SEO } from '../components/SEO';
import { SEO_DATA } from '../data/seoData';

interface CustomizerPageProps {
  onOpenEnquiry: (product?: Product | null) => void;
}

export const CustomizerPage: React.FC<CustomizerPageProps> = ({ onOpenEnquiry }) => {
  return (
    <>
    <SEO
  title={SEO_DATA.customizer.title}
  description={SEO_DATA.customizer.description}
  keywords={SEO_DATA.customizer.keywords}
/>
    <div className="bg-[#F8F6F2] min-h-screen pt-8 pb-20">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8 text-center max-w-3xl mx-auto">
          <span className="font-button text-xs font-bold uppercase tracking-[0.2em] text-[#C67C4E] block mb-2">
            Interactive Rexine Studio
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#111111] mb-3">
            Customize, Preview & Spec Your Rexine
          </h1>
          <p className="font-sans text-sm sm:text-base text-gray-600 leading-relaxed">
            Experiment with different grain textures, finishes, backing materials, and colors in real-time. Order exact customized sample swatches sent to your studio or factory.
          </p>
        </div>

        {/* Embedded Interactive Customizer Section */}
        <div className="bg-white rounded-3xl p-4 sm:p-8 border border-gray-200 shadow-xl mb-12">
          <CustomizerSection onOpenEnquiry={() => onOpenEnquiry(null)} />
        </div>

        {/* Technical Specs Explanation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#C67C4E] flex items-center justify-center mb-4">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-gray-900 mb-2">
              Bespoke Embossing
            </h3>
            <p className="font-sans text-xs text-gray-600 leading-relaxed">
              We offer over 150+ steel roller embossing patterns ranging from subtle Nappa and Pebble to geometric diamond quilting and exotic reptile grains.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#C67C4E] flex items-center justify-center mb-4">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-gray-900 mb-2">
              Performance Treatments
            </h3>
            <p className="font-sans text-xs text-gray-600 leading-relaxed">
              Specify custom topcoat performance treatments including Anti-fungal, Hydrophobic water repellency, UV fade resistance, and Flame Retardance (FR).
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#C67C4E] flex items-center justify-center mb-4">
              <RefreshCw className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-gray-900 mb-2">
              Color Matching Lab
            </h3>
            <p className="font-sans text-xs text-gray-600 leading-relaxed">
              Send us your Pantone code or physical sample chip. Our spectrophotometer lab matches custom roll colors within 48 hours for bulk orders.
            </p>
          </div>
        </div>

      </div>
    </div>
    </>
  );
};
