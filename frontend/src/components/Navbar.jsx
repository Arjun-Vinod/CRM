import React from 'react';
import { FaBars } from 'react-icons/fa';

function Navbar({ setAuthModal, user, setUser, setSidebarOpen }) {
  const handleLogout = () => {
    setUser(null);
  };

  return (
    <nav className="fixed top-0 left-0 w-full flex justify-between items-center bg-primary text-white p-4 z-10">
      <div className="flex items-center">
        <span className="text-xl">Institution Name</span>
      </div>
      <div className="flex items-center">
        {user ? (
          <>
            <span className="text-base mr-4">{user.name}</span>
            <img
              src="https://via.placeholder.com/40"
              alt="Profile"
              className="w-10 h-10 rounded-full mr-4"
            />
            <button
              className="bg-white text-primary border border-primary px-4 py-2 rounded hover:bg-secondary hover:text-white text-base"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              className="bg-primary text-white px-4 py-2 rounded mr-2 hover:bg-secondary text-base"
              onClick={() => setAuthModal({ open: true, type: 'login' })}
            >
              Login
            </button>
            <button
              className="bg-white text-primary border border-primary px-4 py-2 rounded hover:bg-secondary hover:text-white text-base"
              onClick={() => setAuthModal({ open: true, type: 'signup' })}
            >
              Signup
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;