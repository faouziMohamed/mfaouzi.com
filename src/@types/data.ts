export interface DevDataTypes {
  avatar: string;
  fullName: string;
  profileLinks: ProfileLinks;
  skils: string[];
  socials: Social[];
}

export interface ProfileLinks {
  facebook: string;
  github: string;
  linkedin: string;
  twitter: string;
}

export interface Social {
  social: string;
  username: string;
}

export type SVGImageData = React.FC<React.SVGProps<SVGSVGElement>>;
