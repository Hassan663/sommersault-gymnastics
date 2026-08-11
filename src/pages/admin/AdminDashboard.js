import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartLine,
  faUsers,
  faGraduationCap,
  faCreditCard,
  faClipboardCheck,
  faGear,
  faBars,
  faCalendarCheck,
} from '@fortawesome/free-solid-svg-icons';
import AdminSidebar from '../../components/AdminSidebar';
import { ToastProvider } from '../../components/admin';
import AdminStats from './AdminStats';
import AdminStudents from './AdminStudents';
import AdminClasses from './AdminClasses';
import AdminPayments from './AdminPayments';
import AdminAttendance from './AdminAttendance';
import AdminTrials from './AdminTrials';
import AdminSettings from './AdminSettings';

const TABS = [
  { id: 'overview', label: 'Dashboard', icon: faChartLine },
  { id: 'trials', label: 'Trial Requests', icon: faCalendarCheck },
  { id: 'students', label: 'Students', icon: faUsers },
  { id: 'classes', label: 'Classes', icon: faGraduationCap },
  { id: 'payments', label: 'Payments', icon: faCreditCard },
  { id: 'attendance', label: 'Attendance', icon: faClipboardCheck },
  { id: 'settings', label: 'Settings', icon: faGear },
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <AdminStats onNavigate={setActiveTab} />;
      case 'trials':
        return <AdminTrials />;
      case 'students':
        return <AdminStudents />;
      case 'classes':
        return <AdminClasses />;
      case 'payments':
        return <AdminPayments />;
      case 'attendance':
        return <AdminAttendance />;
      case 'settings':
        return <AdminSettings />;
      default:
        return <AdminStats onNavigate={setActiveTab} />;
    }
  };

  const activeLabel = TABS.find((t) => t.id === activeTab)?.label ?? 'Dashboard';

  return (
    <ToastProvider>
      <div className="min-h-screen bg-cream flex">
        <AdminSidebar
          tabs={TABS}
          activeTab={activeTab}
          onSelect={setActiveTab}
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <div className="flex-1 min-w-0">
          <div className="max-w-[84rem] mx-auto px-4 sm:px-8 py-8">
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 flex items-center gap-4"
            >
              <button
                className="lg:hidden text-magenta text-xl"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open admin menu"
              >
                <FontAwesomeIcon icon={faBars} />
              </button>
              <h1 className="text-xs font-bold uppercase tracking-[0.18em] text-magenta">
                Admin portal <span className="text-body/60">/ {activeLabel}</span>
              </h1>
            </motion.div>

            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-4xl shadow-soft p-5 sm:p-8"
            >
              {renderContent()}
            </motion.div>
          </div>
        </div>
      </div>
    </ToastProvider>
  );
};

export default AdminDashboard;
