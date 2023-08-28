import { Box, IconButton, Typography } from '@mui/material';
import { TbExternalLink } from 'react-icons/tb';

import UnStyledLink from '@/components/links/UnStyledLink';

import { ProjectDetail } from '@/types/portfolio/resume.types';

interface IProjectSectionProps {
  project: ProjectDetail;
}

export default function ProjectSection({ project }: IProjectSectionProps) {
  return (
    <Box className='border-b pb-2 last:border-0'>
      <Box className='flex flex-wrap items-center gap-1'>
        <h4 className='inline text-sm font-bold'>
          {project.name}
          {project.srcLink && (
            <UnStyledLink
              href={project.srcLink}
              aria-label={`Link to project's ${project.name} website or repository`}
            >
              <IconButton
                size='small'
                className='dark:text-gray-100'
                aria-label={`Click to open ${project.name} website or repository`}
              >
                <TbExternalLink />
              </IconButton>
            </UnStyledLink>
          )}
          {project.summary && ', '}
        </h4>
        <Typography variant='body2' className='inline text-sm'>
          {project.summary}
        </Typography>
      </Box>
      <Typography variant='body2' className='text-sm'>
        {project.startDate}
        {!!project.endDate && ' - '}{' '}
        {project.endDate !== '-1' ? project.endDate : 'Present'}
      </Typography>
      <h5 className='text-sm'>{project.description}</h5>
      <Typography variant='body2' className='text-sm'>
        <span className='font-bold'>Technologies used: </span>
        {project.technologies.join(' | ')}
      </Typography>
    </Box>
  );
}
