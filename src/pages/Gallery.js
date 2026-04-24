import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Gallery.css';

const galleryImages = [
  { src: '/uploads/icons/Christ.jpg', alt: 'Christ Pantocrator Icon' },
  { src: '/uploads/icons/Theotokos.jpg', alt: 'Theotokos and Child Icon' },
  { src: '/uploads/icons/StAnthony.jpg', alt: 'Saint Anthony Icon' },
  { src: '/uploads/icons/StAnthonyWords.jpg', alt: 'Saint Anthony with Words Icon' },
  { src: '/uploads/icons/severus.png', alt: 'Saint Severus Icon' },
  { src: '/uploads/icons/dioskoros.png', alt: 'Saint Dioscorus Icon' },
  { src: '/uploads/icons/christ1.jpg', alt: 'Christ Icon' },
  { src: '/uploads/icons/crucifix.png', alt: 'Crucifix Icon' },
  { src: '/uploads/icons/simon.jpg', alt: 'Saint Simon Icon' },
];

const process = [
  { num: '01', title: 'Prayer & Preparation', desc: 'Every icon begins with prayer, fasting, and spiritual preparation to create a sacred space for the work.' },
  { num: '02', title: 'Traditional Materials', desc: 'Using natural pigments, egg tempera, and gold leaf following centuries-old recipes and techniques.' },
  { num: '03', title: 'Canonical Guidelines', desc: 'Strict adherence to theological and artistic traditions ensures spiritual authenticity in every piece.' },
];

const Gallery = () => {
  const [lightbox, setLightbox] = useState(null);

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
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.animate-in').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightbox) return;
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowRight' && lightbox.index < galleryImages.length - 1)
        setLightbox({ index: lightbox.index + 1 });
      if (e.key === 'ArrowLeft' && lightbox.index > 0)
        setLightbox({ index: lightbox.index - 1 });
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightbox]);

  useEffect(() => {
    document.body.style.overflow = lightbox ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightbox]);

  const navigate = (dir) => {
    if (!lightbox) return;
    const next = lightbox.index + dir;
    if (next >= 0 && next < galleryImages.length) setLightbox({ index: next });
  };

  return (
    <div className="gallery">
      {lightbox && (
        <div className="lightbox-overlay" onClick={() => setLightbox(null)}>
          <button className="lightbox-close" onClick={() => setLightbox(null)} aria-label="Close">✕</button>
          <button className="lightbox-nav lightbox-prev" onClick={e => { e.stopPropagation(); navigate(-1); }} disabled={lightbox.index === 0} aria-label="Previous"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg></button>
          <div className="lightbox-img-wrap" onClick={e => e.stopPropagation()}>
            <img src={galleryImages[lightbox.index].src} alt={galleryImages[lightbox.index].alt} />
          </div>
          <button className="lightbox-nav lightbox-next" onClick={e => { e.stopPropagation(); navigate(1); }} disabled={lightbox.index === galleryImages.length - 1} aria-label="Next"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg></button>
          <div className="lightbox-counter">{lightbox.index + 1} / {galleryImages.length}</div>
        </div>
      )}

      <section className="hero">
        <div className="hero-content">
          <h1>Sacred Art Gallery</h1>
          <p className="lead">A collection of icons created with devotion, tradition, and spiritual purpose</p>
        </div>
        <div className="hero-scroll-indicator"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg></div>
      </section>

      {/* Featured Works */}
      <section className="page-section">
        <div className="section-content">
          <div className="section-header animate-in">
            <span className="section-label">Portfolio</span>
            <h2>Featured Works</h2>
          </div>
          <div className="featured-grid">
            {galleryImages.map((img, i) => (
              <div key={i} className={`featured-item animate-in${img.landscape ? ' landscape-item' : ''}`} style={{ transitionDelay: `${(i % 2) * 0.1}s` }}>
                <div
                  className="gallery-img-wrap"
                  onClick={() => setLightbox({ index: i })}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => e.key === 'Enter' && setLightbox({ index: i })}
                  aria-label={`View ${img.alt} fullscreen`}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    decoding="async"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div className="gallery-img-overlay">
                    <span className="gallery-img-expand">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 3 21 3 21 9"/>
                        <polyline points="9 21 3 21 3 15"/>
                        <line x1="21" y1="3" x2="14" y2="10"/>
                        <line x1="3" y1="21" x2="10" y2="14"/>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="page-section">
        <div className="section-content">
          <div className="section-header animate-in">
            <span className="section-label">Behind the Work</span>
            <h2>The Sacred Process</h2>
          </div>
          <div className="process-grid">
            {process.map((item, i) => (
              <div key={i} className="numbered-card animate-in" style={{ transitionDelay: `${i * 0.1}s` }}>
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
          <h2>Commission Your Sacred Icon</h2>
          <p>Ready to discuss your vision for a custom icon or learn about available works?</p>
          <div className="cta-buttons">
            <Link to="/contact" className="btn btn-primary">Start Your Commission</Link>
            <Link to="/about" className="btn btn-outline">Learn About the Process</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
