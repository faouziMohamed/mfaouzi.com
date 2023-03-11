import { Box as Section, Typography } from '@mui/material';

import { GUESTBOOK_PAGE } from '@/lib/client-route.contant';

import SectionTitleWithBlob from '@/components/home/SectionTitleWithBlob';
import SVGBlob from '@/components/home/SVGBlob';
import ButtonLink from '@/components/links/ButtonLink';

import GuestbookBlob from '~/icons/guestbook-blob.svg';

export default function GuestBookSection() {
  return (
    <Section
      component='section'
      className=' flex w-full flex-col items-center justify-center gap-5 p-4'
      id='guestbook'
    >
      <SectionTitleWithBlob
        title='Introducing the Guestbook'
        className='max-w-[30rem]'
        BlobComponent={() => (
          <SVGBlob
            Blob={GuestbookBlob}
            twHeight='h-[1.05rem]'
            twBottom='-bottom-[.89rem]'
            twLeft='xs:left-[5.89rem]'
          />
        )}
      />
      <div className='flex flex-col gap-2 text-center'>
        <Typography className='max-w-[47rem] text-center'>
          The guestbook is a comment system that allows users to comment on a
          post and reply to other comments. It uses the thread model to store
          comments and replies in a database.
        </Typography>
        <Typography className='max-w-[47rem] text-center'>
          So give it a try and mark your presence in my portfolio. Give a
          review, show your appreciation, say what you&apos;ld like to see in my
          portfolio, react to others comments...
        </Typography>
      </div>
      <ButtonLink href={GUESTBOOK_PAGE} className='guestbook-btn'>
        <span className='guestbook-btn--text'>GUESTBOOK</span>
      </ButtonLink>
    </Section>
  );
}
