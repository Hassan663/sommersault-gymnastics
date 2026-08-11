import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInstagram,
  faFacebookF,
  faWhatsapp,
  faTelegram,
} from '@fortawesome/free-brands-svg-icons';
import logo from '../assets/logos/logo-horizontal.png';

const Footer = () => {
  const location = useLocation();
  if (location.pathname.startsWith('/admin')) return null;

  const columns = [
    {
      title: 'Programmes',
      links: [
        { name: 'Classes', path: '/classes' },
        { name: 'Schedule & Pricing', path: '/schedule-pricing' },
        { name: 'Events & Camps', path: '/events' },
        { name: 'Facility', path: '/facility' },
      ],
    },
    {
      title: 'Our Gym',
      links: [
        { name: 'About', path: '/about' },
        { name: 'Coaches', path: '/staff' },
        { name: 'Credentials', path: '/credentials' },
        { name: 'FAQ', path: '/faq' },
      ],
    },
  ];

  const socials = [
    { icon: faInstagram, label: 'Instagram' },
    { icon: faFacebookF, label: 'Facebook' },
    { icon: faWhatsapp, label: 'WhatsApp' },
    { icon: faTelegram, label: 'Telegram' },
  ];

  return (
    <footer className="bg-cream px-4 sm:px-8 pb-28">
      <div className="max-w-[88rem] mx-auto bg-white rounded-5xl px-6 sm:px-12 py-14 shadow-soft">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <img src={logo} alt="Sommer's Sault Gymnastics" className="h-10 mb-5" />
            <p className="text-sm text-body leading-relaxed mb-6 max-w-xs">
              Confidence-first gymnastics coaching for ages 2–18, in a gym built around safe
              progression.
            </p>
            <div className="flex gap-2.5">
              {socials.map(({ icon, label }) => (
                <motion.a
                  key={label}
                  href="#"
                  aria-label={label}
                  title={label}
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.94 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="w-9 h-9 rounded-full bg-magenta text-white flex items-center justify-center text-sm hover:bg-magenta-dark transition-colors"
                >
                  <FontAwesomeIcon icon={icon} />
                </motion.a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-extrabold text-ink uppercase tracking-wider mb-4">
                {col.title}
              </h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="link-sweep inline-block text-sm text-body hover:text-magenta transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h3 className="text-sm font-extrabold text-ink uppercase tracking-wider mb-4">
              Visit Us
            </h3>
            <address className="not-italic text-sm text-body leading-relaxed space-y-2 mb-5">
              <p>
                2847 Fitness Boulevard
                <br />
                Your City, State 12345
              </p>
              <p>
                <a href="tel:5551234567" className="hover:text-magenta transition-colors">
                  +1 (555) 123-4567
                </a>
              </p>
              <p>
                <a
                  href="mailto:hello@sommersault.gym"
                  className="hover:text-magenta transition-colors"
                >
                  hello@sommersault.gym
                </a>
              </p>
            </address>
            <Link to="/contact">
              <span className="shine inline-flex px-7 py-3 rounded-full bg-magenta text-white text-xs font-bold uppercase tracking-wider hover:bg-magenta-dark transition-colors">
                Book a trial
              </span>
            </Link>
          </div>
        </div>

        <div className="border-t border-cream pt-7 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-body">
          <p>&copy; {new Date().getFullYear()} Sommersault Gymnastics. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <p>Building champions, one flip at a time.</p>
            <Link to="/admin" className="hover:text-magenta transition-colors">
              Staff Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
