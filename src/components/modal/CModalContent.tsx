import classNames from 'classnames';
import PropTypes from 'prop-types';
import type { HTMLAttributes } from 'react';
import React, { forwardRef } from 'react';

export interface CModalContentProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const CModalContent = forwardRef<HTMLDivElement, CModalContentProps>(
  ({ children, className, ...rest }, ref) => {
    const _className = classNames(
      'relative flex flex-col w-full outline-0 bg-whites-6 border-0 rounded-xl',
      className
    );

    return (
      <div className={_className} {...rest} ref={ref}>
        {children}
      </div>
    );
  }
);

CModalContent.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

CModalContent.displayName = 'CModalContent';
