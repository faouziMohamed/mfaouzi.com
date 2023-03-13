import {
  Box,
  Box as Intro,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import Image from 'next/image';

import LayerIntro from '@/components/home/LayerIntro';

import devData from '@/Repository/data/dev-data';

type IntroSectionProps = {
  className?: string;
};
export default function IntroSection({ className = '' }: IntroSectionProps) {
  const introData = devData;
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
            src={devData.avatar}
            alt={"Faouzi Mohamed's avatar"}
            className='h-full w-full rounded-full object-cover'
            fill
            sizes='100%'
            priority
          />
        </Box>

        <Stack className='w-full items-center text-center'>
          <LayerIntro message='Hi There!' showLines={!matches} />
          <h2 className='font-primary text-[1.88rem] font-[700] leading-snug'>
            I&apos;m {introData.fullName || 'Faouzi Mohamed'}
          </h2>
          <Typography
            variant='subtitle1'
            component='p'
            className='font-primary text-base font-[300] leading-normal'
          >
            {introData.skills.join(' | ')}
          </Typography>
        </Stack>
      </Stack>
    </Intro>
  );
}
