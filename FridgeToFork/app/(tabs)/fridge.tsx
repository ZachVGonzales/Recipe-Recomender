import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

// Define the valid categories as a union type
type Category = 'Meats' | 'Grains' | 'Veggies' | 'Fruits' | 'Others';

// Type for items within each category
type Item = {
  id: string;
  name: string;
  quantity: number;
  unit: string; // Added the unit property
};

// Data object type
type Data = {
  [key in Category]: Item[];
};

// Example data with quantities and units
const initialData: Data = {
  Meats: [
    { id: '1', name: 'Ground Beef', quantity: 100, unit: 'g' },
    { id: '2', name: 'Chicken', quantity: 100, unit: 'g' },
    { id: '3', name: 'Pork', quantity: 200, unit: 'g' },
    { id: '4', name: 'Turkey', quantity: 150, unit: 'g' },
    { id: '5', name: 'Bacon', quantity: 50, unit: 'g' },
    { id: '6', name: 'Lamb', quantity: 120, unit: 'g' },
    { id: '7', name: 'Duck', quantity: 140, unit: 'g' },
  ],
  Grains: [
    { id: '1', name: 'Rice', quantity: 200, unit: 'g' },
    { id: '2', name: 'Quinoa', quantity: 150, unit: 'g' },
    { id: '3', name: 'Oats', quantity: 300, unit: 'g' },
    { id: '4', name: 'Barley', quantity: 250, unit: 'g' },
    { id: '5', name: 'Couscous', quantity: 100, unit: 'g' },
    { id: '6', name: 'Wheat', quantity: 500, unit: 'g' },
    { id: '7', name: 'Cornmeal', quantity: 400, unit: 'g' },
  ],
  Veggies: [
    { id: '1', name: 'Carrots', quantity: 50, unit: 'g' },
    { id: '2', name: 'Broccoli', quantity: 100, unit: 'g' },
    { id: '3', name: 'Spinach', quantity: 70, unit: 'g' },
    { id: '4', name: 'Cauliflower', quantity: 200, unit: 'g' },
    { id: '5', name: 'Lettuce', quantity: 150, unit: 'g' },
    { id: '6', name: 'Tomatoes', quantity: 120, unit: 'g' },
    { id: '7', name: 'Peppers', quantity: 80, unit: 'g' },
  ],
  Fruits: [
    { id: '1', name: 'Apple', quantity: 2, unit: 'pcs' },
    { id: '2', name: 'Banana', quantity: 3, unit: 'pcs' },
    { id: '3', name: 'Orange', quantity: 4, unit: 'pcs' },
    { id: '4', name: 'Strawberries', quantity: 200, unit: 'g' },
    { id: '5', name: 'Blueberries', quantity: 150, unit: 'g' },
    { id: '6', name: 'Grapes', quantity: 300, unit: 'g' },
    { id: '7', name: 'Pineapple', quantity: 1, unit: 'pcs' },
  ],
  Others: [
    { id: '1', name: 'Milk', quantity: 1, unit: 'L' },
    { id: '2', name: 'Cheese', quantity: 200, unit: 'g' },
    { id: '3', name: 'Butter', quantity: 100, unit: 'g' },
    { id: '4', name: 'Eggs', quantity: 12, unit: 'pcs' },
    { id: '5', name: 'Yogurt', quantity: 500, unit: 'g' },
    { id: '6', name: 'Cream', quantity: 250, unit: 'ml' },
    { id: '7', name: 'Tofu', quantity: 300, unit: 'g' },
  ],
};


export default function FridgeScreen() {
  const [data, setData] = useState<Data>(initialData);
  const [selectedCategory, setSelectedCategory] = useState<Category>('Meats');

  const categories: Category[] = ['Meats', 'Grains', 'Veggies', 'Fruits', 'Others'];

  // Function to increase item quantity
  const increaseQuantity = (category: Category, itemId: string) => {
    setData((prevData) => ({
      ...prevData,
      [category]: prevData[category].map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      ),
    }));
  };

  // Function to decrease item quantity
  const decreaseQuantity = (category: Category, itemId: string) => {
    setData((prevData) => ({
      ...prevData,
      [category]: prevData[category].map((item) =>
        item.id === itemId && item.quantity > 0
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ),
    }));
  };

  const renderCategoryTab = (category: Category) => (
    <TouchableOpacity
      key={category}
      style={[styles.categoryTab, selectedCategory === category && styles.activeTab]}
      onPress={() => setSelectedCategory(category)}>
      <Text style={[styles.categoryText, selectedCategory === category && styles.activeCategoryText]}>
        {category}
      </Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }: { item: Item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemName}>{item.name}</Text>

      {/* Quantity and Controls */}
      <View style={styles.quantityControls}>
        <Text style={styles.itemQuantity}>
          {item.quantity} {item.unit} {/* Display quantity and unit */}
        </Text>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => increaseQuantity(selectedCategory, item.id)}>
          <Text style={styles.iconText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => decreaseQuantity(selectedCategory, item.id)}>
          <Text style={styles.iconText}>-</Text>
        </TouchableOpacity>
      </View>
      
    </View>    
  );

  return (
    
    
    <View style={styles.container}>

      <Text style = {styles.fridgeText}>FRIDGE</Text>
      <TouchableOpacity style={styles.addButton} onPress={() => {}}>
  <Text style={styles.addButtonText}>+</Text>
</TouchableOpacity>
      {/* Category Tabs */}
      <View style={styles.tabsContainer}>
        {categories.map((category) => renderCategoryTab(category))}
      </View>

      {/* Items List */}
      <FlatList
        data={data[selectedCategory]} // Dynamically load items based on selected category
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
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
    backgroundColor: '#1fcb25',
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
    top: -10,
    left: 330,
    width: 50,               // Width of the circle
    height: 50,              // Height of the circle
    borderRadius: 25,        // Half of the width/height to make it circular
    backgroundColor: '#1fcb25',  // Green background color
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
    top: 30, 
    fontWeight: 'bold',
    fontSize: 40,
  }
});
