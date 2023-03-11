import React from 'react';

export type SVGImageData = React.FC<React.SVGProps<SVGSVGElement>>;

export type DevDataTypes = {
  avatar: string;
  fullName: string;
  skills: string[];
  socials: Socials | { [key: string]: Social };
};

export type Socials = {
  facebook: Social;
  github: Social;
  linkedin: Social;
  twitter: Social;
  instagram: Social;
};

export type Social = {
  url: string;
  username: string;
};

export type ProjectDataType = {
  description: string;
  forks: number;
  image: string;
  languages: string[];
  liveUrl: string;
  repoUrl: string;
  stars: number;
  title: string;
};
export type ContactMeRequestBody = {
  name: string;
  email: string;
  subject: string;
  message: string;
};
export type ContactFormFields = ContactMeRequestBody;
