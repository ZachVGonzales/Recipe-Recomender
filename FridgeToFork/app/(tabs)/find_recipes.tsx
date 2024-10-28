import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, View, Alert, Text } from 'react-native';

import LoginBox from '@/components/LoginBox';
import Recipe from '@/components/Recipe';
import { FlatList } from 'react-native-gesture-handler';


// Type for items within each category
interface RecipeItem {
  id: string;
  title: string;
  image: string;
  cookTime: string;
  onPress: () => void;
};


// Data object type
type RecipePageData = {
  recipes: RecipeItem[];
};


const recipePageData: RecipePageData = {
  recipes: [
    { id: '0', title: "Spaghetti Carbonara", image: "https://assets.bonappetit.com/photos/5a6f48f94f860a026c60fd71/1:1/w_2560%2Cc_limit/pasta-carbonara.jpg", cookTime: "20 minutes", onPress: () => Alert.alert('You clicked on Spaghetti Carbonara')},
    { id: '1', title: "Chicken Teryaki", image: "https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_1:1/k%2FPhoto%2FRecipes%2F2024-05-chicken-teriyaki-190%2Fchicken-teriyaki-190-171-horizontal", cookTime: "45 minutes", onPress: () => Alert.alert('You clicked on Chicken Teryaki')},
    { id: '2', title: "Grilled Salmon", image: "https://www.allrecipes.com/thmb/CfocX_0yH5_hFxtbFkzoWXrlycs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/ALR-12720-grilled-salmon-i-VAT-4x3-888cac0fb8a34f6fbde7bf836850cd1c.jpg", cookTime: "30 minutes", onPress: () => Alert.alert('You clicked on Spaghetti Carbonara')},
    { id: '3', title: "Beef Stroganoff", image: "https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_4:3/k%2FPhoto%2FRecipes%2F2024-03-beef-stroganoff-190%2Fbeef-stroganoff-190-342_1", cookTime: "30 minutes", onPress: () => Alert.alert('You clicked on Beef Stroganoff')},
    { id: '4', title: "Margherita Pizza", image: "https://www.abeautifulplate.com/wp-content/uploads/2015/08/the-best-homemade-margherita-pizza-1-4-500x500.jpg", cookTime: "20 minutes", onPress: () => Alert.alert('You clicked on Margherita Pizza')}
  ],
};


export default function RecipeScreen() {
  const data = recipePageData;

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
      <FlatList
        data = {data.recipes}
        renderItem={renderRecipeItem}
        keyExtractor={item => item.id}
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
