import type { IconType } from 'react-icons';
import { GiHobbitDoor, GiNinjaHead, GiWorld } from 'react-icons/gi';

export type ISubSectionData = { [key: string]: string[] };

export interface SkillsAndAbilities {
  [key: string]: {
    icon: IconType;
    title: string;
    subsections: ISubSectionData;
  };
}

export const skillsAndAbilities: SkillsAndAbilities = {
  Skills: {
    title: 'Skills',
    icon: GiNinjaHead,
    subsections: {
      programmingLanguages: ['C#', 'Java', 'Javascript', 'Typescript'],
      frameworksAndLibraries: [
        'Spring Boot',
        'Asp.Net Core',
        'NextJs (ReactJs)',
        'Angular',
      ],
      databases: ['MongoDB', 'MySQL', 'SQL Server'],
      cloudProviders: ['Azure', 'DigitalOcean'],
      virtualization: ['Docker', 'VirtualBox'],
      writingAndDesign: ['MS Word', 'MS Powerpoint', 'Figma', 'InkScape'],
      others: ['Git', 'Jira', 'Confluence', 'Agile', 'Scrum,...'],
    },
  },
  languages: {
    title: 'Languages',
    icon: GiWorld,
    subsections: {
      french: ['Native'],
      english: ['Fluent'],
      arabic: ['Fluent'],
    },
  },
  interests: {
    title: 'Interests',
    icon: GiHobbitDoor,
    subsections: {
      Learning: [
        'Web Development',
        'Teaching',
        'Science vulgarization',
        'Programming',
      ],
      hobbies: ['Sci-Fi movies and tv shows', 'Music', 'Video games'],
    },
  },
};
