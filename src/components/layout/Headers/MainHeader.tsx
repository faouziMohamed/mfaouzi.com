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
    <Stack
      component='nav'
      className='text-dark'
      sx={{ position: 'relative', zIndex: 20, width: '100%', px: 4 }}
    >
      <Stack
        component='header'
        sx={{
          flexDirection: 'row',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.375rem',
        }}
      >
        {isMediumSmallScreen && (
          <UnStyledLink href='/' aria-label='Link to Home'>
            <SiteLogo />
          </UnStyledLink>
        )}
        <NavigationMenu navLinks={navLinks} otherLinks={otherLinks} />
      </Stack>
    </Stack>
  );
}

function NavigationMenu(props: IHeaderNavLinks) {
  const { navLinks, otherLinks } = props;
  const [menuOpened, setMenuOpened] = useState<boolean>(false);
  const isMediumSmallScreen = useMediaQuery('(min-width: 693px)'); // sm
  return (
    <Box
      className='bg-primary-300 bg-opacity-50 transition-all dark:bg-dark-400
      dark:bg-opacity-70 msm:bg-transparent msm:dark:bg-transparent'
      sx={{
        position: 'absolute',
        inset: 0,
        zIndex: 30,
        height: 'fit-content',
        width: '100%',
        select: 'none',
        p: 0,
        '@media (min-width: 693px)': {
          position: 'relative',
          display: 'flex',
          width: 'fit-content',
          flexGrow: 1,
          flexDirection: 'row-reverse',
          justifyContent: 'flex-start',
        },
      }}
    >
      <Box
        className='bg-cyan-200 dark:bg-dark-400 msm:bg-transparent msm:dark:bg-transparent'
        sx={{
          display: 'flex',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: '0.5rem',
          py: '0.25rem',
          '@media (min-width: 693px)': {
            width: 'fit-content',
            justifyContent: 'flex-end',
          },
        }}
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
    isMenuOpened: boolean;
    setMenuOpened: (prev: boolean) => void;
  } & IHeaderNavLinks,
) {
  const { isMenuOpened, setMenuOpened, navLinks, otherLinks } = props;

  return (
    <Box
      sx={{
        display: isMenuOpened ? 'flex' : 'none',
        flexDirection: 'column',
        alignItems: 'flex-start',
        '@media (min-width: 693px)': { display: 'flex', flexDirection: 'row' },
      }}
    >
      {navLinks.map(({ name, href, Icon }) => (
        <Box key={name} sx={{ m: 0, width: '100%' }}>
          <UnStyledLink
            href={href}
            tabIndex={0}
            className='flex w-full items-center justify-start gap-1 border-b border-slate-300 p-2 px-2 py-4
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
        className={`border-b border-slate-300 hover:bg-primary-300 
        focus:bg-primary-300 dark:hover:bg-dark-500 dark:focus:bg-dark-500 
        msm:border-none `}
        sx={{
          position: 'relative',
          cursor: 'pointer',
          alignItems: 'flex-start',
          gap: 0,
          width: '100%',
        }}
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
          if (e.key === 'Enter') handleClick();
        }}
      >
        <Stack
          className='font-primary'
          sx={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: `100%`,
            gap: '0.25rem',
            px: '0.5rem',
            py: '1rem',
            fontSize: '1rem',
            fontWeight: 700,
          }}
        >
          <p className='w-full'>Others</p>
          {subMenuOpened ? (
            <MdExpandLess className='font-[700]' />
          ) : (
            <MdExpandMore className='font-[700]' />
          )}
        </Stack>
        {subMenuOpened && (
          <Stack
            className='border border-primary-300 bg-primary-300 bg-opacity-75 drop-shadow-sm
            dark:border-dark-400 dark:bg-dark-400 dark:bg-opacity-75'
            sx={{
              position: 'absolute',
              top: 'calc(100% + 1px)',
              zIndex: 20,
              width: '100%',
              gap: '0.375rem',
            }}
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
          </Stack>
        )}
      </Stack>
    </ClickAwayListener>
  );
}
