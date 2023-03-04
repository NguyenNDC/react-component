import classNames from 'classnames';
import type { FormHTMLAttributes } from 'react';
import React, { forwardRef } from 'react';

export interface CFormProps extends FormHTMLAttributes<HTMLFormElement> {
  className?: string;
}

export const CForm = forwardRef<HTMLFormElement, CFormProps>(
  ({ children, className, onSubmit, ...rest }, ref) => {
    const _className = classNames(className);
    return (
      <form className={_className} onSubmit={onSubmit} {...rest} ref={ref}>
        {children}
      </form>
    );
  }
);

CForm.displayName = 'CForm';
