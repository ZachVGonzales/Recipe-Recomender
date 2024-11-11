import React, { useState, useEffect  } from 'react';
import { StyleSheet, View, Text, TextInput, Switch  } from 'react-native';
import { fetchRecipes, searchRecipesName, searchRecipesIngredients } from '../api/recipeServiceAxios';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';


// Type for items within each category
interface RecipeItem {
  id: number;
  name: string;
  instructions: string[];
  ingredients: string[];
};


export default function RecipeScreen() {
  const [searchText, setSearchText] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [useAlternateSearch, setUseAlternateSearch] = useState(false); // State for switch
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
      const data = useAlternateSearch
       ? await searchRecipesIngredients(text)
       : await searchRecipesName(text)
      setRecipes(data);
    }
  };

  const handleRecipeSelect = (recipe: RecipeItem) => {
    // Navigate to recipe_details and pass the recipe ID as a parameter
    router.push({pathname: "./recipe_details", params: {id: recipe.id}});
  };


  const renderRecipeItem = ({ item }: {item: RecipeItem}) => (
    <TouchableOpacity 
      style={styles.basicContainer}
      onPress={() => handleRecipeSelect(item)} // Navigate on press
    >
      <Text style={styles.title}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.scrollContainer}>
      <Text style={styles.containerTitle}>Fridge To Fork</Text>
      <View style={styles.subTitleContainer}>
        <Text>Use Alternate Search</Text>
        <TouchableOpacity style={styles.backContainer} onPress={() => router.push('/home')}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
      </View>
      
        <Switch
          value={useAlternateSearch}
          onValueChange={setUseAlternateSearch}
        />
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
  subTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    fontSize: 24
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
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    margin: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});
