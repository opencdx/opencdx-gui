import '@/styles/globals.css';

import { Metadata, Viewport } from 'next';

import { fontSans } from '@/config/fonts';
import { SiteConfig } from '@/config/site';
import clsx from 'clsx';

import React, { Suspense } from 'react'; // Added import for React and Suspense

import { Providers } from './providers';
import {NextIntlClientProvider} from 'next-intl';
import {getLocale, getMessages} from 'next-intl/server';
export const metadata: Metadata = {
  title: {
    default: SiteConfig.name,
    template: `%s - ${SiteConfig.name}`,
  },
  icons: {
    icon: '/open-logo.png',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();

  // Lazy load the component

  return (
    <html suppressHydrationWarning lang={locale}>
      <head>
        {/* Preload critical assets */}
        <link rel="preload" href="/images/logo-long.png" as="image" />
        <link rel="preload" href="/images/logo-short.png" as="image" />
      </head>
      <title>{'OpenCdx: Dashboard'}</title>
      <body
        className={clsx(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
        )}
      >
        
        <Providers
          themeProps={{ attribute: 'class', defaultTheme: 'light', children }}
        >
          <div className="relative flex flex-col h-screen">
            <main>
              <NextIntlClientProvider messages={messages}>
                <Suspense fallback={<div>Loading...</div>}> {/* Added Suspense for lazy loading */}
                  {children}
                </Suspense>
              </NextIntlClientProvider>
            </main>
          </div>
        </Providers>
        
      </body>
    </html>
  );
}

// Can be imported from a shared config
const locales = ['en', 'es'];
 
export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}
