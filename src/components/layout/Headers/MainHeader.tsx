import {
  Box,
  ClickAwayListener,
  IconButton,
  Stack,
  useMediaQuery,
} from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { MdClose, MdExpandLess, MdExpandMore, MdMenu } from 'react-icons/md';

import type { INavLink } from '@/components/layout/Headers/headers-data';
import SiteLogo from '@/components/layout/Headers/SiteLogo';
import UnStyledLink from '@/components/links/UnStyledLink';
import ToggleThemeButton from '@/components/ToggleThemeButton';

interface IHeaderNavLinks {
  navLinks: INavLink[];
  otherLinks?: INavLink[];
}

export default function MainHeader({
  navLinks,
  otherLinks = [],
}: IHeaderNavLinks) {
  const [mounted, setMounted] = useState(false);
  const isMediumSmallScreen = useMediaQuery('(min-width: 693px)'); // sm
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <Box
      component='nav'
      className='text-dark relative z-20 flex w-full flex-col px-4'
    >
      <Stack
        component='header'
        className='flex w-full flex-row items-center justify-between gap-1.5'
      >
        {isMediumSmallScreen && (
          <UnStyledLink href='/' aria-label='Link to Home'>
            <SiteLogo />
          </UnStyledLink>
        )}
        <NavigationMenu navLinks={navLinks} otherLinks={otherLinks} />
      </Stack>
    </Box>
  );
}

function NavigationMenu(props: IHeaderNavLinks) {
  const { navLinks, otherLinks } = props;
  const [menuOpened, setMenuOpened] = useState<boolean>(false);
  const isMediumSmallScreen = useMediaQuery('(min-width: 693px)'); // sm
  return (
    <Box
      className='absolute inset-0 z-30 h-fit w-full select-none bg-primary-300
      bg-opacity-50 p-0 transition-all dark:bg-dark-400  dark:bg-opacity-70 msm:relative
      msm:flex msm:w-fit msm:grow msm:flex-row-reverse msm:justify-start
      msm:bg-transparent msm:dark:bg-transparent'
    >
      <Box
        component='div'
        className='flex w-full items-center justify-between bg-cyan-200 px-2 py-1
        dark:bg-dark-400 msm:w-fit msm:justify-end msm:bg-transparent msm:dark:bg-transparent '
      >
        <ToggleMenuButton
          setMenuOpened={setMenuOpened}
          menuOpened={menuOpened}
        />
        {!isMediumSmallScreen && (
          <UnStyledLink href='/' aria-label='Link to Home'>
            <SiteLogo />
          </UnStyledLink>
        )}
        <ToggleThemeButton />
      </Box>
      {/* Navigation menu */}
      <NavigationLinks
        isMediumSmallScreen={isMediumSmallScreen}
        isMenuOpened={menuOpened}
        setMenuOpened={setMenuOpened}
        navLinks={navLinks}
        otherLinks={otherLinks}
      />
    </Box>
  );
}

function ToggleMenuButton(props: {
  setMenuOpened: (opened: boolean) => void;
  menuOpened: boolean;
}) {
  const { menuOpened, setMenuOpened } = props;
  const handleToggleMenu = useCallback(() => {
    setMenuOpened(!menuOpened);
  }, [menuOpened, setMenuOpened]);

  return (
    <IconButton
      size='medium'
      className='text-[#001344] dark:text-gray-100 msm:hidden'
      tabIndex={0}
      onClick={handleToggleMenu}
      aria-label={menuOpened ? 'Close menu' : 'Open menu'}
      aria-expanded={menuOpened}
      onKeyDown={(e) => {
        if (e.key === 'Enter') handleToggleMenu();
      }}
      onKeyUp={(e) => {
        if (e.key === 'Escape') setMenuOpened(false);
      }}
    >
      {menuOpened ? (
        <MdClose fontSize='2rem' className='msm:text-sm' />
      ) : (
        <MdMenu fontSize='2rem' className='msm:text-sm' />
      )}
    </IconButton>
  );
}

function NavigationLinks(
  props: {
    isMediumSmallScreen: boolean;
    isMenuOpened: boolean;
    setMenuOpened: (prev: boolean) => void;
  } & IHeaderNavLinks,
) {
  const {
    isMediumSmallScreen,
    isMenuOpened,
    setMenuOpened,
    navLinks,
    otherLinks,
  } = props;

  return (
    <Box
      className={`flex-col items-start msm:flex-row ${
        (!isMediumSmallScreen && (isMenuOpened ? 'flex' : 'hidden')) || 'flex'
      }`}
    >
      {navLinks.map(({ name, href, Icon }) => (
        <Box className='m-0 w-full' key={name}>
          <UnStyledLink
            href={href}
            tabIndex={0}
            className='flex w-fit w-full items-center justify-start gap-1 border-b border-slate-300 p-2 px-2 py-4
            font-primary text-[1rem] font-[700] hover:bg-primary-300 focus:bg-primary-300 dark:hover:bg-dark-500 
             dark:focus:bg-dark-500 msm:border-none'
            aria-label={`Link to ${name}`}
          >
            {Icon ? <Icon /> : null}
            <span>{name}</span>
          </UnStyledLink>
        </Box>
      ))}

      {otherLinks?.length ? (
        <OthersLinks otherLinks={otherLinks} setMenuOpened={setMenuOpened} />
      ) : null}
    </Box>
  );
}

function OthersLinks(props: {
  setMenuOpened: (prev: boolean) => void;
  otherLinks: INavLink[];
}) {
  const { setMenuOpened, otherLinks } = props;
  const [subMenuOpened, setSubMenuOpened] = useState<boolean>(false);
  const handleClick = () => setSubMenuOpened((prev) => !prev);
  const handleClickAway = () => setSubMenuOpened(false);
  return (
    <ClickAwayListener
      mouseEvent='onMouseDown'
      touchEvent='onTouchStart'
      onClickAway={handleClickAway}
    >
      <Stack
        className={`relative flex w-full cursor-pointer items-start 
            gap-0 border-b border-slate-300 hover:bg-primary-300 focus:bg-primary-300 dark:hover:bg-dark-500  dark:focus:bg-dark-500 msm:border-none `}
        aria-label='Submenu for other links'
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
              px-2 py-4 font-primary text-[1rem] font-[700] `}
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
            className='absolute top-[calc(100%+1px)] z-20 m-0 flex w-full flex-col gap-1.5 
            border border-primary-300 bg-primary-300 bg-opacity-75 p-0 drop-shadow-sm dark:border-dark-400 dark:bg-dark-400 dark:bg-opacity-75'
          >
            {otherLinks?.map(({ name, href, Icon }) => (
              <UnStyledLink
                key={name}
                href={href}
                className='flex items-center gap-2  p-2 pl-3 font-primary text-[.88rem] font-[700] hover:bg-primary-300  dark:hover:bg-dark-500 '
                aria-label={`Link to ${name}`}
              >
                {Icon ? <Icon /> : null}
                <span>{name}</span>
              </UnStyledLink>
            ))}
          </Box>
        )}
      </Stack>
    </ClickAwayListener>
  );
}
