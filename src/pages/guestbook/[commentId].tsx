import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { BiArrowBack } from 'react-icons/bi';

import {
  getGuestbookThreadPage,
  GUESTBOOK_PAGE,
  HOME_PAGE,
} from '@/lib/client-route.contant';
import { getCommentRepliesRoute } from '@/lib/serverless-route.constant';

import Button from '@/components/buttons/Button';
import AuthButtons from '@/components/guestbook/AuthButton';
import DisplayComments, {
  COMMENT_INITIAL_DEPTH,
} from '@/components/guestbook/DisplayComments';
import GuestBookLayout from '@/components/guestbook/GuestBookLayout';
import HorizontalLine from '@/components/guestbook/GuestBookPage';
import AlertMessage from '@/components/home/AlertMessage';
import ArrowLink from '@/components/links/ArrowLink';
import HangOnSpinner from '@/components/Spinners/HangOnSpinner';

import { useSingleComment } from '@/services/client/guestbook/guestbook.service';

import { AppUser } from '@/types/guestbook/guestbook.types';

export default function GuestbookCommentPage() {
  // get the comment id from the url
  const router = useRouter();
  const previousPage = () => router.back();
  const guestbookPage = () => void router.push(GUESTBOOK_PAGE);
  const homePage = () => void router.push(HOME_PAGE);
  const { commentId } = router.query as { commentId: string };
  const swrRes = useSingleComment(commentId);

  const { data: comments, error, isLoading } = swrRes;
  if (isLoading && !error)
    return (
      <GuestBookLayout>
        <div className='fixed left-0 top-0 flex h-full w-full items-center justify-center'>
          <HangOnSpinner text='Fetching the comments...' />
        </div>
      </GuestBookLayout>
    );
  if (!isLoading && !comments)
    return (
      <ErrorLoading
        message='Comment not found'
        onGoBackToPreviousPage={previousPage}
      />
    );
  if (error)
    return (
      <div className='flex flex-col gap-0'>
        <ErrorLoading
          message='Failed to load the comment'
          onGoBackToPreviousPage={previousPage}
        />

        <ErrorLoading
          btnText='Guestbook page'
          onGoBackToPreviousPage={guestbookPage}
        />

        <ErrorLoading btnText='Home page' onGoBackToPreviousPage={homePage} />
      </div>
    );

  return (
    <GuestBookLayout>
      <Head>
        <link
          rel='preload'
          href={getCommentRepliesRoute(commentId)}
          as='fetch'
          crossOrigin='anonymous'
        />
      </Head>
      <section className='mt-32 flex flex-col gap-0 text-center'>
        <Typography
          component='h3'
          className='text-6 m-0 font-primary font-[700] text-[#0B4B56] dark:text-[#00caee]'
        >
          Guestbook Thread 👻
        </Typography>
        <DisplayLoginStatus />
      </section>
      <section
        id='comments'
        className='flex w-full flex-col items-center py-10'
      >
        <div className='w-full max-w-3xl'>
          <div className='flex justify-between gap-0 text-center'>
            <ArrowLink
              href={GUESTBOOK_PAGE}
              direction='left'
              className='border-b-transparent'
            >
              Return back to the main thread
            </ArrowLink>
            {comments?.parentId && (
              <ArrowLink
                href={getGuestbookThreadPage(comments.parentId)}
                direction='up'
                className={
                  `border-b-transparent text-gray-600 hover:text-gray-700 ` +
                  ` dark:text-gray-400 dark:hover:text-gray-300`
                }
              >
                Go to the parent thread
              </ArrowLink>
            )}
          </div>
          <HorizontalLine />
          <DisplayComments
            comments={comments ? [comments] : []}
            depth={COMMENT_INITIAL_DEPTH}
            isThread
          />
        </div>
      </section>
      {/* <DisplayComments comments={toDisplay} depth={1} /> */}
    </GuestBookLayout>
  );
}

function ErrorLoading({
  onGoBackToPreviousPage,
  message,
  btnText = 'Go back',
}: {
  onGoBackToPreviousPage: () => void;
  message?: string;
  btnText?: string;
}) {
  return (
    <div className='flex flex-col items-start gap-4 p-4'>
      {!!message && (
        <AlertMessage
          message={message}
          type='error'
          open
          onClose={() => {}}
          position={{
            vertical: 'top',
            horizontal: 'center',
          }}
        />
      )}

      <Button
        variant='light'
        onClick={onGoBackToPreviousPage}
        className='flex items-center justify-center gap-2'
      >
        <BiArrowBack />
        <span>{btnText}</span>
      </Button>
    </div>
  );
}

function DisplayLoginStatus() {
  const { data, status } = useSession();
  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'unauthenticated') {
    return (
      <Stack alignItems='center'>
        <AuthButtons />
      </Stack>
    );
  }
  const user = data!.user as unknown as AppUser;
  return (
    <Stack sx={{ alignItems: 'center', gap: 2, justifyContent: 'center' }}>
      <Box position='relative'>
        <Image
          src={user.avatar}
          width={45}
          height={45}
          className='rounded-full'
          alt={`${user.name}'s avatar`}
        />
      </Box>
      <Typography className='m-0 text-[0.8rem] text-[#616869] dark:text-[#b5cdd1]'>
        You are currently signed in as{' '}
        <span className='font-bold'>{user.name}</span>{' '}
      </Typography>
    </Stack>
  );
}
