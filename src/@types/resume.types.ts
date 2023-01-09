import { ISkillsAndAbilities } from '@/services/data/resumeData/resume-content/skillsAndAbilities';

export interface IProfile {
  Description: string;
  Title: string;
}

export interface IDiploma {
  Institution: string;
  city: string;
  Title: string;
  Country: string;
  Date: string;
}

export interface IEducation {
  Title: string;
  Diploma: IDiploma[];
}

export interface ICertificate {
  Institution: string;
  Link: string;
  Title: string;
  Date: string;
}

export interface ICertification {
  Certificates: ICertificate[];
  Title: string;
}

export interface ISubTask {
  SubTask: string;
  SubTaskDetails: string[];
}

export interface ITask {
  Task: string;
  SubTasks: ISubTask[];
}

export interface IExperience {
  Company: string;
  CompanyLink?: string;
  Description: { Tasks: ITask[]; Title: string; Technologies: string[] };
  city: string;
  Title: string;
  Country: string;
  Date: string;
}

export interface IProfessionalExperience {
  Experiences: IExperience[];
  Title: string;
}

export interface IProjectDetail {
  StartDate: string;
  Description: string;
  Summary: string;
  EndDate: string;
  Name: string;
  Technologies: string[];
  SrcLink?: string;
  LiveLink?: string;
  Image?: string;
}

export interface IProject {
  ProjectDetails: IProjectDetail[];
  Title: string;
}

export interface IResumeData {
  UserInformation: IUserContactsAndProfileData;
  Profile: IProfile;
  SkillsAndAbilities: ISkillsAndAbilities;
  Education: IEducation;
  Certification: ICertification;
  ProfessionalExperience: IProfessionalExperience;
  Project: IProject;
}

export interface About {
  FirstName: string;
  LastName: string;
  Profession: string;
}

export interface Location {
  City: string;
  Country: string;
  Type: string;
}

export interface Tel {
  Title: string;
  Link: string;
}

export interface Email {
  Title: string;
  Link: string;
}

export interface Linkedin {
  Title: string;
  Link: string;
}

export interface Website {
  Title: string;
  Link: string;
}

export interface Github {
  Title: string;
  Link: string;
}

export interface IUserContactsAndProfileData {
  Avatar: string;
  About: About;
  Location: Location;
  Tel?: Tel;
  Email: Email;
  Linkedin: Linkedin;
  Website: Website;
  Github: Github;
}
