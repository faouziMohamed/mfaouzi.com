import { Box } from '@mui/material';

import { SVGImageData } from '@/@types/data';

interface SVGBlobProps {
  twBottom: string;
  twHeight: string;
  Blob: SVGImageData;
}

export default function SVGBlob({ twBottom, twHeight, Blob }: SVGBlobProps) {
  return (
    <Box className={`absolute w-full ${twBottom}`}>
      <Blob className={`relative  w-full object-cover ${twHeight}`} />
    </Box>
  );
}
