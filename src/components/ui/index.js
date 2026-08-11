import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Figure } from './Figures';
import { useMotion } from '../../lib/motion';
import CountUp from './CountUp';

/**
 * Design primitives taken from the reference layout:
 *  - headings pair a light line with an extrabold line
 *  - the primary CTA is a magenta circle, not a pill
 *  - photo cards sit in front of an offset solid-magenta square
 *  - stat/benefit chips use the warm peach gradient
 */

/** Two-line heading: light top line, extrabold bottom line. */
export const SectionHeading = ({ light, bold, align = 'left', className = '' }) => (
  <h2
    className={`leading-[1.1] text-3xl sm:text-4xl lg:text-5xl ${
      align === 'center' ? 'text-center' : ''
    } ${className}`}
  >
    <span className="block font-light text-ink">{light}</span>
    <span className="block font-extrabold text-ink">{bold}</span>
  </h2>
);

/** Small eyebrow label, uppercase and letter-spaced. */
export const Eyebrow = ({ children, className = '' }) => (
  <p className={`text-xs uppercase tracking-[0.2em] text-magenta font-semibold ${className}`}>
    {children}
  </p>
);

/** The signature round magenta CTA. Renders as a Link when `to` is given. */
export const CircleButton = ({ to, href, children, size = 'md', className = '', ...rest }) => {
  const m = useMotion();
  const dims = {
    sm: 'w-24 h-24 text-[10px]',
    md: 'w-32 h-32 text-[11px]',
    lg: 'w-40 h-40 text-xs',
  }[size];

  const inner = (
    <motion.span
      whileHover={m.reduced ? undefined : { scale: 1.07, boxShadow: '0 26px 50px rgba(176,27,94,0.35)' }}
      whileTap={m.pressable}
      transition={m.transition}
      className={`${dims} shine shrink-0 rounded-full bg-magenta text-white font-bold uppercase tracking-wider leading-[1.5] flex flex-col items-center justify-center text-center px-5 transition-colors hover:bg-magenta-dark shadow-card ${className}`}
    >
      {children}
    </motion.span>
  );

  if (to) return <Link to={to} className="inline-block">{inner}</Link>;
  if (href) return <a href={href} className="inline-block">{inner}</a>;
  return (
    <button type="button" className="inline-block" {...rest}>
      {inner}
    </button>
  );
};

/** Standard pill button — used for secondary actions and inside forms. */
export const PillButton = ({
  to,
  children,
  variant = 'magenta',
  className = '',
  ...rest
}) => {
  const m = useMotion();
  const styles = {
    magenta: 'bg-magenta text-white hover:bg-magenta-dark',
    white: 'bg-white text-magenta hover:bg-cream',
    outline: 'bg-transparent text-ink border-2 border-ink hover:bg-ink hover:text-white',
  }[variant];

  const inner = (
    <motion.span
      whileHover={m.growSlight}
      whileTap={m.pressable}
      className={`group shine inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm transition-colors ${styles} ${className}`}
    >
      {children}
    </motion.span>
  );

  if (to) return <Link to={to} className="inline-block">{inner}</Link>;
  return (
    <button type="button" className="inline-block" {...rest}>
      {inner}
    </button>
  );
};

/**
 * Photo card with the reference's offset magenta square behind it.
 * `offset` picks which corner the magenta shape peeks from.
 */
export const PhotoCard = ({
  src,
  alt,
  objectPosition = 'center',
  figure = 'handstand',
  caption,
  note = 'Replace with real photo',
  tone = 'warm',
  offset = 'br',
  rotate = 0,
  className = '',
  heightClass = 'h-72',
}) => {
  const m = useMotion();
  const offsets = {
    br: 'translate-x-5 translate-y-5',
    bl: '-translate-x-5 translate-y-5',
    tr: 'translate-x-5 -translate-y-5',
    tl: '-translate-x-5 -translate-y-5',
  }[offset];

  return (
    <motion.div
      initial={m.reduced ? undefined : { opacity: 0, y: 26 }}
      whileInView={m.reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={m.viewport}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      whileHover={m.reduced ? undefined : { y: -10, rotate: 0 }}
      style={{ rotate: `${rotate}deg` }}
      className={`group relative ${className}`}
    >
      {/* Solid magenta shape behind the photo */}
      <div
        aria-hidden="true"
        className={`offset-shape absolute inset-0 rounded-4xl bg-magenta ${offsets}`}
      />
      <div
        className={`media-zoom relative ${heightClass} rounded-4xl overflow-hidden ${
          src ? '' : 'flex flex-col items-center justify-center text-center px-6'
        } ${tone === 'cool' ? 'bg-photo-cool' : 'bg-photo-warm'}`}
      >
        {src ? (
          <>
            <img
              src={src}
              alt={alt || caption || ''}
              loading="lazy"
              className="w-full h-full object-cover"
              style={{ objectPosition }}
            />
            {caption && (
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-5 pt-12 pb-4">
                <p className="font-bold text-white text-sm transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1">
                  {caption}
                </p>
              </div>
            )}
          </>
        ) : (
          <>
            <Figure name={figure} className="w-28 h-28 text-ink/70 mb-2" strokeWidth={4} />
            {caption && <p className="font-bold text-ink text-sm">{caption}</p>}
            <p className="text-[11px] text-ink/60 mt-1">{note}</p>
          </>
        )}
      </div>
    </motion.div>
  );
};

/** Peach gradient stat tile — the "37 / 1 / 3 / 2" row in the reference. */
export const StatCard = ({ value, label, delay = 0 }) => {
  const m = useMotion();
  return (
  <motion.div
    initial={{ opacity: 0, y: 22 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    whileHover={m.liftSoft}
    className="bg-card-warm rounded-4xl px-6 py-8 text-center shadow-soft"
  >
    <p className="text-3xl sm:text-4xl font-extrabold text-ink mb-1">
      <CountUp value={value} />
    </p>
    <p className="text-xs sm:text-sm text-ink/70 leading-snug">{label}</p>
  </motion.div>
  );
};

/** Circle-bulleted benefit row, as in "Кроме тренировок ваш ребёнок получит". */
export const BenefitRow = ({ title, desc, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    className="group flex gap-5"
  >
    <span
      aria-hidden="true"
      className="mt-1 w-11 h-11 shrink-0 rounded-full bg-card-warm shadow-soft transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
    />
    <div>
      <h3 className="text-lg font-bold text-ink mb-1.5">{title}</h3>
      <p className="text-sm text-body leading-relaxed max-w-md">{desc}</p>
    </div>
  </motion.div>
);

/** Rounded content panel used for warm full-width sections. */
export const WarmPanel = ({ children, className = '' }) => (
  <div className={`bg-cta-warm rounded-5xl px-6 py-14 sm:px-12 sm:py-16 ${className}`}>
    {children}
  </div>
);

export { default as CountUp } from './CountUp';
