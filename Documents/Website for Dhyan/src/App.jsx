import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import ProjectMatrix from './pages/ProjectMatrix';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/d4a1.html" element={<Home />} />
      <Route path="/about.html" element={<About />} />
      <Route path="/projects.html" element={<Projects />} />
      <Route path="/aaaa.html" element={<ProjectMatrix />} />
    </Routes>
  );
}

export default App;
