import React from 'react';
import { AuthProvider } from './context/AuthContext';
import AppNavigator from './navigation/AppNavigator';
import { ScoresProvider } from './context/ScoresContext';

const App = () => (
    <ScoresProvider>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </ScoresProvider>
);

export default App;