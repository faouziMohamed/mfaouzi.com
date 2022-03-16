import { Box, Box as Section, Stack as ProjectCardStack } from '@mui/material';

import SectionTitleWithBlob from '@/components/home/SectionTitleWithBlob';
import SVGBlob from '@/components/home/SVGBlob';
import ArrowLink from '@/components/links/ArrowLink';

import ProjectsBlob from '~/icons/projects-blob.svg';

import type { ProjectDataProps } from './ProjectCard';
import ProjectCard from './ProjectCard';

export default function ProjectSection({
  title,
  description,
  className = '',
}: ProjectDataProps & { className?: string }) {
  return (
    <Section className={`flex w-full flex-col items-center gap-4 ${className}`}>
      <SectionTitleWithBlob
        title='Projects'
        BlobComponent={() => (
          <SVGBlob Blob={ProjectsBlob} twHeight='h-5' twBottom='-bottom-3' />
        )}
      />
      <ProjectCardStack className='flex flex-row flex-wrap justify-center gap-4'>
        <ProjectCard title={title} description={description} />
        <ProjectCard title={title} description={description} />
        <ProjectCard title={title} description={description} />
        <ProjectCard title={title} description={description} />
      </ProjectCardStack>
      <Box className='flex w-full justify-end'>
        <ArrowLink
          direction='right'
          href='/projects/more'
          className='text-primary-600'
        >
          See More Projects
        </ArrowLink>
      </Box>
    </Section>
  );
}
