import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { CPhoneNumber } from './CPhoneNumber';

const meta: Meta<typeof CPhoneNumber> = {
  title: 'CPhoneNumber',
  component: CPhoneNumber,
};

export default meta;
type Story = StoryObj<typeof CPhoneNumber>;

export const Primary: Story = {
  render: (arg) => (
    <div className="w-[450px]">
      <CPhoneNumber {...arg} />
    </div>
  ),
};
