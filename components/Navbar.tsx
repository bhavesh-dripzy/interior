
import React from 'react';
import { Logo } from './Logo';

export const Navbar: React.FC<{ 
  onNavigate: (page: 'home' | 'rooms' | 'professionals' | 'ai-matching') => void 
}> = ({ onNavigate }) => (
  <header className="w-full fixed top-0 left-0 z-[100] bg-black/90 backdrop-blur-xl border-b border-white/5 shadow-2xl">
    <nav className="max-w-7xl mx-auto px-6 lg:px-10 py-4 flex items-center justify-between relative">
      <div onClick={() => onNavigate('home')} className="cursor-pointer shrink-0">
        <Logo light />
      </div>
      
      {/* Centered Navigation Links */}
      <div className="absolute left-1/2 -translate-x-1/2 hidden lg:flex items-center gap-10 text-[11px] font-bold uppercase tracking-[0.25em] text-slate-400">
        <button onClick={() => onNavigate('rooms')} className="hover:text-emerald-400 transition-colors">Rooms</button>
        <button onClick={() => onNavigate('ai-matching')} className="hover:text-emerald-400 transition-colors">AI Matching</button>
        <button onClick={() => onNavigate('professionals')} className="hover:text-emerald-400 transition-colors">Professionals</button>
      </div>

      <div className="flex items-center gap-6 shrink-0">
        <button className="bg-emerald-400/10 text-emerald-400 border border-emerald-400/30 px-6 py-2 rounded-xl text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-emerald-400 hover:text-black transition-all">
          Log In
        </button>
      </div>
    </nav>
  </header>
);
