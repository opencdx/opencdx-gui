import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

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
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <MaterialIcons name="arrow-back" size={24} color="#666" />
      </TouchableOpacity>

      <Text style={styles.title}>Sign up</Text>
      
      <View>
        <View style={styles.nameFields}>
          <TextInput
            style={styles.input}
            value={formData.firstName}
            onChangeText={(value) => handleChange(value, 'firstName')}
            placeholder="First Name*"
            required
          />
          <TextInput
            style={styles.input}
            value={formData.lastName}
            onChangeText={(value) => handleChange(value, 'lastName')}
            placeholder="Last Name*"
            required
          />
        </View>
        
        <TextInput
          style={styles.input}
          value={formData.email}
          onChangeText={(value) => handleChange(value, 'email')}
          placeholder="Email*"
          keyboardType="email-address"
          required
        />
        
        <Text style={styles.consentText}>
          I understand that by signing up, I agree to receive email communications 
          in order to create an account.
        </Text>
        
        <TouchableOpacity 
          style={[
            styles.signupButton, 
            !isFormValid() && styles.disabledButton
          ]} 
          onPress={handleSubmit}
          disabled={!isFormValid()}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.signinPrompt}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignIn' as never)}>
          <Text style={styles.link}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  nameFields: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  consentText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 20,
  },
  signupButton: {
    backgroundColor: '#D8A1BB',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#cccccc',
    opacity: 0.7,
  },
  buttonText: {
    color: '#FFFFFFFF',
    fontWeight: 'bold',
  },
  signinPrompt: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  link: {
    color: '#007AFFFF',
  },
});

export default SignUp;
