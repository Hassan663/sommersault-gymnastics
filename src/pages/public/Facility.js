import React from 'react';
import { motion } from 'framer-motion';
import PageHero from '../../components/PageHero';
import { SectionHeading } from '../../components/ui';
import { EASE, useMotion } from '../../lib/motion';
import { facility, cutouts } from '../../assets/photos';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShieldHalved,
  faUsers,
  faHeartPulse,
  faCheck,
  faSquareParking,
  faRestroom,
  faWifi,
  faEye,
  faBuilding,
  faLayerGroup,
  faPersonRunning,
  faChildReaching,
  faCircleNodes,
  faDumbbell,
} from '@fortawesome/free-solid-svg-icons';

const Facility = () => {
  const m = useMotion();
  const zones = [
    {
      name: 'Main Training Floor',
      photo: facility.beam,
      desc: 'Spring floor with 6 tumbling lanes',
      icon: faBuilding,
      features: ['Professional spring flooring', 'Shock-absorbing mats', 'Large training area'],
    },
    {
      name: 'Bars & Beam Zone',
      photo: facility.bars,
      desc: 'Complete apparatus for all levels',
      icon: faLayerGroup,
      features: ['Uneven bars', 'Balance beams', 'Adjustable heights'],
    },
    {
      name: 'Vault Area',
      photo: facility.vault,
      desc: 'Olympic-standard vault equipment',
      icon: faPersonRunning,
      features: ['Spring table vault', 'Landing mats', 'Run-up track'],
    },
    {
      name: 'Preschool Zone',
      photo: facility.preschool,
      desc: 'Safe training for ages 2-4',
      icon: faChildReaching,
      features: ['Soft-play apparatus', 'Low beams and bars', 'Separated from main floor'],
    },
    {
      name: 'Foam Pit & Trampoline',
      photo: facility.foampit,
      desc: 'Safe skill progression area',
      icon: faCircleNodes,
      features: ['Deep foam pit', 'In-ground trampoline', 'Resi landing mat'],
    },
    {
      name: 'Conditioning Area',
      photo: facility.conditioning,
      desc: 'Strength and flexibility training',
      icon: faDumbbell,
      features: ['Stretching zone', 'Strength equipment', 'Injury-prevention programming'],
    },
  ];

  const safety = [
    {
      icon: faShieldHalved,
      title: 'Equipment Safety',
      desc: 'All apparatus inspected monthly and maintained to USA Gymnastics standards.',
    },
    {
      icon: faUsers,
      title: 'Low Coach-to-Athlete Ratio',
      desc: 'Classes capped at 8–12 athletes so every gymnast is properly spotted.',
    },
    {
      icon: faHeartPulse,
      title: 'Trained for Emergencies',
      desc: 'Every coach holds current CPR and first-aid certification.',
    },
  ];

  const amenities = [
    { icon: faEye, label: 'Parent viewing area' },
    { icon: faSquareParking, label: 'Free on-site parking' },
    { icon: faRestroom, label: 'Family changing rooms' },
    { icon: faWifi, label: 'Free guest Wi-Fi' },
  ];

  return (
    <div className="min-h-screen bg-cream pb-20">
      <PageHero
        lightLine="A facility built"
        boldLine="around safe progression"
        tail="from first flip to competition"
        tagline="inspected monthly"
        body="Spring floor, foam pit, dedicated preschool zone and a parent viewing area with sightlines to the whole gym."
        photo={cutouts.beamHandstand}
        photoAlt=""
        
      />

      <div className="max-w-7xl mx-auto px-4">

{/* Tour banner */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-70px' }}
          transition={{ duration: 0.8, ease: EASE }}
          className="media-zoom rounded-5xl overflow-hidden mb-16 shadow-soft"
        >
          <img
            src={facility.lobby}
            alt="The Sommersault welcome lobby"
            className="w-full h-64 sm:h-[22rem] object-cover"
            style={{ objectPosition: 'center 45%' }}
          />
        </motion.div>

        {/* Zones */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {zones.map((zone, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-70px' }}
              transition={{ delay: (i % 3) * 0.1, duration: 0.6, ease: EASE }}
              whileHover={m.liftCard}
              className="bg-shell rounded-4xl overflow-hidden shadow-soft border-l-4 border-[#F7B183]"
            >
              <div className="media-zoom h-48 overflow-hidden">
                <img
                  src={zone.photo}
                  alt={zone.name}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="flex items-center gap-3 text-2xl font-extrabold text-ink mb-2">
                  <FontAwesomeIcon icon={zone.icon} className="text-base text-magenta" />
                  {zone.name}
                </h3>
                <p className="text-body mb-6">{zone.desc}</p>
                <ul className="space-y-2">
                  {zone.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-ink">
                      <FontAwesomeIcon icon={faCheck} className="text-magenta mt-1" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Safety */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-70px' }}
          className="mb-20"
        >
          <SectionHeading light="Safety" bold="comes first" className="mb-10" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {safety.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-70px' }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: EASE }}
                className="bg-white rounded-4xl p-8 shadow-soft text-center"
              >
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-soft">
                  <FontAwesomeIcon icon={item.icon} className="text-3xl text-[#F7B183]" />
                </div>
                <h3 className="text-xl font-extrabold text-ink mb-2">{item.title}</h3>
                <p className="text-body">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Amenities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-70px' }}
          className="bg-white rounded-4xl shadow-soft p-8 md:p-12 mb-16"
        >
          <SectionHeading light="Built for" bold="families too" className="mb-10" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {amenities.map((item) => (
              <div key={item.label} className="text-center">
                <FontAwesomeIcon icon={item.icon} className="text-3xl text-magenta mb-3" />
                <p className="font-semibold text-ink">{item.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Spaces for families */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-70px' }}
          transition={{ duration: 0.8, ease: EASE }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {[
            { src: facility.viewing, label: 'Parent viewing area' },
            { src: facility.proshop, label: 'Pro shop' },
            { src: facility.vaultWide, label: 'Vault run and landing zone' },
          ].map((item) => (
            <div key={item.label} className="group">
              <div className="media-zoom rounded-4xl overflow-hidden shadow-soft mb-3">
                <img
                  src={item.src}
                  alt={item.label}
                  loading="lazy"
                  className="w-full h-52 object-cover"
                />
              </div>
              <p className="text-sm font-bold text-ink">{item.label}</p>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-70px' }}
          className="bg-gradient-to-r from-[#F7B183] to-[#FBDCC0] rounded-4xl p-12 text-center text-ink"
        >
          <h2 className="text-3xl font-bold mb-4">Come See It For Yourself</h2>
          <p className="text-lg text-body mb-8 max-w-2xl mx-auto">
            Book a free trial class and tour the facility with one of our coaches.
          </p>
          <Link to="/contact">
            <motion.button
              whileHover={m.growSlight}
              whileTap={m.pressable}
              className="bg-[#B01B5E] text-white px-8 py-3 rounded-full font-bold hover:bg-[#8E1449] transition"
            >
              Book a Trial Class
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Facility;
