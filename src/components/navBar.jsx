import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaBook, FaUser, FaCog } from 'react-icons/fa';

const VerticalNavBar = () => {
  return (
    <div className="h-full min-h-screen w-64 bg-gray-900 text-white flex flex-col justify-between shadow-lg">
      {/* Logo Section */}
      <div className="flex items-center justify-center h-20 border-b border-gray-700">
        <h1 className="text-2xl font-bold uppercase">My App</h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex-grow">
        <ul className="flex flex-col">
          <NavItem to="/home" label="Home" icon={<FaHome />} />
          <NavItem to="/books" label="Books" icon={<FaBook />} />
          <NavItem to="/profile" label="Profile" icon={<FaUser />} />
          <NavItem to="/settings" label="Settings" icon={<FaCog />} />
        </ul>
      </nav>

      {/* Footer Section */}
      <div className="p-4 border-t border-gray-700">
        <p className="text-sm text-gray-400 text-center">© 2025 My App</p>
      </div>
    </div>
  );
};

const NavItem = ({ to, label, icon }) => {
  return (
    <li className="group">
      <NavLink
        to={to}
        className={({ isActive }) =>
          `flex items-center gap-4 py-4 px-6 text-sm font-medium hover:bg-gray-800 ${
            isActive ? 'bg-gray-800 text-blue-400' : 'text-gray-400'
          }`
        }
      >
        <span className="text-lg">{icon}</span>
        <span className="group-hover:text-white">{label}</span>
      </NavLink>
    </li>
  );
};

export default VerticalNavBar;
