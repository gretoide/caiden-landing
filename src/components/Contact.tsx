import DeferredBackground from './DeferredBackground';
import { IMAGES } from '../content/images';

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
            <span className="text-blue-500 font-sans tracking-[0.5em] text-xs uppercase mb-6 font-bold">Inquiries & Commissions</span>
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
                <a href="mailto:scyther149@gmail.com" className="flex flex-col group">
                  <span className="text-xs font-sans tracking-[0.3em] text-white/30 uppercase mb-3">Electronic Mail</span>
                  <span className="text-xl md:text-2xl font-serif text-white group-hover:text-blue-400 transition-colors duration-500">scyther149@gmail.com</span>
                </a>

                <a href="tel:0494412012" className="flex flex-col group">
                  <span className="text-xs font-sans tracking-[0.3em] text-white/30 uppercase mb-3">Direct Line</span>
                  <span className="text-xl md:text-2xl font-serif text-white group-hover:text-blue-400 transition-colors duration-500">0494 412 012</span>
                </a>

                <a href="https://instagram.com/cai.cosplay" target="_blank" rel="noreferrer" className="flex flex-col group">
                  <span className="text-xs font-sans tracking-[0.3em] text-white/30 uppercase mb-3">Social Identity</span>
                  <span className="text-xl md:text-2xl font-serif text-white group-hover:text-blue-400 transition-colors duration-500">@cai.cosplay</span>
                </a>
              </div>

              <div className="pt-12 border-t border-white/10">
                <div className="flex items-center gap-2 text-white/40 font-sans text-xs tracking-widest uppercase">
                  <span className="w-2 h-2 rounded-full bg-cyan-500/80 animate-pulse"></span>
                  Currently receiving new project briefs
                </div>
              </div>
            </div>

            {/* Inquiry Form */}
            <div className="lg:col-span-3">
              <form className="glass p-8 md:p-12 border border-white/5 shadow-2xl space-y-8" onSubmit={(e) => e.preventDefault()}>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-sans tracking-[0.3em] text-white/40 uppercase">Full Name</label>
                    <input 
                      type="text" 
                      className="w-full bg-white/5 border-b border-white/10 py-3 text-white focus:outline-none focus:border-blue-500 transition-all duration-500 font-sans placeholder:text-white/10" 
                      placeholder="Your name" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-sans tracking-[0.3em] text-white/40 uppercase">Email Address</label>
                    <input 
                      type="email" 
                      className="w-full bg-white/5 border-b border-white/10 py-3 text-white focus:outline-none focus:border-blue-500 transition-all duration-500 font-sans placeholder:text-white/10" 
                      placeholder="your@email.com" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-sans tracking-[0.3em] text-white/40 uppercase">Project Category</label>
                  <select className="w-full bg-transparent border-b border-white/10 py-3 text-white focus:outline-none focus:border-blue-500 transition-all duration-500 font-sans appearance-none cursor-pointer [&>option]:bg-black">
                    <option>Film & Stage Prop</option>
                    <option>Commercial Advertising</option>
                    <option>Private Collector Commission</option>
                    <option>Other / Collaboration</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-sans tracking-[0.3em] text-white/40 uppercase">Project Brief</label>
                  <textarea 
                    rows={4} 
                    className="w-full bg-white/5 border-b border-white/10 py-3 text-white focus:outline-none focus:border-blue-500 transition-all duration-500 font-sans resize-none placeholder:text-white/10" 
                    placeholder="Describe your vision..."
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-white text-black font-sans font-black py-5 tracking-[0.4em] uppercase hover:bg-blue-600 hover:text-white transition-all duration-500 group relative overflow-hidden"
                >
                  <span className="relative z-10">Send Inquiry</span>
                </button>
              </form>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
