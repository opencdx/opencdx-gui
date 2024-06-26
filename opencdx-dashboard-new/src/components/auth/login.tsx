'use client';
import React, { useState } from 'react';

import { useRouter } from 'next/navigation';
import { Endpoints } from '@/axios/apiEndpoints';
import { Input } from '@nextui-org/Input';
import { Button } from '@/components/ui/Button';
import { Link } from '@nextui-org/link';
import { Card, CardBody, CardFooter, CardHeader, Divider, Image } from '@nextui-org/react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { EyeIcon, EyeOffIcon } from 'lucide-react'

export default function Login() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userName = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;

    try {
      const response = await Endpoints.login({ userName, password });

      const data = response.data;
      if (data.token) {
        localStorage.setItem('serviceToken', data.token);
        toast.success('Login Success !', {
          position: 'top-center',
          autoClose: 2000,
          onClose: () => {
            router.push('/form-builder');
          },
        });
      } else {
        toast.error(data.message || 'Login failed', {
          position: 'top-center',
          autoClose: 2000,
        });
      }
    } catch (err: any) {
      toast.error(err.message || 'An error occurred', {
        position: 'top-center',
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen min-h-[calc(100vh - 68px)]">
      <form
        onSubmit={handleSubmit}
        className="flex justify-center items-center"
      >
        <Card className="w-[450px] max-w-full p-4">
          <CardHeader className="flex justify-center">
            <div tabIndex={0} aria-label='open'>
              <Image
                alt="opencdx logo s"
                height={40}
                radius="sm"
                aria-label='Login Logo'
                src="/opencdx.png"
                width={100}
              />
            </div>
          </CardHeader>
          <CardBody className="grid gap-4">

            <Input
              id="email"
              label="Email address/ Username"
              type="userName"
              required
              defaultValue=""
            />

            <Input
              id="password"
              label="Password"
              required
              defaultValue=""
              type={isVisible ? "text" : "password"}

              endContent={
                <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                  {isVisible ? (
                    <EyeIcon className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <EyeOffIcon className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
            />

          </CardBody>
          <CardFooter>
            <Button type="submit" className="w-full" color="primary">
              Sign in
            </Button>
          </CardFooter>
          <Divider />
          <CardFooter className="flex justify-center">
            <Link
              color="foreground"
              onClick={() => router.push('/register')}
              className="text-center"
            >
              Don&apos;t have an account?
            </Link>
          </CardFooter>
        </Card>
      </form>
      <ToastContainer />
    </div>
  );
}