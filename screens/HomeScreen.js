import React from 'react';
import { View, Button, Text } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Welcome to the Notes App!</Text>
      <Button
        title="Create New Note"
        onPress={() => navigation.navigate('NewScore')}
      />
    </View>
  );
};

export default HomeScreen;
