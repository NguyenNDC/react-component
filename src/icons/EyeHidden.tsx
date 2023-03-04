import React from 'react';
interface Props {
  className?: string;
  onClick?: () => void;
}
export const EyeHidden = ({ className, onClick }: Props) => {
  return (
    <div className={className} onClick={onClick}>
      <svg
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.5582 14.5577C14.9186 15.6361 13.6764 16.2036 12.4426 15.981C11.2087 15.7585 10.243 14.7928 10.0205 13.559C9.79795 12.3251 10.3654 11.0829 11.4438 10.4433"
          stroke="#999999"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18.9969 17.9962C17.2721 19.3044 15.1651 20.0095 13.0003 20.0029C9.41322 20.0668 6.09886 18.0953 4.44275 14.9128C3.84786 13.707 3.84786 12.293 4.44275 11.0872C5.271 9.43782 6.5913 8.08656 8.22105 7.22031"
          stroke="#999999"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M21.4272 15.1345C21.4674 15.0585 21.5196 14.9903 21.5576 14.9128C22.1524 13.707 22.1524 12.293 21.5576 11.0872C19.9015 7.90462 16.5871 5.9332 13 5.99708C12.7751 5.99708 12.5565 6.02709 12.3345 6.04172"
          stroke="#999999"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M22.0037 21.0033L4.99658 3.99625"
          stroke="#999999"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
