import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

function ShippingAddressPage() {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
  });
  const [addressError, setAddressError] = useState('');
  const [matchedAddress, setMatchedAddress] = useState('');

  const isFormValid = () => {
    return formData.streetAddress && formData.city && 
           formData.state && formData.zipCode;
  };

  const validateAddress = async () => {
    try {
      setAddressError('');
      setMatchedAddress('');
      const address = `${formData.streetAddress}, ${formData.city}, ${formData.state} ${formData.zipCode}`;
      const encodedAddress = encodeURIComponent(address);
      const apiUrl = `http://localhost:3001/validate-address?address=${encodedAddress}`;
      
      console.log('Proxy API Request:', apiUrl);
      console.log('Original Address:', address);

      const response = await fetch(apiUrl);
      const data = await response.json();
      
      if (data.result?.addressMatches?.length > 0) {
        const match = data.result.addressMatches[0];
        const standardizedAddress = `${match.matchedAddress}`;
        setMatchedAddress(standardizedAddress);
        return true;
      } else {
        setAddressError('Invalid address. Please check and try again.');
        return false;
      }
    } catch (error) {
      console.error('Address validation error:', error);
      setAddressError('Unable to validate address. Please try again.');
      return false;
    }
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    
    if (await validateAddress()) {
      navigation.navigate('app/login-flow/WelcomeScreen' as never);
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
          onChangeText={(text) => setFormData({...formData, streetAddress: text})}
        />
        <View style={styles.row}>
          <TextInput style={[styles.input, styles.flex1]} placeholder="Apt/Ste" />
          <TextInput 
            style={[styles.input, styles.flex1]} 
            placeholder="City*"
            value={formData.city}
            onChangeText={(text) => setFormData({...formData, city: text})}
          />
        </View>
        <View style={styles.row}>
          <View style={[styles.flex1, styles.pickerContainer]}>
            <Picker
              selectedValue={formData.state}
              onValueChange={(value) => setFormData({...formData, state: value})}
              style={styles.picker}
            >
              {states.map((state) => (
                <Picker.Item 
                  key={state.value} 
                  label={state.label} 
                  value={state.value}
                />
              ))}
            </Picker>
          </View>
          <TextInput 
            style={[styles.input, styles.flex1]} 
            placeholder="Zip Code*" 
            keyboardType="numeric"
            value={formData.zipCode}
            onChangeText={(text) => setFormData({...formData, zipCode: text})}
          />
        </View>

        {matchedAddress ? (
          <View style={styles.matchedAddressContainer}>
            <Text style={styles.matchedAddressTitle}>Verified Address:</Text>
            <Text style={styles.matchedAddressText}>{matchedAddress}</Text>
          </View>
        ) : null}

        {addressError ? (
          <Text style={styles.errorText}>{addressError}</Text>
        ) : null}

        <TouchableOpacity 
          onPress={handleSubmit} 
          style={[styles.button, !isFormValid() && styles.buttonDisabled]}
          disabled={!isFormValid()}
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
    backgroundColor: '#D8A1BB',
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
});

export default ShippingAddressPage; 