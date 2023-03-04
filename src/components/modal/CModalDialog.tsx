import classNames from 'classnames';
import PropTypes from 'prop-types';
import type { HTMLAttributes } from 'react';
import React, { forwardRef } from 'react';

export interface CModalDialogProps extends HTMLAttributes<HTMLDivElement> {
  alignment?: string;
  className?: string;
  fullscreen?: string;
  scrollable?: boolean;
  size?: string;
}

export const CModalDialog = forwardRef<HTMLDivElement, CModalDialogProps>(
  (
    { children, alignment, className, fullscreen, scrollable, size, ...rest },
    ref
  ) => {
    const _className = classNames(
      alignment,
      fullscreen,
      className,
      scrollable,
      size,
      'relative w-full max-w-[600px]'
    );

    return (
      <div className={_className} {...rest} ref={ref}>
        {children}
      </div>
    );
  }
);

CModalDialog.propTypes = {
  alignment: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  fullscreen: PropTypes.string,
  scrollable: PropTypes.bool,
  size: PropTypes.string,
};

CModalDialog.displayName = 'CModalDialog';
