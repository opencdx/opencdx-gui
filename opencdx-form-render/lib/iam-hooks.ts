import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { iamApi , questionnaireApi, healthApi} from '../api';
import { useMutation } from '@tanstack/react-query';

import { GetQuestionnaireListRequest, QuestionnaireRequest } from "../api/questionnaire";
import { UserProfileResponse, UserProfile, PutHealthUserProfileRequest } from '../api/health';
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

export const useGetQuestionnaireList = (onLoading?: (isLoading: boolean) => void) => {
    return useMutation({
        mutationFn: (params: GetQuestionnaireListRequest) => questionnaireApi.getQuestionnaires({ getQuestionnaireListRequest: params }),
        onMutate: () => {
            if (onLoading) onLoading(true);
        },
        onSettled: () => {
            if (onLoading) onLoading(false);
        },
    });
};

export const useGetHealthUserProfile = (onSuccess: (arg0: any) => void, onError: (arg0: unknown) => void) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const userProfileData = async () => {
        setLoading(true);
        setError(null);

        try {
            // Call the userProfile API
            const response = await healthApi.getHealthUserProfile();
            console.log(response.data)
            // Execute the onSuccess callback if provided
            if (onSuccess) onSuccess(response.data);
        } catch (err) {
            setError(err as any);

            // Execute the onError callback if provided
            if (onError) onError(err);
        } finally {
            setLoading(false);
        }
    };

    return {
        userProfileData,
        loading,
        error,
    };
};

export const usePutHealthUserProfile = (onSuccess: (arg0: any) => void, onError: (arg0: unknown) => void) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateUserProfile = async (credentials: PutHealthUserProfileRequest) => {
        setLoading(true);
        setError(null);

        try {
            // Call the userProfile API
            const response = await healthApi.putHealthUserProfile({putHealthUserProfileRequest: credentials});
            
            // Execute the onSuccess callback if provided
            if (onSuccess) onSuccess(response.data);
        } catch (err) {
            setError(err as any);

            // Execute the onError callback if provided
            if (onError) onError(err);
        } finally {
            setLoading(false);
        }
    };

    return {
        updateUserProfile,
        loading,
        error,
    };
};
