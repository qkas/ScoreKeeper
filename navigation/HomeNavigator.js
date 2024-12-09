import React from 'react';
import { StatusBar } from 'react-native';
import { ScoresProvider } from '../context/ScoresContext';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import NewScoreScreen from '../screens/NewScoreScreen';
import ProfileTab from '../components/ProfileTab';

const Stack = createStackNavigator();

const HomeNavigator = () => {
  return (
    <ScoresProvider>
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
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Scoreboards',
            headerRight: () => <ProfileTab />
          }}
        />
        <Stack.Screen
          name="NewScore"
          component={NewScoreScreen}
          options={{ title: "New scoreboard" }}
        />
      </Stack.Navigator>
    </ScoresProvider>
  );
};

export default HomeNavigator;