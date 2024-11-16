import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet , TextInput} from 'react-native';
import { useRouter } from 'expo-router';
import { listUserIngredients, deleteUserIngredient } from '../api/userIngredientService'
import { getToken } from '../api/tokenUtils'


interface IngredientItem {
  id: number;
  name: string;
}


export default function FridgeScreen() {
  const [searchText, setSearchText] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const router = useRouter();

  const loadUserIngredients = async () => {
    try {
      const token = await getToken();
      if (token) {
        const data = await listUserIngredients(token);
        setIngredients(data);
      } else {
        console.error("token error")
      }
    } catch (error) {
      console.error('Failed to load user ingredients:', error);
    }
  };

  useEffect(() => {
    // Load initial list of ingredients
    loadUserIngredients();
  }, []);

  const handleSearch = async (text: string) => {
    setSearchText(text);
    const token = await getToken();
    if (token) {
      if (text === '') {
        // Reset to full list when search bar is cleared
        const data = await listUserIngredients(token);
        setIngredients(data);
      } else {
        // TODO: implement search functionality here
        console.log("search here...");
      }
    } else {
      console.error("token error");
    }
  }

  const handleDelete = async (id: number) => {
    const token = await getToken();
    if (token) {
      const response = await deleteUserIngredient(token, id);
      console.log(response);
      if (response == "Deleted") {
        loadUserIngredients();
      }
    } else {
      console.error("token error");
    }
  }

  const handleIngredientSelect = () => {
    // Navigate to recipe_details and pass the recipe ID as a parameter
    router.push({pathname: "../add_ingredients"});
  };

  const renderIngredientItem = ({ item }: {item: IngredientItem}) => (
    <TouchableOpacity 
      style={styles.basicContainer}
    >
      <Text style={styles.title}>{item.name}</Text>
      
      <TouchableOpacity style={styles.addButton} onPress={() => {handleDelete(item.id)}}>
        <Text style={styles.addButtonText}>X</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );  

  return (
    
    
    <View style={styles.container}>
      <View style={styles.subTitleContainer}>
        <Text style = {styles.fridgeText}>FRIDGE</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => {handleIngredientSelect()}}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.backContainer} onPress={() => router.push('/home')}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.searchBar}
        placeholder="Search..."
        value={searchText}
        onChangeText={handleSearch}
      />
      
      <FlatList
        data = {ingredients}
        keyExtractor={item => item.id.toString()}
        renderItem={renderIngredientItem}
        horizontal={false}
        numColumns={1}
      />
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 80,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#f8f8f8',
  },
  categoryTab: {
    padding: 10,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: '#8ccc72',
  },
  categoryText: {
    fontSize: 16,
    color: '#808080',
  },
  activeCategoryText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  listContainer: {
    padding: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomColor: '#d8d8d8',
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  itemName: {
    fontSize: 18,
    color: '#333',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    backgroundColor: '#e0e0e0',
    borderRadius: 50,
    padding: 5,
    marginHorizontal: 5,
  },
  iconText: {
    fontSize: 18,
    color: '#333',
  },
  itemQuantity: {
    fontSize: 16,
    color: '#333',
    marginHorizontal: 10,
  },
  addButton: {
    width: 50,               // Width of the circle
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
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },

  fridgeText: { 
    fontWeight: 'bold',
    fontSize: 40,
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
  title: {
    fontWeight: 'bold',
    fontSize: 18,
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
});
