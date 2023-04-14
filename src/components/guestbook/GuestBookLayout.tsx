import { Box, Box as SiteContent, Container, Stack } from '@mui/material';
import Image from 'next/image';
import { ReactNode } from 'react';

import PageFixedItems from '@/components/buttons/PageFixedItems';
import { mainNavLinks } from '@/components/layout/Headers/headers-data';
import MainHeader from '@/components/layout/Headers/MainHeader';
import UnderConstructionBanner from '@/components/layout/UnderConstructionBanner';

import { ThemeMode, useNextTheme } from '@/styles/themes/theme-color';

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
    <Stack
      sx={{
        position: 'relative',
        zIndex: 10,
        width: '100%',
        p: 0,
      }}
    >
      {isBuilding && <UnderConstructionBanner />}
      <SiteContent position='relative' p={0} id='to-top'>
        <MainHeader navLinks={mainNavLinks} />
        <Box
          className='transition-all'
          sx={{
            position: 'absolute',
            inset: 0,
            top: '2rem',
            zIndex: -10,
            width: '100%',
            '@media (min-width: 1280px)': { right: '-2rem' },
            '@media (min-width: 693px)': { top: '-1.5rem' },
            '@media (min-width: 768px)': { top: '-1.75rem' },
            '@media (min-width: 1024px)': { top: '-2.25rem' },
            '@media (min-width: 1536px)': { top: '-5rem' },
          }}
        >
          <Image
            src={getBlobSrcPath(theme)}
            alt='Guestbook background blob'
            width='100'
            height='10'
            className='w-full object-cover'
            sizes='100vw'
          />
        </Box>
        <PageFixedItems />
        <Container>{children}</Container>
      </SiteContent>
    </Stack>
  );
}
