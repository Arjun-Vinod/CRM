import React from 'react';

function AdminNavbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-10 flex justify-between items-center bg-primary text-white p-4 shadow-md">
      <div className="flex items-center">
        <span className="text-xl font-bold">Institution Name</span>
      </div>
      <div className="flex items-center">
        <span className="text-base mr-4">Admin</span>
        <img
          src="/profile-placeholder.png" // Use local image
          alt="Admin Profile"
          className="w-10 h-10 rounded-full"
        />
      </div>
    </nav>
  );
}

export default AdminNavbar;