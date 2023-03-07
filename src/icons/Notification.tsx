import React from 'react';

interface Props {
  className?: string;
  color?: string;
  size?: string;
}
export const Notification = ({
  className,
  color = '#0F62FE',
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
        d="M10.9998 15.5017H13.3101"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.1593 15.5015V11.2498H11.0088"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.1002 8.24581C12.1002 8.38394 11.9882 8.49592 11.8501 8.49592C11.7119 8.49592 11.6 8.38394 11.6 8.24581C11.6 8.10769 11.7119 7.99571 11.8501 7.99571"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.85 7.99576C11.9881 7.99576 12.1001 8.10774 12.1001 8.24587"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
