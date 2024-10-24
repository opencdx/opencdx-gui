import React, { useState } from 'react';
import { Image, Text, View } from 'react-native';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';


interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
}

const ProfileView: React.FC = () => {
  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: 'John',
    lastName: 'Doe',
    email: 'jdoe@email.com',
    phoneNumber: '555-555-5555',
    dateOfBirth: 'Sep 23, 1978',
  });

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setProfileData({ ...profileData, [field]: value });
  };

  return (
    <View className="flex flex-1 justify-center items-center bg-white max-w-[500px] w-full mx-auto p-4 sm:p-0">
      <View className="items-center mb-6">
        <Image
          source={require('../../assets/profile.png')}
          className="w-20 h-20 rounded-full mb-2"
        />
        <Button onPress={() => {}}  className="bg-blue-500 text-white" >
           Edit
        </Button>
      </View>

      {/* Heading */}
      <View className="w-full">
            <Text className="text-2xl font-semibold mb-3">My Profile</Text>
            <Text className="text-gray-500 mb-8">This information is used for...</Text>
      </View>
    
      <View className="w-full mb-2 gap-2" style={{marginLeft:-10}}>
        <Input
          label="First Name*"
          value={profileData.firstName}
          onChangeText={(text) => handleInputChange('firstName', text)}
          variant='underline'
        />

        <Input
          label="Last Name*"
          value={profileData.lastName}
          onChangeText={(text) => handleInputChange('lastName', text)}
          variant='underline'
        />

        <Input
          label="Email Address*"
          value={profileData.email}
          onChangeText={(text) => handleInputChange('email', text)}
         // className=" p-2 mb-2"
          variant='underline'
          keyboardType="email-address"
        />

        <Input
          label="Phone Number"
          value={profileData.phoneNumber}
          onChangeText={(text) => handleInputChange('phoneNumber', text)}
          //className=" p-2 mb-4"
          variant='underline'
          keyboardType="phone-pad"
        />

        <Input
          label="Date of Birth"
          value={profileData.dateOfBirth}
          onChangeText={(text) => handleInputChange('dateOfBirth', text)}
          //className="border-b border-gray-300 p-2 mb-4"
          variant='underline'
          
        />
      </View>

      <Button onPress={() => {}}  className="w-full bg-blue-500 text-white py-2 mt-6 rounded-lg" >
            Save
        </Button>
    </View>
  );
};

export default ProfileView;
