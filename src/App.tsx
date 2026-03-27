import Layout from './components/Layout';
import Hero from './components/Hero';
import FeaturedBuilds from './components/FeaturedBuilds';
import Skills from './components/Skills';
import Brands from './components/Brands';
import EventMap from './components/EventMap';
import Contact from './components/Contact';

function App() {
  return (
    <Layout>
      <Hero />
      <FeaturedBuilds />
      <Skills />
      <Brands />
      <EventMap />
      <Contact />
    </Layout>
  );
}

export default App;
