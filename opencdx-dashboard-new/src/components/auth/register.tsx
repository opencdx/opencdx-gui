"use client";
import { Button } from '@/components/ui/Button';
import { Input } from "@nextui-org/input";
import { CardFooter, Divider } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";

import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { Link } from "@nextui-org/link";

export default function Register() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userName = e.currentTarget.userName.value;
    const password = e.currentTarget.password.value;

    try {
      const response = await axios.post(
        "https://ec2-3-13-148-183.us-east-2.compute.amazonaws.com:8080/iam/user/register",
        { userName, password },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers":
              "Content-Type, Authorization, X-Requested-With",
          },
        }
      );
      const data = response.data;
      if (data) {
        router.push("/");
      } else {

    }
    } catch (err: any) {
      setError(err.message || "An error occurred");
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
              <div className="grid gap-2 md:grid-cols-2">
                <Input
                  id="first_name"
                  label="First Name"
                  type="string"
                  required
                />
                <Input
                  id="last_name"
                  label="Last Name"
                  type="string"
                  required
                />
              </div>
            </div>

            <div className="grid gap-2">
              <div className="grid gap-2">
                <Input
                  id="userName"
                  label="Email address/ Username"
                  type="email"
                  required
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Input id="password" label="Password" type="password" required />
            </div>
          </CardBody>
          <CardFooter>
            <Button type="submit" className="w-full" color="primary">
              Sign Up
            </Button>
          </CardFooter>
          <Divider />
          <CardFooter className="flex justify-center">
            <Link
              color="foreground"
              onClick={() => router.push("/")}
              className="text-center"
            >
              Already have an account?
            </Link>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
