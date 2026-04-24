import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import IconSlideshow from '../components/IconSlideshow';

const previewIcons = [
  { src: '/uploads/icons/Christ.jpg', alt: 'Christ Pantocrator' },
  { src: '/uploads/icons/Theotokos.jpg', alt: 'Theotokos and Child' },
  { src: '/uploads/icons/StAnthony.jpg', alt: 'Saint Anthony' },
];

const Home = () => {
  useEffect(() => {
    const handleScroll = () => {
      const rate = window.pageYOffset * -0.1;
      document.documentElement.style.setProperty('--scroll-offset', `${rate}px`);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.animate-in').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="home">
      {/* Hero — full-viewport slideshow */}
      <section className="home-hero">
        <IconSlideshow />
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="about-content">
          <div className="about-text animate-in">
            <span className="section-label">Iconographer</span>
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
              decoding="async"
            />
          </div>
        </div>
      </section>

      {/* Gallery Preview Section */}
      <section className="gallery-preview-section">
        <div className="gallery-preview-content">
          <div className="preview-header animate-in">
            <span className="section-label">Recent Work</span>
            <h2>Featured Icons</h2>
          </div>
          <div className="gallery-preview-grid">
            {previewIcons.map((icon, i) => (
              <Link
                key={i}
                to="/gallery"
                className="preview-item animate-in"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <img src={icon.src} alt={icon.alt} loading="lazy" decoding="async" />
              </Link>
            ))}
          </div>
          <div className="preview-cta animate-in">
            <Link to="/gallery" className="btn btn-outline">View All Work →</Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="services-content">
          <div className="services-heading animate-in">
            <span className="section-label">What I Offer</span>
            <h2>Services</h2>
          </div>
          <div className="services-grid">
            {[
              { num: '01', title: 'Custom Iconography', desc: 'Personalized sacred art created to your specifications, following traditional methods and canonical guidelines.' },
              { num: '02', title: 'Church Commissions', desc: 'Large-scale iconostasis and sanctuary decoration projects for Orthodox communities.' },
              { num: '03', title: 'Private Collections', desc: 'Intimate icons for personal devotion, prayer corners, and family heirlooms.' },
            ].map((s, i) => (
              <div key={i} className="service-item animate-in" style={{ transitionDelay: `${i * 0.1}s` }}>
                <span className="service-number">{s.num}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Dark Section */}
      <section className="cta-dark-section">
        <div className="cta-dark-content animate-in">
          <h2>Commission Sacred Art</h2>
          <p>Ready to discuss your vision for a custom icon or restoration project?</p>
          <Link to="/contact" className="btn btn-light">Get In Touch</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
