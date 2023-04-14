import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import dynamic from 'next/dynamic';
import type { FC, ReactNode } from 'react';
import { useState } from 'react';

import clsxm, { startCaseAll } from '@/lib/utils';

import Button from '@/components/buttons/Button';
import UnStyledLink from '@/components/links/UnStyledLink';

import ExternalLinkIcon from '~/icons/external-link-full.svg';
import GitHubLinkIcon from '~/icons/github-link.svg';
import CodingDark from '~/images/projects/coding-dark.svg';
import CodingLight from '~/images/projects/coding-light.svg';

import { IProjectDetail } from '@/types/portfolio/resume.types';

const FZDialog = dynamic(() => import('@/components/Dialogs/Dialog'));

const CardBody: FC<{ children: ReactNode; className?: string }> = ({
  children,
  className = '',
}) => <Box className={`w-full px-2 ${className}`}>{children}</Box>;
const CardHeader = CardBody;
export type ProjectCardProps = Omit<
  IProjectDetail,
  'Summary' | 'EndDate' | 'StartDate'
>;
export default function ProjectCard(props: ProjectCardProps) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Card
      className={clsxm(
        'w-full bg-opacity-10 py-2 pt-0 dark:bg-dark-100 xs:w-[18rem] ',
        'dark:text-gray-100 dark:shadow-sm dark:shadow-dark-primary ',
      )}
    >
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <CardFront {...props} onClick={() => setOpen(true)} />
      {open && (
        <FZDialog open={open} setOpen={setOpen}>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <CardBack {...props} />
        </FZDialog>
      )}
    </Card>
  );
}

function CardFront(props: ProjectCardProps & { onClick: () => void }) {
  const { Name, Description, onClick } = props;

  return (
    <Box className='p-0'>
      <CardActionArea className='flex flex-col' onClick={onClick}>
        <CodingDark className='hidden h-[13rem] w-full bg-slate-100 py-4 dark:block dark:bg-slate-400' />
        <CodingLight className='h-[13rem] w-full bg-slate-100 py-4 dark:hidden' />
        <CardContent className='w-full'>
          <h3 className='font-primary text-base font-bold'>{Name}</h3>
          <Box className='h-[5rem]  '>
            <p className='line-clamp-4 w-full text-dark-50 dark:text-gray-200'>
              {Description}
            </p>
          </Box>
        </CardContent>
      </CardActionArea>
      <Box className='flex items-end justify-between px-4 pb-1'>
        <CardActions>
          <Button
            aria-label='Open a modal to view details about the project'
            onClick={onClick}
          >
            More Details
          </Button>
        </CardActions>
      </Box>
    </Box>
  );
}

export function CardBack(props: Omit<ProjectCardProps, 'Image'>) {
  const { Name, Description, Technologies = ['No tech used'] } = props;
  const { SrcLink, LiveLink } = props;
  return (
    <Card className='max-w-xl bg-opacity-10 pt-2 dark:bg-dark-primary dark:text-gray-100'>
      <CardHeader>
        <h3 className=' py-2 text-center font-primary text-base font-bold'>
          {Name}
        </h3>
      </CardHeader>
      <CardBody className='flex gap-4 border-y p-2'>
        <Box className='flex flex-col gap-3'>
          <p className='w-full py-1'>
            <span className='block pr-1 font-bold'>About</span>
            <span className='block text-dark-100 dark:text-gray-200'>
              {Description}
            </span>
          </p>
          <p className='w-full'>
            <span className='block pr-1 font-bold'>Tools</span>
            <span className='block text-dark-100 dark:text-gray-200'>
              {startCaseAll(Technologies.join(', '))}
            </span>
          </p>
        </Box>
        <Box className='flex flex-col items-center self-center'>
          {LiveLink && (
            <IconButton aria-label='Link to the projects live' href={LiveLink}>
              <UnStyledLink
                href={LiveLink || '#'}
                openNewTab
                aria-label={"Link to the project's live site"}
              >
                <ExternalLinkIcon className='rounded-full bg-[#427177] text-5xl text-white hover:bg-[#003A42]' />
              </UnStyledLink>
            </IconButton>
          )}
          {SrcLink && (
            <IconButton aria-label='Button to view the source code'>
              <UnStyledLink
                href={SrcLink}
                openNewTab
                aria-label={"Click to view the project's repository"}
              >
                <GitHubLinkIcon className='rounded-full bg-[#427177] text-5xl text-white hover:bg-[#003A42]' />
              </UnStyledLink>
            </IconButton>
          )}
        </Box>
      </CardBody>
    </Card>
  );
}
