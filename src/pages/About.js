import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './About.css';

const About = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.1;
      document.documentElement.style.setProperty('--scroll-offset', `${rate}px`);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="about">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>About George Ramsis</h1>
          <p className="lead">Iconographer dedicated to preserving sacred traditions through contemporary artistry</p>
        </div>
      </section>

      {/* Biography Section */}
      <section className="page-section">
        <div className="biography-content">
          <div className="biography-text">
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

      {/* Training Section */}
      <section className="page-section">
        <div className="section-content">
          <div className="section-header">
            <h2>Training & Expertise</h2>
            <p>A foundation built on traditional methods and spiritual understanding</p>
          </div>
          <div className="training-grid">
            <div className="glass-card">
              <h3>Traditional Techniques</h3>
              <p>Studied under master iconographers in Egypt, London, learning ancient egg tempera methods and gold leaf application techniques.</p>
            </div>
            <div className="glass-card">
              <h3>Theological Studies</h3>
              <p>Completed extensive theological education to understand the spiritual and canonical requirements of sacred iconography.</p>
            </div>
            <div className="glass-card">
              <h3>Natural Pigments</h3>
              <p>Expert in creating and using traditional natural pigments, ensuring authenticity and longevity in every piece.</p>
            </div>
            <div className="glass-card">
              <h3>Gold Leaf Application</h3>
              <p>Traditional gold leaf techniques, creating luminous halos and sacred details that reflect divine light.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Recognition Section */}
      <section className="page-section">
        <div className="section-content">
          <div className="section-header">
            <h2>Recognition & Commissions</h2>
          </div>
          <div className="recognition-grid">
            <div className="glass-card">
              <h3>Church Commissions</h3>
              <p>George has contributed to many churches across North America, working on iconostasis and sanctuary decorations.</p>
            </div>
            <div className="glass-card">
              <h3>Icon Portfolio</h3>
              <p>Dozens of individual icons have been created for private collections, churches, and prayer spaces.</p>
            </div>
            <div className="glass-card">
              <h3>Teaching & Workshops</h3>
              <p>Regular workshops and classes help preserve traditional iconographic techniques for future generations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
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
