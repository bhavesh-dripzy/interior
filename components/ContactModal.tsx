
import React, { useState } from 'react';
import { X, Star } from 'lucide-react';
import { Designer } from '../types';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  designer: Designer | null;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, designer }) => {
  const [message, setMessage] = useState('');
  const [saveMessage, setSaveMessage] = useState(false);

  if (!isOpen || !designer) return null;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-[480px] rounded-xl shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X size={22} strokeWidth={2.5} />
        </button>

        <div className="p-8">
          {/* Title */}
          <h2 className="text-2xl font-bold text-[#333333] mb-6 leading-tight">
            Contact this pro
          </h2>

          {/* Recipient Section */}
          <div className="mb-6">
            <p className="text-[13px] font-black uppercase tracking-widest text-[#333333] mb-3">To:</p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border border-slate-200 overflow-hidden bg-slate-50 flex items-center justify-center shrink-0">
                {designer.portfolio[0] ? (
                  <img src={designer.portfolio[0]} alt={designer.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-xs font-bold text-slate-400">P</span>
                )}
              </div>
              <div>
                <h3 className="text-base font-bold text-[#333333] leading-tight uppercase tracking-tight">{designer.name}</h3>
                <div className="flex items-center gap-1.5 mt-1">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={12} 
                        fill={i < Math.floor(designer.rating) ? "#facc15" : "none"} 
                        className={i < Math.floor(designer.rating) ? "text-yellow-400" : "text-slate-200"} 
                      />
                    ))}
                  </div>
                  <span className="text-[11px] font-bold text-slate-400 ml-0.5">{designer.reviewsCount} Reviews</span>
                </div>
              </div>
            </div>
          </div>

          {/* Message Section */}
          <div className="mb-6">
            <p className="text-[13px] font-black uppercase tracking-widest text-[#333333] mb-3">Message:</p>
            <div className="relative">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell this pro what you have in mind for your project..."
                className="w-full h-48 p-4 text-[13px] text-white placeholder:text-slate-400 bg-[#3a3a3a] border border-slate-400 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all resize-none leading-relaxed"
              />
              <div className="absolute bottom-4 right-4 w-6 h-6 rounded-full bg-[#4a4a4a] border border-white/10 flex items-center justify-center">
                <div className="text-[10px] font-black text-emerald-400">G</div>
              </div>
            </div>
          </div>

          {/* Save Toggle */}
          <div className="flex items-center gap-3 mb-10">
            <button 
              onClick={() => setSaveMessage(!saveMessage)}
              className={`w-10 h-5.5 rounded-full transition-colors relative shrink-0 ${saveMessage ? 'bg-emerald-500' : 'bg-slate-200'}`}
            >
              <div className={`absolute top-0.5 w-4.5 h-4.5 bg-white rounded-full shadow-sm transition-transform ${saveMessage ? 'left-[20px]' : 'left-0.5'}`} />
            </button>
            <span className="text-[12px] font-bold text-slate-500 leading-snug">
              Save your message to save time – easily contact more pros
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button 
              onClick={onClose}
              className="px-6 py-2.5 text-xs font-black uppercase tracking-widest text-[#333333] border border-slate-300 rounded hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button 
              className={`px-8 py-2.5 text-xs font-black uppercase tracking-widest rounded transition-all shadow-lg ${
                message.trim() 
                ? 'bg-[#efede9] text-[#333333] hover:bg-[#e3e0d6] scale-[1.02] active:scale-95' 
                : 'bg-[#efede9] text-[#333333] opacity-60 cursor-not-allowed'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
