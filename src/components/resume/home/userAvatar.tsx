import { Box } from '@mui/material';
import Image from 'next/image';

import userProfileAvatar from '~/images/userProfilePicture.jpeg';

export default function UserAvatar() {
  return (
    <Box
      className='shrink-none relative flex h-[15rem] w-[15rem]
    items-center justify-center rounded-full msm:h-[18rem] msm:w-[18rem]'
    >
      <Image
        className='h-full w-full rounded-full object-cover'
        alt='developer picture'
        src={userProfileAvatar}
        layout='fill'
        objectFit='cover'
        priority
      />
    </Box>
  );
}
