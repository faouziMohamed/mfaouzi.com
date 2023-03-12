import { Box as Section, Typography } from '@mui/material';

import FadeEffectWrapper from '@/components/animations/FadeEffectWrapper';
import Button from '@/components/buttons/Button';
import SectionTitleWithBlob from '@/components/home/SectionTitleWithBlob';
import SVGBlob from '@/components/home/SVGBlob';

import blogBlob from '~/icons/blog-blob.svg';

function BlogPreIntro() {
  return (
    <FadeEffectWrapper>
      <div className='flex flex-col gap-2  pb-8 text-center sm:flex-row '>
        <Typography className='grow basis-1/3 text-base sm:text-justify'>
          In my free time, I love to immerse myself in science fiction books and
          movies. The imaginative worlds and futuristic technologies never fail
          to captivate my imagination.
        </Typography>
        <Typography className='text-base sm:basis-1 sm:px-3'>
          🧛‍♂️ 🧟‍♂️ 🐧 🌞
        </Typography>
        <Typography className='grow basis-1/3 text-base sm:text-justify'>
          I find that taking time to escape into these fictional worlds allows
          me to return to my work with renewed creativity and focus.
        </Typography>
      </div>
    </FadeEffectWrapper>
  );
}

export default function BlogSection() {
  return (
    <Section
      component='section'
      aria-label='Blog section'
      className='flex w-full max-w-[47rem] flex-col items-center gap-5'
      id='guestbook'
    >
      <BlogPreIntro />
      <FadeEffectWrapper>
        <SectionTitleWithBlob
          title='Introducing the Blog 🧐'
          className='max-w-[30rem]'
          BlobComponent={() => (
            <SVGBlob
              Blob={blogBlob}
              twHeight='h-[1.05rem]'
              twBottom='-bottom-[.89rem]'
              twLeft='xs:left-[5.89rem]'
            />
          )}
        />
        <Typography className='grow basis-1/3 text-center text-base'>
          I&apos;ll soon be launching a blog where I&apos;ll share my
          experiences and insights in software development, from coding tips to
          personal reflections. Stay tuned for updates on the release date!
        </Typography>
        <Button className='guestbook-btn cursor-auto'>
          <span className='guestbook-btn--text'>The BLOG soon available</span>
        </Button>
      </FadeEffectWrapper>
    </Section>
  );
}
