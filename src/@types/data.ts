import React from 'react';

export type SVGImageData = React.FC<React.SVGProps<SVGSVGElement>>;

export interface IDevDataTypes {
  avatar: string;
  fullName: string;
  skills: string[];
  socials: Socials | { [key: string]: Social };
}

export interface Socials {
  facebook: Social;
  github: Social;
  linkedin: Social;
  twitter: Social;
  instagram: Social;
}

export interface Social {
  url: string;
  username: string;
}

export interface IProjectDataType {
  description: string;
  forks: number;
  image: string;
  languages: string[];
  liveUrl: string;
  repoUrl: string;
  stars: number;
  title: string;
}
