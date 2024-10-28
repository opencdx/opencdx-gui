import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Image } from '../../components/ui/image';

const EditProfile = () => {
  const navigation = useNavigation();

  // State to track original values
  const originalValues = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'jdoe@email.com',
    phone: '555-555-5555',
    dob: 'Sep 23, 1978',
  };

  // Profile state
  const [firstName, setFirstName] = useState(originalValues.firstName);
  const [lastName, setLastName] = useState(originalValues.lastName);
  const [email, setEmail] = useState(originalValues.email);
  const [phone, setPhone] = useState(originalValues.phone);
  const [dob, setDob] = useState(originalValues.dob);

  const [isEditing, setIsEditing] = useState(false);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleEdit = () => {
    if (isEditing) {
      // Cancel edit and revert values to original
      setFirstName(originalValues.firstName);
      setLastName(originalValues.lastName);
      setEmail(originalValues.email);
      setPhone(originalValues.phone);
      setDob(originalValues.dob);
    }
    setIsEditing(!isEditing);
  };

  const isValidInput = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return firstName.length > 0 && lastName.length > 0 && email && emailRegex.test(email) && isEditing;
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row p-2 justify-between">
        <Pressable
          className="self-start focus:outline-none focus:ring-2 focus:ring-blue-500 flex-row p-2"
          onPress={handleBack}
          role="link"
          aria-label="Back"
        >
          <Image
            source={require('../../assets/back.png')}
            alt="back button"
          />
          <Text className="font-inter text-base font-normal text-blue-600 pl-1">
            Back
          </Text>
        </Pressable>

        <Pressable
          className="self-end rounded focus:outline-none focus:ring-2 focus:ring-blue-500 flex flex-row items-center p-2"
          onPress={handleEdit}
          role="link"
          aria-label="Edit"
        >
          <Text className="font-inter text-base font-normal text-blue-600 pl-1">
            {!isEditing ? "Edit" : "Cancel"}
          </Text>
          <Image source={require('~/assets/edit.png')} className='ml-3'/>
        </Pressable>
      </View>

      <View className="flex-1 items-center justify-between p-4">
        <Image
          className="mb-12 w-500"
          source={require('~/assets/profile.png')}
        />
        <View className="flex ml-14 w-screen">
          <Text className="text-2xl font-medium mb-3">My Profile</Text>
          <Text className="text-gray-600 mb-6">This information is used for...</Text>
        </View>

        <Input
          isEditable={isEditing}
          label="First Name*"
          variant={isEditing ? 'default' : 'underline'}
          value={firstName}
          onChangeText={setFirstName}
        />
        <Input
          isEditable={isEditing}
          variant={isEditing ? 'default' : 'underline'}
          label="Last Name*"
          value={lastName}
          onChangeText={setLastName}
        />
        <Input
          isEditable={isEditing}
          variant={isEditing ? 'default' : 'underline'}
          label="Email Address*"
          value={email}
          onChangeText={setEmail}
        />
        <Input
          isEditable={isEditing}
          variant={isEditing ? 'default' : 'underline'}
          label="Phone Number"
          value={phone}
          onChangeText={setPhone}
        />
        <Input
          isEditable={isEditing}
          className='mb-10'
          variant={isEditing ? 'default' : 'underline'}
          label="Date of Birth"
          value={dob}
          onChangeText={setDob}
        />

        <Button
          onPress={() => {}}
          disabled={!isValidInput()}
          className="p-4"
        >
          Save
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default EditProfile;
