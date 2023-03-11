/* eslint-disable react/jsx-props-no-spreading */
import { ComponentProps, ElementType } from 'react';

import clsxm from '@/lib/utils';

import ReactiveArrow, {
  ArrowDirection,
} from '@/components/buttons/ReactiveArrow';
import UnderlineLink from '@/components/links/UnderlineLink';
import { UnStyledLinkProps } from '@/components/links/UnStyledLink';

type ArrowLinkProps<C extends ElementType> = {
  as?: C;
  className?: string;
  direction?: ArrowDirection;
} & UnStyledLinkProps &
  ComponentProps<C>;

export default function ArrowLink<C extends typeof UnderlineLink>({
  children,
  className = '',
  direction = 'right',
  as: linkAlias,
  ...rest
}: ArrowLinkProps<C>) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const Component = linkAlias || UnderlineLink;

  return (
    <Component
      className={clsxm(
        'group gap-[0.25em]',
        direction === 'left' ? 'flex-row-reverse' : '',
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        className,
      )}
      {...rest}
    >
      <span>{children}</span>
      <ReactiveArrow direction={direction} />
    </Component>
  );
}
