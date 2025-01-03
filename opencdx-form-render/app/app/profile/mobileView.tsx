import React, { useState, useLayoutEffect, useCallback, useEffect } from 'react';
import { View, SafeAreaView, Text, TouchableOpacity, Pressable,  KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
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
import useUserStore from '~/app/data_store/user_store';
import dayjs from 'dayjs';
import DateOfBirthPicker from '~/components/ui/DateOfBirthPicker';

const EditProfile = () => {
  const { userProfile, setUserProfile, updateUserStore, clearUserProfile } = useUserStore();
  const [showDOBPicker, setShowDOBPicker] = useState(false);
  const showToast = useShowToast();
  const navigation = useNavigation();
  
  // Hide the header when this component is mounted
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  // Success and error handlers for fetching the user profile
  const handleUserProfileSuccess = useCallback((data: { userProfile: UserProfile }) => {
    setUserProfile(data.userProfile);
    populateData(data.userProfile); // Populate data with user profile details
  }, [setUserProfile]);

  const handleUserProfileError = useCallback((err: any) => {
    if (axios.isAxiosError(err)) {
      const axiosError = err as AxiosError;
      console.error("User profile fetch error:", axiosError.message);
      showToast({ message: "Failed to fetch user profile", type: "error" });
    }
  }, [showToast]);

  const { userProfileData } = useGetHealthUserProfile(handleUserProfileSuccess, handleUserProfileError);

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
  const {updateUserProfile, loading} = usePutHealthUserProfile(handleUpdateUserProfileSuccess, handleUpdateUserProfileError)
  
  useEffect(() => {
    if (!userProfile) {
      // Fetch the user profile if it doesn't exist in the store
      userProfileData();
    } else {
      populateData(userProfile);
    }
  }, []);

  const handleEdit = () => {
    populateData(userProfile);
    setIsEditing(!isEditing);
  };

  function populateData(userProfile: UserProfile | undefined) {
    setFirstName(userProfile?.fullName?.firstName || "");
      setLastName(userProfile?.fullName?.lastName || "");
      setEmail(userProfile?.email?.[0]?.email || '');
      setPhone(userProfile?.phone?.[0]?.number || "");
      setDob(userProfile?.dateOfBirth || "");
  }

  const handleCancelEdit = () => {
    populateData(userProfile);
    setIsEditing(false);
  };

  // Profile state
  const [firstName, setFirstName] = useState(userProfile?.fullName?.firstName || "");
  const [lastName, setLastName] = useState(userProfile?.fullName?.lastName || "");
  const [email, setEmail] = useState(userProfile?.email?.[0]?.email || '');
  const [phone, setPhone] = useState(userProfile?.phone?.[0]?.number || "");
  const [dob, setDob] = useState(userProfile?.dateOfBirth || "");

  const [isEditing, setIsEditing] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const handleBack = () => {
    navigation.goBack();
  };
  const handleDateChange = (date: Date) => {
    setShowDOBPicker(false);
    setDob(dayjs(date).toDate().toISOString());
  };
  const handleSubmit = () => {
    setIsEditing(false); // End editing mode
    const userProfileRequest: PutHealthUserProfileRequest = {
      userId: userProfile?.userId || "",
      updatedProfile: {
          id: userProfile?.id || "",
          nationalHealthId: userProfile?.nationalHealthId || "",
          fullName: {
              firstName: firstName,
              lastName: lastName
          },
          email: [{email}],
          phone: phone.length > 0 ?  [{number: phone}] : undefined,
          dateOfBirth: dob.length > 0 ? dob : undefined
      }
  };
  const updatedUser = {
    fullName: { firstName: firstName, lastName: lastName },
    email: email ? [{email: email}] : [], // Convert email to an array of strings if it's required to be a string[]
    phone: phone ? [{number: phone}] : [], // Convert phone to an array of strings if it's required to be a string[]
    dateOfBirth: dob,
  };
    updateUserProfile(userProfileRequest);
    updateUserStore(updatedUser);
    console.log("update success:",userProfile);
  }

  const isValidInput = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return firstName.length > 0 && lastName.length > 0 && email && emailRegex.test(email) && isEditing;
  };

  return (
    <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Adjusts based on platform
        keyboardVerticalOffset={Platform.select({ ios: 0, android: 20 })} // Offset for smooth scrolling
    >
      <SafeAreaView className="flex-1 bg-white"> 
      <View className={`flex-row p-2 justify-between ${Platform.OS === 'ios' ? '' : 'mt-5'}`}>
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
      <ScrollView 
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled" // Allows tapping outside to dismiss keyboard
        >
      <View className={`flex-1 items-center justify-between p-4 ${Platform.OS === 'ios' ? '' : 'mb-50'}`}>
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
          className="mb-3"
        />
        <Input
          isEditable={isEditing}
          variant={isEditing ? 'default' : 'underline'}
          label="Last Name*"
          value={lastName}
          onChangeText={setLastName}
           className="mb-3"
        />
        <Input
          isEditable={isEditing}
          variant={isEditing ? 'default' : 'underline'}
          label="Email Address*"
          value={email}
          onChangeText={setEmail}
           className="mb-3"
        />
        <Input
          isEditable={isEditing}
          variant={isEditing ? 'default' : 'underline'}
          label="Phone Number"
          value={phone}
          onChangeText={setPhone}
          className="mb-3"
        />
          <Input
              isEditable={false}
              className='mb-10'
              variant={isEditing ? 'default' : 'underline'}
              label="Date of Birth"
              value={dob.length > 0 ? dayjs(dob).locale('en').format("MMMM DD, YYYY") : ""}
              onChangeText={setDob}
              onClick={()=> setShowDOBPicker(true && isEditing)}
            />
        <Button
          onPress={() => handleSubmit()}
          disabled={!isValidInput()}
          className={`p-4 ${Platform.OS === 'ios' ? '' : 'mb-16'}`}
          loading={loading}
        >
          Save
        </Button>
        
      </View>
      </ScrollView>
      <Loader isVisible={loading || showLoading} />
      {showDOBPicker && isEditing && (<DateOfBirthPicker initialDate={new Date(dob)} onDateChange={handleDateChange} onCancel={() => setShowDOBPicker(false)} />)}
    </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default EditProfile;
