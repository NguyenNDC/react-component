import React, { FC, HTMLAttributes, ReactNode } from 'react';
import './css/index.css';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export const Thing: FC<Props> = ({ children }) => {
  return <div>{children || `the snozzberries taste like snozzberries`}</div>;
};
