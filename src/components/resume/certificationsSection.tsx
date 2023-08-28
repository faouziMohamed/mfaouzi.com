import { Box, IconButton, Typography } from '@mui/material';
import { TbExternalLink } from 'react-icons/tb';

import UnStyledLink from '@/components/links/UnStyledLink';

import { Certificate } from '@/types/portfolio/resume.types';

interface ICertificateSectionProps {
  certification: Certificate;
}

export default function CertificationsSection(props: ICertificateSectionProps) {
  const { certification } = props;
  return (
    <Box>
      <Box className=''>
        <h4 className='inline text-sm font-bold'>
          {certification.title}
          {', '}
        </h4>
        <Typography variant='body2' className='inline text-sm'>
          {certification.institution}
        </Typography>
        <UnStyledLink
          href={certification.link}
          className='inline'
          aria-label={certification.title}
        >
          <IconButton
            size='small'
            className='dark:text-gray-100'
            aria-label={`View ${certification.title} certificate`}
          >
            <TbExternalLink />
          </IconButton>
        </UnStyledLink>
      </Box>
      <Typography variant='body2' className='text-sm'>
        {certification.date}
      </Typography>
    </Box>
  );
}
