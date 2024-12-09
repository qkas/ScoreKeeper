import React, { useContext } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { ScoresContext } from '../context/ScoresContext';

const Scoreboards = () => {
  const { scores } = useContext(ScoresContext);

  // Convert the object into an array for rendering
  const scoresArray = Object.entries(scores).map(([id, game]) => ({
    id,
    ...game,
  }));

  const renderScoreboard = ({ item }) => (
    <View style={styles.scoreboard}>
      <Text style={styles.gameTitle}>{item.name}</Text>
      <Text style={styles.rounds}>Rounds: {item.rounds}</Text>
      {item.players.map((player, index) => (
        <View key={index} style={styles.player}>
          <Text style={styles.playerName}>
            {player.name}: {player.totalScore} pts
          </Text>
          <Text style={styles.roundScores}>
            Scores: {(player.roundScores || []).join(', ')}
          </Text>
        </View>
      ))}
    </View>
  );

  return (
    <FlatList
      data={scoresArray}
      renderItem={renderScoreboard}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.container}
    />
  );
};

export default Scoreboards;

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    paddingBottom: 20,
    paddingRight: 10,
  },
  scoreboard: {
    backgroundColor: '#222',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
  },
  gameTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  rounds: {
    color: '#aaa',
    fontSize: 16,
    marginVertical: 5,
  },
  player: {
    marginTop: 10,
  },
  playerName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  roundScores: {
    color: '#aaa',
    fontSize: 14,
  },
});
