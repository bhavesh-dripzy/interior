
import React from 'react';
import { ImageIcon, IndianRupee, ClipboardCheck } from 'lucide-react';
import { FeatureCard } from './FeatureCard';

export const Hero: React.FC<{ onAction: (id: string) => void }> = ({ onAction }) => (
  <section className="relative w-full min-h-[85vh] overflow-hidden bg-[#0c0c0c] flex flex-col justify-center pt-24">
    <div className="absolute inset-0 flex">
      <div className="w-1/3 h-full border-r border-white/5 opacity-20">
        <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover grayscale brightness-[0.5]" alt="Living" />
      </div>
      <div className="w-1/3 h-full border-r border-white/5 opacity-20">
        <img src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover grayscale brightness-[0.5]" alt="Kitchen" />
      </div>
      <div className="w-1/3 h-full opacity-20">
        <img src="https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover grayscale brightness-[0.5]" alt="Bedroom" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0c0c0c]/60 via-transparent to-[#0c0c0c]"></div>
    </div>

    <div className="relative z-20 max-w-7xl mx-auto w-full px-6 py-12 text-center">
      <div className="animate-in fade-in slide-in-from-top duration-1000">
        <h1 className="text-3xl lg:text-5xl font-extrabold text-white mb-4 tracking-tight leading-[1.15]">
          Find Right Interior designers for <br className="hidden lg:block"/> your dream home
        </h1>
        <p className="text-sm lg:text-base text-slate-400 mb-12 max-w-2xl mx-auto font-medium leading-relaxed opacity-60">
          Discover designs, compare verified local designers, get free quotes — and check instant loan eligibility before you commit.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom duration-1000 delay-200">
        <FeatureCard 
          color="cyan"
          title="Browse Designs /<br/>Upload Photo"
          subtitle="Explore real interiors"
          icon={<ImageIcon />}
          btnLabel="Explore Now"
          onClick={() => onAction('search')}
        />
        <FeatureCard 
          color="emerald"
          title="Check EMI<br/>in 30 seconds"
          subtitle="See monthly EMI options"
          icon={<IndianRupee />}
          btnLabel="Check Eligibility"
          onClick={() => onAction('emi')}
        />
        <FeatureCard 
          color="amber"
          title="Get free<br/>quotes"
          subtitle="Compare & book designers"
          icon={<ClipboardCheck />}
          btnLabel="Get Quotes"
          onClick={() => onAction('quotes')}
        />
      </div>
    </div>
  </section>
);
