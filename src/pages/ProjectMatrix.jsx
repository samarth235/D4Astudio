import React, { useEffect } from 'react';
import './ProjectMatrix.scss';

export default function ProjectMatrix() {
  useEffect(() => {
    // Overriding body styles for this page if needed
    document.body.style.background = '#fff';
    document.body.style.color = '#000';
    document.title = "D4A Studio – Project Matrix";

    const items = document.querySelectorAll(".matrix-item");
    const handleClick = (e) => {
      const item = e.currentTarget;
      const target = item.dataset.scroll;
      document.querySelectorAll(".project-title").forEach(title => {
        if (title.innerText.trim() === target) {
          title.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      });
    };

    items.forEach(item => item.addEventListener("click", handleClick));

    return () => {
      items.forEach(item => item.removeEventListener("click", handleClick));
      document.body.style = '';
    };
  }, []);

  return (
    <div id="project-matrix-page">
      <section className="project-matrix">
        <div className="matrix-container">
          <div className="matrix-header">
            <span className="matrix-label">SELECTED WORKS</span>
            <h2 className="matrix-title">PROJECT INDEX</h2>
            <div className="matrix-line"></div>
          </div>
          <div className="matrix-grid">
            <div className="matrix-item" data-scroll="Urban Edge">
              <span className="matrix-index">01</span>
              <h4>Urban Edge</h4>
              <div className="matrix-preview">
                <img src="/Urban Edge.png" alt="Urban Edge" />
              </div>
            </div>
            <div className="matrix-item" data-scroll="Amarta">
              <span className="matrix-index">02</span>
              <h4>Amarta</h4>
              <div className="matrix-preview">
                <img src="/Amarta MO.png" alt="Amarta" />
              </div>
            </div>
            <div className="matrix-item" data-scroll="RRN LUX">
              <span className="matrix-index">03</span>
              <h4>RRN LUX</h4>
              <div className="matrix-preview">
                <img src="/RRN LUX.png" alt="RRN LUX" />
              </div>
            </div>
            <div className="matrix-item" data-scroll="Suresh Residence">
              <span className="matrix-index">04</span>
              <h4>Suresh Residence</h4>
              <div className="matrix-preview">
                <img src="/Suresh Residence .JPG" alt="Suresh" />
              </div>
            </div>
            <div className="matrix-item" data-scroll="Sumukha Residence">
              <span className="matrix-index">05</span>
              <h4>Sumukha Residence</h4>
              <div className="matrix-preview">
                <img src="/Sumukha Residence.jpg" alt="Sumukha" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
