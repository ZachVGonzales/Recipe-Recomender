import { login, signup } from '../api/loginService';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from './AuthContext';
import { saveToken } from '../api/tokenUtils';


export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { applogin, setLoading } = useAuth();
  

  const handleLogin = async () => {
    const token = await login(username, password);
    try {
      if (token) {
        await saveToken(token);
        applogin();
        setLoading(false)
        router.push("./home");  // Navigate to Home
        console.log("token saved securely:", token)
      } else {
        Alert.alert("Login failed", "Invalid credentials, please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleSignUp = async () => {
    const token = await signup(username, password);
    try {
      if (token) {
        await saveToken(token);
        applogin();
        setLoading(false)
        router.push("./home");  // Navigate to Home
        console.log("token saved securely:", token)
      } else {
        Alert.alert("Signup failed", "Invalid credentials, please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Fridge To Fork</Text>

      {/* Username Input */}
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* Sign In Button */}
      <TouchableOpacity style={styles.signInButton} onPress={handleLogin}>
        <Text style={styles.signInButtonText}>Login</Text>
      </TouchableOpacity>

      {/* Create New Account */}
      <TouchableOpacity onPress={handleSignUp}>
        <Text style={styles.createAccount}>Create New Account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 60,
    textAlign: 'center',
    marginBottom: 40,
    fontFamily: 'italiano',
    fontStyle: 'italic',
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
  forgotPassword: {
    fontSize: 14,
    color: '#666',
    marginVertical: 10,
    textDecorationLine: 'underline',
    textAlign: 'right',
    width: '80%',
  },
  signInButton: {
    width: '80%',
    height: 50,
    backgroundColor: '#D7EBD5',
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
    color: 'black',
    fontWeight: 'bold',
  },
  createAccount: {
    fontSize: 14,
    color: '#666',
    marginVertical: 20,
    textDecorationLine: 'underline',
  },
});
