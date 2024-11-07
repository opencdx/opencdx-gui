import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import ScreenWrapper from '../../components/ScreenWrapper';
import { commonStyles } from '../../constants/styles';

const styles = {
  content: "flex-1 w-full",
  backButton: "mb-5",
  nameFields: "flex-row gap-2 mb-2",
  input: commonStyles.input,
  consentText: "text-sm text-gray-500 mb-5",
  submitButton: `${commonStyles.button.primary} mt-auto`,
  submitButtonDisabled: commonStyles.button.disabled,
  submitButtonText: commonStyles.buttonText.primary,
  signinPrompt: "flex-row justify-center mt-5",
  link: "text-blue-500",
};

const SignUp = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  const handleChange = (value: string, name: string) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    navigation.navigate('app/login-flow/Password' as never);
  };

  const isFormValid = () => {
    return formData.firstName.trim() !== '' && 
           formData.lastName.trim() !== '' && 
           formData.email.trim() !== '';
  };

  return (
    <ScreenWrapper>
      <TouchableOpacity 
        className={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <MaterialIcons name="arrow-back" size={24} color="#666" />
      </TouchableOpacity>

      <View className={styles.content}>
        <Text className={commonStyles.text.title}>Sign up</Text>
        
        <View className={styles.nameFields}>
          <TextInput
            className={styles.input}
            value={formData.firstName}
            onChangeText={(value) => handleChange(value, 'firstName')}
            placeholder="First Name*"
          />
          <TextInput
            className={styles.input}
            value={formData.lastName}
            onChangeText={(value) => handleChange(value, 'lastName')}
            placeholder="Last Name*"
          />
        </View>
        
        <TextInput
          className={styles.input}
          value={formData.email}
          onChangeText={(value) => handleChange(value, 'email')}
          placeholder="Email*"
          keyboardType="email-address"
        />
        
        <Text className={styles.consentText}>
          I understand that by signing up, I agree to receive email communications 
          in order to create an account.
        </Text>
        
        <TouchableOpacity 
          className={`${styles.submitButton} ${!isFormValid() && styles.submitButtonDisabled}`}
          onPress={handleSubmit}
          disabled={!isFormValid()}
        >
          <Text className={styles.submitButtonText}>Sign Up</Text>
        </TouchableOpacity>

        <View className={styles.signinPrompt}>
          <Text>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn' as never)}>
            <Text className={styles.link}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default SignUp;
