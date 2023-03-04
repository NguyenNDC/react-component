import classNames from 'classnames';
import type { HTMLAttributes } from 'react';
import React, { forwardRef } from 'react';

import { CToastClose } from './CToastClose';

export interface CToastHeaderProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  className?: string;
  closeButton?: boolean;
}

export const CToastHeader = forwardRef<HTMLDivElement, CToastHeaderProps>(
  ({ children, className, closeButton, ...rest }, ref) => {
    const _className = classNames('toast-header', className);
    return (
      <div className={_className} {...rest} ref={ref}>
        {children}
        {closeButton && <CToastClose />}
      </div>
    );
  }
);

CToastHeader.displayName = 'CToastHeader';
