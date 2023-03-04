import classNames from 'classnames';
import type { HTMLAttributes } from 'react';
import React, { forwardRef } from 'react';

export interface CDropdownDividerProps extends HTMLAttributes<HTMLHRElement> {
  className?: string;
}

export const CDropdownDivider = forwardRef<
  HTMLHRElement,
  CDropdownDividerProps
>(({ className, ...rest }, ref) => {
  const _className = classNames(
    'border-t-[1px] h-0 mx-0 my-[0.2rem] opacity-100 overflow-hidden',
    className
  );

  return <hr className={_className} {...rest} ref={ref} />;
});
CDropdownDivider.displayName = 'CDropdownDivider';
