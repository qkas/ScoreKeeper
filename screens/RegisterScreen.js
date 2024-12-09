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
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#111',
    flex: 1,
    padding: 20,
  },
  header: {
    borderBottomColor: 'grey',
    borderBottomWidth: 3,
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    margin: '4%',
    paddingVertical: 10,
    textAlign: 'center',
    width: '100%',
  },
  input: {
    borderBottomWidth: 3,
    borderColor: 'grey',
    borderRadius: 8,
    borderWidth: 2,
    color: '#fff',
    fontSize: 16,
    marginBottom: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
    placeholder: 'green',
    width: '100%',
  },
  loginButton: {
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  loginButtonText: {
    color: '#6200ea',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerButton: {
    alignItems: 'center',
    backgroundColor: '#6200ea',
    borderRadius: 10,
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingVertical: 14,
  },
});
