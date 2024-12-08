import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { tokenLogin } from '../util/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const loadToken = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        if (token) {
          const user = await tokenLogin(token);
          setIsAuthenticated(true);
          setUserEmail(user.email);
        }
      } catch (error) {
        console.log('Token validation failed:', error.message);
        setIsAuthenticated(false);
        setUserEmail(null);
      } finally {
        setLoading(false);
      }
    };

    loadToken();
  }, []);

  const login = async (token) => {
    try {
      const user = await tokenLogin(token);
      setIsAuthenticated(true);
      setUserEmail(user.email);
      await AsyncStorage.setItem('authToken', token);
    } catch (error) {
      console.log('Failed to log in', error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('authToken');
      setIsAuthenticated(false);
      setUserEmail(null);
    } catch (error) {
      console.log('Failed to remove token', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, loading, userEmail, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
