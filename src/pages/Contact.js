import React, { useState, useEffect } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: ''
  });

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
              <h3>Studio Location</h3>
              <p>
                123 Sacred Arts Lane<br />
                Iconography District<br />
                Sacred City, SC 12345
              </p>
            </div>
            
            <div className="contact-info-item">
              <h3>Contact Details</h3>
              <p>
                Email: info@ramsisiconography.com<br />
                Phone: (555) 123-4567<br />
                Studio Hours: By Appointment
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
              <h3>Investment Range</h3>
              <p>
                Personal Icons: $800 - $3,000<br />
                Church Commissions: $5,000+<br />
                Consultation: $150/hour
              </p>
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
            
            <div className="faq-item">
              <h3>Can icons be blessed after completion?</h3>
              <p>Yes, all completed icons can receive proper blessing from Orthodox or Catholic clergy, transforming them into sacred objects for veneration.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;