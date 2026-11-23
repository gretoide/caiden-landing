import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';

import Cursor from '../../shared/ui/Cursor';

export default function Layout({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      <Cursor />

      {/* Navigation — transparent gradient bar: brand + contact only */}
      <nav
        className={`fixed top-0 inset-x-0 z-[100] pointer-events-none transition-all duration-500 ${
          scrolled
            ? 'py-3 md:py-4 bg-gradient-to-b from-[#0b1a33]/75 to-[#081226]/55 backdrop-blur-xl backdrop-saturate-150 shadow-[0_10px_30px_-10px_rgba(96,165,250,0.25)]'
            : 'py-5 md:py-8 bg-gradient-to-b from-black/80 via-black/40 to-transparent'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center gap-4">
          <a href="#" className="pointer-events-auto flex flex-col min-w-0">
            <span className="text-xl sm:text-2xl font-serif text-white tracking-[0.2em] uppercase leading-none">
              CMD
            </span>
            <span className="text-[7px] sm:text-[8px] text-brand-400 tracking-[0.4em] sm:tracking-[0.5em] uppercase font-sans mt-1 truncate">
              MASTER VISUAL ARTIST
            </span>
          </a>

          <a
            href="#contact"
            className="pointer-events-auto group relative shrink-0 overflow-hidden px-5 sm:px-6 py-2 sm:py-2.5 bg-white/5 backdrop-blur-md border border-white/15 hover:border-brand-400/60 text-white text-[10px] font-sans tracking-[0.3em] uppercase transition-colors duration-500"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-brand-400/30 via-brand-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="relative">Contact</span>
          </a>
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
