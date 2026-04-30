import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './About.css';

const credentials = [
  { num: '01', title: 'Apprenticeship', desc: 'Trained under master iconographers in Egypt and London, immersed in the living tradition of Coptic sacred art passed down through generations.' },
  { num: '02', title: 'Theological Grounding', desc: 'Each icon is created with close attention to the theological and historical context behind the subject, honoring the canonical traditions of Coptic sacred art.' },
  { num: '03', title: 'Prayer & Preparation', desc: 'Every icon begins with prayer, fasting, and spiritual preparation to create a sacred space for the work.' },
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

      {/* Credentials */}
      <section className="page-section">
        <div className="section-content">
          <div className="section-header animate-in">
            <span className="section-label">Background</span>
            <h2>Training & Practice</h2>
          </div>
          <div className="credentials-grid">
            {credentials.map((item, i) => (
              <div key={i} className="numbered-card animate-in" style={{ transitionDelay: `${i * 0.08}s` }}>
                <span className="card-number">{item.num}</span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="page-section">
        <div className="section-content">
          <div className="section-header animate-in">
            <span className="section-label">From Clients</span>
            <h2>Testimonials</h2>
          </div>
          <div className="testimonials-grid">
            <div className="testimonial-item animate-in">
              <p>"I am a big fan of George's work! In the last few years his icons have become among some of the best in the world! He is creative and flexible and work with you to get the icon that you want that is both theologically sound and spiritually inspired."</p>
              <div className="testimonial-author"><strong>— Archdeacon Mark Solomon</strong></div>
            </div>
            <div className="testimonial-item animate-in" style={{ transitionDelay: '0.1s' }}>
              <p>"The icon was beautiful, and the process was seamless. George was professional, responsive, and thorough in explaining the iconography, with regular check-ins and timely delivery. I look forward to future commissions. God bless his work!"</p>
              <div className="testimonial-author"><strong>— Steven Loza, Washington</strong></div>
            </div>
            <div className="testimonial-item animate-in" style={{ transitionDelay: '0.15s' }}>
              <p>"I've had the pleasure of working with George as colleagues for some years. We've painted various murals together all over the world. During this time I've had the honour of witnessing his incredible artistic and personal development that most artists can only dream of. Serving God in any manner is such a great privilege, and painting icons with George is one of life's quiet privileges that I cherish each time we do it. His work and its beautiful quality speaks for itself. Add this to his wonderful humility for this vocation and you've got a beautiful synergy of joy."</p>
              <div className="testimonial-author"><strong>— Fadi Mikhail | Master Iconographer | UK</strong></div>
            </div>
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
