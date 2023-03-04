import classNames from 'classnames';
import PropTypes from 'prop-types';
import type { HTMLAttributes } from 'react';
import React, { forwardRef, useContext } from 'react';

import { Close } from '../../icons';
import { CModalContext } from './CModal';

export interface CModalHeaderProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  closeButton?: boolean;
}

export const CModalHeader = forwardRef<HTMLDivElement, CModalHeaderProps>(
  ({ children, className, closeButton = true, ...rest }, ref) => {
    const { setVisible } = useContext(CModalContext);
    const _className = classNames(
      'flex shrink-0 items-start justify-between  py-4 px-6 relative',
      className
    );

    return (
      <div className={_className} {...rest} ref={ref}>
        {children}
        {closeButton && (
          <button onClick={() => setVisible(false)}>
            <Close color="black" />
          </button>
        )}
      </div>
    );
  }
);

CModalHeader.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  closeButton: PropTypes.bool,
};

CModalHeader.displayName = 'CModalHeader';
