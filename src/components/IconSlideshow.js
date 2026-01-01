import React, { useState, useEffect } from 'react';
import './IconSlideshow.css';

const IconSlideshow = () => {
  const icons = [
    {
      src: '/ramsis-iconography/uploads/icons/Christ.jpg',
      alt: 'Christ Icon'
    },
    {
      src: '/ramsis-iconography/uploads/icons/Theotokos.jpg',
      alt: 'Theotokos Icon'
    },
    {
      src: '/ramsis-iconography/uploads/icons/StAnthony.jpg',
      alt: 'Saint Anthony Icon'
    },
    {
      src: '/ramsis-iconography/uploads/icons/simon.png',
      alt: 'St Simon Icon'
    },
    {
      src: '/ramsis-iconography/uploads/icons/StAnthonyWords.jpg',
      alt: 'Saint Anthony with Words Icon'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % icons.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [icons.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? icons.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % icons.length);
  };

  return (
    <div className="icon-slideshow">
      <div className="slideshow-container">
        <div 
          className="slides-wrapper"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {icons.map((icon, index) => (
            <div key={index} className="slide">
              <img
                src={icon.src}
                alt={icon.alt}
                className="slide-image"
              />
            </div>
          ))}
        </div>
        
        {/* Navigation arrows */}
        <button className="nav-arrow nav-arrow-left" onClick={goToPrevious}>
          &#8249;
        </button>
        <button className="nav-arrow nav-arrow-right" onClick={goToNext}>
          &#8250;
        </button>
        
        {/* Dots indicator */}
        <div className="dots-container">
          {icons.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="scroll-indicator">
        <div className="scroll-arrow">
          <span>&#8595;</span>
        </div>
        <div className="scroll-text">Scroll to explore</div>
      </div>
    </div>
  );
};

export default IconSlideshow;