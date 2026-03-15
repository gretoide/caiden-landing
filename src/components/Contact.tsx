import DeferredBackground from './DeferredBackground';
import { IMAGES } from '../content/images';
import { Mail, Phone, Instagram } from 'lucide-react';

const CONTACT_BG = IMAGES.contact.background;

export default function Contact() {
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
              <form className="bg-black/40 p-8 md:p-12 border border-white/5 space-y-8" onSubmit={(e) => e.preventDefault()}>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="relative group">
                    <input 
                      type="text"
                      id="name"
                      className="peer w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-white transition-all duration-500 font-sans placeholder-transparent" 
                      placeholder="Full Name" 
                      required
                    />
                    <label 
                      htmlFor="name" 
                      className="absolute left-0 -top-4 text-[10px] font-sans tracking-[0.2em] text-white/60 uppercase transition-all duration-300 peer-placeholder-shown:text-white/40 peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-white cursor-text"
                    >
                      Full Name
                    </label>
                  </div>
                  <div className="relative group">
                    <input 
                      type="email"
                      id="email"
                      className="peer w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-white transition-all duration-500 font-sans placeholder-transparent" 
                      placeholder="Email Address" 
                      required
                    />
                    <label 
                      htmlFor="email" 
                      className="absolute left-0 -top-4 text-[10px] font-sans tracking-[0.2em] text-white/60 uppercase transition-all duration-300 peer-placeholder-shown:text-white/40 peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-white cursor-text"
                    >
                      Email Address
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-sans tracking-[0.3em] text-white/40 uppercase mb-2 block">Project Category</label>
                  <div className="relative">
                    <select className="w-full bg-white/5 border border-white/10 rounded-none px-4 py-4 text-white hover:border-white/50 focus:outline-none focus:border-white transition-all duration-300 font-sans appearance-none cursor-pointer [&>option]:bg-black">
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
                    id="brief"
                    rows={4} 
                    className="peer w-full bg-white/5 border border-white/10 rounded-none px-4 py-4 text-white hover:border-white/50 focus:outline-none focus:border-white transition-all duration-300 font-sans resize-none placeholder-transparent" 
                    placeholder="Project Brief"
                    required
                  ></textarea>
                  <label 
                    htmlFor="brief" 
                    className="absolute left-4 -top-0 bg-transparent px-1 text-[10px] font-sans tracking-[0.2em] text-white/60 uppercase transition-all duration-300 peer-placeholder-shown:text-white/40 peer-placeholder-shown:top-8 peer-placeholder-shown:left-4 peer-focus:-top-0 peer-focus:bg-black peer-focus:text-white cursor-text z-10"
                  >
                    Describe your vision...
                  </label>
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-white text-black font-sans font-black py-5 tracking-[0.4em] uppercase hover:bg-white/90 transition-all duration-500"
                >
                  Send Inquiry
                </button>
              </form>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
