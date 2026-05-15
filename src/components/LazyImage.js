import React, { useState } from 'react';

function deriveVariants(src) {
  if (!src) return {};
  const base = src.replace(/\.[^.]+$/, '');
  return {
    webp:    base + '.webp',
    webp800: base + '-800.webp',
    jpg800:  base + '-800.jpg',
  };
}

const LazyImage = ({
  src,
  alt,
  wrapperClassName = '',
  imgClassName = '',
  imgStyle,
  sizes = '(max-width: 768px) 100vw, 50vw',
  priority = false,
}) => {
  const [loaded, setLoaded] = useState(false);
  const { webp, webp800, jpg800 } = deriveVariants(src);

  return (
    <div className={`lazy-wrap${loaded ? ' lazy-loaded' : ''}${wrapperClassName ? ' ' + wrapperClassName : ''}`}>
      {!loaded && <div className="lazy-shimmer" aria-hidden="true" />}
      <picture>
        <source
          type="image/webp"
          srcSet={`${webp800} 800w, ${webp}`}
          sizes={sizes}
        />
        <source
          srcSet={`${jpg800} 800w, ${src}`}
          sizes={sizes}
        />
        <img
          src={src}
          alt={alt}
          className={imgClassName}
          style={imgStyle}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          onLoad={() => setLoaded(true)}
        />
      </picture>
    </div>
  );
};

export default LazyImage;
