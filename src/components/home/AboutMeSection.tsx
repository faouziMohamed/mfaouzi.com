import { Box, Box as Section, Typography } from '@mui/material';

import ButtonLink from '@/components/links/ButtonLink';

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
      className={`flex w-full flex-col items-center gap-4 ${className}`}
    >
      <SectionTitleWithBlob
        title='About Me'
        BlobComponent={() => (
          <SVGBlob Blob={AboutMeBlob} twHeight='h-7' twBottom='-bottom-3' />
        )}
      />
      <Box className='flex flex-col gap-4 text-justify leading-6'>
        <Typography variant='body1' className='font-[300] '>
          I&apos;m a software engineer 👨‍💻 with expertise in ReactJs, Angular,
          DotNet Core, Java, and MERN Stack. My passion is building software
          that solves problems and creates engaging user experiences.
        </Typography>
        <Typography variant='body1' className='font-[300]'>
          I work at Keystone as a software developer. I&apos;m interested in
          collaborating on projects related to web design, cloud, and
          virtualization, so feel free to reach out to me.
        </Typography>
      </Box>
      <Box className='flex w-full items-center justify-center gap-4'>
        <ButtonLink href='/resume' className='text-center' variant='primary'>
          View resume
        </ButtonLink>
        <ButtonLink
          href='/documents/resume-dev.pdf'
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
