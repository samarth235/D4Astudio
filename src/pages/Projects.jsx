import React, { useEffect } from 'react';
import './Projects.scss';
import gsap from 'gsap';

export default function Projects() {
  useEffect(() => {
    // Basic body layout for this page
    document.body.style.paddingTop = "6rem";
    document.body.style.background = "white";

    // 1. Intersection Observer for Project Blocks
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.dataset.animated !== "true") {
          entry.target.dataset.animated = "true";
          const block = entry.target;
          const title = block.querySelector(".project-title");
          const image = block.querySelector(".project-img");
          const sentences = block.querySelectorAll(".sentence");

          if (title) title.classList.add("show");

          setTimeout(() => {
            if (image) image.classList.add("show");
          }, 400);

          setTimeout(() => {
            sentences.forEach((sentence, index) => {
              setTimeout(() => {
                sentence.style.opacity = "1";
                sentence.style.transform = "translateY(0)";
              }, index * 120);
            });
          }, 1100);

          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });

    document.querySelectorAll(".project-block").forEach(block => observer.observe(block));

    // 2. Hamburger Menu GSAP
    const hamburger = document.getElementById("hamburger");
    const wrapper = document.getElementById("smWrapper");
    const panel = document.getElementById("smPanel");
    const backdrop = document.getElementById("smBackdrop");
    const items = document.querySelectorAll(".sm-list a");

    let open = false;
    let tl;
    if (panel && items.length) {
      gsap.set(panel, { xPercent: 100 });
      gsap.set(items, { yPercent: 140 });

      tl = gsap.timeline({ paused: true });
      tl.to(backdrop, { opacity: 1, duration: 0.3 })
        .to(panel, { xPercent: 0, duration: 0.6, ease: "power4.out" }, 0)
        .to(items, {
          yPercent: 0,
          duration: 1,
          ease: "power4.out",
          stagger: 0.1
        }, 0.2);

      const toggleMenu = () => {
        open = !open;
        wrapper?.classList.toggle("active", open);
        document.body.style.overflow = open ? "hidden" : "";
        hamburger?.classList.toggle("active", open);
        if (open) tl.play(0); else tl.reverse();
      };

      hamburger?.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleMenu();
      });

      backdrop?.addEventListener("click", toggleMenu);
      items.forEach(link => link.addEventListener("click", toggleMenu));
    }

    // 3. OGL WebGL Effect
    let startEffectTimeout;
    let effectReqFrameId;
    let rendererInstance = null;
    let effectRunning = true;

    const startEffect = () => {
      if (!effectRunning) return;
      const lib = window.OGL;
      if (!lib) return;
      
      const { Renderer, Program, Mesh, Triangle, Color } = lib;
      const container = document.getElementById('threads-container');
      if (!container) return;

      const renderer = new Renderer({ alpha: true, premultipliedAlpha: false });
      rendererInstance = renderer;
      const gl = renderer.gl;
      container.appendChild(gl.canvas);

      const vertexShader = `
          attribute vec2 position;
          attribute vec2 uv;
          varying vec2 vUv;
          void main() {
              vUv = uv;
              gl_Position = vec4(position, 0.0, 1.0);
          }
      `;

      const fragmentShader = `
          precision highp float;
          uniform float iTime;
          uniform vec3 iResolution;
          uniform vec3 uColor;
          uniform float uAmplitude;
          uniform float uDistance;
          uniform vec2 uMouse;

          const int u_line_count = 40;
          const float u_line_width = 2.0;
          const float u_line_blur = 3.0;

          float Perlin2D(vec2 P) {
              vec2 Pi = floor(P);
              vec4 Pf_Pfmin1 = P.xyxy - vec4(Pi, Pi + 1.0);
              vec4 Pt = vec4(Pi.xy, Pi.xy + 1.0);
              Pt = Pt - floor(Pt * (1.0 / 71.0)) * 71.0;
              Pt += vec2(26.0, 161.0).xyxy;
              Pt *= Pt;
              Pt = Pt.xzxz * Pt.yyww;
              vec4 hash_x = fract(Pt * (1.0 / 951.135664));
              vec4 hash_y = fract(Pt * (1.0 / 642.949883));
              vec4 grad_x = hash_x - 0.49999;
              vec4 grad_y = hash_y - 0.49999;
              vec4 grad_results = inversesqrt(grad_x * grad_x + grad_y * grad_y) * (grad_x * Pf_Pfmin1.xzxz + grad_y * Pf_Pfmin1.yyww);
              grad_results *= 1.4142;
              vec2 blend = Pf_Pfmin1.xy * Pf_Pfmin1.xy * Pf_Pfmin1.xy * (Pf_Pfmin1.xy * (Pf_Pfmin1.xy * 6.0 - 15.0) + 10.0);
              vec4 blend2 = vec4(blend, vec2(1.0 - blend));
              return dot(grad_results, blend2.zxzx * blend2.wwyy);
          }

          void main() {
              vec2 uv = gl_FragCoord.xy / iResolution.xy;
              float line_total = 0.0;
              
              for (int i = 0; i < u_line_count; i++) {
                  float p = float(i) / float(u_line_count);
                  float split = 0.1 + (p * 0.4);
                  float amp = smoothstep(split, 0.7, uv.x) * 0.5 * uAmplitude;
                  float xn = Perlin2D(vec2(iTime * 0.1, uv.x + p) * 2.5);
                  float y = 0.5 + (p - 0.5) * uDistance + xn / 2.0 * amp;
                  
                  float blur = (u_line_blur / iResolution.y) * p;
                  float l = smoothstep(y + (u_line_width/iResolution.y) + blur, y, uv.y) - 
                            smoothstep(y, y - (u_line_width/iResolution.y) - blur, uv.y);
                  line_total += clamp(l * (1.0 - pow(p, 0.3)), 0.0, 1.0);
              }
              gl_FragColor = vec4(uColor, clamp(line_total, 0.0, 1.0));
          }
      `;

      const program = new Program(gl, {
          vertex: vertexShader,
          fragment: fragmentShader,
          uniforms: {
              iTime: { value: 0 },
              iResolution: { value: new Color() },
              uColor: { value: new Color(1, 1, 1) },
              uAmplitude: { value: 1.0 },
              uDistance: { value: 0.25 },
              uMouse: { value: new Float32Array([0.5, 0.5]) }
          },
          transparent: true
      });

      const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

      function resize() {
          if (!effectRunning) return;
          const w = container.clientWidth;
          const h = container.clientHeight;
          if(renderer) {
             renderer.setSize(w, h);
             program.uniforms.iResolution.value.set(w, h, w / h);
          }
      }

      window.addEventListener('resize', resize);
      resize();

      function update(t) {
          if (!effectRunning) return;
          program.uniforms.iTime.value = t * 0.001;
          if(renderer) renderer.render({ scene: mesh });
          effectReqFrameId = requestAnimationFrame(update);
      }
      effectReqFrameId = requestAnimationFrame(update);
    };

    startEffectTimeout = setTimeout(() => {
       if (window.OGL) { startEffect(); }
       else {
         // Fallback if not loaded immediately
         const interval = setInterval(() => {
            if (window.OGL) { clearInterval(interval); startEffect(); }
         }, 100);
         setTimeout(() => clearInterval(interval), 3000);
       }
    }, 100);

    return () => {
      observer.disconnect();
      document.body.style.overflow = "";
      document.body.style.paddingTop = "";
      document.body.style.background = "";
      effectRunning = false;
      clearTimeout(startEffectTimeout);
      cancelAnimationFrame(effectReqFrameId);
    };
  }, []);

  return (
    <div id="projects-page" dangerouslySetInnerHTML={{ __html: `
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
      <a href="/projects.html" aria-current="page">
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
      <a href="/about.html">
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

<section class="threads-hero">
  <div id="threads-container" class="threads-container"></div>
  <div class="hero-title-wrapper">
    <h1 class="hero-main-title">PROJECTS</h1>
    <div class="hero-dec-line"></div>
  </div>
</section>

<div class="sm-wrapper" id="smWrapper">
  <div class="sm-backdrop" id="smBackdrop"></div>

  <aside class="sm-panel" id="smPanel">
    <ul class="sm-list">
      <li><a href="/">Home</a></li>
      <li><a href="/#approach">Our Approach</a></li>
      <li><a href="/projects.html">Projects</a></li>
      <li><a href="/about.html">About Us</a></li>
    </ul>
  </aside>
</div>


<!-- ===========================
     PROJECTS CONTENT
=========================== -->
<div class="content">

  <!-- PROJECT 1 -->
  <div class="project-block first-project" data-animated="false">
    <div class="project-inner">
      <div class="img-wrapper">
        <img src="Urban Edge.png" class="project-img" />
      </div>

      <div class="text-col">
        <h3 class="project-title">Urban Edge</h3>
        <p class="paragraph">
          <span class="sentence">D4A Studio's proposal envisions an exclusive uber-luxury residential</span>
          <span class="sentence">community in Sigehalli, crafted to offer calm,privacy, and sophistication.</span>
          <span class="sentence">The architecture features contemporary tower forms, expansive decks,</span>
          <span class="sentence">and a refined material palette that elevates modern living.Spacious</span>
          <span class="sentence">3,3.5 & 4,4.5 BHK residences, duplex sky villas, and penthouses</span>
          <span class="sentence">are planned with generous ceiling heights and premium finishes.</span>
          <span class="sentence">A resort-style clubhouse, wellness spa, temperature-controlled pool,</span>
          <span class="sentence">and sky terraces create a lifestyle of comfort and indulgence.</span>
        </p>
      </div>
    </div>
  </div>

  <!-- PROJECT 2 -->
  <div class="project-block" data-animated="false">
    <div class="project-inner">
      <div class="img-wrapper">
        <img src="Amarta MO.png" class="project-img" />
      </div>

      <div class="text-col">
        <h3 class="project-title">Amarta</h3>
        <p class="paragraph">
          <span class="sentence">The Amarta Marketing Office by D4A STUDIO is not just a workspace; it's a</span>
          <span class="sentence">strategically designed client experience. The project redefines the traditional</span>
          <span class="sentence">corporate environment by integrating hospitality and engagement into its core.</span>
          <span class="sentence">The design guides visitors through a seamless and engaging journey. The reception</span>
          <span class="sentence">area sets a welcoming tone, leading into focused discussion rooms for detailed conversations.</span>
          <span class="sentence">The central feature of the project is a captivating central courtyard. A tranquil water</span>
          <span class="sentence"> body surrounds a central tree, creating a peaceful oasis accessible to clients.</span>
          <span class="sentence">This courtyard serves as a symbolic and \tfunctional focal point, reflecting the peaceful</span>
          <span class="sentence">and community-oriented nature of the properties being marketed.</span>
        </p>
      </div>
    </div>
  </div>

  <!-- PROJECT 3 -->
  <div class="project-block" data-animated="false">
    <div class="project-inner">
      <div class="img-wrapper">
        <img src="RRN LUX.png" class="project-img" />
      </div>
      <div class="text-col">
        <h3 class="project-title">RRN LUX</h3>
        <p class="paragraph">
          <span class="sentence">D4A Studio presents an uber-luxury residential address in RR Nagar</span>
          <span class="sentence">that blends timeless architecture with contemporary living.</span>
          <span class="sentence">The design choreographs light, privacy, and landscape to create a calm,</span>
          <span class="sentence">resort-grade,experience minutes from the city, yet worlds away from its</span>
          <span class="sentence">pace.Set within a serene residential precinct of RR Nagar, the master plan</span>
          <span class="sentence">orients towers to capture prevailing breezes and long views while</span>
          <span class="sentence">minimizing heat gain and overlooking.Vehicular movement is pushed </span>
          <span class="sentence">to the periphery, preserving a pedestrian-first central quiet interiors.</span>
        </p>
      </div>
    </div>
  </div>

  <!-- PROJECT 4 -->
  <div class="project-block" data-animated="false">
    <div class="project-inner">
      <div class="img-wrapper">
        <img src="Suresh Residence .JPG" class="project-img" />
      </div>
      <div class="text-col">
        <h3 class="project-title">Suresh Residence</h3>
        <p class="paragraph">
          <span class="sentence">This is a design for a four-story, East-facing residential building</span>
          <span class="sentence"> on a 40' x 60' site in Sarjapur, created for the Suresh Residence.</span>
          <span class="sentence">The architecture, by D4A STUDIO, combines modern aesthetics with</span>
          <span class="sentence">functional spaces, focusing on natural light, open-plan living,</span>
          <span class="sentence">and unique features like a double-height dining area and an integrated waterfall.</span>
          <span class="sentence">The East-facing orientation is utilized to maximize morning sunlight</span>
          <span class="sentence">,creating bright and inviting living spaces. The design incorporates </span>
          <span class="sentence">a setback for a small garden and sit-out area, positioned to catch the morning sun. </span>
          <span class="sentence">The site dimensions are 40 feet in width and 60 feet in depth.</span>
        </p>
      </div>
    </div>
  </div>

  <!-- PROJECT 5 -->
  <div class="project-block" data-animated="false">
    <div class="project-inner">
      <div class="img-wrapper">
        <img src="Sumukha Residence.jpg" class="project-img" />
      </div>
      <div class="text-col">
        <h3 class="project-title">Sumukha Residence</h3>
        <p class="paragraph">
          <span class="sentence">This project, "Sumukha Residence," is a modern renovation of a residential</span>
          <span class="sentence">building on a 30' x 50' East-facing site The design focuses on updating the </span>
          <span class="sentence">existing structure to meet contemporary living standards,maximizing space,</span>
          <span class="sentence">improving natural light and ventilation, and introducing a sleek, modern aesthetic.</span>
          <span class="sentence">The renovation aims to create a more functional and elegant home without</span>
          <span class="sentence">expanding the original footprint.</span>
        </p>
      </div>
    </div>
  </div>
</div>
    ` }} />
  );
}
