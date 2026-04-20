import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Gallery.css';

const Gallery = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.1;
      
      // Update CSS custom property for the background position
      document.documentElement.style.setProperty('--scroll-offset', `${rate}px`);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="gallery">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Sacred Art Gallery</h1>
          <p className="lead">A collection of icons created with devotion, tradition, and spiritual purpose</p>
        </div>
      </section>

      {/* Featured Works Section */}
      <section className="featured-section">
        <div className="featured-content">
          <div className="featured-header">
            <h2>Featured Works</h2>
            <p>Recent commissions and personal devotional pieces</p>
          </div>
          <div className="featured-grid">
            <div className="featured-item">
              <img
                src="/uploads/icons/Christ.jpg"
                alt="Christ Pantocrator Icon"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  border: '1px solid var(--border-subtle)',
                  transition: 'all 0.3s ease'
                }}
              />
              <div className="featured-info">
                <h3>Christ Pantocrator</h3>
                <p>Traditional egg tempera on wood with gold leaf accents. Created for private devotion.</p>
              </div>
            </div>
            <div className="featured-item">
              <img
                src="/uploads/icons/Theotokos.jpg"
                alt="Theotokos and Child Icon"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  border: '1px solid var(--border-subtle)',
                  transition: 'all 0.3s ease'
                }}
              />
              <div className="featured-info">
                <h3>Theotokos and Child</h3>
                <p>Mother of God icon using natural pigments and traditional Byzantine techniques.</p>
              </div>
            </div>
            <div className="featured-item">
              <img
                src="/uploads/icons/StAnthony.jpg"
                alt="Saint Anthony Icon"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  border: '1px solid var(--border-subtle)',
                  transition: 'all 0.3s ease'
                }}
              />
              <div className="featured-info">
                <h3>Saint Nicholas</h3>
                <p>Patron saint icon commissioned for church sanctuary decoration.</p>
              </div>
            </div>
            <div className="featured-item">
              <img
                src="/uploads/icons/StAnthonyWords.jpg"
                alt="Saint Anthony with Words Icon"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  border: '1px solid var(--border-subtle)',
                  transition: 'all 0.3s ease'
                }}
              />
              <div className="featured-info">
                <h3>Archangel Michael</h3>
                <p>Warrior archangel depicted in traditional iconographic style with rich gold details.</p>
              </div>
            </div>
            <div className="featured-item">
              <img
                src="/uploads/icons/simon.jpg"
                alt="Saint Simon Icon"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  border: '1px solid var(--border-subtle)',
                  transition: 'all 0.3s ease'
                }}
              />
              <div className="featured-info">
                <h3>St Simon</h3>
                <p>depicted in traditional iconographic style with rich gold details.</p>
              </div>
            </div>
            <div className="featured-item">
              <img
                src="/uploads/icons/crucifix.png"
                alt="Crucifix Icon"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  border: '1px solid var(--border-subtle)',
                  transition: 'all 0.3s ease'
                }}
              />
              <div className="featured-info">
                <h3>Crucifix</h3>
                <p>Sacred crucifix icon depicting Christ's sacrifice, created with traditional iconographic techniques.</p>
              </div>
            </div>
            <div className="featured-item landscape-item">
              <img
                src="/uploads/icons/severusdioskoros.png"
                alt="Severus Dioskoros Icon"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  border: '1px solid var(--border-subtle)',
                  transition: 'all 0.3s ease'
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="process-section">
        <div className="process-content">
          <div className="process-header">
            <h2>The Sacred Process</h2>
            <p>Each icon follows ancient traditions and spiritual practices</p>
          </div>
          <div className="process-grid">
            <div className="process-item">
              <h3>Prayer & Preparation</h3>
              <p>Every icon begins with prayer, fasting, and spiritual preparation to create a sacred space for the work.</p>
            </div>
            <div className="process-item">
              <h3>Traditional Materials</h3>
              <p>Using natural pigments, egg tempera, and gold leaf following centuries-old recipes and techniques.</p>
            </div>
            <div className="process-item">
              <h3>Canonical Guidelines</h3>
              <p>Strict adherence to theological and artistic traditions ensures spiritual authenticity in every piece.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="testimonials-content">
          <div className="testimonials-header">
            <h2>Testimonials</h2>
            <p>Words from those who have commissioned sacred art</p>
          </div>
          <div className="testimonials-grid">
            <div className="testimonial-item">
              <p>"I am a big fan of George's work! In the last few years his icons have become among some of the best in the world! He is creative and flexible and work with you to get the icon that you want that is both theologically sound and spiritually inspired."</p>
              <div className="testimonial-author">
                <strong>— Archdeacon Mark Solomon</strong>
              </div>
            </div>
                        <div className="testimonial-item">
              <p>"The icon was beautiful, and the process was seamless. George was professional, responsive, and thorough in explaining the iconography, with regular check-ins and timely delivery. I look forward to future commissions. God bless his work!"</p>
              <div className="testimonial-author">
                <strong>— Steven Loza, Washington</strong>
              </div>
            </div>
            <div className="testimonial-item">
              <p>"I've had the pleasure of working with George as colleagues for some years. We've painted various murals together all over the world. During this time I've had the honour of witnessing his incredible artistic and personal development that most artists can only dream of. Serving God in any manner is such a great privilege, and painting icons with George is one of life's quiet privileges that I cherish each time we do it. His work and its beautiful quality speaks for itself. Add this to his wonderful humility for this vocation and you've got a beautiful synergy of joy."</p>
              <div className="testimonial-author">
                <strong>— Fadi Mikhail | Master Iconographer | UK</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Commission CTA Section */}
      <section className="commission-cta-section">
        <div className="commission-cta-content">
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