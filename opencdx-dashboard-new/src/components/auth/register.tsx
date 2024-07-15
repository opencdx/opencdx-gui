'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { Endpoints } from '@/axios/apiEndpoints';
import { Link } from '@nextui-org/link';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Image,
  Input,
} from '@nextui-org/react';

export default function Register() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userName = e.currentTarget.userName.value;
    const password = e.currentTarget.password.value;

    try {
      const response = await Endpoints.signup({ userName, password });
      const data = response.data;

      if (data) {
        router.push('/');
      } else {
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen min-h-[calc(100vh - 68px)]">
      <form
        className="flex justify-center items-center"
        onSubmit={handleSubmit}
      >
        <Card
          aria-label="register form"
          className="w-[450px] max-w-full p-4"
          tabIndex={0}
        >
          <CardHeader className="flex justify-center">
            <Image
              alt="nextui logo"
              height={40}
              radius="sm"
              src="/opencdx.png"
              width={100}
            />
          </CardHeader>

          <CardBody className="grid gap-4">
            <div className="grid gap-2">
              <div className="grid gap-2 md:grid-cols-2">
                <Input
                  isRequired
                  required
                  defaultValue=""
                  id="first_name"
                  label="First Name"
                  type="string"
                />
                <Input
                  isRequired
                  required
                  defaultValue=""
                  id="last_name"
                  label="Last Name"
                  type="string"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <div className="grid gap-2">
                <Input
                  isRequired
                  required
                  defaultValue=""
                  id="userName"
                  label="Email address"
                  type="email"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Input
                isRequired
                defaultValue=""
                id="password"
                label="Password"
                type="password"
              />
            </div>
          </CardBody>
          <CardFooter>
            <Button className="w-full" color="primary" type="submit">
              Sign Up
            </Button>
          </CardFooter>
          <Divider />
          <CardFooter className="flex justify-center">
            <Link
              className="text-center"
              color="foreground"
              onClick={() => router.push('/')}
            >
              Already have an account?
            </Link>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
