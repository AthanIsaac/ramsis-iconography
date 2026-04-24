import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Projects.css';

const projectsData = {
  athanasiusFlorida: {
    name: "St. Athanasius American Coptic Orthodox Church",
    location: "Orlando, FL",
    images: [
      "38BBED8E-36B7-42FB-9F75-2D1BE18BA0A7.JPG",
      "ECFED977-68A5-478E-A5FB-57632760556B.JPG",
      "IMG_1184.JPG",
      "IMG_1185.JPG",
      "IMG_1186.JPG",
      "IMG_1187.JPG",
      "IMG_9699.JPG",
      "IMG_9716.JPG",
      "IMG_1188.JPG",
      "IMG_9715.JPG",
      "IMG_9776.JPG",
      "IMG_9786.JPG",
      "IMG_9817.JPG"
    ]
  },
  crossDallas: {
    name: "Holy Cross Coptic Orthodox Church",
    location: "Austin, TX",
    images: [
      "6b4f0a0b-ac39-4e99-87b6-97985d94bc98.png.PNG",
      "3716adf2-7d7d-4742-99b0-92d40cc722f8.png.PNG",
      "IMG_4319.JPG",
      "IMG_6180.JPG",
      "IMG_6181.JPG",
      "IMG_6202.JPG",
      "IMG_6287.JPG",
      "IMG_6289.JPG"
    ]
  },
  maryClearwater: {
    name: "St. Mary and St. Mina Coptic Orthodox Church",
    location: "Clearwater, FL",
    images: [
      "IMG_3055.JPG",
      "IMG_3069.JPG",
      "IMG_3125.JPG",
      "IMG_3158.JPG",
      "PHOTO-2025-11-12-23-53-57.JPG",
      "PHOTO-2025-11-12-23-53-58.JPG"
    ]
  },
  paulCali: {
    name: "St. Paul American Coptic Orthodox Church",
    location: "Irvine, CA",
    images: [
      "24ee0597-55c9-4cf9-af4d-0b1f879d1e49.JPG",
      "32cfbe90-7f95-4e60-b3b8-1cf08bd52732.JPG",
      "067B2368-ABBC-44D4-A92F-CDC5BD1BCCFD.JPG",
      "a7e78954-a697-44cb-91fa-09ccb4f6bb86.JPG",
      "c2d2c80d-64f3-4fcb-b813-d3d7f3590e3d.JPG",
      "e890387c-a7c4-4cdc-af74-d80ba0bcf98e.JPG",
      "eb648701-baa2-4720-a99c-58e782ac7563.JPG",
      "ee0a6096-fe61-42d8-b73c-ca4a7b3bd10f.JPG",
      "IMG_4689.PNG",
      "IMG_4713.JPG",
      "IMG_4725.JPG",
      "IMG_4828.JPG",
      "IMG_4883.JPG",
      "IMG_4922.JPG",
      "IMG_4924.JPG",
      "IMG_4950.JPG",
      "IMG_5148.JPG",
      "IMG_5149.JPG"
    ]
  }
};

const IMAGES_PER_PAGE = 6;

const Projects = () => {
  const [currentPages, setCurrentPages] = useState(
    Object.fromEntries(Object.keys(projectsData).map(k => [k, 0]))
  );
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
      if (e.key === 'ArrowRight') {
        const { projectKey, index } = lightbox;
        const images = projectsData[projectKey].images;
        if (index < images.length - 1) {
          setLightbox({ projectKey, index: index + 1, src: `/uploads/projects/${projectKey}/${images[index + 1]}` });
        }
      }
      if (e.key === 'ArrowLeft') {
        const { projectKey, index } = lightbox;
        const images = projectsData[projectKey].images;
        if (index > 0) {
          setLightbox({ projectKey, index: index - 1, src: `/uploads/projects/${projectKey}/${images[index - 1]}` });
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightbox]);

  useEffect(() => {
    if (lightbox) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [lightbox]);

  const getPageImages = (projectKey) => {
    const start = currentPages[projectKey] * IMAGES_PER_PAGE;
    return projectsData[projectKey].images.slice(start, start + IMAGES_PER_PAGE);
  };

  const getTotalPages = (projectKey) =>
    Math.ceil(projectsData[projectKey].images.length / IMAGES_PER_PAGE);

  const changePage = (projectKey, newPage) => {
    setCurrentPages(prev => ({ ...prev, [projectKey]: newPage }));
  };

  const openLightbox = (projectKey, image, globalIndex) => {
    setLightbox({
      projectKey,
      index: globalIndex,
      src: `/uploads/projects/${projectKey}/${image}`
    });
  };

  const navigateLightbox = (direction) => {
    if (!lightbox) return;
    const { projectKey, index } = lightbox;
    const images = projectsData[projectKey].images;
    const newIndex = index + direction;
    if (newIndex >= 0 && newIndex < images.length) {
      setLightbox({ projectKey, index: newIndex, src: `/uploads/projects/${projectKey}/${images[newIndex]}` });
    }
  };

  const Pagination = ({ projectKey }) => {
    const total = getTotalPages(projectKey);
    const current = currentPages[projectKey];
    if (total <= 1) return null;
    return (
      <div className="pagination">
        <button
          className="pagination-btn"
          onClick={() => changePage(projectKey, current - 1)}
          disabled={current === 0}
        >
          ‹ Previous
        </button>
        <span className="pagination-info">Page {current + 1} of {total}</span>
        <button
          className="pagination-btn"
          onClick={() => changePage(projectKey, current + 1)}
          disabled={current === total - 1}
        >
          Next ›
        </button>
      </div>
    );
  };

  return (
    <div className="projects-page">
      {/* Lightbox */}
      {lightbox && (
        <div className="lightbox-overlay" onClick={() => setLightbox(null)}>
          <button className="lightbox-close" onClick={() => setLightbox(null)} aria-label="Close">✕</button>
          <button
            className="lightbox-nav lightbox-prev"
            onClick={e => { e.stopPropagation(); navigateLightbox(-1); }}
            disabled={lightbox.index === 0}
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
            disabled={lightbox.index === projectsData[lightbox.projectKey].images.length - 1}
            aria-label="Next image"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
          <div className="lightbox-counter">
            {lightbox.index + 1} / {projectsData[lightbox.projectKey].images.length}
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Church Projects</h1>
          <p className="lead">Sacred iconographic works across North America by George Ramsis</p>
        </div>
        <div className="hero-scroll-indicator"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg></div>
      </section>

      {/* Intro Section */}
      <section className="page-section">
        <div className="proj-intro-content">
          <div className="proj-intro-text animate-in">
            <span className="section-label">Collaboration</span>
            <h2>In Collaboration with Fadi Mikhail</h2>
            <p>
              George Ramsis had the privilege of working in collaboration with the renowned iconographer Fadi Mikhail,
              contributing to several significant church projects across North America.
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

      {/* Projects */}
      {Object.keys(projectsData).map((projectKey) => {
        const project = projectsData[projectKey];
        const pageImages = getPageImages(projectKey);
        const pageStart = currentPages[projectKey] * IMAGES_PER_PAGE;

        return (
          <section key={projectKey} className="page-section">
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
                    onClick={() => openLightbox(projectKey, image, pageStart + i)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={e => e.key === 'Enter' && openLightbox(projectKey, image, pageStart + i)}
                    aria-label={`View ${project.name} image ${pageStart + i + 1}`}
                  >
                    <img
                      src={`/uploads/projects/${projectKey}/${image}`}
                      alt={`${project.name} - ${pageStart + i + 1}`}
                      loading="lazy"
                      decoding="async"
                    />
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
              <Pagination projectKey={projectKey} />
            </div>
          </section>
        );
      })}

      {/* Contact CTA */}
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
