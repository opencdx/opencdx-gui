import React from 'react';
import Image from 'next/image';

import dash from '../../public/images/dash.png';
import dashSelected from '../../public/images/dash_selected.png';
import formBuilder from '../../public/images/form_builder.png';
import formBuilderSelected from '../../public/images/form_builder_selected.png';
import map from '../../public/images/map.png';
import mapSelected from '../../public/images/map-selected.png';

export const links = [
  {
    label: 'Dashboard',
    href: '/pages/dashboard',
    icon: (
      <Image src={dash.src} alt="" width={20} height={20} priority/>
    ),
    selectedIcon: (
      <Image src={dashSelected.src} alt="" width={20} height={20} priority/>
    ),
  },
  {
    label: 'Forms Builder',
    href: '/pages/form-builder',
    icon: (
      <Image src={formBuilder.src} alt="" width={20} height={20} priority/>
    ),
    selectedIcon: (
      <Image src={formBuilderSelected.src} alt="" width={20} height={20} priority/>
    ),
  },
  {
    label: 'Maps',
    href: '/pages/maps',
    icon: (
      <Image src={map.src} alt="" width={20} height={20} priority/>
    ),
    selectedIcon: (
      <Image src={mapSelected.src} alt="" width={20} height={20} priority/>
    ),
  },
 
];