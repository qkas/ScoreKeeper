import React from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const PlayerEntry = ({ player, updatePlayerName, updateScoreToAdd, removePlayer }) => {
  return (
    <View style={styles.playerEntry}>
      <TextInput
        style={styles.playerNameInput}
        placeholder={`Player ${player.id}`}
        placeholderTextColor="#aaa"
        value={player.name}
        onChangeText={(name) => updatePlayerName(player.id, name)}
      />
      <Text style={styles.totalScore}>Total Score: {player.totalScore}</Text>
      <FlatList
        data={player.roundScores}
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
          value={player.scoreToAdd}
          onChangeText={(value) => updateScoreToAdd(player.id, value)}
        />
      </View>
      <TouchableOpacity onPress={() => removePlayer(player.id)}>
        <Text style={styles.removePlayerButton}>Remove player</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  playerEntry: {
    backgroundColor: '#222',
    borderRadius: 10,
    marginBottom: 15,
    padding: 15,
  },
  playerNameInput: {
    borderBottomColor: 'grey',
    borderBottomWidth: 2,
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
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

export default PlayerEntry;
