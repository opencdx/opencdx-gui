import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import ScreenWrapper from '../../components/ScreenWrapper';
import { commonStyles } from '../../constants/styles';

const styles = {
  container: "flex-1 p-5 bg-white",
  backButton: "mb-5",
  title: "text-2xl font-semibold mb-2",
  subtitle: "text-base text-gray-600 mb-6",
  input: commonStyles.input,
  disclaimer: "text-sm text-gray-600 mb-4",
  termsLink: "mb-6",
  termsText: "text-pink-500 text-sm",
  continueButton: commonStyles.button.primary,
  continueButtonDisabled: commonStyles.button.disabled,
  continueText: commonStyles.buttonText.primary,
  inputError: "border-red-500",
  errorText: "text-red-500 text-xs mt-[-12px] mb-4",
};

export default function Phone() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigation = useNavigation();

  const isValidPhoneNumber = (number: string) => {
    const phoneRegex = /^\+?\d{1,4}?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
    return phoneRegex.test(number.replace(/\s+/g, ''));
  };

  const handleContinue = () => {
    if (isValidPhoneNumber(phoneNumber)) {
      navigation.navigate('app/login-flow/Verification', { phoneNumber });
    }
  };

  const isButtonEnabled = isValidPhoneNumber(phoneNumber);

  return (
    <ScreenWrapper>
      <TouchableOpacity 
        className={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <MaterialIcons name="arrow-back" size={24} color="#666" />
      </TouchableOpacity>

      <View className={styles.container}>
        <Text className={styles.title}>Verify Phone Number</Text>
        <Text className={styles.subtitle}>
          Your phone number is used as a secure way to identify you and will not be shared.
        </Text>

        <TextInput
          className={`${styles.input} ${!isButtonEnabled && phoneNumber ? styles.inputError : ''}`}
          placeholder="Phone Number*"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
          autoComplete="tel"
        />

        {phoneNumber && !isButtonEnabled && (
          <Text className={styles.errorText}>Please enter a valid phone number</Text>
        )}

        <Text className={styles.disclaimer}>
          Message and data rates may apply. If you choose to receive MFA passwords as SMS, 
          we'll send you one text message per login attempt unless you choose to Remember 
          This Device. To stop receiving messages, text "STOP." For more information, 
          text "HELP." Before opting out, make sure to update your MFA settings to an 
          Authenticator App to avoid being locked out of your account.
        </Text>

        <TouchableOpacity 
          className={styles.termsLink}
          onPress={() => navigation.navigate('Terms')}
        >
          <Text className={styles.termsText}>Terms & Conditions</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          className={`${styles.continueButton} ${!isButtonEnabled ? styles.continueButtonDisabled : ''}`}
          onPress={handleContinue}
          disabled={!isButtonEnabled}
        >
          <Text className={styles.continueText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
}
