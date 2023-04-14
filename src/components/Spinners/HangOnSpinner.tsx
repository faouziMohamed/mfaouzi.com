import clsxm from '@/lib/utils';

export type HangOnSpinnerProps = {
  text?: string;
  size?: 'sm' | 'md' | 'lg';
};

export default function HangOnSpinner({
  text = 'Action in progress...',
  size = 'lg',
}: HangOnSpinnerProps) {
  const spinnerSize = {
    sm: 'h-[1.3rem] w-[1.3rem]',
    md: 'h-[1.5rem] w-[1.5rem]',
    lg: 'h-[1.8rem] w-[1.8rem]',
  };
  const textSizes = {
    sm: 'text-[0.75rem]',
    md: 'text-[0.88rem]',
    lg: 'text-[1rem]',
  };
  return (
    <span className='flex items-center gap-4'>
      <span
        className={clsxm(
          spinnerSize[size] || spinnerSize.sm,
          'block animate-try-spin',
          'rounded-[20px] border border-[3px] border-double border-y-black dark:border-y-white',
          'border-x-transparent',
        )}
      />
      <span
        className={clsxm(
          textSizes[size] || textSizes.sm,
          'font-secondary font-[500]',
        )}
      >
        {text}
      </span>
    </span>
  );
}
