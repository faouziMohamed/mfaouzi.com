import { SkillsAndAbilities } from '@/Repository/data/resumeData/resume-content/skillsAndAbilities';

export interface Profile {
  description: string;
  title: string;
}

export interface Diploma {
  institution: string;
  city: string;
  title: string;
  country: string;
  date: string;
}

export interface Education {
  title: string;
  diploma: Diploma[];
}

export interface Certificate {
  institution: string;
  link: string;
  title: string;
  date: string;
}

export interface Certification {
  certificates: Certificate[];
  title: string;
}

export interface SubTask {
  subTask: string;
  subTaskDetails?: string[];
}

export interface ProjectTask {
  task: string;
  summary?: string;
  subTasks: SubTask[];
  technologies?: string[];
}

export interface Experience {
  company: string;
  companyLink?: string;
  description: {
    project: ProjectTask[];
    summary: string;
    technologies?: string[];
  };
  city: string;
  title: string;
  country: string;
  date: string;
}

export interface ProfessionalExperience {
  experiences: Experience[];
  title: string;
}

export interface ProjectDetail {
  startDate: string;
  description: string;
  summary: string;
  endDate: string;
  name: string;
  technologies: string[];
  srcLink?: string;
  liveLink?: string;
  image?: string | StaticImageData;
}

export interface Project {
  ProjectDetails: ProjectDetail[];
  Title: string;
}

export interface ResumeData {
  userInformation: UserContactsAndProfileData;
  profile: Profile;
  skillsAndAbilities: SkillsAndAbilities;
  education: Education;
  certification: Certification;
  professionalExperience: ProfessionalExperience;
  project: Project;
}

export interface About {
  firstName: string;
  lastName: string;
  profession: string;
}

export interface Location {
  city: string;
  country: string;
  type: string;
}

export interface Tel {
  title: string;
  link: string;
}

export interface Email {
  title: string;
  link: string;
}

export interface Linkedin {
  title: string;
  link: string;
}

export interface Website {
  title: string;
  link: string;
}

export interface Github {
  title: string;
  link: string;
}

export interface UserContactsAndProfileData {
  avatar: string;
  about: About;
  location: Location;
  tel?: Tel;
  email: Email;
  linkedin: Linkedin;
  website: Website;
  github: Github;
}
