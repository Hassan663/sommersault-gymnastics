import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useMotion } from '../lib/motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faCalendarCheck } from '@fortawesome/free-solid-svg-icons';

const StickyEnrollCTA = () => {
  const m = useMotion();
  const [show, setShow] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const location = useLocation();

  // The bar is a marketing CTA; it has no place over the admin CRM.
  const isAdmin = location.pathname.startsWith('/admin');

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const closeModal = () => {
    setShowForm(false);
    setSubmitted(false);
  };

  if (isAdmin) return null;

  return (
    <>
      <AnimatePresence>
        {show && !showForm && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 bg-cta-warm text-ink px-5 sm:px-8 py-4 shadow-card z-40"
          >
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
              <div>
                <h3 className="font-extrabold text-base sm:text-lg text-ink">Ready to get started?</h3>
                <p className="text-xs sm:text-sm text-ink/70">Book a free trial class today</p>
              </div>
              <div className="flex gap-4 items-center">
                <motion.button
                  onClick={() => setShowForm(true)}
                  className="bg-magenta text-white px-7 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider flex items-center gap-2 whitespace-nowrap"
                  whileHover={{ backgroundColor: '#8E1449', scale: 1.05 }}
                  whileTap={m.pressable}
                >
                  <FontAwesomeIcon icon={faCalendarCheck} />
                  <span className="hidden sm:inline">Book Trial Class</span>
                  <span className="sm:hidden">Book Trial</span>
                </motion.button>
                <button
                  onClick={() => setShow(false)}
                  className="text-ink opacity-60 hover:opacity-100 transition"
                  aria-label="Dismiss"
                >
                  <FontAwesomeIcon icon={faXmark} size="lg" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trial Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-5xl p-8 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-extrabold text-ink">Book a Trial Class</h2>
                <button
                  onClick={closeModal}
                  className="text-[#1D1D1B] text-opacity-50 hover:text-opacity-100 transition"
                  aria-label="Close"
                >
                  <FontAwesomeIcon icon={faXmark} size="lg" />
                </button>
              </div>

              {submitted ? (
                <div className="bg-cream border-2 border-peach rounded-4xl p-6 text-center">
                  <p className="text-ink font-extrabold text-lg mb-2">Request received!</p>
                  <p className="text-body text-sm">
                    We'll call within one business day to confirm a time.
                  </p>
                </div>
              ) : (
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <input
                    type="text"
                    required
                    placeholder="Child's Name"
                    className="w-full px-5 py-3 rounded-full bg-cream text-sm text-ink border-2 border-transparent focus:outline-none focus:border-magenta transition"
                  />
                  <input
                    type="number"
                    required
                    min="2"
                    max="18"
                    placeholder="Age"
                    className="w-full px-5 py-3 rounded-full bg-cream text-sm text-ink border-2 border-transparent focus:outline-none focus:border-magenta transition"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Parent Email"
                    className="w-full px-5 py-3 rounded-full bg-cream text-sm text-ink border-2 border-transparent focus:outline-none focus:border-magenta transition"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Phone"
                    className="w-full px-5 py-3 rounded-full bg-cream text-sm text-ink border-2 border-transparent focus:outline-none focus:border-magenta transition"
                  />
                  <button
                    type="submit"
                    className="w-full bg-magenta text-white py-3.5 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-magenta-dark transition"
                  >
                    Schedule Trial
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default StickyEnrollCTA;
