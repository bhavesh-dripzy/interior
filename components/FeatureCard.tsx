
import React from 'react';

interface FeatureCardProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  btnLabel: string;
  onClick: () => void;
  color: 'emerald' | 'cyan' | 'amber';
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ title, subtitle, icon, btnLabel, onClick, color }) => {
  const themes = {
    emerald: {
      border: 'border-emerald-500/30',
      glow: 'shadow-[0_0_30px_rgba(16,185,129,0.1)]',
      iconBorder: 'border-emerald-400/20',
      iconBg: 'bg-emerald-400/5',
      iconGlow: 'shadow-[0_0_15px_rgba(52,211,153,0.2)]',
      text: 'text-emerald-400',
      btnBorder: 'border-emerald-500/40',
      btnGlow: 'hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]',
    },
    cyan: {
      border: 'border-cyan-500/30',
      glow: 'shadow-[0_0_30px_rgba(6,182,212,0.1)]',
      iconBorder: 'border-cyan-400/20',
      iconBg: 'bg-cyan-400/5',
      iconGlow: 'shadow-[0_0_15px_rgba(34,211,238,0.2)]',
      text: 'text-cyan-400',
      btnBorder: 'border-cyan-500/40',
      btnGlow: 'hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]',
    },
    amber: {
      border: 'border-amber-500/30',
      glow: 'shadow-[0_0_30px_rgba(245,158,11,0.1)]',
      iconBorder: 'border-amber-400/20',
      iconBg: 'bg-amber-400/5',
      iconGlow: 'shadow-[0_0_15px_rgba(251,191,36,0.2)]',
      text: 'text-amber-400',
      btnBorder: 'border-amber-500/40',
      btnGlow: 'hover:shadow-[0_0_20px_rgba(245,158,11,0.3)]',
    },
  };

  const theme = themes[color];

  return (
    <div 
      onClick={onClick}
      className={`group relative flex flex-col items-center text-center p-6 lg:p-7 rounded-[2rem] cursor-pointer transition-all duration-500 overflow-hidden bg-black/50 backdrop-blur-md border ${theme.border} ${theme.glow} w-full mx-auto hover:bg-black/70 hover:-translate-y-1`}
    >
      <div className={`absolute -top-10 -right-10 w-24 h-24 bg-${color}-500/5 blur-[60px] group-hover:bg-${color}-500/10 transition-all duration-500`}></div>
      
      <div className={`relative z-10 w-12 h-12 rounded-xl border ${theme.iconBorder} ${theme.iconBg} flex items-center justify-center mb-6 ${theme.iconGlow}`}>
        <div className={theme.text}>
          {React.cloneElement(icon as React.ReactElement<any>, { size: 22, strokeWidth: 1.5 })}
        </div>
      </div>

      <h3 
        className="relative z-10 text-lg lg:text-xl font-bold text-white mb-3 leading-[1.2] tracking-tight max-w-[180px]" 
        dangerouslySetInnerHTML={{ __html: title }} 
      />
      
      <p className="relative z-10 text-[9px] font-bold text-slate-500 mb-8 uppercase tracking-[0.2em] opacity-70 group-hover:opacity-100 transition-opacity">
        {subtitle}
      </p>

      <button className={`relative z-10 w-full py-2.5 rounded-xl border ${theme.btnBorder} bg-white/5 text-white font-black text-[9px] uppercase tracking-[0.3em] transition-all duration-300 ${theme.btnGlow} hover:bg-white/10`}>
        {btnLabel}
      </button>
    </div>
  );
};
