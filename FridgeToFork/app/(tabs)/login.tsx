import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    router.push("/(tabs)/")
  };

  const handleForgotPassword = () => {
    Alert.alert('Forgot Password clicked');
  };

  const handleCreateAccount = () => {
    Alert.alert('Create New Account clicked');
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

      {/* Forgot Password */}
      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* Sign In Button */}
      <TouchableOpacity style={styles.signInButton} onPress={handleLogin}>
        <Text style={styles.signInButtonText}>Sign In</Text>
      </TouchableOpacity>

      {/* Create New Account */}
      <TouchableOpacity onPress={handleCreateAccount}>
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
