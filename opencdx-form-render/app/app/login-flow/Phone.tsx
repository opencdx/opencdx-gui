import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons';

type PhoneScreenNavigationProp = NativeStackNavigationProp<any, 'Phone'>;

export default function Phone() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigation = useNavigation<PhoneScreenNavigationProp>();

  const isValidPhoneNumber = (number: string) => {
    const phoneRegex = /^\+?\d{1,4}?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
    return phoneRegex.test(number.replace(/\s+/g, ''));
  };

  const handleContinue = () => {
    if (isValidPhoneNumber(phoneNumber)) {
      //navigation.navigate('app/login-flow/Verification', { phoneNumber });
      navigation.navigate('app/login-flow/Verification', { phoneNumber: phoneNumber });
    }
  };

  const isButtonEnabled = isValidPhoneNumber(phoneNumber);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <MaterialIcons name="arrow-back" size={24} color="#666" />
      </TouchableOpacity>

      <Text style={styles.title}>Verify Phone Number</Text>
      <Text style={styles.subtitle}>
        Your phone number is used as a secure way to identify you and will not be shared.
      </Text>

      <TextInput
        style={[
          styles.input,
          !isButtonEnabled && phoneNumber ? styles.inputError : null
        ]}
        placeholder="Phone Number*"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        autoComplete="tel"
      />

      {phoneNumber && !isButtonEnabled && (
        <Text style={styles.errorText}>Please enter a valid phone number</Text>
      )}

      <Text style={styles.disclaimer}>
        Message and data rates may apply. If you choose to receive MFA passwords as SMS, 
        we'll send you one text message per login attempt unless you choose to Remember 
        This Device. To stop receiving messages, text "STOP." For more information, 
        text "HELP." Before opting out, make sure to update your MFA settings to an 
        Authenticator App to avoid being locked out of your account.
      </Text>

      <TouchableOpacity 
        style={styles.termsLink}
        onPress={() => navigation.navigate('Terms')}
      >
        <Text style={styles.termsText}>Terms & Conditions</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[
          styles.continueButton,
          !isButtonEnabled ? styles.continueButtonDisabled : null
        ]}
        onPress={handleContinue}
        disabled={!isButtonEnabled}
      >
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  disclaimer: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  termsLink: {
    marginBottom: 24,
  },
  termsText: {
    color: '#E75480',
    fontSize: 14,
  },
  continueButton: {
    backgroundColor: '#E291B7',
    padding: 16,
    borderRadius: 25,
    alignItems: 'center',
  },
  continueText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  continueButtonDisabled: {
    backgroundColor: '#E291B7',
    opacity: 0.5,
  },
  inputError: {
    borderColor: '#ff0000',
  },
  errorText: {
    color: '#ff0000',
    fontSize: 12,
    marginTop: -12,
    marginBottom: 16,
  },
});
