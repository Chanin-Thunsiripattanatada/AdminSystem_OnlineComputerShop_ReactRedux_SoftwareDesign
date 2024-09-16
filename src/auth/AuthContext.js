// src/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import http from '../http-common';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    setUser(storedUser);
    setToken(localStorage.getItem('token'));
  }, []);

  const userLogin = async (credentials) => {
    try {
      const response = await http.post('/auth', credentials);
      const { token, user } = response.data;
        console.log(token);
        console.log(user);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
      setUser(user);
      setToken(token);
    } catch (error) {
      console.error('Login failed', error);
      throw error;
    }
  };

  const userLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
  };

  const userIsAuthenticated = () => {
    return !!token;
  };

  const contextValue = {
    user,
    token,
    userIsAuthenticated,
    userLogin,
    userLogout,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

export default AuthContext;
export function useAuth() {
  return useContext(AuthContext);
}
export { AuthProvider };
