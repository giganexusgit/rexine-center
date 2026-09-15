import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import { POPULAR_CITIES } from '../data/mockData';

const STATE_MONUMENTS = [
  {
    name: 'Maharashtra',
    slug: 'maharashtra',
    svg: (
      <svg className="w-10 h-10 mx-auto text-gray-700 stroke-[1.2]" viewBox="0 0 64 64" fill="none" stroke="currentColor">
        <path d="M12 52V20h40v32M8 52h48M20 20V12h24v8M24 52V34a8 8 0 0 1 16 0v18M16 20h32" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: 'Gujarat',
    slug: 'gujarat',
    svg: (
      <svg className="w-10 h-10 mx-auto text-gray-700 stroke-[1.2]" viewBox="0 0 64 64" fill="none" stroke="currentColor">
        <path d="M12 52h40M16 52V28l16-12 16 12v24M24 52V36h16v16M32 16v-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: 'Karnataka',
    slug: 'karnataka',
    svg: (
      <svg className="w-10 h-10 mx-auto text-gray-700 stroke-[1.2]" viewBox="0 0 64 64" fill="none" stroke="currentColor">
        <path d="M10 52h44M14 52V24h36v28M20 24V14l12-6 12 6v10M26 52V38a6 6 0 0 1 12 0v14" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: 'Delhi NCR',
    slug: 'delhi',
    svg: (
      <svg className="w-10 h-10 mx-auto text-gray-700 stroke-[1.2]" viewBox="0 0 64 64" fill="none" stroke="currentColor">
        <path d="M14 52h36M18 52V18h28v34M14 18h36M22 18V12h20v6M24 52V34a8 8 0 0 1 16 0v18" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: 'Tamil Nadu',
    slug: 'tamil-nadu',
    svg: (
      <svg className="w-10 h-10 mx-auto text-gray-700 stroke-[1.2]" viewBox="0 0 64 64" fill="none" stroke="currentColor">
        <path d="M12 52h40M16 52l4-36h24l4 36M22 38h20M24 28h16M26 20h12M32 16V8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: 'Uttar Pradesh',
    slug: 'uttar-pradesh',
    svg: (
      <svg className="w-10 h-10 mx-auto text-gray-700 stroke-[1.2]" viewBox="0 0 64 64" fill="none" stroke="currentColor">
        <path d="M10 52h44M16 52V30l16-16 16 16v22M26 52V36a6 6 0 0 1 12 0v16M10 52V22M54 52V22" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export const IndiaSupplySection: React.FC = () => {
  return (
    <section className="bg-white py-14 border-b border-gray-200/80">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Top: States Supply Grid */}
        <div>
          <span className="text-[10px] font-button font-bold text-gray-400 uppercase tracking-widest block mb-1">
            WE SUPPLY ACROSS INDIA
          </span>
          <h2 className="font-poppins text-2xl sm:text-3xl font-extrabold text-[#111111] mb-6 uppercase">
            Rexine Supplier in Your State
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
            {STATE_MONUMENTS.map((state, idx) => (
              <Link
                key={idx}
               to={`/rexine-supplier/${state.slug}`}
                className="bg-[#EDE8E3]/60 p-4 rounded-xl border border-black/8 hover:border-[#C67C4E] text-center transition-all cursor-pointer group shadow-sm hover:shadow-md flex flex-col items-center justify-center min-h-[120px]"
              >
                <div className="mb-2 group-hover:scale-110 transition-transform">
                  {state.svg}
                </div>
                <h4 className="font-button text-xs font-bold text-gray-900 group-hover:text-[#C67C4E] transition-colors uppercase">
                  {state.name}
                </h4>
              </Link>
            ))}

            <Link
              to="/rexine-supplier"
              className="bg-[#111111] text-white p-4 rounded-xl border border-black/8 text-center flex flex-col items-center justify-center cursor-pointer hover:bg-[#C67C4E] transition-colors min-h-[120px]"
            >
              <span className="font-button text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                <span>View All States</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          </div>
        </div>

        {/* Bottom: Popular Cities list */}
        <div className="pt-6 border-t border-gray-100">
          <h3 className="font-poppins text-base font-bold text-[#111111] mb-3 flex items-center gap-2 uppercase">
            <MapPin className="w-4 h-4 text-[#C67C4E]" />
            Popular Cities We Serve
          </h3>

          <div className="flex flex-wrap items-center gap-2 text-xs font-sans text-gray-600 leading-relaxed">
            {POPULAR_CITIES.map((city, idx) => (
              <React.Fragment key={idx}>
                <Link
                  to="/supply-locations"
                  className="hover:text-black font-medium hover:underline cursor-pointer transition-colors"
                >
                  {city}
                </Link>
                {idx < POPULAR_CITIES.length - 1 && <span className="text-gray-300">|</span>}
              </React.Fragment>
            ))}
            <Link to="/supply-locations" className="font-button font-bold text-[#C67C4E] hover:underline ml-1">
              More Cities →
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};


