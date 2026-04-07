import { lazy, Suspense, useEffect } from 'react';
import Layout from './features/layout/Layout';
import Hero from './features/hero/Hero';

// --- Robust Lazy Loading Utility ---
const lazyWithRetry = (importFn: () => Promise<any>) => {
  return lazy(() => 
    importFn().catch((error) => {
      // Check if it's a Chunk Load Error (common after redeploys)
      const isChunkLoadError = error.name === 'ChunkLoadError' || 
                              error.message?.includes('Fetching chunk') ||
                              error.message?.includes('Loading chunk');
      
      if (isChunkLoadError) {
        // Auto-reload the page to get the latest manifest
        window.location.reload();
      }
      throw error;
    })
  );
};

const Showcase = lazyWithRetry(() => import('./features/showcase/Showcase'));
const Skills = lazyWithRetry(() => import('./features/skills/Skills'));
const EventMap = lazyWithRetry(() => import('./features/career/EventMap'));
const Brands = lazyWithRetry(() => import('./features/brands/Brands'));
const Contact = lazyWithRetry(() => import('./features/contact/Contact'));

function SectionPlaceholder() {
  return <div className="w-full h-[30vh] bg-black" />;
}

function App() {
  // Proactive loading: Start fetching chunks once basic shell is ready
  useEffect(() => {
    const preload = () => {
      import('./features/showcase/Showcase');
      import('./features/skills/Skills');
      // Deferred slightly more for high-performance sections
      setTimeout(() => {
        import('./features/career/EventMap');
        import('./features/brands/Brands');
        import('./features/contact/Contact');
      }, 2000);
    };
    
    if (document.readyState === 'complete') {
      preload();
    } else {
      window.addEventListener('load', preload);
      return () => window.removeEventListener('load', preload);
    }
  }, []);

  return (
    <Layout>
      {/* HERO — Critical, renders immediately */}
      <Hero />
 
      {/* SHOWCASE — High priority but lazy loaded. */}
      <section id="work" className="scroll-mt-[100px]">
        <Suspense fallback={<SectionPlaceholder />}>
          <Showcase />
        </Suspense>
      </section>
 
      {/* SKILLS — Deferred. Shell loads first, then details on interaction. */}
      <section id="skills" className="scroll-mt-[100px]">
        <Suspense fallback={<SectionPlaceholder />}>
          <Skills />
        </Suspense>
      </section>
 
      {/* EVENT MAP — On-demand activation inside the component. */}
      <section id="events" className="scroll-mt-[100px]">
        <Suspense fallback={<SectionPlaceholder />}>
          <EventMap />
        </Suspense>
      </section>
 
      {/* BRANDS — Low priority marquee. */}
      <section id="partners" className="scroll-mt-[100px]">
        <Suspense fallback={<SectionPlaceholder />}>
          <Brands />
        </Suspense>
      </section>
 
      {/* CONTACT — Final section. */}
      <section id="contact" className="scroll-mt-[100px]">
        <Suspense fallback={<SectionPlaceholder />}>
          <Contact />
        </Suspense>
      </section>
    </Layout>
  );
}

export default App;
