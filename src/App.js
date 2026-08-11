import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import StickyEnrollCTA from './components/StickyEnrollCTA';
import ScrollToTop from './components/ScrollToTop';
import PageTransition from './components/PageTransition';
import { AdminDataProvider } from './context/AdminDataContext';

// Public Pages
import Home from './pages/public/Home';
import About from './pages/public/About';
import Staff from './pages/public/Staff';
import Classes from './pages/public/Classes';
import SchedulePricing from './pages/public/SchedulePricing';
import Facility from './pages/public/Facility';
import Credentials from './pages/public/Credentials';
import Events from './pages/public/Events';
import FAQ from './pages/public/FAQ';
import Contact from './pages/public/Contact';

// Admin
import AdminDashboard from './pages/admin/AdminDashboard';

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <AdminDataProvider>
        <Router>
          <ScrollToTop />
          <Navbar />
          <PageTransition>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/staff" element={<Staff />} />
              <Route path="/classes" element={<Classes />} />
              <Route path="/schedule-pricing" element={<SchedulePricing />} />
              <Route path="/facility" element={<Facility />} />
              <Route path="/credentials" element={<Credentials />} />
              <Route path="/events" element={<Events />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin/*" element={<AdminDashboard />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </PageTransition>
          <StickyEnrollCTA />
          <Footer />
        </Router>
      </AdminDataProvider>
    </MotionConfig>
  );
}

export default App;
