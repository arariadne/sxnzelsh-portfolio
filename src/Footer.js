import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer id="footer" className="profile-footer">
      <div className="container">
        <div className="footer-content">
          <div className="contact-col">
            <div className="contact-info">
              <h3>Contact Me</h3>
              <p><i className="fas fa-envelope"></i> elaisha.arias@email.com</p>
              <p><i className="fas fa-phone"></i> +63 912 345 6789</p>
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