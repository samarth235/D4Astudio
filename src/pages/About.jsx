import React, { useEffect, useState, useRef } from 'react';
import './About.scss';
import gsap from 'gsap';
import Footer from '../components/Footer';
import ProcessSection from '../components/About/ProcessSection';
import ScrollExpandMedia from '../components/ui/scroll-expansion-hero';

export default function About() {
  const [menuOpen, setMenuOpen] = useState(false);
  const panelRef = useRef(null);
  const backdropRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    // Reveal Animations previously relied on intersection observer.
    // Replaced by direct visibility to ensure sections appear alongside the new Hero.
    document.body.style.overflow = "";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    // Hamburger Menu GSAP
    if (panelRef.current) {
      const items = itemsRef.current;
      gsap.set(panelRef.current, { xPercent: 100 });
      gsap.set(items, { yPercent: 140 });

      const tl_menu = gsap.timeline({ paused: true });
      tl_menu.to(backdropRef.current, { opacity: 1, duration: 0.3 })
        .to(panelRef.current, { xPercent: 0, duration: 0.65, ease: "power4.out" }, 0)
        .to(items, { yPercent: 0, duration: 1, ease: "power4.out", stagger: 0.1 }, 0.2);

      if (menuOpen) {
        tl_menu.play(0);
      } else {
        tl_menu.reverse();
      }
    }
  }, [menuOpen]);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div id="about-page">
      {/* HEADER */}
      <header className="header" id="header">
        <div className="header-container">
          <div className="logo-container">
            <a href="/" style={{ lineHeight: 0 }}>
              <img src="/img.jpeg" className="logo" alt="D4A logo" />
            </a>
          </div>
          <nav className="nav">
            <a href="/">
              <span className="slot">
                <span className="top">Home</span>
                <span className="bottom">Home</span>
              </span>
            </a>
            <a href="/projects.html">
              <span className="slot">
                <span className="top">Projects</span>
                <span className="bottom">Projects</span>
              </span>
            </a>
            <a href="/#approach">
              <span className="slot">
                <span className="top">Our Approach</span>
                <span className="bottom">Our Approach</span>
              </span>
            </a>
            <a href="/about.html" aria-current="page">
              <span className="slot">
                <span className="top">About Us</span>
                <span className="bottom">About Us</span>
              </span>
            </a>
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

      {/* MOBILE NAV */}
      <div className={`sm-wrapper ${menuOpen ? 'active' : ''}`} id="smWrapper">
        <div 
          className="sm-backdrop" 
          id="smBackdrop" 
          ref={backdropRef}
          onClick={toggleMenu}
        ></div>
        <aside className="sm-panel" id="smPanel" ref={panelRef}>
          <ul className="sm-list">
            {['Home', 'Projects', 'Our Approach', 'About Us'].map((text, i) => (
              <li key={text}>
                <a 
                  href={text === 'Home' ? '/' : text === 'Our Approach' ? '/#approach' : `/${text.toLowerCase().replace(' ', '')}.html`}
                  ref={el => itemsRef.current[i] = el}
                  onClick={toggleMenu}
                >
                  {text}
                </a>
              </li>
            ))}
          </ul>
        </aside>
      </div>

      {/* SCROLL EXPANSION HERO - IMAGE ONLY */}
      <ScrollExpandMedia
        mediaType="image"
        mediaSrc="https://images.unsplash.com/photo-1682687982501-1e58ab814714?q=80&w=1280&auto=format&fit=crop"
        bgImageSrc="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1920&auto=format&fit=crop"
        title="Dynamic Image Showcase"
        date="Underwater Adventure"
        scrollToExpand="Scroll down to expand"
        textBlend
      >
        <div className="max-w-4xl mx-auto pt-20">
          <section className="story-future">
            <div className="story-future-grid">
              <div className="story-future-content">
                <p className="story-eyebrow">OUR STORY</p>

                <h2 className="story-future-title">
                  Designing<br />
                  with clarity,<br />
                  precision & intent
                </h2>

                <div className="story-divider"></div>

                <p>
                  D4A Studio was formed from a belief that architecture must be precise,
                  responsible, and deeply human.
                </p>

                <p>
                  We operate as a turnkey architecture and engineering practice,
                  taking ownership from concept through construction.
                </p>

                <p>
                  Technology is integral to our process — from digital simulations
                  to data-driven design decisions — enabling us to build better,
                  smarter, and more enduring spaces.
                </p>

                <p className="story-note">
                  Based in Bengaluru · Working across residential, commercial & turnkey projects
                </p>
              </div>
            </div>
          </section>
        </div>
      </ScrollExpandMedia>

      {/* MAIN CONTENT */}
      <main>
        
        {/* PROCESS SECTION - FULL WIDTH COMPONENT */}
        <ProcessSection />

        <div className="container">
          {/* TEAM SECTION */}
          <section id="team" className="team">
            <div className="section-title">Meet the Team</div>
            <div className="section-sub">Thoughtful designers and collaborators</div>

            <div className="team-grid">
              {[
                { name: "Dhyan Srinivas", role: "Founder", img1: "01_DHYAN SRINIVASA_FOUNDER.PNG", img2: "01_D.png" },
                { name: "Sanath Veeru KS", role: "Lead Architect", img1: "02_SANATH.PNG", img2: "02_S.PNG" },
                { name: "Prashant D", role: "Junior Architect", img1: "03_PRASHANT D_JUNIOR ARCHITECT (1).PNG", img2: "03_P.png" },
                { name: "Arsalan R K", role: "Junior Architect", img1: "04_AR1.PNG", img2: "04_AR.png" }
              ].map((member, i) => (
                <div className="team-card" key={member.name}>
                  <div className="team-img-wrapper">
                    <img src={member.img1} className="base-img" alt={member.name} />
                    <img src={member.img2} className="hover-img" alt={member.name} />
                  </div>
                  <h4>{member.name}</h4>
                  <p>{member.role}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
