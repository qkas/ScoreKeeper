import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { register } from '../util/auth';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const result = await register(email, password);
      if (result) {
        Alert.alert('Success', 'Registration successful!', [
          { text: 'OK', onPress: () => navigation.navigate('Login') },
        ]);
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Register a new account</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.loginButtonText}>Go to Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    padding: 20,
    alignItems: 'center',
  },
  header: {
    margin: 80,
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    paddingVertical: 10,
    textAlign: 'center',
    borderBottomColor: 'grey',
    borderBottomWidth: 3,
    width: '100%',
  },
  input: {
    width: '100%',
    color: '#fff',
    placeholder: 'green',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    borderColor: 'grey',
    borderWidth: 2,
    borderBottomWidth: 3,
    fontSize: 16,
    marginBottom: 15,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    marginTop: 20,
  },
  loginButton: {
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  loginButtonText: {
    color: '#6200ea',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerButton: {
    backgroundColor: '#6200ea',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});
