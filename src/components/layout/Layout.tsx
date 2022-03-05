import { Box } from '@mui/material';
import { ReactNode } from 'react';

import Header from './Header';

export default function Layout({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <Box className={`w-full ${className}`}>
      <Header />
      {children}
    </Box>
  );
}
