import { Box, Stack, Typography } from '@mui/material';
import { IconType } from 'react-icons';
import {
  FaBriefcase,
  FaCertificate,
  FaFolderOpen,
  FaGraduationCap,
} from 'react-icons/fa';
import { RiContactsFill } from 'react-icons/ri';

import data from '@/data/resume/resumeData/resumeMainData';
import userInformation from '@/data/resume/resumeData/userIformationData';

import CertificationsSection from '@/components/resume/home/certificationsSection';
import DiplomaSection from '@/components/resume/home/diplomaSection';
import ExperienceSection from '@/components/resume/home/experienceSection';
import ProjectSection from '@/components/resume/home/projectSection';
import DetailsSections from '@/components/resume/home/Sections';
import SectionTitle from '@/components/resume/home/SectionTitle';
import UserAvatar from '@/components/resume/home/userAvatar';
import UserInformation from '@/components/resume/home/UserInformation';
import ResumeLayout from '@/components/resume/layout/ResumeLayout';
import Seo from '@/components/Seo';

import {
  ICertification,
  IEducation,
  IProfessionalExperience,
  IProfile,
  IProject,
} from '@/@types/resume.types';

export default function HomePage() {
  const { Profile, Project, Certification } = data;
  const { Education: education, ProfessionalExperience } = data;
  return (
    <ResumeLayout>
      <Box className='flex flex-col gap-8 bg-transparent sm:flex-row sm:gap-1'>
        <Seo
          title='Resume'
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          description={Profile.Description}
        />
        <Box className='flex flex-col gap-6 bg-gray-800 p-2 py-8 text-white dark:bg-dark-r-400 md:w-full md:max-w-md'>
          <Box className='flex flex-col items-center gap-4 pt-16 sm:flex-col sm:justify-between md:flex-col'>
            <UserAvatar />
            <UserInformation data={userInformation} />
          </Box>
          <DetailsSections />
        </Box>
        <ResumeSections
          profile={Profile}
          education={education}
          certifications={Certification}
          experiences={ProfessionalExperience}
          projects={Project}
        />
      </Box>
    </ResumeLayout>
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

function Education({ education }: { education: IEducation }) {
  return (
    <Stack className='gap-4' component='section'>
      <ResumeSectionTitle title={education.Title} Icon={FaGraduationCap} />
      {education.Diploma.map((diploma) => (
        <DiplomaSection key={diploma.Title} diploma={diploma} />
      ))}
    </Stack>
  );
}

function ResumeSections(props: {
  profile: IProfile;
  education: IEducation;
  certifications: ICertification;
  experiences: IProfessionalExperience;
  projects: IProject;
}) {
  const { profile, education, certifications, experiences, projects } = props;
  return (
    <Stack className='gap-4 px-2 sm:py-16'>
      <Stack className='gap-4' component='section'>
        <ResumeSectionTitle title={profile.Title} Icon={RiContactsFill} />
        <Typography variant='body1'>{profile.Description}</Typography>
      </Stack>
      <Education education={education} />
      <Stack className='gap-4' component='section'>
        <ResumeSectionTitle title={certifications.Title} Icon={FaCertificate} />
        {certifications.Certificates.map((certification) => (
          <CertificationsSection
            key={certification.Title}
            certification={certification}
          />
        ))}
      </Stack>
      <Stack className='gap-4' component='section'>
        <ResumeSectionTitle title={experiences.Title} Icon={FaBriefcase} />
        {experiences.Experiences.map((experience) => (
          <ExperienceSection experience={experience} key={experience.Title} />
        ))}
      </Stack>
      <Stack className='gap-2' component='section'>
        <ResumeSectionTitle title={projects.Title} Icon={FaFolderOpen} />
        {projects.ProjectDetails.map((project) => (
          <ProjectSection key={project.Name} project={project} />
        ))}
      </Stack>
    </Stack>
  );
}
