
import React, { useState, useEffect, useRef } from 'react';
import { Bot, User, Loader2, X, Send } from 'lucide-react';
// import { GoogleGenAI } from "@google/genai"; // Commented out for now

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Chatbot: React.FC<ChatbotProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    { role: 'ai', text: 'Welcome to Houzat! I am your AI architectural assistant. How can I help you plan your dream home today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<any>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      // Chatbot functionality commented out for now
      // const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      // if (!chatRef.current) {
      //   chatRef.current = ai.chats.create({
      //     model: 'gemini-3-flash-preview',
      //     config: {
      //       systemInstruction: 'You are Houzat AI, a premium interior design assistant. Help users discover designs, understand EMI options, find designers, and plan their home renovations. Be professional, helpful, and concise. Use a tone that matches a world-class architectural brand.',
      //     }
      //   });
      // }
      // 
      // const response = await chatRef.current.sendMessage({ message: userMsg });
      // setMessages(prev => [...prev, { role: 'ai', text: response.text }]);
      
      // Mock response for now
      setMessages(prev => [...prev, { role: 'ai', text: "Chatbot functionality is temporarily disabled." }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', text: "I'm having trouble connecting right now. Please try again later." }]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-28 right-6 md:right-10 z-[200] w-[calc(100vw-3rem)] md:w-[400px] h-[550px] bg-black/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 duration-500">
      <div className="p-6 bg-[#111111] border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center text-emerald-400">
            <Bot size={20} />
          </div>
          <div>
            <h4 className="text-sm font-black text-white uppercase tracking-widest">Houzat AI</h4>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Online Assistant</span>
            </div>
          </div>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-xl transition-colors text-slate-400"><X size={20} /></button>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center ${m.role === 'user' ? 'bg-white/5 border border-white/10' : 'bg-emerald-400/10 border border-emerald-400/20 text-emerald-400'}`}>
                {m.role === 'user' ? <User size={14} className="text-slate-400" /> : <Bot size={14} />}
              </div>
              <div className={`p-4 rounded-2xl text-xs font-medium leading-relaxed ${m.role === 'user' ? 'bg-[#1a1a1a] text-white border border-white/5' : 'bg-white/5 text-slate-300 border border-white/5'}`}>
                {m.text}
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start animate-in fade-in duration-300">
            <div className="bg-white/5 border border-white/5 p-4 rounded-2xl flex items-center gap-2">
              <Loader2 size={16} className="text-emerald-400 animate-spin" />
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Architecting response...</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 bg-[#111111] border-t border-white/5">
        <div className="relative">
          <input 
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-6 pr-14 text-xs font-medium text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/50 transition-all"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className={`absolute right-2 top-2 w-10 h-10 rounded-xl flex items-center justify-center transition-all ${input.trim() ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20' : 'bg-white/5 text-slate-600'}`}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
