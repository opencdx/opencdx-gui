'use client';

import '@/styles/globals.css';

import React, { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { Sidebar, SidebarBody, SidebarLink } from '@/components/side-nav';
import { cn } from '@/lib/utils';
// import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import DynamicFormIcon from '@mui/icons-material/DynamicForm';

import { Providers } from '../providers';
import { Navbar } from '@/components/navbar';

export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <Image
        src="/images/logo-long.png"
        alt="logo"
        width={120}
        height={40}
      />
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <Image
        src="/images/logo-short.png"
        alt="logo"
        width={120}
        height={120}
        className="rounded-lg"
      />
    </Link>
  );
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(true);

  const links = [
    // {
    //   label: 'Dashboard',
    //   href: '/',
    //   icon: (
    //     <SpaceDashboardOutlinedIcon className="text-white h-5 w-5 flex-shrink-0" />
    //   ),
    // },
    {
      label: 'Form Builder',
      href: '/form-builder',
      icon: (
        <DynamicFormIcon className="text-white h-5 w-5 flex-shrink-0" />
      ),
    },
    // {
    //   label: 'Maps',
    //   href: '/maps',
    //   icon: (
    //     <LocateIcon className="text-white h-5 w-5 flex-shrink-0" />
    //   ),
    // },
    // {
    //   label: 'My Profile',
    //   href: '/profile',
    //   icon: (
    //     <LocateIcon className="text-white h-5 w-5 flex-shrink-0" />
    //   ),
    // },
  ];

  return (
    <Providers
      themeProps={{ attribute: 'className', defaultTheme: 'light', children }}
    >
        <div
          className={cn(
            'flex',
            'h-screen w-screen',
            'overflow-hidden',
            'bg-white dark:bg-neutral-900',
            'transition-all duration-300 ease-in-out' // Add transition for smooth animation
          )}
        >
          <Sidebar open={open} setOpen={setOpen}>
            <SidebarBody className="justify-between gap-10">
              <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                {open ? <Logo /> : <LogoIcon />}
                <div className="mt-8 flex flex-col gap-2">
                  {links.map((link, idx) => (
                    <SidebarLink key={idx} link={link} />
                  ))}
                </div>
              </div>

              <div></div>

            </SidebarBody>

          </Sidebar>
          <div className="flex flex-col flex-1">
            <Navbar />
            <div className=" bg-white w-full h-screen overflow-x-auto">
              <div className="h-screen  bg-[#F4F9FF] dark:bg-[#1a1a1a]">
                    {children}
              </div>
            </div>
          </div>
        </div>
    </Providers>
  );
}
