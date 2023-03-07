import React from 'react';

interface Props {
  className?: string;
  color?: string;
  size?: string;
}
export const Error = ({ className, color = '#F5222D', size = '24' }: Props) => {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.364 5.63604C21.8787 9.15075 21.8787 14.8492 18.364 18.364C14.8492 21.8787 9.15075 21.8787 5.63604 18.364C2.12132 14.8492 2.12132 9.15075 5.63604 5.63604C9.15075 2.12132 14.8492 2.12132 18.364 5.63604"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 9L9 15"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 15L9 9"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
