import React from 'react';
import { motion } from 'framer-motion';
import PageHero from '../../components/PageHero';
import { SectionHeading } from '../../components/ui';
import { EASE, useMotion } from '../../lib/motion';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShieldHalved, faTrophy, faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import { facility, people, cutouts } from '../../assets/photos';

const About = () => {
  const m = useMotion();
  const values = [
    {
      icon: faHeart,
      title: 'Confidence First',
      desc: 'Skills follow belief. We build athletes who trust themselves before we chase difficulty.',
    },
    {
      icon: faShieldHalved,
      title: 'Safety Always',
      desc: 'Progressions are earned, never rushed. Every skill has a prerequisite and a spotter.',
    },
    {
      icon: faTrophy,
      title: 'Progress Over Podiums',
      desc: 'We measure success against where a gymnast started, not against the child next to them.',
    },
  ];

  const timeline = [
    { year: 'Year 1', title: 'The First Mat', desc: 'Sommer began coaching a handful of athletes out of a shared community gym.' },
    { year: 'Year 3', title: 'A Home of Our Own', desc: 'Sommersault moved into a dedicated facility with a full apparatus set.' },
    { year: 'Year 6', title: 'Preschool Program', desc: 'A separate soft-play zone opened so ages 2–4 could train safely alongside older classes.' },
    { year: 'Today', title: 'A Growing Community', desc: 'Five coaches, six programs, and a waitlist that keeps us honest about class sizes.' },
  ];

  return (
    <div className="min-h-screen bg-cream">
      <PageHero
        lightLine="More than"
        boldLine="a gymnastics gym"
        tail="a place to grow"
        tagline="since day one"
        body="Sommersault exists to give kids a place where effort is celebrated, mistakes are part of the process, and every athlete leaves standing a little taller than when they walked in."
        photo={cutouts.archLeap}
        photoAlt=""
        
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#B01B5E] to-[#1D1D1B] text-white py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            More Than a Gym
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6, ease: EASE }}
            className="text-xl text-white text-opacity-90 leading-relaxed"
          >
            Sommersault exists to give kids a place where effort is celebrated, mistakes are part of
            the process, and every athlete leaves standing a little taller than when they walked in.
          </motion.p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-70px' }}
            className="relative h-96 rounded-4xl overflow-hidden"
          >
            <img
              src={facility.lobby}
              alt="The Sommersault welcome lobby"
              className="w-full h-full object-cover"
              style={{ objectPosition: 'center 30%' }}
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-6 pt-14 pb-5">
              <p className="text-lg font-bold text-white">Our Story</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-70px' }}
          >
            <SectionHeading light="Why we" bold="started" className="mb-10" />
            <p className="text-lg text-body mb-4 leading-relaxed">
              Sommer spent years in gyms that measured children by their scores. The athletes who
              thrived were the ones who already had confidence — everyone else quietly drifted away.
            </p>
            <p className="text-lg text-body mb-4 leading-relaxed">
              Sommersault was built to invert that. Coaching here starts with the relationship,
              then the fundamentals, then the skill. The result is athletes who stay in the sport
              longer, progress more safely, and actually enjoy the process.
            </p>
            <p className="text-lg text-body leading-relaxed">
              That philosophy shapes everything — how we cap class sizes, how we train coaches, and
              how we talk to kids on their hardest days.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Coaching in action */}
      <section className="max-w-6xl mx-auto px-4 pb-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-70px' }}
          transition={{ duration: 0.8, ease: EASE }}
          className="media-zoom rounded-5xl overflow-hidden shadow-soft"
        >
          <img src={people.coachingStretch} alt="A coach leading a warm-up with a young group" loading="lazy" className="w-full h-64 sm:h-[22rem] object-cover" />
        </motion.div>

      </section>

      {/* Values */}
      <section className="py-20 bg-cream">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHeading light="What we" bold="stand for" className="mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-70px' }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: EASE }}
                whileHover={m.liftCard}
                className="bg-white rounded-4xl p-8 shadow-soft text-center"
              >
                <div className="w-16 h-16 bg-cream rounded-full flex items-center justify-center mx-auto mb-4">
                  <FontAwesomeIcon icon={value.icon} className="text-3xl text-[#B01B5E]" />
                </div>
                <h3 className="text-xl font-extrabold text-ink mb-3">{value.title}</h3>
                <p className="text-body leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <SectionHeading light="How we" bold="got here" className="mb-12" />
          <div className="space-y-6">
            {timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-70px' }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: EASE }}
                className="bg-white border-l-4 border-[#FBDCC0] rounded-xl p-6 shadow-soft flex flex-col sm:flex-row sm:items-center gap-4"
              >
                <span className="bg-cream text-[#B01B5E] font-bold px-4 py-2 rounded-lg whitespace-nowrap self-start">
                  {item.year}
                </span>
                <div>
                  <h3 className="text-xl font-extrabold text-ink mb-1">{item.title}</h3>
                  <p className="text-body">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <p className="text-sm text-body/80 text-center mt-8">
            *Illustrative timeline — replace with real milestones
          </p>
        </div>
      </section>

      {/* Quote */}
      <section className="py-20 bg-cream">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <FontAwesomeIcon icon={faQuoteLeft} className="text-4xl text-[#FBDCC0] mb-6" />
          <p className="text-2xl md:text-3xl font-extrabold text-ink leading-relaxed mb-6">
            "I believe every child has potential. Our job is to unlock it safely and joyfully."
          </p>
          <p className="text-body">Sommer — Founder &amp; Head Coach</p>
          <Link to="/staff">
            <motion.button
              whileHover={m.growSlight}
              className="mt-8 bg-[#B01B5E] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#8E1449] transition"
            >
              Meet the Coaches
            </motion.button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
