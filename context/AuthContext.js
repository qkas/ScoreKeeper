import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        console.log('Loaded token:', token);
        if (token) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.log('Failed to load token', error);
      } finally {
        setLoading(false);
      }
    };

    loadToken();
  }, []);

  const login = async (token) => {
    setIsAuthenticated(true);
    try {
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
    <AuthContext.Provider value={{ isAuthenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
