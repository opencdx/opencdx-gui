'use client';

import { Key, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import { NavbarContent, NavbarItem, Navbar as NextUINavbar } from '@nextui-org/navbar';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, User } from 'ui-library';
import { Locale } from '@/config/locale';
import { setUserLocale } from '@/lib/locale';
import { logout } from '@/hooks/iam-hooks';

const localeOptions = [
  { key: 'en', label: 'English' },
  { key: 'es', label: 'Spanish' }
] as const;

export function Navbar() {
  const router = useRouter();
  const locale = useLocale();

  const handleLocaleChange = useCallback((key: Locale) => {
    if (key !== locale) {
      setUserLocale(key);
    }
  }, [locale]);

  const handleDropdownAction = useCallback((key: string) => {
    switch (key) {
      case 'logout':
        logout(router);
        break;
      case 'change_password':
        router.push('/password-change');
        break;
      case 'locale':
        const otherLocale = localeOptions.find(option => option.key !== locale)?.key;
        if (otherLocale) {
          handleLocaleChange(otherLocale);
        }
        break;
    }
  }, [router, locale, handleLocaleChange]);

  const dropdownItems = useMemo(() => [
    {
      key: 'locale',
      label: localeOptions.find(option => option.key !== locale)?.label,
      icon: '/language.png'
    },
    { key: 'settings', label: 'Settings', icon: '/settings.png' },
    { key: 'change_password', label: 'Change Password', icon: '/language.png' },
    { key: 'logout', label: 'Logout', icon: '/logout.png' }
  ], [locale]);

  return (
    <NextUINavbar maxWidth="full" className="rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full" position="sticky" aria-label="User actions dropdown">
      <NavbarContent justify="end" aria-label="User actions">
        <NavbarItem className="hidden md:flex" aria-label="User actions Item">
          <Dropdown>
            <DropdownTrigger>
              <Button
                variant="light"
                disableAnimation
                role="link"
                className="w-full p-0"
                endContent={
                  <Image 
                    src="/images/arrow-down.png" 
                    alt="Dropdown arrow" 
                    width={24} 
                    height={24} 
                    priority 
                  />
                }
              >
                <User name="John Doe" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu 
              variant="faded" 
              aria-label="User actions"
              selectionMode="single"
              onAction={(key: Key) => handleDropdownAction(key as string) }
            >
              {dropdownItems.map(({ key, label, icon }) => (
                <DropdownItem
                  key={key}
                  startContent={
                    <Image
                      alt={`${label} icon`}
                      src={icon}
                      width={20}
                      height={20}
                    />
                  }
                >
                  {label}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>
    </NextUINavbar>
  );
}