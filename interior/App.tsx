
import React, { useState, useRef, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, useParams } from 'react-router-dom';
import { 
  X,
  Camera,
  Check,
  ChevronRight,
  Sparkles,
  Upload,
  Search,
  CheckCircle2,
  Image as ImageIcon
} from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProfessionalsPage } from './components/ProfessionalsPage';
import { RoomDesignPage } from './components/RoomDesignPage';
import { DesignerDetailPage } from './components/DesignerDetailPage';
import { ProjectDetailPage } from './components/ProjectDetailPage';
// import { Chatbot } from './components/Chatbot'; // Commented out for now
import { ContactModal } from './components/ContactModal';
import { Logo } from './components/Logo';
import { Badge } from './components/Badge';
import { analyzeDesignImage } from './geminiService';
import { Designer, Project } from './types';

const AppContent: React.FC = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [searchImage, setSearchImage] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  // const [isChatOpen, setIsChatOpen] = useState(false); // Commented out - chatbot disabled
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  // Keep designer object for contact modal (will be fetched when needed)
  const [contactDesigner, setContactDesigner] = useState<Designer | null>(null);

  // Form states
  const [selectedRoom, setSelectedRoom] = useState('Living');
  const [selectedTimeline, setSelectedTimeline] = useState('1-3 months');
  const [userVision, setUserVision] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result as string;
        setSearchImage(base64String);
        setIsAnalyzing(true);
        setActiveModal('search');
        try {
          const pureBase64 = base64String.split(',')[1];
          const result = await analyzeDesignImage(pureBase64);
          setAnalysisResult(result);
        } catch (error) { 
          console.error(error); 
        } finally { 
          setIsAnalyzing(false); 
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const closeModal = () => {
    setActiveModal(null); 
    setSearchImage(null); 
    setAnalysisResult(null);
  };

  const navigate = useNavigate();
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  const onNavigate = (page: 'home' | 'rooms' | 'professionals') => {
    const routes: Record<string, string> = {
      'home': '/',
      'rooms': '/rooms',
      'professionals': '/professionals'
    };
    navigate(routes[page]);
  };

  const openDesignerDetail = (designer: Designer) => {
    navigate(`/designers/${designer.id}`);
  };

  const openProjectDetail = (project: Project, designerId: string) => {
    navigate(`/designers/${designerId}/projects/${project.id}`);
  };

  const openContactModal = (designer: Designer) => {
    setContactDesigner(designer);
    setIsContactModalOpen(true);
  };

  // Home page component
  const HomePage: React.FC = () => (
    <>
      <Hero onAction={(id) => setActiveModal(id)} />
      
      {/* GET INSPIRED SECTION - COMPACT RE-DESIGN */}
      <section className="bg-[#0c0c0c] py-16 px-6">
              <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
                
                {/* Left Column: Form */}
                <div className="flex-1 w-full">
                  <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4 tracking-tight">Have something in mind?</h2>
                  <p className="text-slate-400 text-sm font-medium mb-10 max-w-md leading-relaxed">
                    Upload a photo and tell us your vision. We'll match you with designers who've actually done similar work.
                  </p>

                  <div className="space-y-6">
                    {/* Compact Upload Box */}
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-emerald-500/50 hover:bg-white/5 transition-all group bg-white/[0.01]"
                    >
                      <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                        <Upload size={22} />
                      </div>
                      <div className="text-center">
                        <p className="font-bold text-white text-base">Upload photos / screenshots / Pinterest images</p>
                        <p className="text-[10px] text-slate-600 mt-1.5 font-bold uppercase tracking-widest">Screenshots are fine</p>
                      </div>
                    </div>

                    {/* Vision Textarea */}
                    <div className="space-y-3">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">What do you like about this design? <span className="text-slate-600 font-medium normal-case tracking-normal">(optional)</span></p>
                      <textarea 
                        value={userVision}
                        onChange={(e) => setUserVision(e.target.value)}
                        placeholder="E.g. Cozy living room with lots of plants"
                        className="w-full bg-white/[0.02] border border-white/10 rounded-xl p-4 text-[13px] text-white focus:outline-none focus:border-emerald-500/50 min-h-[100px] resize-none placeholder:text-slate-700 transition-all font-medium"
                      />
                    </div>

                    {/* Tags Section */}
                    <div className="space-y-4">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Room</span>
                        <div className="flex flex-wrap gap-2">
                          {['Kitchen', 'Bedroom', 'Living', 'Full Home'].map(room => (
                            <button 
                              key={room}
                              onClick={() => setSelectedRoom(room)}
                              className={`text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-lg border transition-all ${selectedRoom === room ? 'bg-white text-black border-white' : 'bg-transparent text-slate-400 border-white/10 hover:border-white/20'}`}
                            >
                              {room}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Timeline</span>
                        <div className="flex flex-wrap gap-2">
                          {['ASAP', '1-3 months', 'Just exploring'].map(time => (
                            <button 
                              key={time}
                              onClick={() => setSelectedTimeline(time)}
                              className={`text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-lg border transition-all ${selectedTimeline === time ? 'bg-white text-black border-white' : 'bg-transparent text-slate-400 border-white/10 hover:border-white/20'}`}
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="pt-4">
                      <button className="w-full bg-[#113a2f] hover:bg-[#164d3e] text-[#69d1a3] py-4 rounded-xl font-black text-xs uppercase tracking-[0.25em] flex items-center justify-center gap-3 transition-all shadow-xl group border border-[#1a5a48]/20">
                        <Search size={18} className="group-hover:scale-105 transition-transform" />
                        Find matching designers
                      </button>
                      <p className="text-center text-[9px] text-slate-600 font-bold uppercase tracking-[0.2em] mt-4">Free. No calls until you choose.</p>
                    </div>
                  </div>
                </div>

                {/* Right Column: How it works */}
                <div className="lg:w-[380px] shrink-0 w-full">
                  <div className="space-y-8">
                    <h3 className="text-xl font-bold text-white tracking-tight">How Houzat finds the right designers</h3>
                    
                    <div className="relative space-y-8">
                      {/* Steps with connecting dotted line */}
                      <div className="absolute left-5 top-10 bottom-10 w-[1px] border-l border-dashed border-white/10"></div>
                      
                      {[
                        { num: 1, title: 'We analyze photos', desc: 'AI decodes your style from images & notes' },
                        { num: 2, title: 'We verify past work', desc: 'Only pros with proven similar work qualify' },
                        { num: 3, title: 'You choose', desc: 'Compare designers, quotes, and EMI options' }
                      ].map((step, idx) => (
                        <div key={idx} className="flex gap-6 relative z-10">
                          <div className="w-10 h-10 rounded-full bg-[#161616] border border-white/10 text-emerald-400 flex items-center justify-center font-bold text-sm shrink-0 shadow-lg">
                            {step.num}
                          </div>
                          <div className="pt-1">
                            <h4 className="text-white font-bold text-base mb-1">{step.title}</h4>
                            <p className="text-slate-500 text-[13px] font-medium leading-relaxed">{step.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Compact Highlight Box */}
                    <div className="bg-[#111111] border border-white/10 rounded-xl p-5 flex items-center gap-4 shadow-lg">
                      <div className="w-8 h-8 rounded-lg bg-emerald-400/10 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-400/20">
                        <CheckCircle2 size={16} />
                      </div>
                      <p className="text-[12px] font-bold text-slate-400 leading-tight">Verified designers only with executed past work</p>
                    </div>

                    {/* Proof Gallery */}
                    <div className="grid grid-cols-3 gap-3">
                      <div className="aspect-[3/4] rounded-xl overflow-hidden relative border border-white/5">
                        <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=200" className="w-full h-full object-cover grayscale-[0.3]" alt="" />
                        <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/80 backdrop-blur-md px-1.5 py-0.5 rounded-md text-[8px] font-black uppercase text-emerald-400 border border-emerald-500/30">
                           Verified
                        </div>
                      </div>
                      <div className="aspect-[3/4] rounded-xl overflow-hidden relative border border-white/5">
                        <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=200" className="w-full h-full object-cover grayscale-[0.3]" alt="" />
                        <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/80 backdrop-blur-md px-1.5 py-0.5 rounded-md text-[8px] font-black uppercase text-emerald-400 border border-emerald-500/30">
                           Verified
                        </div>
                      </div>
                      {/* Simple Phone UI Mockup */}
                      <div className="aspect-[3/4] rounded-xl bg-[#f8f9fa] p-3 flex flex-col justify-between shadow-2xl relative border border-white/10">
                         <div className="flex justify-between items-center opacity-10">
                            <div className="w-4 h-1 bg-black rounded-full"></div>
                            <div className="w-1 h-1 bg-black rounded-full"></div>
                         </div>
                         <div className="space-y-1.5">
                            <div className="flex flex-col">
                              <span className="text-[11px] font-black text-black leading-tight">₹8.5 Lakhs</span>
                              <div className="w-8 h-1 bg-emerald-500 rounded-full mt-0.5"></div>
                            </div>
                            <div className="space-y-1 pt-1 opacity-40">
                               <div className="w-full h-1 bg-slate-200 rounded-full"></div>
                               <div className="w-3/4 h-1 bg-slate-200 rounded-full"></div>
                            </div>
                         </div>
                         <div className="pt-2 border-t border-slate-100">
                            <div className="w-full h-4 bg-[#111111] rounded-md"></div>
                         </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* PLAN WITHOUT STRESS SECTION */}
            <section className="py-20 px-6 bg-[#080808]">
              <div className="max-w-6xl mx-auto bg-[#111111] rounded-[2.5rem] overflow-hidden border border-white/5 flex flex-col lg:flex-row shadow-2xl">
                <div className="w-full lg:w-[40%] h-[300px] lg:h-auto overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover opacity-30 grayscale-[0.6]" alt="Kitchen Detail" />
                </div>
                <div className="flex-1 p-10 lg:p-16 flex flex-col justify-center">
                  <h2 className="text-3xl lg:text-4xl font-bold mb-8 tracking-tight text-white leading-tight">Plan without <br/>upfront stress</h2>
                  <div className="space-y-5 mb-10">
                    {["EMI from multiple banks", "Check eligibility before final quote", "No obligation to take a loan"].map(text => (
                      <div key={text} className="flex items-center gap-4 text-slate-400 font-bold text-sm">
                        <div className="w-6 h-6 rounded-full border border-emerald-500/30 flex items-center justify-center shrink-0 bg-emerald-500/5">
                          <Check size={14} className="text-emerald-400" strokeWidth={3} />
                        </div>
                        {text}
                      </div>
                    ))}
                  </div>
                  <button className="bg-[#113a2f] text-[#69d1a3] w-fit px-10 py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.25em] flex items-center justify-center gap-3 hover:bg-[#164d3e] transition-all shadow-xl border border-[#1a5a48]/20">
                    Check EMI options <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </section>
    </>
  );

  // Designer detail wrapper component
  const DesignerDetailWrapper: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    return id ? (
      <DesignerDetailPage 
        designerId={id} 
        onBack={() => navigate('/professionals')} 
        onContact={openContactModal}
        onProjectClick={(project) => {
          navigate(`/designers/${id}/projects/${project.id}`);
        }}
      />
    ) : null;
  };

  // Project detail wrapper component
  const ProjectDetailWrapper: React.FC = () => {
    const { designerId, projectId } = useParams<{ designerId: string; projectId: string }>();
    return (designerId && projectId) ? (
      <ProjectDetailPage 
        designerId={designerId}
        projectId={projectId}
        onBack={() => navigate(`/designers/${designerId}`)}
        onContact={openContactModal}
        onOtherProjectClick={(project) => {
          navigate(`/designers/${designerId}/projects/${project.id}`);
        }}
      />
    ) : null;
  };

  return (
    <div className="min-h-screen bg-[#0c0c0c] text-white">
      <Navbar onNavigate={onNavigate} />
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/rooms" element={<RoomDesignPage />} />
        <Route path="/professionals" element={<ProfessionalsPage onDesignerClick={openDesignerDetail} onContactClick={openContactModal} />} />
        <Route path="/designers/:id" element={<DesignerDetailWrapper />} />
        <Route path="/designers/:designerId/projects/:projectId" element={<ProjectDetailWrapper />} />
      </Routes>

      <footer className="bg-black text-white py-24 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 text-center md:text-left">
          <div>
            <Logo light />
            <p className="text-slate-500 text-sm leading-relaxed mt-8 font-medium max-w-xs mx-auto md:mx-0">
              Crafting the future of architectural living through AI-driven design matching and integrated premium capital solutions.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-12 md:col-span-2 text-left">
            <div>
              <h4 className="font-black text-[9px] uppercase tracking-[0.3em] text-emerald-400 mb-8">Exploration</h4>
              <ul className="space-y-4 text-xs text-slate-400 font-bold uppercase tracking-widest">
                <li><button onClick={() => onNavigate('rooms')} className="hover:text-white transition-colors">Design Hub</button></li>
                <li><button onClick={() => onNavigate('professionals')} className="hover:text-white transition-colors">Verified Network</button></li>
                <li><a href="#" className="hover:text-white transition-colors">Architectural Mag</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Capital Tools</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-[9px] uppercase tracking-[0.3em] text-emerald-400 mb-8">Company</h4>
              <ul className="space-y-4 text-xs text-slate-400 font-bold uppercase tracking-widest">
                <li><a href="#" className="hover:text-white transition-colors">Our Manifesto</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Partner Program</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Institutional</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Global Privacy</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      {/* Chatbot button commented out for now
      <div className="fixed bottom-8 right-6 md:right-8 z-[200]">
        <button 
          onClick={() => setIsChatOpen(!isChatOpen)}
          className={`group flex items-center gap-3 px-6 py-4 rounded-full shadow-2xl transition-all duration-500 hover:scale-105 active:scale-95 ${isChatOpen ? 'bg-white text-black' : 'bg-[#113a2f] backdrop-blur-3xl border border-[#1a5a48]/40 text-[#69d1a3] shadow-emerald-950/40'}`}
        >
          {isChatOpen ? (
            <X size={18} className="text-black" />
          ) : (
            <>
              <Sparkles size={18} className="text-[#69d1a3] group-hover:rotate-12 transition-transform" />
              <span className="text-[11px] font-black uppercase tracking-widest">Ask Houzat AI</span>
            </>
          )}
        </button>
      </div>
      */}

      {/* <Chatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} /> */}

      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />

      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
        designer={contactDesigner} 
      />

      {activeModal === 'search' && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
          <div className="bg-[#121212] w-full max-w-3xl rounded-[2rem] overflow-hidden shadow-2xl animate-in zoom-in duration-500 border border-white/10 text-left">
            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-[#181818]">
              <h2 className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-400">Architectural AI Decoding</h2>
              <button onClick={closeModal} className="p-2 hover:bg-white/5 rounded-xl transition-colors text-white"><X size={20} /></button>
            </div>
            <div className="p-10">
              {!searchImage ? (
                <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-white/10 rounded-[1.5rem] p-16 flex flex-col items-center gap-6 cursor-pointer hover:border-emerald-400/50 hover:bg-emerald-50/5 transition-all group">
                   <div className="w-16 h-16 bg-white/5 text-emerald-400 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-105 transition-transform border border-white/5"><Camera size={32}/></div>
                   <div className="text-center">
                      <p className="font-bold text-xl text-white tracking-tight">Upload References</p>
                      <p className="text-sm text-slate-500 mt-2 font-medium">Houzat AI will decode style and complexity</p>
                   </div>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-10">
                  <div className="rounded-[1.5rem] overflow-hidden shadow-2xl border border-white/10"><img src={searchImage} className="w-full h-auto" alt="Search Source" /></div>
                  <div className="space-y-6 flex flex-col justify-center">
                    {isAnalyzing ? (
                      <div className="space-y-4">
                        <div className="h-8 w-3/4 bg-white/5 shimmer rounded-full" />
                        <div className="h-4 w-full bg-white/5 shimmer rounded-full" />
                        <div className="h-4 w-5/6 bg-white/5 shimmer rounded-full" />
                      </div>
                    ) : analysisResult && (
                      <div className="animate-in fade-in slide-in-from-right duration-700">
                        <Badge>Signature Verified</Badge>
                        <h3 className="text-2xl font-extrabold mt-4 tracking-tight uppercase leading-tight text-white">{analysisResult.style} {analysisResult.roomType}</h3>
                        <div className="mt-6 space-y-3">
                           <div className="flex justify-between items-center text-xs font-bold border-b border-white/5 pb-3 text-slate-300">
                              <span className="text-slate-500 uppercase tracking-[0.2em] text-[9px]">Houzat Est.</span>
                              <span className="text-white">{analysisResult.estimatedPrice}</span>
                           </div>
                           <p className="text-xs text-slate-500 leading-relaxed font-medium italic opacity-70">"Detected {analysisResult.keyFeatures?.[0]} and {analysisResult.keyFeatures?.[1]} elements."</p>
                        </div>
                        <button onClick={closeModal} className="w-full mt-8 bg-emerald-400 text-black py-4 rounded-xl text-[9px] font-black uppercase tracking-[0.3em] shadow-2xl">Connect with Specialists</button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const App: React.FC = () => {
  return <AppContent />;
};

export default App;
