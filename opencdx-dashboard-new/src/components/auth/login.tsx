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

export default function Login() {
  const { mutate: login, error } = useLogin();
  const [isLoading, setIsLoading] = useState(false);

  const t = useTranslations('common');
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const toggleVisibility = () => setIsVisible(!isVisible);
  // check the value of all fields in the form, if all fields are filled, the button will be enabled
  const isDisabled = () => {
    return !username || !password;
  };

  const handlePasswordChange = (newPassword: string) => {
    setPassword(newPassword);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true); // Set loading to true before making the API call

    e.preventDefault();

    const userName = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;

    await login({ userName, password });
    setIsLoading(false); // Set loading to false after making the API call

    if (error) {
      toast.error(error.message || t('error_occurred'), {
        position: 'top-center',
        autoClose: 2000,
      });
    }
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
              required
              defaultValue=""
              variant="bordered"
              id="email"
              label={t('email_usename_placeholder')}
              type="userName"
              isRequired
              onValueChange={setUsername}
            />

            <Input
              id="password"
              label={t('password_placeholder')}
              defaultValue=""
              isRequired
              variant="bordered"
              type={isVisible ? 'text' : 'password'}
              onValueChange={handlePasswordChange}
              errorMessage={t('invalid_password')}
              endContent={
                <button
                  aria-label="toggle password visibility"
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <Image alt="nextui logo" src="/eye.png" />
                  ) : (
                    <Image alt="nextui logo" src="/cross_eye.png" />
                  )}
                </button>
              }
            />
          </CardBody>
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
      <ToastContainer />
    </div>
  );
}
