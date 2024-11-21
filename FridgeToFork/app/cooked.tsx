import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getIngredientsByRecipeId , add_recipe } from '@/api/cookedService'
import { getToken } from '@/api/tokenUtils';
import { deleteUserIngredient } from '@/api/userIngredientService';
import Recipe from '@/components/Recipe';


interface IngredientItem {
  id: number;
  name: string;
}


const DetailsScreen = () => {
  const { recipeId } = useLocalSearchParams();
  const [ ingredients, setIngredients ] = useState<IngredientItem[]>([]);
  const router = useRouter();

  const loadIngredients = async () => {
    try {
      console.log("recipe id:" + recipeId)
      const data = await getIngredientsByRecipeId(Number(recipeId))
      setIngredients(data)
    } catch (error) {
      console.error("Error fetching ingredients by recipe ID:", error);
    }
  };

  const deleteIngredientById = (idToDelete: number) => {
    setIngredients((prevIngredients) => prevIngredients.filter((ingredient) => ingredient.id !== idToDelete));
  }

  const handleDelete = async (id: number) => {
    const token = await getToken();
    if (token) {
      const response = await deleteUserIngredient(token, id);
      console.log(response);
      if (response == "Deleted") {
        deleteIngredientById(id);
      }
    } else {
      console.error("token error");
    }
  }

  // at start load ingredient IDs and ingredients themselves
  useEffect(() => {
    loadIngredients();
  }, []);

  const renderIngredientItem = ({ item }: { item: IngredientItem }) => (
    <View style={styles.basicContainer}>
      <Text style={styles.title}>{item.name.toUpperCase()}</Text>
      <TouchableOpacity style={styles.addButton} onPress={() => {handleDelete(item.id)}}>
        <Text style={styles.addButtonText}>X</Text>
      </TouchableOpacity>
    </View>
  );

  const handleAddSelect = async (recipe_id: string) => {
    try {
      const token = await getToken();
      if (token) {
        const added = await add_recipe(recipe_id, token);
        if (added) {
          console.log("add Recipe successful!");
          router.push({pathname: "/find_recipes"})
        }
      } else {
        console.error("token error")
      }
    } catch (error) {
      console.error("Error adding Recipe", error);
    }
    console.log("add Recipe unsuccessful");
  };


  return (
    <View style={styles.scrollContainer}>
      <View style={styles.subTitleContainer}>
        <Text style={styles.headerText}>Remove Ingredients Used Up!</Text>
        <TouchableOpacity style={styles.backContainer} onPress={() => handleAddSelect(String(recipeId))}>
          <Text style={styles.backButtonText}>DONE ✓</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={ingredients}
        keyExtractor={(item: IngredientItem) => item.id.toString()}
        renderItem={renderIngredientItem}
        horizontal={false}
        numColumns={1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFDE7',
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: 'gray',
  },
  basicContainer: {
    flexDirection: 'row',         // Name and activity in a row
    alignItems: 'center',         // Align them vertically centered
    justifyContent: 'space-between', // Ensure they are spaced correctly
    padding: 16,
    backgroundColor: '#A5D6A7',
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  scrollContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFDE7',
  },
  containerTitle: {
    fontSize: 60,
    textAlign: 'center',
    marginBottom: 40,
    fontFamily: 'italiano',
    fontStyle: 'italic',
  },
  backContainer: {
    backgroundColor: '#2E7D32',  // Green background color
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
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    margin: 10,
  },
  addButton: {
    width: 50,
    height: 50,
    borderRadius: 25,        // Half of the width/height to make it circular
    backgroundColor: '#2E7D32',  // Green background color
    justifyContent: 'center', // Center the text inside
    alignItems: 'center',    // Center the text inside
    elevation: 5,            // Optional: shadow for Android
    shadowColor: '#000',     // Optional: shadow for iOS
    shadowOffset: { width: 0, height: 2 }, // Optional: shadow for iOS
    shadowOpacity: 0.3,      // Optional: shadow for iOS
    shadowRadius: 3,         // Optional: shadow for iOS
  },
  addButtonText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  headerText: {
    fontSize: 20,
    color: '#00',
    fontWeight: 'bold'
  },
  subTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    fontSize: 24,
    padding: 20,
  },
});

export default DetailsScreen;