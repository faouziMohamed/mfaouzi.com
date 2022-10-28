import { Box, Stack, Typography } from '@mui/material';

import skillsAndAbilities, {
  ISubSectionData,
} from '@/data/resume/resumeData/skillsAndAbilities';

import SectionTitle from '@/components/resume/home/SectionTitle';

import { camelCaseToTitleCase } from '@/utils/utils';

export default function DetailsSections() {
  const keys = Object.keys(skillsAndAbilities);
  return (
    <Stack component='section' className='gap-4'>
      {keys.map((sectionTitle) => (
        <Stack key={sectionTitle} className='gap-2'>
          <SectionTitle
            title={camelCaseToTitleCase(sectionTitle)}
            Icon={skillsAndAbilities[sectionTitle].Icon}
          />
          <CreateSubSections
            subsections={skillsAndAbilities[sectionTitle].subsections}
          />
        </Stack>
      ))}
    </Stack>
  );
}

function CreateSubSections({ subsections }: { subsections: ISubSectionData }) {
  const data = Object.keys(subsections);
  return (
    <>
      {data.map((t) => (
        <SubSection
          key={t}
          sectionName={camelCaseToTitleCase(t)}
          data={subsections[t]}
        />
      ))}
    </>
  );
}

function SubSection(props: { sectionName: string; data: string[] }) {
  const { sectionName, data } = props;
  return (
    <Box>
      <Typography component='h4' variant='subtitle2' className='text-xl'>
        {sectionName}
      </Typography>
      <Typography variant='body2' className=''>
        {data.join(' | ')}
      </Typography>
    </Box>
  );
}
