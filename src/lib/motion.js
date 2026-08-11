import { useReducedMotion } from 'framer-motion';

/**
 * One motion vocabulary for the whole site.
 *
 * Rules this encodes:
 *  - only transform and opacity animate, so nothing triggers layout
 *  - one easing curve and a small set of durations, so timing feels related
 *  - every export degrades to "no movement" when the visitor has asked for
 *    reduced motion (Settings › Accessibility › Reduce motion)
 */

/** Soft deceleration — quick to start, long tail. Reads as calm, not springy. */
export const EASE = [0.22, 1, 0.36, 1];
export const EASE_IN_OUT = [0.65, 0, 0.35, 1];

export const DURATION = {
  fast: 0.2,
  base: 0.45,
  slow: 0.7,
  reveal: 0.8,
};

/** Scroll-reveal viewport config: fire once, slightly before fully in view. */
export const VIEWPORT = { once: true, margin: '-80px' };

/* ─────────────────────────── Entrance variants ────────────────────────── */

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: DURATION.reveal, ease: EASE } },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: DURATION.slow, ease: EASE } },
};

export const fadeLeft = {
  hidden: { opacity: 0, x: -28 },
  visible: { opacity: 1, x: 0, transition: { duration: DURATION.reveal, ease: EASE } },
};

export const fadeRight = {
  hidden: { opacity: 0, x: 28 },
  visible: { opacity: 1, x: 0, transition: { duration: DURATION.reveal, ease: EASE } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: { duration: DURATION.slow, ease: EASE } },
};

/** Parent that releases children one after another. */
export const stagger = (gap = 0.08, delay = 0) => ({
  hidden: {},
  visible: { transition: { staggerChildren: gap, delayChildren: delay } },
});

/* ──────────────────────────── Interaction presets ─────────────────────── */

/** Cards: lift with a warm shadow. */
export const liftCard = {
  y: -10,
  boxShadow: '0 28px 55px rgba(176, 27, 94, 0.16)',
  transition: { duration: DURATION.fast, ease: EASE },
};

/** Smaller surfaces — list rows, tiles. */
export const liftSoft = {
  y: -5,
  boxShadow: '0 18px 36px rgba(176, 27, 94, 0.12)',
  transition: { duration: DURATION.fast, ease: EASE },
};

export const pressable = { scale: 0.96, transition: { duration: 0.12 } };
export const growSlight = { scale: 1.04, transition: { duration: DURATION.fast, ease: EASE } };

/* ─────────────────────────────── The hook ─────────────────────────────── */

const STILL = { hidden: {}, visible: {} };

/**
 * Returns the motion vocabulary, neutralised when reduced motion is requested.
 * Components can then use the same props unconditionally.
 */
export const useMotion = () => {
  const reduced = useReducedMotion();

  if (reduced) {
    const none = {};
    return {
      reduced: true,
      fadeUp: STILL,
      fadeIn: STILL,
      fadeLeft: STILL,
      fadeRight: STILL,
      scaleIn: STILL,
      stagger: () => STILL,
      liftCard: none,
      liftSoft: none,
      pressable: none,
      growSlight: none,
      viewport: VIEWPORT,
      // Convenience spread for "reveal on scroll" elements.
      reveal: {},
      transition: { duration: 0 },
    };
  }

  return {
    reduced: false,
    fadeUp,
    fadeIn,
    fadeLeft,
    fadeRight,
    scaleIn,
    stagger,
    liftCard,
    liftSoft,
    pressable,
    growSlight,
    viewport: VIEWPORT,
    reveal: {
      variants: fadeUp,
      initial: 'hidden',
      whileInView: 'visible',
      viewport: VIEWPORT,
    },
    transition: { duration: DURATION.base, ease: EASE },
  };
};

export default useMotion;
