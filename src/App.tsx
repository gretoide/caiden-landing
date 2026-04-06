import { lazy, Suspense } from 'react';
import Layout from './features/layout/Layout';
import Hero from './features/hero/Hero';
import Showcase from './features/showcase/Showcase';
import Skills from './features/skills/Skills';
import Brands from './features/brands/Brands';
import Contact from './features/contact/Contact';

// Only EventMap is lazy — Mapbox GL is ~400KB and the user won't need it immediately.
const EventMap = lazy(() => import('./features/career/EventMap'));

const MapFallback = () => (
  <div className="w-full flex-1 flex flex-col items-center justify-center bg-[#050505]" style={{ minHeight: '800px' }}>
    <div className="flex flex-col items-center gap-4 opacity-20">
      <div className="w-10 h-10 border border-brand-400/40 border-t-brand-400 rounded-full animate-spin" />
      <span className="text-[9px] text-brand-400 uppercase tracking-[0.5em] font-sans">Loading Map...</span>
    </div>
  </div>
);

function App() {
  return (
    <Layout>
      {/* HERO — Critical, renders immediately */}
      <Hero />

      {/* SHOWCASE — Static import. Images lazy-load natively via <img loading="lazy">.
          No wrapper needed: sections are naturally full-height so no layout jump. */}
      <div id="work">
        <Showcase />
      </div>

      {/* SKILLS — Static import. GSAP ScrollTrigger fires on scroll. */}
      <div id="skills">
        <Skills />
      </div>

      {/* EVENT MAP — Only lazy section: Mapbox GL is ~400KB gzipped. 
          Deferred until user is 300px away to ensure smooth pre-load. */}
      <div id="events">
        <Suspense fallback={<MapFallback />}>
          <EventMap />
        </Suspense>
      </div>

      {/* BRANDS — Static, lightweight marquee. */}
      <div id="partners">
        <Brands />
      </div>

      {/* CONTACT — Static, emailjs only loads on form submit. */}
      <div id="contact">
        <Contact />
      </div>
    </Layout>
  );
}

export default App;
