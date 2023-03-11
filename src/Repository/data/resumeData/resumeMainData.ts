import { certificationSectionDataData } from '@/Repository/data/resumeData/resume-content/certificationSectionDataData';
import { educationSectionData } from '@/Repository/data/resumeData/resume-content/educationSectionData';
import { proExperiencesSectionData } from '@/Repository/data/resumeData/resume-content/proExperiencesSectionData';
import { profileSectionData } from '@/Repository/data/resumeData/resume-content/profileSectionData';
import { projectSectionData } from '@/Repository/data/resumeData/resume-content/projectSectionData';
import { skillsAndAbilities } from '@/Repository/data/resumeData/resume-content/skillsAndAbilities';
import { userInformation } from '@/Repository/data/resumeData/resume-content/userIformationData';

import type { IResumeData } from '@/types/portfolio/resume.types';

const resumeMainData: IResumeData = {
  UserInformation: userInformation,
  Profile: profileSectionData,
  SkillsAndAbilities: skillsAndAbilities,
  Education: educationSectionData,
  Certification: certificationSectionDataData,
  ProfessionalExperience: proExperiencesSectionData,
  Project: projectSectionData,
};

export default resumeMainData;
