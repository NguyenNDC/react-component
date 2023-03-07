import React from 'react';

interface Props {
  className?: string;
  onClick?: () => void;
  color?: string;
  size?: string;
}
export const CloseToast = ({
  className,
  onClick,
  color = '#666666',
  size = '24',
}: Props) => {
  return (
    <svg
      className={className}
      onClick={onClick}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_4298_12901)">
        <path
          d="M5.80005 5.80005L17.8 17.8"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17.8 5.80005L5.80005 17.8"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_4298_12901">
          <rect
            width="13.5"
            height="13.5"
            fill="white"
            transform="translate(5 5)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
