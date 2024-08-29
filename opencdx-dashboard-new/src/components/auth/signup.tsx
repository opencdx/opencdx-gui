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
                  className='label-color'
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
                  className='label-color'
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
                  className='label-color'
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
                      <img
                        alt="password visibility image"
                        height={25}
                        src="/eye.svg"
                        width={25}
                      />
                    ) : (
                      <img
                        alt="password invisibility image"
                        height={25}
                        src="/cross_eye.svg"
                        width={25}
                      />
                    )}
                  </button>
                }
              />
              <div className="validation-container" aria-label={"Password Criteria" + t("password_min_characters") + t("password_special_characters") + t("password_number_characters") + t("password_lower_characters") + t("password_upper_characters")} tabIndex={0}>
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
            <label className="text-center text-gray-500" tabIndex={0}>
              {t('already_have_account_placeholder')}
            </label>
            &nbsp;
            <Link
              className="text-center cursor-pointer"
              color="primary"
              onPress={() => router.push('/')}
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
                <Button color="primary" variant='bordered' onPress={onClose} aria-label='Cancel' tabIndex={0}>
                  Cancel
                </Button>
                <Button
                    color="primary"
                    aria-label='Continue to complete signup' 
                    tabIndex={0}
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
