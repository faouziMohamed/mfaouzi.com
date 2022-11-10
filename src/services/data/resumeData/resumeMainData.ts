import type { IResumeData } from '@/@types/resume.types';
import { certificationSectionDataData } from '@/services/data/resumeData/resume-content/certificationSectionDataData';
import { educationSectionData } from '@/services/data/resumeData/resume-content/educationSectionData';
import { proExperiencesSectionData } from '@/services/data/resumeData/resume-content/proExperiencesSectionData';
import { profileSectionData } from '@/services/data/resumeData/resume-content/profileSectionData';
import { projectSectionData } from '@/services/data/resumeData/resume-content/projectSectionData';
import { skillsAndAbilities } from '@/services/data/resumeData/resume-content/skillsAndAbilities';
import { userInformation } from '@/services/data/resumeData/resume-content/userIformationData';

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
