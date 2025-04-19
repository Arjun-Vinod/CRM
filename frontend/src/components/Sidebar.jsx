// src/components/Sidebar.jsx
import React from 'react';
import { FaHome, FaTachometerAlt, FaUserGraduate, FaBook, FaMoneyBill } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Sidebar({ isOpen, setIsOpen }) {
  const menuItems = [
    { name: 'Home', icon: <FaHome />, path: '/' },
    { name: 'Dashboard', icon: <FaTachometerAlt />, path: '/dashboard' },
    { name: 'Admission', icon: <FaUserGraduate />, path: '/admission' },
    { name: 'Courses', icon: <FaBook />, path: '/course-details' },
    { name: 'Payment', icon: <FaMoneyBill />, path: '/payment' },
  ];

  return (
    <div
      className={`fixed top-16 h-[calc(100vh-64px)] bg-white text-primary shadow-lg transition-all duration-300 z-10 ${
        isOpen ? 'w-64' : 'w-0 overflow-hidden'
      }`}
    >
      <ul className="mt-8 space-y-3 px-4">
        {menuItems.map((item) => (
          <li key={item.name}>
            <Link
              to={item.path}
              className="flex items-center p-2 rounded-md bg-gray-100 text-primary hover:bg-secondary hover:text-white transition-all duration-200"
              onClick={() => setIsOpen(false)}
            >
              <span className="text-xl">{item.icon}</span>
              {isOpen && <span className="ml-4 text-base font-medium">{item.name}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;