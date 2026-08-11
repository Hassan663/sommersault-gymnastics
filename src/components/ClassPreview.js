import React from 'react';
import { motion } from 'framer-motion';
import { useMotion } from '../lib/motion';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faChildReaching,
  faPersonFalling,
  faStar,
  faTrophy,
  faArrowsRotate,
  faMedal,
} from '@fortawesome/free-solid-svg-icons';

const ClassPreview = () => {
  const m = useMotion();
  const classes = [
    { name: 'Tiny Tumblers', age: 'Ages 2–4', duration: '45 min', price: '$65', icon: faChildReaching },
    { name: 'Beginner Gymnastics', age: 'Ages 5–8', duration: '60 min', price: '$85', icon: faPersonFalling },
    { name: 'Intermediate Gymnastics', age: 'Ages 9–12', duration: '75 min', price: '$105', icon: faStar },
    { name: 'Advanced Training', age: 'Ages 13+', duration: '90 min', price: '$125', icon: faTrophy },
    { name: 'Tumbling & Skills', age: 'Ages 6–10', duration: '60 min', price: '$95', icon: faArrowsRotate },
    { name: 'Competitive Team', age: 'By Invitation', duration: 'Flexible', price: 'TBD', icon: faMedal },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {classes.map((cls, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ delay: (i % 3) * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          whileHover={m.liftCard}
          className="group bg-white rounded-4xl p-8 shadow-soft flex flex-col"
        >
          <div className="w-14 h-14 rounded-full bg-card-warm flex items-center justify-center mb-5 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110 group-hover:rotate-6">
            <FontAwesomeIcon icon={cls.icon} className="text-lg text-magenta" />
          </div>
          <h3 className="text-xl font-extrabold text-ink mb-1">{cls.name}</h3>
          <p className="text-magenta text-sm font-semibold mb-5">{cls.age}</p>

          <div className="flex items-baseline gap-2 mb-6 pb-6 border-b border-cream">
            <span className="text-2xl font-extrabold text-ink">{cls.price}</span>
            <span className="text-xs text-body">/ month · {cls.duration}</span>
          </div>

          <Link to="/classes" className="mt-auto">
            <span className="inline-flex items-center gap-2 text-sm font-bold text-magenta">
              View class
              <FontAwesomeIcon icon={faArrowRight} className="nudge-x text-xs" />
            </span>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

export default ClassPreview;
