/* eslint-disable @typescript-eslint/no-misused-promises */
import { Typography } from '@mui/material';
import { signIn } from 'next-auth/react';
import { RxGithubLogo } from 'react-icons/rx';

import Button from '@/components/buttons/Button';

export default function AuthButtons() {
  return (
    <section
      className='flex max-w-[29.8125rem] flex-col gap-3 rounded-md  
    bg-[#C9F7FFC2] p-4 shadow shadow-[#cdcdcd] dark:bg-[#002539] dark:shadow-[#1c222248]'
    >
      <Typography
        component='h3'
        className='text-5 font-secondary font-[800] text-[#3e4f58] dark:text-[#b8cbd6]'
      >
        First you&apos;ll need to connect in order to contribute
      </Typography>

      <div className='flex w-full flex-col gap-2'>
        {/* GitHub Login Button */}
        <Button
          onClick={() => signIn('github', { redirect: false })}
          className='flex w-full items-center justify-center gap-2 rounded-md
          border-0  bg-[#101720] text-[#fff8f8] shadow-sm hover:bg-[#000000] 
          focus:outline-none focus:ring-2 focus:ring-[#101720] focus:ring-offset-2 
          active:bg-[#03041f]'
        >
          <RxGithubLogo className='text-3xl' />
          <span>Continue with GitHub</span>
        </Button>
      </div>

      <Typography className='-mt-2 text-end text-[0.6rem] text-[#33393a] dark:text-[#AFD3DA]'>
        Your information is only used to display your name and reply by email
        and it&apos;s not shared with anyone.
      </Typography>
    </section>
  );
}
