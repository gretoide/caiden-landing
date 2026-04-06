import LazyBg from '../../shared/ui/LazyBg';
import { CONTACT_BG } from './data/images';
import { Phone, Instagram, Send, CheckCircle2, AlertCircle, Loader2, ChevronDown, Mail } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';

const CATEGORIES = [
  'Film & Stage Prop',
  'Commercial Advertising',
  'Private Collector Commission',
  'Other / Collaboration'
];

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  
  // Custom Dropdown State
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setStatus('sending');
    setErrorMessage('');

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      
      setStatus('success');
      formRef.current.reset();
      setSelectedCategory(CATEGORIES[0]);
      
      // Auto-reset after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus('error');
      setErrorMessage('Oops! Something went wrong. Please try again or use direct mail.');
      setTimeout(() => setStatus('idle'), 6000);
    }
  };

  return (
    <section id="contact" className="py-48 relative bg-black w-full overflow-hidden border-t border-white/5">
      {/* Background Image */}
      <LazyBg
        publicId={CONTACT_BG}
        className="absolute inset-0 z-0 opacity-20 bg-cover bg-center pointer-events-none"
        width={1024}
        rootMargin="1200px"
      />
      
      {/* Cinematic Gradient Overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black via-black/80 to-black"></div>
      
      {/* Subtle Texture Overlay */}
      <div className="absolute inset-0 z-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          
          {/* Section Header */}
          <div className="mb-24 flex flex-col items-center text-center">
            <span className="text-white/40 font-sans tracking-[0.5em] text-xs uppercase mb-6 font-bold">Inquiries & Commissions</span>
            <h2 className="text-5xl md:text-8xl font-serif text-white tracking-tighter leading-none mb-8">
              Let's craft the <br/> <span className="text-white/40 italic">extraordinary</span>
            </h2>
            <div className="w-24 h-px bg-white/20 mb-8"></div>
            <p className="text-white/50 font-sans max-w-xl text-lg leading-relaxed">
              Available for film props, commercial projects, and high-end private commissions. Bring your vision to life.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 items-start">
            
            {/* Contact Information */}
            <div className="lg:col-span-2 space-y-12">
              <div className="space-y-6">
                {[
                  { 
                    href: "https://wa.me/61494412012?text=Hello%20Cai!%20I'm%20interested%20in%20starting%20a%20new%20project%20commission.", 
                    label: "WhatsApp Direct", 
                    value: "+61 494 412 012", 
                    icon: Phone 
                  },
                  { 
                    href: "mailto:caidenmikaeldri@gmail.com", 
                    label: "Direct Email", 
                    value: "caidenmikaeldri@gmail.com", 
                    icon: Mail 
                  },
                  { 
                    href: "https://instagram.com/cai.cosplay", 
                    label: "Social Identity", 
                    value: "@cai.cosplay", 
                    icon: Instagram 
                  }
                ].map((item, i) => (
                  <a 
                    key={i}
                    href={item.href} 
                    target="_blank"
                    rel="noreferrer"
                    className="flex flex-col group p-6 border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10 transition-all duration-500 rounded-lg relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-1 h-0 group-hover:h-full bg-brand-400 transition-all duration-500"></div>
                    <span className="text-[10px] md:text-xs font-sans tracking-[0.3em] text-white/40 uppercase mb-3 flex items-center gap-3 group-hover:text-brand-400 transition-colors">
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </span>
                    <span className="text-xl md:text-2xl font-sans font-light text-white group-hover:translate-x-2 transition-transform duration-500 tracking-wide">
                      {item.value}
                    </span>
                  </a>
                ))}
              </div>

              <div className="pt-12 border-t border-white/10">
                <div className="flex items-center gap-4 text-white/40 font-sans text-xs tracking-widest uppercase bg-white/[0.02] p-4 border border-white/5 rounded-lg">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                  Currently receiving new project briefs
                </div>
              </div>
            </div>

            {/* Inquiry Form */}
            <div className="lg:col-span-3">
              <form 
                ref={formRef}
                onSubmit={sendEmail}
                className="bg-black/40 p-8 md:p-12 border border-white/5 space-y-8 rounded-2xl relative overflow-hidden"
              >
                {/* Visual Accent */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="relative group">
                    <input 
                      type="text"
                      id="user_name"
                      name="user_name"
                      className="peer w-full bg-white/[0.03] border-b border-white/10 px-4 py-4 text-white focus:outline-none focus:border-brand-400 focus:bg-white/[0.06] transition-all duration-500 font-sans placeholder-transparent rounded-t-lg" 
                      placeholder="Full Name" 
                      required
                    />
                    <label 
                      htmlFor="user_name" 
                      className="absolute left-4 -top-0 text-[9px] font-sans tracking-[0.2em] text-white/40 uppercase transition-all duration-300 peer-placeholder-shown:text-white/40 peer-placeholder-shown:top-5 peer-focus:-top-4 peer-focus:left-4 peer-focus:text-brand-400 cursor-text"
                    >
                      Full Name
                    </label>
                  </div>
                  <div className="relative group">
                    <input 
                      type="email"
                      id="user_email"
                      name="user_email"
                      className="peer w-full bg-white/[0.03] border-b border-white/10 px-4 py-4 text-white focus:outline-none focus:border-brand-400 focus:bg-white/[0.06] transition-all duration-500 font-sans placeholder-transparent rounded-t-lg" 
                      placeholder="Email Address" 
                      required
                    />
                    <label 
                      htmlFor="user_email" 
                      className="absolute left-4 -top-0 text-[9px] font-sans tracking-[0.2em] text-white/40 uppercase transition-all duration-300 peer-placeholder-shown:text-white/40 peer-placeholder-shown:top-5 peer-focus:-top-4 peer-focus:left-4 peer-focus:text-brand-400 cursor-text"
                    >
                      Email Address
                    </label>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-sans tracking-[0.3em] text-white/40 uppercase mb-2 block pl-1">Project Category</label>
                  
                  {/* Custom Dropdown */}
                  <div className="relative" ref={dropdownRef}>
                    <input type="hidden" name="project_category" value={selectedCategory} />
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className={`w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-4 text-white text-left focus:outline-none focus:border-brand-400 focus:bg-white/[0.06] transition-all duration-300 font-sans flex items-center justify-between ${isDropdownOpen ? 'border-brand-400 bg-white/[0.06] rounded-b-none' : ''}`}
                    >
                      <span className={selectedCategory ? 'text-white' : 'text-white/40'}>
                        {selectedCategory || 'Select Category'}
                      </span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180 text-brand-400' : 'text-white/40'}`} />
                    </button>

                    {/* Options Menu */}
                    <div className={`absolute top-full left-0 w-full z-50 bg-[#0a0a0a] border-x border-b border-brand-400/50 rounded-b-lg overflow-hidden transition-all duration-300 backdrop-blur-xl ${isDropdownOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
                      <div className="py-1">
                        {CATEGORIES.map((cat) => (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => {
                              setSelectedCategory(cat);
                              setIsDropdownOpen(false);
                            }}
                            className={`w-full px-4 py-3 text-left text-sm font-sans transition-colors ${selectedCategory === cat ? 'bg-brand-400/20 text-brand-400 font-bold' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative group pt-4">
                  <textarea 
                    id="message"
                    name="message"
                    rows={4} 
                    className="peer w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-4 text-white hover:border-white/50 focus:outline-none focus:border-brand-400 focus:bg-white/[0.06] transition-all duration-300 font-sans resize-none placeholder-transparent" 
                    placeholder="Project Brief"
                    required
                  ></textarea>
                  <label 
                    htmlFor="message" 
                    className="absolute left-4 top-0 text-[10px] font-sans tracking-[0.2em] text-white/40 uppercase transition-all duration-300 peer-placeholder-shown:text-white/40 peer-placeholder-shown:top-8 peer-placeholder-shown:left-4 peer-focus:-top-4 peer-focus:left-4 peer-focus:text-brand-400 cursor-text z-10"
                  >
                    Describe your vision...
                  </label>
                </div>

                {status === 'error' && (
                  <div className="flex items-center gap-3 text-red-400 bg-red-400/5 border border-red-400/20 px-4 py-4 rounded-lg text-[10px] font-sans uppercase tracking-widest animate-in fade-in slide-in-from-top-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {errorMessage}
                  </div>
                )}

                {status === 'success' && (
                  <div className="flex items-center gap-3 text-green-400 bg-green-400/5 border border-green-400/20 px-4 py-4 rounded-lg text-[10px] font-sans uppercase tracking-widest animate-in fade-in slide-in-from-top-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    Message sent successfully!
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={status === 'sending' || status === 'success'}
                  className={`w-full font-sans font-black py-6 tracking-[0.5em] uppercase transition-all duration-700 flex items-center justify-center gap-4 rounded-lg shadow-2xl relative overflow-hidden group/btn ${
                    status === 'sending' || status === 'success'
                      ? 'bg-white/5 text-white/20 cursor-not-allowed border border-white/5'
                      : 'bg-white text-black hover:scale-[1.02] active:scale-[0.98]'
                  }`}
                >
                  {status === 'sending' ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Dispatching...
                    </>
                  ) : status === 'success' ? (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      Dispatched
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 opacity-40 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                      Send Inquiry
                    </>
                  )}
                </button>
              </form>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
