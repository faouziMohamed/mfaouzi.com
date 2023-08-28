import { Box, Typography } from '@mui/material';

import { Diploma } from '@/types/portfolio/resume.types';

export default function DiplomaSection({ diploma }: { diploma: Diploma }) {
  return (
    <Box className=''>
      <Box className=''>
        <h4 className='inline text-sm font-bold'>
          {diploma.title}
          {', '}
        </h4>
        <Typography variant='body2' className='inline text-sm'>
          {diploma.institution}
        </Typography>
      </Box>
      <Typography variant='body2' className='text-sm'>
        {diploma.date} {' | '} {diploma.city}, {diploma.country}
      </Typography>
    </Box>
  );
}
