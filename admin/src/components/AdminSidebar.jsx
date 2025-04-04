import React from 'react';
import { NavLink } from 'react-router-dom';

function AdminSidebar() {
  return (
    <div className="w-64 bg-bgSoft text-textDark h-full fixed top-0 left-0 shadow-[4px_0_6px_-1px_rgba(0,0,0,0.1)]">
      <div className="p-6 pt-20">
        <h2 className="text-xl font-bold mb-8 text-primary">Admin Panel</h2>
        <ul className="space-y-4">
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `block bg-primary text-white font-medium p-3 rounded transition-colors duration-200 ${
                  isActive
                    ? 'bg-secondary text-white'
                    : 'hover:bg-secondary text-textDark'
                }`
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admissions"
              className={({ isActive }) =>
                `block bg-primary text-white font-medium p-3 rounded transition-colors duration-200 ${
                  isActive
                    ? 'bg-secondary text-white'
                    : 'hover:bg-secondary text-textDark'
                }`
              }
            >
              Admissions
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/leads"
              className={({ isActive }) =>
                `block bg-primary text-white font-medium p-3 rounded transition-colors duration-200 ${
                  isActive
                    ? 'bg-secondary text-white'
                    : 'hover:bg-secondary text-textDark'
                }`
              }
            >
              Leads
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default AdminSidebar;