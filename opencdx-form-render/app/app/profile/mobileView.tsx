import React, { useState, useLayoutEffect, useCallback, useEffect } from 'react';
import { View, SafeAreaView, Text, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import { Image } from '../../../components/ui/image';
import { useGetHealthUserProfile, usePutHealthUserProfile} from '~/lib/iam-hooks';
import { UserProfile, PutHealthUserProfileRequest } from '~/api/health';
import { useShowToast } from '~/lib/toast';
import axios, { AxiosError } from 'axios';
import Loader from "~/components/ui/loading";
const EditProfile = () => {
  const showToast = useShowToast();
  const navigation = useNavigation();
  
  // Hide the header when this component is mounted
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  // State to track original values
  const handleUserProfileSuccess = useCallback((data: { userProfile: UserProfile }) => {
    setOriginalValues(data.userProfile);
    AsyncStorage.setItem('userProfile', data.userProfile.id ?? "");
  }, [showToast]);

  const handleUserProfileError = useCallback((err: any) => {
    if (axios.isAxiosError(err)) {
      // Handle AxiosError
      const axiosError = err as AxiosError;
      showToast({ message: axiosError.message, type: 'error' });
    }
    
  }, [showToast]);

  const handleUpdateUserProfileSuccess = useCallback((data: any) => {
    showToast({message: "Profile updated successfully.", type: "success"})
  }, [showToast]);

  const handleUpdateUserProfileError = useCallback((err: any) => {
    if (axios.isAxiosError(err)) {
      // Handle AxiosError
      const axiosError = err as AxiosError;
      showToast({ message: axiosError.message, type: 'error' });
    }
    
  }, [showToast]);

  const {userProfile} = useGetHealthUserProfile(handleUserProfileSuccess, handleUserProfileError);
  const {updateUserProfile, loading} = usePutHealthUserProfile(handleUpdateUserProfileSuccess, handleUpdateUserProfileError)
  useEffect(() => {
    // Fetch or set original values here
    const fetchData = async () => {
      await userProfile();
      setShowLoading(false);
    };
    setShowLoading(true);
    fetchData();
  }, []);

  const [originalValues, setOriginalValues] = useState<UserProfile | null>(null);

  // Profile state
  const [firstName, setFirstName] = useState(originalValues?.fullName?.firstName || "");
  const [lastName, setLastName] = useState(originalValues?.fullName?.lastName || "");
  const [email, setEmail] = useState(originalValues?.email?.[0] || '');
  const [phone, setPhone] = useState(originalValues?.phone?.[0] || "");
  const [dob, setDob] = useState(originalValues?.dateOfBirth || "");

  const [isEditing, setIsEditing] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const handleBack = () => {
    navigation.goBack();
  };

  const handleSubmit = () => {
    console.log("submit started");
    const userProfileRequest: PutHealthUserProfileRequest = {
      userId: originalValues?.userId || "",
      id: originalValues?.id || "",
      nationalHealthId: originalValues?.nationalHealthId || "",
      updatedProfile: {
          userId: originalValues?.userId || "",
          id: originalValues?.id || "",
          nationalHealthId: originalValues?.nationalHealthId || "",
          fullName: {
              firstName: firstName,
              lastName: lastName
          },
          email: [{email}],
          phone: [{number: phone}]
          
      }
  }
    updateUserProfile(userProfileRequest);
  }
  

  const handleEdit = () => {
    if (isEditing) {
      // Cancel edit and revert values to original
      setFirstName(originalValues?.fullName?.firstName || "");
      setLastName(originalValues?.fullName?.lastName || "");
      setEmail(originalValues?.email?.[0] || '');
      setPhone(originalValues?.phone?.[0] || "");
      setDob(originalValues?.dateOfBirth || "");
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
            source={require('../../../assets/back.png')}
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
          onPress={() => handleSubmit()}
          disabled={!isValidInput()}
          className="p-4"
          loading={loading}
        >
          Save
        </Button>
      </View>
      <Loader isVisible={loading || showLoading} />
    </SafeAreaView>
  );
};

export default EditProfile;
