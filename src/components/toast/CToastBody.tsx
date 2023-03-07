import classNames from 'classnames';
import type { HTMLAttributes } from 'react';
import React, { Children, forwardRef } from 'react';

export interface CToastBodyProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const CToastBody = forwardRef<HTMLDivElement, CToastBodyProps>(
  ({ children, className, ...rest }, ref) => {
    const _className = classNames(className);
    return (
      <div className={_className} {...rest} ref={ref}>
        {Children.count(children) > 1 ? (
          <div>{children}</div>
        ) : (
          <p className="text-inks-6 text-sm font-normal">{children}</p>
        )}
      </div>
    );
  }
);

CToastBody.displayName = 'CToastBody';
