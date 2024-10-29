
import React, { useState, useEffect  } from 'react';
import { StyleSheet, View, Alert, Text, TextInput } from 'react-native';
import { fetchRecipes, searchRecipes } from '../../api/recipeServiceAxios';


import Recipe from '@/components/Recipe';
import { FlatList } from 'react-native-gesture-handler';


// Type for items within each category
interface RecipeItem {
  id: number;
  name: string;
  minutes: number;
  description: string;
  instructions: string[];
  ingredients: string[];
};


export default function RecipeScreen() {

  const [searchText, setSearchText] = useState('');
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // Load initial list of recipes
    const loadRecipes = async () => {
      try {
        const data = await fetchRecipes();
        setRecipes(data);
      } catch (error) {
        console.error('Failed to load recipes:', error);
      }
    };
    loadRecipes();
  }, []);


  const handleSearch = async (text: string) => {
    setSearchText(text);
    if (text === '') {
      // Reset to full list when search bar is cleared
      const data = await fetchRecipes();
      setRecipes(data);
    } else {
      const data = await searchRecipes(text);
      setRecipes(data);
    }
  };

  const renderRecipeItem = ({ item }: {item: RecipeItem}) => (
    <View style={styles.basicContainer}>
      <Text style={styles.title}>{item.name}</Text>
      <Text>Time: {item.minutes} mins</Text>
    </View>    
  );

  return (
    <View style={styles.scrollContainer}>
      <Text style={styles.containerTitle}>Fridge To Fork</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Search..."
        value={searchText}
        onChangeText={handleSearch}
      />
      <FlatList
        data = {recipes}
        keyExtractor={item => item.id.toString()}
        renderItem={renderRecipeItem}
        horizontal={false}
        numColumns={1}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1, // Ensures content stretches vertically
    padding: 16,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 20,
  },
  containerTitle: {
    fontSize: 60,
    textAlign: 'center', // centers text
    marginBottom: 40,
    fontFamily: 'italiano',
    fontStyle: 'italic'
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
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    margin: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});
