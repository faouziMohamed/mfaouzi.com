import { promisify } from '@/lib/helper';

import type { IResumeData } from '@/@types/resume.types';
import { IProject } from '@/@types/resume.types';
import resumeMainData from '@/services/data/resumeData/resumeMainData';
import resumeSeoData, {
  ISeoData,
} from '@/services/data/resumeData/resumeSeoData';

import { projectSectionData } from './data/resumeData/resume-content/projectSectionData';

export function getResumeSeoData(): Promise<ISeoData> {
  return promisify(resumeSeoData);
}

export function getResumeData(): Promise<IResumeData> {
  return promisify(resumeMainData);
}

export function getProjectData(): Promise<IProject> {
  return promisify(projectSectionData);
}
