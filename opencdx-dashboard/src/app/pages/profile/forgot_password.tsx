'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';


import { Card, CardBody, CardFooter, CardHeader, Image, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from 'ui-library';
import { toast, ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { Button, Input } from 'ui-library';
import {useTranslations} from 'next-intl';
// import { cookies } from 'next/headers';


export default function ForgotPassword() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const router = useRouter();
  const t = useTranslations('common');
  const [username, setUsername] = useState('');
  const isDisabled = () => {
    // validate the username as email address
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !username || !emailRegex.test(username);
  };
 
  const handleSubmit = async () => {
    //router.back();
    localStorage.setItem('username', username);
    //router.push('/auth/reset-password');
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div>
   
    <div className="flex justify-center ">
     
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
              onClick={() => {
                onOpen();
                handleSubmit();
              }}
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
               You will receive an email with a link to reset your password.
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
                     router.back();
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