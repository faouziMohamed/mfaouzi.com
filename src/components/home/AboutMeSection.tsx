import { Box, Box as Section, Typography } from '@mui/material';
import Link from 'next/link';

import { RESUME_PAGE, RESUME_PDF_LINK } from '@/lib/client-route.contant';

import ButtonLink from '@/components/links/ButtonLink';
import SpaceMan from '@/components/spaceman/SpaceMan';

import AboutMeBlob from '~/icons/about-me-blob.svg';

import SectionTitleWithBlob from './SectionTitleWithBlob';
import SVGBlob from './SVGBlob';

interface AboutMeSectionProps {
  className?: string;
}

export default function AboutMeSection({
  className = '',
}: AboutMeSectionProps) {
  return (
    <Section
      component='section'
      className={`relative flex w-full flex-col items-center gap-4 ${className}`}
    >
      <Box className='absolute bottom-0 right-0 -z-10 animate-wiggle-slower md:block'>
        <SpaceMan />
      </Box>
      <SectionTitleWithBlob
        title='About Me'
        BlobComponent={() => (
          <SVGBlob Blob={AboutMeBlob} twHeight='h-7' twBottom='-bottom-3' />
        )}
      />
      <Box className='flex flex-col gap-4 text-justify leading-6'>
        <Typography variant='body1' className='font-[300] '>
          I&apos;m a software engineer 👨‍💻 with expertise in frontend/backend
          development. I Build software that solves problems, creates engaging
          user experiences and I use my devops skills to deploy and maintain the
          applications.
        </Typography>
        <Typography variant='body1' className='font-[300]'>
          I work at{' '}
          <Link
            href='https://kartalys.io'
            className='font-bold text-primary-500 underline'
            target='_blank'
            rel='noopener noreferrer'
          >
            Kartalys
          </Link>{' '}
          as a software developer. I&apos;m interested in collaborating on
          projects related to web design, cloud, and virtualization, so feel
          free to reach out to me.
        </Typography>
      </Box>
      <Box className='flex w-full items-center justify-center gap-4'>
        <ButtonLink
          href={RESUME_PAGE}
          className='text-center'
          variant='primary'
        >
          View resume
        </ButtonLink>
        <ButtonLink
          href={RESUME_PDF_LINK}
          download
          className='text-center'
          variant='ghost'
        >
          Download resume
        </ButtonLink>
      </Box>
    </Section>
  );
}
