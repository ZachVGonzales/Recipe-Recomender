import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

export const saveToken = async (token: string) => {
  try {
    if (Platform.OS === 'web') {
      // Use AsyncStorage on web
      await AsyncStorage.setItem('userToken', token);
    } else {
      // Use SecureStore on iOS and Android
      await SecureStore.setItemAsync('userToken', token);
    }
    console.log("Token saved successfully:", token);
  } catch (error) {
    console.error("Error saving token:", error);
  }
};

export const getToken = async () => {
  try {
    if (Platform.OS === 'web') {
      return await AsyncStorage.getItem('userToken');
    } else {
      return await SecureStore.getItemAsync('userToken');
    }
  } catch (error) {
    console.error("Error retrieving token:", error);
    return null;
  }
};

export const clearToken = async () => {
  try {
    if (Platform.OS === 'web') {
      // Use AsyncStorage on web
      await AsyncStorage.removeItem('userToken');
    } else {
      // Use SecureStore on iOS and Android
      await SecureStore.deleteItemAsync('userToken');
    }
    console.log("Token cleared successfully");
  } catch (error) {
    console.error("Error clearing token:", error);
  }
};
