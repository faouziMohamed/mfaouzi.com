import { SITE_URL } from '@/lib/client-route.contant';

import { UserContactsAndProfileData } from '@/types/portfolio/resume.types';

const websiteUrl = SITE_URL || 'https://mfaouzi.com';
export const userInformation: UserContactsAndProfileData = {
  avatar:
    'https://res.cloudinary.com/mfaouzi/image/upload/v1678704417/mfaouzi.com/me.jpg',
  about: {
    firstName: 'Faouzoudine',
    lastName: 'Mohamed Faouzi',
    profession:
      'Software Developer | Fullstack developer (Spring Boot/ReactJs/Angular)',
  },
  location: {
    city: 'Salé',
    country: 'Morocco',
    type: 'location',
  },
  // Tel: {
  //   Title: '+212 658 987 654', // Not my real phone number
  //   Link: '+212 658 987 654',
  // },
  email: {
    title: 'me@mfaouzi.com',
    link: 'me@mfaouzi.com',
  },
  linkedin: {
    title: 'mohamed-faouzi',
    link: 'https://www.linkedin.com/in/mohamed-faouzi',
  },
  website: {
    title: websiteUrl.replace(/https?:\/\//, ''),
    link: websiteUrl,
  },
  github: {
    title: 'faouziMohamed',
    link: 'https://github.com/faouziMohamed',
  },
};
