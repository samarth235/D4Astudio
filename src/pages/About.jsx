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
    // 
  }, [menuOpen]);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div id="about-page">
      {/* HEADER */}
      <header className="header" id="header">
        <div className="header-container">
          <div className="logo-container">
            <a href="/" style={{ lineHeight: 0 }}>
              <img src="/img.webp" className="logo" alt="D4A logo" />
            </a>
          </div>
          <nav className="nav">
            <a href="/">
              <span className="slot">
                <span className="top">Home</span>
                <span className="bottom">Home</span>
              </span>
            </a>
            <a href="/projects">
              <span className="slot">
                <span className="top">Projects</span>
                <span className="bottom">Projects</span>
              </span>
            </a>

            <a href="/about" aria-current="page">
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
            {['Home', 'Projects', 'About Us'].map((text, i) => (
              <li key={text}>
                <a
                  href={text === 'Home' ? '/' : `/${text.toLowerCase().split(' ')[0]}`}
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

      {/* SCROLL EXPANSION HERO */}
      <ScrollExpandMedia
        mediaType="video"
        mediaSrc="/clubhouseClip-40-1.mp4"
      >
        <div className="max-w-7xl mx-auto pt-20">
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

              <div className="story-future-image">
                <img src="/img1.webp" alt="About D4A Studio" />
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
                { name: "Dhyan Srinivas", role: "Founder", img1: "01_DHYAN SRINIVASA_FOUNDER.webp", img2: "01_D.webp" },
                { name: "Sanath Veeru KS", role: "Lead Architect", img1: "02_SANATH.webp", img2: "02_S.webp" },
                { name: "Prashant D", role: "Junior Architect", img1: "03_PRASHANT D_JUNIOR ARCHITECT (1).webp", img2: "03_P.webp" },
                { name: "Arsalan R K", role: "Junior Architect", img1: "04_AR1.webp", img2: "04_AR.webp" }
              ].map((member, i) => (
                <div className="team-card" key={member.name}>
                  <div className="team-img-wrapper">
                    <img src={member.img1} className="base-img" alt={member.name} loading="lazy" />
                    <img src={member.img2} className="hover-img" alt={member.name} loading="lazy" />
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
