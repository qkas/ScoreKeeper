import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import NewScoreScreen from '../screens/NewScoreScreen';

const Stack = createStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="NewScore" component={NewScoreScreen} />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
