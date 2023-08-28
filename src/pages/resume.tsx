import { Box, Stack, Typography } from '@mui/material';
import { IconType } from 'react-icons';
import { FaBriefcase, FaFolderOpen, FaGraduationCap } from 'react-icons/fa';
import { RiContactsFill } from 'react-icons/ri';

import AppSeoTheme from '@/components/AppSeoTheme';
import ResumeLayout from '@/components/layout/resume/ResumeLayout';
import DiplomaSection from '@/components/resume/DiplomaSection';
import ExperienceSection from '@/components/resume/ExperienceSection';
import ProjectSection from '@/components/resume/ProjectSection';
import SectionTitle from '@/components/resume/SectionTitle';
import SkillsAndSoftSkillsSections from '@/components/resume/SkillsAndSoftSkillsSections';
import UserAvatar from '@/components/resume/UserAvatar';
import UserInformation from '@/components/resume/UserInformation';

import resumeMainData from '@/Repository/data/resumeData/resumeMainData';

import DevStereotype from '~/images/dev/dev-stereotype.svg';

import {
  Education,
  ProfessionalExperience,
  Profile,
  Project,
} from '@/types/portfolio/resume.types';

export default function HomePage() {
  const { profile, project } = resumeMainData;
  const { education, professionalExperience } = resumeMainData;
  const { userInformation } = resumeMainData;
  const { skillsAndAbilities } = resumeMainData;
  return (
    <ResumeLayout>
      <AppSeoTheme />
      <DevStereotype className='fixed inset-0  top-[18%] -z-[999] h-[65rem] w-full dark:opacity-20  sm:top-[20%] md:top-[30%] lg:top-2/4' />
      <div className=' flex justify-center '>
        <Box className='relative flex flex-col gap-8 bg-transparent sm:flex-row sm:gap-1'>
          <Box className='flex flex-col gap-6 bg-gray-800 p-2 py-8 text-white dark:bg-dark-r-400 md:w-full md:max-w-md'>
            <Box className='flex flex-col items-center gap-4 pt-16 sm:flex-col sm:justify-between md:flex-col'>
              <UserAvatar avatar={userInformation.avatar} />
              <UserInformation data={userInformation} />
            </Box>
            <SkillsAndSoftSkillsSections skills={skillsAndAbilities} />
          </Box>
          <ResumeSections
            profile={profile}
            education={education}
            experiences={professionalExperience}
            projects={project}
          />
        </Box>
      </div>
    </ResumeLayout>
  );
}

function ResumeSections(props: {
  profile: Profile;
  education: Education;
  experiences: ProfessionalExperience;
  projects: Project;
}) {
  const { profile, education, experiences, projects } = props;
  return (
    <Stack className='gap-4 px-3 sm:py-16'>
      <Stack className='gap-4' component='section'>
        <ResumeSectionTitle title={profile.title} Icon={RiContactsFill} />
        <Typography variant='body1' sx={{ fontSize: '0.85rem' }}>
          {profile.description}
        </Typography>
      </Stack>
      {/* Experiences */}
      <Stack sx={{ gap: '1rem' }} component='section'>
        <ResumeSectionTitle title={experiences.title} Icon={FaBriefcase} />
        {experiences.experiences.map((experience) => (
          <ExperienceSection experience={experience} key={experience.title} />
        ))}
      </Stack>
      {/* Projects */}
      <Stack className='gap-2' component='section'>
        <ResumeSectionTitle title={projects.Title} Icon={FaFolderOpen} />
        {projects.ProjectDetails.map((project) => (
          <ProjectSection key={project.name} project={project} />
        ))}
      </Stack>
      {/* Educations */}
      <EducationSection education={education} />
    </Stack>
  );
}

function ResumeSectionTitle(props: { title: string; Icon: IconType }) {
  const { title, Icon } = props;
  return (
    <SectionTitle
      title={title}
      Icon={Icon}
      className='border-b-[7px] border-gray-800 dark:border-gray-200'
    />
  );
}

function EducationSection({ education }: { education: Education }) {
  return (
    <Stack className='gap-4' component='section'>
      <ResumeSectionTitle title={education.title} Icon={FaGraduationCap} />
      {education.diploma.map((diploma) => (
        <DiplomaSection key={diploma.title} diploma={diploma} />
      ))}
    </Stack>
  );
}
