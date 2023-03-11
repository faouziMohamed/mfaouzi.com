import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { IconType } from 'react-icons';

type CommentButtonProps = {
  Icon: IconType;
  title: string;
  onClick: () => void;
  className?: string;
  count?: number;
};

export function CommentButton({
  Icon,
  title,
  onClick,
  className = '',
  count,
}: CommentButtonProps) {
  return (
    <div className='flex items-center gap-0'>
      {
        // if count is defined, show it
        typeof count !== 'undefined' && (
          <Typography
            className='font-[700] text-[#413e3e] dark:text-[#fff]'
            variant='caption'
          >
            {count}
          </Typography>
        )
      }
      <IconButton
        onClick={onClick}
        className='text-[#72797a] hover:text-blue-400 dark:text-[#979797]'
        title={title}
      >
        <Icon className={className} />
      </IconButton>
    </div>
  );
}
