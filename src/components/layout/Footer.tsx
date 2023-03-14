import { Box as FooterSection, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import { IconType } from 'react-icons';

import { SITE_URL } from '@/lib/client-route.contant';
import clsxm from '@/lib/utils';

import { mainNavLinks } from '@/components/layout/Headers/headers-data';
import SiteLogo from '@/components/layout/Headers/SiteLogo';
import UnderlineLink from '@/components/links/UnderlineLink';
import UnStyledLink from '@/components/links/UnStyledLink';

import devData from '@/Repository/data/dev-data';

import Facebook from '~/icons/facebook.svg';
import Github from '~/icons/github.svg';
import Instagram from '~/icons/instagram.svg';
import Linkedin from '~/icons/linkedin.svg';
// import MaterialUi from '~/icons/material-ui.svg';
// import Mysql from '~/icons/mysql.svg';
// import NextJs from '~/icons/nextjs.svg';
// import Typescript from '~/icons/typescript.svg';
import Twitter from '~/icons/twitter.svg';

import { DevDataTypes, SVGImageData } from '@/types/portfolio/portfolio.types';

const socialData: DevDataTypes = devData;
// const usedTech: readonly { name: string; Icon: SVGImageData }[] = [
//   {
//     name: 'NextJs',
//     Icon: () => <NextJs className='h-full w-full text-white dark:fill-white' />,
//   },
//   { name: 'Typescript', Icon: Typescript },
//   { name: 'MaterialUi', Icon: MaterialUi },
//   { name: 'MySQL', Icon: Mysql },
// ];

interface ISocialStacks {
  name: string;
  Icon: SVGImageData;
  link: string;
}

const SocialsStack: readonly ISocialStacks[] = [
  {
    name: 'Linkedin',
    Icon: Linkedin,
    link: socialData.socials.linkedin.url,
  },
  {
    name: 'Github',
    Icon: Github,
    link: socialData.socials.github.url,
  },
  {
    name: 'Twitter',
    Icon: Twitter,
    link: socialData.socials.twitter.url,
  },
  {
    name: 'Instagram',
    Icon: Instagram,
    link: socialData.socials.instagram.url,
  },
  {
    name: 'Facebook',
    Icon: Facebook,
    link: socialData.socials.facebook.url,
  },
];

export default function Footer() {
  return (
    <FooterSection
      id='footer'
      className='flex w-full flex-col items-center justify-center gap-5 bg-primary-100 px-8 py-8 dark:bg-dark-primary sm:px-16'
    >
      <div className='flex w-full max-w-4xl flex-col gap-5 sm:flex-row sm:items-start sm:justify-between sm:px-8'>
        <div className='flex flex-col  items-center gap-4 sm:items-start sm:gap-2 '>
          <SiteLogo />
          <Typography className='text-center'>
            {devData.skills.join(' | ')}
          </Typography>
        </div>
        <div className='flex flex-col items-center gap-4'>
          <Stack className='flex-row gap-4'>
            <Stack className='flex flex-col gap-2'>
              {mainNavLinks.map(({ Icon, name, href }) => {
                const MyIcon = Icon as IconType;
                const isGuestbook = name === 'Guestbook';
                return (
                  <UnderlineLink
                    href={href}
                    key={name}
                    className='flex items-center justify-start gap-2 border-none text-base font-normal'
                  >
                    <MyIcon
                      className={clsxm(
                        'h-5 w-5 ',
                        isGuestbook ? 'h-4 w-4 pl-0.5' : '',
                      )}
                    />
                    <span>{name}</span>
                  </UnderlineLink>
                );
              })}
            </Stack>
          </Stack>
        </div>
      </div>
      <div className='flex w-full flex-row justify-center gap-4 sm:gap-8'>
        {SocialsStack.map(({ Icon, name, link }) => (
          <UnStyledLink
            key={name}
            href={link}
            aria-label={`Link to my ${name}`}
          >
            <Icon className='h-5 w-5' />
          </UnStyledLink>
        ))}
      </div>
      <div className='flex w-full max-w-4xl flex-col items-center justify-between sm:flex-row'>
        <Typography className='text-sm'>
          COPYRIGHT © 2022 - {new Date().getFullYear()}{' '}
          <span className='font-[600]'>
            {SITE_URL?.replace(/https?:\/\//, '') || 'mfaouzi.com'}
          </span>
        </Typography>
        <Typography className='text-sm'>
          ❤️ Developed by <span className='font-[600]'>{devData.fullName}</span>{' '}
          😎
        </Typography>
      </div>
    </FooterSection>
  );
}
