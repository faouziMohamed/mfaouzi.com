import { Box, Box as FooterSection, Stack, Typography } from '@mui/material';

import { SVGImageData } from '@/@types/data';

import Facebook from '~/icons/facebook.svg';
import Github from '~/icons/github.svg';
import Instagram from '~/icons/instagram.svg';
import Linkedin from '~/icons/linkedin.svg';
import Materialui from '~/icons/material-ui.svg';
import MongoDb from '~/icons/mongodb.svg';
import NextJs from '~/icons/nextjs.svg';
import Twitter from '~/icons/twitter.svg';
import TYpescript from '~/icons/typescript.svg';

const usedTech: readonly { name: string; Icon: SVGImageData }[] = [
  { name: 'NextJs', Icon: NextJs },
  { name: 'TYpescript', Icon: TYpescript },
  { name: 'Materialui', Icon: Materialui },
  { name: 'MongoDb', Icon: MongoDb },
];
const SocialsStack: readonly { name: string; Icon: SVGImageData }[] = [
  { name: 'Linkedin', Icon: Linkedin },
  { name: 'Github', Icon: Github },
  { name: 'Twitter', Icon: Twitter },
  { name: 'Instagram', Icon: Instagram },
  { name: 'Facebook', Icon: Facebook },
];

export default function Footer() {
  return (
    <FooterSection className='w-full bg-primary-100 px-2 pt-8 pb-4'>
      <Stack className='flex items-center gap-4'>
        <Typography className='text-lg font-[500] leading-3' component='h3'>
          Faouzi Mohamed - {new Date().getFullYear()}
        </Typography>
        <Stack className='flex-row gap-4'>
          <Typography className='font-primary font-[300]'>
            Built with:
          </Typography>
          <Stack className='flex flex-row gap-2'>
            {usedTech.map(({ Icon, name }, index) => (
              <Box
                key={name}
                className='flex items-center justify-center gap-2'
              >
                <Icon className='h-5 w-5' />
                {index + 1 < usedTech.length && <span>/</span>}
              </Box>
            ))}
          </Stack>
        </Stack>
        <Stack className='flex-row gap-4'>
          {SocialsStack.map(({ Icon, name }) => (
            <Icon key={name} className='h-5 w-5' />
          ))}
        </Stack>
      </Stack>
    </FooterSection>
  );
}
