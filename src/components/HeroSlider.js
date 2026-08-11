import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { motion } from 'framer-motion';
import { CircleButton } from './ui';
import { cutouts } from '../assets/photos';

/**
 * Reference hero: one large inset card with a warm mesh gradient, an
 * over-sized mixed-weight headline, a magenta circle CTA floating at the
 * centre, and cut-out athletes standing directly on the gradient.
 *
 * The athletes must be transparent PNG/WebP — a framed photo here loses the
 * whole effect.
 */
const HeroSlider = () => {
  const slides = [
    {
      lightLine: 'Gymnastics school',
      boldLine: 'built on confidence',
      tail: "for Sommer's Sault",
      tagline: 'with care for every child',
      body: 'We teach persistence, focus and discipline — and we teach children to love a sport that stays with them for life. Come and see for yourself.',
      cta: ['Book a', 'free trial', 'class'],
      to: '/contact',
      photos: [
        { src: cutouts.splitLeap, alt: 'Gymnast in a split leap' },
        { src: cutouts.leap, alt: 'Gymnast mid-leap with arms extended', flip: true },
      ],
    },
    {
      lightLine: 'Small classes,',
      boldLine: 'serious coaching',
      tail: 'for ages 2 to 18',
      tagline: 'capped at 8–12 athletes',
      body: 'Every gymnast is properly spotted and properly seen. Progressions are earned, never rushed, and each level has a documented checklist before anything new is attempted.',
      cta: ['See the', 'class', 'schedule'],
      to: '/schedule-pricing',
      photos: [
        { src: cutouts.beamArabesque, alt: 'Gymnast holding an arabesque on the beam' },
        { src: cutouts.beamHandstand, alt: 'Gymnast in a handstand on the beam' },
      ],
    },
    {
      lightLine: 'A facility built',
      boldLine: 'around safe progression',
      tail: 'from first flip to competition',
      tagline: 'inspected monthly',
      body: 'Spring floor, foam pit, dedicated preschool zone and a parent viewing area with sightlines to the whole gym. Come tour it with one of our coaches.',
      cta: ['Tour the', 'facility'],
      to: '/facility',
      photos: [
        { src: cutouts.walkover, alt: 'Gymnast coming through a walkover' },
        { src: cutouts.standingArabesque, alt: 'Gymnast holding a standing arabesque', flip: true },
      ],
    },
  ];

  return (
    <section className="px-4 sm:px-8 pb-4">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 7000, disableOnInteraction: false }}
        loop
        observer
        observeParents
        watchOverflow
        className="hero-swiper rounded-5xl overflow-hidden max-w-[88rem] mx-auto min-h-[30rem] lg:min-h-[36rem]"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div className="relative bg-hero-warm min-h-[30rem] lg:min-h-[36rem] flex flex-col overflow-hidden">
              {/* Soft light bloom */}
              <div
                aria-hidden="true"
                className="absolute -left-24 top-1/3 w-[28rem] h-[28rem] rounded-full bg-white/25 blur-3xl"
              />

              <div className="relative z-10 px-6 sm:px-12 lg:px-16 pt-11 lg:pt-12">
                {/* Headline */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="max-w-2xl"
                >
                  <p className="text-[11px] uppercase tracking-[0.22em] font-bold text-magenta mb-4">
                    {slide.tagline}
                  </p>
                  <h1 className="text-3xl sm:text-4xl lg:text-[3.25rem] font-light leading-[1.08] text-ink">
                    {slide.lightLine}
                  </h1>
                  <h2 className="text-3xl sm:text-4xl lg:text-[3.25rem] font-extrabold leading-[1.08] text-ink">
                    {slide.boldLine}
                  </h2>
                  <p className="text-3xl sm:text-4xl lg:text-[3.25rem] font-light leading-[1.08] text-ink">
                    {slide.tail}
                  </p>
                </motion.div>

                {/* Body copy */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-7 max-w-md text-sm leading-relaxed text-ink/80"
                >
                  {slide.body}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-7 sm:hidden"
                >
                  <CircleButton to={slide.to} size="md">
                    {slide.cta.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </CircleButton>
                </motion.div>
              </div>

              {/* Cut-out athletes flanking the circle CTA */}
              <div className="relative z-10 mt-auto flex items-end justify-center gap-4 sm:gap-6 lg:gap-12 px-4">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="h-44 sm:h-64 lg:h-[21rem] flex items-end"
                >
                  <img
                    src={slide.photos[0].src}
                    alt={slide.photos[0].alt}
                    className={`h-full w-auto object-contain drop-shadow-xl ${
                      slide.photos[0].flip ? 'scale-x-[-1]' : ''
                    }`}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="hidden sm:block sm:mb-10 lg:mb-16 shrink-0"
                >
                  <CircleButton to={slide.to} size="lg">
                    {slide.cta.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </CircleButton>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="h-44 sm:h-64 lg:h-[21rem] flex items-end"
                >
                  <img
                    src={slide.photos[1].src}
                    alt={slide.photos[1].alt}
                    className={`h-full w-auto object-contain drop-shadow-xl ${
                      slide.photos[1].flip ? 'scale-x-[-1]' : ''
                    }`}
                  />
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroSlider;
