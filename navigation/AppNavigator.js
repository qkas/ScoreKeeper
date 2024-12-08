import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import HomeNavigator from './HomeNavigator';
import LoadingScreen from '../screens/LoadingScreen';
import { useAuth } from '../context/AuthContext';

const AppNavigator = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <HomeNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
