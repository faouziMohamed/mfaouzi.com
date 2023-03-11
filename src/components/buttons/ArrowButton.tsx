import { ButtonUnstyled } from '@mui/base';
import { ElementType, ReactNode } from 'react';

import clsxm from '@/lib/utils';

import { ButtonProps } from '@/components/buttons/Button';
import ReactiveArrow, {
  ArrowDirection,
} from '@/components/buttons/ReactiveArrow';

type ArrowButtonProps<C extends ElementType> = {
  as?: C;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  direction?: ArrowDirection;
} & ButtonProps;

export default function ArrowButton<C extends ElementType>({
  children,
  as: ButtonAlias,
  className,
  onClick,
  direction = 'right',
  ...rest
}: ArrowButtonProps<C>) {
  const Component = ButtonAlias || ButtonUnstyled;
  return (
    <Component
      className={clsxm(
        'inline-flex items-center',
        'group gap-[0.25em]',
        'border-dark  border-b border-dotted hover:border-black/0 ',
        direction === 'left' && 'flex-row-reverse',
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        className,
      )}
      onClick={onClick}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    >
      <span>{children}</span>
      <ReactiveArrow direction={direction} />
    </Component>
  );
}
