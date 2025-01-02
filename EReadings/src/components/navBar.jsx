import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaBook, FaUser, FaCog, FaSignInAlt, FaUserPlus } from 'react-icons/fa'; // Import additional icons for Login and Register
import { UserContext } from '../context/userContect'; // Correct the import path for the UserContext

const VerticalNavBar = () => {
  const { userDetails, logout } = useContext(UserContext); // Get userDetails and logout function from context

  return (
    <div className="h-5000 min-h-screen w-64 bg-gray-900 text-white flex flex-col justify-between shadow-lg">
      {/* Logo Section */}
      <div className="flex items-center justify-center h-20 border-b border-gray-700">
        <h1 className="text-2xl font-bold ">
        <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-2 m-10">
  <label className='text-white '>E </label>
  <label className="text-green-600 italic">Readings</label>
</h1>

          </h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex-grow">
        <ul className="flex flex-col">
          <NavItem to="/" label="Home" icon={<FaHome />} />
          {userDetails && (
          <NavItem to="/books" label="Books" icon={<FaBook />} />
        )}
          {/* Conditionally render Profile link */}
          {userDetails && (
            <NavItem to="/profile" label="Profile" icon={<FaUser />} />
          )}

         
          {/* Show Login and Register links when not logged in */}
          {!userDetails && (
            <>
              <NavItem to="/signin" label="Login" icon={<FaSignInAlt />} />
              <NavItem to="/signup" label="Register" icon={<FaUserPlus />} />
            </>
          )}
        </ul>
      </nav>

      {/* Footer Section */}
      <div className="p-4 border-t border-gray-700">
        {/* Logout button for logged-in users */}
        {userDetails && (
          <button
            onClick={logout}
            className="w-full text-center py-2 text-gray-400 hover:text-white"
          >
            Logout
          </button>
        )}
        <p className="text-sm text-gray-400 text-center">© 2025 <label className='text-white '>E </label>
        <label className="text-green-600 italic">Readings</label></p>
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
