import classNames from 'classnames';
import type { FC } from 'react';
import React, { useContext } from 'react';
import { Reference } from 'react-popper';

import { useForkedRef } from '../../hooks';
import type { Triggers } from '../../types';
import type { CButtonProps } from '../button/CButton';
import { CButton } from '../button/CButton';
import { CDropdownContext } from './CDropdown';

export interface CDropdownToggleProps extends Omit<CButtonProps, 'type'> {
  caret?: boolean;
  custom?: boolean;
  split?: boolean;
  trigger?: Triggers | Triggers[];
}

export const CDropdownToggle: FC<CDropdownToggleProps> = ({
  children,
  caret = true,
  custom,
  className,
  split,
  trigger = 'click',
  ...rest
}) => {
  const { dropdownToggleRef, popper, visible, setVisible } =
    useContext(CDropdownContext);

  const _className = classNames(className, {
    '': caret,
    'dropdown-toggle-split': split,
  });

  const triggers = {
    ...((trigger === 'click' || trigger.includes('click')) && {
      onClick: (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        setVisible(!visible);
      },
    }),
    ...((trigger === 'focus' || trigger.includes('focus')) && {
      onFocus: () => setVisible(true),
      onBlur: () => setVisible(false),
    }),
  };

  const togglerProps = {
    className: _className,
    'aria-expanded': visible,
    ...(!rest.disabled && { ...triggers }),
    ...triggers,
  };

  const Toggler = (ref?: React.Ref<any>) => {
    if (custom && React.isValidElement(children))
      return (
        <>
          {React.cloneElement(children as React.ReactElement<any>, {
            'aria-expanded': visible,
            ...(!rest.disabled && { ...triggers }),
            ref: useForkedRef(ref, dropdownToggleRef),
          })}
        </>
      );
    return (
      <CButton
        type="button"
        {...togglerProps}
        tabIndex={0}
        {...rest}
        ref={useForkedRef(ref, dropdownToggleRef)}
      >
        {children}
        {split && <span className="">Toggle Dropdown</span>}
      </CButton>
    );
  };

  return popper ? (
    <Reference>{({ ref }) => Toggler(ref)}</Reference>
  ) : (
    Toggler(dropdownToggleRef)
  );
};
