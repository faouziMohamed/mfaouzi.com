import createCache from '@emotion/cache';
import clsx, { ClassValue } from 'clsx';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { twMerge } from 'tailwind-merge';

import { SeoTemplate } from '@/Repository/data/seo/seoTemplate';

export const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const startCase = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

export const startCaseAll = (str: string) => str.replace(/\w\S*/g, startCase);
export const capitalize = (str: string) => startCase(str);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const camelCaseToTitleCase = (str: string) => {
  const regex = /([A-Z])(?=[A-Z][a-z])|([a-z])(?=[A-Z])/g;
  return startCaseAll(str.replace(regex, '$& '));
};
dayjs.extend(relativeTime);
export function formatDate(date: Date): string {
  return dayjs().to(dayjs(date));
}

type OpenGraphType = {
  siteName: string;
  description: string;
  templateTitle?: string;
  logo?: string;
  theme?: string;
};

export function openGraphImage(props: OpenGraphType): string {
  const { siteName, templateTitle, description, theme = 'light' } = props;
  const {
    logo = 'https://avatars.githubusercontent.com/u/57812398?s=800&v=4',
  } = props;
  const ogLogo = logo;
  const ogSiteName = siteName.trim();
  const ogTemplateTitle = templateTitle ? templateTitle.trim() : undefined;
  const ogDesc = description.trim();
  const query = new URLSearchParams({
    siteName: ogSiteName,
    description: ogDesc,
    logo: ogLogo,
    theme,
  });

  if (ogTemplateTitle) {
    query.append('templateTitle', ogTemplateTitle);
  }
  return `https://og.mfaouzi.com/api/general?${query.toString()}`;
}

export function promisify<T>(data: T): Promise<T> {
  return new Promise((resolve, reject) => {
    try {
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}

/** Merge classes with tailwind-merge with clsx full feature */
export default function clsxm(...classes: ClassValue[]) {
  return twMerge(clsx(...classes));
}

export function createEmotionCache() {
  return createCache({ key: 'mui', prepend: true });
}

export function calculatePageTitle(seo: SeoTemplate) {
  return seo.templateTitle
    ? `${seo.templateTitle} | ${seo.siteName}`
    : seo.title;
}

export function getOgImage(seoTemplate: SeoTemplate) {
  return openGraphImage({
    description: seoTemplate.description,
    siteName: seoTemplate.siteName,
    templateTitle: seoTemplate.templateTitle,
    logo: seoTemplate.logoUrl,
    theme: 'light',
  });
}
