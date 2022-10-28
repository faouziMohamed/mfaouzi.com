import { Box as SiteContent } from '@mui/material';
import { ReactNode, useEffect, useState } from 'react';

import {
  mainNavLinks,
  mainOtherLinks,
} from '@/components/Headers/headers-data';
import MainHeader from '@/components/Headers/MainHeader';
import Footer from '@/components/layout/Footer';
import UnderConstructionBanner from '@/components/layout/UnderConstructionBanner';

import { useNextTheme } from '@/themes/themeContext';

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
    <div className={`z-10 flex w-full flex-col p-0 ${bg}`}>
      {isBuilding && <UnderConstructionBanner />}
      <SiteContent className={`p-0 ${className}`}>
        <MainHeader navLinks={mainNavLinks} otherLinks={mainOtherLinks} />
        {children}
        <Footer />
      </SiteContent>
    </div>
  );
}
