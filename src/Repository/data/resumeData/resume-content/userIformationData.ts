import { IUserContactsAndProfileData } from '@/types/portfolio/resume.types';

const websiteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mfaouzi.com';
export const userInformation: IUserContactsAndProfileData = {
  Avatar: '/images/userProfilePicture.jpeg',
  About: {
    FirstName: 'Faouzoudine',
    LastName: 'Mohamed Faouzi',
    Profession:
      'Full-stack software developer Angular/ReactJs • DotNet Core • Java',
  },
  Location: {
    City: 'Salé',
    Country: 'Morocco',
    Type: 'location',
  },
  // Tel: {
  //   Title: '+212 658 987 654', // Not my real phone number
  //   Link: '+212 658 987 654',
  // },
  Email: {
    Title: 'me@mfaouzi.com',
    Link: 'me@mfaouzi.com',
  },
  Linkedin: {
    Title: 'mohamed-faouzi',
    Link: 'https://www.linkedin.com/in/mohamed-faouzi',
  },
  Website: {
    Title: websiteUrl.replace(/https?:\/\//, ''),
    Link: websiteUrl,
  },
  Github: {
    Title: 'faouziMohamed',
    Link: 'https://github.com/faouziMohamed',
  },
};
