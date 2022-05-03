export type SVGImageData = React.FC<React.SVGProps<SVGSVGElement>>;

export interface DevDataTypes {
  avatar: string;
  fullName: string;
  skils: string[];
  socials: Socials;
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
