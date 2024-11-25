import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function TermsAndConditions() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Fridge To Fork</Text>

      {/* Terms and Conditions */}
      <Text style={styles.termsText}>
        <strong>Terms and Conditions</strong>
        {"\n\n"}Welcome to Fridge to Fork! By using our app, you agree to the following terms and conditions:
        {"\n\n"}1. <strong>User Responsibilities:</strong> You are responsible for entering accurate and truthful information about ingredients and recipes. Misuse of the app, including uploading inappropriate content, is strictly prohibited.
        {"\n\n"}2. <strong>Service Limitations:</strong> Fridge to Fork does not guarantee the accuracy or completeness of recipe suggestions. Use your own judgment when preparing meals based on app recommendations.
        {"\n\n"}3. <strong>Content Ownership:</strong> All recipes and content you upload remain your property, but by submitting content, you grant Fridge to Fork the right to display and use your content within the app.
        {"\n\n"}4. <strong>Account Security:</strong> You are responsible for safeguarding your account information. Fridge to Fork is not liable for unauthorized access to your account.
        {"\n\n"}5. <strong>Modification of Terms:</strong> Fridge to Fork reserves the right to modify these terms at any time. Continued use of the app signifies your acceptance of any changes.
        {"\n\n"}6. <strong>Disclaimer:</strong> Fridge to Fork is not responsible for any adverse effects resulting from recipes, dietary advice, or ingredient information provided by the app.
        {"\n\n"}Thank you for using Fridge to Fork! By continuing, you confirm that you agree to these terms and conditions.
      </Text>

      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.push('./createaccount')}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFDE7', // Cream background color
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#000', // Black text color for title
    fontFamily: 'italiano',
    fontStyle: 'italic',
  },
  termsText: {
    fontSize: 16,
    color: '#000', // Black text color for terms
    textAlign: 'left',
    paddingHorizontal: 16,
    marginBottom: 20,
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
    color: '#FFFFFF', // White text color
    fontWeight: 'bold',
  },
});
