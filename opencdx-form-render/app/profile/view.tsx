import React, { useState } from 'react';
import { Image, Text, View, Pressable } from 'react-native';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { SidebarLink } from '../../components/ui/sidenav';

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
}

const ProfileView = ({ links }: { links: any }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: 'John',
    lastName: 'Doe',
    email: 'jdoe@email.com',
    phoneNumber: '555-555-5555',
    dateOfBirth: 'Sep 23, 1978',
  });
  const [originalProfileData, setOriginalProfileData] = useState<ProfileData>(profileData);

  const handleEdit = () => {
    if (!isEditing) {
      setOriginalProfileData(profileData); // Save current data before editing
    }
    setIsEditing(!isEditing);
  };

  const handleCancelEdit = () => {
    setProfileData(originalProfileData); // Revert to original data
    setIsEditing(false);
  };

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setProfileData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleSave = () => {
    setIsEditing(false); // End editing mode
  };

  const isValidInput = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return profileData.firstName.length > 0 && profileData.lastName.length > 0 && profileData.email && emailRegex.test(profileData.email) && isEditing;
  };

  return (
    <View className="flex flex-row h-screen">
      {/* Sidebar */}
      <View className="bg-[#020B2D] bg-gradient-to-b from-[#020B2D] from-70% via-[#0A2A88] to-[#0D47E9] w-64 p-4">
        <Image
          source={require('../../assets/long.png')}
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
            <Image source={require('../../assets/profile-small.png')} className="w-6  h-6" />
          </View>
            <Text className="text-gray-800 mr-1">John</Text>
            <Image source={require('../../assets/arrow-down.png')} className="w-4 h-4" />
        </View>
      </View>


      <View className="flex-1 bg-white flex items-center justify-center">
        <View className="w-1/2 max-w-lg text-center">
          {/* Profile Picture and Edit Button */}
          <View className="flex items-center mb-4">
            <Image
              source={require('../../assets/profile.png')}
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
                source={require('~/assets/edit.png')}
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
              value={profileData.firstName}
              onChangeText={(text) => handleInputChange('firstName', text)}
              variant={isEditing ? 'default' : 'underline'}
              isEditable={isEditing}
            />
            <Input
              label="Last Name*"
              value={profileData.lastName}
              onChangeText={(text) => handleInputChange('lastName', text)}
              variant={isEditing ? 'default' : 'underline'}
              isEditable={isEditing}
            />
            <Input
              label="Email Address*"
              value={profileData.email}
              onChangeText={(text) => handleInputChange('email', text)}
              variant={isEditing ? 'default' : 'underline'}
              isEditable={isEditing}
            />
            <Input
              label="Phone Number"
              value={profileData.phoneNumber}
              onChangeText={(text) => handleInputChange('phoneNumber', text)}
              isEditable={isEditing}
              variant={isEditing ? 'default' : 'underline'}
            />
            <Input
              label="Date of Birth"
              value={profileData.dateOfBirth}
              onChangeText={(text) => handleInputChange('dateOfBirth', text)}
              isEditable={isEditing}
              variant={isEditing ? 'default' : 'underline'}
            />
          </View>

          {/* Save Button */}
            <Button onPress={handleSave} disabled={!isValidInput()} className="w-full py-2 rounded-lg mt-6">
              Save
            </Button>
          
        </View>
      </View>
     </View>
    </View>
  );
};

export default ProfileView;
