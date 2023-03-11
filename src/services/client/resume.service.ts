import { promisify } from '@/lib/utils';

import { projectSectionData } from '@/Repository/data/resumeData/resume-content/projectSectionData';
import resumeMainData from '@/Repository/data/resumeData/resumeMainData';
import resumeSeoData, {
  ISeoData,
} from '@/Repository/data/resumeData/resumeSeoData';

import type { IResumeData } from '@/types/portfolio/resume.types';
import { IProject } from '@/types/portfolio/resume.types';

export function getResumeSeoData(): Promise<ISeoData> {
  return promisify(resumeSeoData);
}

export function getResumeData(): Promise<IResumeData> {
  return promisify(resumeMainData);
}

export function getProjectData(): Promise<IProject> {
  return promisify(projectSectionData);
}
