import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, FlatList } from 'react-native';

const NewScoreScreen = ({ navigation }) => {
  const [playerData, setPlayerData] = useState([{ name: '', totalScore: [], scoreToAdd: "" }]);

  const handleInputChange = (index, field, value) => {
    const updatedPlayerData = [...playerData];
    updatedPlayerData[index][field] = value;
    setPlayerData(updatedPlayerData);
  };

  const addPlayer = () => {
    setPlayerData((prev) => [...prev, { name: '', totalScore: [], scoreToAdd: "" }]);
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
        const scoreToAdd = parseInt(player.scoreToAdd, 10);

        updatedPlayerData[index] = {
          ...player,
          totalScore: [...player.totalScore, scoreToAdd],
          scoreToAdd: "",
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

  const renderPlayer = ({ item, index }) => (
    <View style={styles.playerContainer}>
      <View style={styles.row}>
        <TextInput
          style={styles.nameInput}
          placeholder={`Player ${index + 1}`}
          placeholderTextColor="#888"
          value={item.name}
          onChangeText={(text) => handleInputChange(index, 'name', text)}
        />
        <TextInput
          style={styles.scoreInput}
          placeholder="0"
          placeholderTextColor="#888"
          keyboardType="number-pad"
          value={item.scoreToAdd}
          onChangeText={(text) => handleInputChange(index, 'scoreToAdd', text)}
        />
      </View>
      <Text style={styles.roundScoresLabel}>Round Scores:</Text>
      <View style={styles.scoresContainer}>
        {item.totalScore.map((score, roundIndex) => (
          <Text key={roundIndex} style={styles.score}>
            {score}
          </Text>
        ))}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Score</Text>

      <FlatList
        data={playerData}
        renderItem={renderPlayer}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContent}
      />

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
    marginBottom: 10,
    textAlign: 'center',
  },
  nameInput: {
    backgroundColor: '#222',
    color: '#fff',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    width: 120,
  },
  scoreInput: {
    backgroundColor: '#222',
    color: '#fff',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    width: 120,
  },
  roundScoresLabel: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 5,
  },
  scoresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 5,
  },
  score: {
    backgroundColor: '#333',
    color: '#fff',
    borderRadius: 5,
    padding: 5,
    margin: 5,
    textAlign: 'center',
    minWidth: 30,
  },
  playerContainer: {
    flexDirection: 'column',
    backgroundColor: '#222',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    gap: 50,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  listContent: {
    paddingBottom: 20,
  },
});

export default NewScoreScreen;
