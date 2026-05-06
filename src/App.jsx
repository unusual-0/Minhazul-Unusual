import React, { useState, useEffect } from 'react';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Services from './components/Services';
import Contact from './components/Contact';
import MeshBackground from './components/MeshBackground';
import AuroraBackground from './components/AuroraBackground';
import { soundEngine } from './utils/soundEngine';
import './styles/globals.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleFirstInteraction = () => {
      soundEngine.init();
      window.removeEventListener('click', handleFirstInteraction);
    };
    window.addEventListener('click', handleFirstInteraction);
    
    return () => window.removeEventListener('click', handleFirstInteraction);
  }, []);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isLoading]);

  return (
    <>
      <Loader onComplete={() => setIsLoading(false)} />
      <div className="app-container">
      <MeshBackground />
      <AuroraBackground />
      <main style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 0.6s ease' }}>
        <Navbar />
        <Hero />
        <About />
        <Projects />
        <Services />
        <Contact />
      </main>
      </div>
    </>
  );
}

export default App;
