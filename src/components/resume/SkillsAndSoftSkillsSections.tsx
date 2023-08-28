import { Box, Stack, Typography } from '@mui/material';
import { Fragment } from 'react';

import { camelCaseToTitleCase } from '@/lib/utils';

import SectionTitle from '@/components/resume/SectionTitle';

import {
  ISubSectionData,
  SkillsAndAbilities,
} from '@/Repository/data/resumeData/resume-content/skillsAndAbilities';

export default function SkillsAndSoftSkillsSections(props: {
  skills: SkillsAndAbilities;
}) {
  const { skills: skillsAndAbilities } = props;
  const keys = Object.keys(skillsAndAbilities);
  return (
    <Stack component='section' className='gap-4 px-2'>
      {keys.map((sectionTitle) => (
        <Stack
          key={sectionTitle}
          className='gap-2'
          aria-label={`Section ${camelCaseToTitleCase(sectionTitle)}`}
        >
          <SectionTitle
            title={camelCaseToTitleCase(sectionTitle)}
            Icon={skillsAndAbilities[sectionTitle].icon}
          />
          <CreateSubSections
            isSkills={sectionTitle.toLowerCase() === 'skills'}
            subsections={skillsAndAbilities[sectionTitle].subsections}
          />
        </Stack>
      ))}
    </Stack>
  );
}

function CreateSubSections({
  subsections,
  isSkills = false,
}: {
  subsections: ISubSectionData;
  isSkills: boolean;
}) {
  const data = Object.keys(subsections);
  return (
    <>
      {data.map((t) => (
        <SubSection
          key={t}
          sectionName={camelCaseToTitleCase(t)}
          isSkills={isSkills}
          data={subsections[t]}
        />
      ))}
    </>
  );
}
function SubSection(props: {
  sectionName: string;
  data: string[];
  isSkills: boolean;
}) {
  const { sectionName, data, isSkills } = props;
  return (
    <Box
      sx={
        isSkills
          ? {
              border: '1px solid #fff',
              borderRadius: '0.2rem',
              px: '0.4rem',
              py: '0.3rem',
            }
          : {}
      }
    >
      <Typography
        component='h4'
        sx={{ fontSize: '0.9rem', fontWeight: 600, display: 'inline-block' }}
      >
        {sectionName}
      </Typography>{' '}
      <Typography
        sx={{
          fontSize: '0.8rem',
          fontWeight: 400,
          display: isSkills ? 'inline' : 'block',
        }}
      >
        {isSkills ? `(${data.join(' | ')})` : data.join(' | ')}
      </Typography>
    </Box>
  );
}

// function SubSection(props: { sectionName: string; data: string[] }) {
//   const { sectionName, data } = props;
//   return (
//     <Box
//       sx={{
//         border: '1px solid #fff',
//         borderRadius: '0.2rem',
//         px: '0.4rem',
//         py: '0.3rem',
//       }}
//     >
//       <Typography
//         component='h4'
//         sx={{ fontSize: '0.8rem', fontWeight: 600, display: 'inline-block' }}
//       >
//         {sectionName}
//       </Typography>{' '}
//       <Typography
//         sx={{ fontSize: '0.7rem', fontWeight: 400, display: 'inline' }}
//       >
//         ( {data.join(' | ')} )
//       </Typography>
//     </Box>
//   );
// }
