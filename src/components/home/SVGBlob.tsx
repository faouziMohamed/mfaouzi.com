import { Box } from '@mui/material';

import { SVGImageData } from '@/types/portfolio/portfolio.types';

interface SVGBlobProps {
  twBottom: string;
  twHeight?: string;
  twLeft?: string;
  twRight?: string;
  className?: string;
  Blob: SVGImageData;
}

export default function SVGBlob(props: SVGBlobProps) {
  const { twBottom, twHeight = '', twLeft = '', twRight = '', Blob } = props;
  const { className = '' } = props;
  return (
    <Box className={`absolute w-full ${twBottom}`}>
      <Blob
        className={`relative  w-full object-cover ${twHeight} ${twLeft} ${twRight} ${className}`}
      />
    </Box>
  );
}
