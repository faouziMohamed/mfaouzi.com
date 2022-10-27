import { Box as AlertBanner, Stack } from '@mui/material';
import { RiMagicFill } from 'react-icons/ri';

export default function UnderConstructionBanner() {
  return (
    <AlertBanner
      component='aside'
      aria-label='Under construction panel'
      className='z-10 flex w-full items-center justify-center bg-primary-100 py-1 dark:bg-dark-primary'
    >
      <Stack className='flex-row items-center gap-2 text-primary-600'>
        <RiMagicFill className='animate-bounce fill-orange-500' />
        <p className='font-primary font-[400]'>Web site under construction</p>
      </Stack>
    </AlertBanner>
  );
}
