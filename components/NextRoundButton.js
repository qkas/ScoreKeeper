import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const NextRoundButton = ({ nextRound }) => {
  return (
    <TouchableOpacity onPress={nextRound} style={styles.nextRoundButton}>
      <Text style={styles.buttonText}>Add Scores</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  nextRoundButton: {
    alignItems: 'center',
    backgroundColor: '#6200ea',
    borderRadius: 10,
    paddingVertical: 14,
    width: '100%',
  },
});

export default NextRoundButton;
