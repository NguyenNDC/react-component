import type { FC, ReactNode } from 'react';
import React from 'react';

import type { CFormControlValidationProps } from './CFormControlValidation';
import { CFormControlValidation } from './CFormControlValidation';
import { CFormFloating } from './CFormFloating';
import { CFormLabel } from './CFormLabel';

export interface CFormControlWrapperProps extends CFormControlValidationProps {
  children?: ReactNode;
  floatingLabel?: ReactNode | string;
  id?: string;
  label?: ReactNode | string;
}

export const CFormControlWrapper: FC<CFormControlWrapperProps> = ({
  children,
  describedby,
  feedback,
  feedbackInvalid,
  feedbackValid,
  floatingLabel,
  id,
  invalid,
  label,
  valid,
}) => {
  return floatingLabel ? (
    <CFormFloating>
      <CFormLabel htmlFor={id}>{label || floatingLabel}</CFormLabel>
      {children}
    </CFormFloating>
  ) : (
    <>
      {label && <CFormLabel htmlFor={id}>{label}</CFormLabel>}
      {children}

      <CFormControlValidation
        describedby={describedby}
        feedback={feedback}
        feedbackInvalid={feedbackInvalid}
        feedbackValid={feedbackValid}
        floatingLabel={floatingLabel}
        invalid={invalid}
        valid={valid}
      />
    </>
  );
};

CFormControlWrapper.displayName = 'CFormControlWrapper';
