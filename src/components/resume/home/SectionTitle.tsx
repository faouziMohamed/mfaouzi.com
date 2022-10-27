import { Box } from '@mui/material';
import { IconType } from 'react-icons';

interface ISectionTitle {
  title: string;
  Icon: IconType;
  className?: string;
}

export default function SectionTitle({
  title,
  Icon,
  className = '',
}: ISectionTitle) {
  return (
    <Box
      component='header'
      className={`flex items-center gap-2 border-b-[3px] border-b text-2xl ${className}`}
    >
      <Icon />
      <h3
        aria-label={`${title}'s heading`}
        className='font-[Roboto] text-2xl font-bold'
      >
        {title}
      </h3>
    </Box>
  );
}
