import { Box, Stack as ProjectCardStack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

import SectionTitleWithBlob from '@/components/home/SectionTitleWithBlob';
import SVGBlob from '@/components/home/SVGBlob';

import { IProject } from '@/@types/resume.types';

import ProjectsBlob from '~/icons/projects-blob.svg';

const ProjectCard = dynamic(() => import('./ProjectCard'));

interface IProjectProps {
  className?: string;
  projects: IProject;
}

export default function ProjectSection(props: IProjectProps) {
  const { className = '', projects } = props;

  return (
    <Box className='flex w-full justify-center'>
      <motion.section
        id='projects'
        className={`flex w-full max-w-5xl flex-col items-center gap-4 ${className}`}
      >
        <SectionTitleWithBlob
          title='Projects'
          BlobComponent={() => (
            <SVGBlob Blob={ProjectsBlob} twHeight='h-5' twBottom='-bottom-3' />
          )}
        />
        <Typography>
          I build things for the web and desktop, sometimes for fun, sometimes
          for work. Here are some of my projects.
        </Typography>
        <ProjectCardStack className='flex flex-row flex-wrap justify-center gap-4'>
          {projects.ProjectDetails.map((project) => (
            <ProjectCard
              key={project.Name}
              Name={project.Name}
              Description={project.Description || project.Summary}
              SrcLink={project.SrcLink}
              LiveLink={project.LiveLink}
              Technologies={project.Technologies}
              // Image={project.image}
            />
          ))}
        </ProjectCardStack>
        {/* <Box className='flex w-full justify-end'> */}
        {/*  <ArrowLink */}
        {/*    direction='right' */}
        {/*    href='/projects/more' */}
        {/*    className='text-primary-600' */}
        {/*  > */}
        {/*    See More Projects */}
        {/*  </ArrowLink> */}
        {/* </Box> */}
      </motion.section>
    </Box>
  );
}
