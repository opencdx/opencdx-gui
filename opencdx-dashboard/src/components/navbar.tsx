'use client';

import { Key, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import { Locale } from '@/config/locale';
import { setUserLocale } from '@/lib/locale';
import { logout } from '@/hooks/iam-hooks';

import arrowDown from '../../public/images/arrow-down.png';
import settings from '../../public/settings.png';
import logoutImage from '../../public/logout.png';
import language from '../../public/language.png';

const localeOptions = [
  { key: 'en', label: 'English' },
  { key: 'es', label: 'Spanish' }
] as const;

export function Navbar() {
  const router = useRouter();
  const locale = useLocale();

  const handleAction = useCallback((key: string) => {
    switch (key) {
      case 'logout':
        logout(router);
        break;
      case 'change_password':
        router.push('/auth/password-change');
        break;
      case 'locale':
        const otherLocale = localeOptions.find(option => option.key !== locale)?.key;
        if (otherLocale) {
          setUserLocale(otherLocale);
        }
        break;
    }
  }, [router, locale]);

  return (
    <nav className="flex justify-end items-center px-6 py-3 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-700">
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium">John Doe</span>
        <div className="relative group">
          <button
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="User menu"
          >
            <Image 
              src={arrowDown.src}
              alt="" 
              width={16} 
              height={16} 
              priority 
            />
          </button>
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
            <button
              onClick={() => handleAction('locale')}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
            >
              <Image src={language} alt="" width={20} height={20} />
              <span className="text-sm">{localeOptions.find(option => option.key !== locale)?.label}</span>
            </button>
            <button
              onClick={() => handleAction('change_password')}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
            >
              <Image src={settings} alt="" width={20} height={20} />
              <span className="text-sm">Change Password</span>
            </button>
            <button
              onClick={() => handleAction('logout')}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left rounded-b-lg"
            >
              <Image src={logoutImage} alt="" width={20} height={20} />
              <span className="text-sm">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
