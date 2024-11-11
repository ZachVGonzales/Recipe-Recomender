import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const HomeScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fridge To Fork</Text>
      <View style={styles.container}>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => router.push('/find_recipes')}>
          <Text style={styles.buttonText}>Find Recipes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => router.push('/fridge')}>
          <Text style={styles.buttonText}>Fridge</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => router.push('/profile_page')}>
          <Text style={styles.buttonText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    padding: 16,
    justifyContent: 'space-around'
  },
  title: {
    fontSize: 60,
    textAlign: 'center',
    marginBottom: 40,
    fontFamily: 'italiano',
    fontStyle: 'italic',
  },
  buttonContainer: {
    width: '80%',
    backgroundColor: '#D7EBD5',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    paddingVertical: 20,
    marginVertical: 8,
    height: '20%',
  },
  buttonText: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
});

export default HomeScreen;