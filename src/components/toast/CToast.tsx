import classNames from 'classnames';
import type { HTMLAttributes } from 'react';
import React, {
  createContext,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Transition } from 'react-transition-group';

import { useForkedRef } from '../../hooks';

export interface CToastProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  animation?: boolean;
  autohide?: boolean;
  className?: string;
  delay?: number;
  index?: number;
  key?: number;
  onClose?: (index: number | null) => void;
  onShow?: (index: number | null) => void;
  visible?: boolean;
}

interface ContextProps extends CToastProps {
  visible?: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CToastContext = createContext({} as ContextProps);

export const CToast = forwardRef<HTMLDivElement, CToastProps>(
  (
    {
      children,
      animation = true,
      autohide = true,
      className,
      color,
      delay = 3000,
      index,
      key,
      visible = false,
      onClose,
      onShow,
      ...rest
    },
    ref
  ) => {
    const toastRef = useRef();
    const forkedRef = useForkedRef(ref, toastRef);
    const [_visible, setVisible] = useState(false);
    const timeout = useRef<number>();

    useEffect(() => {
      setVisible(visible);
    }, [visible]);

    useEffect(() => () => clearTimeout(timeout.current), []);

    const _autohide = () => {
      if (autohide) {
        clearTimeout(timeout.current);
        timeout.current = window.setTimeout(() => {
          setVisible(false);
        }, delay);
      }
    };

    useEffect(() => {
      _autohide();
    }, [_visible]);

    const _className = classNames(
      'border-solid border-1 border-[#0000152d] rounded-[0.375rem] mt-[20px] bg-whites-6',
      'shadow-[0_0.5rem_1rem_rgba(0,0,21,.15)] text-[unset] text-[0.875rem] max-w-[100%] pointer-events-auto',
      {
        fade: animation,
        [`bg-[${color}]`]: color,
        'border-[color]': color,
      },
      className
    );

    const getTransitionClass = (state: string) => {
      switch (state) {
        case 'entering':
          return 'showing';
        case 'entered':
          return 'show';
        case 'exiting':
          return 'showing';
        default:
          return 'fade';
      }
    };

    return (
      <Transition
        in={_visible}
        nodeRef={toastRef}
        onEnter={() => onShow && onShow(index || null)}
        onExited={() => onClose && onClose(index || null)}
        timeout={250}
        unmountOnExit
      >
        {(state) => {
          const transitionClass = getTransitionClass(state);
          return (
            <CToastContext.Provider value={{ visible: _visible, setVisible }}>
              <div
                className={classNames(_className, transitionClass)}
                aria-live="assertive"
                aria-atomic="true"
                role="alert"
                onMouseEnter={() => clearTimeout(timeout.current)}
                onMouseLeave={() => _autohide()}
                {...rest}
                key={key}
                ref={forkedRef}
              >
                {children}
              </div>
            </CToastContext.Provider>
          );
        }}
      </Transition>
    );
  }
);

CToast.displayName = 'CToast';
