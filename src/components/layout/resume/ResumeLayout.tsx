import { Box as SiteContent } from '@mui/material';
import { ReactNode } from 'react';

import UnderConstructionBanner from '@/components/layout/UnderConstructionBanner';

import ResumeHeader from './ResumeHeader';

interface ResumeLayoutProps {
  children: ReactNode;
  className?: string;
}

export default function ResumeLayout(props: ResumeLayoutProps) {
  const { children, className = '' } = props;
  const isBuilding = process.env.NEXT_PUBLIC_ISBUILDING === 'true';
  return (
    <div className='relative z-50 flex w-full flex-col items-center p-0 dark:bg-dark-r-50'>
      {isBuilding && <UnderConstructionBanner />}
      <SiteContent
        className={`p-0 ${className} max-w-7xl bg-slate-100/20 shadow dark:bg-dark-700/10 dark:shadow-zinc-600`}
      >
        {/* <MainHeader navLinks={mainNavLinks} otherLinks={mainOtherLinks} /> */}
        <ResumeHeader />
        {children}
      </SiteContent>
    </div>
  );
}
