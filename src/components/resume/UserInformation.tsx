import { Box } from '@mui/material';
import { IconType } from 'react-icons';
import { AiFillLinkedin, AiOutlineGithub } from 'react-icons/ai';
import {
  MdEmail,
  MdLanguage,
  MdOutlineLocalPhone,
  MdOutlineLocationOn,
} from 'react-icons/md';

import UnStyledLink from '@/components/links/UnStyledLink';

import type { IUserContactsAndProfileData } from '@/types/portfolio/resume.types';

interface IUserInformationProps {
  data: IUserContactsAndProfileData;
}

interface IUserInformation {
  Icon: IconType;
  Title: string;
  Link: string;
  Prefix?: string;
}

export default function UserInformation({ data }: IUserInformationProps) {
  const { About, Location } = data;
  const { FirstName, LastName, Profession } = About;
  const { City, Country } = Location;
  const { Tel, Email, Linkedin, Github, Website } = data;

  const userInformation: IUserInformation[] = [];
  if (Tel)
    userInformation.push({ ...Tel, Icon: MdOutlineLocalPhone, Prefix: 'tel:' });
  userInformation.push(
    ...[
      { ...Email, Icon: MdEmail, Prefix: 'mailto:' },
      { ...Linkedin, Icon: AiFillLinkedin },
      { ...Github, Icon: AiOutlineGithub },
      { ...Website, Icon: MdLanguage },
    ],
  );
  //     [
  //   { ...Tel, Icon: MdOutlineLocalPhone, Prefix: 'tel:' },
  //   { ...Email, Icon: MdEmail, Prefix: 'mailto:' },
  //   { ...Linkedin, Icon: AiFillLinkedin },
  //   { ...Github, Icon: AiOutlineGithub },
  //   { ...Website, Icon: MdLanguage },
  // ];
  return (
    <Box
      className='flex flex-col items-center justify-center gap-4 text-center  msm:items-start'
      aria-label={"User's Information"}
      role='contentinfo'
    >
      <h1 className='text-3xl font-bold' aria-label='First Name and Last Name'>
        {FirstName} {LastName}
      </h1>
      <h2 className='text-lg ' aria-label='Profession'>
        {Profession}
      </h2>
      <Box
        className='flex w-full flex-col items-center justify-center text-lg'
        aria-details='loc-and-contact-info'
      >
        <Box
          className='flex flex-col gap-1 '
          aria-label={`Contact and location Information for ${FirstName} ${LastName}`}
          id='loc-and-contact-info'
        >
          <Box
            className='flex items-center gap-2 text-[0.95rem]'
            aria-label='Location'
          >
            <MdOutlineLocationOn aria-hidden />
            <strong aria-label={`City: ${City}`} className='font-normal'>
              {City}, {Country}
            </strong>
          </Box>
          {userInformation.map((value) => (
            <UnStyledLink
              className='flex items-center gap-2 py-[0.4rem] px-1 text-xs'
              key={value.Title}
              href={`${value?.Prefix || ''}${value.Link}`}
              aria-label={value.Title}
            >
              <value.Icon />
              <strong className='text-[0.95rem] font-normal'>
                {value.Title}
              </strong>
            </UnStyledLink>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
