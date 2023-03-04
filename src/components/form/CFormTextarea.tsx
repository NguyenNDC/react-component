import classNames from 'classnames';
import type { ChangeEventHandler, TextareaHTMLAttributes } from 'react';
import React, { forwardRef } from 'react';

import type { CFormControlWrapperProps } from './CFormControlWrapper';
import { CFormControlWrapper } from './CFormControlWrapper';

export interface CFormTextareaProps
  extends CFormControlWrapperProps,
    TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  disabled?: boolean;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  plainText?: boolean;
  readOnly?: boolean;
  value?: string | string[] | number;
}

export const CFormTextarea = forwardRef<
  HTMLTextAreaElement,
  CFormTextareaProps
>(
  (
    {
      children,
      className,
      feedback,
      feedbackInvalid,
      feedbackValid,
      floatingLabel,
      id,
      invalid,
      label,
      valid,
      ...rest
    },
    ref
  ) => {
    const _className = classNames(
      rest.disabled && 'form-disable',
      invalid && 'form-error dropdown-shadow-error',
      !rest.disabled && !invalid && 'form-normal dropdown-shadow-normal',
      `outline-none rounded-lg py-3 px-[16px] resize-none w-full placeholder:text-inks-4 placeholder:font-normal placeholder:text-base placeholder:leading-6`,
      rest.disabled ? `text-blacks-7` : `text-inks-6`
    );
    return (
      <CFormControlWrapper
        describedby={rest['aria-describedby']}
        feedback={feedback}
        feedbackInvalid={feedbackInvalid}
        feedbackValid={feedbackValid}
        floatingLabel={floatingLabel}
        id={id}
        invalid={invalid}
        label={label}
        valid={valid}
      >
        <div className={classNames(className, 'wrap')}>
          <div className="pull-tab"></div>
          <div className={_className}>
            <textarea
              id={id}
              className="scroll w-full h-full border-none outline-none bg-transparent"
              {...rest}
              ref={ref}
            >
              {children}
            </textarea>
          </div>
        </div>
      </CFormControlWrapper>
    );
  }
);

CFormTextarea.displayName = 'CFormTextarea';
