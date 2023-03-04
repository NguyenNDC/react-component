import classNames from 'classnames';
import type { ElementType, HTMLAttributes } from 'react';
import React, { forwardRef } from 'react';

export interface CDropdownHeaderProps
  extends HTMLAttributes<HTMLHeadingElement> {
  className?: string;
  component?: string | ElementType;
}

export const CDropdownHeader = forwardRef<
  HTMLHeadingElement,
  CDropdownHeaderProps
>(({ children, className, component: Component = 'h6', ...rest }, ref) => {
  const _className = classNames('dropdown-header', className);

  return (
    <Component className={_className} {...rest} ref={ref}>
      {children}
    </Component>
  );
});
CDropdownHeader.displayName = 'CDropdownHeader';
