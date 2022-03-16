import { Box, Box as Section, Typography } from '@mui/material';

import SectionTitleWithBlob from '@/components/home/SectionTitleWithBlob';
import SVGBlob from '@/components/home/SVGBlob';

import { SVGImageData } from '@/@types/data';

import DockerIcon from '~/icons/docker.svg';
import FigmaIcon from '~/icons/figma.svg';
import GitIcon from '~/icons/git.svg';
import JsIcon from '~/icons/javascript.svg';
import MaterialUiIcon from '~/icons/materialUi.svg';
import MongoDbIcon from '~/icons/mongodb.svg';
import MysqlIcon from '~/icons/mysql.svg';
import NextJsIcon from '~/icons/nextjs.svg';
import NodeJsIcon from '~/icons/nodejs.svg';
import ReactJsIcon from '~/icons/reactjs.svg';
import SkillsBlob from '~/icons/skills-blob.svg';
import TailwindCssIcon from '~/icons/tailwindcss.svg';
import TypescriptIcon from '~/icons/typescript.svg';

// #region SkillsArray
const skillsTools: { name: string; icon: SVGImageData }[] = [
  { name: 'Javascript', icon: JsIcon },
  { name: 'Git', icon: GitIcon },
  { name: 'Node.js', icon: NodeJsIcon },
  { name: 'React.js', icon: ReactJsIcon },
  { name: 'Typescript', icon: TypescriptIcon },
  { name: 'Next.js', icon: NextJsIcon },
  { name: 'MongoDB', icon: MongoDbIcon },
  { name: 'MySQL', icon: MysqlIcon },
  {
    name: 'Material-UI',
    // eslint-disable-next-line react/jsx-props-no-spreading
    icon: ({ ...props }) => <MaterialUiIcon {...props} fill='#007fff' />,
  },
  { name: 'Tailwind CSS', icon: TailwindCssIcon },
  { name: 'Figma', icon: FigmaIcon },
  { name: 'Docker', icon: DockerIcon },
];
interface SkillsSectionProps {
  className?: string;
}
// #endregion SkillsArray

export default function SkilsAndStackSection({
  className = '',
}: SkillsSectionProps) {
  return (
    <Section
      className={`flex flex-col items-center justify-center gap-4 ${className}`}
    >
      <SectionTitleWithBlob
        title='Skills & Stacks'
        BlobComponent={() => (
          <SVGBlob
            Blob={SkillsBlob}
            twHeight='h-[1.05rem]'
            twBottom='-bottom-[.89rem]'
          />
        )}
      />
      <Box className='flex w-full justify-start'>
        <Typography
          variant='h6'
          className='text-center font-primary text-base font-bold text-primary-800'
        >
          Mostly used
        </Typography>
      </Box>
      <Box>
        <Box className='relative flex flex-wrap justify-center gap-6'>
          {skillsTools.map((s) => (
            <Box
              key={s.name}
              className='flex flex-col items-center justify-center gap-1'
            >
              <s.icon className='h-20 w-auto self-center' />
              <Typography variant='body2' className='font-[Roboto] font-bold'>
                {s.name}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Section>
  );
}
