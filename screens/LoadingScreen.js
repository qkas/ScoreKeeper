import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

const LoadingScreen = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color="#6200ea" />
    <Text style={styles.loadingText}>Loading...</Text>
  </View>
);

export default LoadingScreen;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#111',
  },
  loadingText: {
    marginTop: 10,
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
