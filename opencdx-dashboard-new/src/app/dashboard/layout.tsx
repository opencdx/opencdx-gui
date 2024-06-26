


import "@/styles/globals.css";



import { Metadata, Viewport } from "next";



// import SideNav from '@/components/side-nav';
import { siteConfig } from "@/config/site";


import { Providers } from '../providers';
import TreeView  from "@/components/tree-view";
import { Navbar } from "@/components/navbar";
import { Divider } from "@nextui-org/react";


export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/open-logo.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
  
        <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
          <Navbar/>
          <Divider/>
        <div className="flex">
          {/* <SideNav /> */}
          <TreeView/>
          <div className="w-full overflow-x-auto">
            <div className="sm:h-[calc(99vh-60px)] overflow-auto ">
              <div className="w-full flex justify-center mx-auto   overflow-auto h-[calc(100vh - 120px)] overflow-y-auto relative">
                <div className="w-full md:max-w-6xl">{children}</div>
              </div>
            </div>
          </div>
        </div>
        </Providers>
     
  );
}