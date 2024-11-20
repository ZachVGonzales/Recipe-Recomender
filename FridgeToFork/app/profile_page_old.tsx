import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

const ProfileScreen: React.VFC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.subTitleContainer}>
        <TouchableOpacity style={styles.backContainer} onPress={() => router.push({pathname: "/home"})}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bodyContainer}>
        

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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures content stretches vertically
    padding: 16,
    backgroundColor: '#fff',
  },
  bodyContainer: {
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
    backgroundColor: '#D7EBD5',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginTop: 20,
  },
  logoutText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  subTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    fontSize: 24
  },
  basicContainer: {
    flexDirection: 'row',         // Name and activity in a row
    alignItems: 'center',         // Align them vertically centered
    justifyContent: 'space-between', // Ensure they are spaced correctly
    padding: 16,
    backgroundColor: '#D7EBD5',
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  backContainer: {
    backgroundColor: '#D7EBD5',  // Green background color
    justifyContent: 'center', // Center the text inside
    alignItems: 'center',    // Center the text inside
    elevation: 5,            // Optional: shadow for Android
    shadowColor: '#000',     // Optional: shadow for iOS
    shadowOffset: { width: 0, height: 2 }, // Optional: shadow for iOS
    shadowOpacity: 0.3,      // Optional: shadow for iOS
    shadowRadius: 3,         // Optional: shadow for iOS
    paddingVertical: 12,     // Increased vertical padding
    paddingHorizontal: 20,   // Increased horizontal padding
    borderRadius: 8,         // Rounded corners
    minWidth: 120,           // Ensure the button has a minimum width
  },
  backButtonText: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
