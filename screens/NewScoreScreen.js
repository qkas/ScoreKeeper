import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import { postData } from '../util/helper';
import { useAuth } from '../context/AuthContext';

const NewScoreScreen = ({ navigation }) => {
  const { idToken, localId } = useAuth();
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
      const result = await postData(localId, data, idToken);
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
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  container: {
    backgroundColor: '#111',
    flex: 1,
    padding: 20,
  },
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
  gameNameInput: {
    borderBottomColor: 'grey',
    borderBottomWidth: 3,
    color: '#fff',
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    marginRight: 10,
    paddingBottom: 5,
  },
  headerRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  nextRoundButton: {
    alignItems: 'center',
    backgroundColor: '#6200ea',
    borderRadius: 10,
    paddingVertical: 14,
    width: '100%',
  },
  playerEntry: {
    backgroundColor: '#222',
    borderRadius: 10,
    marginBottom: 15,
    padding: 15,
  },
  playerFlatList: {
    marginVertical: 20,
    paddingBottom: 20,
    paddingRight: 10,
  },
  playerNameInput: {
    borderBottomColor: 'grey',
    borderBottomWidth: 2,
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 0,
    marginBottom: 10,
    paddingBottom: 5,
  },
  removePlayerButton: {
    color: '#eb3636',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  roundScore: {
    color: '#aaa',
    marginHorizontal: 4,
  },
  saveButton: {
    alignItems: 'center',
    backgroundColor: '#6200ea',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  scoreInput: {
    borderBottomColor: 'grey',
    borderBottomWidth: 2,
    color: '#fff',
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 3,
    paddingBottom: 5,
  },
  scoreInputRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  scoreLabel: {
    color: '#fff',
    fontSize: 16,
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  scoresFlatList: {
    marginBottom: 10,
  },
  totalScore: {
    color: '#aaa',
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
  },
});

