import '@/styles/globals.css';


import { SideNavigation } from '@/components/side-nav';
import { Navbar } from '@/components/navbar';

import React from 'react'; // Removed import for useState


export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {

  return (

    <div className="flex h-screen w-screen  bg-neutral-900 transition-all duration-300 ease-in-out">
      <SideNavigation />
      <div className="flex flex-col flex-1 overflow-x-auto">
        <Navbar />
        <div className="bg-white w-full h-screen  ">
          <div className="h-auto  bg-[#F4F9FF] dark:bg-[#1a1a1a] flex flex-1 overflow-auto">
            {children}
          </div>
        </div>
      </div>
    </div>

  );
}
