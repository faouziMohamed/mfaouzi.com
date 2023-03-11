import { Box, IconButton, Typography } from '@mui/material';
import { TbExternalLink } from 'react-icons/tb';

import UnStyledLink from '@/components/links/UnStyledLink';

import { ICertificate } from '@/types/portfolio/resume.types';

interface ICertificateSectionProps {
  certification: ICertificate;
}

export default function CertificationsSection(props: ICertificateSectionProps) {
  const { certification } = props;
  return (
    <Box>
      <Box className=''>
        <h4 className='inline text-sm font-bold'>
          {certification.Title}
          {', '}
        </h4>
        <Typography variant='body2' className='inline text-sm'>
          {certification.Institution}
        </Typography>
        <UnStyledLink
          href={certification.Link}
          className='inline'
          aria-label={certification.Title}
        >
          <IconButton
            size='small'
            className='dark:text-gray-100'
            aria-label={`View ${certification.Title} certificate`}
          >
            <TbExternalLink />
          </IconButton>
        </UnStyledLink>
      </Box>
      <Typography variant='body2' className='text-sm'>
        {certification.Date}
      </Typography>
    </Box>
  );
}
