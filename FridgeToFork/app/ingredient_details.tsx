import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { add_ingredient } from '../api/userIngredientService';
import { getToken } from '../api/tokenUtils';

interface IngredientItem {
  id: string;
  name: string;
}

const RecipeDetailScreen = () => {
  const { id } = useLocalSearchParams();
  const [ingredient, setIngredient] = useState<IngredientItem | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const handleBackSelect = () => {
    router.push({ pathname: '/add_ingredients' });
  };

  const handleAddSelect = async (ingredient_id: string) => {
    try {
      const token = await getToken();
      if (token) {
        const added = await add_ingredient(ingredient_id, token);
        if (added) {
          console.log('Add ingredient successful!');
          router.push('/add_ingredients');
        }
      } else {
        console.error('Token error');
      }
    } catch (error) {
      console.error('Error adding Ingredient', error);
    }
  };

  useEffect(() => {
    const fetchIngredient = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/ingredients/getByID/${id}`);
        if (!response.ok) throw new Error('Ingredient not found');
        const data = await response.json();
        setIngredient(data);
      } catch (error) {
        console.error('Error fetching Ingredient:', error);
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
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.nameContainer}>
        <Text style={styles.title}>{ingredient.name.toUpperCase()}</Text>
      </View>
      <TouchableOpacity style={styles.addButton} onPress={() => handleAddSelect(ingredient.id)}>
        <Text style={styles.addButtonText}>ADD INGREDIENT</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.addButton} onPress={handleBackSelect}>
        <Text style={styles.addButtonText}>GO BACK</Text>
      </TouchableOpacity>
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFDE7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 0,
    color: '#FFFFFF',
  },
  nameContainer: {
    backgroundColor: '#2E7D32',
    padding: 30,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
    marginBottom: 10,
    width: '90%',
  },
  addButton: {
    width: '80%',
    height: 50,
    borderRadius: 25,
    backgroundColor: '#A5D6A7',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    marginVertical: 10,
  },
  addButtonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default RecipeDetailScreen;
