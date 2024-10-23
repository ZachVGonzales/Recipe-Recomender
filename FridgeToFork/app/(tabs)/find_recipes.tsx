import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, View, Alert, Text } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import SearchComponent from '@/components/SearchComponent';
import LoginBox from '@/components/LoginBox';
import Recipe from '@/components/Recipe';



export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
        <Text style = {styles.recipeText}>RECIPES</Text>
        <LoginBox></LoginBox>
      <View style={styles.recipeContainer}>
        <Recipe
          title="Spaghetti Carbonara"
          image="https://assets.bonappetit.com/photos/5a6f48f94f860a026c60fd71/1:1/w_2560%2Cc_limit/pasta-carbonara.jpg"
          cookTime="20 minutes"
          onPress={() => Alert.alert('You clicked on Spaghetti Carbonara')}
        />
        <Recipe
          title="Chicken Teryaki"
          image="https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_1:1/k%2FPhoto%2FRecipes%2F2024-05-chicken-teriyaki-190%2Fchicken-teriyaki-190-171-horizontal"
          cookTime="45 minutes"
          onPress={() => Alert.alert('You clicked on Chicken Teryaki')}
          
        />
        <Recipe
          title="Grilled Salmon"
          image="https://www.allrecipes.com/thmb/CfocX_0yH5_hFxtbFkzoWXrlycs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/ALR-12720-grilled-salmon-i-VAT-4x3-888cac0fb8a34f6fbde7bf836850cd1c.jpg"
          cookTime="30 minutes"
          onPress={() => Alert.alert('You clicked on Spaghetti Carbonara')}
        />

        <Recipe 
        title="Beef Stroganoff"
        image="https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_4:3/k%2FPhoto%2FRecipes%2F2024-03-beef-stroganoff-190%2Fbeef-stroganoff-190-342_1"
        cookTime="30 minutes"
        onPress={() => Alert.alert('You clicked on Beef Stroganoff')}
        />
        <Recipe 
        title="Margherita Pizza"
        image="https://www.abeautifulplate.com/wp-content/uploads/2015/08/the-best-homemade-margherita-pizza-1-4-500x500.jpg"
        cookTime="20 minutes"
        onPress={() => Alert.alert('You clicked on Margherita Pizza')}
        />
        {/* Add more recipes here */}
      </View>
    </View>
      );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        top: -60,
        left: 20,
        width: '90%',
    },
    scrollContainer: {
      padding: 10, // Adjust as needed
    },
    recipeContainer: {
      flexDirection: 'column', // Stack recipes on top of each other
      position: 'relative',    // Use relative positioning to allow custom positioning
      top: 130,                 // Adjust top position as needed
      left: 0,                 // Adjust left position as needed
      right: 0,                // Adjust right position as needed
      justifyContent: 'center', // Center the items horizontally
      alignItems: 'center',     // Align the items in the center vertically
    },
    recipeText: {
        top: 120,
        left:10, 
        fontWeight: 'bold',
        fontSize: 40,
      }
  });
