import Typography from '@mui/material/Typography';
import { signOut } from 'next-auth/react';

import ArrowButton from '@/components/buttons/ArrowButton';
import Button from '@/components/buttons/Button';
import CommentPrompt from '@/components/guestbook/comment/CommentPrompt';

import { refreshCommentsCache } from '@/services/client/guestbook/guestbook.service';

import { AppUser } from '@/types/guestbook/guestbook.types';

export default function AddNewComment({ user }: { user: AppUser }) {
  return (
    <section
      className='flex w-full max-w-[38rem] flex-col items-center gap-3
              rounded-md bg-[#C9F7FFC2] px-4 pb-2 pt-7 shadow shadow-[#cdcdcd]
              dark:bg-[#002539] dark:shadow-[#1c222248]'
      id='sign'
    >
      <Typography className='text-center text-[0.8rem]  text-[#34484d] dark:text-[#b5cdd1]'>
        You are currently signed in as{' '}
        <span className='font-bold'>{user.name}</span>{' '}
      </Typography>
      <CommentPrompt />
      <ArrowButton
        as={Button}
        className='-mt-1 rounded-md px-4 py-2 text-xs text-black dark:border-0 dark:text-gray-200 dark:hover:bg-black dark:hover:bg-opacity-40'
        onClick={() => {
          void signOut({ redirect: false });
          void refreshCommentsCache();
        }}
        variant='ghost'
        title='Sign out and reload the page'
      >
        Sign out
      </ArrowButton>
    </section>
  );
}
