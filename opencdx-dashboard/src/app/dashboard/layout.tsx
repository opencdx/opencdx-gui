'use client';

import '@/styles/globals.css';
import React, { useState } from 'react';
import { Sidebar, SidebarBody, SidebarLink } from '@/components/side-nav';
import { Navbar } from '@/components/navbar';
import { links } from '@/config/sidebar-links';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-neutral-900 transition-all duration-300 ease-in-out">
      <Sidebar open={open} setOpen={setOpen}>
            <SidebarBody className="justify-between gap-10">
              <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                <div className=" flex flex-col gap-4">
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
  );
}
