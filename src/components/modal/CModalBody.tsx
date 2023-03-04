import classNames from 'classnames';
import PropTypes from 'prop-types';
import type { HTMLAttributes } from 'react';
import React, { forwardRef } from 'react';

export interface CModalBodyProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const CModalBody = forwardRef<HTMLDivElement, CModalBodyProps>(
  ({ children, className, ...rest }, ref) => {
    const _className = classNames(
      'relative shrink grow basis-auto py-4 px-6',
      className
    );

    return (
      <div className={_className} {...rest} ref={ref}>
        {children}
      </div>
    );
  }
);

CModalBody.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

CModalBody.displayName = 'CModalBody';
