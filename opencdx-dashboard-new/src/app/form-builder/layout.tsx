'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sidebar, SidebarBody, SidebarLink } from '@/components/side-nav';
import { Providers } from '../providers';
import { Navbar } from '@/components/navbar';
import { Inter } from 'next/font/google';

// Load the Inter font
const inter = Inter({ subsets: ['latin'] });

// Preload critical images
const preloadImages = [
  { src: '/images/logo-long.png', type: 'image/png' },
  { src: '/images/logo-short.png', type: 'image/png' },
];

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
        priority
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
        priority
      />
    </Link>
  );
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(true);

  const links = [
    {
      label: 'Dashboard',
      href: '/dashboard',
      icon: (
        <Image src="/images/space_dashboard.png" alt="dashboard" width={20} height={20} />
      ),
    },
    {
      label: 'Forms Builder',
      href: '/form-builder',
      icon: (
        <Image src="/images/dynamic_form_left.png" alt="form-builder" width={20} height={20} />
      ),
    },
    {
      label: 'Maps',
      href: '/maps',
      icon: (
        <Image src="/images/map.png" alt="map" width={20} height={20} />
      ),
    },
    {
      label: 'My Profile',
      href: '/profile',
      icon: (
        <Image src="/images/person.png" alt="profile" width={20} height={20} />
      ),
    },
  ];

  return (
    <>
      {preloadImages.map((image) => (
        <link
          key={image.src}
          rel="preload"
          as="image"
          href={image.src}
          type={image.type}
        />
      ))}
      <Providers
        themeProps={{ attribute: 'className', defaultTheme: 'dark', children }}
      >
        <div className={`flex h-screen w-screen overflow-hidden bg-neutral-900 transition-all duration-300 ease-in-out ${inter.className}`}>
          <Sidebar open={open} setOpen={setOpen}>
            <SidebarBody className="justify-between gap-10">
              <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                {open ? <Logo /> : <LogoIcon />}
                <div className="mt-8 flex flex-col gap-4">
                  {links.map((link, idx) => (
                    <SidebarLink 
                      key={idx} 
                      link={link} 
                      
                    />
                  ))}
                </div>
              </div>
            </SidebarBody>
          </Sidebar>
          <div className="flex flex-col flex-1">
            <Navbar />
            <div className="bg-white w-full h-screen overflow-x-auto">
              <div className="h-auto  bg-[#F4F9FF] dark:bg-[#1a1a1a]">
                    {children}
              </div>
            </div>
          </div>
        </div>
      </Providers>
    </>
  );
}
