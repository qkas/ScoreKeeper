import React from 'react';
import { View, Text, Button } from 'react-native';
import { useAuth } from '../context/AuthContext';

const LoginScreen = ({ navigation }) => {
  const { login } = useAuth();

  return (
    <View>
      <Text>Login Screen</Text>
      <Button title="Login" onPress={login} />
      <Button title="Go to Register" onPress={() => navigation.navigate('Register')} />
    </View>
  );
};

export default LoginScreen;