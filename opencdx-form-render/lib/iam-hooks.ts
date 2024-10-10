import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { iamApi , questionnaireApi} from '../api';
import { useMutation } from '@tanstack/react-query';

import { GetQuestionnaireListRequest, QuestionnaireRequest } from "../api/questionnaire";

import { LoginRequest, SignUpRequest, ResetPasswordRequest, SignUpResponse } from '../api/iam';
/**
 * Custom hook to handle user login
 * @param {Function} onSuccess - Callback function executed upon successful login
 * @param {Function} onError - Callback function executed upon failed login
 * @returns {Object} - Object containing login function, loading state, and error
 */
export const useLogin = (onSuccess: (arg0: any) => void, onError: (arg0: unknown) => void) => {
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
            setError(err as any);

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

export const useSignUp = (onSuccess: (arg0: any) => void, onError: (arg0: unknown) => void) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const signup = async (credentials: SignUpRequest) => {
        setLoading(true);
        setError(null);

        try {
            // Call the login API
            const response = await iamApi.signUp({ signUpRequest: credentials });
            const signupData: SignUpResponse = response.data;
            const userId = signupData.iamUser?.id || '';
            // Execute the onSuccess callback if provided
            try {
                await iamApi.verifyEmailIamUser({ id: userId });
                if (onSuccess) onSuccess(response);
            } catch (error) {
                console.error('Email verification failed:', error);
                if (onError) onError(error);
            }
        } catch (err) {
            console.error('Login failed:', err);
            setError(err as any);

            // Execute the onError callback if provided
            if (onError) onError(err);
        } finally {
            setLoading(false);
        }
    };

    return {
        signup,
        loading,
        error,
    };
}

export const useResetPassword = (onSuccess: (arg0: any) => void, onError: (arg0: unknown) => void) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const resetPassword = async (credentials: ResetPasswordRequest) => {
        setLoading(true);
        setError(null);

        try {
            // Call the login API
            const response = await iamApi.resetPassword({ resetPasswordRequest: credentials });
            if (onSuccess) onSuccess(response);
        } catch (err) {
            console.error('Login failed:', err);
            setError(err as any);

            // Execute the onError callback if provided
            if (onError) onError(err);
        } finally {
            setLoading(false);
        }
    };

    return {
        resetPassword,
        loading,
        error,
    };
}

export const useGetQuestionnaireList = () => {

    return useMutation({
        mutationFn: (params: GetQuestionnaireListRequest) => questionnaireApi.getQuestionnaires({ getQuestionnaireListRequest: params })
    });
};
