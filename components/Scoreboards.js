import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

const Scoreboards = () => {
  const data = [
    {
      id: '1',
      game: {
        name: 'Scrabble',
        players: [
          { id: 1, name: 'Alice', totalScore: 230, roundScores: [18, 7, 23, 19, 0, 20, 15 , 14] },
          { id: 2, name: 'Bob', totalScore: 180, roundScores: [15, 17, 19, 9, 2, 22, 14, 13] },
          { id: 3, name: 'Charlie', totalScore: 210, roundScores: [8, 20, 16, 19, 0, 10, 28, 12] },
        ],
        rounds: 8,
      },
    },
    {
      id: '2',
      game: {
        name: 'Darts',
        players: [
          { id: 1, name: 'David', totalScore: 450, roundScores: [50, 60, 55] },
          { id: 2, name: 'Emma', totalScore: 350, roundScores: [45, 50, 45] },
          { id: 3, name: 'Frank', totalScore: 400, roundScores: [55, 50, 45] },
        ],
        rounds: 3,
      },
    },
    {
      id: '3',
      game: {
        name: 'Yatzy',
        players: [
          { id: 1, name: 'Grace', totalScore: 180, roundScores: [30, 50, 40] },
          { id: 2, name: 'Helen', totalScore: 200, roundScores: [40, 50, 45] },
          { id: 3, name: 'Irene', totalScore: 190, roundScores: [35, 45, 40] },
        ],
        rounds: 3,
      },
    },  
  ];
  const renderScoreboard = ({ item }) => (
    <View style={styles.scoreboard}>
      <Text style={styles.gameTitle}>{item.game.name}</Text>
      <Text style={styles.rounds}>Rounds: {item.game.rounds}</Text>
      {item.game.players.map(player => (
        <View key={player.id} style={styles.player}>
          <Text style={styles.playerName}>
            {player.name}: {player.totalScore} pts
          </Text>
          <Text style={styles.roundScores}>
            Scores: {player.roundScores.join(', ')}
          </Text>
        </View>
      ))}
    </View>
  );

  return (
    <FlatList
      data={data}
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
    fontWeight: 'bold'
  },
  roundScores: {
    color: '#aaa',
    fontSize: 14,
  },
})