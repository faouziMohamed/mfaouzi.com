import { certificationSectionDataData } from '@/Repository/data/resumeData/resume-content/certificationSectionDataData';
import { educationSectionData } from '@/Repository/data/resumeData/resume-content/educationSectionData';
import { proExperiencesSectionData } from '@/Repository/data/resumeData/resume-content/proExperiencesSectionData';
import { profileSectionData } from '@/Repository/data/resumeData/resume-content/profileSectionData';
import { projectSectionData } from '@/Repository/data/resumeData/resume-content/projectSectionData';
import { skillsAndAbilities } from '@/Repository/data/resumeData/resume-content/skillsAndAbilities';
import { userInformation } from '@/Repository/data/resumeData/resume-content/userIformationData';

import type { ResumeData } from '@/types/portfolio/resume.types';

const resumeMainData: ResumeData = {
  userInformation,
  profile: profileSectionData,
  skillsAndAbilities,
  education: educationSectionData,
  certification: certificationSectionDataData,
  professionalExperience: proExperiencesSectionData,
  project: projectSectionData,
};

export default resumeMainData;
