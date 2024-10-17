import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

type RecipeProps = {
  title: string;
  image: string;
  cookTime: string;
  onPress: () => void;
};

const Recipe: React.VFC<RecipeProps> = ({ title, image, cookTime, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.touchable}>
      <View style={styles.container}>
        <Image source={{ uri: image }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.cookTime}>Cook Time: {cookTime}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    width: '100%', // Ensures touchable spans the full width of the parent
    marginBottom: 20,
  },
  container: {
    flexDirection: 'row', // Image and text side by side
    width: '100%', // Make the recipe span across the entire screen
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  textContainer: {
    flex: 1,
    paddingLeft: 10,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  cookTime: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
});

export default Recipe;
