import clsxm from '@/lib/utils';

import ToTopButton from '@/components/buttons/ToTopButton';
import ToggleThemeButton from '@/components/ToggleThemeButton';

export default function PageFixedItems() {
  // TODO: make the button draggable

  return (
    <div
      className={clsxm(
        ' fixed right-2 bottom-4 z-20  px-1 py-1',
        'flex flex-col items-center justify-center gap-2',
        'group rounded-[2.1rem]',
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
  );
}
