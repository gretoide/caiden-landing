import Layout from './components/Layout';
import Hero from './components/Hero';
import FeaturedBuilds from './components/FeaturedBuilds';
import Skills from './components/Skills';
import AllSkills from './components/AllSkills';
import Contact from './components/Contact';

function App() {
  return (
    <Layout>
      <Hero />
      <FeaturedBuilds />
      <Skills />
      <AllSkills />
      <Contact />
    </Layout>
  );
}

export default App;
