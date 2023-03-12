import Head from 'next/head';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import { GET_COMMENTS_ROUTE } from '@/lib/serverless-route.constant';

import AuthButtons from '@/components/guestbook/AuthButton';
import AddNewComment from '@/components/guestbook/comment/AddNewComment';
import DisplayComments, {
  COMMENT_INITIAL_DEPTH,
} from '@/components/guestbook/DisplayComments';
import GuestBookLayout from '@/components/guestbook/GuestBookLayout';
import HorizontalLine from '@/components/guestbook/GuestBookPage';
import GuestBookPageTitle from '@/components/guestbook/GuestBookPageTitle';
import SignTheBookTitle from '@/components/guestbook/SignTheBookTitle';
import HangOnSpinner from '@/components/Spinners/HangOnSpinner';

import { useComments } from '@/services/client/guestbook/guestbook.service';

import { AppUser } from '@/types/guestbook/guestbook.types';

export default function GuestBookPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const { data: comments = [], isLoading } = useComments();
  const { data: session, status } = useSession();
  if (!mounted) return null;
  if (status === 'loading') return <div>Loading...</div>;
  let isConnected = false;
  let connectedUser = {} as AppUser;
  if (status === 'authenticated' && session.user) {
    isConnected = true;
    connectedUser = session.user as unknown as AppUser;
  }

  return (
    <GuestBookLayout>
      <Head>
        <link
          rel='preload'
          href={GET_COMMENTS_ROUTE}
          as='fetch'
          crossOrigin='anonymous'
        />
      </Head>
      {/* <Seo templateTitle='Home' title='Faouzi Mohamed' pathname='/' /> */}

      <section
        className='mt-36 flex w-full flex-col gap-5 px-4 transition-all msm:mt-28'
        id='guestbook'
      >
        <GuestBookPageTitle />
        <div className='flex w-full flex-col items-center gap-4 pt-5'>
          <SignTheBookTitle />
          {isConnected ? (
            <AddNewComment user={connectedUser} />
          ) : (
            <AuthButtons />
          )}
        </div>
      </section>
      {isLoading && (
        <div className='flex justify-center py-8'>
          <HangOnSpinner text='Loading Comments...' size='lg' />
        </div>
      )}
      {!isLoading && comments.length > 0 && (
        <section
          id='comments'
          className='flex w-full flex-col items-center py-10'
        >
          <div className='w-full max-w-3xl'>
            <HorizontalLine />
            <DisplayComments
              comments={comments}
              depth={COMMENT_INITIAL_DEPTH}
            />
          </div>
        </section>
      )}
    </GuestBookLayout>
  );
}
