import { Box as SiteContent } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode } from 'react';

import UnderConstructionBanner from '@/components/layout/UnderConstructionBanner';

import ResumeHeader from './ResumeHeader';

interface ResumeLayoutProps {
  children: ReactNode;
  className?: string;
}

const layoutVariants = {
  hidden: {
    opacity: 0,
    x: -100,
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
export default function ResumeLayout(props: ResumeLayoutProps) {
  const { children, className = '' } = props;
  const isBuilding = process.env.NEXT_PUBLIC_ISBUILDING === 'true';
  return (
    <AnimatePresence>
      <motion.div
        variants={layoutVariants}
        initial='hidden'
        animate='visible'
        exit='hidden'
        key='resume-layout'
        className='relative z-50 flex w-full flex-col p-0 dark:bg-dark-primary'
      >
        {isBuilding && <UnderConstructionBanner />}
        <SiteContent className={`p-0 ${className}`}>
          {/* <MainHeader navLinks={resumeNavLinks} otherLinks={resumeOtherLinks} /> */}
          <ResumeHeader />
          {children}
        </SiteContent>
      </motion.div>
    </AnimatePresence>
  );
}
