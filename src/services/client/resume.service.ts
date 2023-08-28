import { promisify } from '@/lib/utils';

import { projectSectionData } from '@/Repository/data/resumeData/resume-content/projectSectionData';
import resumeMainData from '@/Repository/data/resumeData/resumeMainData';
import resumeSeoData, {
  ISeoData,
} from '@/Repository/data/resumeData/resumeSeoData';

import type { ResumeData } from '@/types/portfolio/resume.types';
import { Project } from '@/types/portfolio/resume.types';

export function getResumeSeoData(): Promise<ISeoData> {
  return promisify(resumeSeoData);
}

export function getResumeData(): Promise<ResumeData> {
  return promisify(resumeMainData);
}

export function getProjectData(): Promise<Project> {
  return promisify(projectSectionData);
}
