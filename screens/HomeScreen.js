import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import Scoreboards from '../components/Scoreboards';

const HomeScreen = ({ navigation }) => (
  <View style={styles.container}>
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate('NewScore')}
    >
      <Text style={styles.buttonText}>New scoreboard</Text>
    </TouchableOpacity>
    <Text style={styles.header}>Scoreboards</Text>
    <Scoreboards />
  </View>
);

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    padding: 20,
  },
  button: {
    margin: '10%',
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
  header: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    paddingVertical: 10,
    textAlign: 'center',
    borderBottomColor: 'grey',
    borderBottomWidth: 3,
    marginBottom: 10,
    width: '100%',
  }
});
