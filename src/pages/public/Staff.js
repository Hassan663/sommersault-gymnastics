import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageHero from '../../components/PageHero';
import { EASE, useMotion } from '../../lib/motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { coaches as coachPhotos, people, cutouts } from '../../assets/photos';

const Staff = () => {
  const m = useMotion();
  const [selectedCoach, setSelectedCoach] = useState(null);

  const coaches = [
    {
      name: 'Sommer',
      photo: coachPhotos[0],
      title: 'Founder & Head Coach',
      experience: '20+ years',
      specialties: 'All apparatus, Program design',
      bio: 'Sommer founded Sommersault with a mission to create a gymnastics environment where every child feels supported while being challenged. Her coaching philosophy centers on building confidence first, skills second.',
      certifications: 'USA Gymnastics Coach, SafeSport',
      philosophy: '"I believe every child has potential. Our job is to unlock it safely and joyfully."',
    },
    {
      name: 'Emily Carter',
      photo: coachPhotos[1],
      title: 'Recreational Gymnastics Coach',
      experience: '8 years',
      specialties: 'Beginner progression, Floor exercise',
      bio: 'Emily specializes in building fundamental skills and making gymnastics fun. She loves seeing kids gain confidence in their first classes.',
      certifications: 'USA Gymnastics Coach, CPR/First Aid',
      philosophy: '"Every flip is a confidence builder."',
    },
    {
      name: 'Madison Reed',
      photo: coachPhotos[2],
      title: 'Tumbling & Skills Coach',
      experience: '12 years',
      specialties: 'Tumbling, Aerial skills, Strength',
      bio: "Madison is a former competitive gymnast who brings competitive spirit to our intermediate classes. She's passionate about skill progression and athlete safety.",
      certifications: 'USA Gymnastics Coach, Strength Specialist',
      philosophy: '"Progress over perfection."',
    },
    {
      name: 'Jessica Brooks',
      photo: coachPhotos[3],
      title: 'Preschool Gymnastics Instructor',
      experience: '6 years',
      specialties: 'Ages 2-4, Movement fundamentals',
      bio: 'Jessica creates a warm, playful environment for our youngest gymnasts. She focuses on coordination, spatial awareness, and fostering a love of movement.',
      certifications: 'Early Childhood Education, CPR',
      philosophy: '"Play is learning. Movement is joy."',
    },
    {
      name: 'Taylor Morgan',
      photo: coachPhotos[4],
      title: 'Competitive Team Coach',
      experience: '15 years',
      specialties: 'Competition prep, Advanced training',
      bio: 'Taylor has trained competitive athletes to regional and state championships. She combines technical excellence with positive mentorship.',
      certifications: 'USA Gymnastics Coach, Competition Specialist',
      philosophy: '"Champions are built on fundamentals and character."',
    },
  ];

  return (
    <div className="min-h-screen bg-cream pb-20">
      <PageHero
        lightLine="Behind every flip"
        boldLine="is a coach who cares"
        
        tagline="certified and background-checked"
        body="Our coaches are USA Gymnastics certified, SafeSport trained and current in CPR and first aid — and every one of them is here because they love teaching kids."
        photo={cutouts.beamWalk}
        photoAlt=""
        
      />

      <div className="max-w-7xl mx-auto px-4">

{/* Team photo */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          className="media-zoom rounded-5xl overflow-hidden mb-16 shadow-soft"
        >
          <img
            src={people.teamCoaches}
            alt="The full Sommersault coaching team"
            className="w-full h-64 sm:h-80 object-cover"
            style={{ objectPosition: 'center 30%' }}
          />
        </motion.div>

        {/* Staff Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coaches.map((coach, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: EASE }}
              whileHover={m.liftCard}
              onClick={() => setSelectedCoach(coach)}
              className="bg-white rounded-4xl overflow-hidden shadow-soft cursor-pointer flex flex-col border-l-4 border-[#FBDCC0]"
            >
              {/* Avatar */}
              <div className="media-zoom h-60 overflow-hidden">
                <img
                  src={coach.photo}
                  alt={`${coach.name}, ${coach.title}`}
                  loading="lazy"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: 'center 22%' }}
                />
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col flex-1">
                <h3 className="text-2xl font-extrabold text-ink mb-1">{coach.name}</h3>
                <p className="text-magenta font-semibold mb-4">{coach.title}</p>

                <div className="space-y-2 mb-6 text-sm text-body">
                  <p>
                    <strong>Experience:</strong> {coach.experience}
                  </p>
                  <p>
                    <strong>Specialties:</strong> {coach.specialties}
                  </p>
                </div>

                <motion.button
                  className="w-full mt-auto bg-[#B01B5E] text-white py-2 rounded-lg font-bold hover:bg-[#8E1449] transition"
                  whileHover={m.growSlight}
                  whileTap={m.pressable}
                >
                  View Full Profile
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Profile Modal */}
      <AnimatePresence>
        {selectedCoach && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedCoach(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-4xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start gap-5 mb-6">
                <div className="flex items-center gap-5">
                  <img
                    src={selectedCoach.photo}
                    alt=""
                    className="hidden sm:block w-20 h-20 rounded-full object-cover shrink-0"
                    style={{ objectPosition: 'center 20%' }}
                  />
                  <div>
                  <h2 className="text-3xl font-extrabold text-ink mb-2">{selectedCoach.name}</h2>
                  <p className="text-magenta font-semibold">{selectedCoach.title}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCoach(null)}
                  className="text-ink text-opacity-50 hover:text-opacity-100 transition"
                  aria-label="Close"
                >
                  <FontAwesomeIcon icon={faXmark} size="lg" />
                </button>
              </div>

              <div className="space-y-4 text-ink">
                <p className="leading-relaxed">{selectedCoach.bio}</p>

                <div className="bg-shell p-4 rounded-2xl">
                  <p className="font-extrabold text-ink mb-2">Experience</p>
                  <p>{selectedCoach.experience}</p>
                </div>

                <div className="bg-shell p-4 rounded-2xl">
                  <p className="font-extrabold text-ink mb-2">Certifications</p>
                  <p>{selectedCoach.certifications}</p>
                </div>

                <div className="bg-shell p-4 rounded-2xl border-l-4 border-[#F7B183]">
                  <p className="italic">{selectedCoach.philosophy}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Staff;
