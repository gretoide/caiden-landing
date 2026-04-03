import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';

import CustomCursor from './ui/CustomCursor';
import { SKILLS_CONTENT } from './skills/content';

export default function Layout({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      <CustomCursor />
      
      {/* Navigation */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          scrolled 
            ? 'py-4 bg-black/60 backdrop-blur-xl border-b border-white/5 shadow-2xl' 
            : 'py-8 bg-transparent border-b border-transparent'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex flex-col">
             <span className="text-2xl font-serif text-white tracking-[0.2em] uppercase leading-none">
              CMD <span className="font-light italic"></span>
            </span>
            <span className="text-[8px] text-brand-400 tracking-[0.5em] uppercase font-sans mt-1">
              Premium Artist
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-12 text-[10px] font-sans tracking-[0.3em] uppercase">
            <a href="#work" className="text-white/60 hover:text-white transition-all hover:tracking-[0.4em]">Work</a>
            
            <div className="group relative">
              <a href="#skills" className="text-white/60 hover:text-white transition-all hover:tracking-[0.4em] flex items-center gap-2">
                Skills
                <span className="text-[7px] text-white/30 group-hover:rotate-180 transition-transform duration-300">▼</span>
              </a>
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 -translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-500 z-50">
                 <div className="bg-black/90 backdrop-blur-2xl border border-white/10 p-1 min-w-[220px] flex flex-col shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                    {SKILLS_CONTENT.categories.map((craft) => (
                      <a
                        key={craft.id}
                        href={`#skills-${craft.id}`}
                        className="w-full px-5 py-3.5 text-white/40 hover:text-brand-400 hover:bg-white/[0.03] transition-all text-left border-b border-white/5 last:border-0 flex items-center justify-between group/item"
                      >
                        <span className="tracking-[0.2em]">{craft.title}</span>
                        <span className="opacity-0 group-hover/item:opacity-100 -translate-x-2 group-hover/item:translate-x-0 transition-all text-brand-400">→</span>
                      </a>
                    ))}
                 </div>
              </div>
            </div>

            <a href="#events" className="text-white/60 hover:text-white transition-all hover:tracking-[0.4em]">Events</a>
            <a href="#partners" className="text-white/60 hover:text-white transition-all hover:tracking-[0.4em]">Partners</a>
            <a href="#contact" className="px-6 py-2 bg-white/5 border border-white/10 text-white hover:bg-white hover:text-black transition-all">Contact</a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        {children}
      </main>

      {/* Footer */}
      <footer className="py-20 bg-black text-center border-t border-white/5">
        <div className="container mx-auto px-6">
          <p className="text-white/20 text-[10px] font-sans tracking-[0.5em] uppercase">
            © {new Date().getFullYear()} Caiden Mikael Dri // All Rights Reserved
          </p>
        </div>
      </footer>
    </div>
  );
}
