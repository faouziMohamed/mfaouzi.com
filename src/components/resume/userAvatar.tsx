import { Box } from '@mui/material';
import Image from 'next/image';

export default function UserAvatar({ avatar }: { avatar: string }) {
  return (
    <Box
      className='shrink-none relative flex h-[15rem] w-[15rem]
    items-center justify-center rounded-full msm:h-[18rem] msm:w-[18rem]'
    >
      <Image
        className='h-full w-full rounded-full object-cover'
        alt='developer picture'
        src={avatar}
        width={240}
        height={240}
        priority
      />
    </Box>
  );
}
