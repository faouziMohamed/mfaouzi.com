import { Box as SiteContent } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
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

const layoutVariants = {
  hidden: {
    opacity: 0,
    x: 100,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 20,
    },
  },
};
export default function Layout({ children, className = '' }: LayoutProps) {
  const isBuilding = process.env.NEXT_PUBLIC_ISBUILDING === 'true';
  const { theme } = useNextTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  const env = process.env.NODE_ENV;
  // decide http or https based on node environment
  const protocol = env === 'development' ? 'http://' : 'https://';
  const domainUrl = window.location.href.replace(/resume$/, '');
  if (domainUrl.startsWith(`${protocol}resume.`)) {
    window.location.replace('/resume');
  }
  let bg = '';
  if (theme === 'light') {
    bg = 'bg-app';
  }
  return (
    <AnimatePresence>
      <motion.div
        variants={layoutVariants}
        initial='hidden'
        animate='visible'
        exit='hidden'
        key='main-layout'
        className={`z-10 flex w-full flex-col p-0 ${bg}`}
      >
        {isBuilding && <UnderConstructionBanner />}
        <SiteContent className={`p-0 ${className}`}>
          <MainHeader navLinks={mainNavLinks} otherLinks={mainOtherLinks} />
          {children}
          <Footer />
        </SiteContent>
      </motion.div>
    </AnimatePresence>
  );
}
