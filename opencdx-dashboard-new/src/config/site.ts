export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Dashboard",
  description: "A dashboard for OpenCDX",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    
   
    {
      label: "Dashboard",
      href: "/dashboard",
    },
  ],
  navMenuItems: [
  
    {
      label: "Dashboard",
      href: "/dashboard",
    },
   
    {
      label: "login",
      href: "/",
    },
    {
      label: "Register",
      href: "/register",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
 
};
