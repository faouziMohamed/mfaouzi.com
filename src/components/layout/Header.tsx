import { Box, IconButton, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import { MdMenu, MdNightlightRound } from 'react-icons/md';

import UnstyledLink from '@/components/links/UnstyledLink';

import HeaderLineBlob from '~/icons/header-line-blob.svg';

export default function Header() {
  return (
    <nav className='relative flex w-full flex-col'>
      <Stack direction='row' className='items-center justify-between p-2 py-0 '>
        <UnstyledLink
          href='/'
          className='text-#000000 relative flex w-fit flex-col gap-1'
        >
          <Typography
            variant='h1'
            className='font-primary text-[1.17rem] font-bold'
          >
            Faouzi Mohamed
          </Typography>
          <Box className='absolute inset-0 top-[90%]'>
            <HeaderLineBlob className='absolute h-4 w-full object-cover' />
          </Box>
        </UnstyledLink>

        <Stack className='w-fit '>
          <Box className='flex w-full items-center justify-center '>
            <IconButton size='small' className='text-[#001344]'>
              <MdNightlightRound fontSize='1.5rem' />
            </IconButton>
            <IconButton size='medium' className='text-[#001344]'>
              <MdMenu fontSize='1.6rem' />
            </IconButton>
          </Box>
        </Stack>
      </Stack>
      <Box className='absolute inset-0 -top-1 -z-10 w-full'>
        <Image
          src='/icons/header-blob.svg'
          alt='Header background blob'
          priority
          width='100'
          height='31'
          className='w-full object-cover'
          layout='responsive'
        />
      </Box>
    </nav>
  );
}
