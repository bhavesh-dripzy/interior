
import React, { useState } from 'react';
import { 
  Star, 
  Share2, 
  Bookmark, 
  ArrowLeft,
  MapPin,
  Search,
  Users,
  ChevronRight
} from 'lucide-react';
import { Designer, Project } from '../types';

interface ProjectDetailPageProps {
  designer: Designer;
  project: Project;
  onBack: () => void;
  onContact: (designer: Designer) => void;
  onOtherProjectClick: (project: Project) => void;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({ 
  designer, 
  project, 
  onBack, 
  onContact,
  onOtherProjectClick
}) => {
  const [activeTab, setActiveTab] = useState('Projects');
  const tabs = ['About Us', 'Projects', 'Business', 'Credentials', 'Reviews', 'Ideabooks'];

  return (
    <div className="min-h-screen bg-white text-[#333]">
      {/* Top sticky nav for back button - positioned below standard header */}
      <div className="fixed top-[88px] left-0 right-0 z-50 px-6 py-4 pointer-events-none">
        <button 
          onClick={onBack}
          className="pointer-events-auto bg-white/90 backdrop-blur-md border border-slate-200 p-2.5 rounded-full shadow-lg text-slate-700 hover:text-black hover:bg-white transition-all"
        >
          <ArrowLeft size={18} />
        </button>
      </div>

      {/* Main container with standard padding for fixed navbar */}
      <div className="max-w-7xl mx-auto px-6 pb-20 pt-28">
        
        {/* Designer Header Box - With border and padding as per screenshot */}
        <div className="border border-slate-100 rounded-xl mb-10 overflow-hidden shadow-sm">
          <div className="p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-full border border-slate-100 bg-slate-50 flex items-center justify-center shrink-0 overflow-hidden shadow-sm">
                 <img src={designer.portfolio[0]} className="w-full h-full object-cover" alt="" />
              </div>
              <div>
                <h1 className="text-2xl font-bold uppercase tracking-tight">{designer.name}</h1>
                <div className="flex items-center gap-2 mb-1">
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
            <div className="flex items-center gap-4">
               <button className="flex items-center gap-2 px-6 py-2 border border-slate-200 rounded text-[11px] font-bold uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-colors">
                  <Share2 size={16} /> Share
               </button>
               <button className="flex items-center gap-2 px-6 py-2 border border-slate-200 rounded text-[11px] font-bold uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-colors">
                  <Bookmark size={16} /> Save
               </button>
            </div>
          </div>

          {/* Inline Tabs inside the header box */}
          <div className="px-8 border-t border-slate-50 flex items-center gap-8 overflow-x-auto no-scrollbar">
             {tabs.map(tab => (
               <button 
                key={tab}
                onClick={() => tab === 'Projects' ? null : onBack()}
                className={`pt-5 pb-4 text-[11px] font-bold uppercase tracking-[0.15em] whitespace-nowrap border-b-2 transition-colors ${activeTab === tab ? 'text-black border-black' : 'text-slate-400 border-transparent hover:text-slate-600'}`}
               >
                 {tab}
               </button>
             ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Project Content Area */}
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-4 tracking-tight">{project.name}</h2>
            <div className="mb-6 space-y-1">
               <p className="text-[13px] text-slate-500 font-medium">Project Cost: <span className="font-bold text-slate-700">{project.cost || designer.typicalJobCost}</span></p>
               <p className="text-[13px] text-slate-500 font-medium">PIN code {project.pinCode || '500034'}</p>
            </div>

            <button className="flex items-center gap-2 px-5 py-2.5 border border-slate-200 rounded text-[11px] font-bold uppercase tracking-widest text-slate-600 hover:bg-slate-50 mb-12 transition-colors">
               <Share2 size={16} /> Share Project
            </button>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {(project.images || [project.thumbnail]).map((img, i) => (
                 <div key={i} className="flex flex-col gap-3 group">
                   <div className="rounded-xl overflow-hidden aspect-[4/3] bg-slate-50 border border-slate-100">
                     <img src={img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt={`${project.name} ${i}`} />
                   </div>
                   <p className="text-[12px] font-bold text-slate-600 mb-8 group-hover:text-black transition-colors uppercase tracking-widest">Mohan's House</p>
                 </div>
               ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-[350px] shrink-0 space-y-10">
            {/* Contact Card Area */}
            <div className="bg-[#F8F9FA] border border-slate-100 rounded-2xl p-8 text-center shadow-sm">
               <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-800 mb-6">Contact {designer.name}</h3>
               <button 
                onClick={() => onContact(designer)}
                className="w-full bg-[#1A1A1A] text-white py-4 rounded-md font-bold text-sm uppercase tracking-[0.2em] hover:bg-black transition-all flex items-center justify-center gap-3 shadow-lg"
               >
                 Send Message
               </button>
               
               <div className="relative mt-8 mb-6">
                 <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
                 <div className="relative flex justify-center text-xs uppercase font-black tracking-widest text-slate-300 bg-[#F8F9FA] px-4">Or</div>
               </div>

               {/* Integrated Sidebar Widget Refined */}
               <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm mt-8">
                  <div className="p-6 text-center">
                    <div className="relative w-full h-24 mb-6">
                       {/* Overlapping Circles/Images Mockup */}
                       <div className="absolute left-1/2 -translate-x-1/2 top-0 flex -space-x-4">
                          <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100" className="w-12 h-12 rounded-full border-2 border-white object-cover" alt="" />
                          <div className="w-14 h-14 rounded-full border-2 border-white bg-white shadow-xl flex items-center justify-center p-0.5 z-10">
                             <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100" className="w-full h-full rounded-full object-cover" alt="" />
                          </div>
                          <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100" className="w-12 h-12 rounded-full border-2 border-white object-cover" alt="" />
                       </div>
                       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-4">
                          <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => <Star key={i} size={8} fill="#facc15" className="text-yellow-400" />)}
                          </div>
                       </div>
                    </div>

                    <h4 className="text-[14px] font-bold text-[#1a1a1a] mb-2 leading-tight">Need help finding local Interior Designers & Decorators?</h4>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-6">Find local pros on Houzat</p>

                    <div className="flex border border-slate-200 rounded-md overflow-hidden shadow-inner">
                      <div className="flex-1 flex items-center px-3 bg-white">
                        <MapPin size={14} className="text-slate-300 mr-2" />
                        <input 
                          type="text" 
                          placeholder="500004" 
                          className="w-full text-xs font-bold focus:outline-none py-3 placeholder:text-slate-200" 
                        />
                      </div>
                      <button className="bg-[#00705F] text-white px-5 py-3 text-[11px] font-bold uppercase tracking-widest hover:bg-[#005a4d] transition-colors whitespace-nowrap">
                        Get Started
                      </button>
                    </div>
                  </div>
               </div>
            </div>

            {/* Sidebar Projects List Re-layout */}
            <div className="pt-2">
               <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6 pb-2 border-b border-slate-100">Projects</h4>
               <ul className="space-y-4">
                  <li className="text-[13px] font-bold text-slate-400 hover:text-black transition-colors cursor-pointer flex items-center gap-2">
                    All Projects
                  </li>
                  {designer.projects?.map(p => (
                    <li 
                      key={p.id}
                      onClick={() => onOtherProjectClick(p)}
                      className={`text-[13px] font-bold transition-all cursor-pointer flex items-center justify-between group ${p.id === project.id ? 'text-black' : 'text-slate-500 hover:text-black'}`}
                    >
                      <span className="truncate pr-4">{p.name}</span>
                      {p.id === project.id && <ChevronRight size={16} className="text-[#00705F] shrink-0" />}
                    </li>
                  ))}
               </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
