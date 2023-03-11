import { Box } from '@mui/material';

import clsxm from '@/lib/utils';

interface SectionTitleProps {
  title: string;
  className?: string;
  BlobComponent: () => JSX.Element;
}

export default function SectionTitleWithBlob({
  title,
  BlobComponent,
  className: cls = '',
}: SectionTitleProps) {
  const className = clsxm(
    `relative flex w-full flex-col items-center border-bs border-b-black 
    dark:border-b-gray-100 max-w-[15rem]`,
    cls,
  );
  return (
    <Box className={className}>
      <h2 className='text-center font-primary text-2xl font-[700] leading-6 '>
        {title}
      </h2>
      {BlobComponent ? <BlobComponent /> : null}
    </Box>
  );
}
