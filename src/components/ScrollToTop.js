import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Route changes keep the previous scroll offset by default, which lands you
// mid-page on every navigation. Reset to the top whenever the path changes.
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
