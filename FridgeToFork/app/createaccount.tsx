import { signup } from '../api/loginService';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from './AuthContext';
import { saveToken } from '../api/tokenUtils';

export default function CreateAccountScreen() {
  const [name, setName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [favoriteFood, setFavoriteFood] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // To display error messages
  const [isTermsChecked, setIsTermsChecked] = useState(false); // For terms and conditions checkbox

  const router = useRouter();
  const { applogin, setLoading } = useAuth();

  const validateBirthday = (birthday: string) => {
    const today = new Date();
    const yearLimit = today.getFullYear() - 12; // User must be born in 2012 or earlier
  
    // Check if the format is "MM/DD/YYYY"
    const regex = /^\d{2}\/\d{2}\/\d{4}$/; // Matches "MM/DD/YYYY" only as a format
    if (!regex.test(birthday)) {
      setError('Invalid birthday format. Use MM/DD/YYYY.');
      return false;
    }
  
    // Parse the date
    const [month, day, year] = birthday.split('/').map(Number);
  
    // Check for invalid month
    if (month < 1 || month > 12) {
      setError('Invalid month. Please use MM between 01 and 12.');
      return false;
    }
  
    // Check for invalid day (taking month into account)
    const daysInMonth = new Date(year, month, 0).getDate(); // Get days in the given month
    if (day < 1 || day > daysInMonth) {
      setError(`Invalid day. Please use a valid day between 01 and ${daysInMonth}.`);
      return false;
    }
  
    // Check for invalid age
    if (year > yearLimit) {
      setError('You must be 12 years or older to create an account.');
      return false;
    }
  
    // Clear any previous errors if all validations pass
    setError('');
    return true;
  };
  
  

  const handleSignUp = async () => {
    // Validate all fields
    if (
      !name ||
      !birthday ||
      !favoriteFood ||
      !email ||
      !username ||
      !password
    ) {
      setError('Please fill out all the information'); // Set error message
      return;
    }

    // Validate birthday
    if (!validateBirthday(birthday)) {
      return; // Stop if the birthday validation fails
    }

    if (!isTermsChecked) {
      setError('You must agree to the Terms and Conditions'); // Set error message
      return;
    }

    try {
      const token = await signup(username, password, name, email, favoriteFood, birthday);
      if (token) {
        await saveToken(token);
        applogin();
        setLoading(false);
        router.push('./home'); // Navigate to Home
        console.log('Token saved securely:', token);
      } else {
        Alert.alert('Signup failed', 'Invalid credentials, please try again.');
      }
    } catch (error) {
      console.error('Error during signup:', error);
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

      {/* Name Input */}
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={(text) => {
          setError(''); // Clear error when user types
          setName(text);
        }}
      />

      {/* Birthday Input */}
      <TextInput
        style={styles.input}
        placeholder="Birthday (MM/DD/YYYY)"
        value={birthday}
        onChangeText={(text) => {
          setError(''); // Clear error when user types
          setBirthday(text);
        }}
      />

      {/* Favorite Food Input */}
      <TextInput
        style={styles.input}
        placeholder="Favorite Food"
        value={favoriteFood}
        onChangeText={(text) => {
          setError(''); // Clear error when user types
          setFavoriteFood(text);
        }}
      />

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => {
          setError(''); // Clear error when user types
          setEmail(text);
        }}
        autoCapitalize="none"
      />

      {/* Custom Checkbox for Terms and Conditions */}
      <View style={styles.checkboxContainer}>
  <TouchableOpacity onPress={() => router.push('./termsandconditions')}>
    <Text style={styles.checkboxText}>
      I agree to the <strong>Terms and Conditions</strong> of <em>Fridge to Fork</em>
    </Text>
  </TouchableOpacity>
  <TouchableOpacity
    style={[
      styles.checkbox,
      isTermsChecked && styles.checkboxChecked, // Apply "checked" style if true
    ]}
    onPress={() => setIsTermsChecked(!isTermsChecked)} // Toggle checkbox state
  />
</View>


      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSignUp}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>

      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.push('./')}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFDE7', // Light cream background
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
  errorText: {
    color: 'black', // Black error message
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
  submitButton: {
    width: '80%',
    height: 50,
    backgroundColor: '#A5D6A7', // Light green
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
  submitButtonText: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  backButton: {
    marginTop: 20,
    backgroundColor: '#2E7D32', // Dark green
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  backButtonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
    
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#555',
    borderRadius: 4,
    backgroundColor: 'transparent',
    left: 5,
    
  },
  checkboxChecked: {
    backgroundColor: '#2E7D32', // Dark green for checked state
  },
  checkboxText: {
    flex: 1,
    fontSize: 16,
    color: '#000', // Black text color
    marginLeft: 10,
  },
  
});
