import { Box } from '@mui/material';

import UnStyledLink from '@/components/links/UnStyledLink';

import DownArrow from '~/icons/down-arrow.svg';

type DownArrowProps = {
  className?: string;
};

export default function DownArrowIcon({ className = '' }: DownArrowProps) {
  return (
    <Box
      id='down-arrow'
      className={`flex w-full items-center justify-center py-4 ${className}`}
    >
      <UnStyledLink href='#down-arrow'>
        <DownArrow className='animate-bounce-slow text-5xl text-white dark:fill-gray-100' />
      </UnStyledLink>
    </Box>
  );
}
