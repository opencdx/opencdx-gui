'use client';

import React, { Suspense, useState } from 'react';

import { useRouter } from 'next/navigation';

import Loading from '@/components/custom/loading';
import { Link } from '@nextui-org/link';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
} from '@nextui-org/react';
import { toast, ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { useLogin } from '@/hooks/iam-hooks';
import { useTranslations } from 'next-intl';
import { Button, Input } from 'ui-library';
import { AxiosError, HttpStatusCode } from 'axios';
import { set } from 'cypress/types/lodash';

export default function Login() {
  // Define success and error callback functions
const handleSuccess = (data: any) => {
    setIsLoading(false); 
    console.log('Login successful:', data);
};

const handleError = (error: AxiosError) => {
    setIsLoading(false); 
    const errorData = error.response?.data as { cause: { localizedMessage: string } };
    const errorCode = error.response?.status 

    if (errorCode === 401)
    {
       toast.error( t('login_failed'));
    }
    else{

      toast.error(errorData.cause.localizedMessage || t('error_occurred'));

    }
    
    
};
  const { mutate: login, error } = useLogin(handleSuccess, handleError);
  const [isLoading, setIsLoading] = useState(false);

  const t = useTranslations('common');
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const toggleVisibility = () => setIsVisible(!isVisible);
  // check the value of all fields in the form, if all fields are filled, the button will be enabled
  const isDisabled = () => {
    return !username || !password;
  };

  const handlePasswordChange = (newPassword: string) => {
    setErrorMessage('');
    setPassword(newPassword);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true); // Set loading to true before making the API call
    setErrorMessage('');
    e.preventDefault();

    const userName = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;

    await login({ userName, password });
  };

  return (
    <div className="flex justify-center items-center h-screen min-h-[calc(100vh - 68px)]">
      {isLoading && <Loading />}

      <form
        className="flex justify-center items-center"
        onSubmit={handleSubmit}
      >
        <Card
          aria-label="login form"
          className="w-[500px] max-w-full p-4"
          tabIndex={0}
          shadow="none"
        >
          <CardHeader className="flex justify-center">
            <div aria-label="open">
              <Image
                alt="opencdx logos"
                aria-label="OpenCDX Logo"
                radius="none"
                src="/login-logo.png"
                tabIndex={0}
              />
            </div>
          </CardHeader>
          <CardBody className="grid gap-4">
            <Input
              className='label-color'
              required
              defaultValue=""
              variant="bordered"
              id="email"
              label={t('email_usename_placeholder')}
              type="userName"
              isRequired
              onValueChange={setUsername}
            />
          <div className="w-full flex flex-col m-0 gap-0">
            <Input
                className='label-color'
                id="password"
                label={t('password_placeholder')}
                defaultValue=""
                isRequired
                variant="bordered"
                type={isVisible ? 'text' : 'password'}
                onValueChange={handlePasswordChange}
                errorMessage={ errorMessage.length > 0 ? errorMessage : t('invalid_password')}
                endContent={
                  <button
                    aria-label="toggle password visibility"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <Image alt="nextui logo" src="/eye.svg" />
                    ) : (
                      <Image alt="nextui logo" src="/cross_eye.svg" />
                    )}
                  </button>
                }
              />
              {errorMessage && (
                <p className="text-danger" style={{ fontSize: '0.70rem' }}>&nbsp;&nbsp;&nbsp;{errorMessage}</p>
              )}
            </div>
            
          </CardBody>
          <CardFooter className="flex m-0 justify-end">
            <Link
              className="text-center"
              color="primary"
              onPress={() => router.push('/forgot-password')}
            >
              {t('forgot_password_label')}
            </Link>
          </CardFooter>
          <CardFooter>
            <Button
              className="w-full"
              color={isDisabled() ? 'default' : 'primary'}
              type="submit"
              disabled={isDisabled()}
            >
              {t('login_label')}
            </Button>
          </CardFooter>

          <CardFooter className="flex justify-center">
            <label className="text-center text-gray-500">
              {t('dont_have_account')}
            </label>
            &nbsp;
            <Link
              className="text-center"
              color="primary"
              onPress={() => router.push('/signup')}
            >
              {t('sign_up_label')}
            </Link>
          </CardFooter>
        </Card>
      </form>
      <ToastContainer 
          position={"top-right"}
          icon={false}
          autoClose={2000}
          hideProgressBar={true}
          closeOnClick={true}
          pauseOnHover={true}
          draggable={true}
          theme={"colored"}
          closeButton={false} 
      />
    </div>
  );
}
