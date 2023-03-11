import { promisify } from '@/lib/utils';

import devData from '@/Repository/data/dev-data';
import devProjects from '@/Repository/data/projects';

import {
  DevDataTypes,
  ProjectDataType,
} from '@/types/portfolio/portfolio.types';

export function getDeveloperData(): Promise<DevDataTypes> {
  return promisify(devData);
}

export function getDeveloppedProjects(): Promise<Array<ProjectDataType>> {
  return promisify(devProjects);
}
