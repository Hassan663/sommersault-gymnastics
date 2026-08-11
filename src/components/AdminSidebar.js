import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const AdminSidebar = ({ tabs, activeTab, onSelect, open, onClose }) => (
  <>
    {/* Mobile scrim */}
    {open && (
      <div
        className="fixed inset-0 bg-black bg-opacity-40 z-30 lg:hidden"
        onClick={onClose}
        aria-hidden="true"
      />
    )}

    <aside
      className={`fixed lg:sticky top-0 left-0 z-40 h-screen w-64 shrink-0 bg-magenta text-white flex flex-col transition-transform duration-300 ${
        open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}
    >
      <div className="p-6 border-b border-white/20">
        <p className="text-xl font-bold">Sommersault</p>
        <p className="text-sm text-white text-opacity-75">Admin Portal</p>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <motion.button
              key={tab.id}
              onClick={() => {
                onSelect(tab.id);
                onClose();
              }}
              whileHover={{ x: 4 }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left transition ${
                isActive
                  ? 'bg-white text-magenta font-extrabold'
                  : 'text-white hover:bg-white/15'
              }`}
            >
              <FontAwesomeIcon icon={tab.icon} className="w-4" />
              {tab.label}
            </motion.button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/20">
        <Link to="/">
          <button className="w-full flex items-center justify-center gap-2 bg-magenta text-white py-3 rounded-full font-bold hover:bg-magenta-dark transition">
            <FontAwesomeIcon icon={faArrowLeft} />
            Back to Website
          </button>
        </Link>
      </div>
    </aside>
  </>
);

export default AdminSidebar;
