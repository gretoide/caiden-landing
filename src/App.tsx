import { lazy, Suspense, useEffect } from 'react';
import Layout from './features/layout/Layout';
import Hero from './features/hero/Hero';
import LoadingSpinner from './shared/ui/LoadingSpinner';
import { scrollToSkills, SCROLL_TO_SKILLS_MESSAGE } from './shared/lib/scrollToSkills';

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

const ArmourShowcase = lazyWithRetry(() => import('./features/showcase/ArmourShowcase'));
const Skills = lazyWithRetry(() => import('./features/skills/Skills'));
const EventMap = lazyWithRetry(() => import('./features/career/EventMap'));
const Brands = lazyWithRetry(() => import('./features/brands/Brands'));
const Contact = lazyWithRetry(() => import('./features/contact/Contact'));

function SectionPlaceholder() {
  return <LoadingSpinner className="w-full h-[30vh] bg-black" />;
}

function App() {
  // Proactive loading: Start fetching chunks once basic shell is ready
  useEffect(() => {
    const preload = () => {
      import('./features/showcase/ArmourShowcase');
      import('./features/skills/Skills');
      import('./features/skills/SkillDetails');
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

  // The /gallery tab asks us to show the Skills section ("Check my skills", or when it is closed).
  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== window.location.origin || e.data?.type !== SCROLL_TO_SKILLS_MESSAGE) return;
      scrollToSkills(document, e.data.behavior === 'instant' ? 'instant' : 'smooth');
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  // Deep links (/#contact, e.g. from the gallery page): the browser jumps to the anchor while the lazy
  // sections above are still placeholders, then they grow and push it down. Keep the target aligned
  // while the page settles, and stop as soon as the user scrolls on their own.
  useEffect(() => {
    const id = window.location.hash.slice(1);
    const target = id ? document.getElementById(id) : null;
    if (!target) return;
    // /#skills (e.g. "Check my skills" from the gallery): heading under the navbar, slides in view.
    const align = () => {
      if (id === 'skills' && scrollToSkills(document, 'instant')) return;
      target.scrollIntoView({ behavior: 'instant', block: 'start' });
    };
    const observer = new ResizeObserver(align);
    observer.observe(document.body);
    const stop = () => {
      observer.disconnect();
      window.removeEventListener('wheel', stop);
      window.removeEventListener('touchstart', stop);
      window.removeEventListener('keydown', stop);
    };
    window.addEventListener('wheel', stop, { passive: true });
    window.addEventListener('touchstart', stop, { passive: true });
    window.addEventListener('keydown', stop);
    const timeout = window.setTimeout(stop, 6000);
    return () => {
      window.clearTimeout(timeout);
      stop();
    };
  }, []);

  // Home: the navbar stays until about half a screen has been scrolled.
  return (
    <Layout navHideAfter="half-screen">
      {/* HERO — Critical, renders immediately */}
      <Hero />
 
      {/* SHOWCASE — High priority but lazy loaded. */}
      <section id="work" className="scroll-mt-[100px]">
        <Suspense fallback={<SectionPlaceholder />}>
          <ArmourShowcase />
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
