import React, { Suspense, lazy } from 'react';
const Login = lazy(() => import('@/components/auth/login'));

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Login />
    </Suspense>
  );
}
