'use client';

import React, { useEffect, useState } from 'react';
import '../../styles/password-validation.css';
import styles from '../../styles/custom-input.module.css';
import { AxiosError } from 'axios';
import ValidationRow from '@/components/custom/validationRow';

import { Card, CardBody, CardFooter, CardHeader, Image, user } from '@nextui-org/react';
import { toast, ToastContainer } from 'react-toastify';
import { useRouter } from 'next/navigation';
import 'react-toastify/dist/ReactToastify.css';
import { useResetPassword } from '@/hooks/iam-hooks';

import { Button, Input } from 'ui-library';
import {useTranslations} from 'next-intl';
import { use } from 'chai';
import { set } from 'cypress/types/lodash';
// import { cookies } from 'next/headers';


export default function ResetPassword() {
  const handleSuccess = (data: any) => {
    setIsLoading(false); 
    console.log('Login successful:', data);
};

const handleError = (error: AxiosError) => {
    setIsLoading(false); 
    const errorData = error.response?.data as { cause: { localizedMessage: string } };
    if(errorData){
      setErrorMessage(errorData.cause.localizedMessage);
    } else {
      setErrorMessage(t('error_occurred'));
    }
};
  const { mutate: resetPassword, error } = useResetPassword(handleSuccess, handleError);
  const t = useTranslations('common');
  const [isVisible, setIsVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordMatched, setConfirmPasswordMatched] = useState(true);
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [isLoading, setIsLoading] = useState(false);
  const [validation, setValidation] = useState({
    length: false,
    specialChar: false,
    uppercase: false,
    lowercase: false,
    number: false
  });

  const validatePassword = (pass: string) => {
    setValidation({
      length: pass.length >= 8,
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(pass),
      uppercase: /[A-Z]/.test(pass),
      lowercase: /[a-z]/.test(pass),
      number: /[0-9]/.test(pass)
    });
  };
  const isDisabled = () => {
    // validate the username as email address
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !username || !emailRegex.test(username) || !password || !validation.length || !validation.specialChar || !validation.uppercase || !validation.lowercase || !validation.number || !confirmPasswordMatched || !confirmPassword;
  };

  useEffect(() => {
        const tempusername = localStorage.getItem('username');
        console.log(tempusername);
        if (tempusername) {
            setUsername(tempusername);
        }
    }, []);

  const handlePasswordChange = (newPassword: string) => {
    setErrorMessage('');
    setPassword(newPassword);
    validatePassword(newPassword);
    if (confirmPassword) {
      setConfirmPasswordMatched(newPassword === confirmPassword);
    } else {
      setConfirmPasswordMatched(true);
    }
  };

  const handleConfirmPasswordChange = (newPassword: string) => {
    setErrorMessage('');
    setConfirmPassword(newPassword);
    setConfirmPasswordMatched(newPassword === password);
  };

  const handleSubmit = async () => {
    if (username) {
        resetPassword({ username, newPassword: password, newPasswordConfirmation: password});
    }
  };

  return (
    <div className="flex justify-center items-center h-screen min-h-[calc(100vh - 68px)]">
        <Card
          aria-label="reset passowrd form"
          className="w-[500px] max-w-full p-4"
          tabIndex={0}
          shadow='none'
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
            <label className="text-start text-black-500 text-lg">
                {t("change_password_title")}
            </label>
            <label className="text-start text-gray-500 text-sm">
                {t("change_password_description")}
            </label>
            
            <Input
              required
              isReadOnly
              defaultValue={localStorage.getItem('username') ?? ''}
              variant="bordered"
              id="email"
              label={t('email_usename_placeholder')}
              type="userName"
              isRequired
              onValueChange={setUsername}
            />
            <div className="w-full flex flex-col gap-2">
            <Input
                id="password"
                label={t("new_password_placeholder")}
                defaultValue=""
                isRequired
                variant="bordered"
                type={isVisible ? 'text' : 'password'}
                onValueChange={handlePasswordChange}
                
                endContent={
                  <button
                    aria-label="toggle password visibility"
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <img alt="nextui logo" src="/eye.svg" />
                    ) : (
                      <img alt="nextui logo" src="/cross_eye.svg" />
                    )}
                  </button>
                }
              />
              {errorMessage && (
                <p className="text-danger" style={{ fontSize: '0.70rem' }}>&nbsp;&nbsp;&nbsp;{errorMessage}</p>
              )}
              <Input
                id="confirmPassword"
                label={t('confirm_password_placeholder')}
                defaultValue=""
                isRequired
                variant="bordered"
                type={ "text" }
                isInvalid={!confirmPasswordMatched}
                onValueChange={handleConfirmPasswordChange}
                errorMessage={t('password_mismatch')}
              />
                <div className="validation-container">
                    <ValidationRow
                    isValid={validation.length}
                    label={t("password_min_characters")}
                    />
                    <ValidationRow
                    isValid={validation.specialChar}
                    label={t("password_special_characters")}
                    />
                    <ValidationRow
                    isValid={validation.number}
                    label={t("password_number_characters")}
                    />
                    <ValidationRow
                    isValid={validation.lowercase}
                    label={t("password_lower_characters")}
                    />
                    <ValidationRow
                    isValid={validation.uppercase}
                    label={t("password_upper_characters")}
                    />
                </div>
            </div>
          </CardBody>
          <CardFooter>
            <Button className="w-full"
              color={isDisabled() ? 'default' : 'primary'}
              type="submit"
              disabled={isDisabled()}
              onClick={handleSubmit}
            >
              {t("confirm_password_reset_button")}
            </Button>
          </CardFooter>
        </Card>
      <ToastContainer />
    </div>
  );
}

