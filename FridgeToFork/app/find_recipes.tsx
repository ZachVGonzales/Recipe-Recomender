import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { fetchRecipes, searchRecipesName, generateUserIngredientSearch } from '@/api/recipeServiceAxios';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';
import { getToken } from '@/api/tokenUtils';
import { Bar } from 'react-native-progress';

// Type for items within each category
interface RecipeItem {
  id: number;
  name: string;
  minutes: number;
  instructions: string[];
  ingredients: string[];
  ratio: number;
}

export default function RecipeScreen() {
  const [searchText, setSearchText] = useState('');
  const [recipes, setRecipes] = useState([]);
  const router = useRouter();

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
      const data = await searchRecipesName(text);
      setRecipes(data);
    }
  };

  const handleGenerateSearch = async () => {
    const token = await getToken();
    if (token) {
      const data = await generateUserIngredientSearch(token);
      setRecipes(data);
    } else {
      console.error('Failed fetching token');
    }
  };

  const handleRecipeSelect = (recipe: RecipeItem) => {
    // Navigate to recipe_details and pass the recipe ID as a parameter
    router.push({ pathname: './recipe_details', params: { id: recipe.id } });
  };

  const renderRecipeItem = ({ item }: { item: RecipeItem }) => (
    <TouchableOpacity style={styles.basicContainer} onPress={() => handleRecipeSelect(item)}>
      <Text style={styles.title}>{item.name.toUpperCase()}</Text>
      <Bar
        progress={item.ratio}
        color="#2E7D32"
        unfilledColor="lightgray"
        borderRadius={5}
        style={styles.progressBar}
      
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.scrollContainer}>
      <Text style={styles.containerTitle}>Recipes</Text>

      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backContainer} onPress={() => router.push('/home')}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.generateButton} onPress={handleGenerateSearch}>
          <Text style={styles.generateButtonText}>GENERATE RECIPES FROM FRIDGE</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.searchBar}
        placeholder="SEARCH..."
        placeholderTextColor="#555"
        value={searchText}
        onChangeText={handleSearch}
      />
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderRecipeItem}
        horizontal={false}
        numColumns={1}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFDE7',
  },
  containerTitle: {
    fontSize: 48,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'sans-serif-condensed',
    fontStyle: 'italic',
    color: '#000',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  backContainer: {
    backgroundColor: '#2E7D32',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
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
  generateButton: {
    backgroundColor: '#2E7D32',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
    width: '100%',
  },
  generateButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  searchBar: {
    height: 80,
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 20,
    
    fontSize: 16,
    color: '#333',
  },
  basicContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#A5D6A7', // Slightly lighter cyan color
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  progressBar: {
    bottom: 5,
    alignSelf: 'flex-end',
  },
});

