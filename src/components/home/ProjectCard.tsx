import {
  Box,
  Box as CardStats,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from '@mui/material';
import { MdStar } from 'react-icons/md';

import Button from '@/components/buttons/Button';

import GitForkIcon from '~/icons/git-fork.svg';

export interface ProjectDataProps {
  title: string;
  description: string;
}

export default function ProjectCard({ title, description }: ProjectDataProps) {
  return (
    <Card className='w-[18rem] bg-opacity-10'>
      <CardFront title={title} description={description} />
      <Box />
    </Card>
  );
}

function CardFront({ title, description }: ProjectDataProps) {
  return (
    <Box className='p-0'>
      <CardActionArea className='flex flex-col '>
        <CardMedia
          component='img'
          height='140'
          image='/icons/office-1.svg'
          alt='green iguana'
        />
        <CardContent className=''>
          <Typography
            gutterBottom
            variant='h5'
            className='font-primary text-base font-bold'
            component='div'
          >
            {title}
          </Typography>
          <Box className='h-[5rem] '>
            <Typography
              variant='body2'
              color='text.secondary'
              className='w-full line-clamp-4'
            >
              {description}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
      <Box className='flex items-end justify-between px-4 pb-1'>
        <CardActions className=''>
          <Button>More Details</Button>
        </CardActions>
        <CardStats className='flex items-end justify-between gap-2  pb-3'>
          <Stack direction='row' className='items-center justify-center'>
            <MdStar />
            <Typography variant='body2' color='text.secondary'>
              45k
            </Typography>
          </Stack>
          <Stack direction='row' className='items-center justify-center'>
            <GitForkIcon />
            <Typography variant='body2' color='text.secondary'>
              45k
            </Typography>
          </Stack>
        </CardStats>
      </Box>
    </Box>
  );
}
