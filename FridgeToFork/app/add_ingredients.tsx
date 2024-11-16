import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, Switch, FlatList } from 'react-native';
import { fetchIngredient, searchIngredientName } from '../api/ingredientService';
import { useRouter } from 'expo-router';

interface IngredientItem {
  id: string;
  name: string;
  description: string;
  nutrition: string;
}

export default function IngredientScreen() {
  const [searchText, setSearchText] = useState('');
  const [ingredients, setIngredients] = useState<IngredientItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    const loadIngredients = async () => {
      try {
        const data = await fetchIngredient();
        setIngredients(data);
      } catch (error) {
        console.error('Failed to load Ingredients:', error);
      }
    };
    loadIngredients();
  }, []);

  const handleSearch = async (text: string) => {
    setSearchText(text);
    if (text === '') {
      const data = await fetchIngredient();
      setIngredients(data);
    } else {
      const data = await searchIngredientName(text);
      setIngredients(data);
    }
  };

  const handleIngredientSelect = (ingredient: IngredientItem) => {
    router.push({ pathname: "./ingredient_details", params: { id: ingredient.id } });
  };

  const renderIngredientItem = ({ item }: { item: IngredientItem }) => (
    <TouchableOpacity
      style={styles.basicContainer}
      onPress={() => handleIngredientSelect(item)}
    >
      <Text style={styles.title}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.scrollContainer}>
      <View style={styles.subTitleContainer}>
        <Text style={styles.headerText}>Choose your Ingredient</Text>
        <TouchableOpacity style={styles.backContainer} onPress={() => router.push({pathname: "/fridge"})}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
      </View>
      
      <TextInput
        style={styles.searchBar}
        placeholder="Search ingredients..."
        value={searchText}
        onChangeText={handleSearch}
      />
      <FlatList
        data={ingredients}
        keyExtractor={(item: IngredientItem) => item.id}
        renderItem={renderIngredientItem}
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
    backgroundColor: '#fff',
  },
  containerTitle: {
    fontSize: 60,
    textAlign: 'center',
    marginBottom: 40,
    fontFamily: 'italiano',
    fontStyle: 'italic',
  },
  basicContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    paddingVertical: 10,
    margin: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  addButton: {
    top: -10,
    left: 1000,
    width: 200,               // Width of the circle
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
});

