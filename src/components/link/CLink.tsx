import classNames from 'classnames';
import type { AllHTMLAttributes, ElementType, MouseEvent } from 'react';
import React, { forwardRef } from 'react';

export interface CLinkProps
  extends AllHTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
  active?: boolean;
  className?: string;
  component?: string | ElementType;
  disabled?: boolean;
  href?: string;
  isLoading?: JSX.Element;
}

export const CLink = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  CLinkProps
>(
  (
    {
      children,
      active,
      className,
      component: Component = 'a',
      disabled,
      isLoading,
      ...rest
    },
    ref
  ) => {
    const _className = classNames(
      className,
      { active, disabled },
      'flex items-center'
    );

    return (
      <Component
        className={_className}
        {...(active && { 'aria-current': 'page' })}
        {...(Component === 'a' &&
          disabled && { 'aria-disabled': true, tabIndex: -1 })}
        {...((Component === 'a' || Component === 'button') && {
          onClick: (
            event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>
          ) => {
            event.preventDefault();
            return !disabled && rest.onClick && rest.onClick(event);
          },
        })}
        disabled={disabled}
        {...rest}
        ref={ref}
      >
        {isLoading}
        {children}
      </Component>
    );
  }
);
CLink.displayName = 'CLink';
