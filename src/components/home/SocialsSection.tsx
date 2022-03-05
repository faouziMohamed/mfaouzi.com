import { Box, Box as Section } from '@mui/material';

import LayerIntro from '@/components/home/LayerIntro';
import UnstyledLink from '@/components/links/UnstyledLink';

import { DevDataTypes, SVGImageData } from '@/@types/data';

import FindMeOnSocialsBlob from '~/icons/findme-on-socials-blob.svg';
import FacebookIcon from '~/icons/logo_facebook.svg';
import GithubIcon from '~/icons/logo_github.svg';
import LinkedinIcon from '~/icons/logo_linkedin.svg';
import TwitterIcon from '~/icons/logo_twitter_bird.svg';

const socialIcons: { [key: string]: SVGImageData } = {
  facebook: FacebookIcon,
  github: GithubIcon,
  linkedin: LinkedinIcon,
  twitter: TwitterIcon,
};

export default function SocialsSection({ data }: { data: DevDataTypes }) {
  return (
    <Section className='relative flex flex-col items-center justify-center gap-6'>
      <LayerIntro message='Find me on socials' BlobComponent={SocialBlob} />
      <Box className='flex gap-4'>
        {data.socials.map(({ username, social }) => (
          <SocialIconLink
            key={social}
            // @ts-expect-error: key is not a string
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            href={`${data.profileLinks[social]}/${username}`}
            IconComponent={socialIcons[social]}
          />
        ))}
      </Box>
    </Section>
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
}: {
  IconComponent: SVGImageData;
  href: string;
}) {
  return (
    <UnstyledLink href={href}>
      <Box className='flex h-10 w-10 items-center justify-center'>
        <IconComponent className='h-full w-full object-cover' />
      </Box>
    </UnstyledLink>
  );
}