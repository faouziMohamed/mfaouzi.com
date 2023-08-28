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

import type { UserContactsAndProfileData } from '@/types/portfolio/resume.types';

interface UserInformationProps {
  data: UserContactsAndProfileData;
}

interface UserInformationData {
  Icon: IconType;
  title: string;
  link: string;
  prefix?: string;
}

export default function UserInformation({ data }: UserInformationProps) {
  const { about, location } = data;
  const { firstName, lastName, profession } = about;
  const { city, country } = location;
  const { tel, email, linkedin, github, website } = data;

  const userInformation: UserInformationData[] = [];
  if (tel)
    userInformation.push({ ...tel, Icon: MdOutlineLocalPhone, prefix: 'tel:' });
  userInformation.push(
    ...[
      { ...email, Icon: MdEmail, prefix: 'mailto:' },
      { ...linkedin, Icon: AiFillLinkedin },
      { ...github, Icon: AiOutlineGithub },
      { ...website, Icon: MdLanguage },
    ],
  );
  return (
    <Box
      className='flex flex-col items-center justify-center gap-4 text-center  msm:items-start'
      aria-label={"User's Information"}
      role='contentinfo'
    >
      <h1 className='text-3xl font-bold' aria-label='First Name and Last Name'>
        {firstName} {lastName}
      </h1>
      <h2 className='text-lg ' aria-label='Profession'>
        {profession}
      </h2>
      <Box
        className='flex w-full flex-col items-center justify-center text-lg'
        aria-details='loc-and-contact-info'
      >
        <Box
          className='flex flex-col gap-1 '
          aria-label={`Contact and location Information for ${firstName} ${lastName}`}
          id='loc-and-contact-info'
        >
          <Box
            className='flex items-center gap-2 text-[0.95rem]'
            aria-label='Location'
          >
            <MdOutlineLocationOn aria-hidden />
            <strong aria-label={`City: ${city}`} className='font-normal'>
              {city}, {country}
            </strong>
          </Box>
          {userInformation.map((value) => (
            <UnStyledLink
              className='flex items-center gap-2 px-1 py-[0.4rem] text-xs'
              key={value.title}
              href={`${value?.prefix || ''}${value.link}`}
              aria-label={value.title}
            >
              <value.Icon />
              <strong className='text-[0.95rem] font-normal'>
                {value.title}
              </strong>
            </UnStyledLink>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
