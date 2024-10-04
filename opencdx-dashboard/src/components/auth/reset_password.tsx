'use client';

import React, { useEffect, useState } from 'react';
import '../../styles/password-validation.css';
import styles from '../../styles/custom-input.module.css';
import { AxiosError } from 'axios';
import ValidationRow from '@/components/custom/validationRow';

import { Card, CardBody, CardFooter, CardHeader, Image, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from 'ui-library';
import { toast, ToastContainer } from 'react-toastify';
import { useRouter } from 'next/navigation';
import 'react-toastify/dist/ReactToastify.css';
import { useResetPassword } from '@/hooks/iam-hooks';

import { Button, Input } from 'ui-library';
import {useTranslations} from 'next-intl';
import Loading from '@/components/custom/loading';


export default function ResetPassword() {
  const router = useRouter();
  const handleSuccess = (data: any) => {
    setIsLoading(false); 
    console.log('Login successful:', data);
};

const handleError = (error: AxiosError) => {
    setIsLoading(false); 
    const errorData = error.response?.data as { cause: { localizedMessage: string } };
    const errorCode = error.response?.status 

      if (errorCode === 401 || errorCode === 404)
      {
         toast.error( t('reset_password_failed'));
      }
      else
      {
        toast.error(errorData.cause.localizedMessage || t('error_occurred'));
      }
};

  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const { mutate: resetPassword, error } = useResetPassword(handleSuccess, handleError);
  const t = useTranslations('common');
  const [isVisible, setIsVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordMatched, setConfirmPasswordMatched] = useState(true);
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible);
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
        setIsLoading(true);
        resetPassword({ username, newPassword: password, newPasswordConfirmation: password});
    }
  };
  const handleBack = () => {
    router.back();
  };
  return (
    <div>
    <Button
    className='button-no-hover'
    color="primary"
    variant="light"
    onClick={handleBack} // Handle back button click
    startContent={<Image src="/back.svg" alt="back" width={16} height={16} />}
  >
    {t('go_back')}
  </Button>
    <div className="flex justify-center items-center h-screen min-h-[calc(100vh - 68px)]">
      {isLoading && <Loading />}
        <Card
          className="w-[500px] max-w-full p-4"
          shadow='none'
        >
        <CardHeader className="flex justify-center">
        <div>
            <Image
            alt="opencdx logos"
            aria-label="OpenCDX Logo"
            radius="none"
            src="/login-logo.png"
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
              className='label-color'
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
                className='label-color'
                id="password"
                label={t("new_password_placeholder")}
                aria-label={t("new_password_placeholder")}
                defaultValue=""
                isRequired
                variant="bordered"
                type={isVisible ? 'text' : 'password'}
                onValueChange={handlePasswordChange}
                
                endContent={
                  <button
                    aria-label="toggle password visibility"
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
                className='label-color'
                id="confirmPassword"
                label={t('confirm_new_password_placeholder')}
                defaultValue=""
                isRequired
                variant="bordered"
                type={isConfirmVisible ? 'text' : 'password'}
                isInvalid={!confirmPasswordMatched}
                onValueChange={handleConfirmPasswordChange}
                errorMessage={t('password_mismatch')}
                endContent={
                  <button
                    aria-label="toggle password visibility"
                    type="button"
                    onClick={toggleConfirmVisibility}
                  >
                    {isConfirmVisible ? (
                      <img alt="nextui logo" src="/eye.svg" />
                    ) : (
                      <img alt="nextui logo" src="/cross_eye.svg" />
                    )}
                  </button>
                }
              />
                <div className="validation-container" tabIndex={0} aria-label= {"Password criteria is" + t("password_min_characters") + t("password_special_characters") + t("password_number_characters") + t("password_lower_characters") + t("password_upper_characters")}>
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
              onPress={onOpen}
            >
              {t("confirm_password_reset_button")}
            </Button>
          </CardFooter>
        </Card>
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
      <Modal 
        isOpen={isOpen} 
        placement={'center'}
        onOpenChange={onOpenChange} 
        hideCloseButton = {true}
        radius='none'
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Production Note</ModalHeader>
              <ModalBody>
                <p> 
                In a production environment, you would receive an email for this step.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant='bordered' onPress={onClose} aria-label='Cancel' tabIndex={0} size='lg'>
                  Cancel
                </Button>
                <Button
                    color="primary"
                    aria-label='Continue to reset password' 
                    tabIndex={0}
                    size='lg'
                    onPress={() => {
                      onClose();
                      handleSubmit();
                    }}
                  >
                                    Continue
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
    </div>
  );
}

