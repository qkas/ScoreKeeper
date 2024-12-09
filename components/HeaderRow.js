import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

const HeaderRow = ({ gameName, setGameName, saveScoreboard }) => (
  <View style={styles.headerRow}>
    <TextInput
      style={styles.gameNameInput}
      placeholder="Enter Game Name"
      placeholderTextColor="#aaa"
      value={gameName}
      onChangeText={setGameName}
    />
    <TouchableOpacity onPress={saveScoreboard} style={styles.saveButton}>
      <Text style={styles.buttonText}>Save</Text>
    </TouchableOpacity>
  </View>
);

export default HeaderRow;

const styles = StyleSheet.create({
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  gameNameInput: {
    borderBottomColor: 'grey',
    borderBottomWidth: 3,
    color: '#fff',
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 10,
    paddingBottom: 5,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  saveButton: {
    backgroundColor: '#6200ea',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
});
