import React from 'react';
import Image from 'next/image';

export const links = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: (
      <Image src="/images/dashboard.png" alt="" width={20} height={20} priority/>
    ),
    selectedIcon: (
      <Image src="/images/dash_selected.png" alt="" width={20} height={20} priority/>
    ),
  },
  {
    label: 'Forms Builder',
    href: '/form-builder',
    icon: (
      <Image src="/images/form_builder.png" alt="" width={20} height={20} priority/>
    ),
    selectedIcon: (
      <Image src="/images/form_builder_selected.png" alt="" width={20} height={20} priority/>
    ),
  },
  {
    label: 'Maps',
    href: '/maps',
    icon: (
      <Image src="/images/map.png" alt="" width={20} height={20} priority/>
    ),
    selectedIcon: (
      <Image src="/images/map_selected.png" alt="" width={20} height={20} priority/>
    ),
  },
  {
    label: 'My Profile',
    href: '/profile',
    icon: (
      <Image src="/images/person.png" alt="" width={20} height={20} priority/>
    ),
    selectedIcon: (
      <Image src="/images/person_selected.png" alt="" width={20} height={20} priority/>
    ),
  },
];