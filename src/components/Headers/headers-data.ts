import { IconType } from 'react-icons';
import { GoMarkGithub } from 'react-icons/go';
import {
  MdDoneAll,
  MdHome,
  MdMarkunreadMailbox,
  MdPermContactCalendar,
  MdPersonPin,
  MdWysiwyg,
} from 'react-icons/md';

export interface INavLink {
  name: string;
  href: string;
  Icon: IconType;
}

export const mainNavLinks: INavLink[] = [
  {
    name: 'Home',
    href: '/#',
    Icon: MdHome,
  },
  {
    name: 'About',
    href: '/#about',
    Icon: MdPersonPin,
  },
  {
    name: 'Projects',
    href: '/#projects',
    Icon: MdMarkunreadMailbox,
  },
  {
    name: 'Contacts',
    href: '/#contacts',
    Icon: MdPermContactCalendar,
  },
];
export const mainOtherLinks: INavLink[] = [
  {
    name: 'Skills',
    href: '/#skills',
    Icon: MdDoneAll,
  },
  {
    name: 'Resume',
    href: '/resume',
    Icon: MdWysiwyg,
  },
  {
    name: 'Github',
    href: 'https://github.com/faouziMohamed',
    Icon: GoMarkGithub,
  },
];
export const resumeNavLinks: INavLink[] = [
  {
    name: 'Home',
    href: '/#',
    Icon: MdHome,
  },
];
export const resumeOtherLinks = [
  {
    name: 'Github',
    href: 'https://github.com/faouziMohamed',
    Icon: GoMarkGithub,
  },
];
