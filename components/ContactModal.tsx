
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
      <div className="bg-white w-full max-w-[440px] rounded-xl shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 p-1.5 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X size={20} strokeWidth={2.5} />
        </button>

        <div className="p-6">
          {/* Title */}
          <h2 className="text-2xl font-bold text-[#333333] mb-5 leading-tight">
            Contact this pro
          </h2>

          {/* Recipient Section */}
          <div className="mb-5">
            <p className="text-sm font-bold text-[#333333] mb-2.5">To:</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-slate-200 overflow-hidden bg-slate-50 flex items-center justify-center shrink-0">
                {designer.portfolio[0] ? (
                  <img src={designer.portfolio[0]} alt={designer.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-xs font-bold text-slate-400">P</span>
                )}
              </div>
              <div>
                <h3 className="text-base font-semibold text-[#333333] leading-tight">{designer.name}</h3>
                <div className="flex items-center gap-1 mt-0.5">
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
                  <span className="text-[11px] font-medium text-slate-500 ml-0.5">{designer.reviewsCount} Reviews</span>
                </div>
              </div>
            </div>
          </div>

          {/* Message Section */}
          <div className="mb-5">
            <p className="text-sm font-bold text-[#333333] mb-2.5">Message:</p>
            <div className="relative">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell this pro what you have in mind for your project..."
                className="w-full h-32 p-3.5 text-sm text-[#333333] placeholder:text-slate-400 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-400 transition-all resize-none leading-relaxed"
              />
              <div className="absolute bottom-3 right-3 w-5 h-5 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center">
                <div className="text-[9px] font-bold text-emerald-600">G</div>
              </div>
            </div>
          </div>

          {/* Save Toggle */}
          <div className="flex items-center gap-3 mb-8">
            <button 
              onClick={() => setSaveMessage(!saveMessage)}
              className={`w-9 h-5 rounded-full transition-colors relative shrink-0 ${saveMessage ? 'bg-emerald-500' : 'bg-slate-200'}`}
            >
              <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform ${saveMessage ? 'left-[18px]' : 'left-0.5'}`} />
            </button>
            <span className="text-[12px] text-slate-600 leading-snug">
              Save your message to save time – easily contact more pros
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <button 
              onClick={onClose}
              className="px-5 py-2 text-sm font-bold text-[#333333] border border-slate-300 rounded hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button 
              className={`px-7 py-2 text-sm font-bold rounded transition-colors ${
                message.trim() 
                ? 'bg-[#E3E0D6] text-[#333333] hover:bg-[#d8d4c9]' 
                : 'bg-[#E3E0D6] text-[#333333] opacity-60 cursor-not-allowed'
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
