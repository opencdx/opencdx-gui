import React from 'react';
import {  Image, Text, View } from 'react-native';
import { Input, InputField } from '@gluestack-ui/themed';
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
  // This would typically come from an API or state management
  const profileData: ProfileData = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'jdoe@email.com',
    phoneNumber: '555-555-5555',
    dateOfBirth: 'Sep 23, 1978',
  };

  return (
    <View className="flex flex-row h-screen">
      <View className="bg-[#020B2D] bg-gradient-to-b from-[#020B2D] from-70% via-[#0A2A88] to-[#0D47E9] w-64 p-4">
        <Image
          source={require('../../assets/long.png')}
          className="w-32 h-8 mb-8"
        />
        {links.map((link: any) => (
          <SidebarLink key={link.href} link={link} />
        ))}
      </View>
      <View className="flex-1 bg-[#020B2D] overflow-y-auto">
      <View className="flex flex-row justify-end items-center bg-white p-4  rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 h-screen">
          <div className="max-w-md mx-auto p-4">
            <div className="flex flex-col items-center mb-6">
              <Image
                source={require('../../assets/profile.png')}
                alt="Profile"
                width={80}
                height={80}
                className="rounded-full mb-2"
              />
              <div className="flex items-center">
                <span className="text-xl font-semibold mr-2">{profileData.firstName}</span>
                <View className='flex-row'>
                  <button className="text-blue-500 text-sm">Edit</button>
                  <Image source={require('~/assets/edit.png')} className='ml-3'/>
                </View>
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
            <View className="w-[500px] justify-center items-center">
              <Button
                onPress={() => { }}
                disabled={false}
                loading={false}
                children="Save"
                className="w-[500px] bg-gray-200 text-black py-2 rounded-md mt-6 font-semibold"
              />
              </View>
          </div>
        </View>
      </View>
    </View>
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
