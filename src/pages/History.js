import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useScrollEffect } from '../hooks/useScrollEffect';
import LazyImage from '../components/LazyImage';
import './History.css';

const techniques = [
  { num: '01', title: 'Egg Tempera', desc: 'Traditional medium using egg yolk mixed with natural pigments, creating luminous and durable colors that have survived centuries.' },
  { num: '02', title: 'Natural Pigments', desc: 'Colors derived from minerals, plants, and earth found along the Nile, including lapis lazuli, ochre, and malachite.' },
  { num: '03', title: 'Gold Leaf Application', desc: 'Sacred use of gold to represent divine light and glory, applied with traditional techniques to create heavenly radiance.' },
  { num: '04', title: 'Wooden Panels', desc: 'Icons painted on specially prepared wooden panels, often using sycamore wood native to Egypt.' },
];

const History = () => {
  const timelineRef = useRef(null);
  const progressRef = useRef(null);

  useScrollEffect(() => {
    const rate = window.pageYOffset * -0.1;
    document.documentElement.style.setProperty('--scroll-offset', `${rate}px`);
  });

  useScrollEffect(() => {
    if (timelineRef.current && progressRef.current) {
      const timelineRect = timelineRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const timelineHeight = timelineRef.current.offsetHeight;

      let progress = 0;
      if (timelineRect.top < windowHeight && timelineRect.bottom > 0) {
        const visibleTop = Math.max(0, windowHeight - timelineRect.top);
        const visibleHeight = Math.min(timelineHeight, visibleTop);
        progress = Math.min(100, (visibleHeight / timelineHeight) * 100);
      }
      progressRef.current.style.height = `${progress}%`;
    }
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.animate-in').forEach(el => observer.observe(el));

    const timelineObserver = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('timeline-item-visible'); }),
      { threshold: 0.3, rootMargin: '-50px 0px' }
    );
    document.querySelectorAll('.timeline-item').forEach(el => timelineObserver.observe(el));

    return () => { observer.disconnect(); timelineObserver.disconnect(); };
  }, []);

  return (
    <div className="history">
      <section className="hero">
        <div className="hero-content">
          <h1>History of Coptic Iconography</h1>
          <p className="lead">Exploring the rich tradition of sacred art from ancient Egypt to the modern era</p>
        </div>
      </section>

      {/* Introduction */}
      <section className="page-section">
        <div className="introduction-content">
          <div className="introduction-text animate-in">
            <span className="section-label">Origins</span>
            <h2>Ancient Roots of Sacred Art</h2>
            <p>
              Coptic iconography represents one of the oldest continuous traditions of Christian sacred art,
              tracing its origins back to the early Christian communities of Egypt in the 3rd and 4th centuries.
              This ancient art form emerged from the fusion of pharaonic Egyptian artistic traditions with
              early Christian symbolism and Byzantine influences.
            </p>
            <p>
              The word "Coptic" itself derives from the Greek word "Aigyptios" (Egyptian), reflecting the
              deep connection between this Christian art form and the land of the Nile. Coptic iconography
              developed its distinctive style through centuries of spiritual devotion and artistic refinement.
            </p>
          </div>
          <div className="introduction-image animate-in">
            <LazyImage
              src="/uploads/icons/history1.png"
              alt="Ancient Coptic iconographic traditions"
              className="introduction-image-img"
            />
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="page-section">
        <div className="timeline-content">
          <div className="section-header animate-in">
            <span className="section-label">Through the Ages</span>
            <h2>Historical Timeline</h2>
          </div>
          <div className="timeline" ref={timelineRef}>
            <div className="timeline-progress" ref={progressRef}></div>

            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-card">
                <div className="timeline-date">3rd–4th Century</div>
                <h3>Early Christian Period</h3>
                <p>First Christian symbols appear in Egyptian art, blending pharaonic motifs with Christian iconography. The transition from pagan to Christian themes begins to take shape in the artistic traditions of Egypt.</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-card">
                <div className="timeline-date">5th–7th Century</div>
                <h3>Golden Age</h3>
                <p>Coptic art flourishes with distinctive style featuring bold colors, expressive faces, and symbolic compositions. This period sees the development of the characteristic Coptic artistic language that would influence Christian art for centuries.</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-card">
                <div className="timeline-date">7th–10th Century</div>
                <h3>Islamic Period</h3>
                <p>Coptic art adapts and survives under Islamic rule, maintaining Christian themes while incorporating new influences. Artists develop innovative ways to preserve their religious traditions within a changing cultural landscape.</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-card">
                <div className="timeline-date">11th–15th Century</div>
                <h3>Medieval Continuity</h3>
                <p>Despite challenges, Coptic iconographic traditions persist in monasteries and churches. Manuscripts and wall paintings preserve the ancient techniques and spiritual symbolism for future generations.</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-card">
                <div className="timeline-date">Modern Era</div>
                <h3>Revival and Preservation</h3>
                <p>Contemporary artists like George Ramsis continue the tradition, preserving ancient techniques for future generations. Modern iconographers bridge the gap between historical practices and contemporary spiritual needs.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Characteristics */}
      <section className="page-section">
        <div className="characteristics-content">
          <div className="characteristics-image animate-in">
            <LazyImage
              src="/uploads/icons/history2.png"
              alt="Characteristics of Coptic iconographic art"
              className="characteristics-image-img"
            />
          </div>
          <div className="characteristics-text animate-in">
            <span className="section-label">Artistic Language</span>
            <h2>Distinctive Characteristics</h2>
            <div className="characteristics-list">
              <div className="characteristic-item">
                <h3>Symbolic Colors</h3>
                <p>Rich use of gold representing divine light, deep blues for heavenly realms, and earth tones connecting to the Nile valley.</p>
              </div>
              <div className="characteristic-item">
                <h3>Expressive Eyes</h3>
                <p>Large, penetrating eyes that serve as windows to the soul, reflecting the spiritual intensity of Coptic spirituality.</p>
              </div>
              <div className="characteristic-item">
                <h3>Hieratic Scale</h3>
                <p>Figures sized according to spiritual importance rather than natural proportions, emphasizing sacred hierarchy.</p>
              </div>
              <div className="characteristic-item">
                <h3>Egyptian Motifs</h3>
                <p>Integration of ancient Egyptian symbols like the ankh (transformed into the Christian cross) and lotus flowers.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Techniques */}
      <section className="page-section">
        <div className="section-content">
          <div className="section-header animate-in">
            <span className="section-label">Craftsmanship</span>
            <h2>Traditional Techniques</h2>
          </div>
          <div className="techniques-grid">
            {techniques.map((item, i) => (
              <div key={i} className="numbered-card animate-in" style={{ transitionDelay: `${i * 0.08}s` }}>
                <span className="card-number">{item.num}</span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Legacy */}
      <section className="page-section">
        <div className="legacy-content">
          <div className="section-header animate-in">
            <span className="section-label">Continuity</span>
            <h2>Living Tradition</h2>
          </div>
          <div className="legacy-text animate-in">
            <p>
              The tradition of Coptic iconography continues to thrive today through the dedicated work of
              contemporary iconographers who honor ancient methods while addressing modern spiritual needs.
              This living tradition bridges nearly two millennia of Christian art and devotion.
            </p>
            <p>
              Master iconographers carry forward this sacred heritage, ensuring that
              the spiritual and artistic wisdom of the Coptic tradition remains vibrant and accessible
              to new generations of believers and art lovers worldwide.
            </p>
            <p>
              Each icon created today connects us to the early Christian communities of Egypt, the desert
              fathers and mothers, and the countless faithful who have found in these sacred images a
              pathway to divine contemplation and prayer.
            </p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-section-content">
          <h2>Experience This Sacred Tradition</h2>
          <p>Discover how George Ramsis continues the ancient art of Coptic iconography in his contemporary work.</p>
          <div className="cta-buttons">
            <Link to="/gallery" className="btn btn-primary">View Gallery</Link>
            <Link to="/contact" className="btn btn-outline">Commission an Icon</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default History;
