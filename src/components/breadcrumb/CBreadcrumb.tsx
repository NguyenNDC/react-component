import classNames from 'classnames';
import type { HTMLAttributes } from 'react';
import React, { forwardRef } from 'react';

export interface CBreadcrumbProps extends HTMLAttributes<HTMLOListElement> {
  className?: string;
}

export const CBreadcrumb = forwardRef<HTMLOListElement, CBreadcrumbProps>(
  ({ children, className, ...rest }, ref) => {
    const _className = classNames('flex flex-wrap', className);
    return (
      <nav aria-label="breadcrumb">
        <ol className={_className} {...rest} ref={ref}>
          {children}
        </ol>
      </nav>
    );
  }
);

CBreadcrumb.displayName = 'CBreadcrumb';
