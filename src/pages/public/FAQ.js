import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageHero from '../../components/PageHero';
import { people, cutouts } from '../../assets/photos';
import { EASE, useMotion } from '../../lib/motion';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const FAQ = () => {
  const m = useMotion();
  const [openId, setOpenId] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const faqs = [
    {
      id: 1,
      category: 'Getting Started',
      q: 'What happens in a trial class?',
      a: 'Your child joins a real class at their age and ability level. A coach greets you both, explains the warm-up, and walks your child through the rotation. You watch from the parent viewing area. Afterwards the coach recommends the class that fits best — with no obligation to enroll.',
    },
    {
      id: 2,
      category: 'Getting Started',
      q: 'What should my child wear?',
      a: 'Comfortable athletic clothing that moves — leggings and a fitted t-shirt work well. No zippers, buttons or jewelry, since they catch on equipment. Bare feet are standard. Long hair should be tied back. Leotards are welcome but never required.',
    },
    {
      id: 3,
      category: 'Getting Started',
      q: 'Does my child need any experience?',
      a: 'None at all. Our beginner and preschool classes assume zero background, and coaches build from basic body shapes and safe landings upward. Most of our athletes start with no gymnastics experience.',
    },
    {
      id: 4,
      category: 'Classes',
      q: 'How large are the classes?',
      a: 'Classes are capped between 8 and 12 athletes depending on the program and apparatus. Preschool classes run smallest. We publish these caps and do not exceed them, even when there is demand.',
    },
    {
      id: 5,
      category: 'Classes',
      q: 'How do you decide when a gymnast moves up?',
      a: 'Movement between levels is skill-based, not age-based or time-based. Each level has a documented checklist of prerequisites. When an athlete demonstrates them consistently and safely, the coach discusses the move with the family.',
    },
    {
      id: 6,
      category: 'Classes',
      q: 'What if we miss a class?',
      a: 'Each enrolled athlete gets a set number of make-up sessions per term, scheduled into any class with space at their level. Make-ups are requested through the front desk and do not roll over between terms.',
    },
    {
      id: 7,
      category: 'Safety',
      q: 'How do you keep training safe?',
      a: 'Three ways: progressions that require prerequisites before any new skill, low coach-to-athlete ratios so spotting is always available, and equipment inspected on a monthly schedule. Every coach holds current CPR and first-aid certification.',
    },
    {
      id: 8,
      category: 'Safety',
      q: 'Can parents watch?',
      a: 'Yes — every class, every time. We have a dedicated viewing area with sightlines to the whole floor. We do ask that coaching stays with the coaches so athletes get one clear set of cues.',
    },
    {
      id: 9,
      category: 'Billing',
      q: 'How does billing work?',
      a: 'Tuition is billed monthly on the first of the month and holds your athlete\'s spot in their class. Pricing depends on the program and how many sessions per week you choose.',
    },
    {
      id: 10,
      category: 'Billing',
      q: 'What is your cancellation policy?',
      a: 'Give written notice before the end of the month and the following month is not billed. There is no long-term contract and no cancellation fee.',
    },
    {
      id: 11,
      category: 'Billing',
      q: 'Do you offer sibling discounts?',
      a: 'Yes. Additional children from the same household receive a discount on their tuition. Ask the front desk to apply it when you enroll your second athlete.',
    },
  ];

  const categories = ['All', ...Array.from(new Set(faqs.map((f) => f.category)))];
  const visible = activeCategory === 'All' ? faqs : faqs.filter((f) => f.category === activeCategory);

  const toggle = (id) => setOpenId(openId === id ? null : id);

  return (
    <div className="min-h-screen bg-cream py-20">
      <div className="max-w-4xl mx-auto px-4">
      <PageHero
        lightLine="Everything families ask"
        boldLine="before their first class"
        
        tagline="answered plainly"
        body="Trial classes, what to wear, how levels work, billing and cancellation — all in one place. If something is missing, just ask."
        photo={cutouts.walkover}
        photoAlt=""
        
      />

{/* Category Filter */}
        <div className="flex gap-3 mb-10 flex-wrap justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setOpenId(null);
              }}
              className={`px-5 py-2 rounded-lg font-semibold transition text-sm ${
                activeCategory === cat
                  ? 'bg-[#B01B5E] text-white'
                  : 'bg-white text-[#B01B5E] border-2 border-[#B01B5E] hover:bg-shell'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion */}
        <div className="space-y-4 mb-16">
          {visible.map((faq, i) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.6, ease: EASE }}
              className="bg-white rounded-4xl shadow-soft overflow-hidden"
            >
              <button
                onClick={() => toggle(faq.id)}
                aria-expanded={openId === faq.id}
                className="w-full flex items-center justify-between gap-4 p-6 text-left hover:bg-cream transition"
              >
                <span className="text-lg font-extrabold text-ink">{faq.q}</span>
                <motion.span
                  animate={{ rotate: openId === faq.id ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="shrink-0"
                >
                  <FontAwesomeIcon icon={faChevronDown} className="text-[#FBDCC0]" />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {openId === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-6 text-body leading-relaxed">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-70px' }}
          className="bg-white rounded-4xl shadow-soft p-10 text-center"
        >
          <div className="media-zoom w-full h-44 rounded-4xl overflow-hidden mb-7">
            <img
              src={people.teamCoachesAlt}
              alt="The Sommersault coaching team"
              loading="lazy"
              className="w-full h-full object-cover"
              style={{ objectPosition: 'center 28%' }}
            />
          </div>
          <h2 className="text-2xl font-extrabold text-ink mb-3">Still have a question?</h2>
          <p className="text-body mb-8">
            Send it over and a coach will get back to you within one business day.
          </p>
          <Link to="/contact">
            <motion.button
              whileHover={m.growSlight}
              whileTap={m.pressable}
              className="bg-[#F7B183] text-ink px-8 py-3 rounded-lg font-bold hover:bg-magenta-dark transition"
            >
              Contact Us
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ;
