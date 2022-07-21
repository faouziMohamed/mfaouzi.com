import {
  Box,
  ClickAwayListener,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';
import { GoMarkGithub } from 'react-icons/go';
import {
  MdClose,
  MdExpandLess,
  MdExpandMore,
  MdMenu,
  MdNightlightRound,
  MdWbSunny,
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
  const isSmallScreen = useMediaQuery('(min-width: 640px)'); // sm

  return (
    <nav className='relative flex w-full flex-col'>
      <Stack className='flex w-full flex-row items-center justify-between gap-1.5'>
        {isSmallScreen && (
          <UnstyledLink href='/'>
            <SiteLogo />
          </UnstyledLink>
        )}
        <NavigationMenu />
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
function NavigationMenu() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const handleToggleTheme = () => setIsDarkMode((prev) => !prev);
  const [menuOpened, setMenuOpened] = useState<boolean>(false);
  const handleToogleMenu = () => setMenuOpened((prev) => !prev);
  const isSmallScreen = useMediaQuery('(min-width: 640px)'); // sm
  return (
    <Box className='absolute inset-0 z-30 h-fit w-full select-none bg-primary-50 p-0 sm:relative sm:flex sm:w-fit sm:grow sm:flex-row-reverse sm:justify-start sm:bg-transparent'>
      <Box
        component='div'
        className='flex w-full items-center justify-between bg-primary-200 py-1 px-2 sm:w-fit sm:justify-end sm:bg-transparent'
      >
        <IconButton
          size='medium'
          className='text-[#001344] sm:hidden'
          onClick={handleToogleMenu}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleToogleMenu();
          }}
          onKeyUp={(e) => {
            if (e.key === 'Escape') setMenuOpened(false);
          }}
        >
          {menuOpened ? (
            <MdClose fontSize='2rem' className='sm:text-sm' />
          ) : (
            <MdMenu fontSize='2rem' className='sm:text-sm' />
          )}
        </IconButton>
        {!isSmallScreen && (
          <UnstyledLink href='/'>
            <SiteLogo />
          </UnstyledLink>
        )}
        <IconButton size='small' onClick={handleToggleTheme}>
          {isDarkMode ? (
            <MdWbSunny fontSize='1.9rem' className='text-white' tabIndex={0} />
          ) : (
            <MdNightlightRound
              className='text-[#001344]'
              fontSize='1.9rem'
              tabIndex={0}
            />
          )}
        </IconButton>
      </Box>
      {/* Navigation menu */}
      <NavigationLinks
        isSmallScreen={isSmallScreen}
        isMenuOpened={menuOpened}
        setMenuOpened={setMenuOpened}
      />
    </Box>
  );
}

function NavigationLinks({
  isSmallScreen,
  isMenuOpened,
  setMenuOpened,
}: {
  isSmallScreen: boolean;
  isMenuOpened: boolean;
  setMenuOpened: (prev: boolean) => void;
}) {
  const [subMenuOpened, setSubMenuopened] = useState<boolean>(false);
  const handleClick = () => setSubMenuopened((prev) => !prev);
  const handleClickAway = () => setSubMenuopened(false);

  return (
    <Box
      className={`flex-col items-start sm:flex-row ${
        (!isSmallScreen && (isMenuOpened ? 'flex' : 'hidden')) || 'flex'
      }`}
    >
      {navLinks.map((link) => (
        <Box className='m-0 w-full' key={link.name}>
          <UnstyledLink
            href={link.href}
            tabIndex={0}
            className='block w-full border-b border-slate-300 p-2 py-4 px-4 font-primary text-[1rem] font-[700] hover:bg-primary-100 focus:bg-primary-100 sm:border-none'
          >
            {link.name}
          </UnstyledLink>
        </Box>
      ))}

      <ClickAwayListener
        mouseEvent='onMouseDown'
        touchEvent='onTouchStart'
        onClickAway={handleClickAway}
      >
        <Stack
          className={`relative flex w-full cursor-pointer items-start 
            gap-0 border-b border-slate-300 hover:bg-primary-100 focus:bg-primary-100 sm:border-none `}
          spacing={0}
          tabIndex={0}
          onKeyUp={(e) => {
            if (e.key === 'Escape') {
              setMenuOpened(false);
              setSubMenuopened(false);
            }
          }}
          onClick={handleClick}
          onKeyDown={(e) => {
            // when enter is pressed, open the menu
            if (e.key === 'Enter') handleClick();
          }}
        >
          <Box
            className={`flex items-center justify-center gap-2 
              px-4 py-4 font-primary text-[1rem] font-[700] `}
          >
            <p>Others</p>
            {subMenuOpened ? (
              <MdExpandLess className='font-[700]' />
            ) : (
              <MdExpandMore className='font-[700]' />
            )}
          </Box>
          {subMenuOpened && (
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
  );
}

function SiteLogo() {
  return (
    <Box className=' text-#000000 relative flex w-fit flex-col gap-1 pl-2'>
      <Typography
        variant='h1'
        className='font-primary text-[1.17rem] font-bold'
      >
        Faouzi Mohamed
      </Typography>
      <Box className='absolute inset-0 top-[90%] z-10 pl-2'>
        <HeaderLineBlob className='absolute h-4 w-full object-cover' />
      </Box>
    </Box>
  );
}
