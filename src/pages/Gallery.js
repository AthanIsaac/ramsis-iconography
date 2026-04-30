import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Gallery.css';

const galleryImages = [
  { src: '/uploads/icons/Christ.jpg', alt: 'Christ Pantocrator Icon' },
  { src: '/uploads/icons/Theotokos.jpg', alt: 'Theotokos and Child Icon' },
  { src: '/uploads/icons/severusdioskoros.png', alt: 'Saints Severus and Dioskoros', landscape: true },
  { src: '/uploads/icons/StAnthony.jpg', alt: 'Saint Anthony Icon' },
  { src: '/uploads/icons/mary2.jpg', alt: 'Theotokos' },
  { src: '/uploads/icons/menaPhotini.jpeg', alt: 'Saint Mena and Saint Photini', landscape: true },
  
  // { src: '/uploads/icons/severus.png', alt: 'Saint Severus Icon' },
  // { src: '/uploads/icons/dioskoros.png', alt: 'Saint Dioscorus Icon' },
  { src: '/uploads/icons/StAnthonyWords.jpg', alt: 'Saint Anthony with Words Icon' },
  { src: '/uploads/icons/simon.jpg', alt: 'Saint Simon Icon' },
  { src: '/uploads/icons/christ1.jpg', alt: 'Christ Icon' },
  { src: '/uploads/icons/crucifix.png', alt: 'Crucifix Icon' },
  
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
