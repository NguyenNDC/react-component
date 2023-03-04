import classNames from 'classnames';
import type { ElementType, HTMLAttributes, RefObject } from 'react';
import React, {
  createContext,
  forwardRef,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Manager } from 'react-popper';

import { useForkedRef } from '../../hooks';
import type { Placements } from '../../types';

export type Directions = 'start' | 'end';

export interface CDropdownProps
  extends HTMLAttributes<HTMLDivElement | HTMLLIElement> {
  autoClose?: 'inside' | 'outside' | boolean;
  className?: string;
  component?: string | ElementType;
  direction?: 'center' | 'dropup' | 'dropup-center' | 'dropend' | 'dropstart';
  onHide?: () => void;
  onShow?: () => void;
  placement?: Placements;
  popper?: boolean;
  visible?: boolean;
}

interface ContextProps extends CDropdownProps {
  dropdownToggleRef: RefObject<any> | undefined;
  setVisible: React.Dispatch<React.SetStateAction<boolean | undefined>>;
}

export const CDropdownContext = createContext({} as ContextProps);

export const CDropdown = forwardRef<
  HTMLDivElement | HTMLLIElement,
  CDropdownProps
>(
  (
    {
      children,
      autoClose = true,
      className,
      direction,
      onHide,
      onShow,
      placement = 'bottom-start',
      popper = true,
      component = 'div',
      visible = false,
      ...rest
    },
    ref
  ) => {
    const [_visible, setVisible] = useState(visible);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const dropdownToggleRef = useRef(null);
    const forkedRef = useForkedRef(ref, dropdownRef);

    const Component = 'div' || component;

    const contextValues = useMemo(
      () =>
        ({
          autoClose,
          direction,
          dropdownToggleRef,
          placement,
          popper,
          visible: _visible,
          setVisible,
        } as ContextProps),
      [_visible, autoClose, direction, dropdownToggleRef, placement, popper]
    );

    const _className = classNames(
      {
        show: _visible,
      },
      direction === 'center' && 'dropdown-center',
      direction === 'dropup-center' && 'dropup dropup-center',
      direction,
      className
    );

    useEffect(() => {
      setVisible(visible);
    }, [visible]);

    useEffect(() => {
      if (_visible && onShow) onShow();
      if (!_visible && onHide) onHide();
    }, [_visible]);

    const dropdownContent = () => {
      return (
        <Component className={_className} {...rest} ref={forkedRef}>
          {children}
        </Component>
      );
    };

    return popper ? (
      <CDropdownContext.Provider value={contextValues}>
        <Manager>{dropdownContent()}</Manager>
      </CDropdownContext.Provider>
    ) : (
      <CDropdownContext.Provider value={contextValues}>
        {dropdownContent()}
      </CDropdownContext.Provider>
    );
  }
);

CDropdown.displayName = 'CDropdown';
