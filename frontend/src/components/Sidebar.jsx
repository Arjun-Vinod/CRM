import React from 'react';
import { FaHome, FaTachometerAlt, FaUserGraduate, FaBook, FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Sidebar({ isOpen, setIsOpen }) {
  const menuItems = [
    { name: 'Home', icon: <FaHome />, path: '/' },
    { name: 'Dashboard', icon: <FaTachometerAlt />, path: '/dashboard' },
    { name: 'Admission', icon: <FaUserGraduate />, path: '/admission' },
    { name: 'Courses', icon: <FaBook />, path: '/courses' },
  ];

  return (
    <div
      className={`fixed left-0 top-[56px] h-[calc(100vh-56px)] bg-gray-100 text-primary transition-all duration-300 z-10 shadow-lg ${
        isOpen ? 'w-64' : 'w-16'
      }`}
    >
      {/* Header with Toggle */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {isOpen && <span className="text-xl font-semibold text-primary">Menu</span>}
        <FaBars
          className="cursor-pointer text-2xl text-primary hover:text-secondary"
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>

      {/* Menu Items */}
      <ul className="mt-4 space-y-2 px-2">
        {menuItems.map((item) => (
          <li key={item.name}>
            <Link
              to={item.path}
              className={`flex items-center w-full p-3 rounded-lg text-white bg-primary hover:bg-secondary transition-colors duration-200 ${
                isOpen ? 'justify-start' : 'justify-center'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {isOpen && <span className="ml-3 text-base">{item.name}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;