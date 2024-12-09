import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const AddPlayerButton = ({ addPlayer }) => {
  return (
    <TouchableOpacity onPress={addPlayer} style={styles.addPlayerButton}>
      <Text style={styles.addPlayerText}>Add Player</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  addPlayerButton: {
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 10,
    marginBottom: '60%', // fixes keyboard not having enough space to open at bottom of list
    marginTop: 10,
    paddingVertical: 8,
  },
  addPlayerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddPlayerButton;
