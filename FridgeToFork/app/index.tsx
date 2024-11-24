import { login, signup } from '../api/loginService';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from './AuthContext';
import { saveToken } from '../api/tokenUtils';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State to display error messages
  const router = useRouter();
  const { applogin, setLoading } = useAuth();

  const handleLogin = async () => {
    if (!username || !password) {
      setError('Please fill out all fields.'); // Display error for empty fields
      return;
    }

    try {
      const token = await login(username, password);
      if (token) {
        await saveToken(token);
        applogin();
        setLoading(false);
        router.push('./home'); // Navigate to Home
        console.log('Token saved securely:', token);
      } else {
        setError('Invalid username or password. Please try again.'); // Invalid credentials error
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Fridge To Fork</Text>

      {/* Error Message */}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {/* Username Input */}
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => {
          setError(''); // Clear error when user types
          setUsername(text);
        }}
        autoCapitalize="none"
      />

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(text) => {
          setError(''); // Clear error when user types
          setPassword(text);
        }}
        secureTextEntry
      />

      {/* Sign In Button */}
      <TouchableOpacity style={styles.signInButton} onPress={handleLogin}>
        <Text style={styles.signInButtonText}>Login</Text>
      </TouchableOpacity>

      {/* Create New Account */}
      <TouchableOpacity onPress={() => router.push('./createaccount')}>
        <Text style={styles.createAccount}>Create New Account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFDE7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 80,
    textAlign: 'center',
    marginBottom: 40,
    fontFamily: 'italiano',
    fontStyle: 'italic',
    color: '#000',
  },
  errorText: {
    color: '#000', // Red error message
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    width: '80%',
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 10,
    fontSize: 16,
  },
  signInButton: {
    width: '80%',
    height: 50,
    backgroundColor: '#A5D6A7',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  signInButtonText: {
    fontSize: 18,
    color: '#2E7D32',
    fontWeight: 'bold',
  },
  createAccount: {
    fontSize: 14,
    color: '#666',
    marginVertical: 20,
    textDecorationLine: 'underline',
  },
});
