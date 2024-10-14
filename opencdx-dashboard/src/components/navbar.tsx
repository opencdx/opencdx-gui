'use client';

import { useState } from 'react';

import { useRouter, usePathname } from 'next/navigation';
import { User } from "ui-library";
import { useLocale } from 'next-intl';
import {useTransition} from 'react';
import { useEffect } from 'react';
import {
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Navbar as NextUINavbar,
} from '@nextui-org/navbar';

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from 'ui-library';

import { Locale} from '@/config/locale';
import Image from 'next/image';

import {setUserLocale} from '@/lib/locale';
import { logout, handleSessionOut } from '@/hooks/iam-hooks';
export const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const [selectedOption] = useState(new Set(['english']));
  const [isOpen, setIsOpen] = useState(false);
  const localeOptions = [
    { key: 'en', label: 'English' },
    { key: 'es', label: 'Spanish' }
  ];

  const descriptionsMap: LabelsMapType = {
    english: 'English',
    spanish: 'Spanish',
  };

  // Define a type for the labelsMap object
  type LabelsMapType = {
    [key: string]: string;
  };
  // Define the labelsMap object with the correct type
  const labelsMap: LabelsMapType = {
    english: 'En',
    spanish: 'Es',
  };
  const [isPending, startTransition] = useTransition();
  function handleLocaleChange(key: string) {
    // If the locale is the same as the current locale, return.
    if (key === locale) return;
    const locales = key as Locale;
    startTransition(() => {
      setUserLocale(locales);
    });
  }
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    handleSessionOut(router);
  }, []);
  // Convert the Set to an Array and get the first value.
  const selectedOptionValue = Array.from(selectedOption)[0];

  return (
    <NextUINavbar maxWidth="full" className=" rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full" position="sticky" aria-label='Navbar'>
      <NavbarContent
        justify="end"
        aria-label='User Dropdown'
      >
        <NavbarItem className="hidden md:flex" aria-label='User'>
            <Dropdown>
              <DropdownTrigger>
                <Button
                  variant="light"
                  onClick={handleClick}
                  disableAnimation
                  role='link'
                  className="w-full p-0"
                  endContent={
                    isOpen ? (
                      <Image src="/images/arrow-down.png" alt="Arrow Down" width={24} height={24} priority />
                    ) : (
                      <Image src="/images/arrow-down.png" alt="Arrow Up" width={24} height={24} priority />
                    )
                  }
                >
                  <User
                    name="John Doe"
                  />
                </Button>
              </DropdownTrigger>
              <DropdownMenu 
              variant="faded" 
              aria-label="Dropdown menu with icons"
              selectionMode="single"
                onAction={(key) => {
                  if (key === 'logout') {
                    logout(router);
                  } else if (key === 'settings') {
                  } else if (key === 'locale') {
                    localeOptions.map((language) => {
                      if (language.key !== locale) {
                        handleLocaleChange(language.key)

                      }
                    }
                    )
                  } else if (key === 'change_password') {
                    router.push('/password-change');
                  }
                }
              }
              >
                <DropdownItem
                  key="locale"
                  tabIndex={0}
                  startContent={<Image
                    alt="locale logo"
                    src="/language.png"
                  />}
                >
                  {
                    localeOptions.map((language) => {
                      if (language.key !== locale) {
                        return language.label
                      }
                    })
                  }
                </DropdownItem>
                <DropdownItem
                  key="settings"
                  tabIndex={0}
                  startContent={<Image
                    alt="settings logo"
                    src="/settings.png"
                  />
                  
                  }
                >
                  Settings
                </DropdownItem>
                <DropdownItem
                  key="change_password"
                  tabIndex={0}
                  startContent={<Image
                    alt="change logo"
                    src="/language.png"
                  />
                  }
                >
                  Change Password
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  tabIndex={0}
                  startContent={<Image
                    alt="logout logo"
                    src="/logout.png"
                  />}
                >
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
        </NavbarItem>
      </NavbarContent>
    </NextUINavbar>
  );
};

