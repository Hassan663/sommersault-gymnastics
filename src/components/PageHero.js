import React from 'react';
import { motion } from 'framer-motion';
import { CircleButton } from './ui';
import { EASE } from '../lib/motion';

/**
 * The home hero's language, reused as the header of every inner page:
 * an inset warm-gradient panel, a mixed-weight headline with a small tagline
 * beside the light line, short body copy, an optional magenta circle CTA and
 * a cut-out athlete standing on the gradient.
 *
 * Keeping every page on this one component is what makes the site read as a
 * single design rather than a set of separate templates.
 */
const PageHero = ({
  lightLine,
  boldLine,
  tail,
  tagline,
  body,
  cta,
  to = '/contact',
  photo,
  photoAlt = '',
  flip = false,
}) => (
  <section className="px-4 sm:px-8 pt-4 pb-2">
    <div className="relative bg-hero-warm rounded-5xl overflow-hidden max-w-[88rem] mx-auto">
      {/* Soft light bloom, matching the home hero */}
      <div
        aria-hidden="true"
        className="absolute -left-24 top-1/4 w-[26rem] h-[26rem] rounded-full bg-white/25 blur-3xl"
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-8 items-end px-6 sm:px-12 lg:px-16 pt-14 lg:pt-16">
        {/* Copy */}
        <div className="pb-14 lg:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: EASE }}
          >
            <div className="flex flex-wrap items-baseline gap-x-4">
              <h1 className="text-3xl sm:text-4xl lg:text-[2.9rem] font-light leading-[1.08] text-ink">
                {lightLine}
              </h1>
              {tagline && (
                <span className="text-xs sm:text-sm text-ink/70 font-medium">{tagline}</span>
              )}
            </div>
            <p className="text-3xl sm:text-4xl lg:text-[2.9rem] font-extrabold leading-[1.08] text-ink">
              {boldLine}
            </p>
            {tail && (
              <p className="text-3xl sm:text-4xl lg:text-[2.9rem] font-light leading-[1.08] text-ink">
                {tail}
              </p>
            )}
          </motion.div>

          {body && (
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.12, ease: EASE }}
              className="mt-6 max-w-lg text-sm leading-relaxed text-ink/80"
            >
              {body}
            </motion.p>
          )}

          {cta && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.25, ease: EASE }}
              className="mt-8"
            >
              <CircleButton to={to} size="md">
                {cta.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </CircleButton>
            </motion.div>
          )}
        </div>

        {/* Cut-out athlete standing on the gradient */}
        {photo && (
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.2, ease: EASE }}
            className="hidden lg:flex justify-center items-end h-[19rem] xl:h-[22rem] -mb-px"
          >
            <img
              src={photo}
              alt={photoAlt}
              className={`h-full w-auto object-contain drop-shadow-xl ${
                flip ? 'scale-x-[-1]' : ''
              }`}
            />
          </motion.div>
        )}
      </div>
    </div>
  </section>
);

export default PageHero;
