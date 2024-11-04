import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { useUserFlow } from '../context/UserFlowContext';
import commonStyles from '../../../assets/css/common';

const LoginForm: React.FC = () => {
  const navigation = useNavigation();
  const { welcomeScreen } = useUserFlow();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = () => {
    switch (welcomeScreen) {
      case 'custom-internal':
        navigation.navigate('app/login-flow/WelcomeScreen-Custom-Internal' as never);
        break;
      case 'custom-external':
        navigation.navigate('app/login-flow/WelcomeScreen-Custom-External' as never);
        break;
      case 'default':
      default:
        navigation.navigate('app/login-flow/WelcomeScreen' as never);
        break;
    }
  };

  const handleSignUp = () => {
    navigation.navigate('app/login-flow/AccessCodeEntry' as never);
  };

  return (
    <View style={[styles.loginContainer, commonStyles.container]}>
      <Image 
        source={require('../../../assets/logo.png')}
        style={[styles.logo, commonStyles.logoImage]}
        resizeMode="contain"
      />
      <View style={[styles.formContainer, commonStyles.formWrapper]}>
        <TextInput
          style={[styles.input, commonStyles.inputField]}
          keyboardType="email-address"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            secureTextEntry={!showPassword}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeIcon}
          >
            <MaterialIcons 
              name={showPassword ? "visibility" : "visibility-off"} 
              size={24} 
              color="#E91E63"
            />
          </TouchableOpacity>
        </View>
        
        <View style={[styles.actionRow, commonStyles.actionContainer]}>
          <TouchableOpacity 
            style={[styles.touchIdButton, commonStyles.secondaryButton]} 
            onPress={() => {}}
          >
            <Text>👆</Text>
            <Text style={[styles.touchIdText, commonStyles.secondaryButtonText]}>
              Use TouchID
            </Text>
          </TouchableOpacity>
          <Text 
            style={[styles.forgotPassword, commonStyles.linkText]} 
            onPress={() => {}}
          >
            Forgot Password?
          </Text>
        </View>

        <TouchableOpacity 
          style={[styles.signInButton, commonStyles.primaryButton]} 
          onPress={handleSubmit}
        >
          <Text style={[styles.signInButtonText, commonStyles.buttonText]}>
            Sign In
          </Text>
        </TouchableOpacity>
        
        <Text style={[styles.signUpText, commonStyles.bodyText]}>
          Don't have an account?{' '}
          <Text 
            style={[styles.signUpLink, commonStyles.linkText]} 
            onPress={handleSignUp}
          >
            Sign Up
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    width: '100%'
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 48,
  },
  formContainer: {
    width: '100%',
    paddingHorizontal: 0
  },
  input: {
    width: '100%',
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    fontSize: 16,
    backgroundColor: '#F8F9FE'
  },
  passwordContainer: {
    position: 'relative',
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    top: '50%',
    transform: [{ translateY: -12 }],
    padding: 4
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginVertical: 16,
  },
  touchIdButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  touchIdText: {
    color: '#E91E63',
    fontSize: 16,
    fontWeight: '600',
  },
  forgotPassword: {
    color: '#E91E63',
    fontSize: 16,
    fontWeight: '600',
  },
  signInButton: {
    width: '100%',
    padding: 16,
    backgroundColor: '#E91E63',
    borderRadius: 12,
    marginVertical: 24,
  },
  signInButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  signUpText: {
    color: '#666',
    textAlign: 'center',
    marginTop: 16,
    fontSize: 16,
  },
  signUpLink: {
    color: '#E91E63',
    fontWeight: '600',
  },
});

export default LoginForm;