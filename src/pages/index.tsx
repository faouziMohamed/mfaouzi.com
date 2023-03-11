import {
  Box,
  Box as Section,
  Container as Main,
  Typography,
} from '@mui/material';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

import { GUESTBOOK_PAGE } from '@/lib/client-route.contant';

import FadeEffectWrapper from '@/components/animations/FadeEffectWrapper';
import AboutMeSection from '@/components/home/AboutMeSection';
import DownArrowIcon from '@/components/home/DownArrowIcon';
import GuestBookSection from '@/components/home/GuestBookSection';
import IntroSection from '@/components/home/IntroSection';
import SectionTitleWithBlob from '@/components/home/SectionTitleWithBlob';
import SocialsSection from '@/components/home/SocialsSection';
import SVGBlob from '@/components/home/SVGBlob';
import Layout from '@/components/layout/Layout';
import ButtonLink from '@/components/links/ButtonLink';
import Seo from '@/components/Seo';
import SpaceMans from '@/components/spaceman/SpaceMans';

import devData from '@/Repository/data/dev-data';
import { getProjectData } from '@/services/client/resume.service';

import blogBlob from '~/icons/blog-blob.svg';
import DevStereotype from '~/images/dev/dev-stereotype.svg';

import { IProject } from '@/types/portfolio/resume.types';

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

export default function HomePage() {
  const [projectData, setProjectData] = useState<IProject | null>(null);
  useEffect(() => {
    void getProjectData().then(setProjectData);
  }, []);
  return (
    <Layout className='flex flex-col gap-4  p-0'>
      <Seo templateTitle='Home' title='Faouzi Mohamed' pathname='/' />
      <Main component='main' className='flex max-w-7xl flex-col gap-4 '>
        {/* <DevStereotype className='absolute inset-0 -top-8 -z-[999] h-full w-full rotate-90 fill-gray-50/20 opacity-25 dark:opacity-5' /> */}
        <DevStereotype className='fixed inset-0  top-[18%] -z-[999] h-[65rem] w-full fill-gray-50/20 opacity-80 dark:opacity-20  sm:top-[20%] md:top-[30%] lg:top-2/4' />
        <Box className='flex w-full basis-6 flex-col md:grow md:pt-24'>
          <SpaceMans />
          <Box className='z-10 flex flex-col justify-center gap-2 md:flex-row md:items-center'>
            <IntroSection
              introData={devData}
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
        <div className='flex flex-col items-center gap-4'>
          <FadeEffectWrapper gutterTop='1rem'>
            <GuestBookSection />
          </FadeEffectWrapper>
          <FadeEffectWrapper>
            <BriefSummarySection />
          </FadeEffectWrapper>
        </div>
        <FadeEffectWrapper gutterTop='1rem'>
          <ProjectsSection projects={projectData!} className='sm:px-2' />
        </FadeEffectWrapper>
        <FadeEffectWrapper>
          <Section
            component='section'
            className='flex w-full max-w-[47rem] flex-col items-center gap-5'
            id='guestbook'
          >
            <div className='flex flex-col gap-2  pb-8 text-center sm:flex-row '>
              <Typography className='grow basis-1/3 text-base sm:text-justify'>
                In my free time, I love to immerse myself in science fiction
                books and movies. The imaginative worlds and futuristic
                technologies never fail to captivate my imagination.
              </Typography>

              <Typography className='text-base sm:basis-1 sm:px-3'>
                🧛‍♂️ 🧟‍♂️ 🐧 🌞
              </Typography>

              <Typography className='grow basis-1/3 text-base sm:text-justify'>
                I find that taking time to escape into these fictional worlds
                allows me to return to my work with renewed creativity and
                focus.
              </Typography>
            </div>
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
              experiences and insights in software development, from coding tips
              to personal reflections. Stay tuned for updates on the release
              date!
            </Typography>
            <ButtonLink href={GUESTBOOK_PAGE} className='guestbook-btn'>
              <span className='guestbook-btn--text'>BLOG</span>
            </ButtonLink>
          </Section>
        </FadeEffectWrapper>
        <FadeEffectWrapper gutterTop='1rem'>
          <SkillsAndStackSection className='px-6' />
        </FadeEffectWrapper>
        <ContactSection className='px-6' />
      </Main>
    </Layout>
  );
}
