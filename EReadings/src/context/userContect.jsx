import React, { createContext, useState, useEffect } from 'react';

// Create a context for the user
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    // Get user details from localStorage on initial load
    const storedUserDetails = JSON.parse(localStorage.getItem('loggedInUser'));
    if (storedUserDetails) {
      setUserDetails(storedUserDetails);
    }
  }, []);

  // Function to log in
  const login = (user) => {
    localStorage.setItem('loggedInUser', JSON.stringify(user));
    setUserDetails(user);
  };

  // Function to log out
  const logout = () => {
    localStorage.removeItem('loggedInUser');
    setUserDetails(null);
  };

  return (
    <UserContext.Provider value={{ userDetails, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
