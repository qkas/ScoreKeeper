import React from 'react';
import { StatusBar, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

const Stack = createStackNavigator();

const AuthNavigator = () => (
  <>
    <StatusBar
      translucent={true}
      barStyle="light-content"
    />
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#000' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontSize: 20, fontWeight: 'bold' },
      }}>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: 'Login to your account' }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ title: 'Login to your account' }}
      />
    </Stack.Navigator>
  </>
);

export default AuthNavigator;