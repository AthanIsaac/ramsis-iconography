import { useEffect } from 'react';

export const useScrollEffect = (callback) => {
  useEffect(() => {
    const handleScroll = () => callback();
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [callback]);
};