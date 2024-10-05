'use client';

import React from 'react';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6 justify-between">
      <Image alt="nextui logo" height={40} src="/opencdx.png" width={100} priority />
    </header>
  );
}
