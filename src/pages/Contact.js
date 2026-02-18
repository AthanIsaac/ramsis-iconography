import React, { useState, useEffect } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    size: '',
    message: ''
  });

  const sizeOptions = [
    { value: '8x10', label: '8" x 10"', price: 175 },
    { value: '11x14', label: '11" x 14"', price: 220 },
    { value: '12x16', label: '12" x 16"', price: 250 },
    { value: '16x20', label: '16" x 20"', price: 275 },
    { value: '18x24', label: '18" x 24"', price: 320 },
    { value: 'custom', label: 'Larger Size (Custom Quote)', price: null }
  ];

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // You would typically send this data to a server
  };

  return (
    <div className="contact">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Commission Sacred Art</h1>
          <p className="lead">Begin your journey toward owning a piece of sacred iconography</p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="contact-form-section">
        <div className="contact-form-content">
          <div className="form-intro">
            <h2>Start Your Commission</h2>
            <p>
              Every icon begins with a conversation. Share your vision, spiritual needs,
              and preferences, and I will guide you through the sacred process of creating
              your custom iconography.
            </p>
          </div>
          
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="projectType">Project Type *</label>
                <select
                  id="projectType"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a project type</option>
                  <option value="personal-icon">Personal Icon</option>
                  <option value="family-icon">Family Icon</option>
                  <option value="church-commission">Church Commission</option>
                  <option value="iconostasis">Iconostasis Project</option>
                  <option value="consultation">Consultation</option>
                </select>
              </div>
            </div>

            {/* Conditional Size Selection for Personal and Family Icons */}
            {(formData.projectType === 'personal-icon' || formData.projectType === 'family-icon') && (
              <div className="form-group size-selection">
                <label htmlFor="size">Icon Size *</label>
                <div className="size-options">
                  {sizeOptions.map((option) => (
                    <div key={option.value} className="size-option">
                      <input
                        type="radio"
                        id={`size-${option.value}`}
                        name="size"
                        value={option.value}
                        checked={formData.size === option.value}
                        onChange={handleChange}
                        required
                      />
                      <label htmlFor={`size-${option.value}`} className="size-option-label">
                        <span className="size-label">{option.label}</span>
                        <span className="size-price">
                          {option.price ? `$${option.price} + (Shipping etc)` : 'Cost will vary'}
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="message">Project Details *</label>
              <textarea
                id="message"
                name="message"
                rows="6"
                value={formData.message}
                onChange={handleChange}
                placeholder="Please describe your vision, preferred saints or subjects, size requirements, timeline, and any specific spiritual or aesthetic preferences..."
                required
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary">
              Send Commission Request
            </button>
          </form>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="contact-info-section">
        <div className="contact-info-content">
          <div className="contact-info-grid">
            <div className="contact-info-item">
              <h3>Contact Details</h3>
              <p>
                Email: ramsis.icons@gmail.com<br />
                Phone: (425) 345-6483<br />
                Available: By Appointment
              </p>
            </div>
            
            <div className="contact-info-item">
              <h3>Commission Timeline</h3>
              <p>
                Personal Icons: 4-8 weeks<br />
                Church Projects: 3-12 months<br />
                Iconostasis: 6-18 months
              </p>
            </div>

            <div className="contact-info-item">
              <h3>Follow Us</h3>
            <div className="social-links">
              <a href="https://instagram.com/ramsis_iconography" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://www.facebook.com/george.ramsis.56" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="mailto:ramsis.icons@gmail.com" aria-label="Email">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </a>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="faq-content">
          <div className="faq-header">
            <h2>Frequently Asked Questions</h2>
          </div>
          
          <div className="faq-grid">
            <div className="faq-item">
              <h3>What makes an icon authentic?</h3>
              <p>Authentic icons follow canonical guidelines, use traditional materials and techniques, and are created with proper spiritual preparation including prayer and fasting.</p>
            </div>
            
            <div className="faq-item">
              <h3>How long does a commission take?</h3>
              <p>Personal icons typically take 4-8 weeks, while larger church projects can take 3-12 months depending on complexity and size.</p>
            </div>
            
            <div className="faq-item">
              <h3>Can I request specific saints or subjects?</h3>
              <p>Absolutely. I can create icons of any canonically recognized saint or traditional iconographic subject following proper theological guidelines.</p>
            </div>
            
            <div className="faq-item">
              <h3>Do you offer payment plans?</h3>
              <p>Yes, I offer flexible payment plans for larger commissions. Typically 50% deposit to begin, with the remainder due upon completion.</p>
            </div>
            
            <div className="faq-item">
              <h3>What materials do you use?</h3>
              <p>I use traditional materials including natural pigments, egg tempera, gold leaf, and properly prepared wood panels following ancient techniques.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;