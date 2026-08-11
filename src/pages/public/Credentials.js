import React from 'react';
import { motion } from 'framer-motion';
import PageHero from '../../components/PageHero';
import { SectionHeading } from '../../components/ui';
import { people, cutouts } from '../../assets/photos';
import { EASE, useMotion } from '../../lib/motion';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCertificate,
  faUserShield,
  faHeartPulse,
  faFileLines,
  faLock,
  faMedal,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';

const Credentials = () => {
  const m = useMotion();
  const credentials = [
    {
      icon: faCertificate,
      title: 'USA Gymnastics Certified',
      desc: 'Every coach holds current USA Gymnastics certification with annual continuing education.',
    },
    {
      icon: faUserShield,
      title: 'SafeSport Trained',
      desc: 'All staff complete SafeSport training covering athlete protection and reporting duties.',
    },
    {
      icon: faHeartPulse,
      title: 'CPR & First Aid',
      desc: 'Current CPR and first-aid certification is a condition of coaching on our floor.',
    },
    {
      icon: faFileLines,
      title: 'Background Screened',
      desc: 'Comprehensive background checks are run before any coach works with athletes.',
    },
    {
      icon: faLock,
      title: 'Licensed & Insured',
      desc: 'Full liability coverage and state facility licensing, inspected and renewed annually.',
    },
    {
      icon: faMedal,
      title: 'Competition Experience',
      desc: 'Our team coaches have prepared athletes for regional and state-level competition.',
    },
  ];

  const commitments = [
    'Published class-size caps we do not exceed',
    'Documented skill progressions before any new element',
    'Monthly equipment inspection log',
    'Open-door parent viewing during every class',
    'Written incident reporting for any injury',
  ];

  return (
    <div className="min-h-screen bg-cream pb-20">
      <PageHero
        lightLine="The qualifications"
        boldLine="behind every coach"
        tail="on our floor"
        tagline="and the standards we keep"
        body="Certification, safeguarding, first aid and background screening — plus the operating commitments we hold ourselves to every session."
        photo={cutouts.standingArabesque}
        photoAlt=""
        flip
      />

      <div className="max-w-7xl mx-auto px-4">

<motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-70px' }}
          transition={{ duration: 0.8, ease: EASE }}
          className="media-zoom rounded-5xl overflow-hidden mb-16 shadow-soft"
        >
          <img
            src={people.coachingSession}
            alt="A coach spotting a gymnast through a skill"
            loading="lazy"
            className="w-full h-64 sm:h-80 object-cover"
          />
        </motion.div>

        {/* Credential Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {credentials.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-70px' }}
              transition={{ delay: (i % 3) * 0.1, duration: 0.6, ease: EASE }}
              whileHover={m.liftCard}
              className="bg-cream rounded-4xl p-8 shadow-soft border-l-4 border-[#F7B183] hover:bg-gradient-to-br hover:from-[#F7B183] hover:to-[#FBDCC0] transition group"
            >
              <FontAwesomeIcon icon={item.icon} className="text-4xl text-[#F7B183] group-hover:text-ink transition mb-4" />
              <h3 className="text-xl font-extrabold text-ink group-hover:text-ink transition mb-3">{item.title}</h3>
              <p className="text-body group-hover:text-opacity-100 transition leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Commitments */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-70px' }}
          className="bg-shell rounded-4xl shadow-soft p-8 md:p-12 mb-16"
        >
          <SectionHeading light="Our operating" bold="commitments" className="mb-10" />
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {commitments.map((item) => (
              <li key={item} className="flex items-start gap-3 text-ink">
                <span className="mt-1 w-6 h-6 shrink-0 rounded-full bg-white flex items-center justify-center">
                  <FontAwesomeIcon icon={faCheck} className="text-magenta text-xs" />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-70px' }}
          className="text-center"
        >
          <div className="inline-block bg-shell border-2 border-magenta rounded-full px-8 py-4 mb-8">
            <p className="text-lg font-bold text-magenta">
              ✓ Fully Licensed, Insured &amp; Certified
            </p>
            <p className="text-sm text-magenta mt-1">
              Your child's safety is our top priority
            </p>
          </div>
          <div>
            <Link to="/contact">
              <motion.button
                whileHover={m.growSlight}
                className="bg-[#B01B5E] text-white px-8 py-3 rounded-full font-bold hover:bg-[#8E1449] transition"
              >
                Ask Us Anything
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Credentials;
