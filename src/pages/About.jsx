import React, { useEffect } from 'react';
import './About.scss';
import gsap from 'gsap';

export default function About() {
  useEffect(() => {
    // 1. Reveal Animations & Hero Slide in
    const reveals = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(r => obs.observe(r));

    const baseImgs = document.querySelectorAll(".base-img");
    const wrap = document.querySelectorAll(".hero-img-hover-wrapper");

    baseImgs.forEach((img, i) => {
      setTimeout(() => img.classList.add("visible"), i * 600);
    });
    setTimeout(() => wrap.forEach(w => w.classList.add("ready")), baseImgs.length * 700);

    // 2. Hamburger GSAP
    const hamburger = document.getElementById("hamburgerBtn");
    const wrapper = document.getElementById("smWrapper");
    const panel = document.getElementById("smPanel");
    const backdrop = document.getElementById("smBackdrop");
    const items = document.querySelectorAll(".sm-list a");
    let open = false;

    let tl;
    if (panel && items.length) {
      gsap.set(panel, { xPercent: 100 });
      gsap.set(items, { yPercent: 140 });
      gsap.set(backdrop, { opacity: 0 });
      
      tl = gsap.timeline({ paused: true });
      tl.to(backdrop, { opacity: 1, duration: 0.3 })
        .to(panel, { xPercent: 0, duration: 0.65, ease: "power4.out" }, 0)
        .to(items, { yPercent: 0, duration: 1, ease: "power4.out", stagger: 0.1 }, 0.2);

      const toggleMenu = () => {
        open = !open;
        wrapper?.classList.toggle("active", open);
        document.body.style.overflow = open ? "hidden" : "";
        hamburger?.classList.toggle("active", open);
        if (open) tl.play(0); else tl.reverse();
      };
      
      hamburger?.addEventListener("click", e => { e.stopPropagation(); toggleMenu(); });
      backdrop?.addEventListener("click", toggleMenu);
      items.forEach(link => link.addEventListener("click", toggleMenu));
    }

    return () => {
      obs.disconnect();
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div id="about-page" dangerouslySetInnerHTML={{ __html: `

<header class="header" id="header">
  <div class="header-container">
    <div class="logo-container">
      <a href="/" style="line-height:0;">
        <img src="/img.jpeg" class="logo" alt="D4A logo" />
      </a>
    </div>
    <nav class="nav">
      <a href="/">
        <span class="slot">
          <span class="top">Home</span>
          <span class="bottom">Home</span>
        </span>
      </a>
      <a href="/projects.html">
        <span class="slot">
          <span class="top">Projects</span>
          <span class="bottom">Projects</span>
        </span>
      </a>
      <a href="/#approach">
        <span class="slot">
          <span class="top">Our Approach</span>
          <span class="bottom">Our Approach</span>
        </span>
      </a>
      <a href="/about.html" aria-current="page">
        <span class="slot">
          <span class="top">About Us</span>
          <span class="bottom">About Us</span>
        </span>
      </a>
    </nav>
    <div class="hamburger" id="hamburgerBtn">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</header>
<div class="sm-wrapper" id="smWrapper">

  <div class="sm-backdrop" id="smBackdrop"></div>

  <aside class="sm-panel" id="smPanel">
    <ul class="sm-list">
      <li><a href="/">Home</a></li>
      <li><a href="/projects.html">Projects</a></li>
      <li><a href="/#approach">Our Approach</a></li>
      <li><a href="/about.html">About Us</a></li>
    </ul>
  </aside>

</div>

<!-- =============================== HERO =============================== -->
<section class="hero reveal">
  <div class="hero-right-full">

    <div class="hero-img-hover-wrapper">
      <img src="Slide1.JPG" class="base-img" />
      <img src="Slide2.JPG" class="hover-img" />
    </div>

    <div class="hero-img-hover-wrapper">
      <img src="Slide1 (1).JPG" class="base-img" />
      <img src="Slide2 (1).JPG" class="hover-img" />
    </div>

    <div class="hero-img-hover-wrapper">
      <img src="Slide1 (4).JPG" class="base-img" />
      <img src="Slide2 (2).JPG" class="hover-img" />
    </div>

  </div>
</section>

<!-- =============================== MAIN =============================== -->
<main>
  <div class="container">
    <!-- =============================== OUR STORY (FUTURISTIC) =============================== -->
<section class="story-future reveal">
  <div class="story-future-bg"></div>

  <div class="story-future-grid">

    <!-- LEFT : IMAGE -->
    <div class="story-future-image">
      <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=900&fit=crop" alt="" />
    </div>

    <!-- RIGHT : TEXT -->
    <div class="story-future-content">
      <p class="story-eyebrow">OUR STORY</p>

      <h2 class="story-future-title">
        Designing<br />
        with clarity,<br />
        precision & intent
      </h2>

      <div class="story-divider"></div>

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

      <p class="story-note">
        Based in Bengaluru · Working across residential, commercial & turnkey projects
      </p>
    </div>

  </div>
</section>

    <!-- PROCESS -->
    <section id="process" class="reveal">
      <div class="section-title">Our Process</div>
      <div class="section-sub">A considered sequence from idea to place</div>

      <div class="process-grid">

        <div class="process-step">
          <div class="num-box">01</div>
          <div class="p-text">
            <h4>Discovery</h4>
            <p>Research, site study, and aligning on goals.</p>
          </div>
        </div>

        <div class="process-step">
          <div class="num-box">02</div>
          <div class="p-text">
            <h4>Concept</h4>
            <p>Schematic design & defining the core idea.</p>
          </div>
        </div>

        <div class="process-step">
          <div class="num-box">03</div>
          <div class="p-text">
            <h4>Develop</h4>
            <p>Detailed design, materials, and coordination.</p>
          </div>
        </div>

        <div class="process-step">
          <div class="num-box">04</div>
          <div class="p-text">
            <h4>Build & Refine</h4>
            <p>Construction quality & adjustments.</p>
          </div>
        </div>

        <div class="process-step">
          <div class="num-box">05</div>
          <div class="p-text">
            <h4>Live</h4>
            <p>Post-occupancy review.</p>
          </div>
        </div>

      </div>
    </section>

    <!-- TEAM -->
    <section id="team" class="team reveal">
      <div class="section-title">Meet the Team</div>
      <div class="section-sub">Thoughtful designers and collaborators</div>

      <div class="team-grid">

        <div class="team-card">
          <div class="team-img-wrapper">
            <img src="01_DHYAN SRINIVASA_FOUNDER.PNG" class="base-img" />
            <img src="01_D.png" class="hover-img" />
          </div>
          <h4>Dhyan Srinivas</h4>
          <p>Founder</p>
        </div>

        <div class="team-card">
          <div class="team-img-wrapper">
            <img src="02_SANATH.PNG" />
            <img src="02_S.PNG" class="hover-img" />
          </div>
          <h4>Sanath Veeru KS</h4>
          <p>Lead Architect</p>
        </div>

        <div class="team-card">
          <div class="team-img-wrapper">
            <img src="03_PRASHANT D_JUNIOR ARCHITECT (1).PNG" />
            <img src="03_P.png" class="hover-img" />
          </div>
          <h4>Prashant D</h4>
          <p>Junior Architect</p>
        </div>

        <div class="team-card">
          <div class="team-img-wrapper">
            <img src="04_AR1.PNG" />
            <img src="04_AR.png" class="hover-img" />
          </div>
          <h4>Arsalan R K</h4>
          <p>Junior Architect</p>
        </div>

      </div>
    </section>

    <!-- CTA -->
    <section class="cta reveal">
      <div>
        <h3>Interested in collaborating?</h3>
        <p style="color:var(--muted);">Tell us about your project — we'll respond within 48 hours.</p>
      </div>
      <a href="mailto:d4astudios@gmail.com">Let's Talk</a>
    </section>

  </div>
</main>

<!-- =============================== FOOTER =============================== -->
<footer>
  <p style="margin-bottom: 0.8rem;">
    Contact Us:
    <a class="email-link" href="mailto:d4astudios@gmail.com">d4astudios@gmail.com</a>
  </p>

  <p style="margin-top: 0.4rem;">
    <i class="fa-solid fa-phone"></i> +91 98765 43210
  </p>

  <p style="margin-top: 0.4rem;">
    <a href="https://www.google.com/maps/dir//D4A+STUDIO..." 
       target="_blank" 
       style="color:white; text-decoration:none;">
      <i class="fa-solid fa-location-dot"></i> Bengaluru, Karnataka
    </a>
  </p>

  <div style="margin-top:0.6rem;">
    <a class="icon-link" href="https://www.instagram.com/d4a_studio/?hl=en"><i class="fa-brands fa-instagram"></i></a>
    <a class="icon-link" href="https://in.linkedin.com/company/d4astudio"><i class="fa-brands fa-linkedin"></i></a>
  </div>
</footer>
    ` }} />
  );
}
