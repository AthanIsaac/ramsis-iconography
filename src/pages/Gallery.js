import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import LazyImage from '../components/LazyImage';
import './Gallery.css';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    fetch('/data/gallery.json')
      .then(r => r.json())
      .then(data => setImages(data.images));
  }, []);

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
  }, [images.length]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightbox) return;
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowRight' && lightbox.index < images.length - 1)
        setLightbox({ index: lightbox.index + 1 });
      if (e.key === 'ArrowLeft' && lightbox.index > 0)
        setLightbox({ index: lightbox.index - 1 });
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightbox, images.length]);

  useEffect(() => {
    document.body.style.overflow = lightbox ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightbox]);

  const navigate = (dir) => {
    if (!lightbox) return;
    const next = lightbox.index + dir;
    if (next >= 0 && next < images.length) setLightbox({ index: next });
  };

  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50)
      navigate(deltaX < 0 ? 1 : -1);
    touchStartX.current = null;
    touchStartY.current = null;
  };

  return (
    <div className="gallery">
      {lightbox && (
        <div className="lightbox-overlay" onClick={() => setLightbox(null)} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
          <button className="lightbox-close" onClick={() => setLightbox(null)} aria-label="Close">✕</button>
          <button className="lightbox-nav lightbox-prev" onClick={e => { e.stopPropagation(); navigate(-1); }} disabled={lightbox.index === 0} aria-label="Previous"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg></button>
          <div className="lightbox-img-wrap" onClick={e => e.stopPropagation()}>
            <img src={images[lightbox.index].src} alt={images[lightbox.index].alt} />
          </div>
          <button className="lightbox-nav lightbox-next" onClick={e => { e.stopPropagation(); navigate(1); }} disabled={lightbox.index === images.length - 1} aria-label="Next"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg></button>
          <div className="lightbox-counter">{lightbox.index + 1} / {images.length}</div>
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
            {images.map((img, i) => (
              <div key={i} className={`featured-item animate-in${img.landscape ? ' landscape-item' : ''}`} style={{ transitionDelay: `${(i % 2) * 0.1}s` }}>
                <div
                  className="gallery-img-wrap"
                  onClick={() => setLightbox({ index: i })}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => e.key === 'Enter' && setLightbox({ index: i })}
                  aria-label={`View ${img.alt} fullscreen`}
                >
                  <LazyImage
                    src={img.src}
                    alt={img.alt}
                    priority={i === 0}
                    imgStyle={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
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
