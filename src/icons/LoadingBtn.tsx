import classNames from 'classnames';
import React from 'react';

interface Props {
  className?: string;
  color?: string;
  size?: number;
}
export const LoadingBtn = ({
  className,
  color = 'white',
  size = 24,
}: Props) => {
  const _color = color;
  return (
    <svg
      className={classNames(className)}
      width={size}
      height={size}
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.0037 13.0002H19.0024"
        stroke={_color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.99658 13.0002H6.99783"
        stroke={_color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.0002 3.99658V6.99783"
        stroke={_color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.0002 22.0037V19.0024"
        stroke={_color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.367 19.367L17.2451 17.2451"
        stroke={_color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.6333 6.6333L8.75518 8.75518"
        stroke={_color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.2451 8.75518L19.367 6.6333"
        stroke={_color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.75518 17.2451L6.6333 19.367"
        stroke={_color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
