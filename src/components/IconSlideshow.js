import React, { useState, useEffect, useRef } from 'react';
import './IconSlideshow.css';

const IconSlideshow = () => {
  const icons = [
    {
      src: '/uploads/icons/Theotokos.jpg',
      alt: 'Theotokos Icon'
    },
    {
      src: '/uploads/icons/Christ.jpg',
      alt: 'Christ Icon'
    },
    {
      src: '/uploads/icons/StAnthonyWords.jpg',
      alt: 'Saint Anthony with Words Icon'
    },
    {
      src: '/uploads/icons/StAnthony.jpg',
      alt: 'Saint Anthony Icon'
    },
    {
      src: '/uploads/icons/severus.png',
      alt: 'Severus Icon'
    },
    {
      src: '/uploads/icons/dioskoros.png',
      alt: 'Dioskoros Icon'
    },
    {
      src: '/uploads/icons/simon.jpg',
      alt: 'St Simon Icon'
    },
    {
      src: '/uploads/icons/crucifix.png',
      alt: 'Crucifix Icon'
    }
  ];

  // Create extended array with first slide duplicated at the end for infinite loop
  const extendedIcons = [...icons, icons[0]];
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef(null);
  const animationTimeoutRef = useRef(null);

  // Function to start/restart the timer
  const startTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setIsAnimating(true);
      setCurrentIndex((prevIndex) => prevIndex + 1);
      // Clear animation state after transition completes
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
      animationTimeoutRef.current = setTimeout(() => {
        setIsAnimating(false);
      }, 800); // Match CSS transition duration
    }, 4000); // Change slide every 4 seconds
  };

  useEffect(() => {
    startTimer();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, []);

  // Handle the infinite loop reset
  useEffect(() => {
    if (currentIndex === icons.length) {
      // We're at the duplicate first slide, reset to actual first slide
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(0);
        // Re-enable transition after reset
        setTimeout(() => {
          setIsTransitioning(true);
          setIsAnimating(false);
        }, 50);
      }, 800); // Wait for transition to complete
      
      return () => clearTimeout(timer);
    }
  }, [currentIndex, icons.length]);

  const goToSlide = (index) => {
    if (isAnimating) return; // Prevent interaction during animation
    
    setIsAnimating(true);
    setIsTransitioning(true);
    setCurrentIndex(index);
    startTimer(); // Reset timer when dot is clicked
    
    // Clear animation state after transition completes
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }
    animationTimeoutRef.current = setTimeout(() => {
      setIsAnimating(false);
    }, 800);
  };

  const goToPrevious = () => {
    if (isAnimating) return; // Prevent interaction during animation
    
    setIsAnimating(true);
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => {
      if (prevIndex === 0) {
        return icons.length - 1;
      }
      return prevIndex - 1;
    });
    startTimer(); // Reset timer when arrow is clicked
    
    // Clear animation state after transition completes
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }
    animationTimeoutRef.current = setTimeout(() => {
      setIsAnimating(false);
    }, 800);
  };

  const goToNext = () => {
    if (isAnimating) return; // Prevent interaction during animation
    
    setIsAnimating(true);
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => prevIndex + 1);
    startTimer(); // Reset timer when arrow is clicked
    
    // Clear animation state after transition completes
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }
    animationTimeoutRef.current = setTimeout(() => {
      setIsAnimating(false);
    }, 800);
  };

  return (
    <div className="icon-slideshow">
      <div className="slideshow-container">
        <div
          className={`slides-wrapper ${isTransitioning ? 'transitioning' : ''}`}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {extendedIcons.map((icon, index) => (
            <div key={index} className={`slide ${icon.isLandscape ? 'landscape-slide' : ''}`}>
              <img
                src={icon.src}
                alt={icon.alt}
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding="async"
                className={`slide-image ${icon.isLandscape ? 'landscape-image' : ''}`}
              />
            </div>
          ))}
        </div>
        
        {/* Navigation arrows */}
        <button
          className={`nav-arrow nav-arrow-left ${isAnimating ? 'disabled' : ''}`}
          onClick={goToPrevious}
          disabled={isAnimating}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <button
          className={`nav-arrow nav-arrow-right ${isAnimating ? 'disabled' : ''}`}
          onClick={goToNext}
          disabled={isAnimating}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
        
        {/* Dots indicator */}
        <div className="dots-container">
          {icons.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === (currentIndex % icons.length) ? 'active' : ''} ${isAnimating ? 'disabled' : ''}`}
              onClick={() => goToSlide(index)}
              disabled={isAnimating}
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