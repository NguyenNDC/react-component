import classNames from 'classnames';
import type { ElementType, FC, HTMLAttributes } from 'react';
import React, { useContext, useEffect, useRef } from 'react';
import type { PopperChildrenProps } from 'react-popper';
import { Popper } from 'react-popper';

import type { Placements } from '../../types';
import { CDropdownContext } from './CDropdown';

export interface CDropdownMenuProps
  extends HTMLAttributes<HTMLDivElement | HTMLUListElement>,
    Omit<
      PopperChildrenProps,
      | 'arrowProps'
      | 'forceUpdate'
      | 'hasPopperEscaped'
      | 'isReferenceHidden'
      | 'placement'
      | 'ref'
      | 'style'
      | 'update'
    > {
  className?: string;
  component?: string | ElementType;
}

export const CDropdownMenu: FC<CDropdownMenuProps> = ({
  children,
  className,
  component: Component = 'ul',
  ...rest
}) => {
  const {
    autoClose,
    direction,
    dropdownToggleRef,
    placement,
    popper,
    visible,
    setVisible,
  } = useContext(CDropdownContext);

  const dropdownMenuRef = useRef<HTMLDivElement>(null);

  const handleMouseUp = (event: Event) => {
    if (
      dropdownToggleRef &&
      dropdownToggleRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    if (
      autoClose === true ||
      (autoClose === 'inside' &&
        dropdownMenuRef.current?.contains(event.target as HTMLElement)) ||
      (autoClose === 'outside' &&
        !dropdownMenuRef.current?.contains(event.target as HTMLElement))
    ) {
      setTimeout(() => setVisible(false), 1);
    }
  };

  const handleKeyup = (event: KeyboardEvent) => {
    if (autoClose === false) {
      return;
    }

    if (event.key === 'Escape') {
      setVisible(false);
    }
  };

  useEffect(() => {
    if (visible) window.addEventListener('mouseup', handleMouseUp);
    if (visible) window.addEventListener('keyup', handleKeyup);

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('keyup', handleKeyup);
    };
  }, [visible]);

  let _placement: Placements = placement;

  if (direction === 'center') {
    _placement = 'bottom';
  }

  if (direction === 'dropup') {
    _placement = 'top-start';
  }

  if (direction === 'dropup-center') {
    _placement = 'top';
  }

  if (direction === 'dropend') {
    _placement = 'right-start';
  }

  if (direction === 'dropstart') {
    _placement = 'left-start';
  }

  const _className = classNames(
    'absolute bg-whites-6 rounded-xl p-1 min-w-[15rem] mt-1 box-shadow',
    visible ? 'block' : 'hidden',
    className
  );

  const dropdownMenuComponent = (
    style?: React.CSSProperties,
    ref?: React.Ref<HTMLDivElement>
  ) => {
    return (
      <Component
        className={_className}
        ref={ref}
        style={style}
        role="menu"
        aria-hidden={!visible}
        {...(!popper && { 'data-coreui-popper': 'static' })}
        {...rest}
      >
        {Component === 'ul'
          ? React.Children.map(children, (child, index) => {
              if (React.isValidElement(child)) {
                return <li key={index}>{React.cloneElement(child)}</li>;
              }
              return <></>;
            })
          : children}
      </Component>
    );
  };

  return popper && visible ? (
    <Popper innerRef={dropdownMenuRef} placement={_placement}>
      {({ ref, style }) => dropdownMenuComponent(style, ref)}
    </Popper>
  ) : (
    dropdownMenuComponent()
  );
};
