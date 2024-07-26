'use client';

import { useState } from 'react';

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
  const [isPasswordStrong, setIsPasswordStrong] = useState(false);
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  // check the value of all fields in the form, if all fields are filled, the button will be enabled
  const isDisabled = () => {
    return (
      !username || !password || !firstName || !lastName || !isPasswordStrong
    );
  };

  const handlePasswordChange = (newPassword: string) => {
    setPassword(newPassword);
    setIsPasswordStrong(isStrongPassword(newPassword));
  };

  const handleUsernameChange = (newUsername: string) => {
    setUsername(newUsername);
    setIsUsernameValid(isValidEmail(newUsername));
  };

  const isStrongPassword = (password: string) => {
    return true;
    // password strength validation logic
    // checking if the password is at least 8 characters long and contains at least one uppercase letter, one lowercase letter, and one number
    return (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /\d/.test(password)
    );
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
                isInvalid={!isPasswordStrong && password.length > 0}
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
                        src="/eye.png"
                        width={25}
                      />
                    ) : (
                      <Image
                        alt="nextui logo"
                        height={25}
                        src="/cross_eye.png"
                        width={25}
                      />
                    )}
                  </button>
                }
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
