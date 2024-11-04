import React, { useState, useCallback, useEffect } from 'react';
import { Image, Text, View, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import { SidebarLink } from '../../../components/ui/sidenav';
import { useGetHealthUserProfile, usePutHealthUserProfile} from '~/lib/iam-hooks';
import { UserProfile, PutHealthUserProfileRequest } from '~/api/health';
import { useShowToast } from '~/lib/toast';
import axios, { AxiosError } from 'axios';
import Loader from "~/components/ui/loading";
import useUserStore from '~/app/data_store/user_store';
import dayjs from 'dayjs';
import DateOfBirthPicker from '~/components/ui/DateOfBirthPicker';
const ProfileView = ({ links }: { links: any }) => {
  const { userProfile, setUserProfile, updateUserStore, clearUserProfile } = useUserStore();
  const showToast = useShowToast();
  const [isEditing, setIsEditing] = useState(false);
  const [showDOBPicker, setShowDOBPicker] = useState(false);
  const [showLoading, setshowLoading] = useState(false);
  
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
    // Fetch or set original values here
    const fetchData = async () => {
      populateData(userProfile);
    };
    fetchData();
  }, []);

  const handleEdit = () => {
    if (!isEditing) {
      populateData(userProfile); // Save current data before editing
    }
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

  const handleSave = () => {
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
          email: [{email: email}],
          phone: phone.length > 0 ?  [{number: phone}] : undefined,
          dateOfBirth: dob.length > 0 ? dob : undefined
      }
  };
  const updatedUser = {
    fullName: { firstName: firstName, lastName: lastName },
    email: [{email: email}],
    phone: [{number: phone}],
    dateOfBirth: dob,
  };
    updateUserProfile(userProfileRequest);
    updateUserStore(updatedUser);
    console.log("update success:",userProfile);
  };

  const isValidInput = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return firstName.length > 0 && lastName.length > 0 && email && emailRegex.test(email) && isEditing;
  };

  const handleDateChange = (date: Date) => {
    setShowDOBPicker(false);
    setDob(new Date(dayjs(date).locale('en').format("MMMM, DD, YYYY")).toISOString());
  };

  return (
    <View className="flex flex-row h-screen">
      {/* Sidebar */}
      <View className="bg-[#020B2D] bg-gradient-to-b from-[#020B2D] from-70% via-[#0A2A88] to-[#0D47E9] w-64 p-4">
        <Image
          source={require('../../../assets/long.png')}
          className="w-32 h-8 mb-8"
        />
        {links.map((link: any) => (
          <SidebarLink key={link.href} link={link} />
        ))}
      </View>

      {/* Header */}
      <View className="flex-1 bg-[#020B2D] overflow-y-auto">
       {/* Header Section */}
       <View style={{ borderTopLeftRadius: 40 }} className="flex flex-row justify-end items-center bg-white p-4">
        <View className="flex flex-row items-center">
          <View className="bg-blue-200 rounded-full w-8 h-8 flex items-center justify-center mr-2">
            <Image source={require('../../../assets/profile-small.png')} className="w-6  h-6" />
          </View>
            <Text className="text-gray-800 mr-1">John</Text>
            <Image source={require('../../../assets/arrow-down.png')} className="w-4 h-4" />
        </View>
      </View>


      <View className="flex-1 bg-white flex items-center justify-center">
        <View className="w-1/2 max-w-lg text-center">
          {/* Profile Picture and Edit Button */}
          <View className="flex items-center mb-4">
            <Image
              source={require('../../../assets/profile.png')}
              className="w-24 h-24 rounded-full mb-2"
            />
            <Pressable
              className="flex flex-row items-center mt-2"
              onPress={!isEditing ? handleEdit : handleCancelEdit}
              aria-label="Edit"
            >
              <Text className="text-blue-600 font-medium">
                {!isEditing ? "Edit" : "Cancel"}
              </Text>
              <Image
                source={require('../../../assets/edit.png')}
                className="w-4 h-4 ml-1"
                alt="Edit Icon"
              />
            </Pressable>
          </View>

          {/* Heading Section */}
          <Text className="text-2xl font-semibold mb-2">My Profile</Text>
          <Text className="text-gray-500 mb-8">This information is used for...</Text>

          {/* Form Fields */}
          <View className="space-y-4">
            <Input
              label="First Name*"
              value={firstName}
              onChangeText={(text) => setFirstName(text)}
              variant={isEditing ? 'default' : 'underline'}
              isEditable={isEditing}
            />
            <Input
              label="Last Name*"
              value={lastName}
              onChangeText={(text) => setLastName(text)}
              variant={isEditing ? 'default' : 'underline'}
              isEditable={isEditing}
            />
            <Input
              label="Email Address*"
              value={email}
              onChangeText={(text) => setEmail(text)}
              variant={isEditing ? 'default' : 'underline'}
              isEditable={isEditing}
            />
            <Input
              label="Phone Number"
              value={phone}
              onChangeText={(text) => setPhone(text)}
              isEditable={isEditing}
              variant={isEditing ? 'default' : 'underline'}
            />
            <Pressable
                    onPress={() => setShowDOBPicker(true && isEditing)}
                    accessibilityRole="button"
                    accessibilityLabel="Today"
                  >
            <Input
              label="Date of Birth"
              value={dob.length > 0 ? dayjs(dob).locale('en').format("MMM DD, YYYY") : ""}
              onChangeText={(text) => setDob(text)}
              isEditable={isEditing}
              variant={isEditing ? 'default' : 'underline'}
            />
            </Pressable>
          </View>

          {/* Save Button */}
            <Button onPress={handleSave} disabled={!isValidInput()} className="w-full py-2 rounded-lg mt-6">
              Save
            </Button>
          
        </View>
      </View>
      <Loader isVisible={loading || showLoading}/>
      {showDOBPicker && isEditing && (<DateOfBirthPicker initialDate={dob.length > 0 ? new Date(dob) : new Date()} onDateChange={handleDateChange} />)}
     </View>
    </View>
  );
};

export default ProfileView;
