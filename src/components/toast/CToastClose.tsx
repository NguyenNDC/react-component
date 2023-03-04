import type { ElementType, HTMLAttributes } from 'react';
import React, { forwardRef, useContext } from 'react';

import { Close } from '../../icons';
import { CToastContext } from './CToast';

export interface CToastCloseProps extends HTMLAttributes<HTMLButtonElement> {
  component?: string | ElementType;
}

export const CToastClose = forwardRef<HTMLButtonElement, CToastCloseProps>(
  ({ children, component: Component, ...rest }, ref) => {
    const { setVisible } = useContext(CToastContext);
    return Component ? (
      <Component onClick={() => setVisible(false)} {...rest} ref={ref}>
        {children}
      </Component>
    ) : (
      <button
        className="outline-none border-none"
        {...rest}
        onClick={() => setVisible(false)}
        ref={ref}
      >
        <Close />
      </button>
    );
  }
);

CToastClose.displayName = 'CToastClose';
