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
import type { ColorToast } from '../../types';
import { CToastClose } from './CToastClose';
import { CToastIcons } from './CToastIcons';

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
  color?: ColorToast;
  closeButton?: boolean;
  closeIcons?: boolean;
}

interface ContextProps extends CToastProps {
  visible?: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  color?: ColorToast;
}

export const CToastContext = createContext({} as ContextProps);

const colors = {
  success: 'border border-greens-6 bg-greens-1',
  warning: 'border border-oranges-6 bg-oranges-1',
  error: 'border border-reds-6 bg-reds-1',
  notification: 'border border-blues-6 bg-blues-1',
};

export const CToast = forwardRef<HTMLDivElement, CToastProps>(
  (
    {
      children,
      animation = true,
      autohide = true,
      className,
      color = 'success',
      delay = 3000,
      index,
      key,
      visible = false,
      onClose,
      onShow,
      closeButton = false,
      closeIcons = true,
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
      className,
      'w-full max-w-[520px] p-4 rounded-xl flex justify-between items-start',
      colors[color],
      {
        fade: animation,
      }
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
                <div className="flex items-start">
                  {closeIcons && <CToastIcons className="mr-2" color={color} />}
                  <div>{children}</div>
                </div>
                {closeButton && (
                  <CToastClose onClick={() => setVisible(false)} />
                )}
              </div>
            </CToastContext.Provider>
          );
        }}
      </Transition>
    );
  }
);

CToast.displayName = 'CToast';
