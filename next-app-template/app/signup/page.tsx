"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';

export default function SignUpPage() {
    const [user, setUser] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });

    return (
        <div className="flex items-center justify-center h-screen">
        <div className="w-full max-w-md p-4 space-y-4">
            <form className="space-y-4">
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
            <div className="space-y-2">
                <label htmlFor="confirm-password" className="text-sm font-medium">
                Confirm Password
                </label>
                <input
                id="confirm-password"
                type="password"
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder="Confirm your password"
                />
            </div>
            <button
                type="submit"
                className="w-full bg-primary text-white rounded-md p-2"
            >
                Sign up
            </button>
            </form>
            <div className="text-center">
            <span className="text-sm">Already have an account?</span>
            <Link href="/login" className="text-primary text-sm">
                Sign in
            </Link>
            </div>
        </div>
        </div>
    );
}
