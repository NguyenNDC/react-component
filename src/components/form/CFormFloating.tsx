import classNames from 'classnames';
import type { HTMLAttributes } from 'react';
import React, { forwardRef } from 'react';

export interface CFormFloatingProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const CFormFloating = forwardRef<HTMLDivElement, CFormFloatingProps>(
  ({ children, className, ...rest }, ref) => {
    const _className = classNames('form-floating', className);
    return (
      <div className={_className} {...rest} ref={ref}>
        {children}
      </div>
    );
  }
);

CFormFloating.displayName = 'CFormFloating';
