'use client';

import '@/styles/globals.css';
import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sidebar, SidebarBody, SidebarLink } from '@/components/side-nav';
import { Providers } from '../../providers';
import { Navbar } from '@/components/navbar';

const Logo = () => (
  <Link href="#" className="flex items-center py-1 z-20">
    <Image src="/images/logo-long.png" alt="logo" width={120} height={40} />
  </Link>
);

const LogoIcon = () => (
  <Link href="#" className="flex items-center py-1 z-20">
    <Image src="/images/logo-short.png" alt="logo" width={120} height={120} className="rounded-lg" />
  </Link>
);

const links = [
  { label: 'Dashboard', href: '/dashboard', icon: '/images/space_dashboard.png' },
  { label: 'Forms Builder', href: '/form-builder', icon: '/images/dynamic_form_left.png' },
  { label: 'Maps', href: '/maps', icon: '/images/map.png' },
  { label: 'My Profile', href: '/profile', icon: '/images/person.png' },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(true);

  const sidebarLinks = useMemo(() => links.map((link, idx) => (
    <SidebarLink
      key={idx}
      link={{
        ...link,
        icon: <Image src={link.icon} alt={link.label} width={20} height={20} />
      }}
    />
  )), []);

  return (
    <Providers
      themeProps={{ attribute: 'className', defaultTheme: 'dark', children }}
    >
      <div className="flex h-screen w-screen overflow-hidden bg-neutral-900 transition-all duration-300 ease-in-out">
        <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody className="justify-between gap-10">
            <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
              {open ? <Logo /> : <LogoIcon />}
              <div className="mt-8 flex flex-col gap-4">
                {sidebarLinks}
              </div>
            </div>
          </SidebarBody>
        </Sidebar>
        <div className="flex flex-col flex-1">
          <Navbar />
          <main className="bg-white w-full h-screen overflow-x-auto">
            <div className="h-auto bg-[#F4F9FF] dark:bg-[#1a1a1a]">
              {children}
            </div>
          </main>
        </div>
      </div>
    </Providers>
  );
}
