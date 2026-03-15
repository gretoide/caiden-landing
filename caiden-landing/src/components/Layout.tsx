import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';

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
    <div className="min-h-screen bg-brand-900 overflow-x-hidden">
      {/* Navigation */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'py-4 glass !border-none shadow-lg' : 'py-6 bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="text-xl font-serif text-white tracking-widest uppercase">
            Caiden Dri
          </div>
          <div className="hidden md:flex space-x-8 text-sm font-sans tracking-wide">
            <a href="#work" className="text-white hover:text-brand-400 transition-colors">Work</a>
            <a href="#about" className="text-white hover:text-brand-400 transition-colors">About</a>
            <a href="#contact" className="text-white hover:text-brand-400 transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        {children}
      </main>

      {/* Footer */}
      <footer className="py-12 bg-black text-center border-t border-white/10">
        <p className="text-white/50 text-sm font-sans">
          © {new Date().getFullYear()} Caiden Mikael Dri. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}
