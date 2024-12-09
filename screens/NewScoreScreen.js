import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import { postData } from '../util/helper';

const NewScoreScreen = ({ navigation }) => {
  const [gameName, setGameName] = useState('');
  const [players, setPlayers] = useState([
    { id: 1, name: '', totalScore: 0, roundScores: [] },
    { id: 2, name: '', totalScore: 0, roundScores: [] }
  ]);
  const [rounds, setRounds] = useState(0);

  const addPlayer = () => {
    const newPlayer = {
      id: players.length + 1,
      name: '',
      totalScore: 0,
      roundScores: Array(rounds).fill(0),
    };
    setPlayers([...players, newPlayer]);
  };

  const removePlayer = (id) => {
    setPlayers(players.filter((player) => player.id !== id));
  };

  const updatePlayerName = (id, name) => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) =>
        player.id === id ? { ...player, name } : player
      )
    );
  };

  const updateScoreToAdd = (id, value) => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) =>
        player.id === id ? { ...player, scoreToAdd: value } : player
      )
    );
  };

  const nextRound = () => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) => ({
        ...player,
        roundScores: [...player.roundScores, parseInt(player.scoreToAdd || 0)],
        totalScore: player.totalScore + parseInt(player.scoreToAdd || 0),
        scoreToAdd: null,
      }))
    );
    setRounds(rounds + 1);
  };

  const saveScoreboard = async () => {
    const data = {
      name: gameName,
      players: players.map(({ id, name, totalScore, roundScores }) => ({
        id,
        name: name || `Player ${id}`,
        totalScore,
        roundScores,
      })),
      rounds,
    };
    try {
      const result = await postData(data);
      if (result) {
        Alert.alert('Success', 'Scoreboard saved!', [
          { text: 'OK', onPress: () => navigation.navigate('Home') },
        ]);
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <View style={styles.container}>
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
  
      {/* Current Round Section */}
      <View style={styles.currentRoundContainer}>
        <Text style={styles.currentRoundText}>Current Round: {rounds + 1}</Text>
      </View>
  
      <FlatList
        data={[...players, { id: 'add-player', isAddButton: true }]}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.playerFlatList}
        renderItem={({ item }) =>
          item.isAddButton ? (
            <TouchableOpacity onPress={addPlayer} style={styles.addPlayerButton}>
              <Text style={styles.addPlayerText}>Add Player</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.playerEntry}>
              <TextInput
                style={styles.playerNameInput}
                placeholder={`Player ${item.id}`}
                placeholderTextColor="#aaa"
                value={item.name}
                onChangeText={(name) => updatePlayerName(item.id, name)}
              />
              <Text style={styles.totalScore}>Total Score: {item.totalScore}</Text>
              <FlatList
                data={item.roundScores}
                keyExtractor={(_, index) => index.toString()}
                contentContainerStyle={styles.scoresFlatList}
                horizontal
                renderItem={({ item }) => (
                  <Text style={styles.roundScore}>{item}</Text>
                )}
              />
              <View style={styles.scoreInputRow}>
                <Text style={styles.scoreLabel}>Score to add:</Text>
                <TextInput
                  style={styles.scoreInput}
                  keyboardType="numeric"
                  placeholder="0"
                  placeholderTextColor="#aaa"
                  value={item.scoreToAdd}
                  onChangeText={(value) => updateScoreToAdd(item.id, value)}
                />
              </View>
              <TouchableOpacity onPress={() => removePlayer(item.id)}>
                <Text style={styles.removePlayerButton}>Remove player</Text>
              </TouchableOpacity>
            </View>
          )
        }
      />
  
      <TouchableOpacity onPress={nextRound} style={styles.nextRoundButton}>
        <Text style={styles.buttonText}>Add Scores</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NewScoreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    padding: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  gameNameInput: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    borderBottomWidth: 3,
    borderBottomColor: 'grey',
    marginBottom: 5,
    paddingBottom: 5,
    marginRight: 10,
  },
  saveButton: {
    backgroundColor: '#6200ea',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  currentRoundContainer: {
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    paddingBottom: 5,
  },
  currentRoundText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  playerFlatList: {
    marginVertical: 20,
    paddingBottom: 20,
    paddingRight: 10,
  },
  playerEntry: {
    backgroundColor: '#222',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  playerNameInput: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    borderBottomWidth: 2,
    borderBottomColor: 'grey',
    paddingBottom: 5,
    marginBottom: 0,
    marginBottom: 10,
  },
  totalScore: {
    color: '#aaa',
    marginVertical: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  scoresFlatList: {
    marginBottom: 10,
  },
  roundScore: {
    color: '#aaa',
    marginHorizontal: 4,
  },
  scoreInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreLabel: {
    color: '#fff',
    fontSize: 16,
    marginRight: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  scoreInput: {
    flex: 1,
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    borderBottomWidth: 2,
    borderBottomColor: 'grey',
    paddingBottom: 5,
    marginBottom: 3,
  },
  removePlayerButton: {
    color: '#eb3636',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  addPlayerButton: {
    backgroundColor: '#333',
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  addPlayerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  nextRoundButton: {
    backgroundColor: '#6200ea',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

