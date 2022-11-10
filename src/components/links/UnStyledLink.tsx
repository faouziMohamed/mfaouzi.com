/* eslint-disable react/jsx-props-no-spreading */
import Link, { LinkProps } from 'next/link';
import { ComponentPropsWithRef, forwardRef, ReactNode } from 'react';

import clsxm from '@/lib/clsxm';

export type UnStyledLinkProps = {
  href: string;
  children: ReactNode;
  openNewTab?: boolean;
  className?: string;
  nextLinkProps?: Omit<LinkProps, 'href'>;
} & ComponentPropsWithRef<'a'>;

const UnStyledLink = forwardRef<HTMLAnchorElement, UnStyledLinkProps>(
  ({ children, href, openNewTab, className, nextLinkProps, ...rest }, ref) => {
    const isNewTab =
      openNewTab !== undefined
        ? openNewTab
        : href &&
          !href.startsWith('/') &&
          !href.startsWith('#') &&
          !href.includes(process.env.NEXT_PUBLIC_SITE_URL!);

    if (!isNewTab) {
      return (
        <Link
          href={href}
          {...nextLinkProps}
          ref={ref}
          {...rest}
          className={className}
        >
          {children}
        </Link>
      );
    }

    return (
      <a
        ref={ref}
        target='_blank'
        rel='noopener noreferrer'
        href={href}
        {...rest}
        className={clsxm(className)}
      >
        {children}
      </a>
    );
  },
);

UnStyledLink.displayName = 'UnStyledLink';

export default UnStyledLink;
