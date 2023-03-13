import Box from '@mui/material/Box';
import ProjectCardStack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Image from 'next/image';

import FadeEffectWrapper from '@/components/animations/FadeEffectWrapper';
import SectionTitleWithBlob from '@/components/home/SectionTitleWithBlob';
import SVGBlob from '@/components/home/SVGBlob';

import { projectSectionData } from '@/Repository/data/resumeData/resume-content/projectSectionData';

import ProjectsBlob from '~/icons/projects-blob.svg';

const ProjectCard = dynamic(() => import('./ProjectCard'));

interface IProjectProps {
  className?: string;
}

export default function ProjectSection(props: IProjectProps) {
  const { className = '' } = props;
  return (
    <Box className='flex w-full justify-center'>
      <motion.section
        id='projects'
        className={`flex w-full max-w-5xl flex-col items-center gap-4 ${className}`}
      >
        <SectionTitleWithBlob
          className='pb-8'
          title='Projects'
          BlobComponent={() => (
            <SVGBlob Blob={ProjectsBlob} twHeight='h-5' twBottom='bottom-4' />
          )}
        />
        <div
          className={
            `flex w-fit flex-col items-center gap-4 rounded-lg border py-4 dark:border-gray-700` +
            ` px-4 md:flex-row-reverse md:items-center md:justify-evenly `
          }
        >
          <div className='relative w-auto shrink-0  basis-1/2'>
            <Image
              src='https://res.cloudinary.com/mfaouzi/image/upload/c_scale,q_48,w_429/v1678703347/mfaouzi.com/dev/dev-night.gif'
              alt='Ghost developer'
              width='669'
              height='176'
              className='h-44 rounded-lg object-cover'
            />
          </div>
          <Typography className='min-w-[20rem] basis-1/2 pb-4 text-center text-[0.98rem] font-[400] md:max-w-none md:text-justify '>
            I build things for the web and desktop, sometimes for fun, sometimes
            for work. I use GitHub as my sanctuary, I experiment, build
            collaborate with others and share my work there. Here are some of my
            projects.
          </Typography>
        </div>
        <ProjectCardStack className='flex flex-row flex-wrap justify-center gap-4 py-4'>
          {projectSectionData.ProjectDetails.map((project) => (
            <FadeEffectWrapper
              key={project.Name}
              gutterTop='0'
              gutterBottom={0}
            >
              <ProjectCard
                Name={project.Name}
                Description={project.Description || project.Summary}
                SrcLink={project.SrcLink}
                LiveLink={project.LiveLink}
                Technologies={project.Technologies}
                Image={project.Image}
              />
            </FadeEffectWrapper>
          ))}
        </ProjectCardStack>
        {/* <Box className='flex w-full justify-end'> */}
        {/*   <ArrowLink */}
        {/*     direction='right' */}
        {/*     href='/projects/more' */}
        {/*     className='text-primary-600' */}
        {/*   > */}
        {/*     See More Projects */}
        {/*   </ArrowLink> */}
        {/* </Box> */}
      </motion.section>
    </Box>
  );
}
