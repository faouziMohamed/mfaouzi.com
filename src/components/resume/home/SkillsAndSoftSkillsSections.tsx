import { Box, Stack } from '@mui/material';

import SectionTitle from '@/components/resume/home/SectionTitle';

import {
  ISkillsAndAbilities,
  ISubSectionData,
} from '@/services/data/resumeData/resume-content/skillsAndAbilities';
import { camelCaseToTitleCase } from '@/utils/utils';

export default function SkillsAndSoftSkillsSections(props: {
  skills: ISkillsAndAbilities;
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
      <h4 className='text-xl font-[400]'>{sectionName}</h4>
      <p className='font-[300]'>{data.join(' | ')}</p>
    </Box>
  );
}
