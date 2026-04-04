import { lazy, Suspense } from 'react';
import Layout from './components/Layout';
import Hero from './components/Hero';

// Critical components stay static for immediate rendering
const FeaturedBuilds = lazy(() => import('./components/showcase/FeaturedBuilds'));
const Skills = lazy(() => import('./components/skills/Skills'));
const Brands = lazy(() => import('./components/brands/Brands'));
const EventMap = lazy(() => import('./components/map/EventMap'));
const prefetchEventMap = () => import('./components/map/EventMap');
const Contact = lazy(() => import('./components/Contact'));
import Prefetcher from './components/ui/Prefetcher';

// Section Fallback Component
const SectionFallback = () => (
  <div className="w-full h-96 bg-[#050505] flex items-center justify-center border-y border-white/5">
    <div className="flex flex-col items-center gap-4 opacity-20">
      <div className="w-12 h-12 border-2 border-brand-400/50 rounded-full border-t-white animate-spin" />
      <span className="text-[10px] text-white uppercase tracking-[0.5em] font-sans font-bold">Synchronizing Section...</span>
    </div>
  </div>
);

function App() {
  return (
    <Layout>
      <Hero />
      <Prefetcher loader={prefetchEventMap} />
      <Suspense fallback={<SectionFallback />}>
        <FeaturedBuilds />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Skills />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <EventMap />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Brands />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Contact />
      </Suspense>
    </Layout>
  );
}

export default App;
