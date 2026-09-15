import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Search, ArrowRight, Building2, Truck, ShieldCheck, CheckCircle2, MessageCircle, ChevronDown, ChevronUp, Layers, HelpCircle, PhoneCall } from 'lucide-react';
import { STATE_SUPPLY_DATA, ALL_SERVED_CITIES_SEO, StateDetail, CityDetail } from '../data/citySupplyData';
import { Product } from '../types';

interface CitiesSupplyPageProps {
  onOpenEnquiry: (product?: Product | null, customNote?: string) => void;
}

export const CitiesSupplyPage: React.FC<CitiesSupplyPageProps> = ({ onOpenEnquiry }) => {
  const { stateSlug, citySlug } = useParams<{
    stateSlug?: string;
    citySlug?: string;
  }>();

  const navigate = useNavigate();

  const initialSlug = stateSlug || 'maharashtra';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStateSlug, setSelectedStateSlug] = useState<string>(initialSlug);
  const [selectedCityDetail, setSelectedCityDetail] = useState<CityDetail | null>(null);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);
  // Sync state when URL params change
  // Sync selected city/state when URL params change
  useEffect(() => {
    window.scrollTo(0, 0);
    const currentStateSlug = stateSlug || 'maharashtra';

    const stateMatch = STATE_SUPPLY_DATA.find(
      state =>
        state.stateSlug.toLowerCase() === currentStateSlug.toLowerCase()
    );

    if (!stateMatch) {
      setSelectedStateSlug('maharashtra');
      setSelectedCityDetail(null);
      return;
    }

    setSelectedStateSlug(stateMatch.stateSlug);

    // CITY URL: /maharashtra/nashik
    if (citySlug) {
      const cityMatch = stateMatch.citiesDetails.find(
        city =>
          city.citySlug?.toLowerCase() === citySlug.toLowerCase() ||
          city.cityName?.toLowerCase() === citySlug.toLowerCase()
      );

      if (cityMatch) {
        setSelectedCityDetail(cityMatch);
        setOpenFaqIdx(0);
        return;
      }

      // If city is not found in citiesDetails,
      // create the city detail from the state data.
      const cityName = citySlug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      setSelectedCityDetail({
        cityName,
        citySlug,
        stateName: stateMatch.stateName,
        stateSlug: stateMatch.stateSlug,
        marketLocations: stateMatch.wholesaleHubs.slice(0, 3),
        keyIndustries: stateMatch.demandSectors.slice(0, 3),
        recommendedRexine: stateMatch.topProductsInDemand.slice(0, 3),
        deliveryTimeline: stateMatch.avgDeliveryTime,
        seoDescription: `Rexine Centre provides direct wholesale supply of premium synthetic leather, sofa rexine, and PVC sheeting to dealers and manufacturers in ${cityName}, ${stateMatch.stateName}.`
      });

      setOpenFaqIdx(0);
      return;
    }

    // STATE URL: /maharashtra
    setSelectedCityDetail(null);
    setOpenFaqIdx(0);

  }, [stateSlug, citySlug]);
  // Find active state
  // Find active state
  const activeState =
    STATE_SUPPLY_DATA.find(s => s.stateSlug === selectedStateSlug) ||
    STATE_SUPPLY_DATA[0];

  // Current location name for hero
  const selectedLocationName =
    selectedCityDetail?.cityName || activeState.stateName;
  // Filtered states/cities based on search
  const filteredStates = STATE_SUPPLY_DATA.filter(state => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      state.stateName.toLowerCase().includes(query) ||
      state.popularCities.some(c => c.toLowerCase().includes(query)) ||
      state.wholesaleHubs.some(h => h.toLowerCase().includes(query)) ||
      state.topProductsInDemand.some(p => p.toLowerCase().includes(query))
    );
  });

  const handleSelectState = (slug: string) => {
    setSelectedStateSlug(slug);
    setSelectedCityDetail(null);
    setOpenFaqIdx(0);

    navigate(`/rexine-supplier/${slug}`);
  };
  const handleCityClick = (cityName: string) => {
    let matchedState: StateDetail | null = null;
    let matchedCity: CityDetail | null = null;

    // Search the city across ALL states
    for (const state of STATE_SUPPLY_DATA) {
      const city = state.citiesDetails.find(
        c =>
          c.cityName.toLowerCase() === cityName.toLowerCase() ||
          c.citySlug?.toLowerCase() === cityName.toLowerCase()
      );

      if (city) {
        matchedState = state;
        matchedCity = city;
        break;
      }
    }

    // City found in the correct state
    if (matchedState && matchedCity) {
      setSelectedStateSlug(matchedState.stateSlug);
      setSelectedCityDetail(matchedCity);
      setOpenFaqIdx(0);

      navigate(
        `/rexine-supplier/${matchedState.stateSlug}/${matchedCity.citySlug}`
      );

      return;
    }

    // Fallback only if city does not exist in STATE_SUPPLY_DATA
    const citySlug = cityName
      .toLowerCase()
      .replace(/\s+/g, '-');

    setSelectedCityDetail({
      cityName,
      citySlug,
      stateName: activeState.stateName,
      stateSlug: activeState.stateSlug,
      marketLocations: activeState.wholesaleHubs.slice(0, 3),
      keyIndustries: activeState.demandSectors.slice(0, 3),
      recommendedRexine: activeState.topProductsInDemand.slice(0, 3),
      deliveryTimeline: activeState.avgDeliveryTime,
      seoDescription: `Rexine Centre provides direct wholesale supply of premium synthetic leather, sofa rexine, and PVC sheeting to dealers and manufacturers in ${cityName}, ${activeState.stateName}.`
    });

    setOpenFaqIdx(0);

    navigate(
      `/rexine-supplier/${activeState.stateSlug}/${citySlug}`
    );
  };
  const handleWhatsAppCityInquiry = (cityName: string) => {
    // Find the correct state for this city
    let cityState = activeState.stateName;

    for (const state of STATE_SUPPLY_DATA) {
      const foundCity = state.citiesDetails.find(
        city =>
          city.cityName.toLowerCase() === cityName.toLowerCase() ||
          city.citySlug?.toLowerCase() === cityName.toLowerCase()
      );

      if (foundCity) {
        cityState = state.stateName;
        break;
      }
    }

    const text = encodeURIComponent(
      `Hi Rexine Centre, I need wholesale Rexine supply & sample swatch books for ${cityName}, ${cityState}. Please share catalogue & pricing.`
    );

    window.location.href = `https://wa.me/918104019890?text=${text}`;
  };
  return (
    <div className="bg-[#EDE8E3] min-h-screen text-[#111111] pb-20">

      {/* 1. Hero Header */}
      <section className="bg-[#111111] text-white pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b border-gray-800 relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <div className="flex items-center gap-2">
            <span className="bg-[#C67C4E] text-white text-[10px] font-button font-bold px-3 py-1 rounded-full uppercase tracking-widest flex items-center gap-1.5">
              <MapPin className="w-3 h-3" />
              PAN-INDIA WHOLESALE SUPPLY
            </span>
          </div>

          <h1 className="font-poppins text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight uppercase max-w-4xl">
            REXINE SUPPLIER IN {' '}
            <span className="text-[#C67C4E]">
              {selectedLocationName}
            </span>
          </h1>
          <p className="font-sans text-xs sm:text-sm text-gray-300 max-w-2xl leading-relaxed">
            Direct factory-to-wholesale supplier of premium Rexine, Leatherette, PVC Sheets, and Upholstery Fabrics across 500+ commercial hubs in India with 24-48h express dispatch.
          </p>

          {/* Search Box */}
          <div className="pt-2 max-w-xl">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search State, City or Market (e.g., Mumbai, Surat, Kirti Nagar)..."
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 pl-11 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-[#C67C4E] backdrop-blur-md"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#C67C4E]/20 text-[#C67C4E] flex items-center justify-center shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <span className="font-poppins text-sm font-bold text-white block">24 - 48 Hours</span>
                <span className="font-sans text-[10px] text-gray-400 uppercase">Express Dispatch</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#C67C4E]/20 text-[#C67C4E] flex items-center justify-center shrink-0">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <span className="font-poppins text-sm font-bold text-white block">1000+ Hubs</span>
                <span className="font-sans text-[10px] text-gray-400 uppercase">Covered Nationwide</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#C67C4E]/20 text-[#C67C4E] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="font-poppins text-sm font-bold text-white block">100k Rub Test</span>
                <span className="font-sans text-[10px] text-gray-400 uppercase">Anti-Peel Guarantee</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#C67C4E]/20 text-[#C67C4E] flex items-center justify-center shrink-0">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <span className="font-poppins text-sm font-bold text-white block">Ready Stock</span>
                <span className="font-sans text-[10px] text-gray-400 uppercase">500+ Swatch Rolls</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Explorer Content */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-12">

        {/* State Selection Tab Bar */}
        <div>
          <h2 className="font-button text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-4">
            SELECT STATE / REGION
          </h2>

          <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none">
            {STATE_SUPPLY_DATA.map((state) => {
              const isSelected = state.stateSlug === activeState.stateSlug;
              return (
                <button
                  key={state.id}
                  onClick={() => handleSelectState(state.stateSlug)}
                  className={`px-5 py-2.5 rounded-xl font-button text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all flex items-center gap-2 ${isSelected
                      ? 'bg-[#111111] text-white shadow-lg border border-[#111111]'
                      : 'bg-white/80 hover:bg-white text-gray-800 border border-black/10'
                    }`}
                >
                  <span>{state.stateName}</span>
                  {isSelected && <span className="w-2 h-2 rounded-full bg-[#C67C4E]" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected State Overview Banner */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-black/10 shadow-md space-y-8">

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-gray-200">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-button font-bold text-[#C67C4E] uppercase tracking-wider">
                  STATE WHOLESALE PROFILE
                </span>
                <span className="text-gray-300">•</span>
                <span className="text-xs font-sans text-gray-500 font-medium">
                  Capital: {activeState.capital}
                </span>
              </div>

              <h2 className="font-poppins text-2xl sm:text-3xl font-extrabold text-[#111111] uppercase">
                REXINE SUPPLIER IN {activeState.stateName.toUpperCase()}
              </h2>

              <p className="font-sans text-xs sm:text-sm text-gray-600 leading-relaxed max-w-3xl">
                {activeState.description}
              </p>
            </div>

            <div className="shrink-0 space-y-2">
              <button
                onClick={() => handleWhatsAppCityInquiry(activeState.stateName)}
                className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20bd5a] text-white px-6 py-3 rounded-xl font-button text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>INQUIRE BULK SUPPLY ({activeState.stateName.toUpperCase()})</span>
              </button>

              <div className="text-center">
                <span className="text-[10px] font-sans text-gray-500">
                  ⚡ Avg. Dispatch: <strong className="text-black">{activeState.avgDeliveryTime}</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Grid: Popular Cities + Wholesale Hubs */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* Left 7 cols: Popular Cities Grid */}
            <div className="lg:col-span-7 space-y-4">
              <h3 className="font-button text-xs font-bold uppercase tracking-wider text-[#111111] flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#C67C4E]" />
                CITIES WE SERVE IN {activeState.stateName.toUpperCase()}
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {activeState.popularCities.map((city, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleCityClick(city)}
                    className="p-3 bg-[#EDE8E3]/60 hover:bg-[#111111] hover:text-white rounded-xl border border-gray-200 text-left transition-all group flex items-center justify-between"
                  >
                    <div>
                      <span className="font-poppins text-xs font-bold uppercase tracking-wide block group-hover:text-white text-gray-900">
                        {city}
                      </span>
                      <span className="text-[10px] font-sans text-gray-500 group-hover:text-gray-300">
                        Click for More Information
                      </span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#C67C4E] group-hover:translate-x-1 transition-transform" />
                  </button>
                ))}
              </div>
            </div>

            {/* Right 5 cols: Key Wholesale Hubs & Demand Sectors */}
            <div className="lg:col-span-5 bg-[#EDE8E3]/40 p-5 rounded-xl border border-gray-200/80 space-y-5">
              <div>
                <h4 className="font-button text-xs font-bold uppercase tracking-wider text-[#111111] mb-2.5 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#C67C4E]" />
                  WHOLESALE MARKETS & HUBS
                </h4>
                <ul className="space-y-1.5">
                  {activeState.wholesaleHubs.map((hub, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs font-sans text-gray-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#C67C4E] shrink-0 mt-0.5" />
                      <span>{hub}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-gray-200">
                <h4 className="font-button text-xs font-bold uppercase tracking-wider text-[#111111] mb-2.5">
                  TOP PRODUCTS IN DEMAND
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {activeState.topProductsInDemand.map((prod, idx) => (
                    <span key={idx} className="bg-white text-gray-800 text-[10px] font-button font-bold px-2.5 py-1 rounded-md border border-gray-200 shadow-2xs">
                      {prod}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* City Modal / Detail Box if clicked */}
          {selectedCityDetail && (
            <div className="mt-6 bg-[#111111] text-white p-6 rounded-2xl border border-gray-800 space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#C67C4E]" />
                  <h4 className="font-poppins text-lg font-bold uppercase tracking-wide text-white">
                    REXINE SUPPLY DETAIL FOR {selectedCityDetail.cityName.toUpperCase()}
                  </h4>
                </div>
                <button
                  onClick={() => setSelectedCityDetail(null)}
                  className="text-xs text-gray-400 hover:text-white"
                >
                  Close ×
                </button>
              </div>

              <p className="font-sans text-xs text-gray-300 leading-relaxed">
                {selectedCityDetail.seoDescription}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                  <span className="text-[10px] font-button font-bold text-[#C67C4E] uppercase tracking-wider block mb-1">
                    KEY MARKET LOCATIONS
                  </span>
                  <ul className="text-xs font-sans text-gray-300 space-y-1">
                    {selectedCityDetail.marketLocations.map((m, i) => (
                      <li key={i}>• {m}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                  <span className="text-[10px] font-button font-bold text-[#C67C4E] uppercase tracking-wider block mb-1">
                    KEY INDUSTRIES
                  </span>
                  <ul className="text-xs font-sans text-gray-300 space-y-1">
                    {selectedCityDetail.keyIndustries.map((m, i) => (
                      <li key={i}>• {m}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                  <span className="text-[10px] font-button font-bold text-[#C67C4E] uppercase tracking-wider block mb-1">
                    RECOMMENDED GRADES
                  </span>
                  <ul className="text-xs font-sans text-gray-300 space-y-1">
                    {selectedCityDetail.recommendedRexine.map((m, i) => (
                      <li key={i}>• {m}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                <span className="text-xs font-sans text-gray-400">
                  🚚 Expected Delivery in {selectedCityDetail.cityName}: <strong className="text-white">{selectedCityDetail.deliveryTimeline}</strong>
                </span>

                <button
                  onClick={() => handleWhatsAppCityInquiry(selectedCityDetail.cityName)}
                  className="bg-[#C67C4E] hover:bg-[#b06a3d] text-white px-5 py-2 rounded-lg font-button text-xs font-bold uppercase tracking-wider flex items-center gap-2"
                >
                  <span>INQUIRE FOR {selectedCityDetail.cityName.toUpperCase()}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* State FAQ Accordion */}
          {activeState.faqs && activeState.faqs.length > 0 && (
            <div className="pt-6 border-t border-gray-200">
              <h3 className="font-button text-xs font-bold uppercase tracking-wider text-[#111111] mb-4 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#C67C4E]" />
                FREQUENTLY ASKED QUESTIONS ({activeState.stateName.toUpperCase()})
              </h3>

              <div className="space-y-3">
                {activeState.faqs.map((faq, idx) => {
                  const isOpen = openFaqIdx === idx;
                  return (
                    <div
                      key={idx}
                      className="bg-[#EDE8E3]/50 rounded-xl border border-gray-200 overflow-hidden"
                    >
                      <button
                        onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                        className="w-full text-left p-4 flex items-center justify-between font-poppins text-xs font-bold text-gray-900 uppercase"
                      >
                        <span>{faq.question}</span>
                        {isOpen ? <ChevronUp className="w-4 h-4 text-[#C67C4E]" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                      </button>

                      {isOpen && (
                        <div className="px-4 pb-4 font-sans text-xs text-gray-600 leading-relaxed border-t border-gray-200/60 pt-3">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>

        {/* 3. All Served Cities Index Grid */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-black/10 space-y-6">
          <div>
            <span className="text-[10px] font-button font-bold text-gray-400 uppercase tracking-widest block mb-1">
              PAN-INDIA NETWORK
            </span>
            <h3 className="font-poppins text-xl font-extrabold text-[#111111] uppercase">
              50+ CITIES WE REGULARLY SUPPLY
            </h3>
            <p className="font-sans text-xs text-gray-500 mt-1">
              Select any city below to initiate direct WhatsApp bulk pricing or request physical swatch books.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 text-xs font-sans text-gray-700">
            {ALL_SERVED_CITIES_SEO.map((city, idx) => (
              <button
                key={idx}
                onClick={() => handleWhatsAppCityInquiry(city)}
                className="bg-[#EDE8E3] hover:bg-[#111111] hover:text-white px-3 py-1.5 rounded-lg border border-gray-300 text-xs font-medium transition-all flex items-center gap-1.5"
              >
                <span>{city}</span>
                <span className="text-[9px] text-[#C67C4E]">★</span>
              </button>
            ))}
          </div>
        </div>

        {/* 4. Bottom CTA Banner */}
        <div className="bg-[#111111] text-white rounded-2xl p-8 border border-gray-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-poppins text-xl font-extrabold uppercase text-white">
              NEED WHOLESALE REXINE ROLL SUPPLY IN YOUR LOCATION?
            </h3>
            <p className="font-sans text-xs text-gray-300 max-w-xl">
              Connect directly with our central dispatch desk for instant GST invoice quotes, swatch binder books, and express logistics anywhere in India.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => handleWhatsAppCityInquiry('India Wholesale')}
              className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-6 py-3 rounded-xl font-button text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>WHATSAPP DISPATCH DESK</span>
            </button>

            <button
              onClick={() => onOpenEnquiry(null, "Request Swatch Binder Book for My State")}
              className="bg-transparent border border-white/30 hover:border-white text-white px-6 py-3 rounded-xl font-button text-xs font-bold uppercase tracking-wider"
            >
              REQUEST SAMPLE BINDER
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
