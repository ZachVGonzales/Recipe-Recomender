import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { listUserIngredients, deleteUserIngredient } from '../api/userIngredientService';
import { getToken } from '../api/tokenUtils';

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
        console.error('Token error');
      }
    } catch (error) {
      console.error('Failed to load user ingredients:', error);
    }
  };

  useEffect(() => {
    loadUserIngredients();
  }, []);

  const handleSearch = async (text: string) => {
    setSearchText(text);
    const token = await getToken();
    if (token) {
      if (text === '') {
        const data = await listUserIngredients(token);
        setIngredients(data);
      } else {
        console.log('Search functionality to be implemented...');
      }
    } else {
      console.error('Token error');
    }
  };

  const handleDelete = async (id: number) => {
    const token = await getToken();
    if (token) {
      const response = await deleteUserIngredient(token, id);
      if (response === 'Deleted') {
        loadUserIngredients();
      }
    } else {
      console.error('Token error');
    }
  };

  const handleIngredientSelect = () => {
    router.push({ pathname: '../add_ingredients' });
  };

  const renderIngredientItem = ({ item }: { item: IngredientItem }) => (
    <TouchableOpacity style={styles.basicContainer}>
      <Text style={styles.title}>{item.name.toUpperCase()}</Text>
      <TouchableOpacity style={styles.removeButton} onPress={() => handleDelete(item.id)}>
        <Text style={styles.addButtonText}>X</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
            <Text style={styles.containerTitle}>Fridge</Text>
      <View style={styles.subTitleContainer}>
        <TouchableOpacity style={styles.backContainer} onPress={() => router.push('/home')}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton} onPress={handleIngredientSelect}>
          <Text style={styles.addButtonText}>Add Ingredient</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.searchBar}
        placeholder="Search..."
        value={searchText}
        onChangeText={handleSearch}
      />

      <FlatList
        data={ingredients}
        keyExtractor={(item) => item.id.toString()}
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
    backgroundColor: '#FFFDE7',
    paddingHorizontal: 20,
  },

  containerTitle: {
    paddingTop: 20,
    fontSize: 70,
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'sans-serif-condensed',
    fontStyle: 'italic',
    color: '#000',
  },


  subTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    padding: 10,
  },
  backContainer: {
    backgroundColor: '#2E7D32',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    minWidth: 120,
  },
  backButtonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  addButton: {
    width: 200,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#2E7D32',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },

  removeButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#2E7D32',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },


  addButtonText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontSize: 16,
    color: '#333',
  },
  basicContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#333',
  },
});

