import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, SectionList } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

type Ingredient = {
  id: string;
  name: string;
  description: string;
  nutrition: string;
};

const ingredientData = [
  { id: '1', name: 'Tomato', description: 'Rich in vitamins C and K.', nutrition: '20 calories, 5g carbs, 1g protein' },
  { id: '2', name: 'Carrot', description: 'High in beta-carotene.', nutrition: '25 calories, 6g carbs, 0.5g protein' },
  { id: '3', name: 'Spinach', description: 'Good source of iron and fiber.', nutrition: '23 calories, 3.6g carbs, 2.9g protein' },
  { id: '4', name: 'Chicken Breast', description: 'High in protein.', nutrition: '165 calories, 0g carbs, 31g protein' },
  { id: '5', name: 'Broccoli', description: 'Rich in vitamin C and fiber.', nutrition: '55 calories, 11g carbs, 3.7g protein' },
  { id: '6', name: 'Garlic', description: 'Has antibacterial properties.', nutrition: '4.5 calories, 1g carbs, 0.2g protein' },
  { id: '7', name: 'Onion', description: 'High in antioxidants.', nutrition: '40 calories, 9g carbs, 1.1g protein' },
  { id: '8', name: 'Bell Pepper', description: 'Rich in vitamins A and C.', nutrition: '31 calories, 6g carbs, 1g protein' },
  { id: '9', name: 'Avocado', description: 'High in healthy fats.', nutrition: '160 calories, 9g carbs, 2g protein' },
  { id: '10', name: 'Quinoa', description: 'Complete protein source.', nutrition: '120 calories, 21g carbs, 4g protein' },
  { id: '11', name: 'Lettuce', description: 'Low in calories, high in water.', nutrition: '5 calories, 1g carbs, 0.5g protein' },
  { id: '12', name: 'Cucumber', description: 'Hydrating and low-calorie.', nutrition: '8 calories, 2g carbs, 0.3g protein' },
  { id: '13', name: 'Apple', description: 'Rich in fiber and vitamin C.', nutrition: '95 calories, 25g carbs, 0.5g protein' },
  { id: '14', name: 'Almonds', description: 'Good source of healthy fats.', nutrition: '160 calories, 6g carbs, 6g protein' },
  { id: '15', name: 'Egg', description: 'High in protein and B vitamins.', nutrition: '70 calories, 0.6g carbs, 6g protein' },
  { id: '16', name: 'Milk', description: 'Good source of calcium.', nutrition: '103 calories, 12g carbs, 8g protein' },
  { id: '17', name: 'Sweet Potato', description: 'Rich in fiber and vitamins.', nutrition: '112 calories, 26g carbs, 2g protein' },
  { id: '18', name: 'Banana', description: 'High in potassium.', nutrition: '105 calories, 27g carbs, 1.3g protein' },
  { id: '19', name: 'Salmon', description: 'High in omega-3 fatty acids.', nutrition: '180 calories, 0g carbs, 25g protein' },
  { id: '20', name: 'Tofu', description: 'Good source of plant protein.', nutrition: '76 calories, 2g carbs, 8g protein' },
];

export default function AddIngredient() {
  const [ingredient, setIngredient] = useState('');
  const [quantity, setQuantity] = useState('');

  return (
    <View style={styles.container}>
      {/* Ingredient Input */}
      <TextInput
        style={styles.input}
        placeholder="Ingredient name"
        value={ingredient}
        onChangeText={setIngredient}
      />

      {/* Quantity Input */}
      <TextInput
        style={styles.quantityInput}
        placeholder="Quantity"
        keyboardType="numeric"
        value={quantity}
        onChangeText={setQuantity}
      />

      {/* Ingredient List */}
      <SectionList
        sections={[{ title: 'Available Ingredients', data: ingredientData }]}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.ingredientContainer}>
            <Text style={styles.ingredientName}>{item.name}</Text>
            <Text style={styles.ingredientDescription}>{item.description}</Text>
            <Text style={styles.ingredientNutrition}>{item.nutrition}</Text>
          </View>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionTitle}>{title}</Text>
        )}
      />

      {/* Check Mark Button */}
      <TouchableOpacity style={styles.checkButton} onPress={() => { /* Add confirm functionality later */ }}>
        <Ionicons name="checkmark" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
  },
  input: {
    marginTop: 20,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    padding: 8,
    borderRadius: 4,
    fontSize: 16,
  },
  quantityInput: {
    marginTop: 20,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    padding: 8,
    borderRadius: 4,
    fontSize: 16,
  },
  checkButton: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 35,
    fontFamily: 'italiano',
  },
  ingredientContainer: {
    flexDirection: 'column',
    padding: 16,
    backgroundColor: '#D7EBD5',  // Green background
    borderRadius: 8,
    marginBottom: 10,            // Gap between items
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  ingredientName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  ingredientDescription: {
    fontSize: 14,
    color: '#666',
  },
  ingredientNutrition: {
    fontSize: 12,
    color: '#999',
  },
});
