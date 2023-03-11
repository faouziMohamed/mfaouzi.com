import { Box, Box as FooterSection, Stack } from '@mui/material';

import devData from '@/Repository/data/dev-data';

import Facebook from '~/icons/facebook.svg';
import Github from '~/icons/github.svg';
import Instagram from '~/icons/instagram.svg';
import Linkedin from '~/icons/linkedin.svg';
import MaterialUi from '~/icons/material-ui.svg';
import Mysql from '~/icons/mysql.svg';
import NextJs from '~/icons/nextjs.svg';
import Twitter from '~/icons/twitter.svg';
import Typescript from '~/icons/typescript.svg';

import UnStyledLink from '../links/UnStyledLink';

import { DevDataTypes, SVGImageData } from '@/types/portfolio/portfolio.types';

const socialData: DevDataTypes = devData;
const usedTech: readonly { name: string; Icon: SVGImageData }[] = [
  { name: 'NextJs', Icon: NextJs },
  { name: 'Typescript', Icon: Typescript },
  { name: 'MaterialUi', Icon: MaterialUi },
  { name: 'MySQL', Icon: Mysql },
];

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
    <FooterSection className='w-full bg-primary-100 px-2 pt-8 pb-4 dark:bg-dark-primary'>
      <Stack className='flex items-center gap-4'>
        <h3 className='text-lg font-[500] leading-3'>
          Faouzi Mohamed - {new Date().getFullYear()}
        </h3>
        <Stack className='flex-row gap-4'>
          <p className='font-primary font-[300]'>Built with:</p>
          <Stack className='flex flex-row gap-2'>
            {usedTech.map(({ Icon, name }, index) => (
              <Box
                key={name}
                className='flex items-center justify-center gap-2 font-normal'
                component='strong'
              >
                <Icon className='h-5 w-5' />
                {index + 1 < usedTech.length && <span>/</span>}
              </Box>
            ))}
          </Stack>
        </Stack>
        <Stack className='flex-row gap-4' component='nav'>
          {SocialsStack.map(({ Icon, name, link }) => (
            <UnStyledLink
              key={name}
              href={link}
              aria-label={`Link to my ${name}`}
            >
              <Icon className='h-5 w-5' />
            </UnStyledLink>
          ))}
        </Stack>
      </Stack>
    </FooterSection>
  );
}
