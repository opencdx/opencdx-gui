import React, { useState } from 'react';
import { View, SafeAreaView, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useLogin } from '../../lib/iam-hooks';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Image } from '../../components/ui/image';
import CustomHeader from '~/components/ui/CustomHeader';
const EditProfile = () => {
  const navigation = useNavigation();
  const [bio, setBio] = useState('');
  const [firstName, setFirstName] = useState('John');
  const [lastName, setLastName] = useState('Cheng');
  const [email, setEmail] = useState('john@xxx.com');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  
  const handleBack = () => {
    navigation.goBack()
  };
  const handleEdit = () => {
    setIsEditing(!isEditing);
  };
  const isValidInput = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return firstName.length > 0 && lastName.length > 0 && email && emailRegex.test(email) && isEditing;
  };
  function handleSubmit() {

  }
  return (
    <SafeAreaView className="flex-1 bg-white" >
        <View className='flex-row p-2 justify-between'>
            <Pressable
                className="self-start focus:outline-none focus:ring-2 focus:ring-blue-500 flex-row p-2"
                onPress={handleBack}
                role="link"
                aria-label="Back"
            >
                <Image
                source={require('../../assets/back.png')}
                alt="Select Questionnaire"
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
            onPress={()=>{}}
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
