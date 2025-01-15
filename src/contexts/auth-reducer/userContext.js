import React, { createContext, useState, useContext } from 'react';

// Create a Context for the user data
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Initial state is null for no user logged in

  // Function to log in a user
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData)); // Save to localStorage (optional)
  };

  // Function to log out the user
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user'); // Remove from localStorage (optional)
  };

  // Load user data from localStorage (optional)
  React.useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext);
