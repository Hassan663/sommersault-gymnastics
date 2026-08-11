import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

/**
 * Cross-fades page content on route change.
 *
 * Deliberately short and opacity-led: a long or sliding transition delays the
 * content people navigated for. Admin keeps its own in-panel transitions, so
 * it opts out.
 */
const PageTransition = ({ children }) => {
  const { pathname } = useLocation();
  const reduced = useReducedMotion();

  if (reduced || pathname.startsWith('/admin')) return <>{children}</>;

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
