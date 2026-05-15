import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Projects.css';

const IMAGES_PER_PAGE = 6;

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [currentPages, setCurrentPages] = useState({});
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    fetch('/data/projects.json')
      .then(r => r.json())
      .then(data => setProjects(data.projects));
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
  }, [projects.length]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightbox) return;
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowRight') {
        const { projectIndex, imageIndex } = lightbox;
        const images = projects[projectIndex].images;
        if (imageIndex < images.length - 1)
          setLightbox({ projectIndex, imageIndex: imageIndex + 1, src: images[imageIndex + 1].src });
      }
      if (e.key === 'ArrowLeft') {
        const { projectIndex, imageIndex } = lightbox;
        const images = projects[projectIndex].images;
        if (imageIndex > 0)
          setLightbox({ projectIndex, imageIndex: imageIndex - 1, src: images[imageIndex - 1].src });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightbox, projects]);

  useEffect(() => {
    document.body.style.overflow = lightbox ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightbox]);

  const getPage = (i) => currentPages[i] ?? 0;

  const getPageImages = (projectIndex) => {
    const start = getPage(projectIndex) * IMAGES_PER_PAGE;
    return projects[projectIndex].images.slice(start, start + IMAGES_PER_PAGE);
  };

  const getTotalPages = (projectIndex) =>
    Math.ceil(projects[projectIndex].images.length / IMAGES_PER_PAGE);

  const changePage = (projectIndex, newPage) =>
    setCurrentPages(prev => ({ ...prev, [projectIndex]: newPage }));

  const openLightbox = (projectIndex, imageIndex) => {
    setLightbox({ projectIndex, imageIndex, src: projects[projectIndex].images[imageIndex].src });
  };

  const navigateLightbox = (direction) => {
    if (!lightbox) return;
    const { projectIndex, imageIndex } = lightbox;
    const images = projects[projectIndex].images;
    const newIndex = imageIndex + direction;
    if (newIndex >= 0 && newIndex < images.length)
      setLightbox({ projectIndex, imageIndex: newIndex, src: images[newIndex].src });
  };

  const Pagination = ({ projectIndex }) => {
    const total = getTotalPages(projectIndex);
    const current = getPage(projectIndex);
    if (total <= 1) return null;
    return (
      <div className="pagination">
        <button className="pagination-btn" onClick={() => changePage(projectIndex, current - 1)} disabled={current === 0}>
          ‹ Previous
        </button>
        <span className="pagination-info">Page {current + 1} of {total}</span>
        <button className="pagination-btn" onClick={() => changePage(projectIndex, current + 1)} disabled={current === total - 1}>
          Next ›
        </button>
      </div>
    );
  };

  return (
    <div className="projects-page">
      {lightbox && (
        <div className="lightbox-overlay" onClick={() => setLightbox(null)}>
          <button className="lightbox-close" onClick={() => setLightbox(null)} aria-label="Close">✕</button>
          <button
            className="lightbox-nav lightbox-prev"
            onClick={e => { e.stopPropagation(); navigateLightbox(-1); }}
            disabled={lightbox.imageIndex === 0}
            aria-label="Previous image"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <div className="lightbox-img-wrap" onClick={e => e.stopPropagation()}>
            <img src={lightbox.src} alt="Full view" />
          </div>
          <button
            className="lightbox-nav lightbox-next"
            onClick={e => { e.stopPropagation(); navigateLightbox(1); }}
            disabled={lightbox.imageIndex === projects[lightbox.projectIndex].images.length - 1}
            aria-label="Next image"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
          <div className="lightbox-counter">
            {lightbox.imageIndex + 1} / {projects[lightbox.projectIndex].images.length}
          </div>
        </div>
      )}

      <section className="hero">
        <div className="hero-content">
          <h1>Church Projects</h1>
          <p className="lead">Sacred iconographic works across North America by George Ramsis</p>
        </div>
        <div className="hero-scroll-indicator"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg></div>
      </section>

      <section className="page-section">
        <div className="proj-intro-content">
          <div className="proj-intro-text animate-in">
            <span className="section-label">Collaboration</span>
            <h2>In Collaboration with Fadi Mikhail</h2>
            <p>
              George Ramsis had the privilege of working in collaboration with the renowned iconographer
              Fadi Mikhail, contributing to several significant church projects across North America.
            </p>
            <p>
              Fadi Mikhail, born in 1984, is an Egyptian-English painter and graduate from the
              world-renowned Slade School of Fine Art, University College London (UCL). His mastery
              of traditional iconographic methods and theological depth have made him one of the most
              sought-after iconographers in the Coptic Orthodox tradition.
            </p>
          </div>
        </div>
      </section>

      {projects.map((project, projectIndex) => {
        const pageImages = getPageImages(projectIndex);
        const pageStart = getPage(projectIndex) * IMAGES_PER_PAGE;

        return (
          <section key={projectIndex} className="page-section">
            <div className="proj-church-content">
              <div className="proj-church-header animate-in">
                <span className="section-label">{project.location}</span>
                <h2>{project.name}</h2>
              </div>
              <div className="proj-church-grid">
                {pageImages.map((image, i) => (
                  <div
                    key={i}
                    className="proj-img-wrap"
                    onClick={() => openLightbox(projectIndex, pageStart + i)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={e => e.key === 'Enter' && openLightbox(projectIndex, pageStart + i)}
                    aria-label={`View ${project.name} image ${pageStart + i + 1}`}
                  >
                    <picture>
                      <source
                        type="image/webp"
                        srcSet={`${image.src.replace(/\.[^.]+$/, '-800.webp')} 800w, ${image.src.replace(/\.[^.]+$/, '.webp')}`}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                      />
                      <source
                        srcSet={`${image.src.replace(/\.[^.]+$/, '-800.jpg')} 800w, ${image.src}`}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                      />
                      <img
                        src={image.src}
                        alt={`${project.name} - ${pageStart + i + 1}`}
                        loading="lazy"
                        decoding="async"
                      />
                    </picture>
                    <div className="proj-img-overlay">
                      <span className="proj-img-expand">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="15 3 21 3 21 9"/>
                          <polyline points="9 21 3 21 3 15"/>
                          <line x1="21" y1="3" x2="14" y2="10"/>
                          <line x1="3" y1="21" x2="10" y2="14"/>
                        </svg>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <Pagination projectIndex={projectIndex} />
            </div>
          </section>
        );
      })}

      <section className="cta-section">
        <div className="cta-section-content">
          <h2>Commission Your Sacred Art</h2>
          <p>Ready to discuss your vision for a custom icon or church project?</p>
          <Link to="/contact" className="btn btn-primary">Get In Touch</Link>
        </div>
      </section>
    </div>
  );
};

export default Projects;
