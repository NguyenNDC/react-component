import classNames from 'classnames';
import PropTypes from 'prop-types';
import type { HTMLAttributes } from 'react';
import React, { forwardRef, useRef } from 'react';
import { Transition } from 'react-transition-group';

import { useForkedRef } from '../../hooks';

export interface CBackdropProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  visible?: boolean;
}

export const CBackdrop = forwardRef<HTMLDivElement, CBackdropProps>(
  (
    {
      className = 'bg-blacks-5 w-full fixed top-0 left-0 h-screen',
      visible,
      ...rest
    },
    ref
  ) => {
    const backdropRef = useRef<HTMLDivElement>(null);
    const forkedRef = useForkedRef(ref, backdropRef);

    const _className = classNames(className, 'fade');

    const getTransitionClass = (state: string) => {
      return state === 'entered' && 'show';
    };

    return (
      <Transition
        in={visible}
        mountOnEnter
        nodeRef={backdropRef}
        timeout={150}
        unmountOnExit
      >
        {(state) => {
          const transitionClass = getTransitionClass(state);
          return (
            <div
              className={classNames(_className, transitionClass)}
              {...rest}
              ref={forkedRef}
            />
          );
        }}
      </Transition>
    );
  }
);

CBackdrop.propTypes = {
  className: PropTypes.string,
  visible: PropTypes.bool,
};

CBackdrop.displayName = 'CBackdrop';
