import '@/styles/globals.css';

import { Navbar } from '@/components/navbar';
import SideNav from '@/components/side-nav';
import { siteConfig } from '@/config/site';
import { Divider } from '@nextui-org/react';

import { Providers } from '../providers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers
      themeProps={{ attribute: 'class', defaultTheme: 'light', children }}
    >
      <Navbar />
      <Divider />
      <div className="flex">
        <SideNav />
        <div className="w-full overflow-x-auto">
          <div className="sm:h-[calc(99vh-60px)] overflow-auto ">
            <div className="w-full flex justify-center mx-auto   overflow-auto h-[calc(100vh - 120px)] overflow-y-auto relative">
              <div className="w-full md:max-w-7xl">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </Providers>
  );
}
