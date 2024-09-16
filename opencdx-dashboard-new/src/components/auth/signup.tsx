'use client';

import { useState } from 'react';
import ValidationRow from '@/components/custom/validationRow';
import '../../styles/password-validation.css';
import { useRouter } from 'next/navigation';
import { useSignUp } from '@/hooks/iam-hooks';
import { toast, ToastContainer } from 'react-toastify';
import { type} from '@/lib/constant';
import { Link } from 'ui-library';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure,
} from 'ui-library';
import { Button, Input ,} from 'ui-library';
import { AxiosError } from 'axios';
import { useLocale, useTranslations } from 'next-intl';
import Loading from '@/components/custom/loading';
export default function SignUp() {
  const handleSuccess = (data: any) => {
    setIsLoading(false); 
    console.log('Login successful:', data);
};

const handleError = (error: AxiosError) => {
    setIsLoading(false); 
    const errorData = error.response?.data as { cause: { localizedMessage: string } };
    toast.error(errorData.cause.localizedMessage || t('error_occurred'));
};
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const { mutate: signUp, error } = useSignUp(handleSuccess, handleError);
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslations('common');
  const locale = useLocale();
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordMatched, setConfirmPasswordMatched] = useState(true);
  const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible);
  const toggleVisibility = () => setIsVisible(!isVisible);
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
  // check the value of all fields in the form, if all fields are filled, the button will be enabled
  const isDisabled = () => {
    return (
      !username || !isUsernameValid || !password || !firstName || !lastName || !validation.length || !validation.specialChar || !validation.uppercase || !validation.lowercase || !validation.number ||!confirmPasswordMatched || !confirmPassword
    );
  };

  const handlePasswordChange = (newPassword: string) => {
    setPassword(newPassword);
    validatePassword(newPassword);
    if (confirmPassword) {
      setConfirmPasswordMatched(newPassword === confirmPassword);
    } else {
      setConfirmPasswordMatched(true);
    }
  };

  const handleConfirmPasswordChange = (newPassword: string) => {
    setConfirmPassword(newPassword);
    setConfirmPasswordMatched(newPassword === password);
  };

  const handleUsernameChange = (newUsername: string) => {
    setUsername(newUsername);
    setIsUsernameValid(isValidEmail(newUsername));
  };

  const isValidEmail = (email: string) => {

    // email validation logic
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit =  async() => {
    setIsLoading(true); // Set loading to true before making the API call
     signUp({
      type,
      username,
      password,
      firstName,
      lastName,
    });
  };

  return (
    <div className="flex justify-center items-center h-screen min-h-[calc(100vh - 68px)]">
      {isLoading && <Loading />}
      <form
        className="flex justify-center items-center"
        aria-label="register form"
      >
        <Card
          className="w-[500px] max-w-full p-4"
          shadow="none"
        >
          <CardHeader className="flex justify-center">
            <Image
              alt="opencdx logos"
              aria-label="OpenCDX Logo"
              radius="none"
              src="/login-logo.png"
            />
          </CardHeader>

          <CardBody className="grid gap-4">
            <div className="grid gap-2">
              <div className="grid gap-2 md:grid-cols-2">
                <Input
                  className='label-color'
                  defaultValue=""
                  id="first_name"
                  label={t('first_name_placeholder')}
                  type="string"
                  variant="bordered"
                  isRequired
                  onValueChange={setFirstName}
                />
                <Input
                  className='label-color'
                  defaultValue=""
                  id="last_name"
                  variant="bordered"
                  label={t('last_name_placeholder')}
                  type="string"
                  isRequired
                  onValueChange={setLastName}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <div className="grid gap-1">
                <Input
                  className='label-color'
                  defaultValue=""
                  id="userName"
                  variant="bordered"
                  label={t('email_usename_placeholder')}
                  type="email"
                  isRequired
                  isInvalid={!isUsernameValid && username.length > 0}
                  onValueChange={handleUsernameChange}
                  // errorMessage={t('invalid_email')}
                />
              </div>
            </div>
            <div className="grid gap-4">
              <Input
                className='label-color'
                id="password"
                label="Password"
                isRequired
                defaultValue=""
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
                      <Image alt="nextui logo" src="/eye.svg" />
                    ) : (
                      <Image alt="nextui logo" src="/cross_eye.svg" />
                    )}
                  </button>
                }
              />
                <Input
                className='label-color'
                id="confirmPassword"
                label={t('confirm_password_placeholder')}
                defaultValue=""
                isRequired
                variant="bordered"
                type={isConfirmVisible ? 'text' : 'password'}
                isInvalid={!confirmPasswordMatched}
                onValueChange={handleConfirmPasswordChange}
                endContent={
                  <button
                    aria-label="toggle password visibility"
                    type="button"
                    onClick={toggleConfirmVisibility}
                  >
                    {isConfirmVisible ? (
                      <Image alt="nextui logo" src="/eye.svg" />
                    ) : (
                      <Image alt="nextui logo" src="/cross_eye.svg" />
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
            <Button
              className="w-full"
              color={isDisabled() ? 'default' : 'primary'}
              onPress={onOpen}
              isDisabled={isDisabled()}
            >
              {t('sign_up_label')}
            </Button>
          </CardFooter>
          <CardFooter className="flex justify-center">
            <label className="text-center text-gray-500">
              {t('already_have_account_placeholder')}
            </label>
            &nbsp;
            <Link
              className="text-center cursor-pointer"
              color="primary"
              onPress={() => router.push('/')}
              aria-label= {t('already_have_account_placeholder') + t('login_up_label')} 
            >
              {t('login_up_label')}
            </Link>
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
      </form>
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
                    aria-label='Continue to complete signup' 
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
  );
}
