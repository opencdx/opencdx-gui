import '@/styles/globals.css';

import { Metadata, Viewport } from 'next';

import { fontSans } from '@/config/fonts';
import clsx from 'clsx';


import { Providers } from './providers';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
export const metadata: Metadata = {
  title: {
    default: 'Dashboard',
    template: `%s - Dashboard`,
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
  return (
    <html suppressHydrationWarning lang={locale}>
      <head />
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
                {children}
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
  return locales.map((locale) => ({ locale }));
}

