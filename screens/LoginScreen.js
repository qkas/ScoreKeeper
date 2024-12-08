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
  container: {
    flex: 1,
    backgroundColor: '#111',
    padding: 20,
    alignItems: 'center',
  },
  header: {
    margin: '4%',
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
  registerButton: {
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  registerButtonText: {
    color: '#6200ea',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginButton: {
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
