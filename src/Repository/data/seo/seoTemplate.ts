import {
  GUESTBOOK_PAGE,
  HOME_PAGE,
  NOT_FOUND_PAGE,
  RESUME_PAGE,
  SITE_URL,
} from '@/lib/client-route.contant';

import { userInformation } from '@/Repository/data/resumeData/resume-content/userIformationData';
import resumeMainData from '@/Repository/data/resumeData/resumeMainData';

export const seoTemplate = {
  title: 'Faouzi Mohamed',
  siteName: "Faouzi Mohamed's Portfolio",
  templateTitle: 'Home',
  description:
    'My personal Portfolio where I present myself, my skills, some projects etc. ',
  url: SITE_URL,
  logoUrl:
    'https://res.cloudinary.com/mfaouzi/image/upload/v1678704417/mfaouzi.com/me.jpg',
  pathname: '/',
  type: 'website',
  robots: 'follow, index',
  locale: 'en_US',
  imageWidth: '1200',
  imageHeight: '630',
  keywords: [
    'faouzi',
    'mohamed',
    'Faouzi Mohamed',
    'Portfolio',
    'developer',
    'web developer',
    'full-stack developer',
    'backend developer',
    'resume',
  ].join(', '),
};
export type SeoTemplate = typeof seoTemplate;

export const guestbookSeo: SeoTemplate = {
  ...seoTemplate,
  templateTitle: 'The Guestbook 📝',
  title: '📝 The Guestbook | Faouzi Mohamed',
  description:
    'The guestbook is a comment system that allows users to comment on a ' +
    'post and reply to other comments. ' +
    'Mark your presence in my portfolio by Giving a review, ' +
    'showing your appreciation, react to others comments...',
  pathname: GUESTBOOK_PAGE,
  keywords: [
    'guestbook',
    'comment',
    'review',
    'react',
    'reply',
    'developer',
    'portfolio',
    'faouzi mohamed',
  ].join(', '),
};

export const notFoundSeo: SeoTemplate = {
  ...seoTemplate,
  templateTitle: 'Page Not Found',
  title: 'Page Not Found | Faouzi Mohamed',
  description: 'The page you are looking for does not exist.',
  pathname: '/404',
  keywords: ['404', 'not found', 'page not found'].join(', '),
};

export const resumeSeo: SeoTemplate = {
  ...seoTemplate,
  templateTitle: `${userInformation.About.LastName}'s Resume`,
  title: `${userInformation.About.LastName} | ${userInformation.About.Profession}`,
  description: resumeMainData.Profile.Description,
  pathname: RESUME_PAGE,
  keywords: ['resume', 'cv', 'developer', 'portfolio', 'faouzi mohamed'].join(
    ', ',
  ),
};

const pageSEOs = {
  [HOME_PAGE]: seoTemplate,
  [GUESTBOOK_PAGE]: guestbookSeo,
  [RESUME_PAGE]: resumeSeo,
  [NOT_FOUND_PAGE]: notFoundSeo,
} as const;
export const PAGE_URLS = Object.keys(pageSEOs) as PageUrl[];

export type PageUrl = keyof typeof pageSEOs;

export default function getPageSeo(page: PageUrl): SeoTemplate {
  return pageSEOs[page] || seoTemplate;
}
export const SEO_TEMPLATE_FILE_PATH = new URL(import.meta.url).pathname;
