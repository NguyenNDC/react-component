import classNames from 'classnames';
import type { HTMLAttributes } from 'react';
import React, { forwardRef } from 'react';

import { CLink } from '../link';

export interface CBreadcrumbItemProps extends HTMLAttributes<HTMLLIElement> {
  active?: boolean;
  className?: string;
  href?: string;
}

export const CBreadcrumbItem = forwardRef<HTMLLIElement, CBreadcrumbItemProps>(
  ({ children, active, className, href, ...rest }, ref) => {
    const _className = classNames(
      "first:before:content-none font-medium leading-[22px] before:content-['/'] text-sm before:px-2 text-inks-5 cursor-pointer hover:text-primarys-6",
      {
        '!text-inks-6 cursor-text': active,
      },
      className
    );
    return (
      <li
        className={_className}
        {...(active && { 'aria-current': 'page' })}
        {...rest}
        ref={ref}
      >
        {href ? <CLink href={href}>{children}</CLink> : children}
      </li>
    );
  }
);

CBreadcrumbItem.displayName = 'CBreadcrumbItem';
