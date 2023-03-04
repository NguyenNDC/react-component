import classNames from 'classnames';
import type { HTMLAttributes } from 'react';
import React, {
  createContext,
  forwardRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { Transition } from 'react-transition-group';

import { useForkedRef } from '../../hooks';
import { CBackdrop } from '../backdrop';
import { CModalContent } from './CModalContent';
import { CModalDialog } from './CModalDialog';

export interface CModalProps extends HTMLAttributes<HTMLDivElement> {
  alignment?: string;
  backdrop?: boolean | 'static';
  className?: string;
  duration?: number;
  fullscreen?: string;
  keyboard?: boolean;
  onClose?: () => void;
  onClosePrevented?: () => void;
  onShow?: () => void;
  portal?: boolean;
  scrollable?: boolean;
  size?: string;
  transition?: boolean;
  unmountOnClose?: boolean;
  visible?: boolean;
}

interface ModalContextProps {
  visible?: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean | undefined>>;
}

export const CModalContext = createContext({} as ModalContextProps);

export const CModal = forwardRef<HTMLDivElement, CModalProps>(
  (
    {
      children,
      alignment,
      backdrop = true,
      className,
      duration = 150,
      fullscreen,
      keyboard = true,
      onClose,
      onClosePrevented,
      onShow,
      portal = true,
      scrollable,
      size,
      transition = true,
      unmountOnClose = true,
      visible,
    },
    ref
  ) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const modalContentRef = useRef<HTMLDivElement>(null);
    const forkedRef = useForkedRef(ref, modalRef);

    const [_visible, setVisible] = useState(visible);
    const [staticBackdrop, setStaticBackdrop] = useState(false);

    useEffect(() => {
      setVisible(visible);
    }, [visible]);

    const contextValues = {
      visible: _visible,
      setVisible,
    };

    const handleDismiss = () => {
      if (backdrop === 'static') {
        return setStaticBackdrop(true);
      }
      return onClose && onClose();
    };

    const handleClickOutside = (event: Event) => {
      if (
        modalContentRef.current &&
        !modalContentRef.current.contains(event.target as HTMLElement)
      ) {
        handleDismiss();
      }
    };

    const handleKeyDown = useCallback(
      (event: KeyboardEvent) => {
        if (event.key === 'Escape' && keyboard) {
          return handleDismiss();
        }
        return null;
      },
      [modalRef, handleDismiss]
    );

    useEffect(() => {
      if (modalRef.current)
        modalRef.current.addEventListener('click', handleClickOutside);

      if (modalRef.current)
        modalRef.current.addEventListener('keyup', handleKeyDown);

      return () => {
        if (modalRef.current)
          modalRef.current.removeEventListener('click', handleClickOutside);

        if (modalRef.current)
          modalRef.current.removeEventListener('keyup', handleKeyDown);
      };
    }, [_visible]);

    useLayoutEffect(() => {
      if (onClosePrevented) onClosePrevented();
      setTimeout(() => setStaticBackdrop(false), duration);
    }, [staticBackdrop]);

    const getTransitionClass = (state: string) => {
      if (state === 'entering') return 'd-block';
      if (state === 'entered') return 'show d-block';
      if (state === 'exiting') return 'd-block';
      return '';
    };
    const _className = classNames(
      'fixed top-0 left-0 w-full h-full overflow-x-hidden overflow-y-auto outline-0 bg-blacks-5 flex justify-center items-center',
      {
        'modal-static': staticBackdrop,
        fade: transition,
      },
      className
    );

    useLayoutEffect(() => {
      if (_visible) {
        document.body.classList.add('!overflow-y-auto');

        if (backdrop) {
          document.body.style.overflow = 'hidden';
          document.body.style.paddingRight = '0px';
        }

        setTimeout(
          () => {
            modalRef.current?.focus();
          },
          !transition ? 0 : duration
        );
      } else {
        document.body.classList.remove('!overflow-y-auto');

        if (backdrop) {
          document.body.style.removeProperty('overflow');
          document.body.style.removeProperty('padding-right');
        }
      }
      return () => {
        document.body.classList.remove('!overflow-y-auto');
        if (backdrop) {
          document.body.style.removeProperty('overflow');
          document.body.style.removeProperty('padding-right');
        }
      };
    }, [_visible]);

    const modal = (
      refDialog?: React.Ref<HTMLDivElement>,
      transitionClass?: string
    ) => {
      return (
        <CModalContext.Provider value={contextValues}>
          <div
            className={classNames(_className, transitionClass)}
            tabIndex={-1}
            role="dialog"
            ref={refDialog}
          >
            <CModalDialog
              alignment={alignment}
              fullscreen={fullscreen}
              scrollable={scrollable}
              size={size}
            >
              <CModalContent ref={modalContentRef}>{children}</CModalContent>
            </CModalDialog>
          </div>
        </CModalContext.Provider>
      );
    };

    return (
      <>
        <Transition
          in={_visible}
          mountOnEnter
          nodeRef={modalRef}
          onEnter={onShow}
          onExit={onClose}
          unmountOnExit={unmountOnClose}
          timeout={!transition ? 0 : duration}
        >
          {(state) => {
            const transitionClass = getTransitionClass(state);
            return typeof window !== 'undefined' && portal
              ? createPortal(modal(forkedRef, transitionClass), document.body)
              : modal(forkedRef, transitionClass);
          }}
        </Transition>
        {typeof window !== 'undefined' && portal
          ? backdrop &&
            createPortal(
              <CBackdrop
                className="flex justify-center items-center"
                visible={_visible}
              />,
              document.body
            )
          : backdrop && (
              <CBackdrop
                className="flex justify-center items-center"
                visible={_visible}
              />
            )}
      </>
    );
  }
);

CModal.displayName = 'CModal';
