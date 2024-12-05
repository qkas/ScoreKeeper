import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const NewScoreScreen = ({ navigation }) => {
  const [playerData, setPlayerData] = useState([{ name: '', totalScore: 0, scoreToAdd: '' }]);

  const handleInputChange = (index, field, value) => {
    const updatedPlayerData = [...playerData];
    updatedPlayerData[index][field] = value;
    setPlayerData(updatedPlayerData);
  };

  const addPlayer = () => {
    setPlayerData((prev) => [...prev, { name: '', totalScore: 0, scoreToAdd: '' }]);
  };

  const removePlayer = () => {
    if (playerData.length > 1) {
      setPlayerData((prev) => prev.slice(0, -1));
    }
  };

  const handleAddScore = () => {
    const updatedPlayerData = [...playerData];
    let updated = false;

    updatedPlayerData.forEach((player, index) => {
      if (player.scoreToAdd && !isNaN(player.scoreToAdd)) {
        const totalScore = player.totalScore;
        const scoreToAdd = parseInt(player.scoreToAdd, 10);

        updatedPlayerData[index] = {
          ...player,
          totalScore: totalScore + scoreToAdd,
          scoreToAdd: '',
        };
        updated = true;
      }
    });

    if (!updated) {
      Alert.alert('Error', 'Please enter a score to add for at least one player.');
      return;
    }

    setPlayerData(updatedPlayerData);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Score</Text>

      {playerData.map((player, index) => (
        <View style={styles.playerContainer} key={index}>
          <TextInput
            style={styles.nameInput}
            placeholder={`Player ${index + 1} Name`}
            placeholderTextColor="#888"
            value={player.name}
            onChangeText={(text) => handleInputChange(index, 'name', text)}
          />
          <TextInput
            style={styles.scoreInput}
            placeholder="Total Score"
            placeholderTextColor="#888"
            keyboardType="number-pad"
            value={player.totalScore.toString()}
            onChangeText={(text) => handleInputChange(index, 'totalScore', parseInt(text, 10) || 0)}
          />
          <TextInput
            style={styles.scoreInput}
            placeholder="Score to Add"
            placeholderTextColor="#888"
            keyboardType="number-pad"
            value={player.scoreToAdd}
            onChangeText={(text) => handleInputChange(index, 'scoreToAdd', text)}
          />
        </View>
      ))}

      <View style={styles.buttonContainer}>
        <Button title="+" onPress={addPlayer} color="#4caf50" />
        <Button title="-" onPress={removePlayer} color="#f44336" />
      </View>

      <Button title="Update Score" onPress={handleAddScore} color="#4caf50" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  nameInput: {
    backgroundColor: '#222',
    color: '#fff',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    width: 80,
  },
  scoreInput: {
    backgroundColor: '#222',
    color: '#fff',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    width: 120,
  },
  playerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    gap: 50,
  },
});

export default NewScoreScreen;
