import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageHero from '../../components/PageHero';
import { SectionHeading } from '../../components/ui';
import { facility, cutouts } from '../../assets/photos';
import { EASE, useMotion } from '../../lib/motion';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUsers,
  faClock,
  faDollarSign,
  faArrowRight,
  faXmark,
  faCheck,
  faChildReaching,
  faPersonFalling,
  faStar,
} from '@fortawesome/free-solid-svg-icons';

const Classes = () => {
  const m = useMotion();
  const [selectedClass, setSelectedClass] = useState(null);
  const [filterAge, setFilterAge] = useState('all');

  const classDetails = [
    {
      id: 1,
      name: 'Tiny Tumblers',
      age: 'Ages 2–4',
      duration: '45 min',
      price: '$65',
      icon: faChildReaching,
      photo: facility.tinyTumblers,
      description: 'Introduction to gymnastics through play-based activities',
      skills: ['Balance', 'Coordination', 'Confidence', 'Fun'],
      schedule: 'Mon/Wed 10:00 AM, Sat 9:00 AM',
      spots: 8,
      capacity: 10,
      coach: 'Jessica Brooks',
      whatToBring: 'Comfortable clothes, water bottle',
    },
    {
      id: 2,
      name: 'Beginner Gymnastics',
      age: 'Ages 5–8',
      duration: '60 min',
      price: '$85',
      icon: faPersonFalling,
      photo: facility.bars,
      description: 'Fundamental skills on all apparatus',
      skills: ['Floor Exercise', 'Balance Beam', 'Bars', 'Vault'],
      schedule: 'Tue/Thu 4:00 PM, Sat 1:00 PM',
      spots: 5,
      capacity: 12,
      coach: 'Emily Carter',
      whatToBring: 'Comfortable clothes, water bottle, optional leotard',
    },
    {
      id: 3,
      name: 'Intermediate Gymnastics',
      age: 'Ages 9–12',
      duration: '75 min',
      price: '$105',
      icon: faStar,
      photo: facility.beam,
      description: 'Advanced technique and skill progression',
      skills: ['Advanced Skills', 'Strength', 'Flexibility', 'Competition Prep'],
      schedule: 'Mon/Wed 5:30 PM, Sat 2:30 PM',
      spots: 3,
      capacity: 10,
      coach: 'Madison Reed',
      whatToBring: 'Leotard, water bottle, gymnastics shoes',
    },
  ];

  const filteredClasses =
    filterAge === 'all'
      ? classDetails
      : classDetails.filter((cls) => {
          if (filterAge === '2-4') return cls.age === 'Ages 2–4';
          if (filterAge === '5-8') return cls.age === 'Ages 5–8';
          if (filterAge === '9-12') return cls.age === 'Ages 9–12';
          return true;
        });

  return (
    <div className="min-h-screen bg-cream pb-20">
      <PageHero
        lightLine="Find the class"
        boldLine="that fits your child"
        tail="ages 2 to 18"
        tagline="capped at 8–12 athletes"
        body="Every programme is built around safe, documented progression — from first forward roll to competitive routines."
        photo={cutouts.smallLeap}
        photoAlt=""
        
      />

      <div className="max-w-7xl mx-auto px-4">

{/* Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6, ease: EASE }}
          className="flex gap-4 mb-12 flex-wrap justify-center"
        >
          {['all', '2-4', '5-8', '9-12'].map((filter) => (
            <button
              key={filter}
              onClick={() => setFilterAge(filter)}
              className={`px-6 py-2 rounded-full font-semibold transition ${
                filterAge === filter
                  ? 'bg-[#F7B183] text-ink'
                  : 'bg-white text-magenta border-2 border-magenta hover:bg-shell'
              }`}
            >
              {filter === 'all' ? 'All Classes' : `Ages ${filter}`}
            </button>
          ))}
        </motion.div>

        {/* Class Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {filteredClasses.map((cls) => (
            <motion.div
              key={cls.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-70px' }}
              whileHover={m.liftCard}
              onClick={() => setSelectedClass(cls)}
              className="bg-white rounded-4xl p-8 shadow-soft border-l-4 border-[#FBDCC0] cursor-pointer"
            >
              <div className="media-zoom -mx-8 -mt-8 mb-6 h-52 overflow-hidden rounded-t-4xl">
                <img
                  src={cls.photo}
                  alt={cls.name}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-3xl font-extrabold text-ink mb-2">{cls.name}</h3>
              <p className="text-lg text-magenta font-semibold mb-4">{cls.age}</p>
              <p className="text-body mb-6">{cls.description}</p>

              <div className="space-y-3 mb-6 pb-6 border-b border-[#FDF6F1]">
                <div className="flex items-center gap-3">
                  <FontAwesomeIcon icon={faClock} className="text-[#F7B183] w-4" />
                  <span className="text-ink">{cls.duration} per session</span>
                </div>
                <div className="flex items-center gap-3">
                  <FontAwesomeIcon icon={faDollarSign} className="text-magenta w-4" />
                  <span className="text-lg font-bold text-magenta">{cls.price}/month</span>
                </div>
                <div className="flex items-center gap-3">
                  <FontAwesomeIcon icon={faUsers} className="text-[#F7B183] w-4" />
                  <span className="text-ink">
                    {cls.spots} spots available ({cls.capacity} total)
                  </span>
                </div>
              </div>

              <motion.button
                className="w-full bg-[#F7B183] text-ink py-3 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-magenta-dark"
                whileHover={m.growSlight}
                whileTap={m.pressable}
              >
                Reserve Trial Spot
                <FontAwesomeIcon icon={faArrowRight} />
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Pricing Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-70px' }}
          className="mt-20"
        >
          <SectionHeading light="Flexible" bold="pricing plans" className="mb-10" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Starter', classes: '1 Class/Week', price: '$65-85' },
              { name: 'Progress', classes: '2 Classes/Week', price: '$125-155' },
              { name: 'Unlimited', classes: 'Multiple Sessions', price: '$220+' },
            ].map((plan, i) => (
              <motion.div
                key={i}
                whileHover={m.liftCard}
                className="bg-white rounded-4xl p-8 shadow-soft text-center border-t-4 border-[#F7B183]"
              >
                <h3 className="text-2xl font-extrabold text-ink mb-4">{plan.name}</h3>
                <p className="text-lg text-body mb-4">{plan.classes}</p>
                <p className="text-3xl font-bold text-magenta mb-6">{plan.price}/mo</p>
                <Link to="/schedule-pricing">
                  <button className="w-full bg-[#B01B5E] text-white py-3 rounded-full font-bold hover:bg-[#8E1449] transition">
                    Choose Plan
                  </button>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Class Detail Modal */}
      <AnimatePresence>
        {selectedClass && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedClass(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-4xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="w-14 h-14 rounded-full bg-card-warm flex items-center justify-center mb-4">
                    <FontAwesomeIcon icon={selectedClass.icon} className="text-lg text-magenta" />
                  </div>
                  <h2 className="text-3xl font-extrabold text-ink mb-1">{selectedClass.name}</h2>
                  <p className="text-magenta font-semibold">{selectedClass.age}</p>
                </div>
                <button
                  onClick={() => setSelectedClass(null)}
                  className="text-ink text-opacity-50 hover:text-opacity-100 transition"
                  aria-label="Close"
                >
                  <FontAwesomeIcon icon={faXmark} size="lg" />
                </button>
              </div>

              <p className="text-body leading-relaxed mb-6">
                {selectedClass.description}
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-cream p-4 rounded-lg">
                  <p className="font-extrabold text-ink mb-1">Schedule</p>
                  <p className="text-sm text-ink">{selectedClass.schedule}</p>
                </div>
                <div className="bg-cream p-4 rounded-lg">
                  <p className="font-extrabold text-ink mb-1">Coach</p>
                  <p className="text-sm text-ink">{selectedClass.coach}</p>
                </div>
                <div className="bg-cream p-4 rounded-lg">
                  <p className="font-extrabold text-ink mb-1">Session Length</p>
                  <p className="text-sm text-ink">{selectedClass.duration}</p>
                </div>
                <div className="bg-cream p-4 rounded-lg">
                  <p className="font-extrabold text-ink mb-1">Tuition</p>
                  <p className="text-sm text-ink">{selectedClass.price}/month</p>
                </div>
              </div>

              <p className="font-extrabold text-ink mb-3">Skills Covered</p>
              <ul className="grid sm:grid-cols-2 gap-2 mb-6">
                {selectedClass.skills.map((skill) => (
                  <li key={skill} className="flex items-center gap-2 text-ink">
                    <FontAwesomeIcon icon={faCheck} className="text-magenta" />
                    {skill}
                  </li>
                ))}
              </ul>

              <div className="bg-cream p-4 rounded-lg border-l-4 border-[#F7B183] mb-6">
                <p className="font-extrabold text-ink mb-1">What to Bring</p>
                <p className="text-sm text-ink">{selectedClass.whatToBring}</p>
              </div>

              <Link to="/contact">
                <button className="w-full bg-[#F7B183] text-ink py-3 rounded-full font-bold hover:bg-magenta-dark transition">
                  Reserve Trial Spot
                </button>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Classes;
