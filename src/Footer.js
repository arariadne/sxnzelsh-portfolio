import React from 'react';
import './Footer.css';
import useScrollReveal from './useScrollReveal';

function Footer() {
  const [footerRef, footerVisible] = useScrollReveal();

  return (
    <footer
      id="footer"
      ref={footerRef}
      className={`profile-footer reveal-section${footerVisible ? ' in-view' : ''}`}
    >
      <div className="container">
        <div className="footer-content">
          <div className="contact-col">
            <div className="contact-info">
              <h3>Contact Me</h3>
              <p><i className="fas fa-envelope"></i> elaishaarias@gmail.com</p>
              <p><i className="fas fa-phone"></i> +63 956 765 5825</p>
              <p>
                <a 
                  href="https://drive.google.com/drive/folders/1rSuPmUTNPmR0i4Lbi7NYiwiFgm0csjtI?usp=sharing" 
                  download 
                  className="resume-download-link"
                >
                  <i className="fas fa-file-pdf"></i> Download Resume
                </a>
              </p>
            </div>
          </div>
          
          <div className="social-col">
            <div className="footer-social-links">
              <a href="https://github.com/arariadne" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-github"></i>
              </a>
              <a href="https://linkedin.com/in/elaisha-arias" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="https://facebook.com/elaisha.arias" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook"></i>
              </a>
            </div>
            <p className="copyright">© {new Date().getFullYear()} Elaisha Mae Arias. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;