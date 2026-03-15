
import Layout from './components/Layout';
import Hero from './components/Hero';
import FeaturedBuilds from './components/FeaturedBuilds';
import GallerySection from './components/GallerySection';
import Contact from './components/Contact';

import { PROPS_DATA, FX_DATA, COMMERCIAL_DATA } from './data';

function App() {
  return (
    <Layout>
      <Hero />
      <FeaturedBuilds />
      <GallerySection id="props" title="Weapons & Props" items={PROPS_DATA} />
      <GallerySection id="fx" title="Prosthetics & FX" items={FX_DATA} />
      <GallerySection id="commercial" title="Commercial & Advertising" items={COMMERCIAL_DATA} />
      <Contact />
    </Layout>
  );
}

export default App;
