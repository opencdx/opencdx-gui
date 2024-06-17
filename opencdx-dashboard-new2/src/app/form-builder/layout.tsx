import '@/styles/globals.css';

import { Metadata, Viewport } from 'next';

import { siteConfig } from '@/config/site';

import Header from '@/components/form-builder/header';
import { Providers } from '../providers';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers themeProps={{ attribute: 'class', defaultTheme: 'light' }}>
      <Header />
      <div className="flex">
        <div className="w-full ">
          <div className="sm:h-[calc(99vh-60px)]  ">
            <div className="w-full flex justify-center mx-auto   h-[calc(100vh - 120px)]  relative">
              <div className="w-full md:max-w-8xl">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </Providers>
  );
}
