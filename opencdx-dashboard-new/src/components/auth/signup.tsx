'use client';

import { useState } from 'react';
import '../../styles/password-validation.css';

import { useRouter } from 'next/navigation';
import { useSignUp } from '@/hooks/iam-hooks';
import { toast, ToastContainer } from 'react-toastify';
import { organizationId, workspaceId, systemName, type} from '@/lib/constant';

import { Link } from '@nextui-org/link';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure,
} from '@nextui-org/react';
import { Button, Input ,} from 'ui-library';

import { useLocale, useTranslations } from 'next-intl';

export default function SignUp() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const { mutate: signUp, error } = useSignUp();

  const t = useTranslations('common');
  const locale = useLocale();
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
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
      !username || !password || !firstName || !lastName || !validation.length || !validation.specialChar || !validation.uppercase || !validation.lowercase || !validation.number
    );
  };

  const handlePasswordChange = (newPassword: string) => {
    setPassword(newPassword);
    validatePassword(newPassword);
  };

  const handleUsernameChange = (newUsername: string) => {
    setUsername(newUsername);
    setIsUsernameValid(isValidEmail(newUsername));
  };



  const isValidEmail = (email: string) => {
    return email.length > 0;
    // email validation logic
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit =  async() => {
     await signUp({
      username,
      password,
      firstName,
      lastName,
      systemName,
      organizationId,
      workspaceId,
    });

    if (error) {
      toast.error(error.message || t('error_occurred'), {
        position: 'top-center',
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen min-h-[calc(100vh - 68px)]">
      <form
        className="flex justify-center items-center"
      >
        <Card
          aria-label="register form"
          className="w-[500px] max-w-full p-4"
          tabIndex={0}
          shadow="none"
        >
          <CardHeader className="flex justify-center">
            <Image
              alt="opencdx logos"
              aria-label="OpenCDX Logo"
              radius="none"
              src="/login-logo.png"
              tabIndex={0}
            />
          </CardHeader>

          <CardBody className="grid gap-4">
            <div className="grid gap-2">
              <div className="grid gap-2 md:grid-cols-2">
                <Input
                  required
                  defaultValue=""
                  id="first_name"
                  label={t('first_name_placeholder')}
                  type="string"
                  variant="bordered"
                  isRequired
                  onValueChange={setFirstName}
                />
                <Input
                  required
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
              <div className="grid gap-2">
                <Input
                  required
                  defaultValue=""
                  id="userName"
                  variant="bordered"
                  label={t('email_usename_placeholder')}
                  type="email"
                  isRequired
                  isInvalid={!isUsernameValid && username.length > 0}
                  onValueChange={handleUsernameChange}
                  errorMessage={t('invalid_email')}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Input
                id="password"
                label="Password"
                isRequired
                defaultValue=""
                variant="bordered"
                type={isVisible ? 'text' : 'password'}
                errorMessage={t('invalid_password')}
                onValueChange={handlePasswordChange}
                endContent={
                  <button
                    aria-label="toggle password visibility"
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <Image
                        alt="nextui logo"
                        height={25}
                        src="/eye.svg"
                        width={25}
                      />
                    ) : (
                      <Image
                        alt="nextui logo"
                        height={25}
                        src="/cross_eye.svg"
                        width={25}
                      />
                    )}
                  </button>
                }
              />
            </div>
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
              className="text-center"
              color="primary"
              onPress={() => router.push('/')}
            >
              {t('login_up_label')}
            </Link>
          </CardFooter>
        </Card>
        <ToastContainer />
      </form>
      <Modal 
        isOpen={isOpen} 
        placement={'center'}
        onOpenChange={onOpenChange} 
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
                <Button color="primary" variant='bordered' onPress={onClose}>
                  Cancel
                </Button>
                <Button
                    color="primary"
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

const ValidationRow = ({ isValid, label }: { isValid: boolean, label: string }) => (
  <div className="validation-row">
    {isValid ? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="blue"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="validation-icon"
      >
        <path d="M20 6L9 17l-5-5" />
      </svg>
    ) : (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#D1D5DB"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="validation-icon"
      >
        <path d="M18 6L6 18M6 6l12 12" />
      </svg>
    )}
    <p className='text-gray-400 text-small' style={{ fontSize: '0.80rem' }}>{label}</p>
  </div>
);
