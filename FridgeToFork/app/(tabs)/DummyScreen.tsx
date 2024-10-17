import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const ProfileScreen: React.VFC = () => {
  return (
    <View style={styles.container}>
      {/* Profile Photo */}
      <Image
        source={{ uri: 'https://csdl-images.ieeecomputer.org/mags/so/2019/01/figures/falessi.a1-2874620.gif' }} // Replace with actual profile photo URL
        style={styles.profilePhoto}
      />

      {/* Name */}
      <Text style={styles.name}>Davide Falessi</Text>

      {/* Username */}
      <Text style={styles.username}>@davidefalessi</Text>

      {/* Additional Profile Data */}
      <View style={styles.profileDetails}>
        <Text style={styles.detailText}>Email: davidefalessi@gmail.com</Text>
        <Text style={styles.detailText}>Location: Roma, Italy</Text>
        <Text style={styles.detailText}>Bio: Greatest professor of all time. Best at chess after gal</Text>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={() => {}}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  profilePhoto: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    borderColor: '#ddd',
    borderWidth: 2,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  username: {
    fontSize: 18,
    color: '#555',
    marginBottom: 15,
  },
  profileDetails: {
    width: '100%',
    paddingHorizontal: 20,
  },
  detailText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  logoutButton: {
    backgroundColor: '#ff6347', // Tomato red color for the button
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginTop: 20,
  },
  logoutText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
