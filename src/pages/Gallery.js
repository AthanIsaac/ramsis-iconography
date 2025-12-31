import React, { useEffect } from 'react';
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
                src={`${process.env.PUBLIC_URL}/uploads/icons/Christ.jpg`}
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
                src={`${process.env.PUBLIC_URL}/uploads/icons/Theotokos.jpg`}
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
                src={`${process.env.PUBLIC_URL}/uploads/icons/StAnthony.jpg`}
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
                src={`${process.env.PUBLIC_URL}/uploads/icons/StAnthonyWords.jpg`}
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
            <div className="process-item">
              <h3>Blessing & Consecration</h3>
              <p>Completed icons receive proper blessing, transforming them from artwork into sacred objects of veneration.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="categories-content">
          <div className="categories-header">
            <h2>Icon Categories</h2>
            <p>Diverse subjects for churches, homes, and personal devotion</p>
          </div>
          <div className="categories-grid">
            <div className="category-item">
              <h3>Christ Icons</h3>
              <p>Pantocrator, Savior, and various depictions of our Lord Jesus Christ following traditional iconographic types.</p>
            </div>
            <div className="category-item">
              <h3>Theotokos Icons</h3>
              <p>Mother of God in her many traditional forms - Hodegetria, Eleousa, Platytera, and other beloved types.</p>
            </div>
            <div className="category-item">
              <h3>Saints & Martyrs</h3>
              <p>Holy men and women, apostles, martyrs, and contemporary saints depicted in traditional iconographic style.</p>
            </div>
            <div className="category-item">
              <h3>Feast Day Icons</h3>
              <p>Major Christian feasts and celebrations - Nativity, Resurrection, Pentecost, and other liturgical scenes.</p>
            </div>
            <div className="category-item">
              <h3>Archangels & Angels</h3>
              <p>Heavenly messengers and warriors depicted in their traditional roles and appearances.</p>
            </div>
            <div className="category-item">
              <h3>Custom Commissions</h3>
              <p>Personalized icons for specific devotional needs, family patrons, or unique spiritual requirements.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="testimonials-content">
          <div className="testimonials-header">
            <h2>Client Testimonials</h2>
            <p>Words from those who have commissioned sacred art</p>
          </div>
          <div className="testimonials-grid">
            <div className="testimonial-item">
              <p>"George's icon of Christ has transformed our family's prayer life. The spiritual presence emanating from this sacred work is truly remarkable."</p>
              <div className="testimonial-author">
                <strong>— Father Michael, St. Mary Orthodox Church</strong>
              </div>
            </div>
            <div className="testimonial-item">
              <p>"The attention to theological detail and traditional technique is extraordinary. This is not just art—it's a window to heaven."</p>
              <div className="testimonial-author">
                <strong>— Maria K., Private Collector</strong>
              </div>
            </div>
            <div className="testimonial-item">
              <p>"Our church's iconostasis by George has become a focal point for worship and contemplation. The craftsmanship is unparalleled."</p>
              <div className="testimonial-author">
                <strong>— Archbishop John, Holy Trinity Cathedral</strong>
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
            <a href="/contact" className="btn btn-primary">Start Your Commission</a>
            <a href="/about" className="btn btn-outline">Learn About the Process</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;