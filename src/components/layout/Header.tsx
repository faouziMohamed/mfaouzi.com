import {
  Box,
  ClickAwayListener,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';
import { GoMarkGithub } from 'react-icons/go';
import {
  MdExpandLess,
  MdExpandMore,
  MdMenu,
  MdNightlightRound,
} from 'react-icons/md';

import UnstyledLink from '@/components/links/UnstyledLink';

import HeaderLineBlob from '~/icons/header-line-blob.svg';

const navLinks = [
  {
    name: 'Home',
    href: '/',
  },
  {
    name: 'About',
    href: '/about',
  },
  {
    name: 'Projects',
    href: '/projects',
  },
  {
    name: 'Contacts',
    href: '/contacts',
  },
];
const otherLinks = [
  {
    name: 'Github',
    href: 'https://github.com/faouziMohamed',
    Icon: <GoMarkGithub />,
  },
];
export default function Header() {
  const [open, setOpen] = useState<boolean>(false);
  const handleClick = () => setOpen((prev) => !prev);
  const handleClickAway = () => setOpen(false);
  return (
    <nav className='relative flex w-full flex-col'>
      <Stack direction='row' className='items-center justify-between px-2 '>
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

        {/* Right buttons */}
        <Stack className='flex w-fit flex-row items-center justify-center gap-1.5'>
          <Box className='hidden select-none items-center justify-center px-1 sm:flex'>
            {navLinks.map((link) => (
              <UnstyledLink
                key={link.name}
                href={link.href}
                tabIndex={0}
                className='p-2 font-primary text-[1rem] font-[700] hover:bg-primary-100 '
              >
                {link.name}
              </UnstyledLink>
            ))}
            <ClickAwayListener
              mouseEvent='onMouseDown'
              touchEvent='onTouchStart'
              onClickAway={handleClickAway}
            >
              <Stack className='relative gap-0 ' spacing={0}>
                <Box
                  tabIndex={0}
                  onClick={handleClick}
                  onKeyDown={(e) => {
                    // when enter is pressed, open the menu
                    if (e.key === 'Enter') handleClick();
                  }}
                  className='flex cursor-pointer items-center justify-center gap-2 p-2 font-primary text-[1rem] font-[700] hover:bg-primary-100 focus:bg-primary-100 '
                >
                  <p>Others</p>
                  {open ? (
                    <MdExpandLess className='font-[700]' />
                  ) : (
                    <MdExpandMore className='font-[700]' />
                  )}
                </Box>
                {open && (
                  <Box className='absolute top-[calc(100%+1px)] z-10 m-0 flex w-full flex-col gap-1.5 border bg-primary-100 p-0'>
                    {otherLinks.map((link) => (
                      <UnstyledLink
                        key={link.name}
                        href={link.href}
                        className=' p-2 font-primary text-[.88rem] font-[700] hover:bg-primary-200'
                      >
                        {link.name}
                      </UnstyledLink>
                    ))}
                  </Box>
                )}
              </Stack>
            </ClickAwayListener>
          </Box>
          <Box className='flex w-full items-center justify-center '>
            <IconButton size='small' className='text-[#001344]'>
              <MdNightlightRound fontSize='1.5rem' />
            </IconButton>
            <IconButton size='medium' className='text-[#001344] sm:hidden '>
              <MdMenu fontSize='1.6rem' className='sm:text-sm' />
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
