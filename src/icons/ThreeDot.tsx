import React from 'react';
interface Props {
  className?: string;
  color?: string;
}
export const ThreeDot = ({ className, color = '#333333' }: Props) => {
  return (
    <div className={className}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19.5029 13C19.5029 13.2762 19.2789 13.5002 19.0026 13.5002C18.7264 13.5002 18.5024 13.2762 18.5024 13C18.5024 12.7237 18.7264 12.4998 19.0026 12.4998C19.2789 12.4998 19.5029 12.7237 19.5029 13"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13.5004 13C13.5004 13.2762 13.2765 13.5002 13.0002 13.5002C12.724 13.5002 12.5 13.2762 12.5 13C12.5 12.7237 12.724 12.4998 13.0002 12.4998C13.2765 12.4998 13.5004 12.7237 13.5004 13"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.49798 13C7.49798 13.2762 7.27402 13.5002 6.99777 13.5002C6.72151 13.5002 6.49756 13.2762 6.49756 13C6.49756 12.7237 6.72151 12.4998 6.99777 12.4998C7.27402 12.4998 7.49798 12.7237 7.49798 13"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
