import React, { useEffect } from 'react';
import './Home.css';

const Home = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * 0.1;
      
      // Update CSS custom property for the background position
      document.documentElement.style.setProperty('--scroll-offset', `${rate}px`);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>George Ramsis</h1>
          <p className="lead">Master iconographer creating sacred art through ancient traditions and contemporary vision</p>
          <div className="hero-buttons">
            <a href="/gallery" className="btn btn-primary">View Work</a>
            <a href="/about" className="btn btn-secondary">About</a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="about-content">
          <div className="about-text">
            <h2>Sacred Artistry</h2>
            <p>
              With over two decades of dedication to the ancient art of iconography,
              George Ramsis creates sacred works that bridge the divine and earthly realms.
            </p>
            <p>
              Each piece is meticulously crafted using traditional techniques,
              natural pigments, and gold leaf, following canonical traditions
              while bringing fresh perspective to timeless subjects.
            </p>
            <a href="/about" className="btn btn-ghost">Learn More →</a>
          </div>
          <div className="about-image">
            <img
              src="/uploads/icons/iconographer.jpg"
              alt="George Ramsis - Master Iconographer"
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
              <p>Large-scale iconostasis and sanctuary decoration projects for Orthodox and Catholic communities.</p>
            </div>
            <div className="service-item">
              <h3>Private Collections</h3>
              <p>Intimate icons for personal devotion, prayer corners, and family heirlooms.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="gallery-section">
        <div className="gallery-content">
          <div className="gallery-header">
            <h2>Recent Works</h2>
          </div>
          <div className="gallery-grid">
            <div className="gallery-item">
              <img
                src="/uploads/icons/IMG_7371.jpg"
                alt="Sacred Icon 1"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  border: '1px solid var(--border-subtle)',
                  transition: 'all 0.3s ease'
                }}
              />
            </div>
            <div className="gallery-item">
              <img
                src="/uploads/icons/IMG_2719.jpg"
                alt="Sacred Icon 2"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  border: '1px solid var(--border-subtle)',
                  transition: 'all 0.3s ease'
                }}
              />
            </div>
            <div className="gallery-item">
              <img
                src="/uploads/icons/IMG_5261.jpg"
                alt="Sacred Icon 3"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  border: '1px solid var(--border-subtle)',
                  transition: 'all 0.3s ease'
                }}
              />
            </div>
            <div className="gallery-item">
              <img
                src="/uploads/icons/IMG_8454.jpg"
                alt="Sacred Icon 4"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  border: '1px solid var(--border-subtle)',
                  transition: 'all 0.3s ease'
                }}
              />
            </div>
          </div>
          <div className="gallery-cta">
            <a href="/gallery" className="btn btn-outline">View All Work</a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="contact-content">
          <h2>Commission Sacred Art</h2>
          <p>Ready to discuss your vision for a custom icon or restoration project?</p>
          <a href="/contact" className="btn btn-primary">Get In Touch</a>
        </div>
      </section>
    </div>
  );
};

export default Home;