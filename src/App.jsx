import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import ProjectMatrix from './pages/ProjectMatrix';

import { useEffect } from 'react';

function App() {
  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const headers = document.querySelectorAll('.header');
      if (window.scrollY > lastScrollY && window.scrollY > 80) {
        headers.forEach(h => {
          h.style.transform = 'translateY(-100%)';
          h.style.transition = 'transform 0.4s ease, background 0.4s ease, padding 0.4s ease';
        });
      } else {
        headers.forEach(h => {
          h.style.transform = 'translateY(0)';
          h.style.transition = 'transform 0.4s ease, background 0.4s ease, padding 0.4s ease';
        });
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/matrix" element={<ProjectMatrix />} />
    </Routes>
  );
}

export default App;
