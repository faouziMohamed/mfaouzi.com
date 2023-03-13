import { Box as SiteContent, Container } from '@mui/material';
import Image from 'next/image';
import { ReactNode } from 'react';

import { GUESTBOOK_PAGE } from '@/lib/client-route.contant';

import PageFixedItems from '@/components/buttons/PageFixedItems';
import { mainNavLinks } from '@/components/layout/Headers/headers-data';
import MainHeader from '@/components/layout/Headers/MainHeader';
import UnderConstructionBanner from '@/components/layout/UnderConstructionBanner';
import Seo from '@/components/Seo';

import { ThemeMode, useNextTheme } from '@/styles/themes/theme-color';

// const mainNavLinks: INavLink[] = [
//   {
//     name: 'Home',
//     href: HOME_PAGE,
//   },
//   {
//     name: 'Sign',
//     href: `${GUESTBOOK_PAGE}#sign`,
//   },
// ];

const blobVariants = {
  desktopLight: '/icons/guestbook-top-deskblob-light.svg',
  desktopDark: '/icons/guestbook-top-deskblob-dark.svg',
};

function getBlobSrcPath(color: ThemeMode) {
  return color === 'light'
    ? blobVariants.desktopLight
    : blobVariants.desktopDark;
}

type GuestbookLayoutProps = {
  children?: ReactNode;
};
export default function GuestBookLayout({ children }: GuestbookLayoutProps) {
  const isBuilding = process.env.NEXT_PUBLIC_ISBUILDING === 'true';
  const { theme } = useNextTheme();
  return (
    <div className='relative z-10 flex w-full flex-col p-0'>
      {isBuilding && <UnderConstructionBanner />}
      <SiteContent className='relative p-0' id='to-top'>
        <Seo
          templateTitle='The Guestbook 📝'
          title='📝 The Guestbook | Faouzi Mohamed'
          pathname={GUESTBOOK_PAGE}
          description={
            'The guestbook is a comment system that allows users to comment on a ' +
            'post and reply to other comments.\n ' +
            'Mark your presence in my portfolio by Giving a review, ' +
            'showing your appreciation, react to others comments...'
          }
        />
        <MainHeader navLinks={mainNavLinks} />
        <div className='xl:-top-22 absolute inset-0 top-8 -z-10 w-full transition-all msm:-top-6 md:-top-7 lg:-top-9 xl:-right-8 2xl:-top-[5rem] '>
          <Image
            src={getBlobSrcPath(theme)}
            alt='Guestbook background blob'
            width='100'
            height='10'
            className='w-full object-cover'
            sizes='100vw'
          />
        </div>
        <PageFixedItems />
        <Container>{children}</Container>
      </SiteContent>
    </div>
  );
}
