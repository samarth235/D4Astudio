import React, { useEffect, useRef, useState } from 'react';
import './Projects.scss';
import gsap from 'gsap';

const projectsData = [
  {
    id: 1,
    title: 'Urban Edge',
    category: 'RESIDENTIAL',
    year: '2024',
    location: 'Sigehalli, Bangalore',
    area: '3.2 Acres',
    program: 'Luxury Residential',
    image: '/Urban Edge.png',
    description: `D4A Studio's proposal envisions an exclusive uber-luxury residential community in Sigehalli, crafted to offer calm, privacy, and sophistication. The architecture features contemporary tower forms, expansive decks, and a refined material palette that elevates modern living. Spacious 3, 3.5 & 4, 4.5 BHK residences, duplex sky villas, and penthouses are planned with generous ceiling heights and premium finishes.`,
    recognition: null,
  },
  {
    id: 2,
    title: 'Amarta Marketing Office',
    category: 'COMMERCIAL',
    year: '2023',
    location: 'Bangalore',
    area: '8,200 sq ft',
    program: 'Corporate Office',
    image: '/Amarta MO.png',
    description: `The Amarta Marketing Office by D4A Studio is not just a workspace; it's a strategically designed client experience. The project redefines the traditional corporate environment by integrating hospitality and engagement into its core. The central feature is a captivating courtyard — a tranquil water body surrounds a central tree, creating a peaceful oasis accessible to clients.`,
    recognition: null,
  },
  {
    id: 3,
    title: 'RRN LUX',
    category: 'RESIDENTIAL',
    year: '2023',
    location: 'RR Nagar, Bangalore',
    area: '1.8 Acres',
    program: 'Uber-Luxury Residential',
    image: '/RRN LUX.png',
    description: `D4A Studio presents an uber-luxury residential address in RR Nagar that blends timeless architecture with contemporary living. The design choreographs light, privacy, and landscape to create a calm, resort-grade experience minutes from the city. The master plan orients towers to capture prevailing breezes and long views while minimizing heat gain.`,
    recognition: null,
  },
  {
    id: 4,
    title: 'Suresh Residence',
    category: 'RESIDENTIAL',
    year: '2022',
    location: 'Sarjapur, Bangalore',
    area: '2,400 sq ft',
    program: 'Residential',
    image: '/Suresh Residence .JPG',
    description: `A four-story, East-facing residential building on a 40' x 60' site in Sarjapur. The architecture by D4A Studio combines modern aesthetics with functional spaces, focusing on natural light, open-plan living, and unique features like a double-height dining area and an integrated waterfall.`,
    recognition: null,
  },
  {
    id: 5,
    title: 'Sumukha Residence',
    category: 'RESIDENTIAL',
    year: '2022',
    location: 'Bangalore',
    area: '1,500 sq ft',
    program: 'Renovation',
    image: '/Sumukha Residence.jpg',
    description: `A modern renovation of a residential building on a 30' x 50' East-facing site. The design focuses on updating the existing structure to meet contemporary living standards, maximizing space, improving natural light and ventilation, and introducing a sleek, modern aesthetic without expanding the original footprint.`,
    recognition: null,
  },
];

export default function Projects() {
  const [activeModal, setActiveModal] = useState(null);
  const [activeFilter, setActiveFilter] = useState('ALL');
  const modalRef = useRef(null);

  useEffect(() => {
    document.body.style.background = '#0a0a0a';
    document.body.style.paddingTop = '0';

    // ─── Scroll-Reveal Cards ─────────────────────────────────────
    const cards = document.querySelectorAll('.proj-card');
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          gsap.to(entry.target, {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: 'power3.out',
            delay: (entry.target.dataset.index % 3) * 0.12,
          });
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    cards.forEach((card, i) => {
      card.dataset.index = i;
      gsap.set(card, { opacity: 0, y: 60 });
      revealObserver.observe(card);
    });

    // ─── Typewriter on hero heading ──────────────────────────────
    const heroTitle = document.querySelector('.hero-card-title');
    if (heroTitle) {
      const text = heroTitle.textContent;
      heroTitle.textContent = '';
      heroTitle.style.borderRight = '2px solid #8e9196';
      let i = 0;
      const type = () => {
        if (i < text.length) {
          heroTitle.textContent += text[i++];
          setTimeout(type, 45);
        } else {
          heroTitle.style.borderRight = 'none';
        }
      };
      setTimeout(type, 600);
    }

    // ─── Hamburger Menu ──────────────────────────────────────────
    const hamburger = document.getElementById('hamburgerBtn');
    const wrapper = document.getElementById('smWrapper');
    const panel = document.getElementById('smPanel');
    const backdrop = document.getElementById('smBackdrop');
    const items = document.querySelectorAll('.sm-list a');
    let menuOpen = false;

    let tl_menu;
    if (panel && items.length) {
      gsap.set(panel, { xPercent: 100 });
      gsap.set(items, { yPercent: 140 });
      tl_menu = gsap.timeline({ paused: true });
      tl_menu
        .to(backdrop, { opacity: 1, duration: 0.3 })
        .to(panel, { xPercent: 0, duration: 0.65, ease: 'power4.out' }, 0)
        .to(items, { yPercent: 0, duration: 1, ease: 'power4.out', stagger: 0.1 }, 0.2);

      const toggleMenu = () => {
        menuOpen = !menuOpen;
        wrapper?.classList.toggle('active', menuOpen);
        hamburger?.classList.toggle('active', menuOpen);
        if (menuOpen) tl_menu.play(0); else tl_menu.reverse();
      };
      const stopProp = (e) => { e.stopPropagation(); toggleMenu(); };
      hamburger?.addEventListener('click', stopProp);
      backdrop?.addEventListener('click', toggleMenu);
      items.forEach(link => link.addEventListener('click', toggleMenu));

      // Add ionicons scripts
      const script1 = document.createElement("script");
      script1.type = "module";
      script1.src = "https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js";
      document.body.appendChild(script1);

      const script2 = document.createElement("script");
      script2.noModule = true;
      script2.src = "https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js";
      document.body.appendChild(script2);

      return () => {
        hamburger?.removeEventListener('click', stopProp);
        backdrop?.removeEventListener('click', toggleMenu);
        items.forEach(link => link.removeEventListener('click', toggleMenu));
        if (script1.parentNode) document.body.removeChild(script1);
        if (script2.parentNode) document.body.removeChild(script2);
      };
    }

    return () => {
      revealObserver.disconnect();
      document.body.style.background = '';
    };
  }, [activeFilter]);

  // ─── Modal animations ─────────────────────────────────────────
  useEffect(() => {
    if (activeModal !== null) {
      document.body.style.overflow = 'hidden';
      gsap.fromTo('.proj-modal-overlay',
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: 'power2.out' }
      );
      gsap.fromTo('.proj-modal-box',
        { opacity: 0, y: 60, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power3.out', delay: 0.1 }
      );
    } else {
      document.body.style.overflow = '';
    }
  }, [activeModal]);

  const openModal = (project) => setActiveModal(project);
  const closeModal = () => {
    gsap.to('.proj-modal-overlay', { opacity: 0, duration: 0.3, onComplete: () => setActiveModal(null) });
  };

  const filteredProjects = activeFilter === 'ALL' 
    ? projectsData 
    : projectsData.filter(p => p.category === activeFilter);

  const hero = filteredProjects[0];
  const grid = filteredProjects.slice(1);

  return (
    <div id="projects-page">

      {/* ─── NAVBAR ─── */}
      <header className="header" id="header">
        <div className="header-container">
          <div className="logo-container">
            <a href="/" style={{ lineHeight: 0 }}>
              <img src="/img.jpeg" className="logo" alt="D4A logo" />
            </a>
          </div>
          <nav className="nav">
            <a href="/"><span className="slot"><span className="top">Home</span><span className="bottom">Home</span></span></a>
            <a href="/projects.html" aria-current="page"><span className="slot"><span className="top">Projects</span><span className="bottom">Projects</span></span></a>
            <a href="/#approach"><span className="slot"><span className="top">Our Approach</span><span className="bottom">Our Approach</span></span></a>
            <a href="/about.html"><span className="slot"><span className="top">About Us</span><span className="bottom">About Us</span></span></a>
          </nav>
          <div className="hamburger" id="hamburgerBtn">
            <span></span><span></span><span></span>
          </div>
        </div>
      </header>

      {/* ─── MOBILE MENU ─── */}
      <div className="sm-wrapper" id="smWrapper">
        <div className="sm-backdrop" id="smBackdrop"></div>
        <aside className="sm-panel" id="smPanel">
          <ul className="sm-list">
            <li><a href="/">Home</a></li>
            <li><a href="/projects.html">Projects</a></li>
            <li><a href="/#approach">Our Approach</a></li>
            <li><a href="/about.html">About Us</a></li>
          </ul>
        </aside>
      </div>

      {/* ─── PAGE HERO TITLE & FILTERS ─── */}
      <div className="page-hero">
        <div className="hero-top-flex">
          <div className="hero-title-group">
            <p className="page-hero-label">PORTFOLIO</p>
            <h1 className="page-hero-heading">Selected Projects</h1>
          </div>
          <div className="category-filters">
            {['ALL', 'RESIDENTIAL', 'COMMERCIAL', 'CIVIC'].map(cat => (
              <button 
                key={cat}
                className={`filter-btn ${activeFilter === cat ? 'active' : ''}`}
                onClick={() => setActiveFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        <div className="page-hero-line"></div>
      </div>

      {/* ─── FEATURED HERO CARD ─── */}
      {hero ? (
        <div className="featured-section">
          <div
            className="proj-card proj-card--hero"
            onClick={() => openModal(hero)}
          >
            <img src={hero.image} alt={hero.title} className="card-img" />
            <div className="card-overlay">
              <div className="card-meta-top">
                <span className="card-tag">{hero.category}</span>
                <span className="card-year">{hero.year}</span>
              </div>
              <div className="card-info">
                <h2 className="hero-card-title">{hero.title}</h2>
                <p className="card-sub">{hero.location} · {hero.area}</p>
                <p className="card-desc">{hero.description.substring(0, 120)}...</p>
                <div className="card-cta">
                  <span>VIEW PROJECT</span>
                  <span className="cta-arrow">→</span>
                </div>
                {hero.recognition && (
                  <div className="card-recognition">★ {hero.recognition}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="no-projects">No projects found in this category.</div>
      )}

      {/* ─── PROJECTS GRID ─── */}
      {grid.length > 0 && (
        <div className="projects-grid">
          {grid.map((project) => (
            <div
              key={project.id}
              className="proj-card proj-card--grid"
              onClick={() => openModal(project)}
            >
              <img src={project.image} alt={project.title} className="card-img" />
              <div className="card-overlay">
                <div className="card-meta-top">
                  <span className="card-tag">{project.category}</span>
                  <span className="card-year">{project.year}</span>
                </div>
                <div className="card-info">
                  <h3 className="card-title">{project.title}</h3>
                  <p className="card-sub">{project.location} · {project.area}</p>
                  {project.recognition && (
                    <div className="card-recognition">★ {project.recognition}</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ─── PROJECTS COUNT ─── */}
      <div className="projects-count">
        <div className="count-line"></div>
        <span>SHOWING {filteredProjects.length} OF {projectsData.length} PROJECTS</span>
        <div className="count-line"></div>
      </div>

      {/* ─── MODAL ─── */}
      {activeModal && (
        <div className="proj-modal-overlay" onClick={closeModal}>
          <div className="proj-modal-box" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeModal}>✕</button>
            <div className="modal-img-wrap">
              <img src={activeModal.image} alt={activeModal.title} />
              <div className="modal-img-tag">{activeModal.category}</div>
            </div>
            <div className="modal-body">
              <h2 className="modal-title">{activeModal.title}</h2>
              <div className="modal-title-line"></div>
              <div className="modal-meta-grid">
                <div className="meta-item">
                  <span className="meta-label">LOCATION</span>
                  <span className="meta-value">{activeModal.location}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">YEAR</span>
                  <span className="meta-value">{activeModal.year}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">PROGRAM</span>
                  <span className="meta-value">{activeModal.program}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">AREA</span>
                  <span className="meta-value">{activeModal.area}</span>
                </div>
              </div>
              <div className="modal-desc-section">
                <p className="modal-desc-label">PROJECT DESCRIPTION</p>
                <p className="modal-desc-text">{activeModal.description}</p>
              </div>
              {activeModal.recognition && (
                <div className="modal-recognition">
                  <span className="recog-star">★</span>
                  <div>
                    <span className="recog-label">RECOGNITION</span>
                    <span className="recog-text">{activeModal.recognition}</span>
                  </div>
                </div>
              )}
              <div className="modal-actions">
                <button className="modal-inquire-btn">INQUIRE ABOUT THIS PROJECT</button>
                <button className="modal-close-text" onClick={closeModal}>CLOSE</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
