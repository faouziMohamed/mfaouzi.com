import { Box, Box as Section } from '@mui/material';

import SectionTitleWithBlob from '@/components/home/SectionTitleWithBlob';
import SVGBlob from '@/components/home/SVGBlob';

import CsharpIcon from '~/icons/csharp.svg';
import DockerIcon from '~/icons/docker.svg';
import FigmaIcon from '~/icons/figma.svg';
import GitIcon from '~/icons/git.svg';
import JsIcon from '~/icons/javascript.svg';
import MaterialUiIcon from '~/icons/material-ui.svg';
import MongoDbIcon from '~/icons/mongodb.svg';
import MysqlIcon from '~/icons/mysql.svg';
import NextJsIcon from '~/icons/nextjs.svg';
import NodeJsIcon from '~/icons/nodejs.svg';
import ReactJsIcon from '~/icons/reactjs.svg';
import SkillsBlob from '~/icons/skills-blob.svg';
import TailwindCssIcon from '~/icons/tailwindcss.svg';
import TypescriptIcon from '~/icons/typescript.svg';

import { SVGImageData } from '@/types/portfolio/portfolio.types';

// #region SkillsArray
const skillsTools: { name: string; Icon: SVGImageData }[] = [
  { name: 'Javascript', Icon: JsIcon },
  { name: 'Git', Icon: GitIcon },
  { name: 'Node.js', Icon: NodeJsIcon },
  { name: 'React.js', Icon: ReactJsIcon },
  { name: 'Typescript', Icon: TypescriptIcon },
  { name: 'C Sharp', Icon: CsharpIcon },
  { name: 'Next.js', Icon: NextJsIcon },
  { name: 'MongoDB', Icon: MongoDbIcon },
  { name: 'MySQL', Icon: MysqlIcon },
  { name: 'Material-UI', Icon: MaterialUiIcon },
  { name: 'Tailwind CSS', Icon: TailwindCssIcon },
  { name: 'Figma', Icon: FigmaIcon },
  { name: 'Docker', Icon: DockerIcon },
];

interface SkillsSectionProps {
  className?: string;
}

// #endregion SkillsArray

export default function SkillsAndStackSection({
  className = '',
}: SkillsSectionProps) {
  return (
    <Box className='flex w-full justify-center'>
      <Section
        id='skills'
        className={`flex max-w-4xl flex-col items-center justify-center gap-4 rounded 
      border bg-primary-100 bg-opacity-10 py-2 dark:border-dark-primary dark:bg-dark-500 
      dark:bg-opacity-80 ${className}`}
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
          <h3 className='text-center font-primary text-base font-bold text-primary-800 dark:text-primary-300'>
            Mostly used
          </h3>
        </Box>
        <Box>
          <Box className='relative flex flex-wrap justify-center gap-6'>
            {skillsTools.map((s) => (
              <Box
                key={s.name}
                className='flex flex-col items-center justify-center gap-1'
              >
                <s.Icon className='h-20 w-auto self-center' />
                <h4 className='font-[Roboto] text-sm font-bold'>{s.name}</h4>
              </Box>
            ))}
          </Box>
        </Box>
      </Section>
    </Box>
  );
}
