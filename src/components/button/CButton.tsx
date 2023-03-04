import classNames from 'classnames';
import type { ButtonHTMLAttributes, ElementType } from 'react';
import React, { forwardRef } from 'react';

import { LoadingBtn } from '../../icons';

export interface CButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  className?: string;
  color?: '1st' | '2nd' | '1st_danger' | '2nd_danger' | '3rd';
  component?: string | ElementType;
  disabled?: boolean;
  href?: string;
  role?: string;
  size?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
  type?: 'button' | 'submit' | 'reset';
  isLoading?: boolean;
  sizeLoading?: number;
}

const colors = {
  '1st': {
    default: '!bg-primarys-6 !text-whites-6 hover:!bg-primarys-7',
    disabled: '!bg-primarys-4 !text-whites-6',
    loading: '!bg-primarys-4 !text-whites-6 pointer-events-none',
  },
  '2nd': {
    default: '!bg-primarys-1 !text-primarys-6 hover:!text-primarys-7',
    disabled: '!bg-primarys-1 !text-primarys-4',
    loading: '!bg-primarys-1 !text-primarys-4 pointer-events-none',
  },
  '1st_danger': {
    default: '!bg-reds-6 !text-whites-6 hover:!bg-reds-7',
    disabled: '!bg-reds-3 !text-whites-6',
    loading: '!bg-reds-3 !text-whites-6 pointer-events-none',
  },
  '2nd_danger': {
    default: '!bg-reds-1 !text-reds-6 hover:!text-reds-7',
    disabled: '!bg-reds-1 !text-reds-3',
    loading: '!bg-reds-1 !text-reds-4 pointer-events-none',
  },
  '3rd': {
    default: '!bg-inks-1 !text-inks-5  hover:!text-inks-6',
    disabled: '!bg-inks-1 !text-inks-3',
    loading: '!bg-inks-1 !text-inks-4 pointer-events-none',
  },
};

const sizeMap = {
  light: 'text-sm font-normal py-[6px] px-3 leading-5',
  normal: 'text-base font-medium py-1 px-3  leading-6',
  medium: 'text-base font-medium py-2 px-3 leading-6',
  semibold: 'text-base font-medium p-3  leading-6',
  bold: 'text-base font-medium py-4 px-3 leading-6',
};

export const CButton = forwardRef<HTMLButtonElement, CButtonProps>(
  (
    {
      children,
      className,
      color = '1st',
      component = 'button',
      size = 'normal',
      type = 'button',
      isLoading = false,
      sizeLoading,
      ...rest
    },
    ref
  ) => {
    const _className = classNames(
      className,
      isLoading && colors[color].loading,
      !isLoading && rest.disabled && colors[color].disabled,
      !isLoading && !rest.disabled && colors[color].default,
      sizeMap[size],
      'flex justify-center items-center rounded-lg'
    );

    const _colorIconLoading = {
      '1st': 'white',
      '1st_danger': 'white',
      '2nd': '#85a5ff',
      '2nd_danger': '#ff7875',
      '3rd': '#999999',
    };

    const colorLoading = _colorIconLoading[color]
      ? _colorIconLoading[color]
      : 'whites-6';

    const RenderLoading = (
      <>
        {component !== 'a' && isLoading && rest.disabled && (
          <LoadingBtn
            size={sizeLoading}
            className={'mr-2 animate-spin'}
            color={colorLoading}
          />
        )}
      </>
    );

    return (
      <button type={type} className={_className} {...rest} ref={ref}>
        {RenderLoading}
        {children}
      </button>
    );
  }
);
CButton.displayName = 'CButton';
