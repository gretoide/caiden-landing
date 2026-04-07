import { lazy, Suspense } from 'react';
import Layout from './features/layout/Layout';
import Hero from './features/hero/Hero';

// --- Lazy Components ---
const Showcase = lazy(() => import('./features/showcase/Showcase'));
const Skills = lazy(() => import('./features/skills/Skills'));
const EventMap = lazy(() => import('./features/career/EventMap'));
const Brands = lazy(() => import('./features/brands/Brands'));
const Contact = lazy(() => import('./features/contact/Contact'));

function App() {
  return (
    <Layout>
      {/* HERO — Critical, renders immediately */}
      <Hero />
 
      {/* SHOWCASE — High priority but lazy loaded. */}
      <section id="work">
        <Suspense fallback={null}>
          <Showcase />
        </Suspense>
      </section>
 
      {/* SKILLS — Deferred. Shell loads first, then details on interaction. */}
      <section id="skills">
        <Suspense fallback={null}>
          <Skills />
        </Suspense>
      </section>
 
      {/* EVENT MAP — On-demand activation inside the component. */}
      <section id="events">
        <Suspense fallback={null}>
          <EventMap />
        </Suspense>
      </section>
 
      {/* BRANDS — Low priority marquee. */}
      <section id="partners">
        <Suspense fallback={null}>
          <Brands />
        </Suspense>
      </section>
 
      {/* CONTACT — Final section. */}
      <section id="contact">
        <Suspense fallback={null}>
          <Contact />
        </Suspense>
      </section>
    </Layout>
  );
}

export default App;
