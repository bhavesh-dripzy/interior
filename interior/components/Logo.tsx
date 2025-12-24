
import React from 'react';
import { Home } from 'lucide-react';

export const Logo: React.FC<{ light?: boolean }> = ({ light = false }) => (
  <div className="flex items-center gap-2 group cursor-pointer">
    <div className={`relative w-9 h-9 flex items-center justify-center rounded-lg bg-emerald-400 shadow-lg shadow-emerald-400/20`}>
      <Home className={light ? 'text-black' : 'text-white'} size={20} strokeWidth={2.5} />
      <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 ${light ? 'border-black bg-white' : 'border-white bg-black'}`}></div>
    </div>
    <span className={`text-2xl logo-text ${light ? 'text-white' : 'text-black'}`}>HOUZAT</span>
  </div>
);
