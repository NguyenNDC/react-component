import classNames from 'classnames';
import PropTypes from 'prop-types';
import type { HTMLAttributes } from 'react';
import React, { forwardRef } from 'react';

export interface CToastBodyProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const CToastBody = forwardRef<HTMLDivElement, CToastBodyProps>(
  ({ children, className, ...rest }, ref) => {
    const _className = classNames('break-words p-[0.75rem]', className);
    return (
      <div className={_className} {...rest} ref={ref}>
        {children}
      </div>
    );
  }
);

CToastBody.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

CToastBody.displayName = 'CToastBody';
