import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import { IconType } from 'react-icons';
import { BsCircle, BsCircleSquare, BsDash } from 'react-icons/bs';
import { GrSpectrum } from 'react-icons/gr';
import { TbExternalLink } from 'react-icons/tb';

import UnStyledLink from '@/components/links/UnStyledLink';

import {
  Experience,
  ProjectTask,
  SubTask,
} from '@/types/portfolio/resume.types';

interface IExperienceSectionProps {
  experience: Experience;
}

export default function ExperienceSection(props: IExperienceSectionProps) {
  const { experience } = props;
  return (
    <Box component='section'>
      <Box className='flex flex-wrap items-center gap-1'>
        <h4 className='inline text-sm font-bold'>
          {experience.title}
          {', '}
        </h4>
        <Typography variant='body2' className='inline text-sm'>
          {experience.company}
        </Typography>
        {experience.companyLink && (
          <UnStyledLink
            href={experience.companyLink}
            aria-label={`Link to ${experience.company}`}
          >
            <IconButton
              size='small'
              className='dark:text-gray-100'
              aria-label={`Click to view ${experience.company} website`}
            >
              <TbExternalLink />
            </IconButton>
          </UnStyledLink>
        )}
      </Box>
      <Typography variant='body2' className='text-sm'>
        {experience.date} {' | '} {experience.city}
        {', '}
        {experience.country}
      </Typography>
      <h5 className='text-sm font-bold'>{experience.description.summary}</h5>
      <List
        id='individual-project-list'
        className='list-disc flex flex-col gap-2'
      >
        {experience.description.project.map((project) => (
          <ListItem
            key={project.task}
            data-project={project.summary}
            className='flex flex-col p-0 text-sm'
          >
            <ShowListItemWithIcon
              text={project.task}
              Icon={BsCircleSquare}
              iconSize={12}
            />
            <ProjectDetails project={project} />
          </ListItem>
        ))}
      </List>
      {experience.description?.technologies?.length && (
        <TechnologiesUsed techsUsed={experience.description.technologies} />
      )}
    </Box>
  );
}

function ShowListItemWithIcon(props: {
  text: string;
  Icon: IconType;
  iconSize: number;
}) {
  const { text, Icon, iconSize = 7 } = props;
  return (
    <Box className='flex w-full items-baseline gap-2'>
      <span className='shrink-0'>
        <Icon size={iconSize} />
      </span>
      <ListItemText className='text-sm'>
        <Typography variant='body2' className='text-sm'>
          {text}
        </Typography>
      </ListItemText>
    </Box>
  );
}

function ProjectDetails({ project }: { project: ProjectTask }) {
  return (
    <List className='w-full p-0 pl-2'>
      {project.summary && (
        <ListItem sx={{ p: 0 }}>
          <Typography className='text-sm inline-block'>
            <GrSpectrum className='inline mr-2' size='0.5rem' />
            <span>{project.summary}</span>
          </Typography>
        </ListItem>
      )}
      {project.subTasks.map((subTask) => (
        <ListItem key={subTask.subTask} className='flex flex-col p-0'>
          <ShowListItemWithIcon
            text={subTask.subTask}
            Icon={BsDash}
            iconSize={12}
          />
          <SubTaskDetails subTaskDetails={subTask.subTaskDetails} />
        </ListItem>
      ))}
      {project.technologies?.length && (
        <ListItem>
          <TechnologiesUsed techsUsed={project.technologies} />
        </ListItem>
      )}
    </List>
  );
}

function SubTaskDetails({
  subTaskDetails,
}: {
  subTaskDetails: SubTask['subTaskDetails'];
}) {
  if (!subTaskDetails?.length) return null;
  return (
    <List className='w-full p-0 pl-5'>
      {subTaskDetails.map((detail) => (
        <ListItem key={detail} className='p-0'>
          <ShowListItemWithIcon text={detail} Icon={BsCircle} iconSize={7} />
        </ListItem>
      ))}
    </List>
  );
}

function TechnologiesUsed({ techsUsed }: { techsUsed: string[] }) {
  return (
    <Typography className='text-sm'>
      <span className='font-bold'>Technologies used: </span>
      {techsUsed.join(' | ')}
    </Typography>
  );
}
