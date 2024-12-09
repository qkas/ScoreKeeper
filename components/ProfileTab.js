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
  logoutButton: {
    alignSelf: 'flex-end',
    marginEnd: 10,
  },
  logoutText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileIcon: {
    borderColor: '#fff',
    borderRadius: 20,
    borderWidth: 3,
    height: 40,
    width: 40
  },
  tab: {
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 20,
    position: 'absolute',
    right: 10,
    top: 50,
    width: '200',
    zIndex: 10
  },
  text: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
  },
});

export default ProfileTab;
