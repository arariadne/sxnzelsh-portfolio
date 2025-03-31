import React from 'react';
import './Footer.css';

function Footer({ email, phone, linkedin }) {
  return (
    <footer className="profile-footer">
      <div className="footer-contact">
        <p><a href={`mailto:${email}`}>Email: {email}</a></p>
        <p>Phone: {phone}</p>
        <p><a href={linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></p>
      </div>
    </footer>
  );
}

export default Footer;