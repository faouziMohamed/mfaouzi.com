import { Box, Container as Main, Stack } from '@mui/material';

import devData from '@/data/dev-data.json';
import projects from '@/data/projects.json';

import AboutMeSection from '@/components/home/AboutMeSection';
import ContactSection from '@/components/home/ContactSection';
import DownArrowIcon from '@/components/home/DownArrowIcon';
import IntroSection from '@/components/home/IntroSection';
import ProjectsSection from '@/components/home/ProjectsSection';
import SkillsAndStackSection from '@/components/home/SkilsAndStackSection';
import SocialsSection from '@/components/home/SocialsSection';
import SpaceMan from '@/components/images/SpaceMan';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import type { DevDataTypes, IProjectDataType } from '@/@types/data';

const data = devData as DevDataTypes;

export default function HomePage() {
  return (
    <Layout className='flex flex-col gap-4 p-0'>
      <Seo templateTitle='Home' title='Faouzi Mohamed' />
      <Main component='main' className='flex flex-col gap-4 '>
        <Box className='relative flex w-full basis-6 flex-col md:grow md:pt-24'>
          <SpaceMans />
          <Box className='z-10 flex flex-col justify-center gap-2 md:flex-row md:items-center'>
            <IntroSection
              data={data}
              className='grow basis-full px-6 md:px-4'
            />
            <AboutMeSection className='rounded border border-primary-200 bg-primary-100 bg-opacity-80 px-6 py-2' />
          </Box>
        </Box>
        <SocialsSection data={data} className='basis-full px-6 md:px-4' />
        <DownArrowIcon className='text-5xl' />
        <ProjectsSection
          projects={projects as IProjectDataType[]}
          className='px-6'
        />
        <SkillsAndStackSection className='px-6' />
        <ContactSection className='px-6' />
      </Main>
    </Layout>
  );
}

export interface ProjectData {
  name: string;
  fullName: string;
  url: string;
  homepage: string;
  stargazersCount: number;
  forksCount: number;
  description: string;
  languages: { [key: string]: number };
}
function SpaceMans() {
  return (
    <>
      <Box className=' top-0 animate-wiggle md:absolute md:opacity-50'>
        <SpaceMan />
      </Box>
      <Box className='right-0 bottom-0 hidden animate-wiggle md:absolute md:block'>
        <SpaceMan />
      </Box>
    </>
  );
}
