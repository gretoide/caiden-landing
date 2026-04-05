import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { Menu, X } from 'lucide-react';

import CustomCursor from './ui/CustomCursor';
import { SKILLS_CONTENT } from './skills/content';

export default function Layout({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const closeMenu = () => setIsMobileMenuOpen(false);

  const navLinks = [
    { label: 'Work', href: '#work' },
    { label: 'Skills', href: '#skills' },
    { label: 'Career', href: '#events' },
    { label: 'Partners', href: '#partners' }
  ];

  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      <CustomCursor />
      
      {/* Navigation */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          scrolled || isMobileMenuOpen
            ? 'py-4 bg-black/80 backdrop-blur-xl border-b border-white/5 shadow-2xl' 
            : 'py-8 bg-transparent border-b border-transparent'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex flex-col z-[101]">
             <span className="text-2xl font-serif text-white tracking-[0.2em] uppercase leading-none">
              CMD <span className="font-light italic"></span>
            </span>
            <span className="text-[8px] text-brand-400 tracking-[0.5em] uppercase font-sans mt-1">
              MASTER VISUAL ARTIST
            </span>
          </div>
          
          {/* Desktop Nav */}
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

            <a href="#events" className="text-white/60 hover:text-white transition-all hover:tracking-[0.4em]">Career</a>
            <a href="#partners" className="text-white/60 hover:text-white transition-all hover:tracking-[0.4em]">Partners</a>
            <a href="#contact" className="px-6 py-2 bg-white/5 border border-white/10 text-white hover:bg-white hover:text-black transition-all">Contact</a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden z-[101] text-white/80 hover:text-white transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={28} strokeWidth={1.5} /> : <Menu size={28} strokeWidth={1.5} />}
          </button>
        </div>
      </nav>

      {/* Mobile Full-Screen Overlay Menu */}
      <div 
        className={`fixed inset-0 z-[90] bg-[#050505]/95 backdrop-blur-3xl flex flex-col justify-center px-10 transition-all duration-700 md:hidden ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col gap-6 mt-16">
          <div className="h-[1px] w-12 bg-brand-400/50 mb-4" />
          
          {navLinks.map((link, index) => (
            <div 
              key={link.label}
              className={`transition-all duration-500 transform ${
                isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <a 
                href={link.href}
                onClick={closeMenu}
                className="text-4xl font-serif tracking-[0.2em] uppercase italic text-white/80 hover:text-brand-400 transition-all duration-500 block mb-2"
              >
                {link.label}
              </a>
              
              {/* Nested Skills Nav for Mobile */}
              {link.label === 'Skills' && (
                <div className="flex flex-col gap-4 pl-4 mt-4 mb-6 border-l border-white/10 ml-2">
                  {SKILLS_CONTENT.categories.map((craft) => (
                    <a
                      key={craft.id}
                      href={`#skills-${craft.id}`}
                      onClick={closeMenu}
                      className="text-[12px] font-sans tracking-[0.25em] uppercase text-white/40 hover:text-brand-400 transition-all"
                    >
                      {craft.title}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div className="h-[1px] w-full bg-white/5 my-4" />
          
          <a 
            href="#contact"
            onClick={closeMenu}
            className={`text-lg font-sans tracking-[0.3em] font-light uppercase text-brand-400 flex items-center gap-4 transition-all duration-500 delay-500 ${
              isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            }`}
          >
            Let's Talk <span className="text-2xl leading-none">→</span>
          </a>
        </div>
      </div>

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
