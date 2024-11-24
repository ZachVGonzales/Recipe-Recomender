import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet , TextInput} from 'react-native';
import { useRouter } from 'expo-router';
import { listUserRecipes} from '../api/userRecipeService'
import { getToken } from '../api/tokenUtils'
import { RecipeItem } from '@/types/navigationTypes';
import { getProfile} from '../api/profileService';


interface IngredientItem {
  id: number;
  name: string;
}


export default function FridgeScreen() {
  const [searchText, setSearchText] = useState('');
  const [recipes, setRecipes] = useState([]);
  const router = useRouter();

  const [name, setName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [food, setFood] = useState('');
  const [email, setEmail] = useState('');


  
  const getProfileInfo = async () => {
    try {
      const token = await getToken();
      if (token) {
        const profileData = await getProfile(token);

        if (profileData) {
          setName(profileData.name.trim());
          setBirthday(profileData.birthday.trim());
          setFood(profileData.food.trim());
          setEmail(profileData.email.trim());
        }

      } else {
        console.error('Token error');
      }
    } catch (error) {
      console.error('Failed to load user ingredients:', error);
    }
  };

  React.useEffect(() => {
    console.log("Extracted Name:", name);
        getProfileInfo();
      }, []);


  const loadUserRecipes = async () => {
    try {
      const token = await getToken();
      if (token) {
        const data = await listUserRecipes(token);
        setRecipes(data);
      } else {
        console.error("token error")
      }
    } catch (error) {
      console.error('Failed to load user Recipes:', error);
    }
  };

  useEffect(() => {
    // Load initial list of ingredients
    loadUserRecipes();
  }, []);

  const handleSearch = async (text: string) => {
    setSearchText(text);
    const token = await getToken();
    if (token) {
      if (text === '') {
        // Reset to full list when search bar is cleared
        const data = await listUserRecipes(token);
        setRecipes(data);
      } else {
        // TODO: implement search functionality here
        console.log("search here...");
      }
    } else {
      console.error("token error");
    }
  }
  const handleRecipeSelect = (recipe: RecipeItem) => {
    // Navigate to recipe_details and pass the recipe ID as a parameter
    router.push({pathname: "./recipe_details", params: {id: recipe.id}});
  };




  const renderRecipeItem = ({ item }: {item: RecipeItem}) => (
    <TouchableOpacity style={styles.basicContainer} onPress={() => handleRecipeSelect(item)}>
      <Text style={styles.title}>{item.name.toUpperCase()}</Text>
    </TouchableOpacity>
  );  

  return (
    <View style={styles.container}>

<Text style={styles.containerTitle}>Profile</Text>

      {/* Profile Information Section */}
      <View style={styles.profileSection}>
        <Text style={styles.profileName}>{name}</Text>
        <Text style={styles.profileDetail}>Birthday: {birthday}</Text>
        <Text style={styles.profileDetail}>Email: {email}</Text>
        <Text style={styles.profileDetail}>Favorite Food: {food}</Text>
      </View>


      <View style={styles.subTitleContainer}>
  <Text style={styles.fridgeText}>Past Recipes</Text>
  <TouchableOpacity
    style={styles.backContainer}
    onPress={() => router.push('/home')} // Ensure '/home' exists in your routes
  >
    <Text style={styles.backButtonText}>{'\u2190'} Back</Text> {/* Use Unicode for the arrow */}
  </TouchableOpacity>
</View>


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
  container: {
    flex: 1,
    backgroundColor: '#FFFDE7',
    paddingHorizontal: 20,
  },

  profileSection: {
    backgroundColor: '#A5D6A7',
    borderRadius: 10,
    padding: 20,
    marginVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  profileName: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#2E7D32',
    textAlign: 'center',
    marginBottom: 10,
  },
  profileDetail: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
    marginBottom: 5,
  },


  containerTitle: {
    paddingTop: 30,
    fontSize: 90,
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'sans-serif-condensed',
    fontStyle: 'italic',
    color: '#000',
  },

  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#2E7D32',
  },
  categoryTab: {
    padding: 10,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: '#8ccc72',
  },
  categoryText: {
    fontSize: 10,
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
    backgroundColor: '#2E7D32',
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
    backgroundColor: '#2E7D32',  // Green background color
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
    top: 20,
    fontWeight: 'bold',
    fontSize: 30,
  },
  subTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    fontSize: 24,
    padding: 20,
  },
  backContainer: {
    backgroundColor: '#2E7D32',  // Green background color
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
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  basicContainer: {
    flexDirection: 'row',         // Name and activity in a row
    alignItems: 'center',         // Align them vertically centered
    justifyContent: 'space-between', // Ensure they are spaced correctly
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
