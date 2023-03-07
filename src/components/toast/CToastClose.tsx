import type { ElementType, HTMLAttributes } from 'react';
import React, { forwardRef } from 'react';

import { CloseToast } from '../../icons';

export interface CToastCloseProps extends HTMLAttributes<HTMLButtonElement> {
  component?: string | ElementType;
}

export const CToastClose = forwardRef<HTMLButtonElement, CToastCloseProps>(
  ({ children, component: Component, ...rest }, ref) => {
    return Component ? (
      <Component {...rest} ref={ref}>
        {children}
      </Component>
    ) : (
      <button className="outline-none border-none" {...rest} ref={ref}>
        <CloseToast />
      </button>
    );
  }
);

CToastClose.displayName = 'CToastClose';
