import { Box, Container as Main } from '@mui/material';
import dynamic from 'next/dynamic';

import FadeEffectWrapper from '@/components/animations/FadeEffectWrapper';
import AppSeoTheme from '@/components/AppSeoTheme';
import AboutMeSection from '@/components/home/AboutMeSection';
import DownArrowIcon from '@/components/home/DownArrowIcon';
import GuestBookSection from '@/components/home/GuestBookSection';
import IntroSection from '@/components/home/IntroSection';
import SocialsSection from '@/components/home/SocialsSection';
import Layout from '@/components/layout/Layout';
import SpaceMan from '@/components/spaceman/SpaceMan';

import DevStereotype from '~/images/dev/dev-stereotype.svg';

const ProjectsSection = dynamic(
  () => import('@/components/home/ProjectsSection'),
);

const SkillsAndStackSection = dynamic(
  () => import('@/components/home/SkillsAndStackSection'),
);

const ContactSection = dynamic(
  () => import('@/components/home/ContactSection'),
);

const BriefSummarySection = dynamic(
  () => import('@/components/BriefSummarySection'),
);

const BlogSection = dynamic(() => import('@/components/home/BlogSection'));

export default function HomePage() {
  return (
    <Layout className='flex flex-col gap-4  p-0'>
      <AppSeoTheme />
      <Main component='main' className='flex max-w-7xl flex-col gap-4 '>
        <DevStereotype className='fixed inset-0  top-[18%] -z-[999] h-[65rem] w-full dark:opacity-20  sm:top-[20%] md:top-[30%] lg:top-2/4' />
        <Box className='flex w-full basis-6 flex-col md:grow md:pt-24'>
          <Box className='top-0 animate-wiggle-slower md:absolute md:opacity-50'>
            <SpaceMan />
          </Box>
          <Box className='z-10 flex flex-col justify-center gap-2 md:flex-row md:items-center'>
            <IntroSection className='grow basis-full px-6 md:px-4' />
            <FadeEffectWrapper gutterTop='1rem'>
              <AboutMeSection
                className='rounded border border-primary-200
              bg-primary-100 bg-opacity-80 px-6 py-2 dark:border-dark-300
              dark:bg-dark-500 dark:bg-opacity-80'
              />
            </FadeEffectWrapper>
          </Box>
        </Box>
        <SocialsSection className='basis-full px-6 md:px-4' />
        <DownArrowIcon className=' text-5xl' />
        <FadeEffectWrapper gutterTop='1rem'>
          <GuestBookSection />
        </FadeEffectWrapper>
        <FadeEffectWrapper>
          <div className='flex w-full justify-center'>
            <BriefSummarySection />
          </div>
        </FadeEffectWrapper>
        <FadeEffectWrapper gutterTop='1rem'>
          <ProjectsSection className='sm:px-2' />
        </FadeEffectWrapper>
        <div className='flex w-full justify-center'>
          <BlogSection />
        </div>
        <FadeEffectWrapper gutterTop='1rem'>
          <SkillsAndStackSection className='px-6' />
        </FadeEffectWrapper>
        <FadeEffectWrapper gutterTop='1rem'>
          <ContactSection className='px-6' />
        </FadeEffectWrapper>
      </Main>
    </Layout>
  );
}
