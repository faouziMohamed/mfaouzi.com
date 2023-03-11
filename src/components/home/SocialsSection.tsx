import { Box } from '@mui/material';
import { motion, Variants } from 'framer-motion';

import LayerIntro from '@/components/home/LayerIntro';
import UnStyledLink from '@/components/links/UnStyledLink';

import FindMeOnSocialsBlob from '~/icons/findme-on-socials-blob.svg';
import FacebookIcon from '~/icons/logo_facebook.svg';
import GithubIcon from '~/icons/logo_github.svg';
import LinkedinIcon from '~/icons/logo_linkedin.svg';
import TwitterIcon from '~/icons/logo_twitter_bird.svg';

import { DevDataTypes, SVGImageData } from '@/types/portfolio/portfolio.types';

const socialIcons: { [key: string]: SVGImageData } = {
  facebook: FacebookIcon,
  github: GithubIcon,
  linkedin: LinkedinIcon,
  twitter: TwitterIcon,
};

interface SocialSectionProps {
  data: DevDataTypes;
  className?: string;
}

const cardVariants: Variants = {
  offscreen: {
    opacity: 0,
    y: 25,
    transition: {
      type: 'keyframes',
      ease: 'easeIn',
      duration: 1,
    },
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

export default function SocialsSection(props: SocialSectionProps) {
  const { data, className = '' } = props;
  return (
    <motion.section
      initial='offscreen'
      whileInView='onscreen'
      viewport={{ once: false, amount: 0.5 }}
      variants={cardVariants}
      className={`relative  flex w-full flex-col items-center justify-center gap-6 ${className}`}
    >
      <LayerIntro message='Find me on socials' BlobComponent={SocialBlob} />
      <Box className='flex gap-4'>
        {Object.keys(data.socials).map(
          (key) =>
            socialIcons[key] && (
              <SocialIconLink
                key={key}
                // @ts-expect-error: key is not a string
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
                href={data.socials[key].url}
                IconComponent={socialIcons[key]}
                aria-label={key}
              />
            ),
        )}
      </Box>
    </motion.section>
  );
}

function SocialBlob() {
  return (
    <Box className='relative -mt-1 w-full'>
      <FindMeOnSocialsBlob className='absolute h-5 w-full object-cover' />
    </Box>
  );
}

function SocialIconLink({
  IconComponent,
  href,
  'aria-label': ariaLabel,
}: {
  IconComponent: SVGImageData;
  href: string;
  'aria-label': string;
}) {
  return (
    <UnStyledLink href={href} aria-label={`social link ${ariaLabel}`}>
      <Box className='flex h-10 w-10 items-center justify-center'>
        <IconComponent className='h-full w-full object-cover' />
      </Box>
    </UnStyledLink>
  );
}
