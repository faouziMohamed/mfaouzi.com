import { Typography } from '@mui/material';
import { IconType } from 'react-icons';

interface ISectionTitle {
  title: string;
  Icon: IconType;
  className?: string;
}

export default function SectionTitle(props: ISectionTitle) {
  const { title, Icon, className = '' } = props;
  return (
    <Typography
      component='header'
      className={`flex items-center gap-2 border-b-[3px]  ${className}`}
    >
      <Icon />
      <h3
        aria-label={`${title}'s heading`}
        className='font-[Roboto] text-xl font-bold'
      >
        {title}
      </h3>
    </Typography>
  );
}
