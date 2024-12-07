import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const loadToken = async () => {
      try { // check for saved token
        const token = await AsyncStorage.getItem('authToken');
        if (token) {
          setIsAuthenticated(true);
          // apiLogin
        }
      } catch (error) {
        console.log('Failed to load token', error);
      }
    };

    loadToken();
  }, []);

  const login = async (token) => {
    setIsAuthenticated(true);
    try { // store auth token
      await AsyncStorage.setItem('authToken', token);
    } catch (error) {
      console.log('Failed to save token', error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('authToken');
      setIsAuthenticated(false);
    } catch (error) {
      console.log('Failed to remove token', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
