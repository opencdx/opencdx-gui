import React from 'react';
import {  Image, Text, View } from 'react-native';
import { Input, InputField } from '@gluestack-ui/themed';
import { Button } from '../../../components/ui/button';

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
}

const ProfileView: React.FC = () => {
  // This would typically come from an API or state management
  const profileData: ProfileData = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'jdoe@email.com',
    phoneNumber: '555-555-5555',
    dateOfBirth: 'Sep 23, 1978',
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="flex flex-col items-center mb-6">
        <Image
          source={require('../../../assets/profile.png')}
          alt="Profile"
          width={80}
          height={80}
          className="rounded-full mb-2"
        />
        <div className="flex items-center">
          <span className="text-xl font-semibold mr-2">{profileData.firstName}</span>
          <button className="text-blue-500 text-sm">Edit</button>
        </div>
      </div>

      <h1 className="text-2xl font-bold mb-2">My Profile</h1>
      <p className="text-gray-600 mb-6">This information is used for...</p>

      <div className="space-y-4 w-[500px]">
        <ProfileField label="First Name*" value={profileData.firstName} required />
        <ProfileField label="Last Name*" value={profileData.lastName} required />
        <ProfileField label="Email Address*" value={profileData.email} required />
        <ProfileField label="Phone Number" value={profileData.phoneNumber} />
        <ProfileField label="Date of Birth" value={profileData.dateOfBirth} />
      </div>

        <Button
          onPress={() => { }}
          disabled={false}
          loading={false}
          children="Save"
          className="w-full bg-gray-200 text-black py-2 rounded-md mt-6 font-semibold"
        />
    </div>
  );
};

interface ProfileFieldProps {
  label: string;
  value: string;
  required?: boolean;
}

const ProfileField: React.FC<ProfileFieldProps> = ({ label, value, required }) => (
  <div>
    <Text>{label}</Text>
    <Input

      variant="underlined"

    >
      <InputField placeholder={label} defaultValue={value} onChangeText={() => { }} />

    </Input>
  </div>
);

export default ProfileView;
