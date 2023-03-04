import classNames from 'classnames';
import PropTypes from 'prop-types';
import type { ElementType, HTMLAttributes } from 'react';
import React, { forwardRef } from 'react';

export interface CModalTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  className?: string;
  component?: string | ElementType;
}

export const CModalTitle = forwardRef<HTMLHeadElement, CModalTitleProps>(
  ({ children, component: Component = 'h5', className, ...rest }, ref) => {
    const _className = classNames('leading-5 font-bold text-lg', className);

    return (
      <Component className={_className} {...rest} ref={ref}>
        {children}
      </Component>
    );
  }
);

CModalTitle.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  component: PropTypes.elementType,
};

CModalTitle.displayName = 'CModalTitle';
