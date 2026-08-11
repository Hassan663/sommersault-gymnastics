import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PageHero from '../../components/PageHero';
import { facility, cutouts } from '../../assets/photos';
import { EASE, useMotion } from '../../lib/motion';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendar,
  faClock,
  faTicket,
  faUsers,
  faSun,
  faPizzaSlice,
  faPersonFalling,
  faStar,
  faSnowflake,
  faBullhorn,
} from '@fortawesome/free-solid-svg-icons';

const Events = () => {
  const m = useMotion();
  const [filter, setFilter] = useState('All');

  const events = [
    {
      id: 1,
      title: 'Summer Skills Camp',
      type: 'Camp',
      date: 'July 8–12',
      time: '9:00 AM – 12:00 PM',
      price: '$185',
      spots: 6,
      desc: 'Five mornings of focused skill work across floor, beam, bars and vault. Ages 6–12.',
      icon: faSun,
    },
    {
      id: 2,
      title: 'Parents Night Out',
      type: 'Social',
      date: 'Third Friday, monthly',
      time: '6:00 PM – 9:00 PM',
      price: '$35',
      spots: 12,
      desc: 'Supervised open gym, games and pizza while parents get an evening back. Ages 4–12.',
      icon: faPizzaSlice,
    },
    {
      id: 3,
      title: 'Back Handspring Clinic',
      type: 'Clinic',
      date: 'August 16',
      time: '1:00 PM – 3:00 PM',
      price: '$55',
      spots: 4,
      desc: 'Two-hour intensive on back handspring mechanics, drills and spotting progressions.',
      icon: faPersonFalling,
    },
    {
      id: 4,
      title: 'Intra-Gym Showcase',
      type: 'Showcase',
      date: 'September 20',
      time: '10:00 AM – 1:00 PM',
      price: 'Free',
      spots: 0,
      desc: 'Every athlete performs a routine for family and friends. No scores, all celebration.',
      icon: faStar,
    },
    {
      id: 5,
      title: 'Holiday Open Gym',
      type: 'Open Gym',
      date: 'December 27–30',
      time: '10:00 AM – 2:00 PM',
      price: '$20/day',
      spots: 20,
      desc: 'Drop-in supervised practice during the winter break. All levels welcome.',
      icon: faSnowflake,
    },
    {
      id: 6,
      title: 'Coach-for-a-Day Workshop',
      type: 'Clinic',
      date: 'October 11',
      time: '2:00 PM – 4:00 PM',
      price: '$45',
      spots: 8,
      desc: 'Senior athletes learn spotting, cueing and drill design alongside our coaching staff.',
      icon: faBullhorn,
    },
  ];

  const types = ['All', ...Array.from(new Set(events.map((e) => e.type)))];
  const visible = filter === 'All' ? events : events.filter((e) => e.type === filter);

  return (
    <div className="min-h-screen bg-cream pb-20">
      <PageHero
        lightLine="Camps, clinics"
        boldLine="and community nights"
        tail="all year round"
        tagline="places fill quickly"
        body="Skills camps, parents’ nights out, showcase evenings and holiday open gym — there is always something on beyond the weekly timetable."
        photo={cutouts.splitLeap}
        photoAlt=""
        
      />

      <div className="max-w-7xl mx-auto px-4">

{/* Filters */}
        <div className="flex gap-3 mb-12 flex-wrap justify-center">
          {types.map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                filter === type
                  ? 'bg-[#B01B5E] text-white'
                  : 'bg-white text-[#B01B5E] border-2 border-[#B01B5E] hover:bg-shell'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-70px' }}
          transition={{ duration: 0.8, ease: EASE }}
          className="media-zoom rounded-5xl overflow-hidden mb-14 shadow-soft"
        >
          <img
            src={facility.eventsRoom}
            alt="The Sommersault party and events room"
            loading="lazy"
            className="w-full h-64 sm:h-80 object-cover"
          />
        </motion.div>

        {/* Event Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {visible.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-70px' }}
              transition={{ delay: (i % 3) * 0.1, duration: 0.6, ease: EASE }}
              whileHover={m.liftCard}
              className="bg-white rounded-4xl overflow-hidden shadow-soft flex flex-col"
            >
              <div className="bg-gradient-to-br from-[#B01B5E] to-[#FBDCC0] p-6 text-white">
                <div className="flex justify-between items-start mb-3">
                  <FontAwesomeIcon icon={event.icon} className="text-2xl" />
                  <span className="text-xs bg-white bg-opacity-20 px-3 py-1 rounded-full">
                    {event.type}
                  </span>
                </div>
                <h3 className="text-2xl font-bold">{event.title}</h3>
              </div>

              <div className="p-8 flex flex-col flex-1">
                <p className="text-body mb-6">{event.desc}</p>

                <div className="space-y-2 mb-6 pb-6 border-b border-[#FDF6F1] text-sm">
                  <p className="flex items-center gap-3 text-ink">
                    <FontAwesomeIcon icon={faCalendar} className="text-[#B01B5E] w-4" />
                    {event.date}
                  </p>
                  <p className="flex items-center gap-3 text-ink">
                    <FontAwesomeIcon icon={faClock} className="text-[#B01B5E] w-4" />
                    {event.time}
                  </p>
                  <p className="flex items-center gap-3 text-ink">
                    <FontAwesomeIcon icon={faTicket} className="text-magenta w-4" />
                    <span className="font-bold">{event.price}</span>
                  </p>
                  <p
                    className={`flex items-center gap-3 ${
                      event.spots === 0 ? 'text-magenta' : 'text-magenta'
                    }`}
                  >
                    <FontAwesomeIcon icon={faUsers} className="w-4" />
                    {event.spots === 0 ? 'Spectators welcome' : `${event.spots} spots left`}
                  </p>
                </div>

                <Link to="/contact" className="mt-auto">
                  <motion.button
                    className="w-full bg-[#F7B183] text-ink py-3 rounded-lg font-bold hover:bg-magenta-dark transition"
                    whileHover={m.growSlight}
                    whileTap={m.pressable}
                  >
                    {event.spots === 0 ? 'Add to Calendar' : 'Reserve a Spot'}
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="text-sm text-body/80 text-center mb-16">
          *Demo event listings — replace with your real calendar
        </p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-70px' }}
          className="bg-gradient-to-r from-[#B01B5E] to-[#FBDCC0] rounded-4xl p-12 text-center text-white"
        >
          <h2 className="text-3xl font-bold mb-4">Want event announcements first?</h2>
          <p className="text-lg text-white text-opacity-90 mb-8">
            Families on our list get early access before spots open publicly.
          </p>
          <Link to="/contact">
            <motion.button
              whileHover={m.growSlight}
              whileTap={m.pressable}
              className="bg-white text-[#B01B5E] px-8 py-3 rounded-lg font-bold hover:bg-opacity-90 transition"
            >
              Join the List
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Events;
