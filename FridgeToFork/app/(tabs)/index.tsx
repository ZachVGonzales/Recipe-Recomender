import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, SectionList, Alert, TouchableOpacity } from 'react-native';
import Recipe from '@/components/Recipe';
import { WebBrowserCompleteAuthSessionResult } from 'expo-web-browser';
import { LogBox } from 'react-native';

// Inside your main component or App.js
LogBox.ignoreLogs([
  'Reduced motion setting is enabled on this device',
]);


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

// Define a type for the SectionList data
interface SectionData {
  title: string;
  data: (FriendActivityProps | RecipeItem)[];
}

// Data object type
type HomePageData = {
  friendActivity: FriendActivityProps[];
  recentRecipes: RecipeItem[];
  suggestedRecipes: RecipeItem[];
};


const FriendActivity: React.FC<FriendActivityProps> = ({ name, activity }) => {
  return (
    <View style={styles.basicContainer}>
      {/* Name on the left */}
      <View style={styles.nameContainer}>
        <Text style={styles.name}>{name}</Text>
      </View>

      {/* Activity on the right, in its own box */}
      <View style={styles.activityBox}>
        <Text style={styles.activityText}>{activity}</Text>
      </View>
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


export default function HomeScreen() {
  const sections: SectionData[] = [
    {
      title: 'Friend Activity',
      data: homePageData.friendActivity,
    },
    {
      title: 'Recent Recipes',
      data: homePageData.recentRecipes,
    },
    {
      title: 'Suggested Recipes',
      data: homePageData.suggestedRecipes,
    },
  ];

  const renderFriendActivity = ({ item }: { item: FriendActivityProps }) => (
    <FriendActivity
      id={item.id}
      key={item.id}
      name={item.name}
      activity={item.activity}
    />
  );

  const renderRecipeItem = ({ item }: { item: RecipeItem }) => (
    <View style={styles.basicContainer}>
      <Recipe
        title={item.title}
        image={item.image}
        cookTime={item.cookTime}
        onPress={item.onPress}
      />
    </View>    
  );

  return (
    <View style={styles.scrollContainer}>
      {/* Add the title here */}
      <Text style={styles.containerTitle}>Fridge To Fork</Text>
      <SectionList
        sections={sections}
        keyExtractor={(item, index) => item.id || index.toString()}
        renderItem={({ item, section }) => {
          // Use type guards to determine the type of the item
          if ('activity' in item) {
            return renderFriendActivity({ item });
          } else {
            return renderRecipeItem({ item });
          }
        }}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionTitle}>{title}</Text>
        )}
        stickySectionHeadersEnabled={false}
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
  recipeContainer: {
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
    justifyContent: 'center', // Center the items horizontally
    alignItems: 'center',     // Align the items in the center vertically
  },
  section: {
    marginBottom: 24,
    alignItems: 'center', // center text inside each section
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'left', // centers text
    marginTop: 35,
    fontFamily: 'italiano',
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
  nameContainer: {
    flex: 1.5,                       // 30% of the container width
    justifyContent: 'center',       // Vertically center the text
    alignItems: 'flex-start',       // Align text to the left
  },
  activityBox: {
    flex: 9,                       // 70% of the container width
    backgroundColor: '#ffffff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    justifyContent: 'center',       // Vertically center the text
    alignItems: 'flex-start',       // Ensure text is aligned at the same point
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  activityText: {
    fontSize: 14,
    color: '#666',
  },
});
