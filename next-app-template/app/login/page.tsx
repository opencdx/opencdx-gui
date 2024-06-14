
"use client";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";

import Link from "next/link";


export default function LoginPage() {
  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    const response = await fetch("http://localhost:4001/iam/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      router.push("/dashboard");
    } else {
      // Handle errors
    }
  }
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md p-4 space-y-4">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="
                Enter your email"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter your password"
            />
          </div>
         
          <button
            type="submit"
            className="w-full bg-primary text-white rounded-md p-2"
          >
            Sign in
          </button>
        </form>
        <div className="text-center">
          <span className="text-sm">Don't have an account?</span>
          <Link href="/signup" className="text-primary text-sm">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
