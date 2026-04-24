import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Mobile menu overlay - moved outside header for full page coverage */}
      {isMenuOpen && (
        <div
          className="nav-overlay"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}
      
      <header className="header">
        <div className="container">
          <div className="logo">
            <Link to="/">
              <h1 style={{ fontFamily: 'Cinzel, serif', fontWeight: '600' }}>Ramsis Iconography</h1>
              <p>Sacred Art by George Ramsis</p>
            </Link>
          </div>
          
          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <button
              className="nav-close"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
            >
              <span></span>
              <span></span>
            </button>
            <ul>
              <li>
                <Link
                  to="/"
                  className={isActive('/') ? 'active' : ''}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className={isActive('/about') ? 'active' : ''}
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/projects"
                  className={isActive('/projects') ? 'active' : ''}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  to="/gallery"
                  className={isActive('/gallery') ? 'active' : ''}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  to="/history"
                  className={isActive('/history') ? 'active' : ''}
                  onClick={() => setIsMenuOpen(false)}
                >
                  History
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className={`contact-button ${isActive('/contact') ? 'active' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          <button
            className={`menu-toggle ${isMenuOpen ? 'nav-open' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>
    </>
  );
};

export default Header;