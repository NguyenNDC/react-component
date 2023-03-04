import classNames from 'classnames';
import type { ElementType } from 'react';
import React, { forwardRef } from 'react';

import type { CLinkProps } from '../link/CLink';
import { CLink } from '../link/CLink';

export interface CDropdownItemProps extends CLinkProps {
  className?: string;
  component?: string | ElementType;
}

export const CDropdownItem = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  CDropdownItemProps
>(({ children, className, component = 'a', ...rest }, ref) => {
  const _className = classNames(
    className,
    'py-2 px-3 rounded-lg text-inks-6 text-sm leading-5 font-normal w-full block whitespace-normal hover:bg-inks-1'
  );

  return (
    <CLink className={_className} component={component} {...rest} ref={ref}>
      {children}
    </CLink>
  );
});
CDropdownItem.displayName = 'CDropdownItem';
