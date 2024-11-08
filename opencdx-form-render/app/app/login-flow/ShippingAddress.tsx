import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useUserFlow } from '../context/UserFlowContext';
import ScreenWrapper from '../../components/ScreenWrapper';
import { commonStyles } from '../../constants/styles';

// Update the validation result type to match the proxy response
type ValidationResult = {
  success: boolean;
  data: {
    matchedAddress: string;
    coordinates: { x: number; y: number };
    tigerLine: { side: string; tigerLineId: string };
    addressComponents: {
      streetName: string;
      suffixType: string;
      city: string;
      state: string;
      zip: string;
    };
    inputAddress: string;
  };
  quality: {
    matchScore: string;
    matchType: string;
    isExact: boolean;
  };
  timestamp: string;
  statusCode: number;
};

const styles = {
  container: "flex-1 p-5 bg-white",
  backButton: "mb-5",
  title: "text-2xl font-semibold mb-2",
  subtitle: "text-base text-gray-600 mb-6",
  input: commonStyles.input,
  row: "flex-row gap-3",
  flex1: "flex-1",
  button: commonStyles.button.primary,
  buttonDisabled: commonStyles.button.disabled,
  buttonText: commonStyles.buttonText.primary,
  pickerContainer: "border border-gray-300 rounded bg-white mb-3 justify-center",
  picker: Platform.OS === 'ios' ? "h-24" : "h-11",
  errorText: "text-red-500 mb-3 text-center",
  validationContainer: "bg-green-100 p-4 rounded mb-3 border border-green-300",
  validationTitle: "text-lg font-bold text-green-800 mb-2",
  matchedAddressText: "text-green-900 mb-2",
  coordinatesText: "text-green-700 mb-2",
  validationErrorContainer: "bg-red-100 p-4 rounded mb-3 border border-red-300",
  validationErrorTitle: "text-lg font-bold text-red-800 mb-2",
  validationErrorText: "text-red-900 mb-2",
  enteredAddressText: "text-red-700 mb-2",
};

function ShippingAddress() {
  const navigation = useNavigation();
  const { enforceShippingAddressValidation, welcomeScreen } = useUserFlow();
  const [formData, setFormData] = useState({
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
  });
  const [addressError, setAddressError] = useState('');
  const [matchedAddress, setMatchedAddress] = useState('');
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);

  const isFormValid = () => {
    return formData.streetAddress && 
           formData.city && 
           formData.state && 
           formData.state !== '' && 
           formData.zipCode;
  };

  const validateAddress = async () => {
    try {
      setAddressError('');
      setValidationResult(null);
      
      // Construct address from current form data
      const formattedAddress = `${formData.streetAddress}, ${formData.city}, ${formData.state} ${formData.zipCode}`;
      const encodedAddress = encodeURIComponent(formattedAddress);
      const apiUrl = `http://localhost:3001/validate-address?address=${encodedAddress}`;
      
      console.log('Validating address:', formattedAddress); // Add this for debugging
      
      const response = await fetch(apiUrl);
      const data: ValidationResult = await response.json();
      
      console.log('Census API Response:', data);
      
      if (data.success) {
        // Verify that the returned state matches the form state
        const returnedState = data.data.addressComponents.state;
        if (returnedState !== formData.state) {
          setAddressError(`Invalid state. Address belongs to ${returnedState}, not ${formData.state}`);
          return false;
        }
        
        setValidationResult(data);
        return true;
      } else {
        setAddressError('Address validation failed');
        return false;
      }
    } catch (error) {
      console.error('Address validation error:', error);
      setAddressError('Unable to validate address. Please try again.');
      return false;
    }
  };

  const navigateToWelcomeScreen = () => {
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

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    
    if (enforceShippingAddressValidation) {
      if (await validateAddress()) {
        navigateToWelcomeScreen();
      }
    } else {
      // Skip validation if flag is false
      navigateToWelcomeScreen();
    }
  };

  const states = [
    { label: 'State*', value: '' },
    { label: 'Alabama', value: 'AL' },
    { label: 'Alaska', value: 'AK' },
    { label: 'Arizona', value: 'AZ' },
    { label: 'Arkansas', value: 'AR' },
    { label: 'California', value: 'CA' },
    { label: 'Colorado', value: 'CO' },
    { label: 'Connecticut', value: 'CT' },
    { label: 'Delaware', value: 'DE' },
    { label: 'Florida', value: 'FL' },
    { label: 'Georgia', value: 'GA' },
    { label: 'Hawaii', value: 'HI' },
    { label: 'Idaho', value: 'ID' },
    { label: 'Illinois', value: 'IL' },
    { label: 'Indiana', value: 'IN' },
    { label: 'Iowa', value: 'IA' },
    { label: 'Kansas', value: 'KS' },
    { label: 'Kentucky', value: 'KY' },
    { label: 'Louisiana', value: 'LA' },  
    { label: 'Maine', value: 'ME' },
    { label: 'Maryland', value: 'MD' },
    { label: 'Massachusetts', value: 'MA' },
    { label: 'Michigan', value: 'MI' },
    { label: 'Minnesota', value: 'MN' },
    { label: 'Mississippi', value: 'MS' },
    { label: 'Missouri', value: 'MO' }, 
    { label: 'Montana', value: 'MT' },
    { label: 'Nebraska', value: 'NE' },
    { label: 'Nevada', value: 'NV' },
    { label: 'New Hampshire', value: 'NH' },
    { label: 'New Jersey', value: 'NJ' }, 
    { label: 'New Mexico', value: 'NM' },
    { label: 'New York', value: 'NY' },
    { label: 'North Carolina', value: 'NC' },
    { label: 'North Dakota', value: 'ND' }, 
    { label: 'Ohio', value: 'OH' },
    { label: 'Oklahoma', value: 'OK' },
    { label: 'Oregon', value: 'OR' },
    { label: 'Pennsylvania', value: 'PA' },
    { label: 'Rhode Island', value: 'RI' },
    { label: 'South Carolina', value: 'SC' },
    { label: 'South Dakota', value: 'SD' }, 
    { label: 'Tennessee', value: 'TN' },
    { label: 'Texas', value: 'TX' },
    { label: 'Utah', value: 'UT' },
    { label: 'Vermont', value: 'VT' },
    { label: 'Virginia', value: 'VA' },
    { label: 'Washington', value: 'WA' },
    { label: 'West Virginia', value: 'WV' },
    { label: 'Wisconsin', value: 'WI' },
    { label: 'Wyoming', value: 'WY' },
  ];

  // Add this new function to check if the form can be submitted
  const canSubmit = () => {
    if (enforceShippingAddressValidation) {
      return isFormValid() && validationResult?.success;
    }
    return isFormValid();
  };

  // Update the form data change handler to clear validation
  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({...prev, [field]: value}));
    // Clear validation result when form changes
    setValidationResult(null);
    setAddressError('');
  };

  return (
    <ScreenWrapper>
      <TouchableOpacity className={styles.backButton} onPress={() => navigation.goBack()}>
        <MaterialIcons name="arrow-back" size={24} color="#666" />
      </TouchableOpacity>

      <Text className={styles.title}>
        What is your current shipping address?
      </Text>
      <Text className={styles.subtitle}>
        This address will be used to send any tests that you order.
      </Text>

      <View>
        <TextInput 
          className={styles.input} 
          placeholder="Street Address*" 
          value={formData.streetAddress}
          onChangeText={(text) => updateFormData('streetAddress', text)}
          onChange={(e) => {
            // Check if other fields were autofilled
            const form = e.target.form; 
            if (form) {
              const state = form.querySelector('[name="state"]')?.value;
              if (state) {
                updateFormData('state', state);
              }
            }
          }}
        />
        <View className={styles.row}>
          <TextInput className={`${styles.input} ${styles.flex1}`} placeholder="Apt/Ste" />
          <TextInput 
            className={`${styles.input} ${styles.flex1}`} 
            placeholder="City*"
            value={formData.city}
            onChangeText={(text) => updateFormData('city', text)}
          />
        </View>
        <View className={styles.row}>
          <View className={`${styles.flex1} ${styles.pickerContainer}`}>
            <Picker
              selectedValue={formData.state}
              onValueChange={(value) => updateFormData('state', value)}
              className={styles.picker}
            >
              {states.map((state) => (
                <Picker.Item 
                  key={state.value} 
                  label={state.label} 
                  value={state.value}
                  enabled={state.value !== ''}
                />
              ))}
            </Picker>
          </View>
          <TextInput 
            className={`${styles.input} ${styles.flex1}`} 
            placeholder="Zip Code*" 
            keyboardType="numeric"
            value={formData.zipCode}
            onChangeText={(text) => updateFormData('zipCode', text)}
          />
        </View>

        {validationResult && validationResult.success && (
          <View className={styles.validationContainer}>
            <Text className={styles.validationTitle}>✓ Address Verified</Text>
            <Text className={styles.matchedAddressText}>
              {validationResult.data.matchedAddress}
            </Text>
            
            {validationResult.data.coordinates && (
              <Text className={styles.coordinatesText}>
                Coordinates: {validationResult.data.coordinates.y.toFixed(6)}, {validationResult.data.coordinates.x.toFixed(6)}
              </Text>
            )}
          </View>
        )}

        {addressError && (
          <View className={styles.validationErrorContainer}>
            <Text className={styles.validationErrorTitle}>✕ Address Invalid</Text>
            <Text className={styles.validationErrorText}>{addressError}</Text>
            <Text className={styles.enteredAddressText}>
              Entered address: {`${formData.streetAddress}, ${formData.city}, ${formData.state} ${formData.zipCode}`}
            </Text>
          </View>
        )}

        {enforceShippingAddressValidation && (
          <TouchableOpacity 
            onPress={validateAddress} 
            className={`${styles.button} ${!isFormValid() && styles.buttonDisabled}`}
            disabled={!isFormValid()}
          >
            <Text className={styles.buttonText}>Validate Address</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity 
          onPress={handleSubmit} 
          className={`${styles.button} ${!canSubmit() && styles.buttonDisabled}`}
          disabled={!canSubmit()}
        >
          <Text className={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
}

export default ShippingAddress; 