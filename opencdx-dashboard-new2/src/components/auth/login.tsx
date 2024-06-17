'use client';

import { useRouter } from 'next/navigation';



import { Endpoints } from '@/axios/apiEndpoints';
import { Input } from '@/components/ui/Input';
import { Button } from '@nextui-org/button';
import { Link } from '@nextui-org/link';
import { Card, CardBody, CardFooter, CardHeader, Divider, Image } from '@nextui-org/react';
import { toast, ToastContainer } from 'react-toastify';






import 'react-toastify/dist/ReactToastify.css';





export default function Login() {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userName = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;

    try {
      const response = await Endpoints.login({ userName, password });

      const data = response.data;
      if (data.token) {
        localStorage.setItem('serviceToken', data.token);
        toast.success('Success Notification !', {
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
              <div className="grid gap-2">
                <Input
                  id="email"
                  label="Email address/ Username"
                  type="userName"
                  required
                  defaultValue="admin@opencdx.org"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Input
                id="password"
                label="Password"
                type="password"
                required
                defaultValue="password"
              />
            </div>
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
              Don't have an account?
            </Link>
          </CardFooter>
        </Card>
      </form>
      <ToastContainer />
    </div>
  );
}