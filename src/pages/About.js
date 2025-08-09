import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>About George Ramsis</h1>
          <p className="lead">Master iconographer dedicated to preserving sacred traditions through contemporary artistry</p>
        </div>
      </section>

      {/* Biography Section */}
      <section className="biography-section">
        <div className="biography-content">
          <div className="biography-text">
            <h2>A Life Devoted to Sacred Art</h2>
            <p>
              George Ramsis has dedicated over two decades to the ancient and sacred art of iconography.
              His journey began with a profound spiritual calling that led him to study under master iconographers
              in Greece and Russia, where he learned the traditional techniques passed down through centuries.
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
              src="/uploads/icons/iconographer.jpg"
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
      <section className="training-section">
        <div className="training-content">
          <div className="training-header">
            <h2>Training & Expertise</h2>
            <p>A foundation built on traditional methods and spiritual understanding</p>
          </div>
          <div className="training-grid">
            <div className="training-item">
              <h3>Traditional Techniques</h3>
              <p>Studied under master iconographers in Mount Athos, Greece, learning ancient egg tempera methods and gold leaf application techniques.</p>
            </div>
            <div className="training-item">
              <h3>Theological Studies</h3>
              <p>Completed extensive theological education to understand the spiritual and canonical requirements of sacred iconography.</p>
            </div>
            <div className="training-item">
              <h3>Natural Pigments</h3>
              <p>Expert in creating and using traditional natural pigments, ensuring authenticity and longevity in every piece.</p>
            </div>
            <div className="training-item">
              <h3>Gold Leaf Application</h3>
              <p>Master of traditional gold leaf techniques, creating luminous halos and sacred details that reflect divine light.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="philosophy-section">
        <div className="philosophy-content">
          <h2>Artistic Philosophy</h2>
          <div className="philosophy-text">
            <p>
              "An icon is not merely a painting—it is a window to the divine, a sacred space where heaven
              and earth meet. My role as an iconographer is to serve as a humble instrument, allowing the
              Holy Spirit to work through my hands to create images that inspire prayer and contemplation."
            </p>
            <p>
              "Every brushstroke is a prayer, every color choice a meditation on the divine mysteries.
              I believe that true iconography requires not just technical skill, but spiritual preparation,
              fasting, and prayer throughout the creative process."
            </p>
            <p>
              "In our modern world, we need these ancient windows to the sacred more than ever. My mission
              is to create icons that help people connect with the divine, whether in grand cathedrals or
              intimate home prayer corners."
            </p>
          </div>
        </div>
      </section>

      {/* Recognition Section */}
      <section className="recognition-section">
        <div className="recognition-content">
          <div className="recognition-header">
            <h2>Recognition & Commissions</h2>
          </div>
          <div className="recognition-grid">
            <div className="recognition-item">
              <h3>Church Commissions</h3>
              <p>Over 50 churches across North America have commissioned iconostasis and sanctuary decorations.</p>
            </div>
            <div className="recognition-item">
              <h3>Private Collections</h3>
              <p>Hundreds of families treasure personal icons created for their homes and prayer spaces.</p>
            </div>
            <div className="recognition-item">
              <h3>Teaching & Workshops</h3>
              <p>Regular workshops and classes help preserve traditional iconographic techniques for future generations.</p>
            </div>
            <div className="recognition-item">
              <h3>Publications</h3>
              <p>Featured in Orthodox arts publications and spiritual magazines for contributions to sacred art.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="contact-cta-section">
        <div className="contact-cta-content">
          <h2>Commission Your Sacred Art</h2>
          <p>Ready to discuss your vision for a custom icon or learn more about the iconographic process?</p>
          <a href="/contact" className="btn btn-primary">Get In Touch</a>
        </div>
      </section>
    </div>
  );
};

export default About;