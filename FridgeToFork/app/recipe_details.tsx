import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity  } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, router } from 'expo-router';


interface RecipeItem {
  id: number;
  name: string;
  minutes: number;
  description: string;
  instructions: string[];
  ingredients: string[];
}



const RecipeDetailScreen = () => {
  const { id } = useLocalSearchParams();
  const [recipe, setRecipe] = useState<RecipeItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/recipes/getByID/${id}`);
        if (!response.ok) throw new Error("Recipe not found");
        const data = await response.json();
        setRecipe(data);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchRecipe();
  }, [id]);

  const handleCooked = async (recipe: RecipeItem) => {
    console.log("handle recipe id:" + recipe.id)
    router.push({
      pathname: './cooked',
      params: {
        recipeId: recipe.id
      },
    });
  }

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!recipe) {
    return <Text>Recipe not found</Text>;
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <View style={styles.backButtonContainer}>
        <TouchableOpacity style={styles.backContainer} onPress={() => router.push('/find_recipes')}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.nameContainer}>
        <Text style={styles.title}>Name: {recipe.name}</Text>
        <Text>Time: {recipe.minutes} minutes</Text>
      </View>
      <View style={styles.basicContainer}>
        <Text style={styles.sectionTitle}>Ingredients:</Text>
        {recipe.ingredients.map((ingredient, index) => (
          <Text key={index}>- {ingredient}</Text>
        ))}
      </View>
      <View style={styles.basicContainer}>
        <Text style={styles.sectionTitle}>Instructions:</Text>
        {recipe.instructions.map((step, index) => (
          <Text key={index}>{index + 1}. {step}</Text>
        ))}
      </View>
      <TouchableOpacity style={styles.addButton} onPress={() => handleCooked(recipe)}>
      <Text style={styles.sectionTitle}>COOKED</Text>
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
  backButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 20
  },
  addButton: {
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
});

export default RecipeDetailScreen; // Ensure you have this line