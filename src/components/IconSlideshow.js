import React, { useReducer, useState, useEffect, useRef, useCallback } from 'react';
import LazyImage from './LazyImage';
import './IconSlideshow.css';

const SWIPE_MIN_PX  = 50;
const SWIPE_MIN_VEL = 0.25; // px/ms

// ── Reducer ───────────────────────────────────────────────────────────────
// index   — current slide index (may equal icons.length for the cloned first)
// locked  — navigation blocked while transition is in flight
// css     — whether the transitioning class is applied (false during snap-back)
const init = { index: 0, locked: false, css: true };

function reducer(state, { type, total, target }) {
  switch (type) {
    case 'NAV':
      if (state.locked) return state;
      return { ...state, index: target, locked: true, css: true };
    case 'TRANSITION_END':
      if (state.index === total)
        return { index: 0, locked: false, css: false }; // snap to real first
      return { ...state, locked: false };
    case 'REENABLE_CSS':
      return { ...state, css: true };
    default:
      return state;
  }
}

// ── Component ─────────────────────────────────────────────────────────────
const IconSlideshow = () => {
  const [icons, setIcons] = useState([]);

  useEffect(() => {
    fetch('/data/slideshow.json')
      .then(r => r.json())
      .then(data => setIcons(data.images));
  }, []);

  const extendedIcons = icons.length > 0 ? [...icons, icons[0]] : [];

  const [{ index, locked, css }, dispatch] = useReducer(reducer, init);

  // Refs that give touch handlers (registered once) fresh values without
  // stale closures — updated synchronously after every render.
  const indexRef       = useRef(0);
  const lockedRef      = useRef(false);
  const iconsLengthRef = useRef(0);
  indexRef.current       = index;
  lockedRef.current      = locked;
  iconsLengthRef.current = icons.length;

  const intervalRef      = useRef(null);
  const slidesWrapperRef = useRef(null);
  const containerRef     = useRef(null);

  // ── Timer ─────────────────────────────────────────────────────────────
  const startTimer = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      dispatch({ type: 'NAV', target: indexRef.current + 1 });
    }, 4000);
  }, []); // stable — reads indexRef at call time, dispatch is stable

  useEffect(() => {
    if (icons.length === 0) return;
    startTimer();
    return () => clearInterval(intervalRef.current);
  }, [icons.length, startTimer]);

  // ── Infinite-loop snap-back ───────────────────────────────────────────
  // After the transition to the cloned first slide ends, the reducer sets
  // css:false (removes transition) and jumps index to 0.  One rAF later we
  // re-enable the transition so subsequent slides animate normally.
  useEffect(() => {
    if (css) return;
    const id = requestAnimationFrame(() => dispatch({ type: 'REENABLE_CSS' }));
    return () => cancelAnimationFrame(id);
  }, [css]);

  // ── onTransitionEnd ───────────────────────────────────────────────────
  // Filter to only the transform transition on the wrapper itself; the lazy-
  // loaded <img> opacity transitions bubble up and would falsely unlock.
  const handleTransitionEnd = useCallback((e) => {
    if (e.target !== e.currentTarget || e.propertyName !== 'transform') return;
    dispatch({ type: 'TRANSITION_END', total: iconsLengthRef.current });
  }, []);

  // ── Navigation helpers ────────────────────────────────────────────────
  const nav = useCallback((target) => {
    dispatch({ type: 'NAV', target });
    startTimer();
  }, [startTimer]);

  const goToNext = useCallback(() => nav(indexRef.current + 1), [nav]);
  const goToPrev = useCallback(() => {
    const i = indexRef.current;
    nav(i === 0 ? iconsLengthRef.current - 1 : i - 1);
  }, [nav]);
  const goToSlide = useCallback((i) => nav(i), [nav]);

  // ── Swipe ─────────────────────────────────────────────────────────────
  const touchStart = useRef({ x: 0, y: 0, time: 0 });
  const touchDir   = useRef(null); // 'h' | 'v' | null

  // touchMoveHandlerRef: the addEventListener wrapper is registered once so
  // it stays non-passive; the actual logic lives in .current which is always
  // rewritten each render, giving it fresh values via the refs above.
  const touchMoveHandlerRef = useRef(null);
  touchMoveHandlerRef.current = (e) => {
    if (lockedRef.current) return;

    const dx = e.touches[0].clientX - touchStart.current.x;
    const dy = e.touches[0].clientY - touchStart.current.y;

    if (touchDir.current === null) {
      if (Math.abs(dx) < 5 && Math.abs(dy) < 5) return;
      touchDir.current = Math.abs(dx) >= Math.abs(dy) ? 'h' : 'v';
    }

    if (touchDir.current !== 'h') return;

    e.preventDefault(); // block page scroll only for horizontal drags
    if (slidesWrapperRef.current) {
      slidesWrapperRef.current.style.transition = 'none';
      slidesWrapperRef.current.style.transform  =
        `translateX(calc(-${indexRef.current * 100}% + ${dx}px))`;
    }
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handler = (e) => touchMoveHandlerRef.current(e);
    el.addEventListener('touchmove', handler, { passive: false });
    return () => el.removeEventListener('touchmove', handler);
  }, []);

  const handleTouchStart = (e) => {
    if (lockedRef.current) return;
    // Pause auto-advance while the finger is down so the timer never fires
    // mid-drag and jumps the slide under the user's hand.
    clearInterval(intervalRef.current);
    touchStart.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
      time: performance.now(),
    };
    touchDir.current = null;
  };

  const handleTouchEnd = (e) => {
    // Always restore the timer, whether or not a swipe happened.
    // goToNext/goToPrev call startTimer internally; call it here for the
    // non-swipe (tap-hold-release) case so the timer never stays dead.
    const wasDragging = touchDir.current === 'h';
    touchDir.current = null;

    // Re-enable the CSS transition and pin the wrapper to the current slide
    // position explicitly. Clearing transform to '' would make the computed
    // value fall to `none` (position 0) for one frame because the CSS class
    // has no base transform rule — causing a visible flash of the first slide
    // before React re-renders with the correct value.
    if (slidesWrapperRef.current) {
      slidesWrapperRef.current.style.transition = '';
      slidesWrapperRef.current.style.transform  =
        `translateX(-${indexRef.current * 100}%)`;
    }

    if (!wasDragging || lockedRef.current) {
      startTimer();
      return;
    }

    const dx = e.changedTouches[0].clientX - touchStart.current.x;
    const dt = performance.now() - touchStart.current.time;

    if (Math.abs(dx) <= SWIPE_MIN_PX && Math.abs(dx) / dt <= SWIPE_MIN_VEL) {
      startTimer(); // short tap-drag — snap back, keep timer alive
      return;
    }

    if (dx < 0) {
      goToNext();
    } else {
      goToPrev();
    }
  };

  // ── Render ────────────────────────────────────────────────────────────
  return (
    <div className="icon-slideshow">
      <div
        className="slideshow-container"
        ref={containerRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          ref={slidesWrapperRef}
          className={`slides-wrapper${css ? ' transitioning' : ''}`}
          style={{ transform: `translateX(-${index * 100}%)` }}
          onTransitionEnd={handleTransitionEnd}
        >
          {extendedIcons.map((icon, i) => (
            <div key={i} className={`slide${icon.isLandscape ? ' landscape-slide' : ''}`}>
              <LazyImage
                src={icon.src}
                alt={icon.alt}
                priority={i === 0}
                imgClassName={`slide-image${icon.isLandscape ? ' landscape-image' : ''}`}
                sizes="100vw"
              />
            </div>
          ))}
        </div>

        <button
          className={`nav-arrow nav-arrow-left${locked ? ' disabled' : ''}`}
          onClick={goToPrev}
          disabled={locked}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <button
          className={`nav-arrow nav-arrow-right${locked ? ' disabled' : ''}`}
          onClick={goToNext}
          disabled={locked}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>

        <div className="dots-container">
          {icons.map((_, i) => (
            <button
              key={i}
              className={`dot${i === index % icons.length ? ' active' : ''}${locked ? ' disabled' : ''}`}
              onClick={() => goToSlide(i)}
              disabled={locked}
            />
          ))}
        </div>
      </div>

      <div className="scroll-indicator">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </div>
    </div>
  );
};

export default IconSlideshow;
