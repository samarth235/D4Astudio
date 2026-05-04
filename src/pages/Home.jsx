import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import './Home.scss';
import Footer from '../components/Footer';
import VantaBackground from '../components/ui/VantaBackground';


export default function Home() {
  const projectImages = [
    "Urban Edge.webp",
    "RRN LUX.webp",
    "Amarta MO.webp",
    "Suresh Residence .webp",
    "Sumukha Residence.webp",
    "Amarta CH.webp",
    "Amarta EP.webp"
  ];

  const [baseIndex, setBaseIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [clickRect, setClickRect] = useState(null);

  const getImage = (index) => projectImages[(baseIndex + index) % projectImages.length];

  const triggerGridAnimation = () => {
    let tl = gsap.timeline();
    // If zoomed, animate the single lightbox image
    tl.fromTo(".lightbox-img-wrapper img", 
      { scale: 1.15, filter: "blur(12px)", opacity: 0 }, 
      { 
        scale: 1, 
        filter: "blur(0px)", 
        opacity: 1, 
        duration: 1.0, 
        ease: "power2.out"
      }
    );
  };

  const handleNext = () => {
    setBaseIndex((prev) => (prev + 1) % projectImages.length);
    if (isZoomed) triggerGridAnimation();
  };

  const handlePrev = () => {
    setBaseIndex((prev) => (prev - 1 + projectImages.length) % projectImages.length);
    if (isZoomed) triggerGridAnimation();
  };

  const handleImageClick = (indexOffset, e) => {
    if (e && e.currentTarget) {
      const rect = e.currentTarget.getBoundingClientRect();
      setClickRect({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      });
    }
    const clickedIndex = (baseIndex + indexOffset) % projectImages.length;
    setBaseIndex(clickedIndex);
    setIsZoomed(true);
  };

  // Lightbox Entrance GSAP
  useEffect(() => {
    if (isZoomed && clickRect) {
      let tl = gsap.timeline();
      
      // Setup the overlay transparently first
      gsap.set('.lightbox-overlay', { opacity: 1, backgroundColor: 'rgba(0,0,0,0)', pointerEvents: 'auto' });
      
      // GSAP FromTo to expand from the specific grid item
      tl.fromTo(".lightbox-img-wrapper", 
        { 
          top: clickRect.top,
          left: clickRect.left,
          width: clickRect.width,
          height: clickRect.height,
          borderRadius: "8px"
        },
        { 
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          borderRadius: "0px",
          duration: 1.5, 
          ease: "expo.inOut" 
        }
      );

      // Fade in background overlay
      tl.to('.lightbox-overlay', { backgroundColor: 'rgba(0,0,0,1)', duration: 1.0, ease: "power2.inOut" }, 0.2);

      // Fade in UI content
      tl.fromTo(".lightbox-overlay .nav-item a, .lightbox-overlay .title p, .lightbox-overlay .slide-num p, .lightbox-overlay .preview img", 
         { top: 50 },
         { top: 0, stagger: 0.075, duration: 1.2, ease: "power3.out" }, "-=0.6"
      );

      tl.fromTo(".lightbox-overlay .icon ion-icon, .lightbox-overlay .icon-2 ion-icon", 
         { scale: 0 },
         { scale: 1, stagger: 0.05, ease: "power3.out", duration: 0.8 }, "-=0.8"
      );
      
      tl.fromTo(".close-lightbox-btn, .nav-btn", 
         { opacity: 0, scale: 0.8 },
         { opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" }, "-=0.8"
      );

    } else if (isZoomed && !clickRect) {
      gsap.to('.lightbox-overlay', { opacity: 1, backgroundColor: 'rgba(0,0,0,1)', duration: 0.4, pointerEvents: 'auto' });
    } else {
      gsap.to('.lightbox-overlay', { opacity: 0, duration: 0.4, ease: "power2.in", pointerEvents: 'none' });
    }
  }, [isZoomed, clickRect]);

  useEffect(() => {
    // Splash Screen Logic
    const navType = performance?.getEntriesByType("navigation")?.[0]?.type;
    const hasVisited = sessionStorage.getItem("hasVisitedHome");
    const splash = document.getElementById("splash");
    const splashVideo = document.getElementById("splashVideo");

    // GSAP logic for the new grid
    const startAnimation = () => {
      let tl = gsap.timeline({ delay: 0.3 });

      tl.to(".col", {
        top: "0",
        duration: 3,
        ease: "power4.inOut"
      });

      tl.to(".c-1 .item", {
        top: "0",
        stagger: 0.25,
        duration: 3,
        ease: "power4.inOut"
      }, "-=2");

      tl.to(".c-2 .item", {
        top: "0",
        stagger: -0.25,
        duration: 3,
        ease: "power4.inOut"
      }, "-=4");

      tl.to(".c-3 .item", {
        top: "0",
        stagger: 0.25,
        duration: 3,
        ease: "power4.inOut"
      }, "-=4");

      tl.to(".c-4 .item", {
        top: "0",
        stagger: -0.25,
        duration: 3,
        ease: "power4.inOut"
      }, "-=4");

      tl.to(".c-5 .item", {
        top: "0",
        stagger: 0.25,
        duration: 3,
        ease: "power4.inOut"
      }, "-=4");

      // The animation now stops here at the grid view!
    };

    if (!hasVisited || navType === "reload") {
      sessionStorage.setItem("hasVisitedHome", "true");
      if (splashVideo) {
        splashVideo.muted = true;
        splashVideo.setAttribute("playsinline", "");
        const playPromise = splashVideo.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            document.body.addEventListener("touchstart", () => splashVideo.play(), { once: true });
          });
        }

        splashVideo.addEventListener("ended", () => {
          if (splash) splash.classList.add("fade-out");
          setTimeout(() => {
            document.getElementById("header")?.classList.add("visible");
            startAnimation();
          }, 200);
          setTimeout(() => { if (splash) splash.style.display = "none"; }, 800);
        });
      }
    } else {
      if (splash) splash.style.display = "none";
      setTimeout(() => {
        document.getElementById("header")?.classList.add("visible");
        startAnimation();
      }, 100);
    }

    // Hamburger Menu Logic (now handled via React State)
  }, []);

  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(prev => !prev);

  return (
    <div id="home-page">
      <VantaBackground />
      <div id="splash">
        <video
          id="splashVideo"
          muted
          autoPlay
          playsInline
          preload="metadata"
          poster="img.webp"
        >
          <source src="logoanim.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <header className="header" id="header">
        <div className="header-container">
          <div className="logo-container">
            <a href="/" style={{ lineHeight: 0 }}>
              <img src="/img.webp" className="logo" alt="D4A logo" />
            </a>
          </div>
          <nav className="nav">
            <Link to="/" aria-current="page">
              <span className="slot">
                <span className="top">Home</span>
                <span className="bottom">Home</span>
              </span>
            </Link>
            <Link to="/projects">
              <span className="slot">
                <span className="top">Projects</span>
                <span className="bottom">Projects</span>
              </span>
            </Link>
            <Link to="/about">
              <span className="slot">
                <span className="top">About Us</span>
                <span className="bottom">About Us</span>
              </span>
            </Link>
          </nav>

          <div
            className={`hamburger ${menuOpen ? 'active' : ''}`}
            id="hamburgerBtn"
            onClick={toggleMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </header>

      {/* MOBILE NAV MENU */}
      <div className={`sm-wrapper ${menuOpen ? 'active' : ''}`} id="smWrapper">
        <div className="sm-backdrop" id="smBackdrop" onClick={toggleMenu}></div>
        <aside className="sm-panel" id="smPanel">
          <ul className="sm-list">
            <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
            <li><Link to="/projects" onClick={toggleMenu}>Projects</Link></li>
            <li><Link to="/about" onClick={toggleMenu}>About Us</Link></li>
          </ul>
        </aside>
      </div>

      <section className="home-hero-section">
        <div className="container">
          <div className="col c-1">
            <div className="item" onClick={(e) => handleImageClick(0, e)}><img loading="lazy" src={getImage(0)} alt="" /></div>
            <div className="item" onClick={(e) => handleImageClick(1, e)}><img loading="lazy" src={getImage(1)} alt="" /></div>
            <div className="item" onClick={(e) => handleImageClick(2, e)}><img loading="lazy" src={getImage(2)} alt="" /></div>
            <div className="item" onClick={(e) => handleImageClick(3, e)}><img loading="lazy" src={getImage(3)} alt="" /></div>
            <div className="item" onClick={(e) => handleImageClick(4, e)}><img loading="lazy" src={getImage(4)} alt="" /></div>
          </div>
          <div className="col c-2">
            <div className="item" onClick={(e) => handleImageClick(5, e)}><img loading="lazy" src={getImage(5)} alt="" /></div>
            <div className="item" onClick={(e) => handleImageClick(6, e)}><img loading="lazy" src={getImage(6)} alt="" /></div>
            <div className="item" onClick={(e) => handleImageClick(0, e)}><img loading="lazy" src={getImage(0)} alt="" /></div>
            <div className="item" onClick={(e) => handleImageClick(1, e)}><img loading="lazy" src={getImage(1)} alt="" /></div>
            <div className="item" onClick={(e) => handleImageClick(2, e)}><img loading="lazy" src={getImage(2)} alt="" /></div>
          </div>
          <div className="col c-3">
            <div className="item" onClick={(e) => handleImageClick(3, e)}><img loading="lazy" src={getImage(3)} alt="" /></div>
            <div className="item" onClick={(e) => handleImageClick(4, e)}><img loading="lazy" src={getImage(4)} alt="" /></div>
            <div className="item" onClick={(e) => handleImageClick(5, e)}><img loading="lazy" src={getImage(5)} alt="" /></div>
            <div className="item" onClick={(e) => handleImageClick(6, e)}><img loading="lazy" src={getImage(6)} alt="" /></div>
            <div className="item" onClick={(e) => handleImageClick(0, e)}><img loading="lazy" src={getImage(0)} alt="" /></div>
          </div>
          <div className="col c-4">
            <div className="item" onClick={(e) => handleImageClick(1, e)}><img loading="lazy" src={getImage(1)} alt="" /></div>
            <div className="item" onClick={(e) => handleImageClick(2, e)}><img loading="lazy" src={getImage(2)} alt="" /></div>
            <div className="item" onClick={(e) => handleImageClick(3, e)}><img loading="lazy" src={getImage(3)} alt="" /></div>
            <div className="item" onClick={(e) => handleImageClick(4, e)}><img loading="lazy" src={getImage(4)} alt="" /></div>
            <div className="item" onClick={(e) => handleImageClick(5, e)}><img loading="lazy" src={getImage(5)} alt="" /></div>
          </div>
          <div className="col c-5">
            <div className="item" onClick={(e) => handleImageClick(6, e)}><img loading="lazy" src={getImage(6)} alt="" /></div>
            <div className="item" onClick={(e) => handleImageClick(0, e)}><img loading="lazy" src={getImage(0)} alt="" /></div>
            <div className="item" onClick={(e) => handleImageClick(1, e)}><img loading="lazy" src={getImage(1)} alt="" /></div>
            <div className="item" onClick={(e) => handleImageClick(2, e)}><img loading="lazy" src={getImage(2)} alt="" /></div>
            <div className="item" onClick={(e) => handleImageClick(3, e)}><img loading="lazy" src={getImage(3)} alt="" /></div>
          </div>
        </div>

        <div className="lightbox-overlay" style={{ pointerEvents: isZoomed ? 'auto' : 'none' }}>
          <div className="lightbox-img-wrapper">
            <img loading="lazy" src={getImage(0)} alt="" />
          </div>

          <button className="close-lightbox-btn" onClick={() => setIsZoomed(false)}>
            <ion-icon name="close-sharp"></ion-icon>
          </button>

          <div className="content-overlay">
          <div className="hero">
            <div className="icon"><ion-icon name="add-sharp"></ion-icon></div>
            <div className="title"><p>D4A STUDIO</p></div>
            <div className="icon-2"><ion-icon name="add-sharp"></ion-icon></div>
          </div>

          <div className="nav-controls">
            <button className="nav-btn prev" onClick={handlePrev} aria-label="Previous image">
              <ion-icon name="chevron-back-sharp"></ion-icon>
            </button>
            <button className="nav-btn next" onClick={handleNext} aria-label="Next image">
              <ion-icon name="chevron-forward-sharp"></ion-icon>
            </button>
          </div>

          <footer className="home-footer">
            <div className="preview">
              <img loading="lazy" src={getImage(0)} alt="" />
              <img loading="lazy" src={getImage(1)} alt="" />
              <img loading="lazy" src={getImage(2)} alt="" />
              <img loading="lazy" src={getImage(3)} alt="" />
              <img loading="lazy" src={getImage(4)} alt="" />
              <img loading="lazy" src={getImage(5)} alt="" />
              <img loading="lazy" src={getImage(6)} alt="" />
            </div>

            <div className="slide-num"><p>{baseIndex + 1} — {projectImages.length}</p></div>
          </footer>
        </div>
        </div>
      </section>

      <Footer />

    </div>
  );
}
