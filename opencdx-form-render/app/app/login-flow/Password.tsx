import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Switch, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


const SignUp = () => {
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
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <MaterialIcons name="arrow-back" size={24} color="#666" />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>Create a password</Text>
        <Text style={styles.subtitle}>
          This password will be used to ensure your account is secure, so do not share this password with anyone.
        </Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password *"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            placeholderTextColor="#666"
          />
          <TouchableOpacity 
            style={styles.eyeIcon}
            onPress={() => setShowPassword(!showPassword)}
          >
            <MaterialIcons 
              name={showPassword ? "visibility" : "visibility-off"} 
              size={24} 
              color="#C23B80"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Re-enter Password *"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
            placeholderTextColor="#666"
          />
          <TouchableOpacity 
            style={styles.eyeIcon}
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            <MaterialIcons 
              name={showConfirmPassword ? "visibility" : "visibility-off"} 
              size={24} 
              color="#C23B80"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.requirements}>
          <Text style={[styles.requirement, password.length >= 8 && styles.requirementMet]}>
            ✓ At least 8 characters
          </Text>
          <Text style={[styles.requirement, /[a-z]/.test(password) && styles.requirementMet]}>
            ✓ 1 Lowercase letter
          </Text>
          <Text style={[styles.requirement, /[A-Z]/.test(password) && styles.requirementMet]}>
            ✓ 1 Uppercase letter
          </Text>
          <Text style={[styles.requirement, /\d/.test(password) && styles.requirementMet]}>
            ✓ 1 Number
          </Text>
          <Text style={[styles.requirement, /[!@#$%^&*(),.?":{}|<>]/.test(password) && styles.requirementMet]}>
            ✓ 1 Special character
          </Text>
        </View>

        <View style={styles.biometricContainer}>
          <Text style={styles.biometricText}>Enable Face/Touch ID for login</Text>
          <Switch
            value={enableBiometric}
            onValueChange={setEnableBiometric}
            trackColor={{ false: '#E0E0E0', true: '#D4A7BE' }}
            thumbColor={enableBiometric ? '#C23B80' : '#f4f3f4'}
          />
        </View>

        <View style={styles.termsContainer}>
          <TouchableOpacity 
            style={styles.checkbox}
            onPress={() => setAgreeToTerms(!agreeToTerms)}
          >
            {agreeToTerms && <MaterialIcons name="check" size={20} color="#C23B80" />}
          </TouchableOpacity>
          <Text style={styles.termsText}>
            I agree to the{' '}
            <Text style={styles.termsLink}>Terms and Conditions</Text>
            {' '}and attest that I am a legal adult.
          </Text>
        </View>

        <TouchableOpacity 
          style={[
            styles.submitButton,
            (!validatePassword(password) || password !== confirmPassword || !agreeToTerms) && 
            styles.submitButtonDisabled
          ]}
          onPress={handleSubmit}
          disabled={!validatePassword(password) || password !== confirmPassword || !agreeToTerms}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: '500',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  inputContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
  requirements: {
    marginBottom: 30,
  },
  requirement: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  requirementMet: {
    color: '#4CAF50',
  },
  biometricContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  biometricText: {
    fontSize: 16,
    color: '#333',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 30,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: '#C23B80',
    borderRadius: 4,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  termsText: {
    flex: 1,
    fontSize: 14,
    color: '#666',
  },
  termsLink: {
    color: '#C23B80',
    textDecorationLine: 'underline',
  },
  submitButton: {
    backgroundColor: '#C026D3',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  submitButtonDisabled: {
    backgroundColor: '#E0E0E0',
    opacity: 0.7,
  },
});

export default SignUp;