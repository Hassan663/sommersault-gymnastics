import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark, faPhone } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/logos/logo-horizontal.png';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  // Primary nav kept to five items so the bar stays quiet; everything else
  // lives in the footer and the "More" sheet.
  const primary = [
    { name: 'Classes', path: '/classes' },
    { name: 'Schedule', path: '/schedule-pricing' },
    { name: 'Coaches', path: '/staff' },
    { name: 'Facility', path: '/facility' },
    { name: 'About', path: '/about' },
  ];

  const secondary = [
    { name: 'Home', path: '/' },
    { name: 'Credentials', path: '/credentials' },
    { name: 'Events', path: '/events' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  if (isAdmin) return null;

  return (
    <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm">
      <div className="max-w-[88rem] mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between gap-8 py-4">
          {/* Logo */}
          <Link to="/" className="shrink-0" aria-label="Sommersault Gymnastics — home">
            <motion.img
              src={logo}
              alt="Sommersault Gymnastics"
              className="h-14 sm:h-16 w-auto"
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            />
          </Link>

          {/* Primary nav */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
            {primary.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                data-active={isActive(link.path)}
                className={`link-sweep text-sm font-semibold transition-colors ${
                  isActive(link.path) ? 'text-magenta' : 'text-ink hover:text-magenta'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-sm font-semibold text-ink hover:text-magenta transition-colors"
              aria-expanded={mobileOpen}
            >
              More
            </button>
          </nav>

          {/* Phone + CTA */}
          <div className="flex items-center gap-4 shrink-0">
            <a
              href="tel:5551234567"
              className="hidden xl:flex items-center gap-2 text-sm font-bold text-ink hover:text-magenta transition-colors"
            >
              <FontAwesomeIcon icon={faPhone} className="text-xs text-magenta" />
              (555) 123-4567
            </a>
            <Link to="/contact" className="hidden sm:block">
              <motion.span
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="shine inline-block px-7 py-3 rounded-full bg-magenta text-white text-xs font-bold uppercase tracking-wider hover:bg-magenta-dark transition-colors"
              >
                Book a trial
              </motion.span>
            </Link>

            <button
              className="lg:hidden text-magenta text-xl"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              <FontAwesomeIcon icon={mobileOpen ? faXmark : faBars} />
            </button>
          </div>
        </div>

        {/* Expanded menu — full list on mobile, the remaining pages on desktop */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="pb-6 pt-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                {[...primary, ...secondary]
                  .filter((l, i, arr) => arr.findIndex((x) => x.path === l.path) === i)
                  .map((link, i) => (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                    <Link to={link.path} onClick={() => setMobileOpen(false)}>
                      <div
                        className={`px-4 py-2.5 rounded-2xl text-sm font-semibold transition-colors ${
                          isActive(link.path)
                            ? 'bg-peach-light text-magenta'
                            : 'text-ink hover:bg-shell'
                        }`}
                      >
                        {link.name}
                      </div>
                    </Link>
                    </motion.div>
                  ))}
              </div>
              <Link to="/contact" onClick={() => setMobileOpen(false)} className="sm:hidden">
                <div className="mb-6 px-4 py-3 rounded-full bg-magenta text-white text-center text-xs font-bold uppercase tracking-wider">
                  Book a trial
                </div>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Navbar;
