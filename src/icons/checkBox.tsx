import React from 'react';
interface Props {
  className?: string;
}
export const CheckBox = ({ className }: Props) => {
  return (
    <div className={className}>
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="18" height="18" rx="4" fill="#1D39C4" />
        <path
          d="M7.475 12.975C7.375 12.975 7.175 12.975 7.075 12.875L4.075 9.875C3.975 9.675 3.975 9.275 4.075 9.075C4.175 8.875 4.575 8.875 4.775 9.075L7.375 11.675L12.975 6.075C13.275 5.975 13.675 5.975 13.875 6.075C14.075 6.175 14.075 6.575 13.875 6.775L7.875 12.775C7.775 12.975 7.575 12.975 7.475 12.975Z"
          fill="white"
        />
      </svg>
    </div>
  );
};
