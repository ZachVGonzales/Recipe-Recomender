import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, ScrollView, Alert, TouchableOpacity } from 'react-native';
import Recipe from '@/components/Recipe';
import { WebBrowserCompleteAuthSessionResult } from 'expo-web-browser';

// Type for items within each category
type RecipeItem = {
  id: string;
  title: string;
  image: string;
  cookTime: string;
  onPress: () => void;
};

type FriendActivityProps = {
  id: string;
  name: string;
  activity: string;
}

// Data object type
type HomePageData = {
  friendActivity: FriendActivityProps[];
  recentRecipes: RecipeItem[];
  suggestedRecipes: RecipeItem[];
};


const FriendActivity: React.FC<FriendActivityProps> = ({ name, activity }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.activity}>{activity}</Text>
    </View>
  );
};



const homePageData: HomePageData = {
  friendActivity: [
    { id: '1', name: 'Alice', activity: 'Liked Spaghetti Bolognese' },
    { id: '2', name: 'Bob', activity: 'Cooked Chicken Alfredo' },
  ],
  recentRecipes: [
    { id: '1', title: "Spaghetti Carbonara", image: "https://assets.bonappetit.com/photos/5a6f48f94f860a026c60fd71/1:1/w_2560%2Cc_limit/pasta-carbonara.jpg", cookTime: "20 minutes", onPress: () => Alert.alert('You clicked on Spaghetti Carbonara')},
    { id: '2', title: "Spaghetti Carbonara", image: "https://assets.bonappetit.com/photos/5a6f48f94f860a026c60fd71/1:1/w_2560%2Cc_limit/pasta-carbonara.jpg", cookTime: "20 minutes", onPress: () => Alert.alert('You clicked on Spaghetti Carbonara')},
  ],
  suggestedRecipes: [
    { id: '1', title: "Spaghetti Carbonara", image: "https://assets.bonappetit.com/photos/5a6f48f94f860a026c60fd71/1:1/w_2560%2Cc_limit/pasta-carbonara.jpg", cookTime: "20 minutes", onPress: () => Alert.alert('You clicked on Spaghetti Carbonara')},
    { id: '2', title: "Spaghetti Carbonara", image: "https://assets.bonappetit.com/photos/5a6f48f94f860a026c60fd71/1:1/w_2560%2Cc_limit/pasta-carbonara.jpg", cookTime: "20 minutes", onPress: () => Alert.alert('You clicked on Spaghetti Carbonara')},
  ],
};


// Define the props for the RecipeCard component
type RecipeCardProps = {
  recipe: RecipeItem;
};

// RecipeCard component
const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => (
  <View style={styles.recipeCard}>
    <Image source={{ uri: recipe.image }} style={styles.recipeImage} />
    <Text style={styles.recipeTitle}>{recipe.title}</Text>
  </View>
);


export default function HomeScreen() {
  const [data] = useState<HomePageData>(homePageData);

  const renderFriendActivity = ({ item }: { item: FriendActivityProps }) => (
    <FriendActivity
      id={item.id}
      key={item.id}
      name={item.name}
      activity={item.activity}
    />
  );

  const renderRecipeItem = ({ item }: { item: RecipeItem }) => (
    <View style={styles.container}>
      <Recipe
        title={item.title}
        image={item.image}
        cookTime={item.cookTime}
        onPress={item.onPress}
      />
    </View>    
  );

  return (
    <ScrollView style={styles.scrollContainer}>
      <Text style={styles.containerTitle}>Fridge To Fork</Text>
      {/* Friend Activity Section */}
      <Text style={styles.sectionTitle}>Friend Activity</Text>
      <FlatList
        data={data.friendActivity}          // The friend activity data
        keyExtractor={(item) => item.id}    // Extract unique key from each item
        renderItem={renderFriendActivity}   // Render each activity using renderFriendActivity function
        horizontal={false}                  // Set to vertical list by default
        showsVerticalScrollIndicator={false}
      />

      {/* Recent Recipes Section */}
      <Text style={styles.sectionTitle}>Recent Recipes</Text>
      <FlatList
        data={homePageData.recentRecipes}
        keyExtractor={(item) => item.id}
        renderItem={renderRecipeItem}
        horizontal={false}
      />

      {/* Suggested Recipes Section */}
      <Text style={styles.sectionTitle}>Suggested Recipes</Text>
      <FlatList
        data={homePageData.suggestedRecipes}
        keyExtractor={(item) => item.id}
        renderItem={renderRecipeItem}
        horizontal={false}
      />
    </ScrollView>
    
  );
}


const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1, // Ensures content stretches vertically
    padding: 16,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 20,
  },
  containerTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center', // centers text
    marginBottom: 40
  },
  container: {
    backgroundColor: '#f8f8f8',
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  section: {
    marginBottom: 24,
    alignItems: 'center', // center text inside each section
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center', // centers text
  },
  friendActivity: {
    fontSize: 16,
    marginVertical: 4,
    textAlign: 'center', // centers text
  },
  recipeCard: {
    width: 150,
    marginRight: 16,
    alignItems: 'center', // centers the recipe card content
  },
  recipeImage: {
    width: 150,
    height: 100,
    borderRadius: 8,
  },
  recipeTitle: {
    fontSize: 16,
    marginTop: 8,
    fontWeight: '500',
    textAlign: 'center', // centers text
  },
  recipeContainer: {
    flexDirection: 'column', // Stack recipes on top of each other
    position: 'relative',    // Use relative positioning to allow custom positioning
    top: 140,                 // Adjust top position as needed
    left: 0,                 // Adjust left position as needed
    right: 0,                // Adjust right position as needed
    justifyContent: 'center', // Center the items horizontally
    alignItems: 'center',     // Align the items in the center vertically
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  activity: {
    fontSize: 14,
    marginTop: 4,
    color: '#555',
  },
});
