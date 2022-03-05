import { Box as Section, Container as Main } from '@mui/material';

import devData from '@/data/dev-data.json';

import AboutMeSection from '@/components/home/AboutMeSection';
import DownArrowIcon from '@/components/home/DownArrowIcon';
import IntroSection from '@/components/home/IntroSection';
import SectionTitleWithBlob from '@/components/home/SectionTitleWithBlob';
import SocialsSection from '@/components/home/SocialsSection';
import SpaceMan from '@/components/images/SpaceMan';
import Layout from '@/components/layout/Layout';
// import ArrowLink from '@/components/links/ArrowLink';
// import UnderlineLink from '@/components/links/UnderlineLink';
import Seo from '@/components/Seo';

import type { DevDataTypes } from '@/@types/data';

import ProjectsBlob from '~/icons/projects-blob.svg';

import SVGBlob from '../components/home/SVGBlob';

const data = devData as DevDataTypes;

export default function HomePage() {
  return (
    <Layout className='flex flex-col gap-4 pb-8'>
      <Seo templateTitle='Home' />
      <SpaceMan />
      <Main component='main' className='flex flex-col gap-4'>
        <IntroSection data={data} />
        <SocialsSection data={data} />
        <DownArrowIcon className='text-5xl' />
        <AboutMeSection />
        <Section className='flex w-full flex-col items-center gap-4'>
          <SectionTitleWithBlob
            title='Projects'
            BlobComponent={() => (
              <SVGBlob
                Blob={ProjectsBlob}
                twHeight='h-5'
                twBottom='-bottom-3'
              />
            )}
          />
        </Section>
      </Main>
    </Layout>
  );
}
