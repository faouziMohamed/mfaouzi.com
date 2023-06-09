import { Box, ClickAwayListener, IconButton, Stack } from '@mui/material';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { IconType } from 'react-icons';
import {
  MdClose,
  MdExpandLess,
  MdExpandMore,
  MdMenu,
  MdNightlightRound,
  MdWbSunny,
} from 'react-icons/md';

import { SITE_URL } from '@/lib/client-route.contant';
import { useMounted, useSMallScreen } from '@/lib/hooks';

import {
  resumeNavLinks,
  resumeOtherLinks,
} from '@/components/layout/Headers/headers-data';
import SiteLogo from '@/components/layout/Headers/SiteLogo';
import UnStyledLink from '@/components/links/UnStyledLink';

import { useNextTheme } from '@/styles/themes/theme-color';

export default function ResumeHeader() {
  const { theme: themeName } = useNextTheme();
  const mounted = useMounted();
  if (!mounted) return null;

  return (
    <Box
      component='nav'
      className='text-dark relative flex w-full flex-col px-4 '
    >
      <Stack
        className={`flex w-full flex-row items-center justify-between gap-1.5 
        sm:absolute sm:inset-0 sm:top-6 sm:bg-blue-200 sm:text-white`}
      >
        <NavigationMenu />
      </Stack>
      <Box className='xl:-top-22 absolute inset-0 -top-1 -z-10 w-full sm:-top-12 md:-top-16 lg:-top-[7rem] 2xl:-top-[8rem]'>
        <Image
          src={`/icons/header-blob-${themeName}.svg`}
          alt='ResumeHeader background blob'
          priority
          width='100'
          height='31'
          className='-sm:top-6 relative w-full  object-cover'
        />
      </Box>
    </Box>
  );
}

function NavigationMenu() {
  const [menuOpened, setMenuOpened] = useState<boolean>(false);
  const isSM = useSMallScreen(); // sm
  const position = isSM ? 'relative' : 'absolute';
  return (
    <Box
      className={`${position} inset-0 z-30 h-fit w-full select-none  bg-transparent p-0 text-white 
      sm:flex sm:w-fit sm:grow sm:flex-row-reverse sm:justify-start`}
    >
      <Box
        component='div'
        className='flex w-full items-center justify-between px-2 py-1 sm:w-fit sm:justify-end'
      >
        <MenuToggleButtons
          setMenuOpened={setMenuOpened}
          menuOpened={menuOpened}
        />
        {!isSM && (
          <UnStyledLink href={SITE_URL}>
            <SiteLogo />
          </UnStyledLink>
        )}
        <ThemeToggleButton />
      </Box>
      {/* Navigation menu */}
      <NavigationLinks menuOpened={menuOpened} setMenuOpened={setMenuOpened} />
    </Box>
  );
}

function ThemeToggleButton() {
  const { theme: themeName, updateTheme } = useNextTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <IconButton
      size='small'
      onClick={updateTheme}
      aria-label={`Toggle ${themeName} theme`}
      className='text-gray-50 dark:text-yellow-400 sm:text-cyan-800'
    >
      {themeName === 'dark' ? (
        <MdWbSunny fontSize='1.9rem' tabIndex={0} />
      ) : (
        <MdNightlightRound fontSize='1.9rem' tabIndex={0} />
      )}
    </IconButton>
  );
}

function MenuToggleButtons(props: {
  setMenuOpened: (value: boolean) => void;
  menuOpened: boolean;
}) {
  const { setMenuOpened, menuOpened } = props;
  const handleToggleMenu = () => setMenuOpened(!menuOpened);
  return (
    <IconButton
      size='medium'
      className='text-white sm:hidden'
      onClick={handleToggleMenu}
      aria-label={menuOpened ? 'Close menu' : 'Open menu'}
      aria-expanded={menuOpened}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter') handleToggleMenu();
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
  );
}

function NavigationLinks(props: {
  menuOpened: boolean;
  setMenuOpened: (prev: boolean) => void;
}) {
  const { menuOpened, setMenuOpened } = props;
  const [subMenuOpened, setSubMenuOpened] = useState<boolean>(false);
  const handleClick = () => setSubMenuOpened((prev) => !prev);
  const handleClickAway = () => setSubMenuOpened(false);

  let display = 'hidden'; // with mobile first approach we hide the menu until opened
  const isSm = useSMallScreen(); // sm
  // if opened and not small screen
  if (menuOpened && !isSm) {
    display = 'flex';
  }

  return (
    <Box
      className={`${display} flex flex-col items-start bg-gray-800 sm:flex sm:flex-row
       sm:bg-transparent  `}
    >
      {resumeNavLinks.map(({ name, href, Icon }) => {
        const MyIcon = Icon as IconType;
        return (
          <Box className='m-0 w-full' key={name}>
            <UnStyledLink
              href={href}
              tabIndex={0}
              className={`flex w-full items-center justify-start gap-1 border-b border-slate-300 p-2 
                px-2 py-4 font-primary text-[1rem] font-[700] hover:bg-gray-900 hover:text-gray-100 
                focus:bg-gray-900 sm:rounded-2xl sm:border-none sm:text-gray-700 sm:hover:bg-primary-700
                 sm:hover:bg-opacity-5 sm:hover:text-gray-900 sm:focus:bg-opacity-5 dark:sm:text-gray-100 dark:sm:hover:bg-gray-900 dark:sm:focus:bg-gray-900`}
            >
              <MyIcon />
              <span>{name}</span>
            </UnStyledLink>
          </Box>
        );
      })}

      {!!resumeOtherLinks.length && (
        <ClickAwayListener
          mouseEvent='onMouseDown'
          touchEvent='onTouchStart'
          onClickAway={handleClickAway}
        >
          <Stack
            className={`relative flex w-full cursor-pointer items-start gap-0
            border-slate-300 text-gray-100 hover:border-b hover:bg-gray-900 hover:text-gray-100 
            focus:bg-gray-900 focus:text-gray-100 sm:rounded-2xl sm:border-none sm:text-gray-700 
            sm:hover:bg-primary-700 sm:hover:bg-opacity-5 sm:hover:text-gray-900 sm:focus:bg-opacity-5 sm:focus:text-gray-900 dark:sm:text-gray-100 dark:sm:hover:bg-gray-900 dark:sm:focus:bg-gray-900`}
            spacing={0}
            tabIndex={0}
            onKeyUp={(e) => {
              if (e.key === 'Escape') {
                setMenuOpened(false);
                setSubMenuOpened(false);
              }
            }}
            onClick={handleClick}
            onKeyDown={(e) => {
              // when enter is pressed, open the menu
              if (e.key === 'Enter') handleClick();
            }}
          >
            <Box
              className={`flex items-center justify-center gap-1 
              px-2 py-4 font-primary text-[1rem] font-[700]`}
            >
              <p>Others</p>
              {subMenuOpened ? (
                <MdExpandLess className='font-[700]' />
              ) : (
                <MdExpandMore className='font-[700]' />
              )}
            </Box>
            {subMenuOpened && (
              <Box
                className={`absolute top-[calc(100%+1px)] z-10 m-0 flex w-full flex-col gap-1.5
              border-b border-b-gray-400 bg-gray-700 p-0 text-gray-100 sm:border-none sm:bg-transparent 
              sm:text-gray-800 sm:hover:bg-primary-700 sm:hover:bg-opacity-5 sm:hover:text-gray-900`}
              >
                {resumeOtherLinks.map(({ name, href, Icon }) => {
                  const MyIcon = Icon as IconType;
                  return (
                    <UnStyledLink
                      key={name}
                      href={href}
                      className={`flex items-center gap-2 p-2 font-primary text-[.88rem] font-[700] hover:bg-gray-800
                      sm:rounded-2xl sm:hover:bg-primary-700 sm:hover:bg-opacity-5 sm:hover:text-gray-900 dark:sm:text-gray-100 dark:sm:hover:bg-gray-900 `}
                    >
                      <MyIcon />
                      <span>{name}</span>
                    </UnStyledLink>
                  );
                })}
              </Box>
            )}
          </Stack>
        </ClickAwayListener>
      )}
    </Box>
  );
}
