import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { APPLICATIONS } from '../data/mockData';
import { ArrowRight, Check, ShieldCheck, Flame, Sun, Droplets, Sparkles, Building, Car, Sofa, Wrench } from 'lucide-react';
import { Product } from '../types';
import officeUse from '../assets/images/office-use.png';
import { SEO } from '../components/SEO';
import { SEO_DATA } from '../data/seoData';

interface ApplicationsPageProps {
  onOpenEnquiry: (product?: Product | null) => void;
}

const INDUSTRY_ICONS = [Car, Sofa, Building, Sparkles, Droplets, Wrench];

const INDUSTRY_DETAILS = APPLICATIONS.map((app, index) => {
  let customDetails = {
    keySpecs: ['High Durability & Abrasion Resistance', 'UV & Fade Resistance', 'Tear & Puncture Proof', 'Easy Clean Surface'],
    suitableFor: ['Commercial Projects', 'Residential Applications'],
    recommendedSeries: `${app.title} Master Series`
  };

  if (index === 0 || app.id === 'automotive') {
    customDetails = {
      keySpecs: ['100,000+ Martindale Rubs', 'UV & Fade Resistance (Grade 7)', 'Cold Crack Resistant to -20°C', 'Low Odor Auto Specification'],
      suitableFor: ['Car Seat Covers', 'Dashboard Wraps', 'Door Trim Panels', 'Headliners', 'Commercial Bus Seating'],
      recommendedSeries: 'Quilted Diamond & Supreme Auto-Grade'
    };
  } else if (index === 1 || app.id === 'furniture') {
    customDetails = {
      keySpecs: ['Pebble & Litchi Grain Emboss', 'Breathable Cotton Backing', 'Stain Guard & Hydrophobic Coating', 'High Tear Strength'],
      suitableFor: ['Luxury Sofas', 'Recliners', 'Dining Chairs', 'Bed Headboards', 'Ottomans'],
      recommendedSeries: 'Pebble Grain & Nappa Finish'
    };
  } else if (index === 2 || app.id === 'office') {
    customDetails = {
      keySpecs: ['Satin Smooth Nappa Finish', 'Sweat & Friction Resistant', 'Flame Retardant (BS 5852)', 'Easy Wipe Surface'],
      suitableFor: ['Executive Task Chairs', 'Conference Room Chairs', 'Acoustic Wall Panels', 'Lobby Seating'],
      recommendedSeries: 'Nappa Finish 1.2mm'
    };
  } else if (index === 3 || app.id === 'hospitality') {
    customDetails = {
      keySpecs: ['Fire Retardant (CAL 117 / BS 5852)', 'Alcohol & Disinfectant Wipeable', 'Antimicrobial Surface Treatment', '150,000 Rub Count'],
      suitableFor: ['Restaurant Booths', 'Hotel Lounge Chairs', 'Bar Stools', 'Club VIP Wall Paneling'],
      recommendedSeries: 'Milano Master Collection'
    };
  } else if (index === 4 || app.id === 'marine') {
    customDetails = {
      keySpecs: ['100% Saltwater Waterproof', 'Mildew & Mold Inhibitor', 'Pink Stain Resistant', 'High Sun Reflective Index'],
      suitableFor: ['Yacht Deck Loungers', 'Boat Helm Seats', 'Resort Outdoor Daybeds', 'Poolside Lounges'],
      recommendedSeries: 'Marine Guard Vinyl Sheets'
    };
  } else if (index === 5 || app.id === 'healthcare') {
    customDetails = {
      keySpecs: ['ISO 10993 Cytotoxicity Passed', 'Bleach Cleanable 1:10 ratio', 'Phthalate Free & Low VOC', 'Zero Cracking Surface'],
      suitableFor: ['Hospital Beds', 'Examination Tables', 'Dentist Chairs', 'Physiotherapy Benches'],
      recommendedSeries: 'MediClean PVC Series'
    };
  }

  // Fallback map for local image overrides (like officeUse import)
  let imageSource = app.image;
  if (index === 2 || app.id === 'office') {
    imageSource = officeUse;
  }

  return {
    id: app.id || `industry-${index}`,
    title: app.title,
    tagline: app.description,
    icon: INDUSTRY_ICONS[index] || Sparkles,
    image: imageSource,
    ...customDetails
  };
});
export const ApplicationsPage: React.FC<ApplicationsPageProps> = ({ onOpenEnquiry }) => {
  const { applicationId } = useParams<{ applicationId: string }>();

  const initialApp =
    INDUSTRY_DETAILS.find((app) => app.id === applicationId) ||
    INDUSTRY_DETAILS[0];

  const [selectedApp, setSelectedApp] = useState(initialApp);
  return (
    <>  
    <SEO
  title={SEO_DATA.applications.title}
  description={SEO_DATA.applications.description}
  keywords={SEO_DATA.applications.keywords}
/>
    <div className="bg-[#F8F6F2] min-h-screen pt-8 pb-20">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Title */}
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <span className="font-button text-xs font-bold uppercase tracking-[0.2em] text-[#C67C4E] block mb-2">
            Industry Solutions
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#111111] mb-4">
            Engineered for Every Application
          </h1>
          <p className="font-sans text-sm sm:text-base text-gray-600 leading-relaxed">
            Our synthetic leather solutions meet strict international rub counts, fire retardance standards, and environmental certifications across automotive, marine, hospitality, and furniture sectors.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          {INDUSTRY_DETAILS.map((item) => {
            const Icon = item.icon;
            const isSelected = selectedApp.id === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedApp(item)}
                className={`p-4 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-[#111111] text-white border-[#111111] shadow-lg scale-102'
                    : 'bg-white text-gray-800 border-gray-200 hover:border-[#C67C4E] hover:shadow-md'
                }`}
              >
                <Icon className={`w-6 h-6 ${isSelected ? 'text-[#C67C4E]' : 'text-gray-500'}`} />
                <span className="font-button text-xs font-bold uppercase tracking-wider">
                  {item.title.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Detailed Application Spotlight */}
        <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-10 shadow-xl mb-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="font-button text-xs font-bold uppercase tracking-[0.2em] text-[#C67C4E]">
              Industry Profile
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#111111]">
              {selectedApp.title}
            </h2>
            <p className="font-sans text-sm text-gray-600 leading-relaxed">
              {selectedApp.tagline}
            </p>

            {/* Key Specs Checklist */}
            <div className="space-y-3 pt-2">
              <h4 className="font-button text-xs font-bold uppercase tracking-wider text-gray-900">
                Technical Highlights & Performance:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedApp.keySpecs.map((spec, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-sans text-gray-700 bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                    <Check className="w-4 h-4 text-[#C67C4E] shrink-0" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Uses */}
            <div className="pt-2">
              <h4 className="font-button text-xs font-bold uppercase tracking-wider text-gray-900 mb-2">
                Ideal For:
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedApp.suitableFor.map((use, i) => (
                  <span key={i} className="bg-gray-100 text-gray-800 text-[11px] font-sans font-medium px-3 py-1 rounded-full border border-gray-200">
                    {use}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onOpenEnquiry(null)}
                className="bg-[#111111] hover:bg-[#C67C4E] text-white px-7 py-3 rounded-full font-button text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-md"
              >
                <span>Request {selectedApp.title.split(' ')[0]} Swatch Kit</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 relative rounded-2xl overflow-hidden h-[380px] shadow-2xl">
            <img
              src={selectedApp.image}
              alt={selectedApp.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="text-[10px] font-button font-bold text-[#C67C4E] uppercase tracking-wider block">
                Recommended Collection
              </span>
              <p className="font-serif text-xl font-bold">
                {selectedApp.recommendedSeries}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
      </>
  );
};
