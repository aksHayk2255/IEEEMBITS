import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import WhatWeDo from './components/WhatWeDo';
import Events from './components/Events';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Team from './components/Team';
import Gallery from './components/Gallery';
import CTA from './components/CTA';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <WhatWeDo />
        <Events />
        <Projects />
        <Achievements />
        <Team />
        <Gallery />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
