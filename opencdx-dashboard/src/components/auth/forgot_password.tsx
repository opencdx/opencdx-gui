'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';


import { Card, CardBody, CardFooter, CardHeader, Image } from 'ui-library';
import { toast, ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { Button, Input } from 'ui-library';
import {useTranslations} from 'next-intl';
// import { cookies } from 'next/headers';


export default function ForgotPassword() {
  const router = useRouter();
  const t = useTranslations('common');
  const [username, setUsername] = useState('');
  const isDisabled = () => {
    // validate the username as email address
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !username || !emailRegex.test(username);
  };
 
  const handleSubmit = async () => {
    localStorage.setItem('username', username);
    router.push('/reset-password');
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
     
    <div
        className="flex justify-center items-center"
        role='form'
        aria-label= {t("forgot_password_title") + t("forgot_password_description")}
        tabIndex={0}
      >
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
                {t("forgot_password_title")}
            </label>
            <label className="text-start text-gray-500 text-sm">
                {t("forgot_password_description")}
            </label>
            <Input
              className='label-color'
              defaultValue=""
              variant="bordered"
              id="email"
              label={t('email_usename_placeholder')}
              type="userName"
              isRequired
              onValueChange={setUsername}
            />
          </CardBody>
          <CardFooter>
            <Button className="w-full"
              color={isDisabled() ? 'default' : 'primary'}
              type="submit"
              disabled={isDisabled()}
              onClick={handleSubmit}
            >
              {t("continue")}
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
      </div>
    </div>
    </div>
  );
}