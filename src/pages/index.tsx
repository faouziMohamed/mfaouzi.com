import { Container as Main } from '@mui/material';

import devData from '@/data/dev-data.json';
import projects from '@/data/projects.json';

import AboutMeSection from '@/components/home/AboutMeSection';
import ContactSection from '@/components/home/ContactSection';
import DownArrowIcon from '@/components/home/DownArrowIcon';
import IntroSection from '@/components/home/IntroSection';
import ProjectsSection from '@/components/home/ProjectsSection';
import SkilsAndStackSection from '@/components/home/SkilsAndStackSection';
import SocialsSection from '@/components/home/SocialsSection';
import SpaceMan from '@/components/images/SpaceMan';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import type { DevDataTypes } from '@/@types/data';

const data = devData as DevDataTypes;

export default function HomePage() {
  return (
    <Layout className='flex flex-col gap-4 p-0'>
      <Seo templateTitle='Home' />
      <SpaceMan />
      <Main component='main' className='flex flex-col gap-4 '>
        <IntroSection data={data} className=' px-6' />
        <SocialsSection data={data} className=' px-6' />
        <DownArrowIcon className='text-5xl' />
        <AboutMeSection className='px-6' />
        <ProjectsSection projects={projects} className='px-6' />
        <SkilsAndStackSection className='px-6' />
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
