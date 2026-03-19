import React, { useEffect } from 'react';
import './Home.scss';
import gsap from 'gsap';

export default function Home() {
  useEffect(() => {
    // 1. Splash Screen Logic
    const navType = performance?.getEntriesByType("navigation")?.[0]?.type;
    const hasVisited = sessionStorage.getItem("hasVisitedHome");
    const splash = document.getElementById("splash");
    const splashVideo = document.getElementById("splashVideo");
    const contentWrapper = document.getElementById("contentWrapper");

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
            contentWrapper?.classList.add("animate");
            document.getElementById("header")?.classList.add("visible");
          }, 200);
          setTimeout(() => { if (splash) splash.style.display = "none"; }, 800);
        });
      }
    } else {
      if (splash) splash.style.display = "none";
      document.getElementById("header")?.classList.add("visible");
    }

    // 2. Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', e => {
        const targetId = link.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    // 3. Gallery Motion
    const row1 = document.querySelector(".row-1 .gallery-track");
    let autoSpeed = 0.35;
    let scrollBoost = 0;
    let lastScrollY = window.scrollY;
    let galleryAnimId;

    const onScrollBoost = () => {
      let d = window.scrollY - lastScrollY;
      scrollBoost = d * 0.25;
      lastScrollY = window.scrollY;
      scrollBoost = Math.max(Math.min(scrollBoost, 20), -20);
    };
    window.addEventListener("scroll", onScrollBoost);

    const animateGallery = () => {
      if (!row1) return;
      let totalSpeed = autoSpeed + scrollBoost;
      scrollBoost *= 0.9;
      const currentX = new DOMMatrix(getComputedStyle(row1).transform).m41;
      row1.style.transform = `translateX(${currentX - totalSpeed}px)`;
      const resetPoint = -(row1.scrollWidth / 3);
      if (currentX <= resetPoint) row1.style.transform = `translateX(0px)`;
      galleryAnimId = requestAnimationFrame(animateGallery);
    };
    if (row1) animateGallery();

    // 4. Intersection Observers & Scroll Reveal
    const observer = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add('visible');
          const delay = entry.target.dataset.delay;
          if(delay) entry.target.style.transitionDelay = delay + "s";
        }
      });
    },{ threshold: 0, rootMargin: "0px 0px -40% 0px" });
    
    document.querySelectorAll("[data-animate]").forEach(el => observer.observe(el));
    const headerTitle = document.querySelector("[data-animate-header]");
    if (headerTitle) observer.observe(headerTitle);

    const workCards = document.querySelectorAll('.work-card');
    const worksHeading = document.querySelector('.works-title');
    const handleScrollEffects = () => {
      workCards.forEach(card => {
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight - 80) card.classList.add('visible');
      });
      if (worksHeading) {
        const headRect = worksHeading.getBoundingClientRect();
        if (headRect.top < window.innerHeight - 60) worksHeading.classList.add('visible');
      }
    };
    window.addEventListener('scroll', handleScrollEffects);
    handleScrollEffects();

    // 5. Grid Glow Mousemove
    const worksGrid = document.querySelector(".works-grid");
    if (worksGrid) {
      worksGrid.onmousemove = e => {
        for (const card of document.querySelectorAll(".work-card")) {
          const rect = card.getBoundingClientRect(),
                x = e.clientX - rect.left,
                y = e.clientY - rect.top;
          card.style.setProperty("--mouse-x", `${x}px`);
          card.style.setProperty("--mouse-y", `${y}px`);
        }
      };
    }

    // 6. Background Reveal
    const projSection = document.querySelector(".gallery-section");
    const projImg = document.querySelector(".projects-bg-img");
    let revealed = false;
    const revealBackground = () => {
      if (revealed || !projSection || !projImg) return;
      const rect = projSection.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.25) {
        revealed = true;
        setTimeout(() => {
          projImg.style.opacity = '1';
          projImg.style.maskImage = "linear-gradient(to right, transparent 0%, black 100%)";
          projImg.style.webkitMaskImage = "linear-gradient(to right, transparent 0%, black 100%)";
        }, 220);
      }
    };
    window.addEventListener("scroll", revealBackground);

    // 7. Vanta
    let vantaEffect;
    let vantaTimeout = setTimeout(() => {
      if (window.VANTA && window.VANTA.WAVES) {
        vantaEffect = window.VANTA.WAVES({
          el: ".hero-section",
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          color: 0x4f5151,
          shininess: 55,
          waveHeight: 23,
          waveSpeed: 0.67,
          zoom: 0.88
        });
        setTimeout(() => {
          const vantaCanvas = document.querySelector(".hero-section canvas");
          if (vantaCanvas) vantaCanvas.classList.add("vanta-canvas");
        }, 500);
      }
    }, 3000);

    // 8. Hamburger Menu GSAP
    const hamburger = document.getElementById("hamburgerBtn");
    const wrapper = document.getElementById("smWrapper");
    const panel = document.getElementById("smPanel");
    const backdrop = document.getElementById("smBackdrop");
    const items = document.querySelectorAll(".sm-list a");
    let menuOpen = false;

    let tl;
    if (panel && items.length) {
      gsap.set(panel, { xPercent: 100 });
      gsap.set(items, { yPercent: 140 });
      tl = gsap.timeline({ paused: true });
      tl.to(backdrop, { opacity: 1, duration: 0.3 })
        .to(panel, { xPercent: 0, duration: 0.65, ease: "power4.out" }, 0)
        .to(items, { yPercent: 0, duration: 1, ease: "power4.out", stagger: 0.1 }, 0.2);
      
      const toggleMenu = () => {
        menuOpen = !menuOpen;
        wrapper?.classList.toggle("active", menuOpen);
        document.body.style.overflow = menuOpen ? "hidden" : "";
        hamburger?.classList.toggle("active", menuOpen);
        if (menuOpen) tl.play(0); else tl.reverse();
      };

      hamburger?.addEventListener("click", e => { e.stopPropagation(); toggleMenu(); });
      backdrop?.addEventListener("click", toggleMenu);
      items.forEach(link => link.addEventListener("click", toggleMenu));
    }

    return () => {
      // Cleanup
      window.removeEventListener("scroll", onScrollBoost);
      cancelAnimationFrame(galleryAnimId);
      observer.disconnect();
      window.removeEventListener('scroll', handleScrollEffects);
      window.removeEventListener("scroll", revealBackground);
      clearTimeout(vantaTimeout);
      if (vantaEffect) vantaEffect.destroy();
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div id="home-page" dangerouslySetInnerHTML={{ __html: `
      

  <div id="splash">
    <video
      id="splashVideo"
      muted
      autoplay
      playsinline
      webkit-playsinline
      preload="metadata"
      poster="img.jpeg"
    >
      <source src="logoanim.mp4" type="video/mp4" />
      <!-- iOS fallback text -->
      Your browser does not support the video tag.
    </video>
  </div>
  

  <header class="header" id="header">
    <div class="header-container">
      <a href="/" style="line-height:0;">
        <img src="img.jpeg" class="logo" alt="D4A logo">
      </a>
      <button class="hamburger" id="hamburgerBtn">
        <i class="fa-solid fa-bars"></i>
      </button>  
        <nav class="nav">
          <a href="/">
            <span class="slot active">
              <span class="top">Home</span>
              <span class="bottom">Home</span>
            </span>
          </a>
        
          <a href="/#gallery">
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
        
          <a href="about.html">
            <span class="slot">
              <span class="top">About Us</span>
              <span class="bottom">About Us</span>
            </span>
          </a>
        </nav>
        
    </div>
</header>
 <!-- STAGGERED MOBILE MENU -->
 <div class="sm-wrapper" id="smWrapper">

  <div class="sm-backdrop" id="smBackdrop"></div>

  <aside class="sm-panel" id="smPanel">
    <ul class="sm-list">
      <li><a href="/"><span>Home</span></a></li>
      <li><a href="/#gallery"><span>Projects</span></a></li>
      <li><a href="/#approach"><span>Our Approach</span></a></li>
      <li><a href="/about.html"><span>About Us</span></a></li>
    </ul>
  </aside>

</div>
  <section class="hero-section" id="home">
    <div class="content-wrapper" id="contentWrapper">
      <h1 class="hero-title">
        We create meaningful and impactful spaces<br>that inspire and serve
      </h1>
    </div>
  </section>

  <section class="gallery-section" id="gallery">
    <div class="projects-bg"></div>
    <div class="gallery-header">
      <h2 class="gallery-title">Our Projects</h2>
      <p class="gallery-subtitle">Explore our collection of thoughtfully designed spaces</p>
    </div>

    <div class="gallery-outer">
      <div class="gallery-inner">

        <div class="gallery-row row-1">
          <div class="gallery-track">
            <img src="Urban Edge.png" loading="lazy" />
            <img src="RRN LUX.png" loading="lazy" />
            <img src="Amarta MO.png" loading="lazy" />
            <img src="Suresh Residence .JPG" loading="lazy" />
            <img src="Sumukha Residence.jpg" loading="lazy" />
            <img src="Amarta CH.png" loading="lazy" />
            <img src="Amarta EP.png" loading="lazy" />
            <img src="suresh1.JPG" loading="lazy" />
            <img src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800" loading="lazy" />
            <img src="https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=800" loading="lazy" />
            <img src="https://images.unsplash.com/photo-1499955085172-a104c9463ece?w=800" loading="lazy" />
            <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800" loading="lazy" />

          </div>
        </div>

      </div>
    </div>
    

    <div id="galleryExpandOverlay"></div>
    <div class="gallery-btn-wrapper">
      <a href="/projects.html" class="gallery-btn premium-btn">View More Projects →</a>
  </div>  
      
  </section>
  <section class="approach" id="approach">
    <div class="container">
        <div class="section-header" data-animate-header>
            <span class="section-badge">Our Approach</span>
            <h2>How We Work With You</h2>
        </div>

        <div class="steps-grid">
            <div class="step-card" data-animate data-delay="0">
                <div class="step-number">01</div>
                <h3>Discovery & Strategy</h3>
                <p>We understand your goals, requirements, and vision to build a strong foundation.</p>
            </div>

            <div class="step-card" data-animate data-delay="0.15">
                <div class="step-number">02</div>
                <h3>Concept & Design</h3>
                <p>We translate ideas into beautiful visuals and functional design systems.</p>
            </div>

            <div class="step-card" data-animate data-delay="0.30">
                <div class="step-number">03</div>
                <h3>Development & Execution</h3>
                <p>We build with precision, performance, and attention to detail.</p>
            </div>

            <div class="step-card" data-animate data-delay="0.45">
                <div class="step-number">04</div>
                <h3>Delivery & Optimization</h3>
                <p>We refine, optimize, and launch — ensuring long-term value.</p>
            </div>
        </div>

        <div class="image-grid">
            <div class="approach-image-wrapper" data-animate data-delay="0.2">
                <img src="https://images.unsplash.com/photo-1598520106830-8c45c2035460?w=1080" />
                <div class="approach-image-overlay">
                    <h3>Innovation First</h3>
                    <p>Modern, forward-thinking design</p>
                </div>
            </div>

            <div class="approach-image-wrapper" data-animate data-delay="0.35">
                <img src="https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=1080" />
                <div class="approach-image-overlay">
                    <h3>True Collaboration</h3>
                    <p>Your vision × Our expertise</p>
                </div>
            </div>
        </div>
    </div>
</section>

  

  <footer>
    <p style="margin-bottom: 0.8rem;">
      Contact Us:
      <a class="email-link" href="mailto:d4astudios@gmail.com" target="_blank">
        d4astudios@gmail.com
      </a>
    </p>
  
    <p style="margin-top: 0.4rem;">
      <i class="fa-solid fa-phone"></i> +91 98765 43210
    </p>
  
    <p style="margin-top: 0.4rem;">
      <a href="https://www.google.com/maps/dir//D4A+STUDIO,.../" 
         target="_blank" 
         style="color:white; text-decoration:none;">
        <i class="fa-solid fa-location-dot"></i> Bengaluru, Karnataka
      </a>
    </p>
    
  
    <div style="margin-top:0.6rem;">
      <a class="icon-link" href="https://www.instagram.com/d4a_studio/?hl=en" target="_blank" style="margin-right:12px;">
        <i class="fa-brands fa-instagram"></i>
      </a>
      <a class="icon-link" href="https://in.linkedin.com/company/d4astudio" target="_blank">
        <i class="fa-brands fa-linkedin"></i>
      </a>
    </div>
  </footer>
    ` }} />
  );
}
