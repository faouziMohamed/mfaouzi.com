import Portal from '@mui/material/Portal';
import { useEffect, useState } from 'react';

import clsxm from '@/lib/utils';

import ToTopButton from '@/components/buttons/ToTopButton';
import ToggleThemeButton from '@/components/ToggleThemeButton';

export default function PageFixedItems() {
  // TODO: make the button draggable
  // lift the button when the user is on the bottom of the page
  const [isOnBottom, setIsOnBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentHeight = window.innerHeight + window.scrollY;
      const threshold = document.body.offsetHeight - 100;
      const isBottom = currentHeight >= threshold;
      setIsOnBottom(isBottom);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Portal>
      <div
        className={clsxm(
          'fixed bottom-4 right-2 z-[9999]  px-1 py-1 ',
          isOnBottom ? '-translate-y-[8rem] bg-transparent ' : '',
          'flex flex-col items-center justify-center gap-2',
          'group rounded-[2.1rem]  transition-all duration-300 ease-in-out',
          'dark:hover:bg-dark-[#000040] bg-primary-400/60 dark:bg-primary-800/60',
        )}
      >
        <ToTopButton />
        <ToggleThemeButton
          size='medium'
          className={clsxm(
            'rounded-full text-white hover:bg-primary-600 ',
            'hover:bg-primary-800 dark:hover:bg-primary-600',
          )}
        />
      </div>
    </Portal>
  );
}
