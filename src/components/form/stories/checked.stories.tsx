import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { CFormCheck } from '../CFormCheck';

const meta: Meta<typeof CFormCheck> = {
  title: 'form/CFormCheck',
  component: CFormCheck,
};

export default meta;
type Story = StoryObj<typeof CFormCheck>;

export const FormCheck: Story = {
  render: (arg) => (
    <div className="w-full h-screen flex items-center justify-center">
      <CFormCheck {...arg} label="Checkbox"></CFormCheck>
    </div>
  ),
};
