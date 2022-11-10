import { promisify } from '@/lib/helper';

import { IDevDataTypes, IProjectDataType } from '@/@types/data';
import devData from '@/services/data/dev-data';
import devProjects from '@/services/data/projects';

export function getDeveloperData(): Promise<IDevDataTypes> {
  return promisify(devData);
}

export function getDeveloppedProjects(): Promise<Array<IProjectDataType>> {
  return promisify(devProjects);
}
