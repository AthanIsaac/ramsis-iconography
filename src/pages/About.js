import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './About.css';

const training = [
  { num: '01', title: 'Traditional Techniques', desc: 'Studied under master iconographers in Egypt and London, learning ancient egg tempera methods and gold leaf application techniques.' },
  { num: '02', title: 'Theological Studies', desc: 'Completed extensive theological education to understand the spiritual and canonical requirements of sacred iconography.' },
  { num: '03', title: 'Natural Pigments', desc: 'Expert in creating and using traditional natural pigments, ensuring authenticity and longevity in every piece.' },
  { num: '04', title: 'Gold Leaf Application', desc: 'Traditional gold leaf techniques, creating luminous halos and sacred details that reflect divine light.' },
];

const recognition = [
  { num: '01', title: 'Church Commissions', desc: 'George has contributed to many churches across North America, working on iconostasis and sanctuary decorations.' },
  { num: '02', title: 'Icon Portfolio', desc: 'Dozens of individual icons have been created for private collections, churches, and prayer spaces.' },
  { num: '03', title: 'Teaching & Workshops', desc: 'Regular workshops and classes help preserve traditional iconographic techniques for future generations.' },
];

const About = () => {
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
    <div className="about">
      <section className="hero">
        <div className="hero-content">
          <h1>About George Ramsis</h1>
          <p className="lead">Iconographer dedicated to preserving sacred traditions through contemporary artistry</p>
        </div>
        <div className="hero-scroll-indicator"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg></div>
      </section>

      {/* Biography */}
      <section className="page-section">
        <div className="biography-content">
          <div className="biography-text animate-in">
            <span className="section-label">Iconographer</span>
            <h2>A Life Devoted to Sacred Art</h2>
            <p>
              George Ramsis has dedicated years to the ancient and sacred art of iconography.
              His journey began with a profound spiritual calling that led him to study under master iconographers in Egypt and London,
              where he learned the traditional techniques passed down through centuries.
            </p>
            <p>
              Born into a family with deep Orthodox Christian roots, George's artistic path was shaped by both
              faith and a natural talent for visual expression. His work bridges the gap between ancient traditions
              and contemporary spiritual needs, creating icons that speak to modern believers while honoring
              canonical requirements.
            </p>
            <p>
              Each icon created in his studio follows strict theological guidelines and traditional methods,
              using natural pigments, gold leaf, and time-honored techniques that ensure both spiritual
              authenticity and artistic excellence.
            </p>
          </div>
          <div className="biography-image">
            <img
              src="/uploads/icons/george.jpg"
              alt="George Ramsis in his studio"
              decoding="async"
            />
          </div>
        </div>
      </section>

      {/* Training */}
      <section className="page-section">
        <div className="section-content">
          <div className="section-header animate-in">
            <span className="section-label">Expertise</span>
            <h2>Training & Expertise</h2>
          </div>
          <div className="training-grid">
            {training.map((item, i) => (
              <div key={i} className="numbered-card animate-in" style={{ transitionDelay: `${i * 0.08}s` }}>
                <span className="card-number">{item.num}</span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recognition */}
      <section className="page-section">
        <div className="section-content">
          <div className="section-header animate-in">
            <span className="section-label">Work</span>
            <h2>Recognition & Commissions</h2>
          </div>
          <div className="recognition-grid">
            {recognition.map((item, i) => (
              <div key={i} className="numbered-card animate-in" style={{ transitionDelay: `${i * 0.08}s` }}>
                <span className="card-number">{item.num}</span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-section-content">
          <h2>Commission Your Sacred Art</h2>
          <p>Ready to discuss your vision for a custom icon or learn more about the iconographic process?</p>
          <Link to="/contact" className="btn btn-primary">Get In Touch</Link>
        </div>
      </section>
    </div>
  );
};

export default About;
