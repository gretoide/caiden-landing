import { lazy, Suspense } from 'react';
import Layout from './features/layout/Layout';
import Hero from './features/hero/Hero';

// Critical components stay static for immediate rendering
const Showcase = lazy(() => import('./features/showcase/Showcase'));
const Skills = lazy(() => import('./features/skills/Skills'));
const Brands = lazy(() => import('./features/brands/Brands'));
const EventMap = lazy(() => import('./features/career/EventMap'));
const prefetchEventMap = () => import('./features/career/EventMap');
const Contact = lazy(() => import('./features/contact/Contact'));
import SectionLoader from './shared/ui/SectionLoader';
import Preload from './shared/ui/Preload';

// Section Fallback Component
const SectionFallback = () => (
  <div className="w-full h-full flex flex-col items-center justify-center py-20 bg-black">
    <div className="flex flex-col items-center gap-4 opacity-30 scale-75">
      <div className="w-12 h-12 border-2 border-brand-400/30 border-t-brand-400 rounded-full animate-spin" />
      <span className="text-[9px] text-brand-400 uppercase tracking-[0.5em] font-sans font-bold">Synchronizing Section...</span>
    </div>
  </div>
);

function App() {
  return (
    <Layout>
      {/* ABOVE THE FOLD: Immediate Rendering */}
      <Hero />
      
      <Preload loader={prefetchEventMap} />

      {/* BELOW THE FOLD: Lazy Rendering */}
      <div id="work">
        <SectionLoader minHeight="800px">
          <Suspense fallback={<SectionFallback />}>
            <Showcase />
          </Suspense>
        </SectionLoader>
      </div>

      <div id="skills">
        <SectionLoader minHeight="900px">
          <Suspense fallback={<SectionFallback />}>
            <Skills />
          </Suspense>
        </SectionLoader>
      </div>

      <div id="events">
        <SectionLoader minHeight="800px">
          <Suspense fallback={<SectionFallback />}>
            <EventMap />
          </Suspense>
        </SectionLoader>
      </div>

      <div id="partners">
        <SectionLoader minHeight="300px" rootMargin="100px">
          <Suspense fallback={<SectionFallback />}>
            <Brands />
          </Suspense>
        </SectionLoader>
      </div>

      <div id="contact">
        <SectionLoader minHeight="600px">
          <Suspense fallback={<SectionFallback />}>
            <Contact />
          </Suspense>
        </SectionLoader>
      </div>
    </Layout>
  );
}

export default App;
