"use client";
import { cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";
import React, { useState, createContext, useContext } from "react";
import { motion } from "framer-motion";
import { usePathname } from 'next/navigation';
import Image from 'next/image';

import collapseIcon from '../../public/images/collapse_icon.png';
import expandIcon from '../../public/images/expand_icon.png';
import logoLong from '../../public/images/logo-long.png';
import logoShort from '../../public/images/logo-short.png';

interface Links {
  label: string;
  href: string;
  icon: React.JSX.Element | React.ReactNode;
  selectedIcon: React.JSX.Element | React.ReactNode;
  onClick?: () => void;
}

interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined
);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  const [openState, setOpenState] = useState(false);

  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate: animate }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const Sidebar = ({
  children,
  open,
  setOpen,
  animate,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      {children}
    </SidebarProvider>
  );
};

export const SidebarBody = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof motion.div> & { children?: React.ReactNode }) => {
  const { open, setOpen, animate } = useSidebar();

  return (
    <>
      <motion.div
        className={cn(
          "h-full px-4 py-4 md:flex md:flex-col h-screen bg-[#020B2D] bg-gradient-to-b from-[#020B2D] from-70% via-[#0A2A88] to-[#0D47E9] w-[260px] flex-shrink-0",
          className
        )}
        animate={{
          width: animate ? (open ? "220px" : "72px") : "220px",
        }}
        {...props}
      >
        <div className="flex flex-col h-full">
          <div className="mb-8 flex justify-between items-center">
            {open ? (
              <Link href="#" className="flex items-center">
                <Image
                  src={logoLong.src}
                  alt="OpenCDx"
                  width={120}
                  height={40}
                  priority
                />
              </Link>
            ) : (
              <Link href="#" className="flex items-center">
                <Image
                  src={logoShort.src}
                  alt="OpenCDx"
                  width={40}
                  height={40}
                  className="rounded-lg"
                  priority
                />
              </Link>
            )}
            
            <button 
              onClick={() => setOpen(!open)} 
              className={cn(
                "flex items-center justify-center mt-8 -mr-6 z-50",
               
              )}
            >
              <Image
                src={open ? collapseIcon.src : expandIcon.src}
                alt={open ? "Collapse" : "Expand"}
                width={26}
                height={26}
                priority
              />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            {children}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export const SidebarLink = ({
  link,
  className,
  ...props
}: {
  link: Links;
  className?: string;
  props?: LinkProps;

}) => {
  const { open, setOpen, animate } = useSidebar();
  let pathname = usePathname();
  if (pathname.includes('pages/edit-questionnaire')) {
    pathname = '/pages/form-builder';
  }
  const selected = pathname === link.href;
  return (
    <Link
      href={link.href}
      className={cn(
        "flex items-center justify-start group/sidebar rounded-lg",
        className
      )}
      {...props}
    >
      <div className={cn(
        selected ? 'bg-gradient-to-r from-blue-800 to-blue-500 hover:from-blue-800 hover:to-blue-500 rounded-lg' : '',
        open ? 'px-6' : 'px-2',
        'flex items-start justify-start py-2',
      )}>
        <div className="flex items-start justify-start">
          {selected ? link.selectedIcon : link.icon}
          {open && (
            <div className="text-white dark:text-neutral-200 text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block pl-2">
              {link.label}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};
