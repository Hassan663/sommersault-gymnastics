import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

/**
 * Counts a number up when it scrolls into view.
 *
 * Values arrive as display strings ("Over 250", "83%", "SafeSport"), so the
 * numeric run is isolated and animated while the surrounding text is left
 * alone. Strings with no digits render unchanged.
 */
const CountUp = ({ value, duration = 1400, className = '' }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const reduced = useReducedMotion();

  const raw = String(value ?? '');

  // Memoised: String.match returns a new array each call, and anything
  // unstable here would restart the animation on every render.
  const { token, target, decimals } = useMemo(() => {
    const m = raw.match(/-?[\d,]*\.?\d+/);
    if (!m) return { token: null, target: null, decimals: 0 };
    return {
      token: m[0],
      target: Number(m[0].replace(/,/g, '')),
      decimals: (m[0].split('.')[1] || '').length,
    };
  }, [raw]);

  const animatable = token !== null && Number.isFinite(target) && !reduced;
  const [display, setDisplay] = useState(() =>
    animatable ? raw.replace(token, '0') : raw
  );

  useEffect(() => {
    if (!animatable) {
      setDisplay(raw);
      return undefined;
    }
    if (!inView) return undefined;

    let frame;
    const start = performance.now();
    const ease = (t) => 1 - Math.pow(1 - t, 3); // ease-out cubic

    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const current = target * ease(t);
      const shown = decimals
        ? current.toFixed(decimals)
        : Math.round(current).toLocaleString();
      setDisplay(raw.replace(token, shown));
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, animatable, raw, token, target, decimals, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
};

export default CountUp;
