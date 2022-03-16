import { Box, Typography } from '@mui/material';
import { FC } from 'react';

export default function LayerIntro({
  message,
  BlobComponent,
}: {
  message: string;
  BlobComponent?: FC;
}) {
  return (
    <div className='flex w-full items-center justify-center gap-3'>
      <BlockLine />
      <Box className='flex flex-col'>
        <Typography
          variant='subtitle1'
          component='p'
          className=' font-base grow  text-center font-primary text-[1.0625rem] leading-5 text-black'
        >
          {message}
        </Typography>
        {BlobComponent && <BlobComponent />}
      </Box>
      <BlockLine />
    </div>
  );
}
function BlockLine() {
  return (
    <div className='flex grow basis-20 border-b border-slate-300 md:grow-[.1] md:basis-40 ' />
  );
}
