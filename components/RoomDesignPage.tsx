
import React, { useState } from 'react';
import { Filter, ChevronDown } from 'lucide-react';

export const RoomDesignPage: React.FC = () => {
  const categoryCards = [
    { title: 'Kitchen', price: '₹22k/month', img: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=600' },
    { title: 'Bath', price: '₹222k/month', img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600' },
    { title: 'Bedroom', price: '₹22k/month', img: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=600' },
    { title: 'Living', price: '₹22k/month', img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=600' },
    { title: 'Dining', price: '₹22k/month', img: 'https://images.unsplash.com/photo-1617806118233-f8e137453f5c?auto=format&fit=crop&q=80&w=600' },
  ];

  const featuredDesigns = [
    { title: 'Kitchen', price: '₹22k/month EMI', img: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=800' },
    { title: 'Bath', price: 'From ₹22k/month', img: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80&w=800' },
    { title: 'Bedroom', price: 'From ₹22k//month', img: 'https://images.unsplash.com/photo-1616594868566-a894502b8400?auto=format&fit=crop&q=80&w=800' },
    { title: 'Dining', price: 'From ₹22k/month EMI', img: 'https://images.unsplash.com/photo-1617806118233-f8e137453f5c?auto=format&fit=crop&q=80&w=800' },
    { title: 'Outdoor & Garden', price: 'From ₹22k/month', img: 'https://images.unsplash.com/photo-1512918766671-ed6a97be0213?auto=format&fit=crop&q=80&w=800' },
    { title: 'Baby & Kids', price: 'From ₹22k/month EMI', img: 'https://images.unsplash.com/photo-1520188129119-3eca8861367b?auto=format&fit=crop&q=80&w=800' },
  ];

  return (
    <div className="pt-32 pb-24 min-h-screen bg-[#080808]" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/dark-matter.png")', backgroundColor: '#0c0c0c' }}>
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-left mb-16 tracking-tight text-white/95">Browse Designs by Room</h1>
        <div className="flex gap-4 mb-16 overflow-x-auto no-scrollbar pb-4">
          {categoryCards.map((cat) => (
            <div key={cat.title} className="relative min-w-[240px] aspect-[4/3] rounded-2xl overflow-hidden group cursor-pointer border border-white/5 bg-[#111111]">
              <img src={cat.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-60" alt={cat.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col justify-end p-6 text-left">
                <h3 className="text-xl font-black text-white mb-1 uppercase tracking-tight">{cat.title}</h3>
                <p className="text-[10px] text-slate-500 font-black tracking-[0.2em] uppercase">From {cat.price}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-4 mb-10 text-left">
          <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#111111] border border-white/10 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-all">
             <Filter size={14} /> All Filters <ChevronDown size={14} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {featuredDesigns.map((item, idx) => (
            <div key={idx} className="relative aspect-video rounded-3xl overflow-hidden group cursor-pointer border border-white/10 bg-[#111111] shadow-2xl">
              <img src={item.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 opacity-80" alt={item.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-transparent flex flex-col justify-end p-8 text-left">
                <h3 className="text-2xl font-black text-white mb-2 tracking-tight">{item.title}</h3>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em]">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
