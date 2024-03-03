// UserContext.js
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

const userRole = localStorage.getItem('user');
  const loginUser = (userData) => {
    setUser(localStorage.setItem('user', userData));
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <UserContext.Provider value={{userRole, user, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};
