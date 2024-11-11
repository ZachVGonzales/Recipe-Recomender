import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { AuthProvider, useAuth } from './AuthContext'; // Import AuthProvider and useAuth

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const [isReady, setIsReady] = useState(false);  // New state to track readiness

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
      setIsReady(true);  // Update state when fonts are loaded and app is ready
    }
  }, [loaded]);

  if (!isReady) {
    return null;  // Don't render anything until everything is ready
  }

  return (
    <AuthProvider> {/* Wrap the whole app with AuthProvider */}
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <AuthWrapper /> {/* This is where we call useAuth() */}
      </ThemeProvider>
    </AuthProvider>
  );
}

function AuthWrapper() {
  const { isAuthenticated } = useAuth();  // Now useAuth is inside AuthProvider
  console.log("is Authenticated? ", isAuthenticated)

  return (
    <Stack>
      {isAuthenticated ? (
        <Stack.Screen name="(home)" options={{ headerShown: false }} />
      ) : (
        <Stack.Screen name="login" options={{ headerShown: false }} />
      )}
      <Stack.Screen name="+not-found" />
      <Stack.Screen name="recipe_details" />
      <Stack.Screen name="add_ingredients" />
    </Stack>
  );
}
