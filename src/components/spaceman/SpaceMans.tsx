import { Box, useMediaQuery } from '@mui/material';

import SpaceMan from './SpaceMan';

export default function SpaceMans() {
  const media = useMediaQuery('(min-width: 768px)');
  return (
    <>
      <Box className='top-0 animate-wiggle-slower md:absolute md:opacity-50'>
        <SpaceMan />
      </Box>
      {media && (
        <Box className='right-0 bottom-0 animate-wiggle-slower md:absolute md:block'>
          <SpaceMan />
        </Box>
      )}
    </>
  );
}
