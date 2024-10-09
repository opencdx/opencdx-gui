import * as React from 'react';
import { Suspense } from 'react';
import Login from './auth/login';

export default function Screen() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Login />
    </Suspense>
  );
}

// ... existing code ...

