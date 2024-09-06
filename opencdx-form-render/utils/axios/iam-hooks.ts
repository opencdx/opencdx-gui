import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { iamApi } from '../../api';
import { LoginRequest } from '../../api/iam';

/**
 * Custom hook to handle user login
 * @param {Function} onSuccess - Callback function executed upon successful login
 * @param {Function} onError - Callback function executed upon failed login
 * @returns {Object} - Object containing login function, loading state, and error
 */
export const useLogin = (onSuccess, onError) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigation = useNavigation();

    const login = async (credentials: LoginRequest) => {
        setLoading(true);
        setError(null);

        try {
            // Call the login API
            const response = await iamApi.login({ loginRequest: credentials });
            // Execute the onSuccess callback if provided
            if (onSuccess) onSuccess(response.data);
        } catch (err) {
            console.error('Login failed:', err);
            setError(err);

            // Execute the onError callback if provided
            if (onError) onError(err);
        } finally {
            setLoading(false);
        }
    };

    return {
        login,
        loading,
        error,
    };
};
