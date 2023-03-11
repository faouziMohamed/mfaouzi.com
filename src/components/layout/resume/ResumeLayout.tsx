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
    <div className='relative z-50 flex w-full flex-col p-0 dark:bg-dark-primary'>
      {isBuilding && <UnderConstructionBanner />}
      <SiteContent className={`p-0 ${className}`}>
        {/* <MainHeader navLinks={resumeNavLinks} otherLinks={resumeOtherLinks} /> */}
        <ResumeHeader />
        {children}
      </SiteContent>
    </div>
  );
}
