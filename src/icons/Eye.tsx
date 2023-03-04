import React from 'react';
interface Props {
  className?: string;
  onClick?: () => void;
}
export const Eye = ({ className, onClick }: Props) => {
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
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.11824 12.467C2.96124 12.176 2.96124 11.823 3.11824 11.532C5.01024 8.033 8.50524 5 12.0002 5C15.4952 5 18.9902 8.033 20.8822 11.533C21.0392 11.824 21.0392 12.177 20.8822 12.468C18.9902 15.967 15.4952 19 12.0002 19C8.50524 19 5.01024 15.967 3.11824 12.467Z"
          stroke="#999999"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.1213 9.87868C15.2929 11.0502 15.2929 12.9497 14.1213 14.1213C12.9497 15.2929 11.0502 15.2929 9.87868 14.1213C8.70711 12.9497 8.70711 11.0502 9.87868 9.87868C11.0502 8.70711 12.9497 8.70711 14.1213 9.87868"
          stroke="#999999"
          strokeWidth="1.4286"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
