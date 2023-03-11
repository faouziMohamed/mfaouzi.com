import { Box, Stack, Typography } from '@mui/material';
import { IconType } from 'react-icons';
import {
  FaBriefcase,
  FaCertificate,
  FaFolderOpen,
  FaGraduationCap,
} from 'react-icons/fa';
import { RiContactsFill } from 'react-icons/ri';

import ResumeLayout from '@/components/layout/resume/ResumeLayout';
import CertificationsSection from '@/components/resume/certificationsSection';
import DiplomaSection from '@/components/resume/diplomaSection';
import ExperienceSection from '@/components/resume/experienceSection';
import ProjectSection from '@/components/resume/projectSection';
import SectionTitle from '@/components/resume/SectionTitle';
import SkillsAndSoftSkillsSections from '@/components/resume/SkillsAndSoftSkillsSections';
import UserAvatar from '@/components/resume/userAvatar';
import UserInformation from '@/components/resume/UserInformation';
import Seo from '@/components/Seo';

import resumeMainData from '@/Repository/data/resumeData/resumeMainData';

import {
  ICertification,
  IEducation,
  IProfessionalExperience,
  IProfile,
  IProject,
} from '@/types/portfolio/resume.types';

export default function HomePage() {
  const { Profile, Project, Certification } = resumeMainData;
  const { Education: education, ProfessionalExperience } = resumeMainData;
  const { UserInformation: userInformation } = resumeMainData;
  const { SkillsAndAbilities } = resumeMainData;
  return (
    <ResumeLayout>
      <Box className='flex flex-col gap-8 bg-transparent sm:flex-row sm:gap-1'>
        <Seo title='Resume' description={Profile.Description} />
        <Box className='flex flex-col gap-6 bg-gray-800 p-2 py-8 text-white dark:bg-dark-r-400 md:w-full md:max-w-md'>
          <Box className='flex flex-col items-center gap-4 pt-16 sm:flex-col sm:justify-between md:flex-col'>
            <UserAvatar avatar={userInformation.Avatar} />
            <UserInformation data={userInformation} />
          </Box>
          <SkillsAndSoftSkillsSections skills={SkillsAndAbilities} />
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
    <Stack className='gap-4 px-3 sm:py-16'>
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
