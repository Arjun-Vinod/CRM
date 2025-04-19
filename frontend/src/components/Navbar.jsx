// src/components/Navbar.jsx
import React from 'react';
import { FaBars } from 'react-icons/fa';

function Navbar({ setAuthModal, user, setUser, setSidebarOpen }) {
  const handleLogout = () => setUser(null);

  return (
    <nav className="fixed top-0 left-0 w-full bg-primary text-white p-4 shadow-md z-20">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <FaBars
            className="text-2xl cursor-pointer hover:text-secondary"
            onClick={() => setSidebarOpen(prev => !prev)}
          />
          <span className="text-xl font-semibold">Institution Name</span>
        </div>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-base">{user.name}</span>
              <img
                src="https://via.placeholder.com/40"
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-secondary"
              />
              <button
                className="bg-white text-primary px-4 py-2 rounded-md hover:bg-secondary hover:text-white transition-all duration-200 font-medium"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                className="bg-transparent border border-white px-4 py-2 rounded-md hover:bg-secondary hover:border-secondary transition-all duration-200 font-medium"
                onClick={() => setAuthModal({ open: true, type: 'login' })}
              >
                Login
              </button>
              <button
                className="bg-white text-primary px-4 py-2 rounded-md hover:bg-secondary hover:text-white transition-all duration-200 font-medium"
                onClick={() => setAuthModal({ open: true, type: 'signup' })}
              >
                Signup
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;