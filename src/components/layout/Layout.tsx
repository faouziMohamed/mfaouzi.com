import { Box, Box as SiteContent } from '@mui/material';
import Image from 'next/image';
import { ReactNode, useEffect, useState } from 'react';

import {
  mainNavLinks,
  mainOtherLinks,
} from '@/components/Headers/headers-data';
import MainHeader from '@/components/Headers/MainHeader';
import Footer from '@/components/layout/Footer';
import UnderConstructionBanner from '@/components/layout/UnderConstructionBanner';

import { useNextTheme } from '@/themes/themeContext';

import ToTopButton from '../buttons/ToTopButton';

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

export default function Layout({ children, className = '' }: LayoutProps) {
  const isBuilding = process.env.NEXT_PUBLIC_ISBUILDING === 'true';
  const { theme } = useNextTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  let bg = '';
  if (theme === 'light') {
    bg = 'bg-app';
  }
  return (
    <div className={`relative z-10 flex w-full flex-col p-0 ${bg}`}>
      {isBuilding && <UnderConstructionBanner />}
      <SiteContent className={`p-0 ${className}`} id='to-top'>
        <MainHeader navLinks={mainNavLinks} otherLinks={mainOtherLinks} />
        <Box className='xl:-top-22 absolute inset-0 -top-1 -z-10 w-full sm:-top-12 md:-top-16 lg:-top-[7rem] 2xl:-top-[8rem]'>
          <Image
            src={`/icons/header-blob-${theme}.svg`}
            alt='MainHeader background blob'
            priority
            width='100'
            height='31'
            className='-sm:top-6 relative w-full  object-cover'
            sizes='100vw'
          />
        </Box>
        <ToTopButton />
        {children}
        <Footer />
      </SiteContent>
    </div>
  );
}
