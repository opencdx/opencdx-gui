import NextLink from 'next/link';

// project imports
import { DASHBOARD_PATH } from 'config';
import Image from 'next/image';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => (
  <NextLink href={DASHBOARD_PATH} aria-label="theme logo">
   
    <Image
      src="/opencdx.png"
      width={100}
      height={30}
      alt="OpenCDX"
    />
  </NextLink>
);

export default LogoSection;
