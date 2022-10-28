import { useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';

export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

export function useSMallScreen() {
  return useMediaQuery('(min-width: 640px)');
}
