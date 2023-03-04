import classNames from 'classnames';
import type { ElementType, HTMLAttributes } from 'react';
import React, { forwardRef } from 'react';

export interface CDropdownItemPlainProps
  extends HTMLAttributes<HTMLSpanElement> {
  className?: string;
  component?: string | ElementType;
}

export const CDropdownItemPlain = forwardRef<
  HTMLSpanElement,
  CDropdownItemPlainProps
>(({ children, className, component: Component = 'span', ...rest }, ref) => {
  const _className = classNames('dropdown-item-text', className);

  return (
    <Component className={_className} {...rest} ref={ref}>
      {children}
    </Component>
  );
});
CDropdownItemPlain.displayName = 'CDropdownItemPlain';
