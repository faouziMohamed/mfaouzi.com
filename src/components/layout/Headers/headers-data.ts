import { IconType } from 'react-icons';
import { MdDoneAll, MdHome, MdPermContactCalendar } from 'react-icons/md';
import { SlBookOpen } from 'react-icons/sl';

import {
  GUESTBOOK_PAGE,
  HOME_ABOUT_PAGE,
  HOME_CONTACTS_PAGE,
  HOME_PAGE,
  HOME_SKILLS_PAGE,
} from '@/lib/client-route.contant';

export interface INavLink {
  name: string;
  href: string;
  Icon?: IconType;
}

export const mainNavLinks: INavLink[] = [
  {
    name: 'Home',
    href: HOME_PAGE,
    Icon: MdHome,
  },
  {
    name: 'Guestbook',
    href: GUESTBOOK_PAGE,
    Icon: SlBookOpen,
  },

  {
    name: 'Contacts',
    href: HOME_CONTACTS_PAGE,
    Icon: MdPermContactCalendar,
  },
];

export const mainOtherLinks: INavLink[] = [
  {
    name: 'About',
    href: HOME_ABOUT_PAGE,
    Icon: MdDoneAll,
  },
  {
    name: 'Skills',
    href: HOME_SKILLS_PAGE,
    Icon: MdDoneAll,
  },
];
export const resumeNavLinks: INavLink[] = [
  {
    name: 'Home',
    href: HOME_PAGE,
    Icon: MdHome,
  },
  {
    name: 'About',
    href: HOME_ABOUT_PAGE,
    Icon: MdDoneAll,
  },
];
export const resumeOtherLinks = [];
