"use client";
import { cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";
import React, { useState, createContext, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { TableChart, NotificationImportant, Announcement, ContentPasteGo, VerifiedUser, AssuredWorkload, PermMedia, ToggleOff } from '@mui/icons-material';
interface Links {
  label: string;
  href: string;
  icon: React.JSX.Element | React.ReactNode;
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

export const SidebarBody = (props: React.ComponentProps<typeof motion.div>) => {
  return (
    <>
      <DesktopSidebar {...props} />
    </>
  );
};

export const DesktopSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof motion.div>) => {
  const { open, setOpen, animate } = useSidebar();

  return (
    <>

      <motion.div
        className={cn(
          "h-full px-4 py-4   md:flex md:flex-col h-screen bg-[#020B2D] bg-gradient-to-b from-[#020B2D] from-70% via-[#0A2A88] to-[#0D47E9] w-[260px] flex-shrink-0",
        )}
        animate={{
          width: animate ? (open ? "220px" : "72px") : "220px",
        }}

        {...props}
      >
        {children}
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
  const router = usePathname();
  const selected = router.includes(link.href);
  return (
    <Link
      href={link.href}
      className={cn(
        "flex items-center justify-start gap-2  group/sidebar py-2 rounded-lg",
        'py-2 ',
        className
      )}
      {...props}
    >

      <div className={cn(
       selected ? 'bg-gradient-to-r from-blue-800 to-blue-500  px-4 py-2 hover:from-blue-800 hover:to-blue-500 rounded-lg ' : 'py-2 ',
        'flex items-center justify-center pl-2',
      )}>
        <div className="flex items-center justify-center pl-2">
          {link.icon}
          <div className="text-white dark:text-neutral-200 text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block pl-2">
            {link.label}
          </div>
        </div>
      </div>



    </Link>
  );
};

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

export const SideNavigation = () => {
  const [open, setOpen] = useState(true);

  const links = [
    {
      label: 'Dashboard',
      href: '/pages/dashboard',
      icon: (
        <Image src="/images/space_dashboard.png" alt="dashboard" width={20} height={20} />
      ),
    },
    {
      label: 'Forms Builder',
      href: '/pages/form-builder',
      icon: (
        <Image src="/images/dynamic_form_left.png" alt="form-builder" width={20} height={20} />
      ),
    },
    {
      label: 'Maps',
      href: '/pages/maps',
      icon: (
        <Image src="/images/map.png" alt="map" width={20} height={20} />
      ),
    },
    {
      label: 'My Profile',
      href: '/pages/profile',
      icon: (
        <Image src="/images/person.png" alt="profile" width={20} height={20} />
      ),
    },
    {
      label: 'Functional Flow',
      href: '/pages/flow',
      icon: (
        <TableChart className="text-white" />
      ),
    },
    {
      label: 'Templates',
      href: '/pages/templates',
      icon: (
        <ContentPasteGo className="text-white" />
      ),
    },
    {
      label: 'Communication',
      href: '/pages/communication',
      icon: (
        <Announcement className="text-white" />
      ),
    },
    {
      label: 'Notifications',
      href: '/pages/notifications',
      icon: (
        <NotificationImportant className="text-white" />
      ),
    },
    {
      label: 'Audit',
      href: '/pages/audit',
      icon: (
        <VerifiedUser className="text-white" />
      ),
    },
    {
      label: 'Logistics',
      href: '/pages/logistics',
      icon: (
        <AssuredWorkload className="text-white" />
      ),
    },
    {
      label: 'Media',
      href: '/pages/media',
      icon: (
        <PermMedia className="text-white" />
      ),
    },
    {
      label: 'Toggle',
      href: '/pages/toggle',
      icon: (
        <ToggleOff className="text-white" />
      ),
    }
  ];

  return (
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
  );
};
