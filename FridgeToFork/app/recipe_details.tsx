import { View, Text, StyleSheet, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';


interface RecipeItem {
  id: number;
  name: string;
  minutes: number;
  description: string;
  instructions: string[];
  ingredients: string[];
}



const RecipeDetailScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.nameContainer}>
        <Text style={styles.title}>Name here...</Text>
        <Text>Time: ## mins</Text>
      </View>
      <View style={styles.basicContainer}>
        <Text style={styles.sectionTitle}>Ingredients:</Text>
      </View>
      <View style={styles.basicContainer}>
        <Text style={styles.sectionTitle}>Instructions:</Text>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
  },
  basicContainer: {
    flexDirection: 'column',         // Name and activity in a row
    alignItems: 'flex-start',         // Align them vertically centered
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
  nameContainer: {
    flexDirection: 'column',         // Name and activity in a row
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
});

export default RecipeDetailScreen; // Ensure you have this line