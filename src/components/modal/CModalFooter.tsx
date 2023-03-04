import classNames from 'classnames';
import PropTypes from 'prop-types';
import type { HTMLAttributes } from 'react';
import React, { forwardRef } from 'react';

export interface CModalFooterProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const CModalFooter = forwardRef<HTMLDivElement, CModalFooterProps>(
  ({ children, className, ...rest }, ref) => {
    const _className = classNames('py-4 px-6', className);

    return (
      <div className={_className} {...rest} ref={ref}>
        {children}
      </div>
    );
  }
);

CModalFooter.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

CModalFooter.displayName = 'CModalFooter';
