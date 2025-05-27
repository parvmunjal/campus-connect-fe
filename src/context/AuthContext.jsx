import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: null,
    userId: null,
    role: null, 
  });

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUserId = localStorage.getItem('userId');
    const storedRole = localStorage.getItem('role');

    if (storedToken && storedUserId && storedRole) {
      setAuth({
        token: storedToken,
        userId: parseInt(storedUserId),
        role: storedRole,
      });
    }
  }, []);

  const login = ({ token, userId, role }) => {
    setAuth({ token, userId, role }); 
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    localStorage.setItem('role', role); 
  };

  const logout = () => {
    setAuth({ token: null, userId: null, role: null }); 
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('role'); 
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
