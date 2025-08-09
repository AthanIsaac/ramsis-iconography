import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-main">
            <h3>Ramsis Iconography</h3>
            <p>Sacred art crafted with devotion and tradition</p>
          </div>
          
          <div className="footer-links">
            <a href="/">Home</a>
            <a href="/about">About</a>
            <a href="/gallery">Gallery</a>
            <a href="/contact">Contact</a>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {currentYear} Ramsis Iconography. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;