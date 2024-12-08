import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* NEW SCOREBOARD BUTTON */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('NewScore')}
      >
        <Text style={styles.buttonText}>New scoreboard</Text>
      </TouchableOpacity>
      {/* SCOREBOARD ENTRIES */}
      <Text style={styles.header}>Scoreboards</Text>
      {/* TODO */}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    padding: 20,
    alignItems: 'center',
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
    width: '100%',
  },
});