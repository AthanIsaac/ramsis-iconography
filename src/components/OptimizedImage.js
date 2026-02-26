import React, { useState, useRef, useEffect } from 'react';

const OptimizedImage = ({ 
  src, 
  alt, 
  className, 
  style, 
  size = 'medium', // 'thumbnail', 'medium', 'large'
  loading = 'lazy',
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef();

  // Generate optimized image paths
  const getOptimizedPaths = (originalSrc) => {
    if (!originalSrc) return { webp: '', jpeg: '' };
    
    // Extract path components
    const pathParts = originalSrc.split('/');
    const fileName = pathParts[pathParts.length - 1];
    const fileNameWithoutExt = fileName.split('.')[0];
    
    // Determine if it's an icon or project image
    const isIcon = originalSrc.includes('/icons/');
    const isProject = originalSrc.includes('/projects/');
    
    if (isIcon) {
      const basePath = '/ramsis-iconography/uploads/optimized/icons';
      const sizeMap = {
        thumbnail: '-thumb',
        medium: '-med',
        large: '-large'
      };
      const suffix = sizeMap[size] || '-med';
      
      return {
        webp: `${basePath}/${fileNameWithoutExt}${suffix}.webp`,
        jpeg: `${basePath}/${fileNameWithoutExt}${suffix}.jpg`
      };
    } else if (isProject) {
      // Extract project folder name
      const projectMatch = originalSrc.match(/\/projects\/([^/]+)\//);
      const projectFolder = projectMatch ? projectMatch[1] : '';
      
      const basePath = `/ramsis-iconography/uploads/optimized/projects/${projectFolder}`;
      const sizeMap = {
        thumbnail: '-thumb',
        medium: '-med',
        large: '-large'
      };
      const suffix = sizeMap[size] || '-med';
      
      return {
        webp: `${basePath}/${fileNameWithoutExt}${suffix}.webp`,
        jpeg: `${basePath}/${fileNameWithoutExt}${suffix}.jpg`
      };
    }
    
    // Fallback to original
    return { webp: originalSrc, jpeg: originalSrc };
  };

  const { webp, jpeg } = getOptimizedPaths(src);

  useEffect(() => {
    if (loading === 'lazy') {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        },
        {
          threshold: 0.1,
          rootMargin: '50px'
        }
      );

      if (imgRef.current) {
        observer.observe(imgRef.current);
      }

      return () => observer.disconnect();
    } else {
      setIsInView(true);
    }
  }, [loading]);

  const handleLoad = () => {
    setIsLoaded(true);
    setHasError(false);
  };

  const handleError = () => {
    setHasError(true);
  };

  // Determine which image to show
  const shouldShowImage = loading === 'eager' || isInView;

  return (
    <div 
      ref={imgRef}
      className={className}
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: isLoaded ? 'transparent' : '#f8f9fa',
        transition: 'background-color 0.3s ease',
        position: 'relative',
        overflow: 'hidden',
        ...style
      }}
      {...props}
    >
      {shouldShowImage && (
        <picture style={{ width: '100%', height: '100%' }}>
          {/* WebP source for modern browsers */}
          <source srcSet={webp} type="image/webp" />
          
          {/* JPEG fallback for older browsers */}
          <img
            src={hasError ? src : jpeg} // Fallback to original if optimized fails
            alt={alt}
            onLoad={handleLoad}
            onError={handleError}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: isLoaded ? 1 : 0,
              transition: 'opacity 0.3s ease',
              border: '1px solid var(--border-subtle)'
            }}
          />
        </picture>
      )}
      
      {/* Loading indicator */}
      {!isLoaded && shouldShowImage && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: '#6c757d',
          fontSize: '14px',
          textAlign: 'center'
        }}>
          <div style={{
            width: '20px',
            height: '20px',
            border: '2px solid #f3f3f3',
            borderTop: '2px solid #d4af37',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 8px'
          }}></div>
          Loading...
        </div>
      )}
      
      {/* Error fallback */}
      {hasError && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: '#6c757d',
          fontSize: '12px',
          textAlign: 'center'
        }}>
          Image unavailable
        </div>
      )}
      
      {/* CSS for loading spinner */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default OptimizedImage;