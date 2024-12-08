import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';

const ProfileTab = () => {
  const { logout, userEmail } = useAuth();
  const [showTab, setShowTab] = useState(false);

  return (
    <View>
      <TouchableOpacity onPress={() => setShowTab(!showTab)} style={styles.iconContainer}>
        <Image source={require('../assets/profile.png')} style={styles.profileIcon} />
      </TouchableOpacity>
      {showTab && (
        <View style={styles.tab}>
          <Text style={styles.text}>Signed in as {userEmail}</Text>
          <TouchableOpacity onPress={logout} style={styles.logoutButton}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    marginRight: 10,
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#fff'
  },
  tab: {
    position: 'absolute',
    top: 50,
    right: 10,
    backgroundColor: '#333',
    padding: 20,
    borderRadius: 8,
    zIndex: 10,
    width: '200'
  },
  text: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
  },
  logoutButton: {
    marginEnd: 10,
    alignSelf: 'flex-end',
  },
  logoutText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default ProfileTab;
