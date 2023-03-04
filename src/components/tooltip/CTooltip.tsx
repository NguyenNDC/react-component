import classNames from 'classnames';
import type { FC, HTMLAttributes, ReactNode } from 'react';
import React, { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { usePopper } from 'react-popper';
import { Transition } from 'react-transition-group';

import type { Triggers } from '../../types';

export interface CTooltipProps extends HTMLAttributes<HTMLDivElement> {
  content: ReactNode | string;
  offset?: [number, number];
  onHide?: () => void;
  onShow?: () => void;
  trigger?: Triggers | Triggers[];
  placement?: 'top' | 'right' | 'bottom' | 'left';
  visible?: boolean;
  className?: string;
}

export const CTooltip: FC<CTooltipProps> = ({
  children,
  content,
  offset = [0, 8],
  onHide,
  onShow,
  placement = 'top',
  trigger = 'hover',
  className = '',
  visible,
  ...rest
}) => {
  const tooltipRef = useRef();
  const [_visible, setVisible] = useState(visible);

  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );
  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [
      { name: 'arrow', options: { element: arrowElement } },
      {
        name: 'offset',
        options: {
          offset,
        },
      },
    ],
    placement,
  });

  const getTransitionClass = (state: string) => {
    switch (state) {
      case 'entering':
        return 'tooltip-fade';
      case 'entered':
        return 'tooltip-fade show';
      case 'exiting':
        return 'tooltip-fade';
      default:
        return 'tooltip-fade';
    }
  };

  return (
    <>
      {React.cloneElement(children as React.ReactElement<any>, {
        ref: setReferenceElement,
        ...((trigger === 'click' || trigger.includes('click')) && {
          onClick: () => setVisible(!_visible),
        }),
        ...((trigger === 'focus' || trigger.includes('focus')) && {
          onFocus: () => setVisible(true),
          onBlur: () => setVisible(false),
        }),
        ...((trigger === 'hover' || trigger.includes('hover')) && {
          onMouseEnter: () => setVisible(true),
          onMouseLeave: () => setVisible(false),
        }),
      })}
      {typeof window !== 'undefined' &&
        createPortal(
          <Transition
            in={true}
            mountOnEnter
            nodeRef={tooltipRef}
            onEnter={onShow}
            onExit={onHide}
            timeout={{
              enter: 0,
              exit: 200,
            }}
            unmountOnExit
          >
            {(state) => {
              const transitionClass = getTransitionClass(state);
              return (
                <div
                  className={classNames(
                    'tooltip',
                    `bs-tooltip-${placement}`,
                    className,
                    transitionClass
                  )}
                  ref={setPopperElement}
                  role="tooltip"
                  style={styles.popper}
                  {...attributes.popper}
                  {...rest}
                >
                  <div
                    className="tooltip-arrow"
                    style={styles.arrow}
                    ref={setArrowElement}
                  />
                  <div className={classNames('box-tooltip')}>{content}</div>
                </div>
              );
            }}
          </Transition>,
          document.body
        )}
    </>
  );
};

CTooltip.displayName = 'CTooltip';
