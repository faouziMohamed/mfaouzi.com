import { certificationSectionDataData } from '@/data/resume/resumeData/certificationSectionDataData';
import { educationSectionData } from '@/data/resume/resumeData/educationSectionData';
import { proExperiencesSectionData } from '@/data/resume/resumeData/proExperiencesSectionData';
import { profileSectionData } from '@/data/resume/resumeData/profileSectionData';
import { projectSectionData } from '@/data/resume/resumeData/projectSectionData';

import type { IResumeData } from '@/@types/resume.types';

const resumeMainData: IResumeData = {
  Profile: profileSectionData,
  Education: educationSectionData,
  Certification: certificationSectionDataData,
  ProfessionalExperience: proExperiencesSectionData,
  Project: projectSectionData,
};

export default resumeMainData;
