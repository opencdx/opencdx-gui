import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { useUserFlow } from '../context/UserFlowContext';
import ScreenWrapper from '../../components/ScreenWrapper';
import { commonStyles } from '../../constants/styles';

const styles = {
  logo: "w-30 h-30 mb-12 mx-auto",
  input: commonStyles.input,
  passwordContainer: "relative",
  visibilityButton: "absolute right-4 top-1/2 -translate-y-3 p-1",
  actionRow: "flex-row justify-between items-center w-full my-4",
  touchIdContainer: "flex-row items-center gap-2",
  actionText: commonStyles.text.link,
  signInButton: commonStyles.button.primary,
  signInText: commonStyles.buttonText.primary,
  signUpContainer: "text-gray-600 text-center mt-4 text-base",
  signUpLink: commonStyles.text.link,
};

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
    <ScreenWrapper>
      <Image 
        source={require('../../../assets/logo.png')}
        className={styles.logo}
        resizeMode="contain"
      />
      <View className="w-full px-0">
        <TextInput
          className={styles.input}
          keyboardType="email-address"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <View className={styles.passwordContainer}>
          <TextInput
            className={styles.input}
            secureTextEntry={!showPassword}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            className={styles.visibilityButton}
          >
            <MaterialIcons 
              name={showPassword ? "visibility" : "visibility-off"} 
              size={24} 
              color="#C026D3"
            />
          </TouchableOpacity>
        </View>
        
        <View className={styles.actionRow}>
          <TouchableOpacity 
            className={styles.touchIdContainer}
            onPress={() => {}}
          >
            <Text>👆</Text>
            <Text className={styles.actionText}>
              Use TouchID
            </Text>
          </TouchableOpacity>
          <Text 
            className={styles.actionText}
            onPress={() => {}}
          >
            Forgot Password?
          </Text>
        </View>

        <TouchableOpacity 
          className={styles.signInButton}
          onPress={handleSubmit}
        >
          <Text className={styles.signInText}>
            Sign In
          </Text>
        </TouchableOpacity>
        
        <Text className={styles.signUpContainer}>
          Don't have an account?{' '}
          <Text 
            className={styles.signUpLink}
            onPress={handleSignUp}
          >
            Sign Up
          </Text>
        </Text>
      </View>
    </ScreenWrapper>
  );
};

export default LoginForm;