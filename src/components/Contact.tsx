import DeferredBackground from './ui/DeferredBackground';
import { IMAGES } from './showcase/content/images';
import { Mail, Phone, Instagram, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

const CONTACT_BG = IMAGES.contact.background;

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

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
      <DeferredBackground
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
              <div className="space-y-8">
                <a href="mailto:scyther149@gmail.com" className="flex flex-col group items-start">
                  <span className="text-[10px] md:text-xs font-sans tracking-[0.3em] text-white/40 uppercase mb-3 flex items-center gap-3">
                    <Mail className="w-4 h-4 text-white/40 group-hover:text-white transition-colors duration-500" />
                    Electronic Mail
                  </span>
                  <span className="text-xl md:text-2xl font-sans font-light text-white group-hover:text-white/60 transition-colors duration-500 tracking-wide">scyther149@gmail.com</span>
                </a>

                <a href="tel:0494412012" className="flex flex-col group items-start">
                  <span className="text-[10px] md:text-xs font-sans tracking-[0.3em] text-white/40 uppercase mb-3 flex items-center gap-3">
                    <Phone className="w-4 h-4 text-white/40 group-hover:text-white transition-colors duration-500" />
                    Direct Line
                  </span>
                  <span className="text-xl md:text-2xl font-sans font-light text-white group-hover:text-white/60 transition-colors duration-500 tracking-wide">0494 412 012</span>
                </a>

                <a href="https://instagram.com/cai.cosplay" target="_blank" rel="noreferrer" className="flex flex-col group items-start">
                  <span className="text-[10px] md:text-xs font-sans tracking-[0.3em] text-white/40 uppercase mb-3 flex items-center gap-3">
                    <Instagram className="w-4 h-4 text-white/40 group-hover:text-white transition-colors duration-500" />
                    Social Identity
                  </span>
                  <span className="text-xl md:text-2xl font-sans font-light text-white group-hover:text-white/60 transition-colors duration-500 tracking-wide">@cai.cosplay</span>
                </a>
              </div>

              <div className="pt-12 border-t border-white/10">
                <div className="flex items-center gap-2 text-white/40 font-sans text-xs tracking-widest uppercase">
                  <span className="w-2 h-2 rounded-full bg-green-500/80 animate-pulse"></span>
                  Currently receiving new project briefs
                </div>
              </div>
            </div>

            {/* Inquiry Form */}
            <div className="lg:col-span-3">
              <form 
                ref={formRef}
                onSubmit={sendEmail}
                className="bg-black/40 p-8 md:p-12 border border-white/5 space-y-8"
              >
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="relative group">
                    <input 
                      type="text"
                      id="user_name"
                      name="user_name"
                      className="peer w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-white transition-all duration-500 font-sans placeholder-transparent" 
                      placeholder="Full Name" 
                      required
                    />
                    <label 
                      htmlFor="user_name" 
                      className="absolute left-0 -top-4 text-[10px] font-sans tracking-[0.2em] text-white/60 uppercase transition-all duration-300 peer-placeholder-shown:text-white/40 peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-white cursor-text"
                    >
                      Full Name
                    </label>
                  </div>
                  <div className="relative group">
                    <input 
                      type="email"
                      id="user_email"
                      name="user_email"
                      className="peer w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-white transition-all duration-500 font-sans placeholder-transparent" 
                      placeholder="Email Address" 
                      required
                    />
                    <label 
                      htmlFor="user_email" 
                      className="absolute left-0 -top-4 text-[10px] font-sans tracking-[0.2em] text-white/60 uppercase transition-all duration-300 peer-placeholder-shown:text-white/40 peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-white cursor-text"
                    >
                      Email Address
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-sans tracking-[0.3em] text-white/40 uppercase mb-2 block">Project Category</label>
                  <div className="relative">
                    <select 
                      name="project_category"
                      className="w-full bg-white/5 border border-white/10 rounded-none px-4 py-4 text-white hover:border-white/50 focus:outline-none focus:border-white transition-all duration-300 font-sans appearance-none cursor-pointer [&>option]:bg-black"
                    >
                      <option>Film & Stage Prop</option>
                      <option>Commercial Advertising</option>
                      <option>Private Collector Commission</option>
                      <option>Other / Collaboration</option>
                    </select>
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-white/40">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="relative group pt-4">
                  <textarea 
                    id="message"
                    name="message"
                    rows={4} 
                    className="peer w-full bg-white/5 border border-white/10 rounded-none px-4 py-4 text-white hover:border-white/50 focus:outline-none focus:border-white transition-all duration-300 font-sans resize-none placeholder-transparent" 
                    placeholder="Project Brief"
                    required
                  ></textarea>
                  <label 
                    htmlFor="message" 
                    className="absolute left-4 -top-0 bg-transparent px-1 text-[10px] font-sans tracking-[0.2em] text-white/60 uppercase transition-all duration-300 peer-placeholder-shown:text-white/40 peer-placeholder-shown:top-8 peer-placeholder-shown:left-4 peer-focus:-top-0 peer-focus:bg-black peer-focus:text-white cursor-text z-10"
                  >
                    Describe your vision...
                  </label>
                </div>

                {status === 'error' && (
                  <div className="flex items-center gap-3 text-red-400 bg-red-400/5 border border-red-400/20 px-4 py-3 text-xs font-sans animate-in fade-in slide-in-from-top-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {errorMessage}
                  </div>
                )}

                {status === 'success' && (
                  <div className="flex items-center gap-3 text-green-400 bg-green-400/5 border border-green-400/20 px-4 py-3 text-xs font-sans animate-in fade-in slide-in-from-top-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    Message sent successfully! I'll get back to you soon.
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={status === 'sending' || status === 'success'}
                  className={`w-full font-sans font-black py-5 tracking-[0.4em] uppercase transition-all duration-500 flex items-center justify-center gap-4 ${
                    status === 'sending' || status === 'success'
                      ? 'bg-white/10 text-white/40 cursor-not-allowed'
                      : 'bg-white text-black hover:bg-white/90'
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
                      <Send className="w-5 h-5 opacity-40" />
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
