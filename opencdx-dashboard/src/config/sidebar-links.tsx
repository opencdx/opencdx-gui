import React from 'react';
import Image from 'next/image';

export const links = [
  {
    label: 'Dashboard',
    href: '/pages/dashboard',
    icon: (
      <Image src="/images/dash.png" alt="" width={20} height={20} priority/>
    ),
    selectedIcon: (
      <Image src="/images/dash_selected.png" alt="" width={20} height={20} priority/>
    ),
  },
  {
    label: 'Forms Builder',
    href: '/pages/form-builder',
    icon: (
      <Image src="/images/form_builder.png" alt="" width={20} height={20} priority/>
    ),
    selectedIcon: (
      <Image src="/images/form_builder_selected.png" alt="" width={20} height={20} priority/>
    ),
  },
  {
    label: 'Maps',
    href: '/pages/maps',
    icon: (
      <Image src="/images/map.png" alt="" width={20} height={20} priority/>
    ),
    selectedIcon: (
      <Image src="/images/map_selected.png" alt="" width={20} height={20} priority/>
    ),
  },
 
];