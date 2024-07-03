'use client';

import React, { useState } from 'react';

import { useRouter } from 'next/navigation';

import { Link } from '@nextui-org/link';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Image,
} from '@nextui-org/react';
import { toast, ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { Endpoints } from '@/axios/apiEndpoints';
import { Button } from 'hello-world-gui/src/components/ui/Button';
import { Input } from 'hello-world-gui/src/components/ui/Input';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

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
        router.push('/dashboard');
      } else {
        toast.error(data.message || 'Login failed', {
          position: 'top-right',
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
        className="flex justify-center items-center"
        onSubmit={handleSubmit}
      >
        <Card
          aria-label="login form"
          className="w-[450px] max-w-full p-4"
          tabIndex={0}
        >
          <CardHeader className="flex justify-center">
            <div aria-label="open">
              <Image
                alt="opencdx logo s"
                aria-label="Login Logo"
                height={40}
                radius="sm"
                src="/opencdx.png"
                tabIndex={0}
                width={100}
              />
            </div>
          </CardHeader>
          <CardBody className="grid gap-4">
            <Input
              required
              defaultValue=""
              id="email"
              label="Email address/ Username"
              type="userName"
              isRequired
            />

            <Input
              id="password"
              label="Password"
              defaultValue=""
              isRequired
              type={isVisible ? 'text' : 'password'}
              endContent={
                <button
                  aria-label="toggle password visibility"
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
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
            <Button className="w-full" color="primary" type="submit">
              Sign in
            </Button>
          </CardFooter>
          <Divider />
          <CardFooter className="flex justify-center">
            <Link
              className="text-center"
              color="foreground"
              onClick={() => router.push('/register')}
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
