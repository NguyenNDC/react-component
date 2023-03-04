import classNames from 'classnames';
import type { ElementType, HTMLAttributes } from 'react';
import React, { forwardRef } from 'react';

export interface CFormTextProps
  extends HTMLAttributes<HTMLDivElement | HTMLSpanElement> {
  className?: string;
  component?: string | ElementType;
}

export const CFormText = forwardRef<
  HTMLDivElement | HTMLSpanElement,
  CFormTextProps
>(({ children, className, component: Component = 'div', ...rest }, ref) => {
  const _className = classNames('form-text', className);
  return (
    <Component className={_className} {...rest} ref={ref}>
      {children}
    </Component>
  );
});

CFormText.displayName = 'CFormText';
