'use client';

import React, { useState } from 'react';






import { Card, CardBody, CardFooter, CardHeader, Image } from '@nextui-org/react';
import { toast, ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { usePasswordChange } from '@/hooks/iam-hooks';

import { Button, Input } from 'ui-library';
import {useTranslations} from 'next-intl';
// import { cookies } from 'next/headers';


export default function PasswordChange() {
  const { mutate: changePassword, error } = usePasswordChange();
  const t = useTranslations('common');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirmation, setConfirmPassword] = useState('');
  const isDisabled = () => {
    return !oldPassword || !newPassword || !newPasswordConfirmation;
  };
 const handleOldPasswordChange = (newOldPassword: string) => {
    setOldPassword(newOldPassword);
  }
  const handlePasswordChange = (newPassword: string) => {
    setNewPassword(newPassword);
  };
  const handleConfirmPasswordChange = (newConfirmPassword: string) => {
    setConfirmPassword(newConfirmPassword);
  };
  const handleSubmit = async () => {
    const id = localStorage.getItem('id');
    if (id) {
      await changePassword({ id, oldPassword, newPassword, newPasswordConfirmation });
    }
    if(error) {
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
        onSubmit={handleSubmit}
      >
        <Card
          aria-label="login form"
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
            <Input
              required
              defaultValue=""
              variant="bordered"
              id="old_password"
              label={t('old_password_placeholder')}
              type="oldPassword"
              isRequired
              onValueChange={handleOldPasswordChange}
            />

            <Input
              id="newPassword"
              label={t('new_password_placeholder')}
              defaultValue=""
              isRequired
              variant="bordered"
              type={ "text" }
              onValueChange={handlePasswordChange}
              errorMessage={t('invalid_password')}
            />
            <Input
              id="confirmPassword"
              label={t('confirm_password_placeholder')}
              defaultValue=""
              isRequired
              variant="bordered"
              type={ "text" }
              onValueChange={handleConfirmPasswordChange}
              errorMessage={t('invalid_password')}
            />
          </CardBody>
          <CardFooter>
            <Button className="w-full"
              color={isDisabled() ? 'default' : 'primary'}
              type="submit"
              disabled={isDisabled()}
            >
              {t('password_reset_placeholder')}
            </Button>
          </CardFooter>
        </Card>
      </form>
      <ToastContainer />
    </div>
  );
}