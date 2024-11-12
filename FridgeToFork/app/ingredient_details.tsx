import { View, Text, StyleSheet, ActivityIndicator, ScrollView , TouchableOpacity  } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams , useRouter } from 'expo-router';


interface IngredientItem {
    id: string;
    name: string;
    description: string;
    nutrition: string;
  }



const RecipeDetailScreen = () => {
  const { id } = useLocalSearchParams();
  const [ingredient, setIngredient] = useState<IngredientItem | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  
  const handleBackSelect = () => {
    router.push({pathname: "/add_ingredients"});
  };
  const handleAddSelect = () => {
    router.push({pathname: "/fridge"});
  };

  useEffect(() => {
    const fetchIngredient = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/ingredients/getByID/${id}`);
        if (!response.ok) throw new Error("Ingredient not found");
        const data = await response.json();
        setIngredient(data);
      } catch (error) {
        console.error("Error fetching Ingredient:", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchIngredient();
  }, [id]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!ingredient) {
    return <Text>Ingredient not found</Text>;
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <View style={styles.nameContainer}>
        <Text style={styles.title}>Name: {ingredient.name}</Text>
      </View>
      <View style={styles.nameContainer}>
        <Text style={styles.title}>Choose your Amount</Text>
      </View>
      <TouchableOpacity style={styles.addButton} onPress={() => {handleBackSelect()}}>
        <Text style={styles.addButtonText}>Go Back</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.addButton} onPress={() => {handleAddSelect()}}>
        <Text style={styles.addButtonText}>Add Ingredient</Text>
      </TouchableOpacity>
      
    </ScrollView>
    

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
  addButton: {
    top: -10,
    left: 500,
    width: 500,               // Width of the circle
    height: 50,              // Height of the circle
    borderRadius: 25,        // Half of the width/height to make it circular
    backgroundColor: '#8ccc72',  // Green background color
    justifyContent: 'center', // Center the text inside
    alignItems: 'center',    // Center the text inside
    elevation: 5,            // Optional: shadow for Android
    shadowColor: '#000',     // Optional: shadow for iOS
    shadowOffset: { width: 0, height: 2 }, // Optional: shadow for iOS
    shadowOpacity: 0.3,      // Optional: shadow for iOS
    shadowRadius: 3,         // Optional: shadow for iOS
  },
  addButtonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default RecipeDetailScreen; // Ensure you have this line