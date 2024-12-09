import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { emailLogin } from '../util/auth'; 
import { useAuth } from '../context/AuthContext';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      const result = await emailLogin(email, password);
      if (result) {
        login(result.idToken); // authenticate user
        Alert.alert('Success', 'Login successful!', [
          { text: 'OK', onPress: () => navigation.navigate('Home') },
        ]);
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login to your account</Text>
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
          style={styles.registerButton}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.registerButtonText}>Go to Register</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

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
    alignItems: 'center',
    backgroundColor: '#6200ea',
    borderRadius: 10,
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingVertical: 14,
  },
  registerButton: {
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  registerButtonText: {
    color: '#6200ea',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
