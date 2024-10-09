import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { View, Text, Pressable, ScrollView, Platform } from 'react-native';
import { EyeIcon, EyeOffIcon } from 'lucide-react-native';
import { useLogin } from '../../lib/iam-hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Image } from '../../components/ui/image';

// Custom hook for form handling
const useLoginForm = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);

	const isDisabled = useMemo(() => !username || !password, [username, password]);
	const toggleShowPassword = useCallback(() => setShowPassword(prev => !prev), []);

	return { username, setUsername, password, setPassword, showPassword, isDisabled, toggleShowPassword };
};

const Login = () => {
	const navigation = useNavigation();
	const { username, setUsername, password, setPassword, showPassword, isDisabled, toggleShowPassword } = useLoginForm();
	const [isLoading, setIsLoading] = useState(false);


	const handleLoginSuccess = useCallback((data: any) => {
		setIsLoading(false);
		AsyncStorage.setItem('jwtToken', data.token);
		navigation.navigate('dashboard/index' as never);
	}, [navigation]);

	const handleLoginError = useCallback((err: unknown) => {
		if (err && typeof err === 'object' && 'response' in err) {
			const errorData = (err as { response?: { data?: unknown } }).response?.data;
			console.error('Login error:', errorData);
		} else {
			console.error('Unexpected login error:', err);
		}
		setIsLoading(false);
		// TODO: Implement proper error handling and user feedback
		// showToaster('Invalid Credentials.');
		// showToaster(error);
	}, []);

	const { login } = useLogin(handleLoginSuccess, handleLoginError);

	const handleLogin = useCallback(async () => {
		try {
			setIsLoading(true);
			login({ userName: username, password: password });
		} catch (error) {
			setIsLoading(false);
			// showToaster(error);
		}
	}, [username, password, login]);

	const handleSignup = useCallback(() => {
		navigation.navigate('auth/signup' as never);
	}, [navigation]);

	const renderContent = () => (
		<View
			id="main-content"
			className="flex flex-1 justify-center items-center bg-white max-w-[500px] w-full mx-auto p-4 sm:p-0"
		>
			<Image
				source={require('../../assets/opencdx.png')}
				ariaLabel="OpenCDx logo"
				alt="OpenCDx logo"
			/>

			<View className="w-full gap-8 sm:gap-12 items-center">
				<Input
					label="Email Address*"
					value={username}
					onChangeText={setUsername}
				/>
				<Input
					label="Password*"
					value={password}
					onChangeText={setPassword}
					secureTextEntry={!showPassword}
					rightIcon={
						<Pressable
							className="absolute right-3 top-1/2 transform -translate-y-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
							onPress={toggleShowPassword}
							role="button"
							aria-label="Toggle password visibility"
						>
							{showPassword ? <EyeIcon className='focus:outline-none focus:ring-2 focus:ring-blue-500' aria-label="Show password" color='#a79f9f' size={23} /> : <EyeOffIcon className='focus:outline-none focus:ring-2 focus:ring-blue-500' aria-label="Hide password" color='#a79f9f' size={23}  />}
						</Pressable>
					}
				/>

				<Pressable
					className="self-end mt-1 p-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
					onPress={() => {navigation.navigate('dashboard/index' as never)}}
					role="link"
					aria-label="Forgot Password"
				>
					<Text className="font-inter text-base font-normal leading-7 text-right text-blue-600">
						Forgot Password
					</Text>
				</Pressable>
			</View>

			<Button
				onPress={handleLogin}
				disabled={isDisabled}
				loading={isLoading}
			>
				Login
			</Button>

			<View className="flex-row items-center space-x-1">
				<Text className="font-inter text-base font-normal leading-7 text-right text-black">
					Don't have an account?
				</Text>
				<Pressable
					onPress={() => {handleSignup()}}
					role="link"
					aria-label="Sign Up"
				>
					<Text className="text-blue-600">Sign Up</Text>
				</Pressable>
			</View>
		</View>
	);

	return (
		<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
			{Platform.OS === 'web' ? (
				<main aria-label="main-layout" className="flex items-center justify-center min-h-screen">
					{renderContent()}
				</main>
			) : (
				<View aria-label="main-layout" className="flex items-center justify-center min-h-screen">
					{renderContent()}
				</View>
			)}
		</ScrollView>
	);
};

export default React.memo(Login);