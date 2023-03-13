import { Box as Section, Typography } from '@mui/material';
import Image from 'next/image';

import {
  HOME_CONTACTS_PAGE,
  HOME_PROJECTS_PAGE,
  HOME_SKILLS_PAGE,
} from '@/lib/client-route.contant';
import clsxm from '@/lib/utils';

import UnderlineLink from '@/components/links/UnderlineLink';

export default function BriefSummarySection() {
  return (
    <Section
      component='section'
      className={clsxm(
        'flex w-full max-w-[50rem] items-center gap-5',
        'flex-col  md:flex-row md:justify-center lg:flex-col',
        'drops-shadow rounded-lg',
        'self-stretch bg-primary-50/10 py-4 px-2',
      )}
      id='brief-summary'
    >
      <div className='shrink-0'>
        <Image
          src='https://res.cloudinary.com/mfaouzi/image/upload/c_scale,q_50,w_189/v1678703340/mfaouzi.com/dev/dev-coder.gif'
          alt='Ghost developer'
          width='250'
          height='250'
        />
      </div>
      <div className='flex flex-col gap-4 text-center'>
        <Typography className='texts-sm'>
          I&apos;ve built different types of{' '}
          <UnderlineLink
            className='font-[450] text-primary-500'
            href={HOME_PROJECTS_PAGE}
          >
            projects
          </UnderlineLink>{' '}
          using different type of{' '}
          <UnderlineLink
            className='font-[450] text-primary-500'
            href={HOME_SKILLS_PAGE}
          >
            stacks
          </UnderlineLink>{' '}
          work with amazing people in several domains and I am always looking
          for new opportunities to learn and grow.
        </Typography>

        <Typography className='text-sm'>
          <UnderlineLink
            className='font-[400] text-primary-500'
            href={HOME_CONTACTS_PAGE}
          >
            Contact
          </UnderlineLink>{' '}
          me if you want to work together or just say hi!
        </Typography>
      </div>

      {/* <ButtonLink href={GUESTBOOK_PAGE} className='guestbook-btn'> */}
      {/*   <span className='guestbook-btn--text'>GUESTBOOK</span> */}
      {/* </ButtonLink> */}
    </Section>
  );
}
