
import { iamApi, questionnaireApi, classificationApi } from "../api";
import { LoginRequest, SignUpRequest, ChangePasswordRequest, ResetPasswordRequest, SignUpResponse } from "../api/iam";


import { GetQuestionnaireListRequest, QuestionnaireRequest } from "@/api/questionnaire";
import { RuleSetsRequest } from "@/api/classification";

import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

// This hook uses the useMutation hook from react-query
// to handle the login request
// The useMutation hook takes an object with the following properties:
// - mutationFn: The function that performs the login request
// - onSuccess: A callback function that is called when the login request is successful
// - onError: A callback function that is called when the login request fails


export const useLogin = (onSuccess: (data: any) => void, onError: (error: any) => void) => {
    const router = useRouter();

    return useMutation({
        mutationFn: (credentials: LoginRequest) => iamApi.login({ loginRequest: credentials }),
        onSuccess: (data) => {
            const { token } = data.data
            localStorage.setItem('serviceToken', token as string);
            router.push('/pages/form-builder');
            if (onSuccess) onSuccess(data);
        },
        onError: (error) => {
            console.error('Login failed:', error);
            if (onError) onError(error);
        },
    });
};

export const useSignUp = (onSuccess: (data: any) => void, onError: (error: any) => void) => {
    const router = useRouter();

    return useMutation({
        mutationFn: (credentials: SignUpRequest) => iamApi.signUp({ signUpRequest: credentials }),
        onSuccess: async (data) => {
            const signupData: SignUpResponse = data.data;
            const userId = signupData.iamUser?.id || '';
            try {
                await iamApi.verifyEmailIamUser({ id: userId });
                router.push('/auth/login');
                if (onSuccess) onSuccess(data);
            } catch (error) {
                console.error('Email verification failed:', error);
                if (onError) onError(error);
            }
            
        },
        onError: (error) => {
            console.error('Registration failed:', error);
            if (onError) onError(error);
        },
    });
}

export const useResetPassword = (onSuccess: (data: any) => void, onError: (error: any) => void) => {
    const router = useRouter();
    return useMutation({
        mutationFn: (credentials: ResetPasswordRequest) => iamApi.resetPassword({ resetPasswordRequest: credentials }),
        onSuccess: (data) => {
            router.push('/auth/reset-password-success');
            if (onSuccess) onSuccess(data);
        },
        onError: (error) => {
            console.error('Password change failed:', error);
            if (onError) onError(error);
        },
    });
}

export const usePasswordChange = () => {
    const router = useRouter();
    return useMutation({
        mutationFn: (credentials: ChangePasswordRequest) => iamApi.changePassword({ changePasswordRequest: credentials }),
        onSuccess: (data) => {
            router.push('/auth/login');
        },
        onError: (error) => {
            console.error('Password change failed:', error);
        },
    });
}

export const useCurrentUser = () => {
    return useQuery({
        queryKey: ['currentUser'],
        queryFn: async () => iamApi.currentUser(),
    })
}

export const useGetQuestionnaireList = () => {

    return useMutation({
        mutationFn: (params: GetQuestionnaireListRequest) => questionnaireApi.getQuestionnaires({ getQuestionnaireListRequest: params })
    });
};

export const useGetQuestionnaire = () => {

    return useMutation({
        mutationFn: (params: any) => questionnaireApi.getQuestionnaire({ id: params.id, updateAnswers: params.updateAnswers })
    });
};

export const useDeleteQuestionnaire = () => {

    return useMutation({
        mutationFn: (credentials: string) => questionnaireApi.deleteQuestionnaire({ id: credentials })
    });
};

export const useGetRuleSets = () => {

    return useMutation({
        mutationFn: (params: RuleSetsRequest) => classificationApi.getRuleSets({ ruleSetsRequest: params })
    });
};

export const useCreateQuestionnaire = () => {

    return useMutation({
        mutationFn: (params: QuestionnaireRequest) => questionnaireApi.createQuestionnaire({ questionnaireRequest: params })
    });
};
export const useUpdateQuestionnaire = () => {

    return useMutation({
        mutationFn: (params: QuestionnaireRequest) => questionnaireApi.updateQuestionnaire({ questionnaireRequest: params })
    });
};

export const useUserVerify = (userId: string) => {
    return iamApi.verifyEmailIamUser({id: userId});
}

export const logout = (router: ReturnType<typeof useRouter>) => {
    localStorage.removeItem('serviceToken');
    router.replace('/login');
};

export const handleSessionOut = (router: ReturnType<typeof useRouter>) => {
    const isAuthenticated = localStorage.getItem('serviceToken');
    if (!isAuthenticated || isAuthenticated.length === 0) {
        router.replace('/login');
    }
};

