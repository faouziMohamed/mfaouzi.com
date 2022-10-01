import {
  Box,
  Box as CardStats,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import type { FC, ReactNode } from 'react';
import { useState } from 'react';
import { MdStar } from 'react-icons/md';

import Button from '@/components/buttons/Button';
import UnStyledLink from '@/components/links/UnStyledLink';
import FZDialog from '@/components/misc/Dialog';

import type { IProjectDataType } from '@/@types/data';
import { startCaseAll } from '@/utils/utils';

import ExternalLinkIcon from '~/icons/external-link-full.svg';
import GitForkIcon from '~/icons/git-fork.svg';
import GihubLinkIcon from '~/icons/github-link.svg';

const CardBody: FC<{ children: ReactNode; className?: string }> = ({
  children,
  className = '',
}) => <Box className={`w-full px-2 ${className}`}>{children}</Box>;
const CardHeader = CardBody;

export default function ProjectCard(props: IProjectDataType) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Card className='w-[18rem] bg-opacity-10 py-2 pt-0 dark:bg-dark-100 dark:text-gray-100 dark:shadow-sm dark:shadow-dark-primary'>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <CardFront {...props} onClick={() => setOpen(true)} />
      <FZDialog open={open} setOpen={setOpen}>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <CardBack {...props} />
      </FZDialog>
    </Card>
  );
}

function CardFront(props: IProjectDataType & { onClick: () => void }) {
  const { title, description, image } = props;
  const { forks = 0, stars = 0 } = props;
  const { onClick } = props;
  return (
    <Box className='p-0'>
      <CardActionArea className='flex flex-col' onClick={onClick}>
        <CardMedia
          component='img'
          height='140'
          image={image || '/icons/office-1.svg'}
          alt='green iguana'
        />
        <CardContent className='w-full'>
          <Typography
            gutterBottom
            variant='h5'
            className='font-primary text-base font-bold'
            component='div'
          >
            {title}
          </Typography>
          <Box className='h-[5rem]  '>
            <Typography
              variant='body2'
              // color='text.secondary'
              className='w-full text-dark-50 line-clamp-4 dark:text-gray-200'
            >
              {description}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
      <Box className='flex items-end justify-between px-4 pb-1'>
        <CardActions className=''>
          <Button onClick={onClick}>More Details</Button>
        </CardActions>
        <RepoStats forks={forks} stars={stars} />
      </Box>
    </Box>
  );
}

export function CardBack(props: IProjectDataType) {
  const { title, description, languages = ['No tech used'] } = props;
  const { forks = 0, stars = 0 } = props;
  const { repoUrl, liveUrl } = props;

  return (
    <Card className='max-w-xl bg-opacity-10 pt-2 dark:bg-dark-primary dark:text-gray-100'>
      <CardHeader>
        <Typography
          variant='h5'
          className='border-b py-2 text-center font-primary text-base font-bold'
          component='div'
        >
          {title}
        </Typography>
      </CardHeader>
      <CardBody className='flex gap-4 border-y px-2'>
        <Box className='flex flex-col gap-3'>
          <Typography variant='body1' className='w-full py-1'>
            <span className='block pr-1 font-bold'>About</span>
            <span className='block text-dark-100 dark:text-gray-200'>
              {description}
            </span>
          </Typography>
          <Typography variant='body2' className='w-full'>
            <span className='block pr-1 font-bold'>Tools</span>
            <span className='block text-dark-100 dark:text-gray-200'>
              {startCaseAll(languages.join(', '))}
            </span>
          </Typography>
          <Typography variant='body2' className='w-full '>
            <span className='block pr-1 font-bold'>Stats</span>
            <RepoStats forks={forks} stars={stars} />
          </Typography>
        </Box>
        <Box className='flex flex-col items-center self-center'>
          <IconButton>
            <UnStyledLink href={liveUrl || '#'} openNewTab>
              <ExternalLinkIcon className='rounded-full bg-[#427177] text-5xl text-white hover:bg-[#003A42]' />
            </UnStyledLink>
          </IconButton>
          <IconButton>
            <UnStyledLink href={repoUrl} openNewTab>
              <GihubLinkIcon className='rounded-full bg-[#427177] text-5xl text-white hover:bg-[#003A42]' />
            </UnStyledLink>
          </IconButton>
        </Box>
      </CardBody>
    </Card>
  );
}

function RepoStats(props: {
  forks: number;
  stars: number;
  className?: string;
}) {
  const { forks, stars, className = '' } = props;
  return (
    <CardStats className={`flex items-end gap-2 pb-3 ${className}`}>
      <Stack direction='row' className='items-center justify-center'>
        <MdStar className='text-dark-200 dark:text-gray-100' />
        <Typography variant='body2' className='text-dark-50 dark:text-gray-200'>
          {stars}
        </Typography>
      </Stack>
      <Stack direction='row' className='items-center justify-center'>
        <GitForkIcon className='text-dark-200 dark:text-gray-200' />
        <Typography variant='body2' className='text-dark-50 dark:text-gray-200'>
          {forks}
        </Typography>
      </Stack>
    </CardStats>
  );
}
