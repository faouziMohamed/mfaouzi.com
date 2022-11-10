import { Box, Container as Main, useMediaQuery } from '@mui/material';
import dynamic from 'next/dynamic';
import { Suspense, useEffect, useState } from 'react';

import FadeEffectWrapper from '@/components/animations/FadeEffectWrapper';
import AboutMeSection from '@/components/home/AboutMeSection';
import DownArrowIcon from '@/components/home/DownArrowIcon';
import IntroSection from '@/components/home/IntroSection';
import SocialsSection from '@/components/home/SocialsSection';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import { IProject } from '@/@types/resume.types';
import devData from '@/services/data/dev-data';
import { getProjectData } from '@/services/resume.service';

const SpaceMan = dynamic(() => import('@/components/images/SpaceMan'));
const ProjectsSection = dynamic(
  () => import('@/components/home/ProjectsSection'),
);

const SkillsAndStackSection = dynamic(
  () => import('@/components/home/SkillsAndStackSection'),
);

const ContactSection = dynamic(
  () => import('@/components/home/ContactSection'),
);

export default function HomePage() {
  // const projectSections = getProjectData();
  const [loading, setLoading] = useState<IProject | null>(null);
  useEffect(() => {
    // eslint-disable-next-line promise/always-return
    void getProjectData().then((data) => {
      setLoading(data);
    });
  });
  return (
    <Layout className='flex flex-col gap-4 p-0 '>
      <Seo templateTitle='Home' title='Faouzi Mohamed' pathname='/' />
      <Main component='main' className=' flex max-w-7xl flex-col gap-4 '>
        <Box className='relative flex w-full basis-6 flex-col md:grow md:pt-24'>
          <SpaceMans />
          <Box className='z-10 flex flex-col justify-center gap-2 md:flex-row md:items-center'>
            <IntroSection
              data={devData}
              className='grow basis-full px-6 md:px-4'
            />
            <FadeEffectWrapper gutterTop='1rem'>
              <AboutMeSection
                className='rounded border border-primary-200
              bg-primary-100 bg-opacity-80 px-6 py-2 dark:border-dark-300
              dark:bg-dark-500 dark:bg-opacity-80'
              />
            </FadeEffectWrapper>
          </Box>
        </Box>
        <SocialsSection data={devData} className='basis-full px-6 md:px-4' />
        <DownArrowIcon className=' text-5xl' />
        <Suspense fallback={<div>Loading...</div>}>
          <ProjectsSection projects={loading!} className='px-6' />
        </Suspense>
        <SkillsAndStackSection className='px-6' />
        <ContactSection className='px-6' />
      </Main>
    </Layout>
  );
}

function SpaceMans() {
  const media = useMediaQuery('(min-width: 768px)');
  return (
    <>
      <Box className='top-0 animate-wiggle-slower md:absolute md:opacity-50'>
        <SpaceMan />
      </Box>
      {media && (
        <Box className='right-0 bottom-0 animate-wiggle-slower md:absolute md:block'>
          <SpaceMan />
        </Box>
      )}
    </>
  );
}
