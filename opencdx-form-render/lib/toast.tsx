import { useToast, Toast, ToastDescription } from '@gluestack-ui/themed';
import React from 'react';

interface ToastOptions {
  message: string;
  type: 'success' | 'error';
}

export function useShowToast() {
  const toast = useToast();
  
  return React.useCallback(({ message, type }: ToastOptions) => {
    toast.show({
      placement: "top right",
      duration: 2000,
      render: ({ id }) => {
        const toastId = "toast-" + id;
        return (
          <Toast nativeID={toastId} bg={type === 'error' ? '#F31260' : '#107E4F'} width={278} height={52} alignContent='center' justifyContent='center' borderRadius={2} >
            <ToastDescription color='#FEE7EF' fontSize={16} fontWeight='medium' padding={5}>
              {message}
            </ToastDescription>
          </Toast>
        );
      },
    });
  }, [toast]);
}
