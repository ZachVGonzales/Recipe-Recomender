import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { AuthProvider, useAuth } from './AuthContext'; // Import AuthProvider and useAuth
import { StatusBar } from 'expo-status-bar';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [isReady, setIsReady] = useState(false);  // New state to track readiness

  useEffect(() => {
      SplashScreen.hideAsync();
      setIsReady(true);  // Update state when fonts are loaded and app is ready
  });

  if (!isReady) {
    return null;  // Don't render anything until everything is ready
  }

  return (
    
    <AuthProvider> {/* Wrap the whole app with AuthProvider */}
      <StatusBar hidden = {true}/>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <AuthWrapper /> {/* This is where we call useAuth() */}
      </ThemeProvider>
    </AuthProvider>
  );
}

function AuthWrapper() {
  const { isAuthenticated, loading } = useAuth();  // Now useAuth is inside AuthProvider
  console.log("is Authenticated? ", isAuthenticated)

  if (loading) {
    return null;
  }

  return (
    <Stack initialRouteName="index"
    screenOptions={{
      headerShown: false, // Disable header globally
    }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      {isAuthenticated && (
        <Stack.Screen name="home" options={{headerShown: false}} />
      )}
      {isAuthenticated && (
        <Stack.Screen name="recipe_details" options={{headerShown: false}} />
      )}
      {isAuthenticated && (
        <Stack.Screen name="add_ingredients" options={{headerShown: false}} />
      )}
      {isAuthenticated && (
        <Stack.Screen name="find_recipes" options={{headerShown: false}} />
      )}
      {isAuthenticated && (
        <Stack.Screen name="fridge" options={{headerShown: false}} />
      )}
      {isAuthenticated && (
        <Stack.Screen name="profile_page" options={{headerShown: false}} />
      )}
    </Stack>
  );
}
