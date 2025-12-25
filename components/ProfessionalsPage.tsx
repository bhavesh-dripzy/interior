
import React, { useState, useEffect, useRef } from 'react';
import { 
  Star, 
  CheckCircle, 
  ChevronDown, 
  MapPin, 
  Building2, 
  Users, 
  Handshake, 
  MessageSquare,
  Search,
  X,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { CITIES } from '../constants';
import { Designer } from '../types';
import { getDesigners, mapApiDesignerToDesigner, ApiError } from '../apiService';

interface ProfessionalsPageProps {
  onDesignerClick?: (designer: Designer) => void;
  onContactClick?: (designer: Designer) => void;
}

const CATEGORIES = [
  'Interior Design',
  'Architecture',
  'Modular Kitchen',
  'Full Home Renovation',
  'Wardrobes & Storage',
  'Lighting Design'
];

export const ProfessionalsPage: React.FC<ProfessionalsPageProps> = ({ onDesignerClick, onContactClick }) => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Interior Design');
  const [selectedLocation, setSelectedLocation] = useState('Delhi NCR');
  const [locationSearch, setLocationSearch] = useState('');
  
  // API state
  const [designers, setDesigners] = useState<Designer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalResults, setTotalResults] = useState(0);
  
  const categoryRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);

  // Filter cities based on search
  const filteredCities = CITIES.filter(city => 
    city.toLowerCase().includes(locationSearch.toLowerCase())
  );

  // Fetch designers from API
  const fetchDesigners = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const params: any = {
        page_size: 20, // Fetch 20 designers per page
      };
      
      // Add category filter if selected (map frontend category to API category)
      if (selectedCategory && selectedCategory !== 'Interior Design') {
        params.category = selectedCategory;
      }
      
      // Add search filter for location
      if (selectedLocation && selectedLocation !== 'Delhi NCR') {
        params.search = selectedLocation;
      }
      
      const response = await getDesigners(params);
      
      // Map API response to frontend Designer type
      const mappedDesigners = response.data.map(mapApiDesignerToDesigner);
      setDesigners(mappedDesigners);
      setTotalResults(response.pagination.total);
    } catch (err) {
      console.error('Error fetching designers:', err);
      const errorMessage = err instanceof ApiError 
        ? err.message 
        : 'Failed to load designers. Please try again later.';
      setError(errorMessage);
      setDesigners([]);
      setTotalResults(0);
    } finally {
      setLoading(false);
    }
  };

  // Fetch designers on component mount
  useEffect(() => {
    fetchDesigners();
  }, []);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (categoryRef.current && !categoryRef.current.contains(event.target as Node)) {
        setIsCategoryOpen(false);
      }
      if (locationRef.current && !locationRef.current.contains(event.target as Node)) {
        setIsLocationOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-24 pb-20 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
         <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover opacity-20 grayscale blur-[2px]" alt="" />
         <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM36 4v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM6 4v-4H4v4H0v2h4v4h2v-4h4v-2H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}></div>
         <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/95 via-[#0a0a0a]/80 to-[#0a0a0a]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-lg md:text-3xl font-extrabold mb-3 tracking-tight mt-6 uppercase">Get Matched with Local Professionals</h2>

          <div className="max-w-3xl mx-auto relative mb-14 px-4">
             <div className="absolute top-6 left-[20%] right-[20%] h-[1px] bg-white/10 hidden md:block"></div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                <div className="flex flex-col items-center group">
                   <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-black/40 backdrop-blur-xl mb-4 relative z-10 group-hover:border-emerald-500 transition-all duration-300">
                      <Building2 size={18} className="text-white opacity-80 group-hover:opacity-100" />
                   </div>
                   <p className="text-white/90 text-[10px] font-bold leading-snug max-w-[140px] text-center tracking-[0.1em] uppercase">Answer questions about your project</p>
                </div>
                <div className="flex flex-col items-center group">
                   <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-black/40 backdrop-blur-xl mb-4 relative z-10 group-hover:border-emerald-500 transition-all duration-300">
                      <Users size={18} className="text-white opacity-80 group-hover:opacity-100" />
                   </div>
                   <p className="text-white/90 text-[10px] font-bold leading-snug max-w-[140px] text-center tracking-[0.1em] uppercase">Get connected with pros for free</p>
                </div>
                <div className="flex flex-col items-center group">
                   <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-black/40 backdrop-blur-xl mb-4 relative z-10 group-hover:border-emerald-500 transition-all duration-300">
                      <Handshake size={18} className="text-white opacity-80 group-hover:opacity-100" />
                   </div>
                   <p className="text-white/90 text-[10px] font-bold leading-snug max-w-[140px] text-center tracking-[0.1em] uppercase">Hire the right pro with confidence</p>
                </div>
             </div>
          </div>
        </div>

        {/* Search/Filter Bar - Functional Dropdowns */}
        <div className="bg-black/60 backdrop-blur-3xl p-3 rounded-[2.5rem] border border-white/10 shadow-2xl flex flex-col md:flex-row items-center gap-3 mb-10">
          
          {/* Category Dropdown */}
          <div className="flex-1 relative w-full" ref={categoryRef}>
            <div 
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              className="flex items-center bg-[#111111] hover:bg-[#161616] rounded-2xl p-4 gap-4 border border-white/5 w-full cursor-pointer transition-colors group"
            >
              <span className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] whitespace-nowrap">What do you need?</span>
              <div className="w-[1px] h-6 bg-white/10 mx-2 hidden md:block"></div>
              <div className="flex-1 flex items-center justify-between text-white font-bold transition-colors">
                <span className="text-[11px] uppercase tracking-widest">{selectedCategory}</span>
                <ChevronDown size={18} className={`text-slate-500 transition-transform duration-300 ${isCategoryOpen ? 'rotate-180 text-emerald-400' : ''}`} />
              </div>
            </div>

            {isCategoryOpen && (
              <div className="absolute top-[calc(100%+10px)] left-0 w-full bg-[#111111] border border-white/10 rounded-2xl p-2 z-[100] shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setIsCategoryOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${selectedCategory === cat ? 'bg-emerald-500/10 text-emerald-400' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Location Dropdown with Search */}
          <div className="flex-1 relative w-full" ref={locationRef}>
            <div 
              onClick={() => setIsLocationOpen(!isLocationOpen)}
              className="flex items-center bg-[#111111] hover:bg-[#161616] rounded-2xl p-4 gap-4 border border-white/5 w-full cursor-pointer transition-colors group"
            >
              <MapPin size={18} className={`text-slate-500 transition-colors group-hover:text-emerald-400 ${isLocationOpen ? 'text-emerald-400' : ''}`} />
              <div className="flex-1 flex items-center justify-between text-white font-bold transition-colors">
                <span className="text-[11px] uppercase tracking-widest">{selectedLocation}</span>
                <ChevronDown size={18} className={`text-slate-500 transition-transform duration-300 ${isLocationOpen ? 'rotate-180 text-emerald-400' : ''}`} />
              </div>
            </div>

            {isLocationOpen && (
              <div className="absolute top-[calc(100%+10px)] left-0 w-full bg-[#111111] border border-white/10 rounded-2xl p-3 z-[100] shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="relative mb-3">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input 
                    type="text"
                    value={locationSearch}
                    onChange={(e) => setLocationSearch(e.target.value)}
                    placeholder="Search city..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-[10px] font-bold uppercase tracking-widest text-white focus:outline-none focus:border-emerald-500/50 transition-all placeholder:text-slate-600"
                  />
                  {locationSearch && (
                    <button onClick={() => setLocationSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white">
                      <X size={14} />
                    </button>
                  )}
                </div>
                <div className="max-h-[220px] overflow-y-auto no-scrollbar space-y-1">
                  {filteredCities.length > 0 ? (
                    filteredCities.map(city => (
                      <button
                        key={city}
                        onClick={() => {
                          setSelectedLocation(city);
                          setIsLocationOpen(false);
                          setLocationSearch('');
                        }}
                        className={`w-full text-left px-4 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${selectedLocation === city ? 'bg-emerald-500/10 text-emerald-400' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
                      >
                        {city}
                      </button>
                    ))
                  ) : (
                    <div className="text-[10px] text-slate-600 font-bold uppercase tracking-widest p-4 text-center italic">No results found</div>
                  )}
                </div>
              </div>
            )}
          </div>

          <button 
            onClick={fetchDesigners}
            disabled={loading}
            className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-10 py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-emerald-500 hover:text-black transition-all w-full md:w-auto shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                Loading...
              </>
            ) : (
              'Get Matches'
            )}
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-8 mb-16 text-[10px] font-bold text-slate-500 uppercase tracking-[0.25em]">
           <div className="flex items-center gap-2"><CheckCircle size={14} className="text-slate-700" /> Free to use</div>
           <div className="flex items-center gap-2"><CheckCircle size={14} className="text-slate-700" /> No obligation</div>
           <div className="flex items-center gap-2"><CheckCircle size={14} className="text-slate-700" /> Verified pros</div>
           <div className="flex items-center gap-2"><CheckCircle size={14} className="text-slate-700" /> Premium support</div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          <div className="w-full lg:w-64 shrink-0 space-y-10">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-[11px] text-slate-300 uppercase tracking-[0.3em]">Filters</h3>
                <ChevronDown size={14} className="text-slate-600" />
              </div>
              <div className="space-y-6">
                <div>
                  <h4 className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Project Type</h4>
                  <div className="space-y-3">
                    {['Full Home', 'Modular Kitchen', 'Wardrobes', 'Renovation'].map(type => (
                      <label key={type} className="flex items-center gap-3 cursor-pointer group">
                        <div className={`w-4 h-4 rounded border transition-all flex items-center justify-center ${type === 'Full Home' ? 'border-emerald-500 bg-emerald-500/10' : 'border-white/10 group-hover:border-emerald-500/50'}`}>
                           {type === 'Full Home' && <div className="w-2 h-2 bg-emerald-500 rounded-sm"></div>}
                        </div>
                        <span className={`text-[11px] font-bold uppercase tracking-widest ${type === 'Full Home' ? 'text-white' : 'text-slate-500'} group-hover:text-emerald-400 transition-colors`}>{type}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-10">
              <span className="text-slate-600 font-bold text-[10px] tracking-[0.3em] uppercase">
                {loading ? 'Loading...' : `${totalResults.toLocaleString()} results`}
              </span>
              <div className="flex items-center gap-4">
                <span className="text-slate-600 text-[9px] font-bold uppercase tracking-widest">Sort by:</span>
                <button className="bg-white/5 px-4 py-2.5 rounded-xl border border-white/10 flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-300 hover:bg-white/10 transition-all">
                  Best Match <ChevronDown size={14} />
                </button>
              </div>
            </div>

            {/* Error State */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 mb-8 flex items-center gap-4">
                <AlertCircle className="text-red-400 shrink-0" size={20} />
                <div>
                  <h3 className="text-red-400 font-bold text-sm mb-1">Error Loading Designers</h3>
                  <p className="text-red-300/80 text-xs">{error}</p>
                  <button
                    onClick={fetchDesigners}
                    className="mt-3 text-red-400 hover:text-red-300 text-xs font-bold uppercase tracking-widest underline"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            )}

            {/* Loading State */}
            {loading && !error && (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="text-emerald-400 animate-spin" size={32} />
              </div>
            )}

            {/* Empty State */}
            {!loading && !error && designers.length === 0 && (
              <div className="text-center py-20">
                <p className="text-slate-400 text-sm font-medium mb-2">No designers found</p>
                <p className="text-slate-500 text-xs">Try adjusting your filters or search criteria</p>
              </div>
            )}

            {/* Designers Grid */}
            {!loading && !error && designers.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {designers.map((designer) => (
                <div 
                  key={designer.id} 
                  onClick={() => onDesignerClick?.(designer)}
                  className="bg-black/40 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl group hover:border-emerald-500/30 transition-all duration-500 cursor-pointer"
                >
                   <div className="relative h-64 overflow-hidden shrink-0 bg-gradient-to-br from-slate-800 to-slate-900">
                      {designer.portfolio && designer.portfolio.length > 0 && designer.portfolio[0] ? (
                        <img 
                          src={designer.portfolio[0]} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                          alt={designer.name}
                          onError={(e) => {
                            // Fallback to gradient background if image fails to load
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Building2 className="text-slate-600" size={48} />
                        </div>
                      )}
                      <div className="absolute top-4 left-4">
                        <div className="bg-emerald-500/90 text-black text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest backdrop-blur-md shadow-xl border border-emerald-400/30">Houzat Recommended</div>
                      </div>
                   </div>
                   <div className="p-8 flex flex-col flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h2 className="text-lg font-bold tracking-tight text-white uppercase">{designer.name}</h2>
                        <div className="flex items-center gap-1.5 text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-xl border border-emerald-400/20">
                          <Star size={12} fill="currentColor" />
                          <span className="font-black text-xs">{designer.rating}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center flex-wrap gap-2 mb-6">
                        <div className="flex items-center gap-1 text-slate-500">
                           {[...Array(5)].map((_, i) => <Star key={i} size={10} fill={i < Math.floor(designer.rating) ? "#facc15" : "none"} strokeWidth={i < Math.floor(designer.rating) ? 0 : 2} className={i < Math.floor(designer.rating) ? 'text-amber-400' : 'text-slate-700'} />)}
                           <span className="ml-1 text-[9px] font-bold uppercase tracking-widest text-slate-500">{designer.reviewsCount} Reviews</span>
                        </div>
                        <div className="w-[1px] h-3 bg-white/10 mx-1 hidden sm:block"></div>
                        <div className="flex items-center gap-1.5 text-slate-500">
                          <MapPin size={10} className="text-emerald-500/50" />
                          <span className="text-[9px] font-bold uppercase tracking-widest">{designer.location}</span>
                        </div>
                      </div>

                      <div className="mb-8 min-h-[50px]">
                        <p className="text-[13px] text-slate-400 font-medium leading-relaxed line-clamp-3">
                          {designer.description}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mt-auto">
                         <button className="bg-transparent text-slate-400 border border-white/10 py-3.5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-white/5 hover:text-white transition-all">View Profile</button>
                         <button 
                           onClick={(e) => {
                             e.stopPropagation();
                             onContactClick?.(designer); 
                           }}
                           className="bg-[#10b981] text-black py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.25em] hover:bg-[#34d399] transition-all shadow-[0_10px_30px_-10px_rgba(16,185,129,0.5)] flex items-center justify-center gap-3 group/btn"
                         >
                           <MessageSquare size={16} className="group-hover/btn:scale-110 transition-transform" />
                           Send Message
                         </button>
                      </div>
                   </div>
                </div>
              ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
