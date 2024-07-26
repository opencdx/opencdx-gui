
import { iamApi } from "../api";
import { LoginRequest , SignUpRequest, ChangePasswordRequest} from "../api/iam";
import { useMutation , useQuery} from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

// This hook uses the useMutation hook from react-query
// to handle the login request
// The useMutation hook takes an object with the following properties:
// - mutationFn: The function that performs the login request
// - onSuccess: A callback function that is called when the login request is successful
// - onError: A callback function that is called when the login request fails


export const useLogin = () => {
    const router = useRouter();

return useMutation({
    mutationFn: (credentials: LoginRequest) => iamApi.login({ loginRequest: credentials }),
    onSuccess: (data) => {
            const { token } = data.data
            localStorage.setItem('serviceToken', token as string);
            router.push('/form-builder');
    },
    onError: (error) => {
        console.error('Login failed:', error);
        // Handle login errors, e.g., display error message
    },
});
};

export const useSignUp = () => {
    const router = useRouter();
    
        return useMutation({
            mutationFn: (credentials: SignUpRequest) => iamApi.signUp({ signUpRequest: credentials }),
            onSuccess: (data) => {
                router.push('/form-builder');
            },
            onError: (error) => {
                console.error('Registration failed:', error);
                // Handle registration errors, e.g., display error message
            },
        });
    }

export const usePasswordChange = () => {
    const router = useRouter();    
        return useMutation({
            mutationFn: (credentials: ChangePasswordRequest) => iamApi.changePassword({ changePasswordRequest: credentials }),
            onSuccess: (data) => {
            router.push('/login');
            },
            onError: (error) => {
                console.error('Password change failed:', error);
                // Handle password change errors, e.g., display error message
            },
        });
    }

export const useCurrentUser = () => {
    return useQuery({
        queryKey: ['currentUser'],
        queryFn: async () => iamApi.currentUser(),
      })
}
