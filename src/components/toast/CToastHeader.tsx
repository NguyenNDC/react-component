import classNames from 'classnames';
import type { HTMLAttributes } from 'react';
import React, { Children, forwardRef } from 'react';

export interface CToastHeaderProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  className?: string;
}

export const CToastHeader = forwardRef<HTMLDivElement, CToastHeaderProps>(
  ({ children, className, ...rest }, ref) => {
    const _className = classNames(
      className,
      'flex justify-between items-start mb-1'
    );
    return (
      <div className={_className} {...rest} ref={ref}>
        {Children.count(children) > 1 ? (
          <div>{children}</div>
        ) : (
          <div className="text-inks-6 text-base font-medium leading-6">
            {children}
          </div>
        )}
      </div>
    );
  }
);

CToastHeader.displayName = 'CToastHeader';
