import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { useUserFlow } from '../context/UserFlowContext';

interface AccountInformationProps {
  onSubmit: (data: AccountFormData) => void;
}

interface AccountFormData {
  dateOfBirth: string;
  sexAtBirth: string;
  race: string;
  ethnicity: string;
}

export default function AccountInformation({ onSubmit }: AccountInformationProps) {
  const navigation = useNavigation();
  const { shippingAddressRequired, welcomeScreen } = useUserFlow();
  const [formData, setFormData] = useState<AccountFormData>({
    dateOfBirth: '',
    sexAtBirth: '',
    race: '',
    ethnicity: '',
  });
  const [showDatePicker, setShowDatePicker] = useState(false);

  const isFormValid = () => {
    return (
      formData.dateOfBirth !== '' &&
      formData.sexAtBirth !== '' &&
      formData.race !== '' &&
      formData.ethnicity !== ''
    );
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    
    if (shippingAddressRequired) {
      navigation.navigate('app/login-flow/ShippingAddress' as never);
    } else {
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
    }
  };

  const handleDateChange = (event: DateTimePickerEvent | React.ChangeEvent<HTMLInputElement>, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }

    if (Platform.OS === 'web') {
      const target = event.target as HTMLInputElement;
      if (target.value) {
        setFormData({ ...formData, dateOfBirth: new Date(target.value).toISOString() });
      }
    } else {
      const nativeEvent = event as DateTimePickerEvent;
      if (nativeEvent.type === 'set' && selectedDate) {
        setFormData({ ...formData, dateOfBirth: selectedDate.toISOString() });
      }
    }
  };

  const renderDatePicker = () => {
    if (Platform.OS === 'web') {
      return (
        <input
          type="date"
          onChange={handleDateChange}
          value={formData.dateOfBirth ? formData.dateOfBirth.split('T')[0] : ''}
          max={new Date().toISOString().split('T')[0]}
          style={{
            width: '100%',
            padding: 12,
            border: '1px solid #ccc',
            borderRadius: 8,
            fontSize: 16,
          }}
          placeholder="Select Date of Birth*"
        />
      );
    }

    return (
      <>
        <TouchableOpacity 
          style={styles.dateButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={[
            styles.dateButtonText,
            !formData.dateOfBirth && styles.placeholderText
          ]}>
            {formData.dateOfBirth 
              ? new Date(formData.dateOfBirth).toLocaleDateString()
              : 'Select Date of Birth*'}
          </Text>
        </TouchableOpacity>

        {(showDatePicker || Platform.OS === 'ios') && (
          <DateTimePicker
            testID="dateTimePicker"
            value={formData.dateOfBirth ? new Date(formData.dateOfBirth) : new Date()}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={handleDateChange}
            maximumDate={new Date()}
            style={Platform.OS === 'ios' ? styles.iosDatePicker : undefined}
          />
        )}
      </>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <MaterialIcons name="arrow-back" size={24} color="#666" />
      </TouchableOpacity>

      <Text style={styles.title}>Enter your account information</Text>
      <Text style={styles.subtitle}>
        This information will be used to provide you treatment and the services through the app as detailed in the Privacy Notice.
      </Text>

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          {renderDatePicker()}
        </View>

        <View style={styles.inputContainer}>
          <Picker
            selectedValue={formData.sexAtBirth}
            onValueChange={(value) => setFormData({ ...formData, sexAtBirth: value })}
            style={styles.picker}
          >
            <Picker.Item label="Sex at Birth*" value="" />
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
          </Picker>
        </View>

        {/* Todo: Ravi Consider moving this to a configuratino section on admin page  */}
        <View style={styles.inputContainer}>
          <Picker
            selectedValue={formData.race}
            onValueChange={(value) => setFormData({ ...formData, race: value })}
            style={styles.picker}
          >
            <Picker.Item label="Race*" value="" />
            <Picker.Item label="American Indian or Alaska Native" value="American Indian or Alaska Native" />
            <Picker.Item label="Asian" value="Asian" />
            <Picker.Item label="Black or African American" value="Black or African American" />
            <Picker.Item label="Native Hawaiian or Other Pacific Islander" value="Native Hawaiian or Other Pacific Islander" />
            <Picker.Item label="White" value="White" />
            <Picker.Item label="Other" value="other" />
          </Picker>
        </View>

        <View style={styles.inputContainer}>
          <Picker
            selectedValue={formData.ethnicity}
            onValueChange={(value) => setFormData({ ...formData, ethnicity: value })}
            style={styles.picker}
          >
            <Picker.Item label="Ethnicity*" value="" />
            <Picker.Item label="Hispanic or Latino" value="Hispanic or Latino" />
            <Picker.Item label="Not Hispanic or Latino" value="Not Hispanic or Latino" />
            <Picker.Item label="I prefer not to specify" value="I prefer not to specify" />
          </Picker>
        </View>

        <TouchableOpacity 
          style={[
            styles.button,
            !isFormValid() && styles.buttonDisabled
          ]}
          onPress={handleSubmit}
          disabled={!isFormValid()}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 8,
  },
  subtitle: {
    color: '#666',
    marginBottom: 24,
  },
  form: {
    gap: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
  },
  button: {
    backgroundColor: '#f9a8d4', // pink-300
    padding: 12,
    borderRadius: 24,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  buttonDisabled: {
    backgroundColor: '#e5e7eb', // gray-200
    opacity: 0.5,
  },
  dateButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    backgroundColor: 'white',
  },
  dateButtonText: {
    color: '#666',
    fontSize: 16,
  },
  placeholderText: {
    color: '#999',
  },
  iosDatePicker: {
    width: '100%',
    height: 200,
    marginTop: 10,
  },
  webDateContainer: {
    position: 'relative',
  },
  webDatePlaceholder: {
    position: 'absolute',
    left: 12,
    top: '50%',
    transform: [{translateY: -8}],
    zIndex: 0,
    pointerEvents: 'none',
  },
});
