import { lazy, Suspense } from 'react';
import Layout from './components/Layout';
import Hero from './components/Hero';

// Critical components stay static for immediate rendering
const FeaturedBuilds = lazy(() => import('./components/FeaturedBuilds'));
const Skills = lazy(() => import('./components/Skills'));
const Brands = lazy(() => import('./components/Brands'));
const EventMap = lazy(() => import('./components/EventMap'));
const Contact = lazy(() => import('./components/Contact'));

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
      <Suspense fallback={<SectionFallback />}>
        <FeaturedBuilds />
        <Skills />
        <EventMap />
        <Brands />
        <Contact />
      </Suspense>
    </Layout>
  );
}

export default App;
