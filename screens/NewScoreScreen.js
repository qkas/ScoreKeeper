import React, { useState } from 'react';
import { View, Alert, FlatList, StyleSheet } from 'react-native';
import { postData } from '../util/helper';
import { useAuth } from '../context/AuthContext';
import HeaderRow from '../components/HeaderRow';
import CurrentRound from '../components/CurrentRound';
import PlayerEntry from '../components/PlayerEntry';
import AddPlayerButton from '../components/AddPlayerButton';
import NextRoundButton from '../components/NextRoundButton';

const NewScoreScreen = ({ navigation }) => {
  const { idToken, localId } = useAuth();
  const [gameName, setGameName] = useState('');
  const [players, setPlayers] = useState([
    { id: 1, name: '', totalScore: 0, roundScores: [] },
    { id: 2, name: '', totalScore: 0, roundScores: [] },
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
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <HeaderRow
        gameName={gameName}
        setGameName={setGameName}
        saveScoreboard={saveScoreboard}
      />
      <CurrentRound rounds={rounds} />
      <FlatList
        data={[...players, { id: 'add-player', isAddButton: true }]}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) =>
          item.isAddButton ? (
            <AddPlayerButton addPlayer={addPlayer} />
          ) : (
            <PlayerEntry
              player={item}
              updatePlayerName={updatePlayerName}
              updateScoreToAdd={updateScoreToAdd}
              removePlayer={removePlayer}
            />
          )
        }
      />
      <NextRoundButton nextRound={nextRound} />
    </View>
  );
};

export default NewScoreScreen;

// Styles remain unchanged
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#111',
    flex: 1,
    padding: 20,
  },
});
