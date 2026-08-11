import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PageHero from '../../components/PageHero';
import { SectionHeading } from '../../components/ui';
import { cutouts } from '../../assets/photos';
import { EASE, useMotion } from '../../lib/motion';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faUserTie, faUsers } from '@fortawesome/free-solid-svg-icons';

const SchedulePricing = () => {
  const m = useMotion();
  const [selectedDay, setSelectedDay] = useState('Monday');

  const schedule = {
    Monday: [
      { time: '10:00 AM', class: 'Tiny Tumblers', coach: 'Jessica', spots: 2 },
      { time: '4:00 PM', class: 'Beginner Gymnastics', coach: 'Emily', spots: 5 },
      { time: '5:30 PM', class: 'Intermediate Gymnastics', coach: 'Madison', spots: 3 },
      { time: '7:00 PM', class: 'Advanced Training', coach: 'Taylor', spots: 0 },
    ],
    Tuesday: [
      { time: '4:00 PM', class: 'Beginner Gymnastics', coach: 'Emily', spots: 8 },
      { time: '5:30 PM', class: 'Advanced Training', coach: 'Taylor', spots: 2 },
    ],
    Wednesday: [
      { time: '10:00 AM', class: 'Tiny Tumblers', coach: 'Jessica', spots: 2 },
      { time: '4:00 PM', class: 'Beginner Gymnastics', coach: 'Emily', spots: 5 },
      { time: '5:30 PM', class: 'Intermediate Gymnastics', coach: 'Madison', spots: 3 },
    ],
    Thursday: [{ time: '4:00 PM', class: 'Beginner Gymnastics', coach: 'Emily', spots: 5 }],
    Friday: [
      { time: '4:30 PM', class: 'Tumbling & Skills', coach: 'Madison', spots: 4 },
      { time: '6:00 PM', class: 'Advanced Training', coach: 'Taylor', spots: 1 },
    ],
    Saturday: [
      { time: '9:00 AM', class: 'Tiny Tumblers', coach: 'Jessica', spots: 3 },
      { time: '1:00 PM', class: 'Beginner Gymnastics', coach: 'Emily', spots: 2 },
      { time: '2:30 PM', class: 'Intermediate Gymnastics', coach: 'Madison', spots: 5 },
      { time: '4:00 PM', class: 'Advanced Training', coach: 'Taylor', spots: 1 },
    ],
  };

  const days = Object.keys(schedule);

  const plans = [
    {
      name: 'Starter',
      desc: 'Perfect for beginners',
      classes: '1 Class/Week',
      price: '$65-85',
      features: [
        'Access to all facilities',
        'Professional coaching',
        'Progress tracking',
        'Trial class included',
      ],
    },
    {
      name: 'Progress',
      desc: 'Build your skills',
      classes: '2 Classes/Week',
      price: '$125-155',
      features: [
        'Access to all facilities',
        'Professional coaching',
        'Faster progression',
        '10% discount on camps',
      ],
      highlighted: true,
    },
    {
      name: 'Unlimited',
      desc: 'For serious athletes',
      classes: 'Flexible',
      price: '$220+',
      features: [
        'Unlimited class access',
        'Private coaching available',
        'Priority scheduling',
        'Exclusive events & clinics',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-cream pb-20">
      <PageHero
        lightLine="Class times"
        boldLine="that fit around family"
        tail="and clear pricing"
        tagline="no contracts"
        body="Pick a day to see what runs and how many places are left. Tuition is billed monthly and holds your athlete’s spot."
        photo={cutouts.ribbon}
        photoAlt=""
        flip
      />

      <div className="max-w-7xl mx-auto px-4">

{/* Schedule */}
        <div className="bg-white rounded-4xl shadow-soft p-6 md:p-8 mb-12">
          {/* Day Selector */}
          <div className="flex flex-wrap gap-2 mb-8">
            {days.map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-5 py-2 rounded-full font-semibold transition ${
                  selectedDay === day
                    ? 'bg-[#F7B183] text-ink'
                    : 'bg-shell text-[#B01B5E] hover:bg-[#F6E0D2]'
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          {/* Classes for Selected Day */}
          <motion.div
            key={selectedDay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            {schedule[selectedDay].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: EASE }}
                className={`border-2 rounded-4xl p-6 ${
                  item.spots === 0
                    ? 'border-gray-300 bg-gray-50'
                    : 'border-[#FBDCC0] bg-white hover:shadow-soft'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-extrabold text-ink mb-2">{item.class}</h3>
                    <div className="space-y-1 text-sm text-body">
                      <p className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faClock} className="w-4" /> {item.time}
                      </p>
                      <p className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faUserTie} className="w-4" /> Coach {item.coach}
                      </p>
                      <p
                        className={`flex items-center gap-2 ${
                          item.spots === 0 ? 'text-magenta' : 'text-magenta'
                        }`}
                      >
                        <FontAwesomeIcon icon={faUsers} className="w-4" />{' '}
                        {item.spots === 0 ? 'Full' : `${item.spots} spots left`}
                      </p>
                    </div>
                  </div>
                  <motion.button
                    disabled={item.spots === 0}
                    className={`px-6 py-3 rounded-full font-bold whitespace-nowrap ${
                      item.spots === 0
                        ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                        : 'bg-[#F7B183] text-ink hover:bg-magenta-dark'
                    }`}
                    whileHover={item.spots > 0 ? m.growSlight : undefined}
                    whileTap={item.spots > 0 ? m.pressable : undefined}
                  >
                    {item.spots === 0 ? 'Waitlist' : 'Enroll'}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Pricing */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-70px' }}>
          <SectionHeading light="Our" bold="pricing plans" className="mb-10" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {plans.map((plan, i) => (
              <motion.div
                key={i}
                whileHover={m.liftCard}
                className={`rounded-4xl p-8 shadow-soft ${
                  plan.highlighted
                    ? 'bg-gradient-to-br from-[#F7B183] to-[#FBDCC0] text-ink md:scale-105'
                    : 'bg-white text-ink border-t-4 border-[#F7B183]'
                }`}
              >
                <h3 className={`text-2xl font-bold mb-2 ${plan.highlighted ? 'text-ink' : 'text-[#B01B5E]'}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm mb-6 ${plan.highlighted ? 'text-body' : 'text-body'}`}>
                  {plan.desc}
                </p>
                <p className={`text-3xl font-bold mb-2 ${plan.highlighted ? 'text-ink' : 'text-magenta'}`}>
                  {plan.price}
                </p>
                <p className={`text-sm mb-6 ${plan.highlighted ? 'text-ink text-opacity-75' : 'text-body/80'}`}>
                  {plan.classes}
                </p>

                <ul className="space-y-3 mb-8 text-sm">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <span className={plan.highlighted ? 'text-[#B01B5E]' : 'text-magenta'}>✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link to="/contact">
                  <button
                    className={`w-full py-3 rounded-full font-bold transition ${
                      plan.highlighted
                        ? 'bg-white text-magenta hover:bg-opacity-90'
                        : 'bg-[#F7B183] text-ink hover:bg-magenta-dark'
                    }`}
                  >
                    Choose Plan
                  </button>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SchedulePricing;
