import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { CToast } from './CToast';
import { CToastBody } from './CToastBody';
import { CToastHeader } from './CToastHeader';

const meta: Meta<typeof CToast> = {
  title: 'CToast',
  component: CToast,
};

export default meta;
type Story = StoryObj<typeof CToast>;

export const Primary: Story = {
  render: () => (
    <CToast animation={false} autohide={false} visible={true}>
      <CToastHeader closeButton>
        <svg
          width="20"
          height="20"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
          focusable="false"
          role="img"
        >
          <rect width="100%" height="100%" fill="#007aff"></rect>
        </svg>
        <div>CoreUI for React.js</div>
        <small>7 min ago</small>
      </CToastHeader>
      <CToastBody>Hello, world! This is a toast message.</CToastBody>
    </CToast>
  ),
};
