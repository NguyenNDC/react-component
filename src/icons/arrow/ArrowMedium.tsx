import React from 'react';
interface Props {
  className?: string;
  color?: string;
  onClick?: () => void;
}
export const ArrowMedium = ({
  className,
  color = '#333333',
  onClick,
}: Props) => {
  return (
    <div className={className} onClick={onClick}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6 9L12 15L18 9"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
