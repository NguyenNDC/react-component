import React from 'react';

interface Props {
  className?: string;
  color?: string;
  size?: string;
}
export const Success = ({
  className,
  color = '#389E0D',
  size = '24',
}: Props) => {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="12.0001"
        cy="12.0001"
        r="9.00375"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.44263 12.3392L10.6105 14.5071L10.5965 14.4931L15.4876 9.60205"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
