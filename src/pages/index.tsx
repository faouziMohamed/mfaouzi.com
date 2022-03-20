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
import { connectionToGithub } from '@/utils/utils';

const data = devData as DevDataTypes;

export default function HomePage(/* { projects }: { projects: repoTypes[] } */) {
  const title = 'Faouzi Mohamed';
  const description = `My personal website, showing my projects, skills, resume andmore. 
    My personal website, showing my projects, skills, resume and more.
    My personal website.showing my projects, skills, resume and more.
    My personal website.showing my projects, skills, resume
    and more. My personal website.`;

  return (
    <Layout className='flex flex-col gap-4 p-0'>
      <Seo templateTitle='Home' title={title} />
      <SpaceMan />
      <Main component='main' className='flex flex-col gap-4 '>
        <IntroSection data={data} className=' px-6' />
        <SocialsSection data={data} className=' px-6' />
        <DownArrowIcon className='text-5xl' />
        <AboutMeSection className='px-6' />
        <ProjectsSection
          title={title}
          description={description}
          className='px-6'
        />
        <SkilsAndStackSection className='px-6' />
        <ContactSection className='px-6' />
      </Main>
    </Layout>
  );
}

export const getInitialProps = async () => {
  if (!process.env.GITHUB_TOKEN) throw new Error('Github token is missing');

  const { octokit, owner } = await connectionToGithub(process.env.GITHUB_TOKEN);
  const { repos } = octokit.rest;

  const repoNames = projects.map(({ name }) => name);
  const repoDatas = await Promise.all(
    repoNames.map(async (repo) => {
      const { data: ghData } = await repos.get({ owner, repo });
      const {
        name,
        full_name: fullName,
        html_url: url,
        homepage,
        stargazers_count: stargazersCount,
        forks_count: forksCount,
        description,
      } = ghData;
      const { data: languages } = await repos.listLanguages({ owner, repo });
      return {
        name,
        fullName,
        url,
        homepage,
        stargazers_count: stargazersCount,
        forks_count: forksCount,
        description,
        languages,
      };
    }),
  );

  return {
    params: {
      projects: repoDatas,
    },
  };
};

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
