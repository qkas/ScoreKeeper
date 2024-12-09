import React, { useContext } from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { ScoresContext } from '../context/ScoresContext';
import { deleteData } from '../util/helper';
import { useAuth } from '../context/AuthContext';

const Scoreboards = () => {
  const { scores, setScores } = useContext(ScoresContext);
  const { localId: uid, idToken } = useAuth();

  // Convert the object into an array for rendering
  const scoresArray = Object.entries(scores).map(([id, game]) => ({
    id,
    ...game,
  }));

  const handleDelete = async (id) => {
    try {
      await deleteData(uid, id, idToken);
      setScores((prevScores) => {
        const updatedScores = { ...prevScores };
        delete updatedScores[id];
        return updatedScores;
      });
      alert('Scoreboard deleted successfully');
    } catch (error) {
      console.error('Error deleting scoreboard:', error);
    }
  };

  const renderScoreboard = ({ item }) => (
    <View style={styles.scoreboard}>
      <View style={styles.header}>
        <Text style={styles.gameTitle}>{item.name}</Text>
        <TouchableOpacity
          onPress={() => handleDelete(item.id)}
          style={styles.deleteButton}
        >
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
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
      keyExtractor={(item) => item.id.toString()}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  gameTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
  },
  deleteButton: {
    backgroundColor: '#eb3636',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
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
