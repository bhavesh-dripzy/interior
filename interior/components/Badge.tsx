
import React from 'react';

export const Badge: React.FC<{ children: React.ReactNode; color?: string }> = ({ children, color = "emerald" }) => (
  <span className={`px-2 py-0.5 rounded-sm text-[10px] font-bold uppercase tracking-wider bg-${color}-50 text-${color}-600 border border-${color}-100`}>
    {children}
  </span>
);
