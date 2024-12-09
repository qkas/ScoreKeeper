import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CurrentRound = ({ rounds }) => {
  return (
    <View style={styles.currentRoundContainer}>
      <Text style={styles.currentRoundText}>Current Round: {rounds + 1}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  currentRoundContainer: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  currentRoundText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CurrentRound;
