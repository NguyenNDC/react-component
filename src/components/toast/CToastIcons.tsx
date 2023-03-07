import classNames from 'classnames';
import type { HTMLAttributes } from 'react';
import React, { Children, forwardRef } from 'react';

import { Error, Notification, Success, Warning } from '../../icons';
import type { ColorToast } from '../../types';

export interface CToastIconsProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  color?: ColorToast;
}

export const CToastIcons = forwardRef<HTMLDivElement, CToastIconsProps>(
  ({ children, className, color, ...rest }, ref) => {
    const _className = classNames(className);

    const _iconType = () => {
      switch (color) {
        case 'success':
          return <Success />;
        case 'warning':
          return <Warning />;
        case 'error':
          return <Error />;
        case 'notification':
          return <Notification />;
        default:
          return <Success />;
      }
    };
    return (
      <div className={_className} {...rest} ref={ref}>
        {Children.count(children) > 0 ? (
          <div>{children}</div>
        ) : (
          <>{_iconType()}</>
        )}
      </div>
    );
  }
);

CToastIcons.displayName = 'CToastIcons';
