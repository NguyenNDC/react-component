import classNames from 'classnames';
import type { InputHTMLAttributes, ReactNode } from 'react';
import React, { forwardRef, useEffect, useRef } from 'react';

import { useForkedRef } from '../../hooks';
import type { CFormControlValidationProps } from './CFormControlValidation';
import { CFormControlValidation } from './CFormControlValidation';
import { CFormLabel } from './CFormLabel';

export interface CFormCheckProps
  extends CFormControlValidationProps,
    InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  id?: string;
  indeterminate?: boolean;
  invalid?: boolean;
  label?: string | ReactNode;
  type?: 'checkbox' | 'radio';
  valid?: boolean;
  disabled?: boolean;
  checked?: boolean;
}

export const CFormCheck = forwardRef<HTMLInputElement, CFormCheckProps>(
  (
    {
      className,
      feedback,
      feedbackInvalid,
      feedbackValid,
      floatingLabel,
      id,
      indeterminate,
      invalid,
      label,
      type = 'checkbox',
      valid,
      disabled,
      checked,
      ...rest
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const forkedRef = useForkedRef(ref, inputRef);

    useEffect(() => {
      if (inputRef.current && indeterminate) {
        inputRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    const _className = classNames('form-check', className);

    const labelClassName = classNames('ml-2');
    const inputClassName = classNames('input-checked');

    const formControl = () => {
      return (
        <label className="container-checkbox">
          <input
            type={type}
            id={id}
            className={inputClassName}
            disabled={disabled}
            checked={checked}
            {...rest}
            ref={forkedRef}
          />
          <span
            className={classNames(
              type === 'checkbox' && indeterminate && 'checkmark-indeterminate',
              type === 'checkbox' && !indeterminate && 'checkmark',
              type === 'radio' && 'checkmark-radio'
            )}
          ></span>
        </label>
      );
    };

    const formValidation = () => (
      <CFormControlValidation
        describedby={rest['aria-describedby']}
        feedback={feedback}
        feedbackInvalid={feedbackInvalid}
        feedbackValid={feedbackValid}
        floatingLabel={floatingLabel}
        invalid={invalid}
        valid={valid}
      />
    );

    const formLabel = () => {
      return (
        <CFormLabel
          customClassName={labelClassName}
          {...(id && { htmlFor: id })}
        >
          {label}
        </CFormLabel>
      );
    };

    if (label) {
      return (
        <div className={_className}>
          <div className="flex items-center">
            {formControl()}
            {formLabel()}
          </div>
          {formValidation()}
        </div>
      );
    }
    return formControl();
  }
);

CFormCheck.displayName = 'CFormCheck';
