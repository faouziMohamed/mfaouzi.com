import {
  Box,
  Box as Intro,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import Image from 'next/image';

import LayerIntro from '@/components/home/LayerIntro';

import type { IDevDataTypes } from '@/@types/data';

import devPicture from '~/images/faouzi-mhd.jpeg';

type IntroSectionProps = {
  data: IDevDataTypes;
  className?: string;
};
export default function IntroSection({
  data,
  className = '',
}: IntroSectionProps) {
  const matches = useMediaQuery('(min-width:768px)'); // md
  return (
    <Intro
      id='about'
      component='section'
      className={`flex flex-col gap-6 ${className}`}
    >
      <Stack className='items-center'>
        <Box
          className={`
             avatar-shadow avatar-border relative h-[13rem] w-[13rem]
             animate-bounce-low items-center justify-center gap-2 rounded-full 
            `}
          aria-label={"Faouzi Mohamed's avatar"}
        >
          <Image
            src={devPicture}
            alt='MainHeader background blob'
            className='h-full w-full rounded-full object-cover'
            priority
          />
        </Box>
        <Stack className='w-full items-center text-center'>
          <LayerIntro message='Hi There!' showLines={!matches} />
          <h2 className='font-primary text-[1.88rem] font-[700] leading-snug'>
            I&apos;m {data.fullName || 'Faouzi Mohamed'}
          </h2>
          <Typography
            variant='subtitle1'
            component='p'
            className='font-primary text-base font-[300] leading-normal'
          >
            {data.skills.join(' | ')}
          </Typography>
        </Stack>
      </Stack>
    </Intro>
  );
}
