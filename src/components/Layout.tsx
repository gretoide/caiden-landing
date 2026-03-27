import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';

import CustomCursor from './CustomCursor';

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
              Premium Craftsmanship
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-12 text-[10px] font-sans tracking-[0.3em] uppercase">
            <a href="#work" className="text-white/60 hover:text-white transition-all hover:tracking-[0.4em]">Work</a>
            <a href="#skills" className="text-white/60 hover:text-white transition-all hover:tracking-[0.4em]">Skills</a>
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
