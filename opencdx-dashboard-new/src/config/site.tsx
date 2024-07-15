'use client';

import { usePathname } from 'next/navigation';

import { FileText } from 'lucide-react';

export const NavItems = () => {
  const pathname = usePathname();

  function isNavItemActive(pathname: string, nav: string) {
    return pathname.includes(nav);
  }

  return [
    // {
    //   name: 'Dashboard',
    //   href: '/dashboard',
    //   icon: <User size={20} />,
    //   active: isNavItemActive(pathname, '/dashboard'),
    //   position: 'top',
    // },
    {
      name: 'Form Builder',
      href: '/form-builder',
      icon: <FileText size={20} />,
      active: isNavItemActive(pathname, '/form-builder'),
      position: 'top',
    },
    // {
    //   name: 'Email Template',
    //   href: '/email-template',
    //   icon: <Briefcase size={20} />,
    //   active: isNavItemActive(pathname, '/email-template'),
    //   position: 'top',
    // },
    // {
    //   name: 'Audit Records',
    //   href: '/audit-records',
    //   icon: <Settings size={20} />,
    //   active: isNavItemActive(pathname, '/audit-records'),
    //   position: 'top',
    // },
    // {
    //   name: 'Maps',
    //   href: '/maps',
    //   icon: <Settings size={20} />,
    //   active: isNavItemActive(pathname, '/maps'),
    //   position: 'top',
    // },
    // {
    //   name: 'View Profile',
    //   href: '/view-profile',
    //   icon: <Settings size={20} />,
    //   active: isNavItemActive(pathname, '/view-profile'),
    //   position: 'top',
    // },
    // {
    //   name: 'Edit Profile',
    //   href: '/edit-profile',
    //   icon: <Settings size={20} />,
    //   active: isNavItemActive(pathname, '/edit-profile'),
    //   position: 'top',
    // },
  ];
};
