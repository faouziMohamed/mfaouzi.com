import Typography from '@mui/material/Typography';

import SectionTitleWithBlob from '@/components/home/SectionTitleWithBlob';
import SVGBlob from '@/components/home/SVGBlob';

import GuestbookTitleBlob from '~/icons/guestbook-title-blob.svg';

export default function GuestBookPageTitle() {
  return (
    <div className='flex w-full flex-col items-center gap-3 '>
      <SectionTitleWithBlob
        title='Guestbook'
        className='max-w-[30rem] pb-[0.2rem]'
        BlobComponent={() => (
          <SVGBlob
            Blob={GuestbookTitleBlob}
            twHeight='h-[1.05rem]'
            twBottom='-bottom-[.89rem]'
          />
        )}
      />
      <Typography className='max-w-[42rem] text-center'>
        Leave a comment below. It could be anything - appreciation, information,
        wisdom, or even humor. Surprise me!
      </Typography>
    </div>
  );
}
