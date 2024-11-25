import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
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
    router.push({
      pathname: './cooked',
      params: {
        recipeId: recipe.id,
      },
    });
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!recipe) {
    return <Text>Recipe not found</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Back Button */}
      <View style={styles.backButtonContainer}>
        <TouchableOpacity style={styles.backContainer} onPress={() => router.push('/find_recipes')}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
      </View>

      {/* Recipe Name */}
      <View style={styles.nameContainer}>
        <Text style={styles.title}>{recipe.name.toUpperCase()}</Text>
        <Text style={styles.time}>Time: {recipe.minutes} minutes</Text>
      </View>

      {/* Ingredients Section */}
<View style={styles.basicContainer}>
  <Text style={styles.sectionTitle}>INGREDIENTS</Text>
  {recipe.ingredients.map((ingredient) => (
    <Text key={ingredient} style={styles.text}>- {ingredient}</Text>
  ))}
</View>

{/* Instructions Section */}
<View style={styles.basicContainer}>
  <Text style={styles.sectionTitle}>INSTRUCTIONS</Text>
  {recipe.instructions.map((step, index) => (
    <Text key={`${index}-${step}`} style={styles.text}>
      {index + 1}. {step}
    </Text>
  ))}
</View>

      {/* Cooked Button */}
      <TouchableOpacity style={styles.addButton} onPress={() => handleCooked(recipe)}>
        <Text style={styles.cookedButtonText}>COOKED</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, // Ensure the content stretches to fill the space
    backgroundColor: '#FFFDE7', // Light cream color
    padding: 16,
  },
  backButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 20,
  },
  backContainer: {
    backgroundColor: '#2E7D32', // Dark green
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  backButtonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  nameContainer: {
    alignItems: 'center',
    backgroundColor: '#A5D6A7', // Light green
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2E7D32',
    textAlign: 'center',
  },
  time: {
    fontSize: 16,
    color: '#555',
    marginTop: 10,
  },
  basicContainer: {
    padding: 16,
    backgroundColor: '#A5D6A7', // Light green
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2E7D32',
  },
  text: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  addButton: {
    alignSelf: 'center',
    backgroundColor: '#2E7D32', // Dark green
    paddingVertical: 14,
    paddingHorizontal: 60,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    bottom: 5,
  },
  cookedButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

export default RecipeDetailScreen;
