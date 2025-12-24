
import React, { useState } from 'react';
import { 
  Star, 
  Share2, 
  Bookmark, 
  ChevronRight, 
  ChevronDown,
  ExternalLink, 
  Facebook, 
  Link as LinkIcon, 
  MapPin, 
  ArrowLeft,
  Image as ImageIcon,
  MessageSquare,
  PenLine
} from 'lucide-react';
import { Designer, Project } from '../types';

interface DesignerDetailPageProps {
  designer: Designer;
  onBack: () => void;
  onContact: (designer: Designer) => void;
  onProjectClick?: (project: Project) => void;
}

export const DesignerDetailPage: React.FC<DesignerDetailPageProps> = ({ 
  designer, 
  onBack, 
  onContact,
  onProjectClick
}) => {
  const [activeTab, setActiveTab] = useState('About Us');
  const tabs = ['About Us', 'Projects', 'Business', 'Credentials', 'Reviews', 'Ideabooks'];

  return (
    <div className="min-h-screen bg-white text-[#333]">
      {/* Top sticky nav for back button - repositioned for standard navbar */}
      <div className="fixed top-[88px] left-0 right-0 z-50 px-6 py-4 pointer-events-none">
        <button 
          onClick={onBack}
          className="pointer-events-auto bg-white/90 backdrop-blur-md border border-slate-200 p-2.5 rounded-full shadow-lg text-slate-700 hover:text-black hover:bg-white transition-all"
        >
          <ArrowLeft size={18} />
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-20 pt-16">
        {/* Hero Section - Reduced Height and Adjusted Margin */}
        <div className="relative w-full h-[280px] md:h-[420px] rounded-2xl overflow-hidden mb-8 mt-12 shadow-sm">
          <img src={designer.portfolio[0]} className="w-full h-full object-cover" alt={designer.name} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Main Content */}
          <div className="flex-1">
            <div className="flex items-start gap-5 mb-8">
              <div className="w-20 h-20 rounded-full border border-slate-100 bg-slate-50 flex items-center justify-center shrink-0 overflow-hidden shadow-sm">
                 <img src={designer.portfolio[0]} className="w-full h-full object-cover" alt="" />
              </div>
              <div className="flex-1 pt-1">
                <h1 className="text-2xl font-bold mb-1 uppercase tracking-tight">{designer.name}</h1>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-amber-500 font-bold text-sm">{designer.rating}</span>
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={14} 
                        fill={i < Math.floor(designer.rating) ? "#facc15" : "none"} 
                        className={i < Math.floor(designer.rating) ? "text-yellow-400" : "text-slate-200"} 
                      />
                    ))}
                  </div>
                  <span className="text-slate-400 text-xs font-medium">{designer.reviewsCount} Reviews</span>
                </div>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest opacity-80">Interior Designers & Decorators</p>
              </div>
            </div>

            {/* Action Buttons - More compact */}
            <div className="flex flex-wrap gap-3 mb-8 pb-6 border-b border-slate-100">
               <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded text-[11px] font-bold uppercase tracking-widest text-slate-600 hover:bg-slate-50 hover:text-black transition-colors">
                  <PenLine size={14} /> Write a Review
               </button>
               <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded text-[11px] font-bold uppercase tracking-widest text-slate-600 hover:bg-slate-50 hover:text-black transition-colors">
                  <Share2 size={14} /> Share
               </button>
               <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded text-[11px] font-bold uppercase tracking-widest text-slate-600 hover:bg-slate-50 hover:text-black transition-colors">
                  <Bookmark size={14} /> Save
               </button>
            </div>

            {/* Tabs - Smaller font */}
            <div className="flex items-center gap-6 mb-8 border-b border-slate-100 overflow-x-auto no-scrollbar">
               {tabs.map(tab => (
                 <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-3 text-[11px] font-bold uppercase tracking-[0.15em] whitespace-nowrap border-b-2 transition-colors ${activeTab === tab ? 'text-black border-black' : 'text-slate-400 border-transparent hover:text-slate-600'}`}
                 >
                   {tab}
                 </button>
               ))}
            </div>

            {/* Tab Content */}
            <div className="space-y-10">
              <section id="about">
                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-800 mb-5">About Us</h3>
                <p className="text-[13px] text-slate-600 leading-relaxed mb-4">
                  {designer.description}
                </p>
                <button className="text-black font-bold text-[11px] uppercase tracking-widest flex items-center gap-1 hover:underline">
                  Read More <ChevronRight size={14} />
                </button>
              </section>

              <section id="projects">
                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-800 mb-6">{designer.projects?.length || 0} Projects</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {designer.projects?.map(project => (
                    <div 
                      key={project.id} 
                      className="group cursor-pointer"
                      onClick={() => onProjectClick?.(project)}
                    >
                      <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-3 bg-slate-50 border border-slate-100">
                        <img src={project.thumbnail} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={project.name} />
                        <div className="absolute bottom-2.5 left-2.5 bg-black/70 backdrop-blur-md text-white px-2 py-1 rounded-md flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest">
                           <ImageIcon size={12} /> {project.imageCount}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-bold text-[13px] mb-0.5">{project.name}</h4>
                          <div className="flex items-center gap-1 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                            <MapPin size={10} className="text-slate-300" /> {project.location}
                          </div>
                        </div>
                        <button className="p-1.5 text-slate-300 hover:text-black transition-colors"><Share2 size={16} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section id="details" className="pt-8 border-t border-slate-100">
                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-800 mb-8">Business Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-10">
                   <div>
                      <p className="text-[9px] font-black uppercase tracking-[0.25em] text-slate-400 mb-1.5">Business Name</p>
                      <p className="text-[13px] font-bold">{designer.name}</p>
                   </div>
                   <div>
                      <p className="text-[9px] font-black uppercase tracking-[0.25em] text-slate-400 mb-1.5">Typical Job Cost</p>
                      <p className="text-[13px] font-bold">{designer.typicalJobCost}</p>
                      <button className="text-black font-bold text-[9px] uppercase tracking-widest mt-1.5 flex items-center gap-1 hover:underline">
                        Read More <ChevronDown size={12} />
                      </button>
                   </div>
                   <div>
                      <p className="text-[9px] font-black uppercase tracking-[0.25em] text-slate-400 mb-1.5">Phone Number</p>
                      <p className="text-[13px] font-bold text-slate-600">{designer.phone}</p>
                   </div>
                   <div>
                      <p className="text-[9px] font-black uppercase tracking-[0.25em] text-slate-400 mb-1.5">Followers</p>
                      <div className="flex items-center gap-3">
                        <p className="text-[13px] font-bold">{designer.followers} Followers</p>
                        <button className="text-black font-bold text-[9px] uppercase tracking-[0.2em] border border-slate-200 px-2 py-0.5 rounded hover:bg-slate-50 transition-colors">+ Follow</button>
                      </div>
                   </div>
                   <div>
                      <p className="text-[9px] font-black uppercase tracking-[0.25em] text-slate-400 mb-1.5">Website</p>
                      <a href={`https://${designer.website}`} target="_blank" rel="noopener noreferrer" className="text-[13px] font-bold text-slate-600 flex items-center gap-1.5 hover:text-black transition-colors">
                        {designer.website} <ExternalLink size={12} />
                      </a>
                   </div>
                   <div>
                      <p className="text-[9px] font-black uppercase tracking-[0.25em] text-slate-400 mb-1.5">Socials</p>
                      <div className="flex items-center gap-3">
                        <button className="p-1.5 bg-slate-50 border border-slate-100 rounded-full hover:bg-slate-100 transition-colors"><Facebook size={16} /></button>
                        <button className="p-1.5 bg-slate-50 border border-slate-100 rounded-full hover:bg-slate-100 transition-colors"><LinkIcon size={16} /></button>
                      </div>
                   </div>
                   <div className="md:col-span-2">
                      <p className="text-[9px] font-black uppercase tracking-[0.25em] text-slate-400 mb-1.5">Address</p>
                      <p className="text-[13px] font-bold text-slate-600 max-w-sm">{designer.address}</p>
                   </div>
                </div>
              </section>
            </div>
          </div>

          {/* Sidebar - Compact styling */}
          <div className="w-full lg:w-[320px] shrink-0">
            <div className="sticky top-28 bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
               <h3 className="text-xs font-black uppercase tracking-[0.2em] text-black mb-5">Contact {designer.name}</h3>
               <button 
                onClick={() => onContact(designer)}
                className="w-full bg-[#1A1A1A] text-white py-3.5 rounded font-bold text-[11px] uppercase tracking-[0.3em] hover:bg-black transition-all flex items-center justify-center gap-2.5 shadow-md"
               >
                 Send Message
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
