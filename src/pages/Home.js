import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import IconSlideshow from '../components/IconSlideshow';

const Home = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.1;
      
      // Update CSS custom property for the background position
      document.documentElement.style.setProperty('--scroll-offset', `${rate}px`);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="home">
      {/* Hero Section - Icon Slideshow */}
      <section className="home-hero">
        <IconSlideshow />
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="about-content">
          <div className="about-text">
            <h2>Sacred Artistry</h2>
            <p>
              With years of dedication to the ancient art of iconography,
              George Ramsis creates sacred works that bridge the divine and earthly realms.
            </p>
            <p>
              Each piece is meticulously crafted using traditional techniques,
              natural pigments, and gold leaf, following canonical traditions
              while bringing fresh perspective to timeless subjects.
            </p>
            <Link to="/about" className="btn btn-ghost">Learn More →</Link>
          </div>
          <div className="about-image">
            <img
              src="/uploads/icons/george.jpg"
              alt="George Ramsis - Iconographer"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                aspectRatio: '4/5',
                border: '1px solid var(--border-subtle)'
              }}
            />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="services-content">
          <div className="services-header">
            <h2>Services</h2>
            <p>Bringing sacred art to churches, homes, and hearts worldwide</p>
          </div>
          <div className="services-grid">
            <div className="service-item">
              <h3>Custom Iconography</h3>
              <p>Personalized sacred art created to your specifications, following traditional methods and canonical guidelines.</p>
            </div>
            <div className="service-item">
              <h3>Church Commissions</h3>
              <p>Large-scale iconostasis and sanctuary decoration projects for Orthodox communities.</p>
            </div>
            <div className="service-item">
              <h3>Private Collections</h3>
              <p>Intimate icons for personal devotion, prayer corners, and family heirlooms.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="contact-content">
          <h2>Commission Sacred Art</h2>
          <p>Ready to discuss your vision for a custom icon or restoration project?</p>
          <Link to="/contact" className="btn btn-primary">Get In Touch</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;