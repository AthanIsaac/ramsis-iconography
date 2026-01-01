import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './About.css';

const About = () => {
  // Project data with all web-compatible images
  const projectsData = {
    athanasiusFlorida: {
      name: "St. Athanasius Church - Florida",
      images: [
        "38BBED8E-36B7-42FB-9F75-2D1BE18BA0A7.JPG",
        "ECFED977-68A5-478E-A5FB-57632760556B.JPG",
        "IMG_1184.JPG",
        "IMG_1185.JPG",
        "IMG_1186.JPG",
        "IMG_1187.JPG",
        "IMG_1188.JPG",
        "IMG_9699.JPG",
        "IMG_9715.JPG",
        "IMG_9716.JPG",
        "IMG_9776.JPG",
        "IMG_9786.JPG",
        "IMG_9817.JPG"
      ]
    },
    crossDallas: {
      name: "Holy Cross Church - Dallas",
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
      name: "St. Mary Church - Clearwater",
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
      name: "St. Paul Church - California",
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

  // State for pagination
  const [currentPages, setCurrentPages] = useState({
    athanasiusFlorida: 0,
    crossDallas: 0,
    maryClearwater: 0,
    paulCali: 0
  });

  const imagesPerPage = 4;

  // Function to get current page images
  const getCurrentPageImages = (projectKey) => {
    const project = projectsData[projectKey];
    const startIndex = currentPages[projectKey] * imagesPerPage;
    return project.images.slice(startIndex, startIndex + imagesPerPage);
  };

  // Function to get total pages for a project
  const getTotalPages = (projectKey) => {
    return Math.ceil(projectsData[projectKey].images.length / imagesPerPage);
  };

  // Function to handle page change
  const handlePageChange = (projectKey, newPage) => {
    setCurrentPages(prev => ({
      ...prev,
      [projectKey]: newPage
    }));
  };

  // Pagination component
  const ProjectPagination = ({ projectKey }) => {
    const totalPages = getTotalPages(projectKey);
    const currentPage = currentPages[projectKey];
    
    if (totalPages <= 1) return null;

    return (
      <div className="project-pagination">
        <button 
          onClick={() => handlePageChange(projectKey, Math.max(0, currentPage - 1))}
          disabled={currentPage === 0}
          className="pagination-btn"
        >
          ‹ Previous
        </button>
        <span className="pagination-info">
          Page {currentPage + 1} of {totalPages}
        </span>
        <button 
          onClick={() => handlePageChange(projectKey, Math.min(totalPages - 1, currentPage + 1))}
          disabled={currentPage === totalPages - 1}
          className="pagination-btn"
        >
          Next ›
        </button>
      </div>
    );
  };

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
    <div className="about">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>About George Ramsis</h1>
          <p className="lead">Iconographer dedicated to preserving sacred traditions through contemporary artistry</p>
        </div>
      </section>

      {/* Biography Section */}
      <section className="biography-section">
        <div className="biography-content">
          <div className="biography-text">
            <h2>A Life Devoted to Sacred Art</h2>
            <p>
              George Ramsis has dedicated over a decade to the ancient and sacred art of iconography. 
              His journey began with a profound spiritual calling that led him to study under master iconographers in Egypt and London, 
              where he learned the traditional techniques passed down through centuries.
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
              src="/ramsis-iconography/uploads/icons/iconographer.jpg"
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
              <p>Studied under master iconographers in Egypt, London, learning ancient egg tempera methods and gold leaf application techniques.</p>
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
              <p>Traditional gold leaf techniques, creating luminous halos and sacred details that reflect divine light.</p>
            </div>
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
              <p>George has contributed to 5-6 churches across North America, working on iconostasis and sanctuary decorations.</p>
            </div>
            <div className="recognition-item">
              <h3>Icon Portfolio</h3>
              <p>Over 20 individual icons have been created for private collections, churches, and prayer spaces.</p>
            </div>
            <div className="recognition-item">
              <h3>Teaching & Workshops</h3>
              <p>Regular workshops and classes help preserve traditional iconographic techniques for future generations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Under Fadi Mikhail Section */}
      <section className="projects-section">
        <div className="projects-content">
          <div className="projects-header">
            <h2>Projects Under Fadi Mikhail</h2>
            <p>George Ramsis had the privilege of working under the renowned iconographer Fadi Mikhail, contributing to several significant church projects across North America. Fadi Mikhail, born in 1984, is an Egyptian-English painter and graduate from the world-renowned Slade School of Fine Art, University College London (UCL).</p>
          </div>
          <div className="projects-grid">
            {Object.keys(projectsData).map((projectKey) => (
              <div key={projectKey} className="project-item">
                <h3>{projectsData[projectKey].name}</h3>
                <div className="project-images">
                  {getCurrentPageImages(projectKey).map((image, index) => (
                    <img
                      key={index}
                      src={`/ramsis-iconography/uploads/projects/${projectKey}/${image}`}
                      alt={`${projectsData[projectKey].name} - ${index + 1}`}
                    />
                  ))}
                </div>
                <ProjectPagination projectKey={projectKey} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="contact-cta-section">
        <div className="contact-cta-content">
          <h2>Commission Your Sacred Art</h2>
          <p>Ready to discuss your vision for a custom icon or learn more about the iconographic process?</p>
          <Link to="/contact" className="btn btn-primary">Get In Touch</Link>
        </div>
      </section>
    </div>
  );
};

export default About;