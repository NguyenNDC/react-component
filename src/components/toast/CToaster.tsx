import classNames from 'classnames';
import type { HTMLAttributes, ReactElement } from 'react';
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export interface CToasterProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  placement?:
    | 'top-start'
    | 'top-center'
    | 'top-end'
    | 'middle-start'
    | 'middle-center'
    | 'middle-end'
    | 'bottom-start'
    | 'bottom-center'
    | 'bottom-end'
    | string;
  push?: ReactElement;
}

export const CToaster = forwardRef<HTMLDivElement, CToasterProps>(
  ({ children, className, placement, push, ...rest }, ref) => {
    const [toasts, setToasts] = useState<ReactElement[]>([]);
    const index = useRef<number>(0);

    const addToast = (pushAdd: ReactElement) => {
      setToasts((state) => [
        ...state,
        React.cloneElement(pushAdd, {
          index: index.current,
          key: index.current,
          onClose: (idx: number) =>
            setToasts((prev) => prev.filter((i) => i.props.index !== idx)),
        }),
      ]);
    };

    useEffect(() => {
      index.current += 1;
      if (push) {
        addToast(push);
      }
    }, [push]);

    const _className = classNames(
      {
        'position-fixed': placement,
        'top-[30px]': placement && placement.includes('top'),
        'top-50 translate-middle-y': placement && placement.includes('middle'),
        'bottom-0': placement && placement.includes('bottom'),
        'start-0': placement && placement.includes('start'),
        'start-50 translate-middle-x':
          placement && placement.includes('center'),
        'end-0': placement && placement.includes('end'),
      },
      className
    );

    const toaster = (toastRef?: React.Ref<HTMLDivElement>) => {
      return toasts.length > 0 || children ? (
        <div className={_className} {...rest} ref={toastRef}>
          {children}
          {toasts.map((toast) => React.cloneElement(toast, { visible: true }))}
        </div>
      ) : null;
    };

    return typeof window !== 'undefined' && placement
      ? createPortal(toaster(ref), document.body)
      : toaster(ref);
  }
);

CToaster.displayName = 'CToaster';
