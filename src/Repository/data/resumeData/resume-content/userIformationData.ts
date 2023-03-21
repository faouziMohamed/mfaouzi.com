import { SITE_URL } from '@/lib/client-route.contant';

import { IUserContactsAndProfileData } from '@/types/portfolio/resume.types';

const websiteUrl = SITE_URL || 'https://mfaouzi.com';
export const userInformation: IUserContactsAndProfileData = {
  Avatar:
    'https://res.cloudinary.com/mfaouzi/image/upload/v1678704417/mfaouzi.com/me.jpg',
  About: {
    FirstName: 'Faouzoudine',
    LastName: 'Mohamed Faouzi',
    Profession: 'Full-stack software developer Angular/ReactJs • DotNet Core',
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
