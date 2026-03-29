import React from 'react';
import './Footer.scss';

export default function Footer() {
  const [activeType, setActiveType] = React.useState('OTHER');

  React.useEffect(() => {
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
      if (script1.parentNode) document.body.removeChild(script1);
      if (script2.parentNode) document.body.removeChild(script2);
    };
  }, []);

  return (
    <div className="shared-footer-wrapper">
      {/* ─── CONTACT SECTION ─── */}
      <section className="contact-section">
        <div className="contact-container">
          <div className="contact-info">
            <p className="contact-label">CONTACT</p>
            <h2 className="contact-title">Let's Build<br /><span>Something Enduring</span></h2>
            <p className="contact-desc">
              We take on a limited number of projects each year to ensure every commission receives our full attention. New inquiries for 2026—2027 are welcome.
            </p>
            
            <div className="info-blocks">
              <a href="https://www.google.com/maps/search/D4A+STUDIO+Bengaluru" target="_blank" rel="noreferrer" className="info-block contact-link">
                <div className="info-icon"><ion-icon name="location-outline"></ion-icon></div>
                <div>
                  <p className="info-label">STUDIO</p>
                  <p className="info-text">Bengaluru, Karnataka</p>
                </div>
              </a>
              <a href="mailto:d4astudios@gmail.com" className="info-block contact-link">
                <div className="info-icon"><ion-icon name="mail-outline"></ion-icon></div>
                <div>
                  <p className="info-label">EMAIL</p>
                  <p className="info-text">d4astudios@gmail.com</p>
                </div>
              </a>
              <a href="tel:+919876543210" className="info-block contact-link">
                <div className="info-icon"><ion-icon name="phone-portrait-outline"></ion-icon></div>
                <div>
                  <p className="info-label">PHONE</p>
                  <p className="info-text">+91 98765 43210</p>
                </div>
              </a>
            </div>
          </div>

          <div className="contact-form-box">
            <p className="form-label">NEW PROJECT INQUIRY</p>
            <form className="inquiry-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label>PROJECT TYPE</label>
                <div className="form-pills">
                  {['RESIDENTIAL', 'COMMERCIAL', 'CIVIC', 'OTHER'].map(type => (
                    <button 
                      key={type} 
                      type="button" 
                      className={`form-pill ${activeType === type ? 'active' : ''}`}
                      onClick={() => setActiveType(type)}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              <div className="form-group">
                <label>FULL NAME</label>
                <input type="text" placeholder="John Doe" />
              </div>
              <div className="form-group">
                <label>EMAIL ADDRESS</label>
                <input type="email" placeholder="john@example.com" />
              </div>
              <div className="form-group">
                <label>PROJECT BRIEF</label>
                <textarea placeholder="Tell us about your project, timeline, and vision..."></textarea>
              </div>
              <button type="submit" className="submit-btn">SUBMIT INQUIRY</button>
            </form>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="projects-footer">
        <div className="footer-inner">
          <div className="footer-brand">D4A STUDIO</div>
          <div className="footer-socials">
            <a href="https://www.instagram.com/d4a_studio/?hl=en" target="_blank" rel="noreferrer" aria-label="Instagram">
              <ion-icon name="logo-instagram"></ion-icon>
            </a>
            <a href="https://in.linkedin.com/company/d4astudio" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <ion-icon name="logo-linkedin"></ion-icon>
            </a>
          </div>
          <div className="footer-copy">© 2024 D4A Studio. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
