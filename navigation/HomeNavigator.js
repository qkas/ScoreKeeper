import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import NewScoreScreen from '../screens/NewScoreScreen';
import { useAuth } from '../context/AuthContext';

const Stack = createStackNavigator();

const HomeNavigator = () => {
  const { logout } = useAuth();

  return (
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
          title: 'Scoreboard overview',
          headerRight: () => (
            <TouchableOpacity style={styles.logoutButton} onPress={logout}>
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="NewScore"
        component={NewScoreScreen}
        options={{ title: "Create a new scoreboard" }}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigator;

const styles = StyleSheet.create({
  logoutButton: {
    marginRight: 20,
  },
  logoutText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});