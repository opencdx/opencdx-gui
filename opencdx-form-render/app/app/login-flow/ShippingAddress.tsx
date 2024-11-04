import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useUserFlow } from '../context/UserFlowContext';

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

function ShippingAddressPage() {
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
        setAddressError(data.error || 'Address validation failed');
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

    // Todo: Ravi - move this to centralize location
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
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <MaterialIcons name="arrow-back" size={24} color="#666" />
      </TouchableOpacity>

      <Text style={styles.title}>
        What is your current shipping address?
      </Text>
      <Text style={styles.subtitle}>
        This address will be used to send any tests that you order.
      </Text>

      <View>
        <TextInput 
          style={styles.input} 
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
          name="street"  // Add name attribute for autofill
        />
        <View style={styles.row}>
          <TextInput style={[styles.input, styles.flex1]} placeholder="Apt/Ste" />
          <TextInput 
            style={[styles.input, styles.flex1]} 
            placeholder="City*"
            value={formData.city}
            onChangeText={(text) => updateFormData('city', text)}
          />
        </View>
        <View style={styles.row}>
          <View style={[styles.flex1, styles.pickerContainer]}>
            <Picker
              selectedValue={formData.state}
              onValueChange={(value) => updateFormData('state', value)}
              style={styles.picker}
              name="state"  // Add name attribute for autofill
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
            style={[styles.input, styles.flex1]} 
            placeholder="Zip Code*" 
            keyboardType="numeric"
            value={formData.zipCode}
            onChangeText={(text) => updateFormData('zipCode', text)}
          />
        </View>

        {validationResult && validationResult.success && (
          <View style={styles.validationContainer}>
            <Text style={styles.validationTitle}>✓ Address Verified</Text>
            <Text style={styles.matchedAddressText}>
              {validationResult.data.matchedAddress}
            </Text>
            
            {validationResult.data.coordinates && (
              <Text style={styles.coordinatesText}>
                Coordinates: {validationResult.data.coordinates.y.toFixed(6)}, {validationResult.data.coordinates.x.toFixed(6)}
              </Text>
            )}
          </View>
        )}

        {addressError && (
          <View style={styles.validationErrorContainer}>
            <Text style={styles.validationErrorTitle}>✕ Address Invalid</Text>
            <Text style={styles.validationErrorText}>{addressError}</Text>
            <Text style={styles.enteredAddressText}>
              Entered address: {`${formData.streetAddress}, ${formData.city}, ${formData.state} ${formData.zipCode}`}
            </Text>
          </View>
        )}

        {enforceShippingAddressValidation && (
          <TouchableOpacity 
            onPress={validateAddress} 
            style={[styles.validateButton, !isFormValid() && styles.buttonDisabled]}
            disabled={!isFormValid()}
          >
            <Text style={styles.buttonText}>Validate Address</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity 
          onPress={handleSubmit} 
          style={[styles.button, !canSubmit() && styles.buttonDisabled]}
          disabled={!canSubmit()}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  backButton: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  flex1: {
    flex: 1,
  },
  button: {
    backgroundColor: '#C026D3',
    padding: 16,
    borderRadius: 4,
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonDisabled: {
    backgroundColor: '#E0E0E0',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    backgroundColor: '#fff',
    marginBottom: 12,
    justifyContent: 'center',
  },
  picker: {
    height: Platform.OS === 'ios' ? 100 : 44,
  },
  errorText: {
    color: 'red',
    marginBottom: 12,
    textAlign: 'center',
  },
  matchedAddressContainer: {
    backgroundColor: '#f0f8ff', // Light blue background
    padding: 12,
    borderRadius: 4,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#4682b4',
  },
  matchedAddressTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#4682b4',
  },
  matchedAddressText: {
    color: '#333',
  },
  validationContainer: {
    backgroundColor: '#e8f5e9',
    padding: 16,
    borderRadius: 8,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: '#81c784',
  },
  validationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 8,
  },
  matchedAddressText: {
    fontSize: 15,
    color: '#1b5e20',
    marginBottom: 8,
  },
  coordinatesText: {
    fontSize: 13,
    color: '#388e3c',
    marginBottom: 8,
  },
  validateButton: {
    backgroundColor: '#81c784', // A different color to distinguish from Continue button
    padding: 16,
    borderRadius: 4,
    marginTop: 16,
  },
  validationErrorContainer: {
    backgroundColor: '#ffebee',
    padding: 16,
    borderRadius: 8,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: '#ef5350',
  },
  validationErrorTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#c62828',
    marginBottom: 8,
  },
  validationErrorText: {
    fontSize: 15,
    color: '#b71c1c',
    marginBottom: 8,
  },
  enteredAddressText: {
    fontSize: 13,
    color: '#d32f2f',
    marginBottom: 8,
  },
});

export default ShippingAddressPage; 