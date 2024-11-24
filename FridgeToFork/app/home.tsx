

import React, {useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { getToken, clearToken } from '../api/tokenUtils';
import { getProfile} from '../api/profileService';





const HomeScreen = () => {
  const router = useRouter();
  const [profile, setProfile] = useState({});
  const [name, setName] = useState('');



  const getUserName = async () => {
    try {
      const token = await getToken();
      if (token) {
        const profileData = await getProfile(token);

        if (profileData && profileData.name) {
          setName(profileData.name.trim());
        }

      } else {
        console.error('Token error');
      }
    } catch (error) {
      console.error('Failed to load user ingredients:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await clearToken(); // Clear the stored token
      router.push('/'); // Navigate to the index page
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  React.useEffect(() => {
    getUserName();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fridge To Fork</Text>
      <View style={styles.buttonGroup}>
        {/* Profile Section */}
        <TouchableOpacity style={styles.profileContainer} onPress={() => router.push('/profile_page')}>
          <Image
            source={{uri: 'https://static.vecteezy.com/system/resources/previews/016/825/496/non_2x/fork-and-knife-icon-illustration-free-vector.jpg'}} // Replace with actual profile image URL
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>Welcome, <strong>{name}</strong></Text> {/* Replace with dynamic name */}
        </TouchableOpacity>

        {/* Find Recipes Section */}
        <TouchableOpacity style={styles.buttonContainer} onPress={() => router.push('/find_recipes')}>
          <Text style={styles.buttonText}>Find Recipes</Text>
        </TouchableOpacity>

        {/* Fridge Section */}
        <TouchableOpacity style={styles.buttonContainer} onPress={() => router.push('/fridge')}>
          <Text style={styles.buttonText}>Fridge</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFDE7',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 90,
  },
  title: {
    fontSize: 100,
    textAlign: 'center',
    marginBottom: 0,
    fontFamily: 'sans-serif-condensed',
    fontStyle: 'italic',
    color: '#000',
    textTransform: 'capitalize',
  },
  buttonGroup: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  profileContainer: {
    width: '90%',
    backgroundColor: '#2E7D32',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
    paddingVertical: 24,
    marginVertical: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    color: "ffffff"
  },
  profileName: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  buttonContainer: {
    width: '85%',
    backgroundColor: '#2E7D32',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
    paddingVertical: 16,
    marginVertical: 12,
  },
  buttonText: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  logoutButton: {
    width: '35%',
    backgroundColor: '#000', // Red for logout
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
    paddingVertical: 16,
    marginVertical: 12,
  },
  logoutButtonText: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  
});

export default HomeScreen;
