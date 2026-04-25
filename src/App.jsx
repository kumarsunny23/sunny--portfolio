import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Loader from './components/Loader';
import ScrollProgress from './components/ScrollProgress';

import Navbar from './components/Navbar';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Resume from './components/sections/Resume';
import Education from './components/sections/Education';
import Certifications from './components/sections/Certifications';
import Contact from './components/sections/Contact';
import Footer from './components/sections/Footer';

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {/* Loader */}
      {loading && <Loader onComplete={() => setLoading(false)} />}

      {/* Main content */}
      <AnimatePresence>
        {!loading && (
          <motion.div
            key="app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* Fixed background layers */}
            <div className="mesh-bg" />
            <div className="dot-grid" />
            
            <ScrollProgress />



            {/* Nav */}
            <Navbar />

            {/* Sections */}
            <main style={{ paddingTop: '80px' }}>
              <Hero />
              <About />
              <Skills />
              <Projects />
              <Resume />
              <Education />
              <Certifications />
              <Contact />
            </main>

            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
