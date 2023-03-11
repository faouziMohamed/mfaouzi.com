import { IconButton, IconButtonProps } from '@mui/material';
import { useEffect, useState } from 'react';
import { MdNightlightRound, MdWbSunny } from 'react-icons/md';

import clsxm from '@/lib/utils';

import { useNextTheme } from '@/styles/themes/theme-color';

type ToggleThemeButtonProps = {
  hasDarkBg?: boolean;
  className?: string;
  size?: IconButtonProps['size'];
};
export default function ToggleThemeButton(props: ToggleThemeButtonProps) {
  const { hasDarkBg = false, className = '', size = 'medium' } = props;
  const { theme: themeName, updateTheme } = useNextTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  const color = hasDarkBg ? 'text-gray-300' : 'text-gray-800';
  return (
    <IconButton
      size={size}
      className={clsxm(color, 'dark:text-yellow-300', className)}
      onClick={updateTheme}
      aria-label={`Toggle ${themeName} theme`}
      aria-expanded={false}
    >
      {themeName === 'dark' ? (
        <MdWbSunny fontSize='1.9rem' tabIndex={0} />
      ) : (
        <MdNightlightRound fontSize='1.9rem' tabIndex={0} />
      )}
    </IconButton>
  );
}
