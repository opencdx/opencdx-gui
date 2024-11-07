import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Switch } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import ScreenWrapper from '../../components/ScreenWrapper';
import { commonStyles } from '../../constants/styles';

const styles = {
  container: "flex-1 bg-white p-5",
  backButton: "mb-5",
  title: "text-2xl font-semibold mb-2",
  subtitle: "text-base text-gray-600 mb-6",
  inputContainer: "relative mb-4",
  input: commonStyles.input,
  eyeIcon: "absolute right-4 top-1/2 -translate-y-3 p-1",
  requirements: "mb-6",
  requirement: "text-sm text-gray-600 mb-1",
  requirementMet: "text-green-500",
  biometricContainer: "flex-row justify-between items-center mb-4",
  biometricText: "text-base text-gray-800",
  termsContainer: "flex-row items-start mb-6",
  checkbox: "w-6 h-6 border border-pink-500 rounded mr-2 justify-center items-center",
  termsText: "flex-1 text-sm text-gray-600",
  termsLink: "text-pink-500 underline",
  submitButton: commonStyles.button.primary,
  submitButtonDisabled: commonStyles.button.disabled,
  submitButtonText: commonStyles.buttonText.primary,
};

const Password = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [enableBiometric, setEnableBiometric] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const navigation = useNavigation();

  const validatePassword = (pass: string) => {
    const hasLength = pass.length >= 8;
    const hasUpper = /[A-Z]/.test(pass);
    const hasLower = /[a-z]/.test(pass);
    const hasNumber = /\d/.test(pass);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(pass);
    
    return hasLength && hasUpper && hasLower && hasNumber && hasSpecial;
  };

  const handleSubmit = () => {
    if (password === confirmPassword && validatePassword(password) && agreeToTerms) {
      navigation.navigate('app/login-flow/Phone' as never);
    }
  };

  return (
    <ScreenWrapper>
      <TouchableOpacity 
        className={styles.backButton} 
        onPress={() => navigation.goBack()}
      >
        <MaterialIcons name="arrow-back" size={24} color="#666" />
      </TouchableOpacity>

      <View className={styles.container}>
        <Text className={styles.title}>Create a password</Text>
        <Text className={styles.subtitle}>
          This password will be used to ensure your account is secure, so do not share this password with anyone.
        </Text>

        <View className={styles.inputContainer}>
          <TextInput
            className={styles.input}
            placeholder="Password *"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            placeholderTextColor="#666"
          />
          <TouchableOpacity 
            className={styles.eyeIcon}
            onPress={() => setShowPassword(!showPassword)}
          >
            <MaterialIcons 
              name={showPassword ? "visibility" : "visibility-off"} 
              size={24} 
              color="#C23B80"
            />
          </TouchableOpacity>
        </View>

        <View className={styles.inputContainer}>
          <TextInput
            className={styles.input}
            placeholder="Re-enter Password *"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
            placeholderTextColor="#666"
          />
          <TouchableOpacity 
            className={styles.eyeIcon}
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            <MaterialIcons 
              name={showConfirmPassword ? "visibility" : "visibility-off"} 
              size={24} 
              color="#C23B80"
            />
          </TouchableOpacity>
        </View>

        <View className={styles.requirements}>
          <Text className={`${styles.requirement} ${password.length >= 8 ? styles.requirementMet : ''}`}>
            ✓ At least 8 characters
          </Text>
          <Text className={`${styles.requirement} ${/[a-z]/.test(password) ? styles.requirementMet : ''}`}>
            ✓ 1 Lowercase letter
          </Text>
          <Text className={`${styles.requirement} ${/[A-Z]/.test(password) ? styles.requirementMet : ''}`}>
            ✓ 1 Uppercase letter
          </Text>
          <Text className={`${styles.requirement} ${/\d/.test(password) ? styles.requirementMet : ''}`}>
            ✓ 1 Number
          </Text>
          <Text className={`${styles.requirement} ${/[!@#$%^&*(),.?":{}|<>]/.test(password) ? styles.requirementMet : ''}`}>
            ✓ 1 Special character
          </Text>
        </View>

        <View className={styles.biometricContainer}>
          <Text className={styles.biometricText}>Enable Face/Touch ID for login</Text>
          <Switch
            value={enableBiometric}
            onValueChange={setEnableBiometric}
            trackColor={{ false: '#E0E0E0', true: '#D4A7BE' }}
            thumbColor={enableBiometric ? '#C23B80' : '#f4f3f4'}
          />
        </View>

        <View className={styles.termsContainer}>
          <TouchableOpacity 
            className={styles.checkbox}
            onPress={() => setAgreeToTerms(!agreeToTerms)}
          >
            {agreeToTerms && <MaterialIcons name="check" size={20} color="#C23B80" />}
          </TouchableOpacity>
          <Text className={styles.termsText}>
            I agree to the{' '}
            <Text className={styles.termsLink}>Terms and Conditions</Text>
            {' '}and attest that I am a legal adult.
          </Text>
        </View>

        <TouchableOpacity 
          className={`${styles.submitButton} ${(!validatePassword(password) || password !== confirmPassword || !agreeToTerms) ? styles.submitButtonDisabled : ''}`}
          onPress={handleSubmit}
          disabled={!validatePassword(password) || password !== confirmPassword || !agreeToTerms}
        >
          <Text className={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
};

export default Password;