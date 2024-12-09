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
  button: {
    alignItems: 'center',
    backgroundColor: '#6200ea',
    borderRadius: 10,
    justifyContent: 'center',
    margin: '10%',
    paddingHorizontal: 30,
    paddingVertical: 14,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  container: {
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
    marginBottom: 10,
    paddingVertical: 10,
    textAlign: 'center',
    width: '100%',
  }
});
